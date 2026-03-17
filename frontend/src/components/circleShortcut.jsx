import { Link } from "react-router-dom";

function CircleShortcut({ to, label, className = "" }) {
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
