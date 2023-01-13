import { useEffect, useRef, useState } from 'react';
import Multiplier from '../Multiplier/Multiplier';
import classes from './TestField.module.scss';
import Wheel3D, { Wheel3DHandler } from '../Wheel3D/Wheel3D';

export function TestField() {
    const width = 150;
    // const segments = [
    //     "5X",
    //     "50X",
    //     "5X",
    //     "25X",
    //     "5X",
    //     "35X",
    //     "5X",
    //     "10X",
    //     "5X",
    //     "15X",
    // ];
    // const segColors = [
    //     "#EE4040",
    //     "#F0CF50",
    //     "#EE4040",
    //     "#F0CF50",
    //     "#EE4040",
    //     "#F0CF50",
    //     "#EE4040",
    //     "#F0CF50",
    //     "#EE4040",
    //     "#F0CF50",
    // ];
    // const wheelNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    // const backgroundColours = ["#ffff00", "#ffff00", "#ffff00", "#ffff00", "#005def", "#ffff00", "#ffff00", "#ffff00", "#ffff00", "#66ffff"];
    // const onFinished = (winner: any) => {
    //     console.log(winner);
    // };
    // const [num, setNum] = useState(0);
    // useEffect(() => {
    //     let t = setInterval(() => { setNum((num) => num + 1); }, 500);
    //     return () => {
    //         clearInterval(t);
    //     }
    // }, []);
    const [count, setCount] = useState(3);
    const refWheel3D = useRef<Wheel3DHandler>();

    return (
        <div className={classes.root}>
            {/* <Coin multiplier={num} color={'blue'} /> */}
            {/* <CssSpinWheel /> */}
            {/* <MoveCoin strs={['1', '2']} /> */}
            <Wheel3D childrenWidth={width} background={(<div style={{ height: '100%', width: '100%', backgroundColor: 'brown' }} />)} ref={refWheel3D}>
                {Array.from({ length: 10 }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className={classes.wheel_item}
                            style={{ height: `${width}px`, width: `${width}px` }}
                        >
                            <Multiplier key={i} back='normal' multiplier={i} />
                        </div>
                    );
                })}
            </Wheel3D>
            <button onClick={() => {
                refWheel3D.current?.spin(count, 3, 2, 4);
                setCount(d => d + 1);
            }} style={{ width: '200px', height: '200px', backgroundColor: 'yellow' }}>start</button>
        </div>
    );
}
