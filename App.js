
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend server

const App = () => {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    socket.on("updateUserCount", (count) => {
      setUsers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🟢 Online Users: {users}</h1>
    </div>
  );
};

export default App;
