import React, { useMemo, useRef, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';

const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
]

export default function App() {
  const columns = useMemo(
    () => [
      {
		id: 12,
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { 
			sx: { color: 'green' },
			onClick: () => {
				console.log('clicked')
			}
		}, //optional custom props
        Cell: ({ cell }) => <span className='badge bg-primary'>{cell.getValue()}</span>, //optional custom cell render
      },
      {
		id: 13,
        accessorFn: (row) => row.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: () => <i>Age</i>, //optional custom header render
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself

  const rowSelection = [
	{id: 12},
	{id: 13}
  ]
  const setRowSelection = (row) => {
	console.log(row)
  }

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }

  return (
    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnOrdering //enable some features
      enableRowSelection 
      enablePagination={false} //disable a default feature
      onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
      state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
      tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
	  muiSelectCheckboxProps={(cell, row) => ({
		onClick: (event) => {
		  console.info(cell);
		  console.info(row);
		},
	  })}
	  muiTableHeadCellProps={(cell, row) => ({
		onClick: (event) => {
		  console.info(cell);
		  console.info(row);
		},
	  })}
    />
  );
}