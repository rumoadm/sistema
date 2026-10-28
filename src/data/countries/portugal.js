export const portugal = {
  code: 'PT',
  name: 'Portugal',
  from: 'BR',
  paths: [
    {
      id: 'remoto',
      name: 'Trabalho remoto',
      summary:
        'Para quem continua trabalhando para fora de Portugal e quer organizar a mudança com calma.',
      notThis:
        'Este caminho não serve para quem vai procurar emprego em Portugal. Isso é outra rota.',
      lawyer:
        'Procure um advogado se alguém da família tiver uma situação diferente da sua, ou se um documento for difícil de comprovar. A lista oficial manda no que enviar.',
      official: {
        label: 'Portal de Vistos do MNE',
        url: 'https://vistos.mne.gov.pt/',
      },
      tasks: [
        {
          id: 'encaixe',
          title: 'Ver se o seu trabalho cabe neste caminho',
          detail: 'O trabalho é remoto, para empresa ou clientes fora de Portugal.',
        },
        {
          id: 'oficial',
          title: 'Abrir a lista oficial de documentos',
          detail: 'Use o portal do MNE como fonte. Anote o que falta.',
        },
        {
          id: 'passaporte',
          title: 'Conferir a validade do passaporte',
          detail: 'Separe o original e uma cópia. Veja se a validade cobre o processo.',
        },
        {
          id: 'renda',
          title: 'Juntar comprovantes de renda',
          detail: 'Extratos e contratos dos últimos meses, do jeito que o site oficial pedir.',
        },
        {
          id: 'familia',
          title: 'Listar quem vai junto',
          detail: 'Só você, com parceiro ou com filhos muda os documentos.',
        },
        {
          id: 'agenda',
          title: 'Escolher quando agendar o pedido',
          detail: 'Só marque depois que a papelada estiver separada.',
        },
      ],
      documents: [
        { id: 'passaporte', name: 'Passaporte', note: 'Original e cópia.' },
        {
          id: 'antecedentes',
          name: 'Antecedentes criminais',
          note: 'Do Brasil. Confira se precisa de apostila.',
        },
        { id: 'renda', name: 'Comprovantes de renda', note: 'Contratos e extratos.' },
        { id: 'seguro', name: 'Seguro-saúde', note: 'Para a viagem e o pedido.' },
        {
          id: 'moradia',
          name: 'Comprovante de moradia',
          note: 'Reserva ou carta, conforme a lista oficial.',
        },
      ],
    },
  ],
}

export function pathOf(plan) {
  return portugal.paths.find((path) => path.id === plan.pathId) || portugal.paths[0]
}

export function createSamplePlan() {
  const path = portugal.paths[0]
  return {
    countryCode: portugal.code,
    pathId: path.id,
    tasks: path.tasks.map((task, index) => ({ id: task.id, done: index < 4 })),
    documents: path.documents.map((document, index) => ({
      id: document.id,
      status: index < 3 ? 'pronto' : 'pendente',
    })),
  }
}
