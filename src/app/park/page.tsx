'use client'
import ParkLayout from '@/components/parks/ParkLayout';
import SearchMat from '@/components/search/SearchMat';
import { Parks } from '@/interfaces/park.model';
import { findAll, searchByObject } from '@/services/park.service';
import { Box, Button, IconButton, Input, InputBase, Paper } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { NIL as nil } from 'uuid'
import { toastAlert } from "@/services/alert.service"
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Loadding from '@/components/load/Loadding';

export default function page() {
  const p = {} as Parks
  let [park, setPark] = useState<Parks[]>([])
  const [search, setSearch] = useState<Parks>(p)
  const [load, setLoad] = useState<boolean>(false)
  const query = {
    start_date: '',
    end_date: ''
  }
  async function feedPark() {
    setLoad(true)
    try {
      const result = await findAll()
      setPark(result)
      setLoad(false)
    } catch (error: any) {
      console.log(error);
      toastAlert(JSON.stringify(error.message), 'error')
      setLoad(false)
    }
  }
  async function onSearchPark() {
    const sp = {} as Parks
    sp.name_park = search.name_park
    console.log("sp: ", sp.name_park);

    let arrPark: Parks[] = []
    arrPark = park
    const s = arrPark.filter(r => {
      return r.name_park.includes(sp.name_park)
    })
    setPark(s)


  }
  useEffect(() => {
    feedPark()
  }, [])
  return (
    <>
      <div>
        <div className="home_menu_bar">
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search name parks' }}
              type='text'
              onChange={(e) => setSearch({ ...search, name_park: e.target.value })}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
              onClick={onSearchPark}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link href={`/park/${nil}`}>
              <Button onClick={() => setLoad(true)} >Create</Button>
            </Link>
          </Box>
        </div>
        <ParkLayout data={park} query={query} />
      </div>
      {
        load === true? <Loadding />: null
      }
    </>
  )
}
