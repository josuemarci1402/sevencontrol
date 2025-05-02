import dynamic from "next/dynamic";
const PainelAcademia = dynamic(() => import("../components/PainelAcademia"), { ssr: false });

export default function Painel() {
  if (typeof window !== "undefined" && localStorage.getItem("auth") !== "ok") {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return <PainelAcademia />;
}
