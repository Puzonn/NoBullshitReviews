import * as React from "react";
import "../index.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [visible, setVisible] = React.useState(false);
  const [mobile, setMobile] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        console.log("mobile");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col relative ${
        visible ? "max-w-[220px] min-w-[220px]" : "w-[100px]"
      } gap-5 h-screen pt-5 bg-reviewinfobglight p-2
    shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)] hidden sm:flex
    transition-[width] duration-300 ease-in-out`}
    >
      <button
        onClick={() => setVisible(!visible)}
        className={`absolute right-[-14px] top-[20px] ${
          visible ? "scale-x-[-1]" : ""
        } duration-300 ease-out transition-transform`}
      >
        <div className="p-1 border border-reviewinfobg rounded bg-reviewinfobglight">
          <img className="" src="/assets/icons/arrow.png" width={18} alt="" />
        </div>
      </button>

      <div className={`flex flex-col h-full ${visible ? "" : ""}`}>
        <span
          className={`font-semibold text-xl ${visible ? "" : "hidden"}`}
        ></span>
        <div className={`flex flex-col gap-5 justify-center items-center`}>
          <div
            onClick={() => navigate("/")}
            className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center"
          >
            <img
              width={24}
              height={24}
              alt="home"
              src="/assets/icons/home.png"
            />
            <span className={`${visible ? "" : "hidden"}`}>Home</span>
          </div>
          <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
            <img
              width={24}
              height={24}
              alt="home"
              src="/assets/icons/gamepad.png"
            />
            <span className={`${visible ? "" : "hidden"}`}>Games</span>
          </div>
          <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
            <img
              width={24}
              height={24}
              alt="home"
              src="/assets/icons/video.png"
            />
            <span className={`${visible ? "" : "hidden"}`}>Movies</span>
          </div>

          <div className="relative mx-auto flex items-center">
            {visible ? (
              <div className="flex justify-between items-center px-2">
                <input
                  className="w-full bg-transparent text-white placeholder:text-gray-300text-sm border
                   border-slate-200 rounded-md px-2 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
                   focus:text-white
                    hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search Reviews"
                />
              </div>
            ) : (
              <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
                <img
                  width={24}
                  height={24}
                  alt="search"
                  src="/assets/icons/search.png"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pb-5 flex flex-col gap-5 justify-between">
          {visible && (
            <button
              onClick={() => navigate("/creator")}
              className="hover:bg-reviewbg right-8 bg-reviewinfobg text-white py-2 rounded-lg shadow-lg transition-all"
            >
              Create Review
            </button>
          )}
          {!visible && (
            <button
              onClick={() => navigate("/creator")}
              className="hover:bg-reviewbg right-8 bg-reviewinfobg text-white py-2 rounded-lg shadow-lg transition-all"
            >
              Create
            </button>
          )}
          <hr className="border border-white" />

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/join")}
              className="border border-white text-white hover:bg-reviewinfobg py-1 px-5 rounded font-medium"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
