import Header from "../../components/header";
import ColumnChart from "../../components/columnChart";
import TransactionHistory from "../../components/transactionHistory";

function Transactions() {
  return (
    <>
      <Header showBackButton={true} />
      {/* Inicio da seção de avisos */}
      <h1 className="warningTransactions">Suas últimas três transações</h1>
      <section className="threeTransactions">
        <article className="transaction1"></article>
      </section>
      <ColumnChart />
      <TransactionHistory />
    </>
  );
}

export default Transactions;
