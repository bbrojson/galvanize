import { useEffect, useRef, useState } from "react";

export const useSunWebSockets = (cb: (nr: number) => void) => {
  const [data, setData] = useState<WebSocket | undefined>(undefined);
  const isFetching = useRef(false);
  const isSuccess = useRef(false);
  const cbRef = useRef(cb);

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;

    const socket = new WebSocket(process.env.NEXT_PUBLIC_SUN_API_URL ?? "");

    socket.addEventListener("open", () => {
      setData(socket);
      isSuccess.current = true;
      console.log("ws: open");
    });

    socket.addEventListener("message", function (event: MessageEvent<Blob>) {
      void event.data.arrayBuffer().then((buffer) => {
        const int8view = new Uint8Array(buffer);
        const firstByte = int8view[0];

        if (firstByte) {
          console.log("ws: message", firstByte);
          cbRef.current(firstByte);
        } else {
          console.error("ws: message UNEXPECTED", firstByte);
        }
      });
    });

    socket.addEventListener("close", function () {
      console.log("ws: Disconnected from WS Server");
    });

    socket.addEventListener("error", function (event) {
      console.error("ws: Connection Error: ", event);
      isFetching.current = false;
      isSuccess.current = false;
    });

    return () => {
      if (!isSuccess.current) return;
      socket.close();
    };
  }, []);

  return data;
};
