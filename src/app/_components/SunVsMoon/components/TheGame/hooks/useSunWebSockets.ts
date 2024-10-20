import { useEffect, useRef, useState } from "react";

export const useSunWebSockets = ({
  openCb,
  errorCb,
  closeCb,
  messageCb,
}: {
  openCb: (event: Event) => void;
  closeCb: (event: CloseEvent) => void;
  errorCb: (event: Event) => void;
  messageCb: (nr: number) => void;
}) => {
  const [data, setData] = useState<WebSocket | undefined>(undefined);
  const isFetching = useRef(false);
  const isSuccess = useRef(false);
  const cbRef = useRef({ openCb, errorCb, messageCb, closeCb });

  useEffect(() => {
    cbRef.current = { openCb, errorCb, messageCb, closeCb };
  }, [closeCb, errorCb, messageCb, openCb]);

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;

    const socket = new WebSocket(process.env.NEXT_PUBLIC_SUN_API_URL ?? "");

    socket.addEventListener("open", (message) => {
      setData(socket);
      isSuccess.current = true;
      console.log("ws: open");
      cbRef.current.openCb(message);
    });

    socket.addEventListener("message", function (event: MessageEvent<Blob>) {
      void event.data.arrayBuffer().then((buffer) => {
        const int8view = new Int8Array(buffer);
        const firstByte = int8view[0];

        if (firstByte !== undefined) {
          console.log("ws: message", firstByte);
          cbRef.current.messageCb(firstByte);
        } else {
          console.error("ws: message UNEXPECTED", firstByte);
          // throw new Error('silent error')
        }
      });
    });

    socket.addEventListener("close", function (error) {
      console.log("ws: Disconnected from WS Server");
      cbRef.current.closeCb(error);
    });

    socket.addEventListener("error", function (event) {
      console.error("ws: Connection Error: ", event);
      isFetching.current = false;
      isSuccess.current = false;
      cbRef.current.errorCb(event);
    });

    return () => {
      if (!isSuccess.current) return;
      socket.close();
    };
  }, []);

  return data;
};
