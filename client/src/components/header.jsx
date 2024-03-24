import logo from "./Assets/logo.png";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a
          className="navbar-band"
          href=""
          style={{ textDecoration: "none", color: "purple" }}
        >
          <div className="d-flex">
            <img
              src={logo}
              alt="logo"
              className="mr-2"
              style={{ width: 50, height: 50 }}
            />
            <div style={{ fontSize: "40px" }}>Project Management</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
