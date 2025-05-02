import { useState, useEffect } from "react";
import { Phone, CheckCircle, Star, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PainelAcademia() {
  const today = new Date().getDate();
  const dadosIniciais = [
    { academia: "PRATIQUE", nome: "Raylanderson Maycon Souza e Silva", numero: "553198162633", vencimento: 1, renovou: false, indicou: true },
    { academia: "PRATIQUE", nome: "Natal Maciel Pedroso Filho", numero: "553193256212", vencimento: 1, renovou: false, indicou: true },
    { academia: "PRATIQUE", nome: "Eliane Lopes dos Reis", numero: "553193256212", vencimento: 1, renovou: false, indicou: true },
    { academia: "PRATIQUE", nome: "Eduardo Daniel Gomes da Mota", numero: "553197986973", vencimento: 1, renovou: true, indicou: false },
    { academia: "PRATIQUE", nome: "Raphael Artur Moreira e Silva", numero: "553186091885", vencimento: 1, renovou: false, indicou: true },
    { academia: "PRATIQUE", nome: "João Carlos de Pinho Gontijo", numero: "553191911614", vencimento: 2, renovou: false, indicou: false },
    { academia: "PRATIQUE", nome: "Alex Junio Silva de Oliveira", numero: "553192857128", vencimento: 2, renovou: false, indicou: false },
    { academia: "PRATIQUE", nome: "Vitor de Lima Fraga", numero: "553193805587", vencimento: 2, renovou: true, indicou: true },
    { academia: "PRATIQUE", nome: "Luiza Rocha Siqueira", numero: "553193805587", vencimento: 2, renovou: false, indicou: false },
    { academia: "CONTORNO DO CORPO", nome: "Paulo Henrique Vieira dos Santos", numero: "553175557083", vencimento: 2, renovou: false, indicou: false }
  ];

  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [form, setForm] = useState({ nome: "", numero: "", vencimento: 1, academia: "PRATIQUE", renovou: false, indicou: false });
  const [soRenovados, setSoRenovados] = useState(false);
  const [soHoje, setSoHoje] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem("alunosAcademia");
    if (salvo) {
      setAlunos(JSON.parse(salvo));
    } else {
      setAlunos(dadosIniciais);
      localStorage.setItem("alunosAcademia", JSON.stringify(dadosIniciais));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alunosAcademia", JSON.stringify(alunos));
  }, [alunos]);

  const adicionarAluno = () => {
    setAlunos([...alunos, form]);
    setForm({ nome: "", numero: "", vencimento: 1, academia: "PRATIQUE", renovou: false, indicou: false });
  };

  const removerAluno = (i) => {
    const copia = [...alunos];
    copia.splice(i, 1);
    setAlunos(copia);
  };

  const alunosFiltrados = alunos.filter((a) => {
    const matchTexto =
      a.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      a.academia.toLowerCase().includes(filtro.toLowerCase()) ||
      a.vencimento.toString() === filtro;
    const matchRenovou = !soRenovados || a.renovou;
    const matchHoje = !soHoje || a.vencimento === today;
    return matchTexto && matchRenovou && matchHoje;
  });

  const resumo = [
    { nome: "Renovaram", valor: alunos.filter((a) => a.renovou).length },
    { nome: "Indicaram", valor: alunos.filter((a) => a.indicou).length },
    { nome: "PRATIQUE", valor: alunos.filter((a) => a.academia === "PRATIQUE").length },
    { nome: "CONTORNO", valor: alunos.filter((a) => a.academia === "CONTORNO DO CORPO").length },
  ];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Painel de Alunos - SEVENCONTROL</h1>

      <input placeholder="Buscar por nome, vencimento ou academia"
        style={{ padding: 8, marginTop: 10, width: '100%' }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)} />

      <div style={{ marginTop: 10 }}>
        <label>
          <input type="checkbox" checked={soRenovados} onChange={(e) => setSoRenovados(e.target.checked)} /> Só renovados
        </label>
        <label style={{ marginLeft: 20 }}>
          <input type="checkbox" checked={soHoje} onChange={(e) => setSoHoje(e.target.checked)} /> Vencimento hoje
        </label>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontWeight: 'bold' }}>Resumo Geral</h2>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <BarChart data={resumo}>
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontWeight: 'bold' }}>Novo Aluno</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <input placeholder="Número (WhatsApp)" value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} />
          <input placeholder="Vencimento" type="number" value={form.vencimento} onChange={(e) => setForm({ ...form, vencimento: parseInt(e.target.value) })} />
          <input placeholder="Academia" value={form.academia} onChange={(e) => setForm({ ...form, academia: e.target.value })} />
          <label><input type="checkbox" checked={form.renovou} onChange={(e) => setForm({ ...form, renovou: e.target.checked })} /> Renovou</label>
          <label><input type="checkbox" checked={form.indicou} onChange={(e) => setForm({ ...form, indicou: e.target.checked })} /> Indicou</label>
        </div>
        <button style={{ marginTop: 10, padding: 8, background: '#3b82f6', color: '#fff', border: 'none' }} onClick={adicionarAluno}>Adicionar</button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontWeight: 'bold' }}>Lista de Alunos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 15 }}>
          {alunosFiltrados.map((a, i) => (
            <div key={i} style={{ padding: 12, borderLeft: `4px solid ${a.academia === 'PRATIQUE' ? '#3b82f6' : '#10b981'}`, background: a.vencimento === today ? '#fff9c4' : '#f3f4f6' }}>
              <button onClick={() => removerAluno(i)} style={{ float: 'right', background: 'none', border: 'none', color: 'red' }}><Trash2 size={16} /></button>
              <strong>{a.nome}</strong>
              <p>Academia: {a.academia}</p>
              <p>Vencimento: {a.vencimento}</p>
              <a href={`https://wa.me/${a.numero}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>WhatsApp</a>
              <div style={{ marginTop: 5 }}>
                {a.renovou && <CheckCircle size={16} color="green" title="Renovou" style={{ marginRight: 5 }} />}
                {a.indicou && <Star size={16} color="orange" title="Indicou" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
