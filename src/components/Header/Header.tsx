import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header d-flex w-100 align-items-center justify-content-center">
      <div className="layout d-flex align-items-center justify-content-center justify-content-lg-start px-lg-5">
        <div
          className="brand d-flex flex-row gap-4 align-items-center"
          onClick={() => navigate(`/`)}
        >
          <img
            className="logo"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
            alt="logo"
          />
          <h2 className="fw-bold m-0">Oompa Loompa's Crew</h2>
        </div>
      </div>
    </div>
  );
}
