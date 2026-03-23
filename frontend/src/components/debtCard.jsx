function DebtCard({
  title,
  total_amount,
  description,
  status,
  onClick,
  isSelected,
}) {
  return (
    <section
      className={`debtCardSection ${isSelected ? "selecteddebt" : ""}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{total_amount}</p>
      <p>{description}</p>
      <p>{status}</p>
    </section>
  );
}

export default DebtCard;
