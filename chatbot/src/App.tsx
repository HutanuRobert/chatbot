import './index.css';
import './App.css';
import TableComponent from './components/table/table.component';
import { GetStockExchanges } from './api/getStockExchanges';
import { useState } from 'react';
import StocksComponent from './components/stocks/stocks';
import { Stock } from './types/stock';
import StockComponent from './components/stock/stock';
import { useTableContext } from './components/context/context';



function App() {
	const { tables, addTable, updateStockExchange, updateStock, goBack } = useTableContext();
	const stockExchanges = GetStockExchanges().data;
	const [stocks, setStocks] = useState<Stock[] | null>(null);
	const [stockExchangeName, setStockExchangeName] = useState<string | null>(null);
	const [stock, setStock] = useState<Stock | null>(null);
	const [selectedStock, setSelectedStock] = useState<string | null>(null);
	const [isClickable, setIsClickable] = useState<boolean>(true);
	const [tableComponents, setTableComponents] = useState<number[]>([0]);
  
   const onStockExchangeSelect = (code: string, tableKey: number) => {
    const stockExchange = stockExchanges?.find((el) => el.code === code);
    updateStockExchange(tableKey, stockExchange?.stockExchange || '', stockExchange?.topStocks || null);
  };

  // Stock select handler
  const onStockSelect = (stock: Stock, tableKey: number) => {
    updateStock(tableKey, stock);
  };

 const onGoBackMenuItemSelect = (tableKey: number) => {
    goBack(tableKey);
  };

  return (	
    <div className="App">
  <section className='bg-blue-700 h-10 flex'>
    <h5 className="text-white flex items-center">LSEG chatbot</h5>
  </section>
  <p>Welcome to LSEG. I'm here to help you.</p>

  <section className="flex flex-col">
    {tables.map((table) => (
      <div key={table.tableKey}>
        {/* Render the TableComponent */}
        <TableComponent
          onStockExchange={(code) => onStockExchangeSelect(code, table.tableKey)}
          stockExchanges={stockExchanges}
          isClickable={table.isClickable}
        />
        
        {/* Render stock exchange name */}
        {table.stockExchangeName && (
          <h3 className="flex justify-end">{table.stockExchangeName}</h3>
        )}

        {/* Render the StocksComponent if stockExchangeName exists */}
        {table.stockExchangeName && (
          <StocksComponent
            onMainMenuSelect={addTable}
            onGoBackSelect={() => onGoBackMenuItemSelect(table.tableKey)}
            onStockSelect={(stock) => onStockSelect(stock, table.tableKey)}
            stocks={table.stocks}
            isClickable={table.isClickable}
            tableKey={table.tableKey}
          />
        )}

        {/* Render the selected stock */}
        {table.selectedStock && (
          <h3 className="flex justify-end">{table.selectedStock}</h3>
        )}

        {/* Render the StockComponent if stock exists */}
        {table.stock && (
          <StockComponent
            onMainMenuSelect={addTable}
            onGoBackSelect={() => onGoBackMenuItemSelect(table.tableKey)}
            onStockSelect={(stock) => onStockSelect(stock, table.tableKey)}
            stock={table.stock}
          />
        )}
      </div>
    ))}
  </section>
</div>
  );
}

export default App;
