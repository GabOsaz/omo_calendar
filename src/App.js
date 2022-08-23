import { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';

function App() {
  const [date, setDate] = useState()
  // console.log(date?.dateString, years)

  return (
    <>
    <div className="grid place-content-center h-[100vh]">
      <Calendar setSelectedDateRange={(date) => setDate(date)} />
      <div className='mt-8'>
        { date?.dateString }
      </div>
    </div>
    </>
  );
}

export default App;
