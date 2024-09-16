// src/context/TableContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Stock } from '../../types/stock';

// Define the structure of the table state
interface TableState {
  tableKey: number;
  stocks: Stock[] | null;
  stockExchangeName: string | null;
  selectedStock: string | null;
  stock: Stock | null;
  isClickable: boolean;
}

// Define the context value
interface TableContextType {
  tables: TableState[];
  addTable: () => void;
  updateStockExchange: (tableKey: number, stockExchangeName: string, stocks: Stock[] | null) => void;
  updateStock: (tableKey: number, stock: Stock) => void;
  goBack: (tableKey: number) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

// Create a provider component to wrap your app
export default function ChatBotStateProvider({ children }: { children: React.ReactNode }) {
  const [tables, setTables] = useState<TableState[]>([
    {
      tableKey: 0,
      stocks: null,
      stockExchangeName: null,
      selectedStock: null,
      stock: null,
      isClickable: true,
    },
  ]);

  // Function to add a new table
  const addTable = () => {
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
      },
    ]);
  };

  // Function to update stock exchange info
  const updateStockExchange = (tableKey: number, stockExchangeName: string, stocks: Stock[] | null) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey
          ? { ...table, stockExchangeName, stocks, isClickable: false }
          : table
      )
    );
  };

  // Function to update selected stock
  const updateStock = (tableKey: number, stock: Stock) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.tableKey === tableKey ? { ...table, stock, selectedStock: stock.stockName, isClickable:true } : table
      )
    );
  };
  
  // Function to go back to the previous screen
  const goBack = (tableKey: number) => {
  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.tableKey === tableKey) {
        if (table.selectedStock) {
          setTables([...tables,{ selectedStock: null, stock: null, isClickable: true, stockExchangeName: table.stockExchangeName, tableKey: tables.length, stocks: table.stocks} ]);
        } else if (table.stocks) {
		    setTables([...tables,{ selectedStock: null, stock: null, isClickable: true, stockExchangeName: null, tableKey: tables.length, stocks: null} ]);
        }
      }
      return table;
    })
  );
};

  return (
      <TableContext.Provider value={{ tables, addTable, updateStockExchange, updateStock, goBack }}>
        {children}
      </TableContext.Provider>
    );
};
