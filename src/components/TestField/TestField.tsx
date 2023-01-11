import { createRef, useEffect, useRef, useState } from 'react';
import Multiplier from '../Multiplier/Multiplier';
import CssSpinWheel from '../CssSpinWheel/CssSpinWheel';
import MoveCoin from '../MoveCoin/MoveCoin';
import Spinner from '../Spinner/Spinner';
import Wheel from '../Wheel/Wheel';
import classes from './TestField.module.scss';
import Wheel3D, { Wheel3DHandler } from '../Wheel3D/Wheel3D';

export function TestField() {
    const width = 200;
    const segments = [
        "5X",
        "50X",
        "5X",
        "25X",
        "5X",
        "35X",
        "5X",
        "10X",
        "5X",
        "15X",
    ];
    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
    ];
    const wheelNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const backgroundColours = ["#ffff00", "#ffff00", "#ffff00", "#ffff00", "#005def", "#ffff00", "#ffff00", "#ffff00", "#ffff00", "#66ffff"];
    const onFinished = (winner: any) => {
        console.log(winner);
    };
    const [num, setNum] = useState(0);
    useEffect(() => {
        let t = setInterval(() => { setNum((num) => num + 1); }, 500);
        return () => {
            clearInterval(t);
        }
    }, []);
    const refWheel3D = useRef<Wheel3DHandler>();

    return (
        <div className={classes.root}>
            {/* <Coin multiplier={num} color={'blue'} /> */}
            {/* <CssSpinWheel /> */}
            {/* <MoveCoin strs={['1', '2']} /> */}
            <Wheel3D width={width} time={5} ref={refWheel3D}>
                {Array.from({ length: 30 }, (_, i) => i).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className={classes.wheel_item}
                            style={{ height: `${width}px`, width: `${width}px` }}
                        >
                            <Multiplier back='normal' multiplier={i} />
                        </div>
                    );
                })}
            </Wheel3D>
            <button onClick={() => refWheel3D.current?.spin(5)} style={{ width: '200px', height: '200px', backgroundColor: 'yellow' }}></button>
        </div>
    );
}
