'use client';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LeavesTable from '@/components/LeavesTable'; // You will need to create this component similar to SchedulesTable
import PageSizeSelector from '@/components/PageSizeSelector';
import PaginationControls from '@/components/PaginationControls';
import useFetchData from '@/hooks/useFetchData';
import Loader from '@/components/Loader';

const parseEmployees = (): number[] => {
  const employeesString = localStorage.getItem('employees') || '';
  return employeesString.split(',').map(Number).filter(Boolean);
};

const Leaves = () => {
  const [tableData, setTableData] = useState({
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    pageSize: 5,
    page: 1,
  });
  const [filterModel, setFilterModel] = useState({ items: [{ columnField: '', operatorValue: '', value: '' }] });

  // Fetch leave list (adapted from your React.js code)
  const fetchLeavesList = async () => {
    const payload = {
      pageSize: tableData.pageSize,
      page: tableData.page,
      filters: filterModel,
      role: localStorage.getItem('role'),
      bio_id: localStorage.getItem('bio_id'),
      employees: parseEmployees(),
    };

    const response = await fetch('http://localhost/hris_cn/leaves_list', {  // Adapted endpoint
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (data.leave_rows) {
      return {
        rows: data.leave_rows.map((element: any, index: number) => ({
          id: index + 1,
          full_name: element.full_name,
          leave_type_readable: element.leave_type_readable,
          leave_start: element.readable_start_date,
          leave_end: element.readable_end_date,
          leave_status: element.leave_status_readable,
          reason: element.reason,
        })),
        totalRows: data.total_rows,
      };
    }
    return { rows: [], totalRows: 0 };
  };

  const { data: leaveData, loading, error } = useFetchData(fetchLeavesList, [tableData.page, tableData.pageSize, filterModel]);

  const handlePageChange = (page: number) => {
    setTableData((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableData((prev) => ({ ...prev, pageSize: parseInt(event.target.value, 10) }));
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
          <LeavesTable rows={leaveData?.rows || []} />  {/* Leaves table component */}
          <PageSizeSelector
            pageSize={tableData.pageSize}
            rowsPerPageOptions={tableData.rowsPerPageOptions}
            onPageSizeChange={handlePageSizeChange}
          />
          <PaginationControls
            page={tableData.page}
            totalRows={leaveData?.totalRows || 0}
            pageSize={tableData.pageSize}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default Leaves;
