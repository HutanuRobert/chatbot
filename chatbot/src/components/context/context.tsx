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
      stock: null,
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
        stock: null,
		stockExchangeVisible: true,
      },
    ]);
  };

  const updateStockExchange = (tableKey: number, stockExchangeName: string, stocks: Stock[] | null) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey
          ? { ...table, stockExchangeName, stocks, tableKey: tableKey, isClickable: false }
          : table
      )
    );
  };

  const updateStock = (tableKey: number, stock: Stock) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey ? { ...table, stock, selectedStock: stock.stockName, tableKey: tableKey } : table
      )
    );
  };
  
  const goBack = (tableKey: number) => {
  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.tableKey === tableKey) {
        if (table.stock) {
          setTables([...tables,{ stock: null, stockExchangeVisible: false, stockExchangeName: "Go Back", tableKey: tables.length, stocks: table.stocks} ]);
        } else  {
		    setTables([...tables,{ stock: null, stockExchangeVisible: true, stockExchangeName: null, tableKey: tables.length, stocks: null} ]);
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
