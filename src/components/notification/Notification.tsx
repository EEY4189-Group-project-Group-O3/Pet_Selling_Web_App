import { useState, useEffect } from "react";
import { BellIcon } from "@chakra-ui/icons";
import { NotificationInterface } from "../../types";
import clsx from "clsx";
import {
  useGetNotifications,
  useCheckNotification,
} from "./hooks/NotificationHook";

export const Notification = () => {
  const [show, setShow] = useState(false);
  //   const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<NotificationInterface[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const ws = new WebSocket(
      // `ws://localhost:8001/ws/notifications/?token=${token}`
      `wss://celonedev.online/ws/notifications/?token=${token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected!");
      //   setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("New Notification:", data.message);
      setMessages((prevMessages) => [data.message, ...prevMessages]);
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    return () => {
      ws.close(); // Cleanup on component unmount
    };
  }, []);

  const { data: notifications } = useGetNotifications({});
  const { mutate: checkNotificationMutate } = useCheckNotification();

  useEffect(() => {
    if (notifications !== undefined) {
      setMessages(notifications);
    }

    console.log(notifications);
  }, [notifications]);

  const handleRead = (message: any) => {
    checkNotificationMutate(message.id);
  };

  return (
    <div>
      <div className="relative cursor-pointer" onClick={() => setShow(!show)}>
        <BellIcon w={5} h={5} />
        <span className="absolute rounded-full pl-1 pr-1 bg-white -top-2 left-3">
          <p className="font-semibold">
            {messages?.filter((message) => message.read === false).length}
          </p>
        </span>
      </div>

      <div
        className={clsx(
          "absolute bg-white rounded-lg shadow-lg w-80 h-96 top-10 right-0 overflow-auto",
          !show && "hidden",
          "show"
        )}
      >
        <div className="p-3">
          <p className="font-semibold">Notification</p>
          <div className="grid gap-3 cursor-pointer ">
            {messages?.map((message, index) => (
              <div
                key={index}
                onClick={() => handleRead(message)}
                className={clsx(
                  "p-4 rounded-lg cursor-pointer transition-colors",
                  "hover:bg-blue-50",
                  message.read ? "bg-gray-50" : "bg-blue-100"
                )}
              >
                <p
                  className={clsx(
                    "text-sm",
                    message.read ? "text-gray-600" : "text-gray-900 font-medium"
                  )}
                >
                  {message.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.created
                    ? new Date(Date.parse(message.created)).toLocaleString()
                    : "Invalid Date"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
