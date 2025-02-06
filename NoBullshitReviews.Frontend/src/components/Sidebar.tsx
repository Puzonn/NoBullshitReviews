import "../index.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "src/contexts/AuthContext";

const Sidebar = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setVisible(false);
      } else if (window.innerWidth >= 1280) {
        setVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-gray-800 transition-all duration-300 shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)]
        ${visible ? "w-64" : "w-20"}
        lg:${visible ? "w-64" : "w-20"} xl:${visible ? "w-64" : "w-20"}`}
    >
      <div className="h-full px-3 py-5 overflow-y-auto bg-reviewinfobglight">
        <div className="xl:hidden">
          <button
            onClick={() => setVisible(!visible)}
            className={`absolute right-[-14px] top-[20px] ${
              visible ? "scale-x-[-1]" : ""
            } duration-300 ease-out transition-transform`}
          >
            <div className="p-1 border border-reviewinfobg rounded bg-reviewinfobglight">
              <img
                className=""
                src="/assets/icons/arrow.png"
                width={18}
                alt=""
              />
            </div>
          </button>
        </div>

        <div className={`flex flex-col h-full`}>
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
              <div className="hidden xl:block">
                <span className="">Home</span>
              </div>
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

          <div className="mt-auto flex flex-col gap-5 justify-between">
            {auth !== undefined && (
              <div className="w-full text-center">
                {visible && (
                  <button
                    onClick={() => navigate("/creator")}
                    className="hover:bg-reviewbg right-8 px-5 bg-reviewinfobg text-white py-2 rounded-lg shadow-lg transition-all"
                  >
                    Create Review
                  </button>
                )}
                {!visible && (
                  <button
                    onClick={() => navigate("/creator")}
                    className="hover:bg-reviewbg right-8 m-2 bg-reviewinfobg text-white py-2 rounded-lg shadow-lg transition-all"
                  >
                    Create
                  </button>
                )}
              </div>
            )}

            <hr className="border border-white" />

            <div className="flex justify-center">
              {auth === undefined ? (
                <button
                  onClick={() => navigate("/join")}
                  className="border border-white text-white hover:bg-reviewinfobg py-1 px-5 rounded font-medium"
                >
                  Join
                </button>
              ) : (
                <div className="flex">
                  <img
                    className="rounded-full w-10"
                    src={auth.avatarUrl}
                    alt=""
                  />
                  <span className={`px-2 font-bold ${visible ? "" : "hidden"}`}>
                    {auth.username}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
