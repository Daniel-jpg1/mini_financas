import { Link } from "react-router-dom";

import user from "../assets/icons/user.svg";
import money from "../assets/icons/money.svg";
import eye from "../assets/icons/eye.svg";
import light from "../assets/icons/light.svg";

function Header() {
  return (
    <section className="header">
      <div className="leftheader">
        <Link to="">
          <img src={user} alt="Opções de conta" width="30px" height="40px" />
        </Link>
      </div>
      <div className="centerheader">
        <Link to="">
          <img src={money} alt="logo do site" width="30px" height="40px" />
        </Link>
      </div>
      <div className="rightheader">
        <button>
          <img
            src={eye}
            alt="exibir/ocultar infos sensíveis"
            width="30px"
            height="40px"
          />
        </button>
        <Link to="">
          <img src={light} alt="Sugestões" width="30px" height="40px" />
        </Link>
      </div>
    </section>
  );
}

export default Header;
