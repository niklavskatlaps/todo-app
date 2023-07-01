import { Link } from "react-router-dom";

export default function NotFoundPageComponent() {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Perhaps you wanted to <Link to='/'>create a new TODO list</Link>?</p>
    </div>
  );
}
