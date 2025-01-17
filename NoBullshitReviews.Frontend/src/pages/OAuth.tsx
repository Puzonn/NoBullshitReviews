import * as React from "react";

const OAuth = () => {
  const parms = new URLSearchParams(window.location.search);
  const code = parms.get("code");

  React.useEffect(() => {
    if (code) {
      fetch("https://localhost:7106/auth/authorize", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(code),
      }).then((e) => {
        console.log(e);
      });
    }
  });

  return <></>;
};

export default OAuth;
