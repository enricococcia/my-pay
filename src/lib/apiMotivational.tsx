import { FIREBASE_DOMAIN } from "../const";
import { uiActions } from "../store/ui-slice";
import { retrieveStoredToken } from "../helper/authHelper";
import UserMotivationalQuotes from "../components/models/userMotivationalQuotes";

let messageError = "Unknown Error";

export const getUserMotivationalQuotes = (
  userId: string,
  callback?: (dataLoaded: UserMotivationalQuotes) => void
) => {
  return async (dispatch: any): Promise<void> => {
    const sendRequest = async () => {
      dispatch(uiActions.toggleLoader(true));
      const response = await fetch(
        `${FIREBASE_DOMAIN}/motivationalquotes.json?auth=${
          retrieveStoredToken()?.token
        }`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Could not fetch motivational quotes for this user."
        );
      }

      let transformedMotivationalQuotes = [];
      for (const key in data) {
        data[key].eid = key;
        const motivationalQuotesObj = {
          ...data[key],
        };

        if (motivationalQuotesObj.userId === userId) {
          transformedMotivationalQuotes.push(motivationalQuotesObj);
        }
      }
      return { result: transformedMotivationalQuotes };
    };

    try {
      const dataLoaded = await sendRequest();
      dispatch(uiActions.toggleLoader(false));
      if (callback) {
        callback(dataLoaded);
      }
    } catch (error) {
      if (error instanceof Error) messageError = error.message;
      dispatch(uiActions.toggleLoader(false));
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: messageError,
        })
      );
    }
  };
};

export const addMotivationalQuote = (
  motivationalQuoteData: {},
  callback?: () => void
) => {
  return async (dispatch: any): Promise<void> => {
    const sendRequest = async () => {
      dispatch(uiActions.toggleLoader(true));
      const response = await fetch(
        `${FIREBASE_DOMAIN}/motivationalquotes.json?auth=${
          retrieveStoredToken()?.token
        }`,
        {
          method: "POST",
          body: JSON.stringify(motivationalQuoteData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not create a motivational quote."
        );
      }

      return null;
    };
    try {
      await sendRequest();
      dispatch(uiActions.toggleLoader(false));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Motivational quote added correctly",
        })
      );
      if (callback) {
        callback();
      }
    } catch (error) {
      if (error instanceof Error) messageError = error.message;
      dispatch(uiActions.toggleLoader(false));
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: messageError,
        })
      );
    }
  };
};

export const deleteMotivationalQuote = (id: string, callback?: () => void) => {
  return async (dispatch: any): Promise<void> => {
    const sendRequest = async () => {
      dispatch(uiActions.toggleLoader(true));
      const response = await fetch(
        `${FIREBASE_DOMAIN}/motivationalquotes/${id}.json?auth=${
          retrieveStoredToken()?.token
        }`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete this motivational quote."
        );
      }

      return null;
    };
    try {
      await sendRequest();
      dispatch(uiActions.toggleLoader(false));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Delete!",
          message: "Motivational quote deleted correctly",
        })
      );
      if (callback) {
        callback();
      }
    } catch (error) {
      if (error instanceof Error) messageError = error.message;
      dispatch(uiActions.toggleLoader(false));
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: messageError,
        })
      );
    }
  };
};
