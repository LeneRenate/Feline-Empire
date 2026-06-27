import { tagline } from "../data/common/tagline.js";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  const displayTagline = tagline;
  return (
    <>
      <header className="flex justify-start items-end gap-8 w-full h-10svh py-6 border-b-2">
        <h1 className="pl-10">Feline Empire</h1>
        <p className="">-{displayTagline} 🐾</p>
      </header>

      <Outlet />
    </>
  );
}
