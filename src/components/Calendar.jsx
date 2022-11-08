import styles from "../styles/Calendar.module.scss";

import React, {useMemo, useState} from 'react';

const monthsList = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

const weekDayList = [
    "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat",
    "Sun"
];

const weekDays = {
    0: 6, 1: 0, 2: 1,
    3: 2, 4: 3, 5: 4,
    6: 5,
};

const VISIBLE_DAYS = 7 * 6;

const getDaysAmount = (year, month) => {
    const nextMonth = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
};

const getWeekDay = (date) => {
    const day = date.getDay();

    return weekDays[day];
};

const getNextMonthDays = (year, month) => {
    const nextMonthDaysAmount = VISIBLE_DAYS - getCurrMonthDays(year, month).length - getPrevMonthDays(year, month).length;

    const [nextYear, nextMonth] = (month === 11) ? [year+1, 0] : [year, month+1];
    const dates = [];
    for (let i = 1; i<=nextMonthDaysAmount; i++){
        dates.push({
            year: nextYear,
            month: nextMonth,
            day: i
        });
    }

    return dates;
};

const getPrevMonthDays = (year, month) => {
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    const weekDay = getWeekDay(firstDayOfCurrentMonth);
    const prevMonthDaysAmount = getDaysAmount(year, month-1);

    const [prevYear, prevMonth] = (month === 0) ? [year-1, 11] : [year, month-1];
    const dates = [];
    //weekDay - 1 = сколько дней нужно взять из предыдущего месяца
    for (let i = weekDay-1; i>=0; i--){
        dates.push({
            year: prevYear,
            month: prevMonth,
            day: prevMonthDaysAmount - i
        });
    }

    return dates;
};

const getCurrMonthDays = (year, month) => {
    const daysAmount = getDaysAmount(year, month);
    const dates = [];
    for (let i = 1; i<=daysAmount; i++){
        dates.push({
            year,
            month,
            day: i
        });
    }

    return dates;
};

const Calendar = ({value, onChange}) => {
    const [year, month, day] = useMemo(()=>{
        const currentYear = value.getFullYear();
        const currentMonth = monthsList[value.getMonth()];
        const currentDay = value.getDate();

        return [currentYear, currentMonth, currentDay];
    }, [value])

    const [onCalendarYear, setOnCalendarYear] = useState(()=>value.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState(()=>value.getMonth());

    const calendarData = useMemo(() => {
        const prevMonth = getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    //console.log(calendarData)

    const nextYear = () => {
        setOnCalendarYear(year => year+1);
    }

    const prevYear = () => {
        setOnCalendarYear(onCalendarYear-1);
    }

    const nextMonth = () => {
        if (onCalendarMonth===11){
            setOnCalendarYear(onCalendarYear+1);
            setOnCalendarMonth(0);
        }else setOnCalendarMonth(onCalendarMonth+1);
    }

    const prevMonth = () => {
        if (onCalendarMonth===0){
            setOnCalendarYear(onCalendarYear-1);
            setOnCalendarMonth(11);
        }else setOnCalendarMonth(onCalendarMonth-1);
    }

    return (
        <div>
            <div className={styles.Button}>
                <button onClick={prevYear}>prev</button> {onCalendarYear} <button onClick={nextYear}>next</button>
            </div>
            <div className={styles.Button}>
                <button onClick={prevMonth}>prev</button> {monthsList[onCalendarMonth]} <button onClick={nextMonth}>next</button>
            </div>
            <div className={styles.Calendar}>
                {weekDayList.map(weekDay=>
                    <div className={styles.Calendar__weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data=>
                    <div className={styles.Calendar__cell}>{data.day}</div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
