import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserMotivationalQuotes.module.css";
import {
  getUserMotivationalQuotes,
  deleteMotivationalQuote,
} from "../../lib/apiMotivational";
import { RootState } from "../../store";
import UserMotivationalQuotes from "../models/userMotivationalQuotes";
import MotivationalQuotesTable from "../Motivational/MotivationalQuotesTable";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const UserMotivationalQuotesPage: React.FC<{ page?: string }> = (props) => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.user);

  const [motivationalQuotes, setMotivationalQuotesData] =
    useState<UserMotivationalQuotes>();
  const dispatch = useDispatch();

  const getUserMotivationalQuotesFn = useCallback(() => {
    dispatch(
      getUserMotivationalQuotes(userData.uid, setMotivationalQuotesData)
    );
  }, [dispatch, userData.uid]);

  const deleteMotivationalQuoteHandler = (id: string[]) => {
    for (const element of id) {
      dispatch(deleteMotivationalQuote(element, getUserMotivationalQuotesFn));
    }
  };

  useEffect(() => {
    getUserMotivationalQuotesFn();
    return () => {};
  }, [getUserMotivationalQuotesFn]);

  let contentTodaysQuote = null;
  if (
    props.page === "menu" &&
    motivationalQuotes &&
    motivationalQuotes.result &&
    motivationalQuotes.result.length > 0
  ) {
    const item =
      motivationalQuotes.result[
        Math.floor(Math.random() * motivationalQuotes.result.length)
      ];
    contentTodaysQuote = (
      <Paper className={classes.userMotivationalQuotesMenu}>
        <h2>Random quote</h2>
        <h1>
          <FormatQuoteIcon />
          <strong>{item.title}</strong>
          <FormatQuoteIcon />
        </h1>
      </Paper>
    );
  }

  return (
    <>
      {contentTodaysQuote && contentTodaysQuote}
      <Paper className={classes.userMotivationalQuotes}>
        {motivationalQuotes &&
        motivationalQuotes.result &&
        motivationalQuotes.result.length > 0 ? (
          <MotivationalQuotesTable
            title="Your motivational Quotes"
            result={motivationalQuotes!.result}
            deleteMotivationalQuotes={deleteMotivationalQuoteHandler}
          />
        ) : (
          <>
            <h3>Your motivational quotes</h3>
            <p>Create your first motivational quote!</p>
            {props.page === "menu" && (
              <Button
                variant="contained"
                onClick={() => navigate(`${process.env.PUBLIC_URL}/profile`)}
                endIcon={<AddIcon />}
              >
                New Motivational quote
              </Button>
            )}
          </>
        )}
      </Paper>
    </>
  );
};

export default UserMotivationalQuotesPage;
