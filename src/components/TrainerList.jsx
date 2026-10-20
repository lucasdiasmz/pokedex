import TrainerCard from './TrainerCard.jsx'
import '../css/TrainerList.css'

function TrainerList({ trainers, allPokemon, onSelectPokemon }) {
  return (
    <section>
      <h2 className="page-title">Treinadores</h2>
      <p className="page-subtitle">Clique em um Pokémon para ver os detalhes.</p>

      <div className="trainer-list">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            allPokemon={allPokemon}
            onSelectPokemon={onSelectPokemon}
          />
        ))}
      </div>
    </section>
  )
}

export default TrainerList
