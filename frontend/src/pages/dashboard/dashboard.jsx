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
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/dashboard/summary",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Erro ao carregar dashboard");
          return;
        }

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

  const visibleWarnings =
    dashboardData.warnings?.filter((warning) => warning.show) || [];

  return (
    <>
      <Header />

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

      <h2 className="value">
        Valor total: R$ {Number(dashboardData.totalBalance).toFixed(2)}
      </h2>

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
          to="/debts"
          className="installmentssection"
          label="Dívidas"
        />
      </section>

      <section className="summaries">
        <section className="summarytransactions">
          <p>Transações: {dashboardData.summaries.transactions}</p>
        </section>

        <section className="summarycategories">
          <p>Categorias: {dashboardData.summaries.categories}</p>
        </section>

        <section className="summaryaccounts">
          <p>Contas: {dashboardData.summaries.accounts}</p>
        </section>

        <section className="summaryinstallments">
          <p>Dívidas: {dashboardData.summaries.debts}</p>
        </section>
      </section>
    </>
  );
}

export default Dashboard;
