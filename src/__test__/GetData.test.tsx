import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CarsList } from '../GetList';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CarsList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra Loading inicialmente', () => {
    render(<CarsList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('muestra la lista de cars cuando fetch es exitoso', async () => {

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: 'Car 1', body: 'Descripcion 1' },
        { id: 2, title: 'Car 2', body: 'Descripcion 2' },
      ],
    });

    render(<CarsList />);

    await waitFor(() => {
      expect(screen.getByText('Car 1')).toBeInTheDocument();
      expect(screen.getByText('Descripcion 2')).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('muestra mensaje de error si fetch falla', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<CarsList />);

    await waitFor(() => {
      expect(screen.getByText(/error fetching cars/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
