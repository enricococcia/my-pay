import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageviewTwoToneIcon from "@mui/icons-material/PageviewTwoTone";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Paper>
        <div className={classes.notFound}>
          <div className={classes.header}>
            <PageviewTwoToneIcon />
            <h1>Page Not Found</h1>
          </div>
          <p>Try to visit another page or go back to the home page</p>
          <Button
            size="large"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
            startIcon={<ArrowBackIcon />}
          >
            Back to HomePage
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default NotFound;
