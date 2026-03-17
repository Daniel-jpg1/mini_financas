import Header from "../../components/header";
import CircleShortcut from "../../components/circleShortcut";
import InstallmentCard from "../../components/installmentCard";

function Installments() {
  return (
    <>
      <Header showBackButton={true} />
      <section className="sections">
        <CircleShortcut to="" className="addInstallment" label="Adicionar" />
        <CircleShortcut to="" className="editInstallment" label="Editar" />
        <CircleShortcut to="" className="deleteInstallment" label="Excluir" />
      </section>
      <InstallmentCard />
    </>
  );
}

export default Installments;
