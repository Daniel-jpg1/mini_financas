import { useState, useEffect } from "react";

function ColumnChart() {
  const [installment, setInstallment] = useState([]);
  const maxValue = 10000;
  let leftSteps = 5;
  let labels = [];
  const totalAmounts = installment.map((item) => item.installmentAmount);
  const months = [
    { month: "Jan", received: 500, feitas: 400, installments: totalAmounts },
    { month: "Fev", received: 500, feitas: 400, debts: 300 },
    { month: "Mar", received: 500, feitas: 400, debts: 300 },
    { month: "Abr", received: 500, feitas: 400, debts: 300 },
    { month: "Mai", received: 500, feitas: 400, debts: 300 },
    { month: "Jun", received: 500, feitas: 400, debts: 300 },
    { month: "Jul", received: 500, feitas: 400, debts: 300 },
    { month: "Ago", received: 500, feitas: 400, debts: 300 },
    { month: "Set", received: 500, feitas: 400, debts: 300 },
    { month: "Out", received: 500, feitas: 400, debts: 300 },
    { month: "Nov", received: 500, feitas: 400, debts: 300 },
    { month: "Dez", received: 500, feitas: 400, debts: 300 },
  ];

  for (let i = 0; i <= leftSteps; i++) {
    labels.push(Math.round((maxValue / leftSteps) * i));
  }

  useEffect(() => {
    async function fetchInstallments() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/installments", {
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

        setInstallment(data);
      } catch (error) {
        console.error("Erro ao mostrar dados", error);
      }
    }

    fetchInstallments();
  }, []);

  return (
    <section className="columnChart">
      {months.map((month) => {
        return (
          <h1 key={month.month}>
            {month.month} {month.installments}
          </h1>
        );
      })}
    </section>
  );
}

export default ColumnChart;
