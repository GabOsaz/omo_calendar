import React, { useState } from 'react';
import Card from '../common/WhiteCard';
import DropDown from './DropDown';

const RecordTransDd = ({ setShowMonths, setMonth, months, resetDates }) => {
    const [hover, setHover] = useState(null);
    const [border, setBorder] = useState('');

    const handleMouseOver = (trans, index, array) => {
        setHover(trans);
        index === 0 ? setBorder('rounded-tl-lg border-l-2') : (array.length -1) === index ? setBorder('rounded-bl-lg border-l-2') : setBorder('border-l-2');
    };

    const handleMouseOut = (trans) => {
        setHover(trans);
        setBorder('')
    };

    const handleClick = (index) => {
        resetDates();
        setShowMonths(false);
        setMonth(index)
    }

    return (
        <DropDown toggleDd={setShowMonths}>
            <Card>
                <div className='w-full max-h-72 overflow-auto'>
                    {months.map((trans, index, array) => {
                        return (
                            <div key={index} onClick={() => handleClick(index)} onMouseOver={() => handleMouseOver(trans, index, array)} onMouseOut={() => handleMouseOut(trans)} className='flex rounded-lg'>
                                <div className={`w-full ${trans === hover && border} font-medium relative z-30 text-dark text-sm px-6 py-3 text-opacity-70 cursor-pointer flex items-center border-primary hover:bg-secondary hover:text-opacity-100`}>
                                    <span>
                                        {trans}
                                    </span>
                                </div>
                            </div>
                    )})}
                </div>
            </Card>
        </DropDown>
    )
}

export default RecordTransDd;
