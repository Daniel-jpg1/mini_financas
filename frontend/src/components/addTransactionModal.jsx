import { useState } from "react";

function AddTransactionModal({
  isOpen,
  onClose,
  onTransactionCreated,
  accounts = [],
}) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [direction, setDirection] = useState("");
  const [category_id, setCategory] = useState("");
  const [transaction_date, setDate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const accountIdNumber = Number(selectedAccountId);

    console.log("selectedAccountId:", selectedAccountId);
    console.log("accountIdNumber:", accountIdNumber);

    if (!selectedAccountId) {
      console.log("Nenhuma conta selecionada");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        amount: Number(amount),
        description,
        account_id: accountIdNumber,
        type,
        direction,
        category_id,
        transaction_date,
      };

      console.log("payload enviado:", payload);

      const response = await fetch("http://localhost:3000/api/transactions", {
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

      console.log("Transação criada com sucesso:", data);

      await onTransactionCreated();

      setSelectedAccountId("");
      setType("");
      setAmount("");
      setDescription("");
      setDirection("");
      setCategory("");
      setDate("");
      onClose();
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Adicionar Transação</h2>

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
            type="number"
            placeholder="Valor da Transação"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Forma de pagamento</option>
            <option>Pix</option>
            <option>Crédito</option>
            <option>Debito</option>
            <option>Dinheiro</option>
          </select>

          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option>Pagando ou recebendo</option>
            <option>Receber</option>
            <option>Pagar</option>
          </select>
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data da transação"
            value={transaction_date}
            onChange={(e) => setDate(e.target.value)}
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

export default AddTransactionModal;
