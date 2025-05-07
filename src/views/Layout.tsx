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
    homeRef.current.play();
  };

  const completeHandler = () => {
    if (!homeRef.current) return;
    homeRef.current.goToAndStop(0, true);
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
          rounded-lg
          bg-slate-200
          p-0
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
              className="block p-4 text-center  hover:bg-slate-300"
              to="/"
              onMouseEnter={hoverHandler}
            >
              <div className="flex items-baseline">
                Home
                <Lottie
                  lottieRef={homeRef}
                  animationData={taloData}
                  loop={false}
                  autoplay={false}
                  onComplete={completeHandler}
                />
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 text-center  hover:bg-slate-300"
              to="/example"
            >
              <div className="flex items-baseline">
                Example
                <Lottie
                  lottieRef={hymyRef}
                  animationData={hymyData}
                  loop={false}
                  autoplay={false}
                  onComplete={completeHandler}
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
