import { Stock } from "./stock";

export interface ChatbotState {
  tableKey: number;
  stocks: Stock[] | null;
  stockExchangeName: string | null;
  stock: Stock | null;
  stockExchangeVisible: boolean;
}

export interface ChatBotContextType {
  tables: ChatbotState[];
  addSession: () => void;
  updateStockExchange: (tableKey: number, stockExchangeName: string, stocks: Stock[] | null) => void;
  updateStock: (tableKey: number, stock: Stock) => void;
  goBack: (tableKey: number) => void;
}