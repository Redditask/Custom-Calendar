import styles from "../../styles/Calendar.module.scss";

import React, {useMemo, useState} from 'react';

const utils = require ("./calendarUtils");
const infoData = require("./calendarInfoData");

const Calendar = ({value, onChange}) => {
    const [year, month, day] = useMemo(()=>{
        const currentYear = value.getFullYear();
        const currentMonth = infoData.monthsList[value.getMonth()];
        const currentDay = value.getDate();

        return [currentYear, currentMonth, currentDay];
    }, [value])

    const [onCalendarYear, setOnCalendarYear] = useState(()=>value.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState(()=>value.getMonth());

    const calendarData = useMemo(() => {
        const prevMonth = utils.getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = utils.getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = utils.getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

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
                <button onClick={prevMonth}>prev</button> {infoData.monthsList[onCalendarMonth]} <button onClick={nextMonth}>next</button>
            </div>
            <div className={styles.Calendar}>
                {infoData.weekDayList.map(weekDay=>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data=>
                    <div className={styles.Calendar__cell} key={data.day + "" + data.month + "" + data.year}>{data.day}</div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
