import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <header className="w-full py-4">
        {/* Welcome RulerName - greeting ? */}
        <nav>
          <ul className="flex flex-row justify-center items-end gap-8">
            <li>
              <Link to="">Profile</Link>
            </li>
            <li>
              <Link to="">Empire</Link>
            </li>
            <li>
              <Link to="">Social</Link>
            </li>
            <li>
              <Link to="">Log</Link>
            </li>
            <li>
              <Link to="">Achievements</Link>
            </li>
            {/* <li>
              <Link to=""></Link>
            </li>
            <li>
              <Link to=""></Link>
            </li> */}
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
