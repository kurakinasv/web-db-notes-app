import axios from 'axios';
import { useEffect, useState, type FC } from 'react';

import type { Pokemon, PokemonListItem } from 'types/api';

import './ApiNotesPage.css';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';
const DEFAULT_ERROR_MESSAGE = 'Не удалось получить данные';
const API_ERROR_MESSAGE =
  'Ошибка загрузки API-данных. Попробуйте обновить страницу или сменить текущий IP-адрес.';

const ApiNotesPage: FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await axios.get<{ results: PokemonListItem[] }>(POKEMON_URL);

        if (response.status !== 200) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }

        const pokemonListData = response.data.results;
        const randomPokemon = pokemonListData[Math.floor(Math.random() * pokemonListData.length)];

        const pokemonResponse = await axios.get<Pokemon>(randomPokemon.url);

        if (pokemonResponse.status !== 200) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }

        setPokemon(pokemonResponse.data);
      } catch (error) {
        if (error instanceof Error && !controller.signal.aborted) {
          setErrorMessage(API_ERROR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPokemon();

    return () => controller.abort();
  }, []);

  return (
    <section className="api-page animate-fadeIn">
      <h2>Случайный покемон</h2>

      {isLoading && <p className="api-state">Загрузка данных...</p>}
      {errorMessage && <p className="api-state api-state-error">{errorMessage}</p>}

      {!isLoading && !errorMessage && pokemon && (
        <div className="pokemon-card">
          <img
            src={pokemon.sprites.front_default ?? pokemon.sprites.back_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h3>{pokemon.name}</h3>
        </div>
      )}
    </section>
  );
};

export default ApiNotesPage;
