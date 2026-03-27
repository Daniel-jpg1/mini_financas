import { useState } from "react";

function AddDebtModal({ isOpen, onClose, onDebtCreated, accounts = [] }) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [title, setTitle] = useState("");
  const [total_amount, setTotal] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [number_installments, setNumber_Installments] = useState("");
  const [due_date, setDue_Date] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const accountIdNumber = Number(selectedAccountId);

    if (!selectedAccountId) {
      console.log("Nenhuma conta selecionada");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        title,
        total_amount: Number(total_amount),
        description,
        number_installments: Number(number_installments),
        due_date,
        accountId: accountIdNumber,
        status,
      };

      const response = await fetch("http://localhost:3000/api/debts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      console.log("Dívida criada com sucesso:", data);

      await onDebtCreated();

      setSelectedAccountId("");
      setTitle("");
      setTotal("");
      setNumber_Installments("");
      setDue_Date("");
      setDescription("");
      setStatus("");
      onClose();
    } catch (error) {
      console.error("Erro ao criar dívida:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Adicionar dívida</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            required
          >
            <option value="">Selecione uma conta</option>
            {accounts.map((account) => (
              <option key={account.id} value={String(account.id)}>
                {account.name}
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
            type="number"
            placeholder="Número de parcelas"
            value={number_installments}
            onChange={(e) => setNumber_Installments(e.target.value)}
          />

          <input
            type="date"
            placeholder="Data de vencimento"
            value={due_date}
            onChange={(e) => setDue_Date(e.target.value)}
          />

          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <section className="modalButtons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default AddDebtModal;
