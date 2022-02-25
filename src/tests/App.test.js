import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o component App.js', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    // Se o primeiro link possui o texto Home.
    const homeLinkEl = screen.getByRole('link', { name: /Home/ });
    expect(homeLinkEl).toBeInTheDocument();

    // Se o segundo link possui o texto About.
    const aboutLinkEl = screen.getByRole('link', { name: /About/ });
    expect(aboutLinkEl).toBeInTheDocument();

    // Se o terceiro link possui o texto Favorite Pokémons.
    const favPokemonLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/ });
    expect(favPokemonLinkEl).toBeInTheDocument();
  });

  // Testando se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
  test('Se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLinkEl = screen.getByRole('link', { name: 'Home' });
    expect(homeLinkEl).toBeInTheDocument();
    userEvent.click(homeLinkEl);

    expect(history.location.pathname).toBe('/');
  });

  // Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.
  test('Se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLinkEl = screen.getByRole('link', { name: 'About' });
    expect(aboutLinkEl).toBeInTheDocument();
    userEvent.click(aboutLinkEl);

    expect(history.location.pathname).toBe('/about');
  });

  // Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
  test('Se a aplicação é redirecionada para a página Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favPokemonLinkEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokemonLinkEl).toBeInTheDocument();
    userEvent.click(favPokemonLinkEl);

    expect(history.location.pathname).toBe('/favorites');
  });

  // Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
  test('Se a aplicação é vai para a página de Not Found com uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url-desconhecida');

    const notFoundHeadingEl = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundHeadingEl).toBeInTheDocument();
  });
});
