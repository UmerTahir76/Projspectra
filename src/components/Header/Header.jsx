import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Projspectra</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <button className="btn-primary">Get Started</button>
      </div>
    </header>
  );
}
