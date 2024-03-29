type User = {
    id: number;
    roleId: number;
    positionId: number;
    email: string;
    createdAt: string,
    updatedAt: string;
    profile: Profile;
    role: Role;
    attendances: Attendance[];
    attendanceGroupByDates: AttendanceGroupByDate[];
}