
## INSTALAÇÃO DO PROJETO

git clone https://github.com/andre26z/pokemon---This-is-a-challenge-by-Coodesh.git

PROJETO EM PRODUÇÃO <a href="https://pokemon-this-is-a-challenge-by-coodesh.vercel.app"> CLIQUE AQUI </a>

pelo terminal entre na pasta que clonou o projeto após isso siga os passos abaixo:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start no projeto no endereço: `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Construir para produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Para um preview da build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```


# Pokedex by Andre Santos - Challenge by Codesh

Este projeto é um desafio codesh feito com Nuxt3, Vue.js3, Tailwind, Composition API e Pinia, não há adição de outras bibliotecas prezando pela otimização.
Fontes e Cores encontrados no figma.


## Minha Página Inicial Index.vue

O arquivo `Index.vue` serve como a página inicial do aplicativo e implementa a interface para a busca e visualização de Pokémons. Abaixo estão os principais componentes e funcionalidades implementadas neste arquivo:

- **Header Component**: Inclusão do componente `Header` que pode conter navegação ou informações do usuário.
- **Campo de Pesquisa**: Um campo de entrada de texto que atualiza a variável `searchQuery` em tempo real, permitindo aos usuários buscar por nome ou código de Pokémon.
- **Botão Limpar**: Um botão que aparece quando há algo digitado no campo de pesquisa, permitindo ao usuário limpar a busca realizada.
- **Exibição de Resultados**: Os resultados filtrados são exibidos dinamicamente em cartões através do componente `PokemonCard`. Há uma verificação condicional para mostrar os cartões somente se a lista filtrada não estiver vazia.
- **Mensagem de Não Encontrado**: Se nenhum Pokémon corresponder à busca, uma mensagem será exibida informando que nenhum Pokémon foi encontrado, junto com um crédito para o desenvolvedor.

### Funcionalidades

- Busca dinâmica de Pokémons pelo nome ou código.
- Filtragem de dados baseada na busca do usuário com feedback visual imediato.
- Responsividade para diferentes tamanhos de tela.

## Desafios encontrados na criação da index.vue

- A Api infelizmente traz os detalhes dos pokemons fora da listagem dos pokémons, fazendo com que
sejam necessárias as requisições de cada pokemon de forma singular.
- Foi adicionado um limite de apenas 300 resultados para otimização
- Projeto contém lazy loading também para otimização das buscas das imagens.

 ---------------------------------------------------------------------------------

 # Componente PokemonCard.vue

O `PokemonCard.vue` é um componente reutilizável projetado para exibir informações sobre um Pokémon individual em um formato de cartão. Este componente é interativo e visualmente atraente, permitindo aos usuários obter detalhes de cada Pokémon com uma simples interação. Abaixo estão os principais componentes e funcionalidades implementados neste arquivo:

### Estrutura e Design

- **Container do Cartão**: Configurado para ser visualmente atraente com bordas arredondadas, sombras e uma animação de escala ao passar o mouse.
- **LoadSpinner**: Um spinner de carregamento é exibido enquanto as informações do Pokémon estão sendo carregadas.
- **Imagem e Nome do Pokémon**: Exibe a imagem e o nome do Pokémon, ambos centralizados.
- **Código do Jogo**: Mostra o código de identificação do jogo do Pokémon.
- **Tipos do Pokémon**: Os tipos do Pokémon são mostrados em badges coloridos, com cores específicas para cada tipo.

### Funcionalidades

- **Dinamismo**: Ao clicar no cartão, o componente inicia o carregamento e navega para uma página detalhada do Pokémon específico.
- **Estilos Dinâmicos para Tipos**: As classes CSS para os badges dos tipos são determinadas dinamicamente baseadas no tipo do Pokémon, utilizando um mapeamento de cores predefinido.

### Desafios encontrados na criação do PokemonCard

- As tags que fazem relação ao tipo do pokémon não possuem cores vindas da própria API deixando
para o desenvolvedor a aplicação das cores que estão no figma, caso a API tivesse essa informação ficaria mais fácil, no meu caso inclui essas cores no código e os fui usando de forma dinamica ao comparar com o tipo do pokemon.



-------------------------------------------------------------------------

# Página pokemon/[name].vue

A página `pokemon/[name].vue` é dedicada à exibição detalhada de um Pokémon específico. Os usuários podem ver uma imagem do Pokémon, seu nome, tipos, habilidades e navegar de volta à página principal. Abaixo, você encontrará uma descrição detalhada dos elementos e funcionalidades desta página.

## Estrutura e Design

- **Header Component**: Incorpora o componente `Header` para consistência na navegação.
- **Exibição Condicional**: A página exibe o conteúdo somente se os dados do Pokémon estiverem disponíveis. Caso contrário, mostra uma mensagem de "Carregando...".
- **Imagem e Nome**: Mostra uma imagem grande do Pokémon e seu nome em um título grande e centralizado.
- **Tipos do Pokémon**: Os tipos são exibidos como etiquetas coloridas, onde as cores correspondem ao tipo de Pokémon.
- **Habilidades**: Lista as habilidades do Pokémon, cada uma apresentada em um item de lista separado.
- **Botão de Retorno**: Um botão que permite ao usuário voltar à página inicial.

### Funcionalidades

- **Busca de Dados**: Ao carregar a página, os dados do Pokémon são buscados dinamicamente usando a API do Pokémon, baseados no nome do Pokémon que é passado via parâmetro de rota.
- **Navegação**: O botão "Voltar" utiliza o router do Vue para navegar de volta à página inicial.


### Código

O componente usa a Composition API do Vue.js para gerenciar o estado e os efeitos colaterais, como chamadas de API e navegação.

### Desafios encontrados ao criar a página pokemon/[name].vue

- As habilidades que existem na API em nada se assemelham as encontradas no figma, conforme imagem do figma a habilidade do pokemon exemplo possui mais de 5 carácteres, porém, na API é apenas uma palavra, foi mantida a formatação conforme figma.
