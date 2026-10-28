export const italia = {
  code: 'IT',
  name: 'Itália',
  from: 'BR',
  line: 'Para separar trabalho remoto de estudo antes de marcar qualquer atendimento.',
  about:
    'Para quem quer separar trabalho remoto de estudo antes de marcar um atendimento. O remoto é para quem já trabalha de longe, em atividade qualificada. O estudo é para quem tem uma instituição italiana em vista. O plano começa pelo passaporte. Não promete visto.',
  paths: [
    {
      id: 'remoto',
      name: 'Trabalho remoto',
      summary:
        'Para quem já trabalha de longe, em atividade qualificada, e quer organizar o pedido de nômade digital ou trabalhador remoto.',
      notThis:
        'Este caminho não serve para quem vai procurar emprego na Itália, nem para uma viagem curta.',
      lawyer:
        'Procure um advogado se a qualificação, o contrato ou a família não couberem na lista do consulado. A página oficial manda no que enviar.',
      official: {
        label: 'Consulado da Itália em Porto Alegre',
        url: 'https://consportoalegre.esteri.it/pt/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/nomade-digital-trabalhador-remoto/',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o seu trabalho cabe neste caminho',
          detail: 'É trabalho remoto qualificado, não uma busca de emprego na Itália.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a lista do consulado da sua região',
          detail:
            'A página em português é a de Porto Alegre. Se você mora em outro estado, confirme a mesma lista no consulado que atende a sua casa.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir a validade do passaporte',
          detail: 'Separe o original e uma cópia. A validade precisa cobrir o pedido.',
        },
        {
          id: 'renda',
          lane: 'seguir',
          title: 'Juntar a prova de renda',
          detail: 'O valor mínimo está na página do consulado. Traga extratos do jeito que ela pedir.',
        },
        {
          id: 'qualificacao',
          lane: 'seguir',
          title: 'Separar a prova de qualificação',
          detail: 'Experiência e formação, conforme a lista oficial. Não invente um título.',
        },
        {
          id: 'agenda',
          lane: 'seguir',
          title: 'Escolher quando agendar o pedido',
          detail: 'Só marque depois que a papelada estiver separada.',
        },
      ],
      documents: [
        { id: 'passaporte', lane: 'abrir', name: 'Passaporte', note: 'Original e cópia.' },
        {
          id: 'renda',
          lane: 'seguir',
          name: 'Comprovantes de renda',
          note: 'O mínimo exigido está na página do consulado.',
        },
        {
          id: 'qualificacao',
          lane: 'seguir',
          name: 'Qualificação e experiência',
          note: 'O que a lista oficial aceitar como prova.',
        },
        { id: 'seguro', lane: 'seguir', name: 'Seguro-saúde', note: 'Válido para a Itália no período do pedido.' },
        {
          id: 'moradia',
          lane: 'seguir',
          name: 'Comprovante de moradia',
          note: 'Do jeito que o consulado descrever.',
        },
      ],
    },
    {
      id: 'estudo',
      name: 'Estudo',
      summary: 'Para quem vai estudar numa instituição italiana e quer separar esse pedido de uma viagem de turismo.',
      notThis: 'Este caminho não serve para quem ainda não tem instituição em vista, nem para um curso de poucas semanas.',
      lawyer:
        'Procure um advogado se o curso ou a bolsa mudarem o tipo de visto. O consulado da sua região manda no que enviar.',
      official: {
        label: 'Vistos do Consulado da Itália em São Paulo',
        url: 'https://conssanpaolo.esteri.it/it/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o estudo cabe neste caminho',
          detail: 'Há uma instituição italiana no processo, ou um aceite já emitido.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a lista do consulado da sua região',
          detail:
            'São Paulo é uma porta de entrada. O pedido sai no consulado que atende o estado onde você mora.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir a validade do passaporte',
          detail: 'Separe o original e uma cópia. Veja se a validade cobre o curso.',
        },
        {
          id: 'aceite',
          lane: 'seguir',
          title: 'Separar o aceite ou a matrícula',
          detail: 'Use o documento da instituição, no formato que o consulado pedir.',
        },
        {
          id: 'meios',
          lane: 'seguir',
          title: 'Juntar a prova de meios',
          detail: 'O valor e o tipo de comprovante estão na lista do consulado.',
        },
        {
          id: 'agenda',
          lane: 'seguir',
          title: 'Escolher quando agendar o pedido',
          detail: 'Só marque depois que a papelada estiver separada.',
        },
      ],
      documents: [
        { id: 'passaporte', lane: 'abrir', name: 'Passaporte', note: 'Original e cópia.' },
        {
          id: 'aceite',
          lane: 'seguir',
          name: 'Aceite ou matrícula',
          note: 'Documento da instituição, como o consulado pedir.',
        },
        {
          id: 'meios',
          lane: 'seguir',
          name: 'Prova de meios',
          note: 'O mínimo exigido está na lista oficial.',
        },
        { id: 'seguro', lane: 'seguir', name: 'Seguro-saúde', note: 'Válido para a Itália no período do pedido.' },
      ],
    },
  ],
}
