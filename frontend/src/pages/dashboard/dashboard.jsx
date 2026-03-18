import CircleShortcut from "../../components/circleShortcut.jsx";
import Header from "../../components/header.jsx";
import { Link } from "react-router-dom";
import WarningCard from "../../components/warningCard.jsx";

function Dashboard() {
  return (
    <>
      <Header />
      {/* Inicio da seção de avisos */}
      <h1 className="avisos">Avisos</h1>
      <section className="warnings">
        <WarningCard />
        <WarningCard />
        <WarningCard />
      </section>
      <h2 className="value">Valor total: R$ 100,00</h2>
      {/* seções do app */}
      <section className="sections">
        <CircleShortcut
          to="/transactions"
          className="transactionssection"
          label="Transações"
        />
        <CircleShortcut
          to="/categories"
          className="categoriessection"
          label="Categorias"
        />
        <CircleShortcut
          to="/accounts"
          className="accountssection"
          label="Contas"
        />
        <CircleShortcut
          to="/installments"
          className="installmentssection"
          label="Dívidas"
        />
      </section>
      {/* Resumos das seções */}
      <section className="summaries">
        <section className="summarytransactions"></section>
        <section className="summarycategories"></section>
        <section className="summaryaccounts"></section>
        <section className="summaryinstallments"></section>
      </section>
    </>
  );
}

export default Dashboard;
