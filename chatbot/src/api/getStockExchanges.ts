import { useQuery } from '@tanstack/react-query';
import { StockExchange } from '../types/stockExchange';

export function GetStockExchanges() {
  return useQuery<StockExchange[]>({
    queryKey: ['stockExchange'],
    queryFn: async () => {
      const url = `/api/stocks`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    },
  });
}
