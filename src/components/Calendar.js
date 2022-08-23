import React, {useState, useEffect, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import CalendarSvg from '../svgs/CalendarSvg';
import DropDown from './dropDowns/DropDown';
import MonthDd from './dropDowns/MonthDd';
import YearDd from './dropDowns/YearDd';
import DropDownSvg from '../svgs/DropDownSvg';
import WhiteCard from './common/WhiteCard';
import Button from './common/Button';
import ChevronLeft from '../svgs/ChevronLeft';
import ChevronRight from '../svgs/ChevronRight';

const Calendar = ({ 
    setShowDateDd, 
    isRange, 
    setSelectedDateRange, 
    todayColor, 
    years, 
    days, 
    month_names,
    applyDateText
}) => {
  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [no_of_days, setNumDays] = useState([]);
  const [blankdays, setBlankDays] = useState([]);
  const [datepickerValue, setDatepickerValue] = useState('');
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [numDaysSelected, setNumDaysSelected] = useState(0);
  const [clickedDate, setClickedDate] = useState();

  const initDate = useCallback (() => {
    let today = new Date();

    setDatepickerValue(() =>
      new Date(year, month, today.getDate()).toDateString()
    );
  }, [month, year]);

  // Checks if the day is the current day
  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  };

  // Gets an actual date value from the calendar number passed in 
  const getDateValue = (date) => {
    setClickedDate(date)
    console.log(date);
    let selectedDate = new Date(year, month, date);
    const dateString = selectedDate.toDateString()
    const dateValues = {
        rawDateValue: selectedDate.toString(), 
        dateString
    }
    isRange && setFirstDate(() => selectedDate)
    setDatepickerValue(dateValues);
    // setDatepickerValue(() => selectedDate.toDateString());
  };

  // Calculates the number of days in the given month
  const getNoOfDays = useCallback(() => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();

    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(() => blankdaysArray);
    setNumDays(() => daysArray);
  }, [month, year]);

  const resetDates = () => {
      setFirstDate(null);
      setSecondDate(null);
      setNumDaysSelected(0);
  }

  // Calculates the range in days between the first and second date
  const evalRange = (date) => {
    let selectedDate = new Date(year, month, date);

    if (!firstDate) {
      setFirstDate(selectedDate);
      return;
    }
    setSecondDate(selectedDate);
    let difference =
      (selectedDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
    console.log(`Difference in days: ${difference}`);
    setNumDaysSelected(difference +1)
  };

  // Checking to see if the date has been selected or not
  const dateFromDay = (date) => {
    let newDate = new Date(year, month, date);

    if (firstDate !== null && secondDate !== null) {
      return (
        newDate.toDateString() === firstDate.toDateString() ||
        newDate.toDateString() === secondDate.toDateString()
      );
    }

    if (firstDate !== null) {
      return newDate.toDateString() === firstDate.toDateString();
    }
    return false;
  };

  // Checking to see which days are between the first and second date
  const betweenDays = (date) => {
    let newDate = new Date(year, month, date);

    if (firstDate !== null && secondDate !== null) {
      return newDate < secondDate && newDate > firstDate;
    }
  };

  useEffect(() => {
    // This function can be used to do computations when the date is changed
    if (firstDate !== null && secondDate !== null) {
      setDatepickerValue(() => {
        return firstDate.toDateString() + ' - ' + secondDate.toDateString();
      });
    }
  }, [firstDate, secondDate]);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, [year, month, getNoOfDays, initDate]);

  const handleApply = () => {
    setSelectedDateRange(datepickerValue);
    // setSelectedDateRange(datepickerValue.toString());
    console.log(datepickerValue)
    setShowDateDd && setShowDateDd(false);
  }

  return (
    <DropDown toggleDd={setShowDateDd}>
        <div className='container mx-auto antialiased relative z-30'>
            <div className='w-72 bg-white'>
                <AnimatePresence initial={false}>
                    <WhiteCard>
                        <motion.div
                            className='text-headingDark px-4 pt-4'
                            initial='collapsed'
                            animate='open'
                            exit='collapsed'
                            variants={{
                                open: {opacity: 1},
                                collapsed: {opacity: 0},
                            }}
                            transition={{duration: 0.5, ease: 'easeIn'}}
                        >
                            { isRange &&
                                <>
                                    <div className='flex justify-between'>
                                        <span className='font-semibold text-base'> Custom Date </span>
                                        <span onClick={() => setShowDateDd(false)} className='font-semibold cursor-pointer text-headingDark text-opacity-70 text-sm'> Cancel </span>
                                    </div>
                                    <div className='mt-4 w-full text-sm flex space-x-4'>
                                        <div className='w-1/2'>
                                            <div className='text-headingDark text-opacity-70 font-semibold'> From </div>
                                            <div className='flex items-center font-normal mt-1 border border-primary rounded px-2 py-2'>
                                                <span className='mr-2'>
                                                    <CalendarSvg />
                                                </span>
                                                <span> {firstDate && firstDate.toDateString()} </span>
                                            </div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className='text-headingDark text-opacity-70 font-semibold'> To </div>
                                            <div className='flex items-center font-normal mt-1 border border-primary rounded px-2 py-2'>
                                                <span className='mr-2'>
                                                    <CalendarSvg />
                                                </span>
                                                <span> {secondDate && secondDate.toDateString()} </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            
                            <div className={`flex justify-between items-center ${isRange ? 'mt-6' : 'mt-0'}`}>
                                <button
                                    type='button'
                                    className='transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-myBlue-100 p-3 rounded-full'
                                    disabled={month === 0 ? true : false}
                                    onClick={() => {
                                        resetDates();
                                        setMonth((prev) => prev - 1);
                                    }}>
                                        <ChevronLeft />
                                </button>

                                <div className='flex text-sm font-semibold text-headingDark space-x-5'>
                                    <div onClick={() => setShowMonths(!showMonths)} className='flex space-x-3 items-center cursor-pointer relative'>
                                        <span className=''>
                                            {month_names ? month_names[month] : MONTH_NAMES[month]}
                                        </span>
                                        <span>
                                            <DropDownSvg />
                                        </span>
                                        {showMonths && 
                                            <div className='absolute z-30 top-8 -left-8 right-0 w-28'>
                                                <MonthDd months={month_names ? month_names : MONTH_NAMES} setMonth={setMonth} setShowMonths={setShowMonths} resetDates={resetDates} />
                                            </div>
                                        }
                                    </div>
                                    <span onClick={() => setShowYears(!showYears)} className='flex space-x-3 items-center cursor-pointer relative'>
                                        <span>
                                            {year}
                                        </span>
                                        <span>
                                            <DropDownSvg />
                                        </span>
                                        {showYears &&
                                            <div className='absolute z-30 top-8 -left-8 right-0 w-28'>
                                                <YearDd years={years && years} setYear={setYear} setShowYears={setShowYears} resetDates={resetDates} />
                                            </div>
                                        }
                                    </span>
                                </div>

                                <button
                                    type='button'
                                    className='transition-colors ease-in-out duration-200 inline-flex cursor-pointer hover:bg-myBlue-100 p-3 rounded-full'
                                    disabled={month === 11 ? true : false}
                                    onClick={() => {
                                        resetDates();
                                        setMonth(prev => prev + 1);
                                    }}>
                                        <ChevronRight />
                                </button>
                            </div>
                        </motion.div>

                            {/* Names of Days Part */}
                            <motion.div
                                className='grid grid-flow-col grid-cols-7 mt-4 px-6'
                                initial='collapsed'
                                animate='open'
                                exit='collapsed'
                                variants={{
                                    open: {opacity: 1, height: 'auto'},
                                    collapsed: {opacity: 0, height: 0},
                                }}
                                transition={{duration: 0.5, ease: 'easeIn'}}>
                                {days ? days.map((day, index) => {
                                    return (
                                        <div className='px-1' key={index}>
                                            <div
                                                key={index}
                                                className='text-headingDark text-opacity-70 font-semibold text-center text-sm w-7'>
                                                {day}
                                            </div>
                                        </div>
                                    );
                                }):
                                DAYS.map((day, index) => {
                                    return (
                                        <div className='px-1' key={index}>
                                            <div
                                                key={index}
                                                className='text-headingDark text-opacity-70 font-semibold text-center text-sm w-7'>
                                                {day}
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Days Listing Proper */}
                            <motion.div
                                className='grid grid-cols-7 px-6 mt-3'
                                initial='collapsed'
                                animate='open'
                                exit='collapsed'
                                variants={{
                                open: {opacity: 1, height: 'auto'},
                                collapsed: {opacity: 0, height: 0},
                                }}
                                transition={{duration: 0.5, ease: 'easeIn'}}
                            >
                                {blankdays.map((index) => {
                                    return (
                                        <div className='px-1 mb-1' key={index}>
                                            <div
                                                key={index}
                                                className='cursor-pointer text-center leading-loose'
                                            >
                                                {}
                                            </div>
                                        </div>
                                    );
                                })}
                                {no_of_days.map((day, index) => {
                                    return (
                                        <div className='mb-1' key={index}>
                                            <motion.div
                                                key={index}
                                                onClick={() => {
                                                    isRange ? evalRange(day) : getDateValue(day);
                                                }}
                                                className={`
                                                    cursor-pointer transition-colors duration-200 ease-in-out text-sm flex justify-center items-center py-1 
                                                    ${!isToday(day) && !dateFromDay(day)  && !betweenDays(day) && 'hoverRound hover:bg-myBlue-100'}
                                                    ${isToday(day) && `${todayColor ? `bg-[${todayColor}]` : 'bg-complementary'} text-white round`}
                                                    ${(firstDate && firstDate.getDate() === day && !isRange) && 'round bg-primary'}
                                                    ${(clickedDate && clickedDate === day && !isRange) && 'round bg-primary text-white'}
                                                    ${firstDate && firstDate.getDate() === day ? 'bg-primary text-white rounded-l-full' : ''}
                                                    ${betweenDays(day) && 'bg-myBlue-100'}
                                                    ${secondDate && secondDate.getDate() === day ? 'bg-primary text-white rounded-r-full' : ''}
                                                    ${betweenDays(day) && new Date(year, month, day).getDay() === 6 && 'rounded-r-full'}
                                                    ${betweenDays(day) && new Date(year, month, day).getDay() === 0 && 'rounded-l-full'}
                                                `}
                                            >
                                                {day}
                                            </motion.div>
                                    </div>
                                );
                                })}
                        </motion.div>
                        <div className='mt-4 bg-myBlue-50 text-sm px-4 py-2.5 flex justify-between items-center border-t border-headingDark border-opacity-10'>
                            { isRange &&
                                <div className='text-complementary font-semibold'>
                                {0 || numDaysSelected} days selected
                            </div>
                            }
                            { !isRange && setShowDateDd &&
                                <span 
                                    onClick={() => setShowDateDd(false)} className='font-semibold cursor-pointer text-headingDark text-opacity-70 text-sm'
                                >
                                    Cancel 
                                </span>
                            }
                            <Button text={applyDateText ? applyDateText : 'Apply Date'} extraClasses='text-white bg-primary' onClick={handleApply} />
                        </div>
                    </WhiteCard>
                </AnimatePresence>
            </div>
        </div>
    </DropDown>
  );
};

export default Calendar;
