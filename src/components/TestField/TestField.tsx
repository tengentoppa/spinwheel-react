import { useEffect, useState } from 'react';
import Coin from '../Coin/Coin';
import CssSpinWheel from '../CssSpinWheel/CssSpinWheel';
import MoveCoin from '../MoveCoin/MoveCoin';
import Spinner from '../Spinner/Spinner';
import Wheel from '../Wheel/Wheel';
import classes from './TestField.module.scss';
import Wheel3D from '../Wheel3D/Wheel3D';

export function TestField() {
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
    }, [])

    return (
        <div className={classes.root}>
            {/* <Coin multiplier={num} color={'blue'} /> */}
            {/* <CssSpinWheel /> */}
            {/* <MoveCoin strs={['1', '2']} /> */}
            <Wheel3D />
        </div>
    );
}
