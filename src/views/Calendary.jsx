import { useCallback, useState, useEffect, useMemo } from "react";
import Matrix from "../matrix";
import AddMood from "@/components/add-mood";
import { Button } from "@/components/ui/button";

//simula data obtenida de una api

const mockData = [
  {date: "2024-01-01",
  color: "#09f09f",},
  {date: "2024-01-02",
  color: "#09f09f",},
  {date: "2024-01-03",
  color: "#09f09f",},
  {date: "2024-01-04",
  color: "#09f09f",},
]

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
 
  const getData = useCallback(async () => {
    //fake api call
    const data_api = mockData
    const body = multiFill(initialMatrix, data_api)
    setMatrix(body);
  }, [initialMatrix])

  useEffect(() => {
    //simula el fetch de la api al montar el componente
    getData()
  
  }, [getData, initialMatrix]) 


  const addMood = useCallback(
    async (data) => {
      //simula cargar a la base de datos
      mockData.push(data)
      // finally actualiza el calendario y cierra el modal
      getData()
      setOpen(false)
    },
    [getData]
  );

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
            disabled={typeof axisX === "object"}
            className="w-9 h-9 border rounded-none"
            variant={"outline"}
            onClick={() => {
              
             setOpen(true)
           
              setRow({indexX, indexY, axisX})}
            }
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
