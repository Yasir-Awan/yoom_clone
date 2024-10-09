'use client';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SchedulesTable from '@/components/SchedulesTable';
import PageSizeSelector from '@/components/PageSizeSelector';
import PaginationControls from '@/components/PaginationControls';
import useFetchData from '@/hooks/useFetchData';
import Loader from '@/components/Loader';

const parseEmployees = (): number[] => {
  const employeesString = localStorage.getItem('employees') || '';
  return employeesString.split(',').map(Number).filter(Boolean);
};

const Schedules = () => {
  const [tableData, setTableData] = useState({
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    pageSize: 5,
    page: 1,
  });
  const [filterModel, setFilterModel] = useState({ items: [{ columnField: '', operatorValue: '', value: '' }] });

  const fetchShiftList = async () => {
    const response = await fetch('http://localhost/hris_cn/shift_list', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
    const data = await response.json();
    return { shifts: data.shift_info.map((shift: any) => ({ id: shift.id, name: shift.shift_name })) };
  };

  const fetchScheduleList = async () => {
    const payload = {
      pageSize: tableData.pageSize,
      page: tableData.page,
      filters: filterModel,
      role: localStorage.getItem('role'),
      bio_id: localStorage.getItem('bio_id'),
      employees: parseEmployees(),
    };

    const response = await fetch('http://localhost/hris_cn/schedule_list', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.schedule_rows) {
      return {
        rows: data.schedule_rows.map((element: any, index: number) => ({
          id: index + 1,
          fullname: element.fullname,
          site_name: element.site_name,
          designation_name: element.designation_name,
          from_date_readable: element.from_date_readable,
          to_date_readable: element.to_date_readable,
          shift_name: element.shift_name,
          shift_start: element.shift_start,
          shift_end: element.shift_end,
        })),
        totalRows: data.total_rows,
      };
    }
    return { rows: [], totalRows: 0 };
  };

  const { data: shiftData } = useFetchData(fetchShiftList, []);
  const { data: scheduleData, loading, error } = useFetchData(fetchScheduleList, [tableData.page, tableData.pageSize, filterModel]);

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
          <SchedulesTable rows={scheduleData?.rows || []} />
          <PageSizeSelector
            pageSize={tableData.pageSize}
            rowsPerPageOptions={tableData.rowsPerPageOptions}
            onPageSizeChange={handlePageSizeChange}
          />
          <PaginationControls
            page={tableData.page}
            totalRows={scheduleData?.totalRows || 0}
            pageSize={tableData.pageSize}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default Schedules;
