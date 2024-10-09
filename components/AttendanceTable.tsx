import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AttendanceData {
  fullname: string;
  site_name: string;
  designation_name: string;
  attendance_date: string;
  checkin: string;
  checkout: string;
  time: string;
  early_sitting: string;
  late_sitting: string;
  extra_time: string;
  acceptable_time: string;
}

interface AttendanceTableProps {
  rows: AttendanceData[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ rows }) => (
  <Table>
    <TableCaption>Attendance Details</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Site Name</TableHead>
        <TableHead>Designation</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Check-In</TableHead>
        <TableHead>Check-Out</TableHead>
        <TableHead>Total Time</TableHead>
        <TableHead>Accepted Time</TableHead>
        <TableHead>Early Sitting</TableHead>
        <TableHead>Late Sitting</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.fullname}</TableCell>
          <TableCell>{row.site_name}</TableCell>
          <TableCell>{row.designation_name}</TableCell>
          <TableCell>{row.attendance_date}</TableCell>
          <TableCell>{row.checkin}</TableCell>
          <TableCell>{row.checkout}</TableCell>
          <TableCell>{row.time}</TableCell>
          <TableCell>{row.acceptable_time}</TableCell>
          <TableCell>{row.early_sitting}</TableCell>
          <TableCell>{row.late_sitting}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default AttendanceTable;
