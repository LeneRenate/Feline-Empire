import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();

    navigate("/login");
  };

  return (
    // Use shadcn-menubar?
    <>
      <header className="w-full py-4">
        {/* Welcome RulerName - greeting ? */}

        <div className="fixed right-8 top-4 space-x-2">
          {/* Add theme-toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <LogOut />
          </Button>
        </div>

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
