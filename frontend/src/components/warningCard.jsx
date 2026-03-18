function Warnings() {
  const invoiceDue = true;
  const lowBalance = false;
  const overBudget = true;

  const possibleWarnings = [
    {
      id: 1,
      show: invoiceDue,
      message: "Fatura vence amanhã",
    },
    {
      id: 2,
      show: lowBalance,
      message: "Seu saldo está baixo",
    },
    {
      id: 3,
      show: overBudget,
      message: "Você ultrapassou o orçamento",
    },
  ];

  const warnings = possibleWarnings.filter((warning) => warning.show);

  return (
    <section className="warningCard">
      {warnings.length === 0 ? (
        <p>Nenhum aviso no momento.</p>
      ) : (
        warnings.map((warning) => (
          <div key={warning.id}>
            <p>{warning.message}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default Warnings;
