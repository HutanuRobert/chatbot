import './index.css';
import './App.css';
import TableComponent from './components/table/table.component';
import { GetStockExchanges } from './api/getStockExchanges';



function App() {
	const stockExchanges = GetStockExchanges().data;
	
  return (	
    <div className="App">
		<section className='bg-blue-700 h-10 flex'>
		<h5 className="text-white flex items-center">LSEG chatbot</h5>
		</section>
			<p>Welcome to LSEG.Im here to help you.</p>
			{/* <p>Choose a stock from below</p> */}
		<section>
      	<TableComponent stockExchanges={stockExchanges}></TableComponent>
		</section>
    </div>
  );
}

export default App;
