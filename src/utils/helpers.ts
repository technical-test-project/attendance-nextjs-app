import dayjs from "dayjs";
import 'dayjs/locale/id'

export default class Helpers {
    static attendanceGroupByDate(array: Attendance[]): AttendanceGroupByDate[] {
        const groupedData: { [key: string]: AttendanceGroupByDate } = {};

        array.forEach((data, index) => {
            const date = new Date(data.clockAt).toISOString().split('T')[0];
            const key = `${data.userId}-${date}`;

            if (!groupedData[key]) {
                groupedData[key] = {
                    id: `${index+1}`,
                    userName: data.user.profile.name,
                    clockInAt: this.convertDate(data.clockAt),
                    clockOutAt: null,
                };
            }

            // groupedData[key].status.push(data.status);

            if (data.status === "clock_in") {
                groupedData[key].clockInAt = this.convertDate(data.clockAt);
            } else if (data.status === "clock_out") {
                groupedData[key].clockOutAt = this.convertDate(data.clockAt);
            }
        });

        return Object.values(groupedData);
    }


    static convertDate(date: string, format?: string): string {

        const defaultFormat = 'DD MMMM YYYY HH:mm:ss'

        try {
            return dayjs(date).locale('id').format(format ?? defaultFormat)
        }   catch (e) {
            return `Cannot Convert this string "${date}"`
        }
    }
}