import { useEffect, useState } from "react";
import Header from "../../components/header";
import CircleShortcut from "../../components/circleShortcut";
import AccountCard from "../../components/accountCard";
import AddAccountModal from "../../components/addAccountModal";
import EditAccountModal from "../../components/editAccountModal";
import DeleteAccountModal from "../../components/deleteAccountModal";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function fetchAccounts() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao carregar contas");
        return;
      }

      setAccounts(data);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      setError("Erro ao carregar contas");
    }
  }

  useEffect(() => {
    async function loadAccounts() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/accounts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Erro ao carregar contas");
          return;
        }

        setAccounts(data);
        setError("");
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
        setError("Erro ao carregar contas");
      }
    }

    loadAccounts();
  }, []);

  function handleOpenEditModal() {
    if (!selectedAccount) {
      alert("Selecione uma conta primeiro");
      return;
    }

    setIsEditModalOpen(true);
  }

  return (
    <>
      <Header showBackButton={true} />

      <section className="sections">
        <CircleShortcut
          to=""
          className="addAccount"
          label="Adicionar"
          onClick={() => setIsAddModalOpen(true)}
        />
        <CircleShortcut
          to=""
          className="editAccount"
          label="Editar"
          onClick={handleOpenEditModal}
        />
        <CircleShortcut
          to=""
          className="deleteAccount"
          label="Excluir"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </section>

      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAccountCreated={fetchAccounts}
      />

      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        accounts={accounts}
        onAccountUpdated={fetchAccounts}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        accounts={accounts}
        onAccountUpdated={fetchAccounts}
      />

      {error && <p>{error}</p>}

      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          name={account.name}
          balance={account.balance}
          isSelected={selectedAccount?.id === account.id}
          onClick={() => setSelectedAccount(account)}
        />
      ))}
    </>
  );
}

export default Accounts;
