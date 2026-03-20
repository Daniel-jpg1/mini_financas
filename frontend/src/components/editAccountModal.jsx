import { useState } from "react";

function EditAccountModal({ isOpen, onClose, accounts, onAccountUpdated }) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  function handleClose() {
    setSelectedAccountId("");
    setName("");
    setBalance("");
    onClose();
  }

  function handleSelectChange(event) {
    const accountId = event.target.value;
    setSelectedAccountId(accountId);

    const selectedAccount = accounts.find(
      (account) => String(account.id) === accountId,
    );

    if (selectedAccount) {
      setName(selectedAccount.name);
      setBalance(selectedAccount.balance);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/accounts/${selectedAccountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            balance: Number(balance),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      await onAccountUpdated();
      handleClose();
    } catch (error) {
      console.error("Erro ao editar conta:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Editar conta</h2>

        <form onSubmit={handleSubmit}>
          <select value={selectedAccountId} onChange={handleSelectChange}>
            <option value="">Selecione uma conta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nome da conta"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Saldo inicial"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />

          <section className="modalButtons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default EditAccountModal;
