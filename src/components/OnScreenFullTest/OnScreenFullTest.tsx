import { ReactElement, useRef, useState } from 'react';
import Multiplier from '../Multiplier/Multiplier';
import classes from './OnScreenFullTest.module.scss';
import Wheel3D, { Wheel3DHandler } from '../Wheel3D/Wheel3D';

export function OnScreenFullTest() {
    const width = 200;
    const [count, setCount] = useState(3);
    const [step, setStep] = useState(0);
    const [showWheel, setShowWheel] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const refWheel3D = useRef<Wheel3DHandler>();
    const controllStep = () => {
        if (spinning) {
            return;
        }
        let s = step + 1;
        if (s > 5) {
            s = 0;
        }
        console.log(`step ${s}`);
        switch (s) {
            case 0:
                setShowWheel(false);
                break;
            case 1:
                setShowWheel(true);
                break;
            case 2:
                setCount(d => d + 1);
                refWheel3D.current?.spin(count, 3, 2, 5);
                break;
        }

        setStep(s);
    }
    const getBanner = (step: number): ReactElement => {
        let imgName;
        switch (step) {
            case 0:
                return (<div>Game Icon</div>);
            case 1:
            case 2:
                imgName = 'readytoplay';
                break;
            case 3:
                imgName = 'timetoflip';
                break;
        }
        return (<img className={classes.banner} alt='banner' src={`/res/coin_flip/banner/${imgName}.png`} />);
    }

    return (
        <div className={classes.root}>
            {getBanner(step)}
            <Wheel3D
                ref={refWheel3D}
                style={{
                    width: '100%',
                    opacity: showWheel ? 1 : 0
                }}
                childrenWidth={width}
                background={(<div style={{ height: '100%', width: '100%', backgroundColor: 'brown' }} />)}>
                {Array.from({ length: 25 }, (_, i) => i).map((_, i) => {
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
            <button onClick={controllStep} style={{ width: '200px', height: '200px', backgroundColor: 'yellow' }}>start</button>
        </div>
    );
}
