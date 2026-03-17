import Header from "../../components/header";
import CircleShortcut from "../../components/circleShortcut";
import AccountCard from "../../components/accountCard";

function Accounts() {
  return (
    <>
      <Header showBackButton={true} />
      <section className="sections">
        <CircleShortcut to="" className="addAccount" label="Adicionar" />
        <CircleShortcut to="" className="editAccount" label="Editar" />
        <CircleShortcut to="" className="deleteAccount" label="Excluir" />
      </section>
      <AccountCard />
    </>
  );
}

export default Accounts;
