import "./styles.css";
import { useEffect, useCallback } from "react";

const API_NO_AUTH = "/api/notifications/noauth/subscribe";

const API = "/api/notifications/subscribe";

export default function App() {
  const getRealtimeData = useCallback((data) => {
    // process the data here,
    // then pass it to state to be rendered
    // eslint-disable-next-line no-console
    console.log("Message -----", data);
  }, []);

  useEffect(() => {
    const sse = new EventSource(API_NO_AUTH, {
      // withCredentials: true
    });
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = (e) => {
      console.warn(e);
      // sse.close();
    };
    sse.addEventListener("HEARTBEAT", (e) => {
      // eslint-disable-next-line no-console
      console.log(e.data);
    });
    sse.onopen = (e) => {
      // eslint-disable-next-line no-console
      console.log("Open", e);
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
