import { useState, useEffect } from "react";

function ColumnChart() {
  const [debt, setDebt] = useState([]);

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
        console.log(data);
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
    </section>
  );
}

export default ColumnChart;
