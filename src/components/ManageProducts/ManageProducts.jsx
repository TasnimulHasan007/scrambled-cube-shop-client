import { useState, useEffect } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Tooltip,
  IconButton,
} from '@mui/material'
import Snack from '../Snack/Snack'
import { useConfirm } from 'material-ui-confirm'
import useAuth from '../../hooks/useAuth'

const ManageProducts = () => {
  // auth stuff
  const { token } = useAuth()
  // states
  const [products, setProducts] = useState([])
  const [snackOpen, setSnackOpen] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [method, setMethod] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // confirm
  const confirm = useConfirm()

  // load products
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  // handle delete product
  const handleDelete = id => {
    confirm({
      title: 'Are you sure?',
      description: 'This will delete the order',
    })
      .then(() => {
        fetch(`http://localhost:5000/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              setSeverity('success')

              setProducts(products.filter(product => product._id !== id))
            } else {
              setSeverity('error')
            }
            setMethod('delete')
            setSnackOpen(true)
          })
      })
      .catch(() => {})
  }
  // paginator
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  // table data
  const columns = [
    { id: 'name', label: 'Product Name', minWidth: 150 },
    { id: 'price', label: 'Product Price', minWidth: 100 },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
      align: 'right',
    },
  ]

  // handle snackbar close
  const handleSnackClose = () => {
    setSnackOpen(false)
  }

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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map(column => {
                        let value = row[column.id]
                        if (column.id === 'price') {
                          value = `৳${value}`
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'actions' ? (
                              <>
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default ManageProducts
