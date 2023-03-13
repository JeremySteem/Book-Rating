import { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FAVOURITE_BOOKS } from '../pages/index';
import { setBooks } from '../pages/index';
import Home from '../pages/index';

import Title from './Title'

export default function FavouriteBooks(props) {
  const [search, setSearch] = useState("")
  const filterBooks = (filteredBookList) => {
    if (search.trim() !== ""){
      filteredBookList = filteredBookList.filter((bookData)=> {
       return bookData.title.toLowerCase().includes(search.trim().toLowerCase())
      })
    }
    return filteredBookList
    //setBooks(filteredBookList)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    filterBooks([...FAVOURITE_BOOKS]).then((data)=> {
      props.setBooks([...props.books, data])
    })
  }

  return <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Favourite Books</Title>
      <form
        style={{width: '100%'}}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="search-field"
              label="search..."
              variant="standard"
              sx={{width: '100%'}}
              onChange={(e)=> {setSearch(e.target.value)}}
              value={search}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
            >Filter</Button>
          </Grid>
        </Grid>
      </form>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.books.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  </Paper>
}
