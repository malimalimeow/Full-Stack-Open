import { useEffect } from "react";
import { Alert } from "@mui/material";

const Notification = ({ tools }) => {
  const { message, isError, setMessage, setIsError } = tools;

  useEffect(() => {
    if (message === null) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage, setIsError]);

  if (message === null) {
    return null;
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={isError ? "error" : "success"}
    >
      {message}
    </Alert>
  );
};

export default Notification;
