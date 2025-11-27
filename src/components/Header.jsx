import React, {useEffect, useState} from "react";
import logo from "../assets/logo-comber.png";

export default function Header(){
  const [theme, setTheme] = useState(typeof window !== "undefined" && localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  useEffect(()=>{
    if(typeof document !== "undefined"){
      document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
      try{ localStorage.setItem("theme", theme); }catch(e){}
    }
  },[theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <header className="header" role="banner">
      <a className="brand" href="/">
        <img src={logo} alt="Comber" className="logo" />
        <div>
          <h1>Comber</h1>
          <p>COMPANHIA BRASILEIRA DE ENERGIA RENOVÁVEL</p>
        </div>
      </a>

      <nav className="nav" aria-label="main navigation">
        <a href="#reembolso">Reembolso</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#ajuda">Ajuda</a>
      </nav>

      <div className="actions" aria-hidden="false">
        <button aria-label="Toggle theme" onClick={toggle} className="btn btn-secondary" title="Alternar tema">
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}
