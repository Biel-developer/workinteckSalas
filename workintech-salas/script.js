let workshops = JSON.parse(localStorage.getItem('workshops'));

const padraoworkshops = {
  nome: 'N/A',
  bloco: 'N/A',
  tipo: 'N/A',
  numero: 'N/A',
  capacidade: 'N/A',
  visitada: false,
  observacoes: 'Sem observações.'
};

if (!workshops || workshops.length === 0) {
  workshops = [
    { nome: 'Automação Web', bloco: 10, tipo: 'Lab', numero: 22, capacidade: 24, visitada: false, observacoes: '' },
    { nome: 'Prototipagem/Mvp', bloco: 10, tipo: 'Lab', numero: 18, capacidade: 36, visitada: false, observacoes: '' },
    { nome: 'Gerenciamento de Projetos', bloco: 7, tipo: 'Lab', numero: 8, capacidade: 40, visitada: false, observacoes: '' },
    { nome: 'Carreira', bloco: 7, tipo: 'Sala', numero: 26, capacidade: 60, visitada: false, observacoes: '' },
    { nome: 'Clean Code', bloco: 10, tipo: 'Lab', numero: 17, capacidade: 32, visitada: false, observacoes: '' },
    { nome: 'Testes', bloco: 7, tipo: 'Lab', numero: 14, capacidade: 34, visitada: false, observacoes: '' },
    { nome: 'Oratória / Pitch', bloco: 7, tipo: 'Sala', numero: 25, capacidade: 60, visitada: false, observacoes: '' },
    { nome: 'IA', bloco: 8, tipo: 'Lab', numero: 23, capacidade: 50, visitada: false, observacoes: '' },
    { nome: 'GitHub', bloco: 7, tipo: 'Lab', numero: 9, capacidade: 40, visitada: false, observacoes: '' },
  ];
  localStorage.setItem('workshops', JSON.stringify(workshops));
}

function normalizarSala(sala) {
  return {
    nome: sala.nome || padraoworkshops.nome,
    bloco: sala.bloco !== undefined && sala.bloco !== null ? sala.bloco : padraoworkshops.bloco,
    tipo: sala.tipo || padraoworkshops.tipo,
    numero: sala.numero !== undefined && sala.numero !== null ? sala.numero : padraoworkshops.numero,
    capacidade: sala.capacidade !== undefined && sala.capacidade !== null ? sala.capacidade : padraoworkshops.capacidade,
    visitada: sala.visitada !== undefined && sala.visitada !== null ? sala.visitada : padraoworkshops.visitada,
    observacoes: sala.observacoes || padraoworkshops.observacoes
  };
}

const lista = document.getElementById('listaSalas');

function renderizarWorkshops() {
  lista.innerHTML = '';

  workshops.forEach((salaOriginal, index) => {
    const sala = normalizarSala(salaOriginal);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="status-icon ${sala.visitada ? 'visited' : 'not-visited'}">
        ${sala.visitada ? '✅' : '❌'}
      </div>
      <h3>${sala.nome}</h3>
      <p><strong>Bloco:</strong> ${sala.bloco}</p>
      <p><strong>Tipo:</strong> ${sala.tipo} ${sala.numero}</p>
      <p><strong>Capacidade Máxima:</strong> ${sala.capacidade}</p>
      <p><strong>Observações:</strong> ${sala.observacoes || 'Sem observações.'}</p>
      <p><strong>Status:</strong> ${sala.visitada ? 'Visitada' : 'Pendente'}</p>
      <button class="btn-toggle-status">${sala.visitada ? 'Marcar como Pendente' : 'Marcar como Visitada'}</button>
    `;

    // Botão para alternar status
    const btnToggle = card.querySelector('.btn-toggle-status');
    btnToggle.addEventListener('click', () => {
      workshops[index].visitada = !workshops[index].visitada;
      localStorage.setItem('workshops', JSON.stringify(workshops));
      renderizarWorkshops();
    });

    lista.appendChild(card);
  });
}

renderizarWorkshops();


window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('mainContent').style.display = 'block';
    }, 3000); // 3 segundos (ajuste como quiser)
  });