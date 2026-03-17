import { Link } from "react-router-dom";

import user from "../assets/icons/user.svg";
import money from "../assets/icons/money.svg";
import eye from "../assets/icons/eye.svg";
import light from "../assets/icons/light.svg";
import back from "../assets/icons/back.svg";

function Header({ showBackButton = false }) {
  return (
    <section className="header">
      <div className="leftheader">
        {showBackButton ? (
          <Link to="/dashboard">
            <img src={back} alt="Voltar" width="30px" height="40px" />
          </Link>
        ) : (
          <Link to="/profile">
            <img src={user} alt="Opções de conta" width="30px" height="40px" />
          </Link>
        )}
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
