/**
 * Catálogo central de sistemas do Portal do Distrito Nordeste Central.
 *
 * status: disponivel | manutencao | indisponivel
 * access: true habilita o acesso; false mantém o card bloqueado.
 */

export const SISTEMAS = [

      {
        id: "assembleias-pastorais",

        nome: "Assembleias Locais",

        descricao:
          "Formulário das assembleias locais, reconduções, sugestões e definições pastorais.",

        icone: "📋",

        categoria: "Administrativo",

        status: "disponivel",

        access: true,

        /*
          COLOQUE AQUI O LINK REAL DO SEU
          GOOGLE APPS SCRIPT WEB APP.

          Exemplo:
          https://script.google.com/macros/s/XXXX/exec
        */

        url:
          "https://script.google.com/macros/s/AKfycbzlioy6jHro4uFaZJkTeFxo4FUAOdDuZ1ZJzpl8Arv5dfYT452NVOT3sbDTrktU4xND/exec"
      },

      {
        id: "entrevista-ministerial",

        nome: "Entrevista Ministerial",

        descricao:
          "Formulário de entrevista ministerial, primeira entrenvista, renovação de licenças, sugestões e definições ministeriais.",

        icone: "📖",

        categoria: "Administrativo",

        status: "disponivel",

        access: true,

        /*
          COLOQUE AQUI O LINK REAL DO SEU
          GOOGLE APPS SCRIPT WEB APP.

          Exemplo:
          https://script.google.com/macros/s/XXXX/exec
        */

        url:
          "https://script.google.com/macros/s/AKfycbxZRPmnqhGtevcX24DZWvkD26A1-sNS8UYMl4nsjXqMe7SAC4lwqfcJ9ri995VWEnWo/exec"
      },


      {
        id: "cadastro-igrejas",

        nome: "Cadastro de Igrejas",

        descricao:
          "Cadastro e gerenciamento das informações das igrejas e congregações do Distrito.",

        icone: "⛪",

        categoria: "Cadastro",

        status: "indisponivel",

        access: false,

        url: "#"
      },


      {
        id: "relatorios",

        nome: "Relatórios Administrativos",

        descricao:
          "Consultas, indicadores e relatórios para acompanhamento administrativo do Distrito.",

        icone: "📊",

        categoria: "Relatórios",

        status: "indisponivel",

        access: false,

        url: "#"
      },


      {
        id: "documentos",

        nome: "Documentos Administrativos",

        descricao:
          "Acesso organizado a documentos, formulários e materiais administrativos.",

        icone: "📄",

        categoria: "Documentos",

        status: "disponivel",

        access: true,

        url: "https://drive.google.com/drive/folders/1HigFgQOp8Odt3R_xWC9oZYZhInsK9nq-"
      },


      {
        id: "tesouraria",

        nome: "Tesouraria",

        descricao:
          "Formulário de tesouraria, comprovantes, recibos, ofertas, fundo distrital, fundo teologico.",

        icone: "💰",

        categoria: "Financeiro",

        status: "indisponivel",

        access: false,

        url: "#"
      },


      {
        id: "agenda",

        nome: "Agenda Administrativa",

        descricao:
          "Consulta de eventos, reuniões, assembleias e compromissos administrativos.",

        icone: "📅",

        categoria: "Agenda",

        status: "manutencao",

        access: false,

        url: "#"
      },


      {
        id: "usuarios",

        nome: "Administrador/Secretário",

        descricao:
          "Área revervada aos Administradores do Distrito.",

        icone: "⚙️",

        categoria: "Administração",

        status: "disponivel",

        access: true,

        url: "https://script.google.com/macros/s/AKfycbxZLA-7tCS5vREriHqhu7RpC9eMkRfMjnB7iOagZrqI6rn9BgvcbtlNh7Zjv_oyvo2m/exec"
      }

    ];
