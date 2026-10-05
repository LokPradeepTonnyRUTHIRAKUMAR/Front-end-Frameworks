import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <main>
      <h1>About</h1>

      <p>
        This movie app lets you search and explore movies.
      </p>

      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default AboutPage;