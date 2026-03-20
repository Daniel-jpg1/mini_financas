import { useState } from "react";

function AddAccountModal({ isOpen, onClose, onAccountCreated }) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          balance: Number(balance),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      console.log("Conta criada com sucesso:", data);

      await onAccountCreated();

      setName("");
      setBalance("");
      onClose();
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modalOverlay">
      <section className="modalContent">
        <h2>Adicionar conta</h2>

        <form onSubmit={handleSubmit}>
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
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default AddAccountModal;
