"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SphinxUtils {
    static calculateWarrantyEndDate(warStart, warPeriod = 12) {
        const warStartDate = new Date(warStart);
        let theMonth = warStartDate.getUTCMonth() + 1; //months from 1-12
        let theDay = warStartDate.getUTCDate();
        let theYear = warStartDate.getUTCFullYear();
        let addYear = warPeriod / 12;
        let addMonth = warPeriod % 12;
        if ((theMonth + addMonth) > 12) {
            addYear++;
            addMonth -= 12;
        }
        theYear += addYear;
        theMonth += addMonth;
        //if ((theMonth + addMonth) === 2 && theDay >= 29) {
        if ((theMonth) === 2 && theDay >= 29) {
            //let testYear = theYear + addYear;
            if (theYear % 4 === 0 && theYear % 100 !== 0) {
                // is a leap year, the max day for February is 29
                theDay = 29;
            }
        }
        if (theDay === 1) {
            if (theMonth === 1) {
                theYear -= 1;
                theMonth = 12;
                theDay = 31;
            }
            else {
                theMonth -= 1;
                theDay = SphinxUtils.dayInMonth(theYear, theMonth);
            }
        }
        else {
            theDay -= 1;
        }
        return new String(theYear).trim()
            .concat("-", ("00" + (theMonth).toString().trim()).slice(-2), "-", ("00" + theDay.toString().trim()).slice(-2));
        // return new String(theYear + addYear).trim()
        //     .concat("-", ("00" + (theMonth + addMonth).toString().trim()).slice(-2), "-",
        //         ("00" + theDay.toString().trim()).slice(-2));
    }
    static dayInMonth(theYear, theMonth) {
        if (theMonth == 2) {
            if (theYear % 4 === 0 && theYear % 100 !== 0) {
                // is a leap year
                return 29;
            }
            else {
                return 28;
            }
        }
        else {
            switch (theMonth) {
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                default:
                    return 31;
            }
        }
    }
    static formatDateYMD(date) {
        var d = new Date(date), month = '' + (d.getUTCMonth() + 1), day = '' + d.getUTCDate(), year = d.getUTCFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
}
exports.default = SphinxUtils;
//# sourceMappingURL=util.js.map