import './index.css';
import './App.css';
import StockExchangeComponent from './components/table/stockExchange';
import { GetStockExchanges } from './api/getStockExchanges';
import StocksComponent from './components/stocks/stocks';
import { Stock } from './types/stock';
import StockComponent from './components/stock/stock';
import { useTableContext } from './components/context/context';
import { useEffect, useRef } from 'react';
import NoDataComponent from './components/noData/noData';

function App() {
  const { tables, addSession, updateStockExchange, updateStock, goBack } = useTableContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stockExchanges = GetStockExchanges().data;
  console.log(stockExchanges);
  const lastTableKey = tables.length > 0 ? tables[tables.length - 1].tableKey : null;

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
        {stockExchanges?.length === 0 || stockExchanges === undefined? (
          <NoDataComponent />  // Render the NoDataComponent if no stock exchanges are available
        ) : (
          tables.map((table) => (
            <div key={table.tableKey}>
              {table.stockExchangeVisible && (
                <StockExchangeComponent
                  onStockExchange={(code) => onStockExchangeSelect(code, table.tableKey)}
                  stockExchanges={stockExchanges}
                  isClickable={table.stockExchangeName == null && lastTableKey === table.tableKey}
                />
              )}
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
                  isClickable={table.selectedStock == null && lastTableKey === table.tableKey}
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
                  stock={table.stock}
                  isClickable={lastTableKey === table.tableKey}
                />
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
