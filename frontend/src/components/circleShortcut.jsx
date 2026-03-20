import { Link } from "react-router-dom";

function CircleShortcut({ to, label, className = "", onClick }) {
  if (onClick) {
    return (
      <section className="circleSection">
        <button type="button" className={className} onClick={onClick}></button>
        <span>{label}</span>
      </section>
    );
  }

  return (
    <>
      <section className="circleSection">
        <Link to={to} className={className}></Link>
        <span>{label}</span>
      </section>
    </>
  );
}

export default CircleShortcut;
