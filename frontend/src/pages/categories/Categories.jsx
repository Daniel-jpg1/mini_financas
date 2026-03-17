import Header from "../../components/header";
import ColumnChart from "../../components/columnChart";
import TransactionHistory from "../../components/transactionHistory";

function Categories() {
  return (
    <>
      <Header showBackButton={true} />
      <ColumnChart />
      <section className="pieChart">
        <h1>Gráfico Pizza</h1>
      </section>
      <TransactionHistory />
    </>
  );
}

export default Categories;
