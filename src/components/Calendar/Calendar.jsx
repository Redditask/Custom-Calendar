import styles from "../../styles/Calendar.module.scss";

import React, {useMemo, useState} from 'react';
import {isActiveMonth, isToday} from "./calendarUtils";

const utils = require ("./calendarUtils");
const infoData = require("./calendarInfoData");

/*
ToDo:
 Добавить стилей для выбранной ячейки
 Добавить возможность выносить выбранную дату в родительский компонент (Redux?)
 ^^^ на будущее, для использования в других проектах ^^^
*/

const Calendar = ({value, select}) => {
    const [onCalendarYear, setOnCalendarYear] = useState(() => value.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState(() => value.getMonth());

    const calendarData = useMemo(() => {
        const prevMonth = utils.getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = utils.getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = utils.getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    const nextYear = () => {
        setOnCalendarYear(year => year + 1);
    }

    const prevYear = () => {
        setOnCalendarYear(onCalendarYear - 1);
    }

    const nextMonth = () => {
        if (onCalendarMonth === 11) {
            setOnCalendarYear(onCalendarYear + 1);
            setOnCalendarMonth(0);
        } else setOnCalendarMonth(onCalendarMonth + 1);
    }

    const prevMonth = () => {
        if (onCalendarMonth === 0) {
            setOnCalendarYear(onCalendarYear - 1);
            setOnCalendarMonth(11);
        } else setOnCalendarMonth(onCalendarMonth - 1);
    }

    return (
        <div>
            <div className={styles.ChangeData}>
                <p
                    className={styles.button}
                    onClick={prevYear}
                    title="prev year"
                >&#129144;
                </p>

                {onCalendarYear}

                <p
                    className={styles.button}
                    onClick={nextYear}
                    title="next year"
                >&#129146;
                </p>
            </div>
            <div className={styles.ChangeData}>
                <p
                    className={styles.button}
                    onClick={prevMonth}
                    title="prev month"
                >&#129144;
                </p>

                {infoData.monthsList[onCalendarMonth]}

                <p
                    className={styles.button}
                    onClick={nextMonth}
                    title="next month"
                >&#129146;
                </p>
            </div>
            <div className={styles.Calendar}>
                {infoData.weekDayList.map(weekDay =>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data => {
                        let className = styles.Calendar__cell;
                        if (isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
                        if (utils.isToday(data)) className = styles.Calendar__currentDay;

                        return (
                            <div className={className} key={data.day + "" + data.month + "" + data.year}>{data.day}</div>
                        )
                    }
                )}
            </div>
        </div>
    );
};

export default Calendar;
