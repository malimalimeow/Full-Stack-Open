import { useEffect } from "react";
import { useNotiStore } from "../notiStore";
const Notification = () => {
  const message = useNotiStore((state) => state.message);
  const setMessage = useNotiStore((state) => state.setMessage);
  console.log(message);

  useEffect(() => {
    if (message === null) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return <>{message !== null && <div style={style}>{message}</div>}</>;
};

export default Notification;
