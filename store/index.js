import { v1 as uuidv1 } from "uuid";

// maquina de estado da aplicação
// O State a fonte de todos os dados da aplicaçãa e é nele que são persistidos os dados cadastrados.

export const state = () => ({
  usuarios: [
    {
      id: uuidv1(),
      nome: "Luciano Henrique Alves Diniz",
      email: "luhdev.bsb@gmail.com",
      senha: "asdasd",
      perfil: "Atendente"
    },
    {
      id: uuidv1(),
      nome: "Luiz Carlos Ferreira",
      email: "slipbad@gmail.com",
      senha: "asdasd",
      perfil: "Admin"
    }
  ],
  usuarioLogado: {
    id: uuidv1(),
    nome: "Luiz Carlos Ferreira",
    email: "slipbad@gmail.com",
    senha: "asdasd",
    perfil: "Admin"
  },
  pets: [],
  tiposPet: ["Cachorro", "Gato", "Ave", "Peixe", "Roedor"],
  clientes: ["Cassiano Peixoto", "Leonardo Leão", "Ângela Serpa"],
  veterinarios: [],
  avaliacoes: [],
  menu: [
    {
      titulo: "Página inicial",
      perfisPermitidos: ["Admin", "Atendente"],
      icon: "mdi-home",
      to: "/"
    },
    {
      titulo: "Veterinários",
      perfisPermitidos: ["Admin"],
      icon: "mdi-face",
      to: "/veterinarios"
    },
    {
      titulo: "Pets",
      perfisPermitidos: ["Admin", "Atendente"],
      icon: "mdi-dog",
      to: "/pets"
    },
    {
      titulo: "Relatórios de satifação",
      perfisPermitidos: ["Admin"],
      icon: "mdi-inbox",
      to: "/relatorios"
    }
  ],
  cards: [
    {
      titulo: "Veterinários",
      imagem: "/images/veterinarios-card.jpg",
      descricao: "Gerenciamento de veterinários do sistema.",
      perfisPermitidos: ["Admin"],
      to: "/veterinarios"
    },
    {
      titulo: "Pets",
      imagem: "/images/pets-card.jpg",
      descricao: "Gerenciamento de pets do sistema.",
      perfisPermitidos: ["Admin", "Atendente"],
      to: "/pets"
    },
    {
      titulo: "Relatório de Satisfação",
      imagem: "/images/relatorio-card.png",
      descricao:
        "Consultar relatorio de satisfação dos serviços dos veterinários.",
      perfisPermitidos: ["Admin"],
      to: "/relatorios"
    }
  ],
  reports: [
    {
      veterinario: {
        nome: "Carlos Fonsenca",
        foto:
          "https://lh3.googleusercontent.com/proxy/Q5ui9f2p4UyA_xfkVGcHWCrNyhqj3gSLIgsx-rtxLTWTSrko7_Q6iwGK7zoxOzUtuwHHrKlqMq9zL0KZxhbGPusc82ccVdlhIJ2_O6pAk1pGKfpolrxk1v4oGUM5dhmyqWgrxsXQogcfzXAD1YyZWPGOTNtMu8c"
      },
      pet: {
        nome: "Scobby",
        foto:
          "https://i2.wp.com/centralpandora.com.br/wp-content/uploads/2017/09/dogue-alem%C3%A3o.jpg?resize=548%2C380"
      },
      nota: 5,
      data: "24/04/2020",
      tipoAtendimento: "Vacina para raiva"
    },
    {
      veterinario: {
        nome: "Carlos Fonsenca",
        foto:
          "https://lh3.googleusercontent.com/proxy/Q5ui9f2p4UyA_xfkVGcHWCrNyhqj3gSLIgsx-rtxLTWTSrko7_Q6iwGK7zoxOzUtuwHHrKlqMq9zL0KZxhbGPusc82ccVdlhIJ2_O6pAk1pGKfpolrxk1v4oGUM5dhmyqWgrxsXQogcfzXAD1YyZWPGOTNtMu8c"
      },
      pet: {
        nome: "Garfield",
        foto:
          "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/Gato%20Ex%C3%B3tico%20de%20Pelo%20Curto_cc_Thinkstock.jpg"
      },
      nota: 3,
      data: "19/04/2020",
      tipoAtendimento: "Castração"
    },
    {
      veterinario: {
        nome: "Vanessa serpa",
        foto:
          "https://portaldospassaros.com.br/wp-content/uploads/2018/07/Arara-azul5.jpg"
      },
      pet: {
        nome: "Blue",
        foto:
          "https://s2.glbimg.com/eo1jIkbq80qPREcDVdXlz7XyXQg=/0x0:720x898/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/L/x/lyiRjBTeSidn7CRHCQmQ/arara1.jpeg"
      },
      nota: 5,
      data: "11/04/2020",
      tipoAtendimento: "Tratamento da Bouba aviária"
    },
    {
      veterinario: {
        nome: "Aline dias",
        foto:
          "https://portalmidiaurbana.com/wp-content/uploads/2018/03/veterinaria-mulher.jpg"
      },
      pet: {
        nome: "Marley",
        foto:
          "https://uploads.metropoles.com/wp-content/uploads/2020/03/05102915/lad.jpg"
      },
      nota: 5,
      data: "24/04/2020",
      tipoAtendimento: "Cirurgia para mastectomia canina"
    },
    {
      veterinario: {
        nome: "Aline dias",
        foto:
          "https://portalmidiaurbana.com/wp-content/uploads/2018/03/veterinaria-mulher.jpg"
      },
      pet: {
        nome: "Brutus",
        foto:
          "https://http2.mlstatic.com/pinscher-0-D_NQ_NP_791417-MLB29022087925_122018-F.jpg"
      },
      nota: 4,
      data: "24/04/2020",
      tipoAtendimento: "Tratamento de otite"
    }
  ]
});

export const mutations = {
  login(state, usuario) {
    state.usuarioLogado = usuario;
  },
  logout(state) {
    state.usuarioLogado = null;
  },
  adicionarPet(state, pet) {
    pet.id = uuidv1();
    state.pets.push(pet);
  },
  editarPet(state, pet) {
    state.pets = state.pets.map(x => {
      if (x.id === pet.id) {
        x = pet;
      }
      return x;
    });
  },
  removerPet(state, id) {
    state.pets = state.pets.filter(x => x.id !== id);
  },
  adicionarVeterinario(state, veterinario) {
    veterinario.id = uuidv1();
    state.veterinarios.push(veterinario);
  },
  editarVeterinario(state, veterinario) {
    state.veterinarios = state.veterinarios.map(x => {
      if (x.id === veterinario.id) x = veterinario;
      return x;
    });
  },
  removerVeterinario(state, id) {
    state.veterinarios = state.veterinarios.filter(x => x.id !== id);
  }
};
