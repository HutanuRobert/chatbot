import { useQuery } from '@tanstack/react-query';
import { StockExchange } from '../types/stockExchange';

export function GetStockExchanges(code: string) {
  return useQuery<StockExchange[]>({
    queryKey: ['stockExchange'],
    queryFn: async () => {
      const url = `api/stocks/${code}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
        },
      });
      const data = await response.json();
      return data;
    },
  });
}
