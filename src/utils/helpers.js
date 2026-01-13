/**
 * Converte uma string de tempo (HH:MM:SS) para o total em segundos.
 * Usado para facilitar a ordenação do ranking (quem tem menos segundos ganha).
 * @param {string} hms - Tempo no formato "00:00:00"
 */
export const timeToSeconds = (hms) => {
  const parts = hms.split(':').map(Number);

  if (parts.length !== 3) return 0;
  const [h, m, s] = parts;
  return (h * 3600) + (m * 60) + s;
};

/**
 * Retorna o título formatado de uma etapa com base no ID.
 * Se não encontrar, retorna um genérico "Etapa X".
 */
export const getStageTitle = (stages, id) => {
  return stages.find(s => s.id === id)?.title.split(' - ')[0] || `Etapa ${id}`;
};

/**
 * Sistema de Pontuação do Campeonato (Estilo Fórmula 1).
 * 1º Lugar = 25 pontos, 2º = 18, etc.
 * @param {number} position - Posição de chegada (1, 2, 3...)
 */
export const calculatePoints = (position) => {
  const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
  return pointsSystem[position - 1] || 0;
};
