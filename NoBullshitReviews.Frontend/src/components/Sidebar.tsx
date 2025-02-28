import "../index.css";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "src/contexts/AuthContext";
import SearchModal from "./SearchModal";

const Sidebar = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const checkLocation = (value: string) => {
    return location.search == value;
  };

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
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300
        ${visible ? "w-64" : "w-20"}
        lg:${visible ? "w-64" : "w-20"} xl:${visible ? "w-64" : "w-20"}`}
    >
      <div className="xl:hidden">
        <button
          onClick={() => setVisible(!visible)}
          className={`absolute  top-[20px] ${
            visible ? "scale-x-[-1] right-[-14px]" : "sm:right-[-14px]"
          }`}
        >
          <div className="p-1 border border-reviewinfobg rounded-xl bg-reviewinfobglight">
            <img
              className=""
              src="/assets/icons/arrow.png"
              width={18}
              alt="arrow"
            />
          </div>
        </button>
      </div>

      <SearchModal close={() => setSearchOpen(false)} isOpen={searchOpen} />
      <div
        className={`h-full ${
          visible ? "" : "hidden"
        } sm:block shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)]`}
      >
        <div className="h-full py-5 overflow-y-auto bg-reviewinfobglight">
          <div className={`flex flex-col h-full`}>
            <div className={`flex flex-col h-full gap-5 p-2`}>
              <div
                onClick={() => navigate("/")}
                className={`hover:bg-reviewinfobg p-3 rounded-xl cursor-pointer flex gap-3 items-center ${
                  checkLocation("") ? "bg-reviewinfobg font-semibold" : ""
                } ${visible ? "" : "justify-center"}`}
              >
                <img
                  width={24}
                  height={24}
                  alt="home"
                  src="/assets/icons/home.png"
                />
                <span className={`${visible ? "" : "hidden"}`}>Home</span>
              </div>
              <div
                onClick={() => setSearchOpen(true)}
                className={`hover:bg-reviewinfobg p-3 rounded-xl cursor-pointer flex gap-3 items-center ${
                  visible ? "" : "justify-center"
                }`}
              >
                <img
                  width={24}
                  height={24}
                  alt="home"
                  src="/assets/icons/search.png"
                />
                <span className={`${visible ? "" : "hidden"}`}>Search</span>
              </div>
              <hr className="opacity-20" />
              <div
                className={`hover:bg-reviewinfobg p-3 rounded-xl cursor-pointer flex gap-3 items-center ${
                  checkLocation("/movies")
                    ? "bg-reviewinfobg font-semibold"
                    : ""
                } ${visible ? "" : "justify-center"}`}
              >
                <img
                  width={24}
                  height={24}
                  alt="home"
                  src="/assets/icons/video.png"
                />
                <span className={`${visible ? "" : "hidden"}`}>Movies</span>
              </div>
              <div
                onClick={() => navigate("/games")}
                className={`hover:bg-reviewinfobg p-3 rounded-xl cursor-pointer flex gap-3 items-center ${
                  checkLocation("/games") ? "bg-reviewinfobg font-semibold" : ""
                } ${visible ? "" : "justify-center"}`}
              >
                <img
                  width={24}
                  height={24}
                  alt="home"
                  src="/assets/icons/gamepad.png"
                />
                <span className={`${visible ? "" : "hidden"}`}>Games</span>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-5 justify-between">
              {auth !== undefined && (
                <div className="w-full text-center flex justify-center">
                  <button
                    onClick={() => navigate("/creator")}
                    className="hover:bg-reviewbg right-8 px-5 flex gap-3 items-center bg-reviewinfobg text-white py-2 rounded-lg shadow-lg transition-all"
                  >
                    <img
                      src="/assets/icons/add.png"
                      className="w-5 h-5"
                      alt=""
                    />
                    <span className={`${visible ? "" : "hidden"}`}>Create</span>
                  </button>
                </div>
              )}

              <hr className="opacity-20" />

              <div className="w-full">
                {auth === undefined ? (
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/join")}
                      className="border border-white text-white hover:bg-reviewinfobg py-1 px-5 rounded font-medium"
                    >
                      Join
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center px-2">
                    <div className="flex items-center hover:bg-reviewinfobg gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors">
                      <img
                        className="rounded-full h-8 w-8"
                        src={auth.avatarUrl}
                        alt="user_avatar"
                      />
                      <div
                        className={`flex flex-col ${visible ? "" : "hidden"}`}
                      >
                        <span className="text-sm font-semibold leading-tight">
                          {auth.username}
                        </span>
                        <span className="text-xs text-gray-400 font-semibold leading-tight">
                          Member
                        </span>
                      </div>
                    </div>

                    <div
                      className={`ml-auto hidden sm:block hover:bg-reviewinfobg p-2.5 rounded-xl cursor-pointer transition-colors ${
                        visible ? "" : "sm:hidden"
                      }`}
                    >
                      <img
                        src="assets/icons/more.png"
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
