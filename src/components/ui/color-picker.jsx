import React, {useState} from 'react'
import { Input } from './input'

function ColorPicker({color = '#000000', isDisabled = true, withLabel = true}) {
    const [hexaColor, setHexaColor] = useState(color)
    
    return (
        <>
            <div className='shadow-xl rounded-xl ms-3 w-7 h-7 flex items-end justify-center' style={{boxShadow: `5px 5px 7px ${hexaColor}`}}>
                <Input name='color' disabled={isDisabled} id='color-picker' type='color' onChange={(e) => setHexaColor(e.target.value)} value={hexaColor} className='w-8 h-8 p-0 m-0 block bg-transparent shadow-late border-none [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:w-7 [&::-webkit-color-swatch]:h-7'></Input>
            </div>
            {withLabel ? <label htmlFor='color-picker'>{hexaColor}</label> : <></>}
        </>
    )
}

export default ColorPicker
