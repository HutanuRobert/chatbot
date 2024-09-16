import './index.css';
import './App.css';
import TableComponent from './components/table/table.component';
import { GetStockExchanges } from './api/getStockExchanges';
import { useState } from 'react';
import StocksComponent from './components/stocks/stocks';
import { Stock } from './types/stock';
import StockComponent from './components/stock/stock';



function App() {
	const stockExchanges = GetStockExchanges().data;
	const [stocks, setStocks] = useState<Stock[] | null>(null);
	const [stockExchangeName, setStockExchangeName] = useState<string | null>(null);
	const [stock, setStock] = useState<Stock | null>(null);
	const [selectedStock, setSelectedStock] = useState<string | null>(null);
	const [isClickable, setIsClickable] = useState<boolean>(true);
	const [tableComponents, setTableComponents] = useState<number[]>([0]);
  
  const onStockExchangeSelect = (code: string, tableKey: number) => {
    setStocks(stockExchanges?.find((el) => el.code === code)?.topStocks || null);
	setStockExchangeName(stockExchanges?.find((el) => el.code === code)?.stockExchange || null);
	//setIsClickable(false);
  };

  const onStockSelect = (stock: Stock) => {
	setStock(stocks?.find((el) => el.code === stock.code) || null);
	setSelectedStock(stock.stockName);
	//setIsClickable(false);
  }

  const onMainMenuItemSelect = () => {
	setStocks(null);
	setStock(null);
	setTableComponents((prev) => [...prev, prev.length]); 
}

  const onGoBackMenuItemSelect = () => {
	setStocks(null);
  }

  

	
	
  return (	
    <div className="App">
		<section className='bg-blue-700 h-10 flex'>
		<h5 className="text-white flex items-center">LSEG chatbot</h5>
		</section>
			<p>Welcome to LSEG.Im here to help you.</p>
		<section className="flex flex-col">
   		{tableComponents.map((tableKey) => (
					<div key={tableKey}>
						<TableComponent
							onStockExchange={(code) => onStockExchangeSelect(code, tableKey)}
							stockExchanges={stockExchanges}
							isClickable={isClickable}
						/>
					</div>
				))}
		{stockExchangeName && <h3 className="flex justify-end">{stockExchangeName}</h3>}
		</section>
		<section>
		{stockExchangeName &&<StocksComponent onMainMenuSelect={onMainMenuItemSelect} onGoBackSelect={onGoBackMenuItemSelect} onStockSelect={onStockSelect} stocks={stocks} isClickable={isClickable}></StocksComponent>}
		{selectedStock && <h3 className="flex justify-end">{selectedStock}</h3>}
		</section>
		<section>
		{stock &&  <StockComponent onMainMenuSelect={onMainMenuItemSelect} onGoBackSelect={onGoBackMenuItemSelect} onStockSelect={onStockSelect} stock={stock}></StockComponent>}
		</section>
    </div>
  );
}

export default App;
