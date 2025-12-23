import { useEffect, useState } from "react";

export default function ServerVisualizer({ server }) {
  const [snapshot, setSnapshot] = useState({
    queued: [],
    processing: [],
    completed: 0
  });

  // Poll server state (observer pattern)
  useEffect(() => {
    const id = setInterval(() => {
      setSnapshot(server.getRequests());
    }, 200);

    return () => clearInterval(id);
  }, [server]);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Server Visualization</h2>

      {/* QUEUE */}
      <h3>Queue</h3>
      <div style={{ display: "flex", gap: "8px", minHeight: "50px" }}>
        {snapshot.queued.map(r => (
          <RequestBox key={r.id} label={`#${r.id}`} status="queued" />
        ))}
      </div>

      {/* WORKERS */}
      <h3>Workers (capacity = {server.serverCapacity()})</h3>
      <div style={{ display: "flex", gap: "12px" }}>
        {Array.from({ length: server.serverCapacity() }).map((_, i) => {
          const r = snapshot.processing[i];
          return (
            <WorkerSlot key={i} request={r} />
          );
        })}
      </div>

      {/* COMPLETED */}
      <h3>Completed</h3>
      <p>{snapshot.completed}</p>
    </div>
  );
}

/* Small visual helpers */

function RequestBox({ label, status }) {
  const colors = {
    queued: "#f0f0f0",
    processing: "#cce5ff",
    completed: "#d4edda"
  };

  return (
    <div
      style={{
        width: "50px",
        height: "40px",
        border: "2px solid black",
        background: colors[status],
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {label}
    </div>
  );
}

function WorkerSlot({ request }) {
  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        border: "3px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: request ? "#cce5ff" : "#fff"
      }}
    >
      {request ? `#${request.id}` : ""}
    </div>
  );
}
