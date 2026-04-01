import { useState } from "react";

function DeleteTransactionModal({ isOpen, onClose, debts, onDebtUpdated }) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [title, setTitle] = useState("");
  const [total_amount, setTotal] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function handleClose() {
    setSelectedAccountId("");
    setTitle("");
    setTotal("");
    setDescription("");
    setStatus("");
    onClose();
  }

  function handleSelectChange(event) {
    const accountId = event.target.value;
    setSelectedAccountId(accountId);

    const selectedAccount = debts.find(
      (account) => String(account.id) === accountId,
    );

    if (selectedAccount) {
      setTitle(selectedAccount.title);
      setTotal(selectedAccount.total_amount);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/debts/${selectedAccountId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      await onDebtUpdated();
      handleClose();
    } catch (error) {
      console.error("Erro ao deletar dívida:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Deletar dívida</h2>

        <form onSubmit={handleSubmit}>
          <select value={selectedAccountId} onChange={handleSelectChange}>
            <option value="">Selecione uma dívida</option>
            {debts.map((debt) => (
              <option key={debt.id} value={debt.id}>
                {debt.title}
              </option>
            ))}
          </select>

          <p>{title}</p>
          <p>{total_amount}</p>
          <p>{description}</p>
          <p>{status}</p>

          <section className="modalButtons">
            <button type="submit">Deletar</button>
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default DeleteTransactionModal;
