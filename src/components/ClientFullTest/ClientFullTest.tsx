import { useEffect, useRef, useState } from 'react';
import Multiplier from '../Multiplier/Multiplier';
import classes from './ClientFullTest.module.scss';
import Wheel3D, { Wheel3DHandler } from '../Wheel3D/Wheel3D';

export function ClientFullTest() {
    const width = 200;
    const [step, setStep] = useState(3);
    const [showCoin1, setShowCoin1] = useState(false);
    const [showCoin2, setShowCoin2] = useState(false);
    const [coinValue1, setCoinValue1] = useState(0);
    const [coinValue2, setCoinValue2] = useState(0);
    const [animateRunning, setAnimateRunning] = useState(false);


    const steps: (() => void)[] = [

    ]
    const controllStep = () => {
        if (animateRunning) {
            return;
        }
        let s = step + 1;
        if (s >= steps.length) {
            s = 0;
        }
        steps[s]();
        console.log(`step ${s}`);
        setStep(s);
    }

    return (
        <div className={classes.root}>
            <button onClick={controllStep} style={{ width: '200px', height: '100px', fontSize: '30px', backgroundColor: 'yellow' }}>next step</button>
        </div>
    );
}
