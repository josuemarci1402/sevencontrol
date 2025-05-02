import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  function entrar() {
    if (usuario === "SEVEN777" && senha === "112") {
      localStorage.setItem("auth", "ok");
      router.push("/painel");
    } else {
      alert("Login ou senha inválido.");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login - SEVENCONTROL</h2>
      <input placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} /><br />
      <button onClick={entrar}>Entrar</button>
    </div>
  );
}
