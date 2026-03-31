import { useState, useEffect, useMemo } from "react";

function ColumnChart() {
  const [allInstallments, setAllInstallments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAllInstallments() {
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3000/api/installments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("DADOS RECEBIDOS:", data);
          setAllInstallments(Array.isArray(data) ? data : []);
        } else {
          const errorData = await response.json();
          console.error("ERRO DO SERVIDOR:", errorData);
        }
      } catch (error) {
        console.error("ERRO DE REDE:", error);
      }
    }

    fetchAllInstallments();
  }, [token]);

  const chartData = useMemo(() => {
    const monthsNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const initialMonths = monthsNames.map((name) => ({
      month: name,
      total: 0,
    }));

    allInstallments.forEach((item) => {
      const date = new Date(item.due_date);
      const monthIndex = date.getUTCMonth();
      if (initialMonths[monthIndex]) {
        initialMonths[monthIndex].total += Number(item.amount) || 0;
      }
    });

    return initialMonths;
  }, [allInstallments]);

  const maxVal = useMemo(() => {
    const highest = Math.max(...chartData.map((d) => d.total));
    return highest > 0 ? highest : 1000;
  }, [chartData]);

  return (
    <section
      className="columnChart"
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: "250px",
        gap: "8px",
        padding: "15px",
      }}
    >
      {chartData.map((data, index) => {
        const barHeight = (data.total / maxVal) * 100;

        return (
          <div
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "20%",
                  height: `${barHeight}%`,
                  backgroundColor: "#4CAF50",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.5s ease",
                }}
              />
            </div>
            <span style={{ fontSize: "11px", marginTop: "8px" }}>
              {data.month}
            </span>
            <span style={{ fontSize: "9px", color: "#666" }}>
              {data.total > 0 ? `R$${Math.round(data.total)}` : ""}
            </span>
          </div>
        );
      })}
    </section>
  );
}

export default ColumnChart;
