import { Link, Outlet } from "react-router";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import taloData from "../assets/lottie/talo.json";
import hamppariData from "../assets/lottie/hampurilainen.json";
import hymyData from "../assets/lottie/smiley.json";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
  const homeRef = useRef<LottieRefCurrentProps>(null);
  const hamppariRef = useRef<LottieRefCurrentProps>(null);
  const hymyRef = useRef<LottieRefCurrentProps>(null);
  const [menuToggle, setMenuToggle] = useState(false);

  const hoverHandler = () => {
    if (!homeRef.current) return;
    homeRef.current.setDirection(1);
    homeRef.current.play();
  };

  const homeHoverLeaveHandler = () => {
    if (!homeRef.current) return;
    homeRef.current.setDirection(-1); // play in reverse
    homeRef.current.play();
  };

  const hymyHandler = () => {
    if (!hymyRef.current) return;
    hymyRef.current.setDirection(1);
    hymyRef.current.play();
  };

  const hymyHoverLeaveHandler = () => {
    if (!hymyRef.current) return;
    hymyRef.current.setDirection(-1); // play in reverse
    hymyRef.current.play();
  };

  const menuHandler = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    if (!hamppariRef.current) return;
    if (menuToggle) {
      hamppariRef.current.setDirection(1);
    } else {
      hamppariRef.current.setDirection(-1);
    }
    hamppariRef.current.play();
  }, [menuToggle]);

  return (
    <div className="m-auto h-full w-11/12">
      <nav className="absolute right-0 flex flex-col-reverse items-end justify-end lg:relative lg:block lg:flex-row">
        <ul
          className={`
          mr-4
          justify-end
          overflow-hidden
          rounded-md
          bg-slate-200
          p-1
          shadow-md
          transition-all
          duration-500
          ease-in-out
          lg:flex
          lg:opacity-100
          ${menuToggle ? "opacity-100" : "opacity-0"}
          `}
        >
          <li>
            <Link
              className="block px-3 py-2 text-center tex-center hover:bg-slate-300"
              to="/"
              onMouseEnter={hoverHandler}
              onMouseLeave={homeHoverLeaveHandler}
            >
              <div className="flex items-center gap-1 text-black">
                Home
                <Lottie
                  lottieRef={homeRef}
                  animationData={taloData}
                  loop={false}
                  autoplay={false}
                  className="h-50 w-50"
                />
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="block px-3 py-2 text-center  hover:bg-slate-300"
              to="/example"
              onMouseEnter={hymyHandler}
              onMouseLeave={hymyHoverLeaveHandler}
            >
              <div className="flex items-center gap-1 text-black">
                Smile
                <Lottie
                  lottieRef={hymyRef}
                  animationData={hymyData}
                  loop={false}
                  autoplay={false}
                  className="h-50 w-50"
                />
              </div>
            </Link>
          </li>
        </ul>
        <div className="m-4 h-8 w-8 sm:block lg:hidden">
          <div className="flex items-center justify-center">
            <Lottie
              lottieRef={hamppariRef}
              animationData={hamppariData}
              loop={false}
              autoplay={false}
              onClick={menuHandler}
            />
          </div>
        </div>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
