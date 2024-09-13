import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ScheduleData {
  fullname: string;
  site_name: string;
  designation_name: string;
  from_date_readable: string;
  to_date_readable: string;
  shift_name: string;
  shift_start: string;
  shift_end: string;
}

interface SchedulesTableProps {
  rows: ScheduleData[];
}

const SchedulesTable: React.FC<SchedulesTableProps> = ({ rows }) => (
  <Table>
    <TableCaption>Schedule Details</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Site Name</TableHead>
        <TableHead>Designation</TableHead>
        <TableHead>From Date</TableHead>
        <TableHead>To Date</TableHead>
        <TableHead>Shift Name</TableHead>
        <TableHead>Shift Start</TableHead>
        <TableHead>Shift End</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.fullname}</TableCell>
          <TableCell>{row.site_name}</TableCell>
          <TableCell>{row.designation_name}</TableCell>
          <TableCell>{row.from_date_readable}</TableCell>
          <TableCell>{row.to_date_readable}</TableCell>
          <TableCell>{row.shift_name}</TableCell>
          <TableCell>{row.shift_start}</TableCell>
          <TableCell>{row.shift_end}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default SchedulesTable;
