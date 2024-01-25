import React, {useState, useEffect, Fragment} from 'react'
import { prueba_request } from '../services/moods'
import '../App.css'

//? COMPONENTS IMPORTS
import { EditIcon } from 'lucide-react'
import ColorPicker from '../components/ui/color-picker'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

function EmotionsList() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const getEmotions = async () => {
      const response = await prueba_request()
      setData(response.data)
    }
    getEmotions()
  }, [])

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Emotion</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell><ColorPicker color={item.color}/></TableCell>
              <TableCell>
                <Button variant='outline' size='icon' className='p-0'>
                  <EditIcon className="h-4 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Fragment>
  )
}

export default EmotionsList
