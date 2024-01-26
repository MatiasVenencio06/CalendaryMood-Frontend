import { useCallback, useState, useEffect, useMemo } from "react";
import Matrix from "../matrix";



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
    console.log(x, y)
  })
  return matrix.print()
}



function Calendary() {
  const initialMatrix = useMemo(() => new Matrix({ x: 12, y: 32 }), [] ) 

  const [matrix, setMatrix] = useState([]);

  useEffect(() => {

    const body = multiFill(initialMatrix, mockData)
    setMatrix(body);
  }, [initialMatrix]) 

  function cantDays(year, month) {
    month--;
    const monthDay = new Date(year, month + 1, 0);
    return monthDay.getDate();
  }
  const onClick = useCallback(
    (indexX, indexY) => {
      console.log(indexX+1, indexY + 1)
      const newMatrix = new Matrix()
        .create(matrix)
        .fill({ x: indexX + 1, y: indexY + 1 }, { color: "#09f09f" });
      const body = newMatrix.print();
      setMatrix(body);
      //get real date 
      const date = new Date(2024, indexX, indexY).toISOString().slice(0, 10);
      console.log(date);
    },
    [matrix]
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
            <p
              key={`cell-${indexX}-${indexY}`}
              onClick={() => onClick(indexX, indexY)}
              className="w-9 h-9 border"
              style={{ backgroundColor: axisX?.color }}
            >
              
            </p>
          ) : (
            <p
              key={`empty-${indexX}-${indexY}`}
              className="w-9 h-9 border bg-slate-300"
            ></p>
          );
        }
      }),
    [onClick]
  );

  const CalendaryMap = useCallback(
    () =>
      matrix.map((axisY, indexY) => {
        return (
          <div key={`row-${indexY}`} className="flex flex-row">
            <p className="w-9 h-9 border text-center flex justify-center items-center">
              {indexY}
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
      <div className="flex flex-col">
        <CalendaryMap />
      </div>
    </>
  );
}

export default Calendary;
