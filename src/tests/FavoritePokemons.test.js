import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente FavoritePokemons.js', () => {
  test('Caso não haja pokemons favoritos, "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const textWithoutFavPok = screen.getByText('No favorite pokemon found');
    expect(textWithoutFavPok).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokIdForFav = { Alakazam: 65 };

    Object.values(pokIdForFav).forEach((id) => {
      history.push(`/pokemons/${id}`);
      const starCheck = screen.getByRole('checkbox');
      userEvent.click(starCheck);
    });

    // agora abrindo a página de favoritos e contabilizando se o pokemon está lá.
    renderWithRouter(<FavoritePokemons />);
    const arrFavPok = screen.getAllByTestId('pokemon-name');
    expect(arrFavPok).toHaveLength(1);
  });
});
