import Header from "../../components/header.jsx";

function Login() {
  return (
    <section>
      <h1>Entre na sua conta</h1>
      <p>Preencha as informações para entrar na sua conta</p>
      <form>
        <input type="email" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}

export default Login;
