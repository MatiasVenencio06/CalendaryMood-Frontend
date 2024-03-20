import { useCallback, useState, useEffect, useMemo } from "react";
import Matrix from "../matrix";
import AddMood from "@/components/add-mood";
import { Button } from "@/components/ui/button";
import { add_mood, resume_mood } from "@/services/moods";
import { useToast } from "@/components/ui/use-toast";

const multiFill = (matrix, mockData) => {
  matrix.solid()
  mockData.map(({date, color}) => {
    const [, x, y] = date.split('-')
    matrix.fill({x: Number(x), y: Number(y) +1}, {color})
  })
  return matrix.print()
}

function cantDays(year, month) {
  month--;
  const monthDay = new Date(year, month + 1, 0);
  return monthDay.getDate();
}

function Calendary() {
  const initialMatrix = useMemo(() => new Matrix({ x: 12, y: 32 }), [] ) 

  const [matrix, setMatrix] = useState([]);
  const [row, setRow] = useState({indexX: 0, indexY: 0, axisX: null});
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [todayDate, setTodayDate] = useState()
  const [cellClicked, setCellClicked] = useState(false)
  const [dateOnClick, setDateOnClick] = useState()
 
  const { toast } = useToast()

  const getData = useCallback(async () => {
    const data_api = await resume_mood()
    const body = multiFill(initialMatrix, data_api.data)
    setMatrix(body);
  }, [initialMatrix])
  
  useEffect(() => {
    getData()
    setTodayDate(new Date().toISOString().slice(0, 10))
  }, [getData, initialMatrix]) 
  
  useEffect(() => {
    setSelectedDate(new Date(2024, row.indexX, row.indexY).toISOString().slice(0, 10))
  }, [row])

  useEffect(() => {
    if (cellClicked) { 
      setDateOnClick(selectedDate === todayDate ? 
        setOpen(true) :
        toast({
          variant: "destructive",
          title: "Ups!!, Algo salio mal",
          description: "Asegúrate de seleccionar solo la fecha del día de hoy",
        }))
      }
  }, [selectedDate])

  const addMood = useCallback(
    async (data) => {
      try {
        add_mood(data)
      } catch {

      }
      getData()
      setOpen(false)
    },
    [getData]
  );

  const openDetail = () => {
    return alert('detalle')
  }

  const CalendaryCell = useCallback(
    ({ axisY, indexY }) =>
      axisY.map(([axisX], indexX) => {
        if (indexY === 0) {
          return (
            <p
              key={`header-${indexX}`}
              className="w-9 h-9 border capitalize text-center flex items-center justify-center"
            >
              {new Date(2024, indexX + 1, 0).toLocaleDateString("ES-AR", {
                month: "short",
              })}
            </p>
          );
        } else {
          return cantDays(2024, indexX + 1) >= indexY ? (
            <Button
            key={`cell-${indexX}-${indexY}`}
            className="w-9 h-9 border rounded-none"
            variant={"outline"}
            onClick={() => {
              if (typeof axisX === 'object') {
                openDetail()
              } else {
                setCellClicked(true), dateOnClick, setRow({indexX, indexY, axisX})
              }
            }}
            style={{ backgroundColor: axisX?.color }}
            />
           
          ) : (
            <p
              key={`empty-${indexX}-${indexY}`}
              className="w-9 h-9 border bg-slate-300"
            ></p>
          );
        }
      }),
    []
  );

  const CalendaryMap = useCallback(
    () =>
      matrix.map((axisY, indexY) => {
        return (
          <div key={`row-${indexY}`} className="flex flex-row">
            <p className="w-9 h-9 border text-center flex justify-center items-center">
              {indexY !== 0 && indexY}
            </p>
            <div className="flex flex-row">
              <CalendaryCell axisY={axisY} indexY={indexY} />
            </div>
          </div>
        );
      }),
    [matrix]
  );

  return (
    <>
      <div className="flex flex-1 flex-col">
        <CalendaryMap />
       <AddMood  axisX={row.axisX} indexX={row.indexX} indexY={row.indexY} addMood={addMood} open={open} setOpen={setOpen}/>
      </div>
    </>
  );
}

export default Calendary;
