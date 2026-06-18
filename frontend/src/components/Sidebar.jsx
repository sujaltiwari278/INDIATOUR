import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <h3>Menu</h3>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/itinerary">Itinerary</Link>
        </li>

        <li>
          <Link to="/recommendations">Recommendations</Link>
        </li>

        <li>
          <Link to="/planner">Planner</Link>
        </li>

        <li>
          <Link to="/translator">Translator</Link>
        </li>

        <li>
          <Link to="/safety">Safety</Link>
        </li>
        <li>
  <Link to="/favorites">
    Favorites
  </Link>
</li>
<li>
  <Link to="/reviews">
    Reviews
  </Link>
</li>
      </ul>
    </div>
  );
}

export default Sidebar;