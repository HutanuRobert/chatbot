import React, { createContext, useContext, useState } from 'react';
import { Stock } from '../../types/stock';
import { ChatBotContextType, ChatbotState } from '../../types/chatbotState';

const chatbotContext = createContext<ChatBotContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(chatbotContext);
  if (!context) {
    throw new Error('chatbotContext must be used within a ChatbotStateProvider');
  }
  return context;
};

export default function ChatBotStateProvider({ children }: { children: React.ReactNode }) {
  const [tables, setTables] = useState<ChatbotState[]>([
    {
      tableKey: 0,
      stocks: null,
      stockExchangeName: null,
      selectedStock: null,
      stock: null,
      isClickable: true,
	  stockExchangeVisible: true,
    },
  ]);

  const addSession = () => {
    const newTableKey = tables.length;
    setTables([
      ...tables,
      {
        tableKey: newTableKey,
        stocks: null,
        stockExchangeName: null,
        selectedStock: null,
        stock: null,
        isClickable: true,
		stockExchangeVisible: true,
      },
    ]);
  };

  const updateStockExchange = (tableKey: number, stockExchangeName: string, stocks: Stock[] | null) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey
          ? { ...table, stockExchangeName, stocks, isClickable: false }
          : table
      )
    );
  };

  const updateStock = (tableKey: number, stock: Stock) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey ? { ...table, stock, selectedStock: stock.stockName, isClickable:true } : table
      )
    );
  };
  
  const goBack = (tableKey: number) => {
  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.tableKey === tableKey) {
        if (table.selectedStock) {
          setTables([...tables,{ selectedStock: null, stock: null, isClickable: true, stockExchangeVisible: false, stockExchangeName: table.stockExchangeName, tableKey: tables.length, stocks: table.stocks} ]);
        } else  {
		    setTables([...tables,{ selectedStock: null, stock: null, isClickable: true, stockExchangeVisible: true, stockExchangeName: null, tableKey: tables.length, stocks: null} ]);
        }
      }
      return table;
    })
  );
};

  return (
      <chatbotContext.Provider value={{ tables, addSession, updateStockExchange, updateStock, goBack }}>
        {children}
      </chatbotContext.Provider>
    );
};
