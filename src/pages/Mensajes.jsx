import "./pages.css";
import UserBanner from "../components/UserBanner";

function Mensajes() {
  return (
    <div className="page-container">
      <UserBanner />
      <h2>Mensajes</h2>
      <p>Centro de comunicación entre usuarios y administradores.</p>
    </div>
  );
}

export default Mensajes;
