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
          "https://script.google.com/macros/s/AKfycbx8qQneuN9hOS-dQ0WsL2eclNu8hslgSYZMzk48cxcElG6OqIkcXLuah1nTaMxBrv4SHw/exec"
      },


      {
        id: "cadastro-igrejas",

        nome: "Cadastro de Igrejas",

        descricao:
          "Cadastro e gerenciamento das informações das igrejas e congregações do Distrito.",

        icone: "⛪",

        categoria: "Cadastro",

        status: "disponivel",

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

        status: "disponivel",

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

        icone: "👥",

        categoria: "Administração",

        status: "indisponivel",

        access: false,

        url: "#"
      }

    ];
