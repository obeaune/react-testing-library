import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon.js', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    // Capturando botão e utilizando o reset para usar o Pikachu nos testes.
    const requiredButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(requiredButtonAll);

    // O nome correto do Pokémon deve ser mostrado na tela;
    const namePokemon = screen.getByText('Pikachu');

    // O tipo correto do pokémon deve ser mostrado na tela.
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    const weightPokemon = screen.getByText(/average weight: 6\.0 kg/i);

    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    const urlImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    // Agora os expects juntos
    expect(namePokemon && typePokemon && weightPokemon).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', urlImage);
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link etc', () => {
    renderWithRouter(<App />);
    // Capturando botão e utilizando o reset para usar o Pikachu nos testes.
    const requiredButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(requiredButtonAll);

    // Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.
    const linkForMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkForMoreDetails).toBeInTheDocument();
  });

  test('Se ao clicar é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
    const linkForMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkForMoreDetails);
    // Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    // Teste se existe um ícone de estrela nos Pokémons favoritados.
    const buttonStar = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
      checked: false,
    });
    userEvent.click(buttonStar);
    const iconStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(iconStar.src).toBe('http://localhost/star-icon.svg');
  });
});
