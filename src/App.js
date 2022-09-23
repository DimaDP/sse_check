import "./styles.css";
import { useEffect, useCallback, useState } from "react";

const API_NO_AUTH = "/api/notifications/noauth/subscribe";

const API = "/api/notifications/subscribe";

export default function App() {
  const [messages, setMessages] = useState([]);

  const getRealtimeData = useCallback((data) => {
    setMessages(prev => [...prev, data])
    console.log("Message -----", data, messages);
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
      getRealtimeData(JSON.parse(e.data));
      console.log(e.data);
    });
    sse.onopen = (e) => {
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
