import { useEffect, useState } from "react";
import CircleShortcut from "../../components/circleShortcut.jsx";
import Header from "../../components/header.jsx";
import WarningCard from "../../components/warningCard.jsx";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/dashboard/summary",
        );
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao buscar dashboard:", error);
        setError("Erro ao carregar dashboard");
      }
    }

    fetchDashboardData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!dashboardData) {
    return <p>Carregando...</p>;
  }

  const visibleWarnings = dashboardData.warnings.filter(
    (warning) => warning.show,
  );

  return (
    <>
      <Header />
      {/* Inicio da seção de avisos */}
      <h1 className="warningh1">Avisos</h1>
      <section className="warnings">
        {visibleWarnings.length === 0 ? (
          <p>Nenhum aviso no momento.</p>
        ) : (
          visibleWarnings.map((warning) => (
            <WarningCard key={warning.id} message={warning.message} />
          ))
        )}
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
