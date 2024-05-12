import './App.css';
import TableViewers from './Components/TableViewer';
import Terminal from './Components/Terminal';
import { useState, useEffect } from "react"
import { extractData } from './utilsFn';
import { filter, map } from 'lodash';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { IMPORTANT_COLUMNS } from './constant';


function App() {
  const [terminalContent, setTerminalContent] = useState(null)
  const [uniqueKeys, setUniqueKeys] = useState([])
  const [columns, setColumns] = useState([])
  const [searchDropdown, setSearchDropdown] = useState([])
  const [tableResult, setTableResult] = useState([])
  /*
  {
    name: "",
    value: "",
    options: []
  }
  */


  function readLogs(){
    const {keys, keyValues, data} = extractData(terminalContent)
    // console.log("data", data)
    setSearchDropdown(map(keyValues, k => ({name: k.key, value: '', options: map(k.values, (i) => i.value)})))
    setUniqueKeys(map(keys, k => ({key: k, val: IMPORTANT_COLUMNS.indexOf(k) > -1})))
    setColumns(keys)
    setTableResult(data)
  }

  useEffect(() => {
    if(terminalContent) {
      readLogs()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminalContent])

  // set columns
  useEffect(() => {
    setColumns(map(filter(uniqueKeys, (f) => f.val), (i) => i.key))
    // setColumns(map(uniqueKeys, (i) => i.key))
  }, [uniqueKeys])

  const toggleLookupCriteria = (name) => {
    const temp = map(uniqueKeys, (item) => {
      if(item.key === name) {
        return {
          ...item,
          val: !item.val
        }
      } else {
        return item
      }
    })
    setUniqueKeys(temp)
  }

  const handleSearch = (name, value) => {
    const temp = map(searchDropdown, (item) => {
      if(item.name === name) {
        return {
          ...item,
          value: value
        }
      } else {
        return item
      }
    })
    const data = filter(tableResult, (item) => {
      if(item[name] === value) {
        return true
      } else {
        return false
      }
    })
    setTableResult([...data])
    setSearchDropdown(temp)
  }


  return (
    <div>
      {/* <h1>
        Log Reader
      </h1> */}
    <div className="">
      <Terminal
        terminalContent={terminalContent}
        setTerminalContent={setTerminalContent}
      />
    </div>

    <Button 
      style={{
        "margin": "10px 20px"
      }} 
      variant="contained" 
      size="large"
      onClick={() => {
        terminalContent && readLogs()
      }}
    >
      Compile Log
    </Button>


    {/* filter columns / lookup criteria */}
    <div className='lookup-criteria'>
      <h3>Filter Columns</h3>
      {map(uniqueKeys, (item, id) => {
        return (
          <FormControlLabel
            key={id}
            label={item.key}
            control={
              <Checkbox
                checked={!!item.val}
                value={item.key}
                inputProps={{
                  'aria-label': 'Checkbox A',
                }}
                onChange={(e) => {
                  console.log(e.target.value)
                  toggleLookupCriteria(e.target.value)
                }}
              />
            }
          />
        )
      })}
    </div>

    {/* search section */}
    <div className='search-section'>
      <h3>Search</h3>
      <Grid container spacing={2}>
        {map(searchDropdown, (item, id) => {
          return (
            <Grid item xs={6} md={4} key={id}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{item.name}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item.value}
                  label="Age"
                  onChange={(e) => {
                    handleSearch(item.name, e.target.value)
                  }}
                >
                  {map(item.options, (i) => <MenuItem value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          )
        })}
      </Grid>
      
    </div>


    <div className='table-section'>
      <TableViewers 
        columns={columns}
        tableResult={tableResult}
      />
    </div>
    </div>

  )
}

export default App;
