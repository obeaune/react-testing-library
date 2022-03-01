import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

beforeEach(() => renderWithRouter(<About />));

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    const headingAboutEl = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });
    expect(headingAboutEl).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const elP1 = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const elP2 = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(elP1 && elP2).toBeInTheDocument();
  });

  test('Se a página contém a imagem especificada', () => {
    const imageEl = screen.getByRole('img');
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imageEl).toHaveAttribute('src', imageUrl);
  });
});
