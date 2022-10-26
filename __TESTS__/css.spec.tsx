/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';

import Css from '../pages/css';
import renderWithI18n from './helper/i18n';

describe('CSS', () => {
  it('formats CSS correctly', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Css />);

    const css = screen.getByLabelText(/^CSS$/i);
    const formattedCss = screen.getByLabelText(/Formatted CSS/i);

    await user.clear(css);
    await user.type(
      css,
      'body{background:#ffffff;}'.replace(/[{[]/g, '$&$&'),
    );
    expect(formattedCss.innerHTML).toBe(`body {
  background: #ffffff;
}
`);
  });

  it('minifies CSS correctly', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Css />);

    const css = screen.getByLabelText(/^CSS$/i);
    const minifySwitch = screen.getByRole('checkbox', {
      name: /Minify/i,
    });

    await user.clear(css);
    await user.type(
      css,
      `body{
        background:#ffffff;
      }`.replace(/[{[]/g, '$&$&'),
    );

    await user.click(minifySwitch);
    const minifiedCss = screen.getByLabelText(/Minified CSS/i);

    expect(minifiedCss.innerHTML).toBe('body{background:#fff}');

    await user.click(minifySwitch);
  });

  it('clears inputs with either clear button', async () => {
    const user = userEvent.setup();
    renderWithI18n(<Css />);

    const css = screen.getByLabelText(/^CSS$/i);
    const formattedCss = screen.getByLabelText(/Formatted CSS/i);

    const clearBtns = screen.getAllByRole('button', { name: /Clear/i });

    await user.clear(css);
    await user.type(css, 'body{}'.replace(/[{[]/g, '$&$&'));
    await user.click(clearBtns[0]);

    expect(css).toHaveValue('');
    expect(formattedCss).toHaveValue('');

    await user.type(css, 'body{}'.replace(/[{[]/g, '$&$&'));
    await user.click(clearBtns[1]);

    expect(css).toHaveValue('');
    expect(formattedCss).toHaveValue('');
  });
});
