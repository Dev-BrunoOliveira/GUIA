import type { Restaurant } from "../../types";

export const restaurantsData: Restaurant[] = [
  {
    id: "forno",
    name: "Fôrno",
    category: "Pastrami",
    image: "./IMG/FORNO/Batata com Pastrami.jpg",
    address: "R. Cunha Horta, 70 - Consolação, São Paulo - SP, 01221-030",
    description:
      "Simplesmente a melhor batata com pastrami que já comi na vida. Sem falar da Coxinha só experimente e não se arrependera. O ambiente é super aconchegante e o atendimento impecável.",
    instagramUrl: "https://www.instagram.com/forno_sp/?hl=pt",
  },
  {
    id: "misoya",
    name: "Misoya Ramen",
    category: "Culinária Japonesa",
    image: "./IMG/MISOYA/MISOYA RAMEN.jpg",
    address: "R. Antônio Carlos, 324 - Consolação, São Paulo - SP",
    description:
      "Uma experiência que te leva direto para o Japão, com o autêntico sabor do Missô Ramen e ingredientes importados.",
    instagramUrl: "https://www.instagram.com/misoyabrasil/",
  },
  {
    id: "aska",
    name: "Aska Lamen",
    category: "Culinária Japonesa",
    image: "./IMG/ASKA/aska.jpg",
    address: "Rua Barão de Iguape, 260 - Liberdade, São Paulo - SP",
    description:
      "Uma experiência que te leva direto para o Japão estando em São Paulo, autêntico sabor do lamen suíno.",
    instagramUrl: "https://www.instagram.com/aska_lamen/",
  },
];
