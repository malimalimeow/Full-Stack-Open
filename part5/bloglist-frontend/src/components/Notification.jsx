import { useEffect } from "react";

const Notification = ({ tools }) => {
  const { message, isError, setMessage, setIsError } = tools;

  console.log(
    "🔴 [CCTV 1 - Render] Current Message:",
    message,
    "isError:",
    isError,
  );
  useEffect(() => {
    if (message === null) {
      return;
    }

    const timer = setTimeout(() => {
      console.log();
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage, setIsError]);

  if (message === null) {
    return null;
  }

  const color = isError ? "error" : "success";

  return <div className={`messageTheme ${color}`}>{message}</div>;
};

export default Notification;
