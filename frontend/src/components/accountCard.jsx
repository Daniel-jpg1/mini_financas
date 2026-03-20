function AccountCard({ name, balance, onClick, isSelected }) {
  return (
    <section
      className={`accountCardSection ${isSelected ? "selectedAccount" : ""}`}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <p>Saldo: R$ {Number(balance).toFixed(2)}</p>
    </section>
  );
}

export default AccountCard;
