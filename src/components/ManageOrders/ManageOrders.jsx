import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { IconButton, Tooltip } from '@mui/material'
import Snack from '../Snack/Snack'
import { useConfirm } from 'material-ui-confirm'

const ManageOrders = () => {
  // auth
  const { token } = useAuth()
  // states
  const [orders, setOrders] = useState([])
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [method, setMethod] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // confirm
  const confirm = useConfirm()
  // paginator
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  // load orders
  useEffect(() => {
    fetch('https://vast-everglades-63169.herokuapp.com/orders', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [token])

  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  // handle delete order
  const handleDelete = id => {
    confirm({
      title: 'Are you sure?',
      description: 'This will delete the order',
    })
      .then(() => {
        fetch(`https://vast-everglades-63169.herokuapp.com/orders/${id}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              setOrders(orders.filter(order => order._id !== id))
              setSeverity('success')
            } else {
              setSeverity('error')
            }
            setSnackOpen(true)
            setMethod('delete')
          })
      })
      .catch(() => {})
  }
  // handle update order status
  const handleUpdateStatus = updatedOrder => {
    updatedOrder.status = 'Shipped'
    confirm({
      title: 'Are you sure?',
      description: 'This will approve the order',
    })
      .then(() => {
        fetch(
          `https://vast-everglades-63169.herokuapp.com/orders/${updatedOrder._id}`,
          {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify(updatedOrder),
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              const newOrders = orders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
              )
              setOrders(newOrders)

              setSeverity('success')
              setMethod('update')
              setSnackOpen(true)
            } else {
              setSeverity('error')
              setSnackOpen(true)
            }
          })
      })
      .catch(() => {})
  }

  // table data
  const columns = [
    { id: 'productName', label: 'Product Name', minWidth: 150 },
    { id: 'userEmail', label: 'Email', minWidth: 120 },
    {
      id: '_id',
      label: 'Order ID',
      minWidth: 200,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 140,
      align: 'right',
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
      align: 'right',
    },
  ]

  // render
  return (
    <>
      <Snack
        open={snackOpen}
        duration={4000}
        handleClose={handleSnackClose}
        severity={severity}
        message={
          severity === 'success'
            ? `Order ${method}d successfully!`
            : `Failed to ${method} order!`
        }
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'actions' ? (
                              <>
                                {row.status === 'Pending' && (
                                  <Tooltip title="Approve">
                                    <IconButton
                                      color="inherit"
                                      sx={{
                                        color: 'var(--clr-primary)',
                                        fontSize: '1rem',
                                        p: 1.5,
                                      }}
                                      onClick={() => handleUpdateStatus(row)}
                                    >
                                      <i className="fas fa-check"></i>
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Tooltip title="Delete">
                                  <IconButton
                                    color="inherit"
                                    sx={{
                                      color: 'var(--clr-primary)',
                                      fontSize: '1rem',
                                      p: 1.5,
                                      ml: 1,
                                    }}
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default ManageOrders
