import { useEffect } from "react";

const Notification = ({ tools }) => {
  const { message, isError, setMessage } = tools;

  useEffect(() => {
    if (message === null) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (message === null) {
    return null;
  }

  const color = isError ? "error" : "success";

  return <div className={`messageTheme ${color}`}>{message}</div>;
};

export default Notification;
