import React from 'react';
import { Pokemon } from '../../interfaces/pokemonInterface';

interface PokemonCardProps {
  pokemon: Pokemon;
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="max-w-sm max-h-[70vh] rounded-3xl overflow-hidden shadow-lg m-4 bg-white">
      <div>
        <img
          className="w-full h-40 object-scale-down hover:object-contain"
          src={pokemon.sprites?.other["showdown"].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 capitalize">{pokemon.name}</div>
        <p className="text-gray-700 text-base">
          Base Experience: {pokemon.base_experience}
        </p>
        <p className="text-gray-700 text-base">Height: {pokemon.height /10} Mts</p>
        <p className="text-gray-700 text-base">Weight: {pokemon.weight / 10} Kgs</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold">Types:</h4>
            <ul>
              {pokemon.types.map((typeInfo, index) => (
                <li key={index} className="capitalize">
                  {typeInfo.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Abilities:</h4>
            <ul>
              {pokemon.abilities.map((abilityInfo, index) => (
                <li key={index} className="capitalize">
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
