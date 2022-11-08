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

const visibleDays = 7 * 6;

module.exports = {
    monthsList,
    weekDayList,
    weekDays,
    visibleDays
}
