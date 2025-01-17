import * as React from "react";

const Join = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-reviewinfobglight p-5 rounded-xl flex flex-col items-center gap-5">
        <div className="text-4xl font-bold">Join for Free or Login in</div>

        <span className="text-sm">
          Registering or logging in with an email address is currently disabled.
        </span>
        <input
          disabled
          type="email"
          className="w-full bg-transparent text-white placeholder:text-gray-300text-sm border
                   border-slate-200 rounded-md px-2 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
                   focus:text-white
                    hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Email"
        />

        <hr className="border border-white w-full" />
        <div className="flex justify-center">
          <span className="font-semibold">Or Continue with</span>
        </div>
        <div className="flex justify-center">
          <div
            onClick={() =>
              (window.location.href =
                "https://discord.com/oauth2/authorize?client_id=1328307815336378409&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2FoauthCallback&scope=identify+email")
            }
            className="rounded flex items-center justify-center w-fit cursor-pointer"
          >
            <img
              src="/assets/icons/discord.png"
              alt="discord_logo"
              width="34"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
