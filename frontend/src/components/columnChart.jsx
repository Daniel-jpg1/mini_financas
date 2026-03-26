import { useState, useEffect } from "react";

function ColumnChart() {
  const [debt, setDebt] = useState([]);
  const maxValue = 10000;
  let leftSteps = 5;
  let labels = [];
  const months = useState([
    { month: "Jan", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Fev", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Mar", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Abr", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Mai", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Jun", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Jul", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Ago", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Set", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Out", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Nov", recebidas: 500, feitas: 400, dividas: 300 },
    { month: "Dez", recebidas: 500, feitas: 400, dividas: 300 },
  ]);
  console.log(months);

  for (let i = 0; i <= leftSteps; i++) {
    labels.push(Math.round((maxValue / leftSteps) * i));
  }

  useEffect(() => {
    async function fetchDebts() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/debts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(data.error);
          return;
        }

        setDebt(data);
      } catch (error) {
        console.error("Erro ao mostrar dados", error);
      }
    }

    fetchDebts();
  }, []);

  return (
    <section className="columnChart">
      {debt.map((item) => {
        return <h1 key={item.id}>{item.total_amount}</h1>;
      })}
      {months.map((month) => {
        return (
          <h1 key={month.month}>
            {month.month} {month.recebidas} {month.feitas} {month.dividas}
          </h1>
        );
      })}{" "}
    </section>
  );
}

export default ColumnChart;
