export const STATE = {DRAFT: 'DRAFT', DONE: 'DONE', CLOSE: 'CLOSE', CANCEL: 'CANCEL'};
export const FLOW = {IN: 'IN', OUT: 'OUT'};

export function getFormDefaultDateFromDate(date: Date = new Date()) {
    return date.getFullYear().toString() + '-' + getDayOrMonthToString(date.getMonth()+1) + '-' + getDayOrMonthToString(date.getDate());
}

function getDayOrMonthToString(dayOrMonth: number){
    return (dayOrMonth < 10)? ('0' + dayOrMonth.toString()) : dayOrMonth.toString();
}