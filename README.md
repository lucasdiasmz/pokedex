# 🎮 Pokédex React + Vite

Pokédex interativa feita com **React + Vite** (Atividade 03).

## Funcionalidades

- Lista dos 151 Pokémon com ID, nome, tipos e todos os atributos (HP, Ataque, Defesa, Atq. Esp., Def. Esp., Velocidade)
- Pesquisa por nome ou ID (atualiza enquanto digita)
- Filtro por tipo (tipos vindos do `pokedex-data.json`)
- Detalhes do Pokémon em modal, com barras de atributos (fecha com ESC ou clicando fora)
- Área de treinadores (nome, insígnias e Pokémon de cada um)
- Mensagem quando nenhum Pokémon é encontrado
- Extras: favoritos (salvos no `localStorage`), ordenação, Pokémon aleatório, modo escuro/claro e layout responsivo

## Como executar

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Dados

Os dados estão em `src/data/pokedex-data.json` (Pokémon, tipos e treinadores).

**Imagens:** usamos a [PokéAPI sprites](https://github.com/PokeAPI/sprites) (artwork oficial, pela URL com o ID do Pokémon). Se a imagem não carregar, o card mostra o número do Pokémon. O app funciona normalmente só com o JSON.

## Estrutura

```text
src/
├── components/   # SearchBar, Filters, PokemonList, PokemonCard, PokemonDetails, TrainerList, ...
├── css/          # um CSS por componente / tela
├── data/         # pokedex-data.json
├── utils.js      # cores de tipos, rótulos e helpers
├── App.jsx       # estados (busca, filtro, ordenação, favoritos, tema) e composição
└── main.jsx
```

## Conceitos de React usados

Componentes funcionais, props, `useState`, `useEffect`, `useMemo` (estado derivado), `map()` para listas, eventos e filtragem de dados.
