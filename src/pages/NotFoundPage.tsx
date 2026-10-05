import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>

      <button onClick={() => navigate("/")}>
        Go Home
      </button>
    </main>
  );
}

export default NotFoundPage;
