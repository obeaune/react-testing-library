import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente NotFound.js', () => {
  test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const notFoundHeadingEl = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    const emojiFromHeading = screen.getByLabelText('Crying emoji');
    expect(notFoundHeadingEl && emojiFromHeading).toBeInTheDocument();
  });

  test('Se a página mostra a imagem do pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const imgPikachu = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgPikachu).toHaveAttribute('src', imgURL);
  });
});
