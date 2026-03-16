import Header from "../../components/header.jsx";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Header />
      {/* Inicio da seção de avisos */}
      <h1 className="avisos">Avisos</h1>
      <section className="warnings">
        <article className="warning1"></article>
      </section>
      <h2 className="value">Valor total: R$ 100,00</h2>
      {/* seções do app */}
      <section className="sections">
        <section className="circlesection">
          <Link to="/transactions" className="transactionssection"></Link>
          <span>Transações</span>
        </section>
        <section className="circlesection">
          <Link to="" className="categoriessection"></Link>
          <span>Categorias</span>
        </section>
        <section className="circlesection">
          <Link to="" className="accountssection"></Link>
          <span>Contas</span>
        </section>
        <section className="circlesection">
          <Link to="" className="installmentssection"></Link>
          <span>Dívidas</span>
        </section>
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
