export const eua = {
  code: 'US',
  name: 'Estados Unidos',
  from: 'BR',
  line: 'Para separar estudo de trabalho antes de tratar um visto de turismo como se fosse mudança.',
  about:
    'Para quem quer separar estudo de trabalho. O estudo é para quem tem uma escola aprovada nos Estados Unidos. O trabalho remoto não tem um visto próprio: a página oficial mostra as categorias que existem, e a maior parte pede uma empresa no país. O plano começa pelo passaporte. Não promete visto.',
  paths: [
    {
      id: 'remoto',
      name: 'Trabalho remoto',
      summary:
        'Para quem quer morar nos Estados Unidos trabalhando para fora do país. Não existe um visto de trabalho remoto.',
      notThis:
        'Este caminho não serve para quem vai procurar emprego numa empresa americana, nem para trabalhar com visto de turismo.',
      lawyer:
        'Procure um advogado antes de tratar o visto de turismo como autorização de trabalho. A página oficial manda no que existe.',
      official: {
        label: 'Vistos de trabalho temporário do Departamento de Estado',
        url: 'https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o seu trabalho cabe neste caminho',
          detail: 'Não há visto de nômade digital. Visto de turismo não autoriza este trabalho.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a lista oficial de trabalho temporário',
          detail: 'A maior parte das categorias pede uma empresa nos Estados Unidos e uma petição aprovada.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir a validade do passaporte',
          detail: 'Separe o original. A página oficial diz qual validade ele precisa ter.',
        },
        {
          id: 'categoria',
          lane: 'seguir',
          title: 'Ver se alguma categoria cabe no seu caso',
          detail: 'Sem uma categoria oficial e, quando ela exigir, sem petição de empresa, este caminho não segue.',
        },
        {
          id: 'agenda',
          lane: 'seguir',
          title: 'Escolher quando agendar o pedido',
          detail: 'Só marque depois que a página oficial disser que a etapa anterior foi aceita.',
        },
      ],
      documents: [
        { id: 'passaporte', lane: 'abrir', name: 'Passaporte', note: 'Original. A validade pedida está na página oficial.' },
        {
          id: 'peticao',
          lane: 'seguir',
          name: 'Petição da categoria, se ela exigir',
          note: 'O formulário está na página oficial. Não há lista de nômade para copiar.',
        },
      ],
    },
    {
      id: 'estudo',
      name: 'Estudo',
      summary:
        'Para quem vai estudar numa escola aprovada nos Estados Unidos e quer separar esse pedido de uma viagem.',
      notThis: 'Este caminho não serve para quem ainda não tem aceite da escola, nem para um curso solto de turismo.',
      lawyer:
        'Procure um advogado se a escola, a bolsa ou a família mudarem o tipo de visto. A página oficial manda no que enviar.',
      official: {
        label: 'Visto de estudante do Departamento de Estado',
        url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o estudo cabe neste caminho',
          detail: 'A escola precisa ser aceita pelo programa oficial de estudantes e emitir o formulário de elegibilidade.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a página oficial do visto de estudante',
          detail: 'Ela diz a ordem do pedido. O consulado da sua região confirma o dia da entrevista.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir a validade do passaporte',
          detail: 'Separe o original. A página oficial diz qual validade ele precisa ter.',
        },
        {
          id: 'aceite',
          lane: 'seguir',
          title: 'Separar o formulário da escola',
          detail: 'É o I-20, assinado por você e pela escola, como a página oficial pedir.',
        },
        {
          id: 'sevis',
          lane: 'seguir',
          title: 'Separar o comprovante do cadastro de estudante',
          detail: 'A taxa do SEVIS está na página oficial. Não copie um valor antigo.',
        },
        {
          id: 'agenda',
          lane: 'seguir',
          title: 'Escolher quando agendar a entrevista',
          detail: 'Leve a confirmação do pedido online. Só marque com a papelada separada.',
        },
      ],
      documents: [
        { id: 'passaporte', lane: 'abrir', name: 'Passaporte', note: 'Original. A validade pedida está na página oficial.' },
        {
          id: 'i20',
          lane: 'seguir',
          name: 'Formulário I-20',
          note: 'Emitido pela escola e assinado, como a página oficial pedir.',
        },
        {
          id: 'sevis',
          lane: 'seguir',
          name: 'Comprovante do SEVIS',
          note: 'O valor da taxa está na página oficial.',
        },
        {
          id: 'pedido',
          lane: 'seguir',
          name: 'Confirmação do pedido online',
          note: 'A página oficial chama esse formulário de DS-160.',
        },
      ],
    },
  ],
}
