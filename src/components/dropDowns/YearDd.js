import React, { useState } from 'react';
import Card from '../common/WhiteCard';
import DropDown from './DropDown'

const YearDd = ({ setShowYears, setYear, years, resetDates }) => {
    const [hover, setHover] = useState(null);
    const [border, setBorder] = useState('');
    const defaultYears = Array.from(Array(new Date().getFullYear() - 1939), (_, i) => (i + 1940).toString());

    const handleMouseOver = (trans, index, array) => {
        setHover(trans);
        index === 0 ? setBorder('rounded-tl-lg border-l-2') : (array.length -1) === index ? setBorder('rounded-bl-lg border-l-2') : setBorder('border-l-2');
    };

    const handleMouseOut = (trans) => {
        setHover(trans);
        setBorder('')
    };

    const handleClick = (year) => {
        resetDates()
        setShowYears(false);
        setYear(year);
    }

    return (
        <DropDown toggleDd={setShowYears}>
            <Card>
                <div className='w-full max-h-72 overflow-auto'>
                    {years && years.map((year, index, array) => {
                        return (
                            <div key={index} onClick={() => handleClick(year)} onMouseOver={() => handleMouseOver(year, index, array)} onMouseOut={() => handleMouseOut(year)} className='flex rounded-lg'>
                                <div className={`w-full ${year === hover && border} font-medium relative z-30 text-dark text-sm px-6 py-3 text-opacity-70 cursor-pointer flex items-center border-primary hover:bg-secondary hover:text-opacity-100`}>
                                    <span>
                                        {year}
                                    </span>
                                </div>
                            </div>
                    )})}
                    {defaultYears && defaultYears.map((year, index, array) => {
                        return (
                            <div key={index} onClick={() => handleClick(year)} onMouseOver={() => handleMouseOver(year, index, array)} onMouseOut={() => handleMouseOut(year)} className='flex rounded-lg'>
                                <div className={`w-full ${year === hover && border} font-medium relative z-30 text-dark text-sm px-6 py-3 text-opacity-70 cursor-pointer flex items-center border-primary hover:bg-secondary hover:text-opacity-100`}>
                                    <span>
                                        {year}
                                    </span>
                                </div>
                            </div>
                    )})}
                </div>
            </Card>
        </DropDown>
    )
}

export default YearDd;
