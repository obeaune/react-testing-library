import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const detailsPikachu = '/pokemons/25';

describe('Testando o componente PokemonDetails.js', () => {
  test('Se as informações detalhadas do Pokémon estão mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsPikachu);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const headingDetailsEl = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(headingDetailsEl).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    const buttonMoreDetails = screen.queryByText('submit');
    expect(buttonMoreDetails).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const headingSummaryEl = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headingSummaryEl).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const paragraph = screen.getByText(/This intelligent/);
    expect(paragraph).toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsPikachu);

    const headingLocationEl = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(headingLocationEl).toBeInTheDocument();

    const locationsEl = screen.getAllByAltText('Pikachu location');
    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(locationsEl[0]).toHaveAttribute('src', url1);
    expect(locationsEl[1]).toHaveAttribute('src', url2);
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsPikachu);
    const favoriteEl = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteEl).toBeInTheDocument();
  });
});
