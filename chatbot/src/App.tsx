import './index.css';
import './App.css';
import TableComponent from './components/table/table.component';
import { GetStockExchanges } from './api/getStockExchanges';
import StocksComponent from './components/stocks/stocks';
import { Stock } from './types/stock';
import StockComponent from './components/stock/stock';
import { useTableContext } from './components/context/context';
import { useEffect, useRef } from 'react';



function App() {
	const { tables, addSession, updateStockExchange, updateStock, goBack } = useTableContext();
	const stockExchanges = GetStockExchanges().data;
   const onStockExchangeSelect = (code: string, tableKey: number) => {
    const stockExchange = stockExchanges?.find((el) => el.code === code);
    updateStockExchange(tableKey, stockExchange?.stockExchange || '', stockExchange?.topStocks || null);
  };

  const onStockSelect = (stock: Stock, tableKey: number) => {
    updateStock(tableKey, stock);
  };

 const onGoBackMenuItemSelect = (tableKey: number) => {
    goBack(tableKey);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [tables]);
  
  return (	
    <div className="App">
  <section className='bg-blue-700 h-10 flex p-2'>
    <h5 className="text-white flex items-center">LSEG chatbot</h5>
  </section>
  <p className="p-2 bg-blue-100">Welcome to LSEG. I'm here to help you.</p>

  <section className="flex flex-col p-2 overflow-y-auto" ref={containerRef}>
    {tables.map((table) => (
      <div key={table.tableKey}>
        {table.stockExchangeVisible && (<TableComponent
          onStockExchange={(code) => onStockExchangeSelect(code, table.tableKey)}
          stockExchanges={stockExchanges}
          isClickable={table.isClickable}
        />)}
        {table.stockExchangeName && (
			<div className='flex justify-end'>
				<h3 className="bg-gray-400 rounded-lg p-3">{table.stockExchangeName}</h3>
			</div>
        )}
        {table.stockExchangeName && (
          <StocksComponent
            onMainMenuSelect={addSession}
            onGoBackSelect={() => onGoBackMenuItemSelect(table.tableKey)}
            onStockSelect={(stock) => onStockSelect(stock, table.tableKey)}
            stocks={table.stocks}
            isClickable={table.isClickable}
            tableKey={table.tableKey}
          />
        )}
        {table.selectedStock && (
			<div className='flex justify-end rounded-lg'>
				<h3 className="bg-gray-400 rounded-lg p-3">{table.selectedStock}</h3>
			</div>
        )}

        {table.stock && (
          <StockComponent
            onMainMenuSelect={addSession}
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
