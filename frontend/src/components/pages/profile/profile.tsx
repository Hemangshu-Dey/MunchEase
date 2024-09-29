import NavbarProfile from "../reusables/navbarProfile";
import ProfileComponent from "./profileComponents";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-pink-50">
      <NavbarProfile />
      <div className="flex flex-1">
        <main className="flex-1 mt-16 p-4">
          <ProfileComponent />
        </main>
      </div>
    </div>
  );
}
