"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = () => {
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: "674b5876da1cb2ab8ae7ca5b" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      }
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";

    document.body.appendChild(script);

    // Cleanup the script to prevent multiple inserts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="voiceflow-chat"></div>;
};

export default Chatbot;
