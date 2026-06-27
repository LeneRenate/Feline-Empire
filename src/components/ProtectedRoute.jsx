import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (session === undefined) return null;
  if (!session) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoute;
