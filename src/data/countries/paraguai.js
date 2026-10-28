export const paraguai = {
  code: 'PY',
  name: 'Paraguai',
  from: 'BR',
  line: 'Para quem é do Brasil e começa pela residência temporária do Mercosul.',
  about:
    'Para quem é do Brasil e quer organizar a mudança pela residência temporária do Mercosul. Trabalho remoto e estudo usam esse primeiro pedido. A prova da atividade entra depois, na residência permanente. O plano começa pelo passaporte. Não promete residência.',
  paths: [
    {
      id: 'remoto',
      name: 'Trabalho remoto',
      summary:
        'Para quem é do Brasil e quer morar no Paraguai trabalhando de longe. O primeiro pedido oficial é a residência temporária do Mercosul.',
      notThis:
        'Este caminho não serve para uma viagem curta. A prova de trabalho a distância não entra neste primeiro pedido.',
      lawyer:
        'Procure um advogado se a família, o estado civil ou o tempo fora do Brasil mudarem os antecedentes. A lista da Migrações manda no que enviar.',
      official: {
        label: 'Residência temporária do Mercosul',
        url: 'https://migraciones.gov.py/residencia-temporaria-mercosur/',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o seu caso cabe neste caminho',
          detail: 'Você é do Brasil e quer residir enquanto o trabalho de longe durar. Não é um visto de nômade separado.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a lista da residência temporária',
          detail: 'A página da Migrações é a fonte. O valor da taxa está lá, não aqui.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir o documento de identidade',
          detail: 'A lista aceita passaporte ou documento brasileiro vigente. Separe o original e uma cópia autenticada.',
        },
        {
          id: 'papelada',
          lane: 'seguir',
          title: 'Separar nascimento e antecedentes',
          detail: 'Apostila nos dois. Papel do Brasil em português não precisa de tradução, segundo a própria Migrações.',
        },
        {
          id: 'entrada',
          lane: 'seguir',
          title: 'Guardar o comprovante de entrada',
          detail: 'Carimbo no passaporte ou boleta de ingresso, como a lista descrever.',
        },
        {
          id: 'trabalho',
          lane: 'seguir',
          title: 'Deixar a prova de trabalho para a residência permanente',
          detail:
            'Na residência permanente, a Migrações pede um comprovante da relação de trabalho e de como o pagamento chega. Sem valor copiado aqui.',
        },
      ],
      documents: [
        {
          id: 'identidade',
          lane: 'abrir',
          name: 'Passaporte ou documento brasileiro',
          note: 'Vigente, original e cópia autenticada.',
        },
        {
          id: 'nascimento',
          lane: 'seguir',
          name: 'Certidão de nascimento',
          note: 'Apostilada. Em português, a Migrações dispensa tradução.',
        },
        {
          id: 'antecedentes',
          lane: 'seguir',
          name: 'Antecedentes do Brasil',
          note: 'Com alcance nacional e apostila.',
        },
        {
          id: 'entrada',
          lane: 'seguir',
          name: 'Comprovante de entrada',
          note: 'Carimbo ou boleta, como a lista pedir.',
        },
        {
          id: 'trabalho',
          lane: 'seguir',
          name: 'Comprovante de trabalho a distância',
          note: 'Só na residência permanente. A lista pede a relação de trabalho, sem valor copiado aqui.',
        },
      ],
    },
    {
      id: 'estudo',
      name: 'Estudo',
      summary:
        'Para quem é do Brasil e vai estudar no Paraguai. A residência temporária do Mercosul é o primeiro pedido.',
      notThis:
        'Este caminho não serve para quem ainda não tem instituição em vista. Ser estudante, sozinho, não fecha a residência permanente.',
      lawyer:
        'Procure um advogado se o curso for a distância ou se a família for o sustento. A lista da Migrações manda no que enviar.',
      official: {
        label: 'Residência temporária do Mercosul',
        url: 'https://migraciones.gov.py/residencia-temporaria-mercosur/',
        reviewed: '2026-10-28',
      },
      tasks: [
        {
          id: 'encaixe',
          lane: 'abrir',
          title: 'Ver se o estudo cabe neste caminho',
          detail: 'Há uma instituição no processo. O primeiro pedido ainda é a residência temporária, não a permanente.',
        },
        {
          id: 'oficial',
          lane: 'abrir',
          title: 'Abrir a lista da residência temporária',
          detail: 'A página da Migrações é a fonte. O valor da taxa está lá, não aqui.',
        },
        {
          id: 'passaporte',
          lane: 'abrir',
          title: 'Conferir o documento de identidade',
          detail: 'A lista aceita passaporte ou documento brasileiro vigente. Separe o original e uma cópia autenticada.',
        },
        {
          id: 'papelada',
          lane: 'seguir',
          title: 'Separar nascimento e antecedentes',
          detail: 'Apostila nos dois. Papel do Brasil em português não precisa de tradução, segundo a própria Migrações.',
        },
        {
          id: 'entrada',
          lane: 'seguir',
          title: 'Guardar o comprovante de entrada',
          detail: 'Carimbo no passaporte ou boleta de ingresso, como a lista descrever.',
        },
        {
          id: 'escola',
          lane: 'seguir',
          title: 'Guardar a constância de estudante para a residência permanente',
          detail:
            'Essa prova fica na página da residência permanente. Ela pede continuidade ao longo da temporária e meios de subsistência. O valor não entra aqui.',
        },
      ],
      documents: [
        {
          id: 'identidade',
          lane: 'abrir',
          name: 'Passaporte ou documento brasileiro',
          note: 'Vigente, original e cópia autenticada.',
        },
        {
          id: 'nascimento',
          lane: 'seguir',
          name: 'Certidão de nascimento',
          note: 'Apostilada. Em português, a Migrações dispensa tradução.',
        },
        {
          id: 'antecedentes',
          lane: 'seguir',
          name: 'Antecedentes do Brasil',
          note: 'Com alcance nacional e apostila.',
        },
        {
          id: 'entrada',
          lane: 'seguir',
          name: 'Comprovante de entrada',
          note: 'Carimbo ou boleta, como a lista pedir.',
        },
        {
          id: 'escola',
          lane: 'seguir',
          name: 'Constância de estudante',
          note: 'Para a residência permanente. A lista também pede meios de subsistência, sem valor copiado aqui.',
        },
      ],
    },
  ],
}
