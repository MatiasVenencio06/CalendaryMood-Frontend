import {useState, useEffect, Fragment} from 'react'
import { add_emotion, delete_emotion, prueba_request } from '../services/moods'
import '../App.css'
import { useCallback } from 'react'
//? COMPONENTS IMPORTS
import { EditIcon, TrashIcon } from 'lucide-react'
import ColorPicker from '../components/ui/color-picker'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AddEmotion } from '@/components/add-emotion'
import Swal from 'sweetalert2'

function EmotionsList() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const addEmotion = useCallback(
    async (data) => {
      try {
        console.log(data)
        add_emotion(data)
      } catch {

      }
      setOpen(false)
    },
    []
  )


  useEffect(() => {
    const getEmotions = async () => {
      const response = await prueba_request()
      setData(response.data)
    }
    getEmotions()
  }, [open, deleted])

  const toggleDelete = async (emotion_id) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        text: 'You cannot revert this action after.',
        confirmButtonText: 'Sure',
        showCancelButton: true
      })
      if (result.value) {
        try {
          await delete_emotion(emotion_id)
          const updatedData = data.filter(emotion => emotion.id !== emotion_id);
          setData(updatedData)
          Swal.fire({
            title: 'Deleted Succesfully',
            icon: 'success',
            timer: 1000
          })
        } catch (err) {
          Swal.fire({
            title: 'Not deleted',
            text: err.response.data.detail,
            icon: 'error',
            timer: 1000
          })
        }
      }
  }

  return (
    <Fragment>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Emotion</TableHead>
              <TableHead>Color</TableHead>
              <TableHead style={{textAlign: 'center'}}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell><ColorPicker color={item.color}/></TableCell>
                <TableCell style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <Button variant='outline' size='icon' className='p-0'>
                    <EditIcon className="h-4 w-4"/>
                  </Button>
                  <Button onClick={() => toggleDelete(item.id)} variant='outline' size='icon' className='p-0'>
                    <TrashIcon className="h-4 w-4"/>
                  </Button>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button style={{width: '100%'}} onClick={() => setOpen(true)}>Añadir una nueva emocion +</Button>
      </div>
      <AddEmotion open={open} setOpen={setOpen} addEmotion={addEmotion}></AddEmotion>
    </Fragment>
  )
}

export default EmotionsList
