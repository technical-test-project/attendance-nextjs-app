type User = {
    id: number;
    roleId: number;
    positionId: number;
    email: string;
    createdAt: string,
    updatedAt: string;
    profile: Profile;
    role: Role;
    position: Position;
    attendances: Attendance[];
    attendanceGroupByDates: AttendanceGroupByDate[];
}