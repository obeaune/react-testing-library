import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testando o componente Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingEl = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingEl).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    const nameOf = screen.getAllByTestId('pokemon-name');
    expect(nameOf.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const sizeTypesButtons = 7;
    expect(typeButtons.length).toBe(sizeTypesButtons);
    const specificButtonPoison = screen.getByRole('button', { name: /poison/i });
    expect(specificButtonPoison).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const requiredButtonAll = screen.getByRole('button', { name: 'All' });
    expect(requiredButtonAll).toBeInTheDocument();
    userEvent.click(requiredButtonAll);
    // resetado
    const pokemonExemplo = screen.getByTestId('pokemon-name');
    expect(pokemonExemplo).toHaveTextContent('Pikachu');
  });
});
