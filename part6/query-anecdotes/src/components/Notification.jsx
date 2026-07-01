import { useContext, useEffect } from "react";
import NotificationContext from "../NotificationContext";
const Notification = () => {
  const { message, setMessage } = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (message === null) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return <>{message !== null && <div style={style}>{message}</div>}</>;
};

export default Notification;
