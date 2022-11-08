const infoData = require("./calendarInfoData");

const getDaysAmount = (year, month) => {
    const nextMonth = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
};

const getWeekDay = (date) => {
    const day = date.getDay();

    return infoData.weekDays[day];
};

const getNextMonthDays = (year, month) => {
    const nextMonthDaysAmount = infoData.visibleDays - getCurrMonthDays(year, month).length - getPrevMonthDays(year, month).length;

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


module.exports = {
    getDaysAmount,
    getWeekDay,
    getPrevMonthDays,
    getCurrMonthDays,
    getNextMonthDays
};
