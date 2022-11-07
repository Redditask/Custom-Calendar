import styles from "../styles/Calendar.module.scss";

import React, {useMemo, useState} from 'react';

const monthList = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

const VISIBLE_DAYS = 7 * 6;

const getDaysAmount = (year, month) => {
    const nextMonth = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
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
    const weekDay = firstDayOfCurrentMonth.getDay();

    const prevMonthDaysAmount = getDaysAmount(year, month-1);

    const [prevYear, prevMonth] = (month === 0) ? [year-1, 11] : [year, month-1];
    const dates = [];
    //weekDay - 1 = сколько дней нужно взять из предыдущего месяца
    for (let i = 0; i<weekDay-1; i++){
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

    //<= ?
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
        const currentMonth = monthList[value.getMonth()];
        const currentDay = value.getDate();

        return [currentYear, currentMonth, currentDay];
    }, [value])

    const [onCalendarYear] = useState(()=>value.getFullYear());
    const [onCalendarMonth] = useState(()=>value.getMonth());

    const calendarData = useMemo(() => {

        const prevMonth = getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = getNextMonthDays(onCalendarMonth, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    //console.log(calendarData)

    const nextYear = () => {

    }

    const prevYear = () => {

    }

    const nextMonth = () => {

    }

    const prevMonth = () => {

    }

    return (
        <div className={styles.Calendar}>
            Current date:
            <div>
                {day} {month} {year}
            </div>
        </div>
    );
};

export default Calendar;
