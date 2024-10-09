'use client';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AttendanceTable from '@/components/AttendanceTable'; // This will be your attendance table component
import PageSizeSelector from '@/components/PageSizeSelector';
import PaginationControls from '@/components/PaginationControls';
import useFetchData from '@/hooks/useFetchData';
import Loader from '@/components/Loader';

const parseEmployees = (): number[] => {
  const employeesString = localStorage.getItem('employees') || '';
  return employeesString.split(',').map(Number).filter(Boolean);
};

const Attendance = () => {
  const [tableData, setTableData] = useState({
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    pageSize: 5,
    page: 1,
  });
  const [filterModel, setFilterModel] = useState({ items: [{ columnField: '', operatorValue: '', value: '' }] });

  // Fetch attendance list
  const fetchAttendanceList = async () => {
    const payload = {
      pageSize: tableData.pageSize,
      page: tableData.page,
      filters: filterModel,
      role: localStorage.getItem('role'),
      bio_id: localStorage.getItem('bio_id'),
      employees: parseEmployees(),
    };

    const response = await fetch('http://localhost/hris_cn/attendance_list', {  // Adapted endpoint
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.attendance_rows) {
      return {
        rows: data.attendance_rows.map((element: any, index: number) => ({
          id: index + 1,
          fullname: element.fullname,
          site_name: element.site_name,
          designation_name: element.designation_name,
          attendance_date: element.attendance_date,
          checkin: element.checkin,
          checkout: element.checkout,
          time: element.time,
          early_sitting: element.early_sitting,
          late_sitting: element.late_sitting,
          acceptable_time: element.acceptable_time,
        })),
        totalRows: data.total_rows,
      };
    }
    return { rows: [], totalRows: 0 };
  };

  const { data: attendanceData, loading, error } = useFetchData(fetchAttendanceList, [tableData.page, tableData.pageSize, filterModel]);

  const handlePageChange = (page: number) => {
    setTableData((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableData((prev) => ({ ...prev, pageSize: parseInt(event.target.value, 10), page: 1 })); // Reset to first page
  };

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      {loading && <Loader />}
      {error && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && (
        <>
          <AttendanceTable rows={attendanceData?.rows || []} />  {/* Attendance table component */}
          <PageSizeSelector
            pageSize={tableData.pageSize}
            rowsPerPageOptions={tableData.rowsPerPageOptions}
            onPageSizeChange={handlePageSizeChange}
          />
          <PaginationControls
            page={tableData.page}
            totalRows={attendanceData?.totalRows || 0}
            pageSize={tableData.pageSize}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default Attendance;
