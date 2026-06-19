import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const logout = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  localStorage.removeItem(
    "indiaTourTrip"
  );

  localStorage.removeItem(
    "indiaTourTripDates"
  );

  navigate("/");
};

  const navLink = (
    path,
    label
  ) => (
    <Link
      to={path}
      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
        location.pathname === path
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex items-center justify-between py-3">

          {/* Logo */}

          <h1
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="text-2xl font-extrabold tracking-wide cursor-pointer select-none"
          >
            <span className="text-orange-600">
              INDIA
            </span>

            <span className="text-blue-500">
              TOUR
            </span>
          </h1>

          {/* Navigation */}

          <div className="flex items-center gap-2">

            {navLink(
              "/dashboard",
              "Dashboard"
            )}

            {navLink(
              "/festivals",
              "Festival Explorer"
            )}

            {navLink(
              "/itinerary",
              "Journey Builder"
            )}

            {navLink(
              "/trips",
              "Saved Trips"
            )}

            {navLink(
              "/reviews",
              "Reviews"
            )}

          
            

            {/* Logout */}

            <button
              onClick={logout}
              className="
bg-gradient-to-r
from-orange-500
via-orange-400
to-blue-700
text-white
px-6
py-2.5
rounded-xl
font-semibold
shadow-lg
hover:scale-105
transition-all
duration-300
"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;