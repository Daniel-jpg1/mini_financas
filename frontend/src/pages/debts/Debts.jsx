import { useEffect, useState } from "react";
import Header from "../../components/header";
import CircleShortcut from "../../components/circleShortcut";
import DebtCard from "../../components/debtCard";
import AddDebtModal from "../../components/addDebtModal";
import EditDebtModal from "../../components/editDebtModal";
import DeleteDebtModal from "../../components/deleteDebtModal";

function Debts() {
  const [debts, setDebts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function fetchDebts() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/debts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao carregar dívidas");
        return;
      }

      setDebts(data);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar dívidas:", error);
      setError("Erro ao carregar dívidas");
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");

        const [debtsResponse, accountsResponse] = await Promise.all([
          fetch("http://localhost:3000/api/debts", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:3000/api/accounts", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const debtsData = await debtsResponse.json();
        const accountsData = await accountsResponse.json();

        if (!debtsResponse.ok) {
          setError(debtsData.error || "Erro ao carregar dívidas");
          return;
        }

        if (!accountsResponse.ok) {
          setError(accountsData.error || "Erro ao carregar contas");
          return;
        }

        setDebts(debtsData);
        setAccounts(accountsData);
        setError("");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados");
      }
    }

    loadData();
  }, []);

  function handleOpenEditModal() {
    if (!selectedDebt) {
      alert("Selecione uma dívida primeiro");
      return;
    }

    setIsEditModalOpen(true);
  }

  function handleOpenDeleteModal() {
    if (!selectedDebt) {
      alert("Selecione uma dívida primeiro");
      return;
    }

    setIsDeleteModalOpen(true);
  }

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
          onClick={handleOpenEditModal}
        />

        <CircleShortcut
          to=""
          className="deleteDebt"
          label="Excluir"
          onClick={handleOpenDeleteModal}
        />
      </section>

      <AddDebtModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDebtCreated={fetchDebts}
        accounts={accounts}
      />

      <EditDebtModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        debts={debts}
        onDebtUpdated={fetchDebts}
      />

      <DeleteDebtModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        debts={debts}
        onDebtUpdated={fetchDebts}
      />

      {error && <p>{error}</p>}

      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          title={debt.title}
          total_amount={debt.total_amount}
          description={debt.description}
          isSelected={selectedDebt?.id === debt.id}
          onClick={() => setSelectedDebt(debt)}
        />
      ))}
    </>
  );
}

export default Debts;
