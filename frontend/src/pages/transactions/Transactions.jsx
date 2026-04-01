import { useEffect, useState } from "react";
import Header from "../../components/header";
import ColumnChart from "../../components/columnChart";
import TransactionHistory from "../../components/transactionHistory";
import AddTransactionModal from "../../components/addTransactionModal";
import EditTransactionModal from "../../components/editTransactionModal";
import DeleteTransactionModal from "../../components/deleteTransactionModal";
import CircleShortcut from "../../components/circleShortcut";

function Transactions() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState();

  async function fetchTransactions() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/transactions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao carregar transações");
        return;
      }

      setTransactions(data);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setError("Erro ao carregar transações");
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");

        const [accountsResponse] = await Promise.all([
          fetch("http://localhost:3000/api/accounts", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const accountsData = await accountsResponse.json();

        if (!accountsResponse.ok) {
          setError(accountsData.error || "Erro ao carregar contas");
          return;
        }

        setAccounts(accountsData);
        setError("");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados");
      }
    }

    loadData();
  }, []);

  return (
    <>
      <Header showBackButton={true} />
      <section className="sections">
        <CircleShortcut
          to=""
          className="addDebt"
          label="Adicionar"
          onClick={() => setIsAddModalOpen(true)}
        />

        <CircleShortcut
          to=""
          className="editDebt"
          label="Editar"
          onClick={() => setIsEditModalOpen(true)}
        />

        <CircleShortcut to="" className="deleteDebt" label="Excluir" />

        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onTransactionCreated={fetchTransactions}
          accounts={accounts}
        />

        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transactions={transactions}
          onTransactionUpdated={fetchTransactions}
        />

        <DeleteTransactionModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          debts={transactions}
          onDebtUpdated={fetchTransactions}
        />
        {error && <p>{error}</p>}
      </section>

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
