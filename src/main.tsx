import React from "react";
import { createRoot } from "react-dom/client";
import { connectHost } from "@openchamber/sdk";

import { App } from "./App";

const container = document.getElementById("root");

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Keep the message visible instead of leaving a blank sandboxed iframe.
    console.error("trajectory: app crashed", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="boot-screen">
          <div className="state-icon">!</div>
          <h2>Trajectory crashed</h2>
          <pre className="install-command">{this.state.error.message}</pre>
          <p className="state-note">Reload the panel or open the browser console for the full stack.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const renderFatal = (error: unknown) => {
  if (!container) return;
  const message = error instanceof Error ? `${error.message}\n\n${error.stack ?? ""}` : String(error);
  createRoot(container).render(
    <div className="boot-screen">
      <div className="state-icon">!</div>
      <h2>Trajectory could not start</h2>
      <pre className="install-command">{message}</pre>
      <p className="state-note">This page must be opened inside OpenChamber.</p>
    </div>,
  );
};

if (!container) {
  throw new Error("trajectory: #root is missing");
}

try {
  const host = connectHost();
  createRoot(container).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App host={host} />
      </AppErrorBoundary>
    </React.StrictMode>,
  );
} catch (error) {
  renderFatal(error);
}

window.addEventListener("error", (event) => {
  if (container.childElementCount === 0) renderFatal(event.error ?? event.message);
});
window.addEventListener("unhandledrejection", (event) => {
  console.error("trajectory: unhandled rejection", event.reason);
});
