export const LOGO_URL = "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100";

export const STAGES_DATA = [
  {
    id: 1,
    title: "Etapa Verão - São Paulo",
    month: "Fevereiro",
    releaseDate: "2025-02-01",
    description: "Abertura oficial do circuito na capital paulista.",
    status: "active", 
  },
  {
    id: 2,
    title: "Etapa Outono - Rio de Janeiro",
    month: "Maio",
    releaseDate: "2025-05-15",
    description: "Percurso deslumbrante pela orla da Cidade Maravilhosa.",
    status: "locked",
  },
  {
    id: 3,
    title: "Etapa Inverno - Curitiba",
    month: "Agosto",
    releaseDate: "2025-08-10",
    description: "O desafio final sob as baixas temperaturas do sul.",
    status: "locked",
  }
];

export const INITIAL_RANKING = [
  { id: 1, name: "Lucas Andrade", stageId: 1, time: "00:38:15", seconds: 2295, photo: "https://images.unsplash.com/photo-1596207891316-23851be3cc20?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Beatriz Santos", stageId: 1, time: "00:42:02", seconds: 2522, photo: "https://images.unsplash.com/photo-1547482850-0af1589c72c2?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Marcos Oliveira", stageId: 1, time: "00:45:50", seconds: 2750, photo: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Juliana Costa", stageId: 2, time: "00:40:10", seconds: 2410, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
];
