import { useState } from "react";

function EditTransactionModal({
  isOpen,
  onClose,
  transactions,
  onTransactionUpdated,
}) {
  const [transaction, setSelectedInstallmentId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [direction, setDirection] = useState("");
  const [transaction_date, setDate] = useState("");
  const [category_id, setCategory] = useState("");

  function handleClose() {
    setSelectedInstallmentId("");
    setType("");
    setAmount("");
    setDescription("");
    setDirection("");
    setCategory("");
    setDate("");
    onClose();
  }

  function handleSelectChange(event) {
    const accountId = event.target.value;
    setSelectedInstallmentId(accountId);

    const selectedDebt = transactions.find(
      (transaction) => String(transaction.id) === accountId,
    );

    if (selectedDebt) {
      setType(selectedDebt.type);
      setAmount(selectedDebt.amount);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const accountIdNumber = Number(transaction);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/transactions/${accountIdNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(amount),
            description,
            account_id: accountIdNumber,
            type,
            direction,
            category_id,
            transaction_date,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      await onTransactionUpdated();
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
        <h2>Editar transação</h2>

        <form onSubmit={handleSubmit}>
          <select value={transaction} onChange={handleSelectChange}>
            <option value="">Selecione uma transação</option>
            {transactions.map((transaction) => (
              <option key={transaction.id} value={transaction.id}>
                {transaction.type}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nome da dívida"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor da transação"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

export default EditTransactionModal;
