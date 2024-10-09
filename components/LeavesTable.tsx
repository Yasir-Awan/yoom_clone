import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaveData {
  full_name: string;
  leave_type_readable: string;
  leave_start: string;
  leave_end: string;
  leave_status: string;
  reason: string;
}

interface LeavesTableProps {
  rows: LeaveData[];
}

const LeavesTable: React.FC<LeavesTableProps> = ({ rows }) => (
  <Table>
    <TableCaption>Leave Details</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Full Name</TableHead>
        <TableHead>Leave Type</TableHead>
        <TableHead>Start Date</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Reason</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.full_name}</TableCell>
          <TableCell>{row.leave_type_readable}</TableCell>
          <TableCell>{row.leave_start}</TableCell>
          <TableCell>{row.leave_end}</TableCell>
          <TableCell>{row.leave_status}</TableCell>
          <TableCell>{row.reason}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default LeavesTable;
