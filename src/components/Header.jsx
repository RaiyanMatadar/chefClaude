import chefClaudeLogo from "../assets/chef-claude-icon.png";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Chef Claude home">
        <img src={chefClaudeLogo} alt="" />
        <span className="brand-name">Chef Claude</span>
      </a>
      <div className="header-note">
        <span className="status-dot" />
        YOUR KITCHEN, REIMAGINED
      </div>
    </header>
  );
}
