function Register() {
  return (
    <section>
      <h1>Criar sua conta</h1>
      <p>Preencha o formulário para criar sua conta</p>
      <form>
        <input type="text" placeholder="Digite o seu nome" />
        <input type="email" placeholder="Digite o seu e-mail" />
        <input type="password" placeholder="Digite a sua senha" />
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
}

export default Register;
