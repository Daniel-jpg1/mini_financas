import { useState } from "react";

function EditDebtModal({ isOpen, onClose, debts, onDebtUpdated }) {
  const [selectedAccountId, setSelectedInstallmentId] = useState("");
  const [title, setTitle] = useState("");
  const [total_amount, setTotal] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function handleClose() {
    setSelectedInstallmentId("");
    setTitle("");
    setTotal("");
    setDescription("");
    setStatus("");
    onClose();
  }

  function handleSelectChange(event) {
    const accountId = event.target.value;
    setSelectedInstallmentId(accountId);

    const selectedDebt = debts.find(
      (account) => String(account.id) === accountId,
    );

    if (selectedDebt) {
      setTitle(selectedDebt.title);
      setTotal(selectedDebt.total_amount);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const accountIdNumber = Number(selectedAccountId);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/debts/${selectedAccountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            total_amount: Number(total_amount),
            description,
            accountId: accountIdNumber,
            status,
          }),
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
      console.error("Erro ao editar dívida:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Editar dívida</h2>

        <form onSubmit={handleSubmit}>
          <select value={selectedAccountId} onChange={handleSelectChange}>
            <option value="">Selecione uma conta</option>
            {debts.map((debt) => (
              <option key={debt.id} value={debt.id}>
                {debt.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nome da dívida"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor da dívida"
            value={total_amount}
            onChange={(e) => setTotal(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditDebtModal;
