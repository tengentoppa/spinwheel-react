import { useEffect, useRef, useState } from 'react';
import Multiplier from '../Multiplier/Multiplier';
import classes from './OnScreenFullTest.module.scss';
import Wheel3D, { Wheel3DHandler } from '../Wheel3D/Wheel3D';

export function OnScreenFullTest() {
    const width = 200;
    const [count, setCount] = useState(3);
    const [step, setStep] = useState(3);
    const [showWheel, setShowWheel] = useState(false);
    const [showCoin1, setShowCoin1] = useState(false);
    const [showCoin2, setShowCoin2] = useState(false);
    const [coinValue1, setCoinValue1] = useState(0);
    const [coinValue2, setCoinValue2] = useState(0);
    const [bannerImg, setBannerImg] = useState<string | undefined>();
    const [animateRunning, setAnimateRunning] = useState(false);
    const [countdownRunning, setCountdownRunning] = useState(false);
    const [countdown, setCountdown] = useState<number>(0);
    const refWheel3D = useRef<Wheel3DHandler>(null);
    useEffect(() => {
        if (!countdownRunning) {
            return () => { }
        }
        const t = setInterval(() => {
            setCountdown(d => {
                if (d <= 1) {
                    setCountdownRunning(false);
                    setAnimateRunning(false);
                    setBannerImg('timetoflip');
                    return 0;
                }
                return d! - 1;
            });
        }, 1000);

        return () => {
            console.log('clear')
            clearInterval(t);
        }
    }, [countdownRunning])


    const steps: (() => void)[] = [
        () => {
            setShowWheel(false);
            setBannerImg('game icon');
        },
        () => {
            setShowWheel(true);
            setBannerImg('readytoplay');
        },
        () => {
            setAnimateRunning(true);
            const coinValue = count + 1;
            setCount(coinValue);
            setCoinValue1(coinValue);
            refWheel3D.current?.spin(coinValue, 1, 2, 5);
        },
        () => {
            setShowCoin1(true);
            setShowWheel(false);
        },
        () => {
            setShowCoin1(false);
            setShowWheel(true);
        },
        () => {
            setAnimateRunning(true);
            const coinValue = count + 1;
            setCount(coinValue);
            setCoinValue2(coinValue);
            refWheel3D.current?.spin(coinValue, 1, 2, 5);
        },
        () => {
            setShowCoin2(true);
            setShowWheel(false);
        },
        () => {
            setShowCoin2(false);
        },
        () => {
            setCountdown(3);
            setCountdownRunning(true);
            setAnimateRunning(true);
        },

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
            {<img
                className={`${classes.banner} ${bannerImg ? '' : classes.hidden}`}
                alt='banner'
                src={`/res/coin_flip/banner/${bannerImg}.png`} />}
            <div className={classes.wheel_container} >
                <div className={`${showWheel ? '' : classes.hide}`}>
                    <Wheel3D
                        ref={refWheel3D}
                        onSpinEnd={() => { setAnimateRunning(false); }}
                        childrenWidth={width}
                        background={(<div style={{ height: '100%', width: '100%', backgroundColor: 'brown' }} />)}>
                        {Array.from({ length: 25 }, (_, i) => i).map((_, i) => {
                            return (
                                <div
                                    key={i}
                                    className={classes.wheel_item}
                                    style={{ height: `${width}px`, width: `${width}px` }}
                                >
                                    <Multiplier key={i} back='normal' backSize='screen' multiplier={i} />
                                </div>
                            );
                        })}
                    </Wheel3D>
                </div>
                <div className={`${classes.coin} ${classes.center} ${showCoin1 ? '' : classes.hide}`}><Multiplier back='blue' backSize='screen' multiplier={coinValue1} /></div>
                <div className={`${classes.coin} ${classes.center} ${showCoin2 ? '' : classes.hide}`}><Multiplier back='red' backSize='screen' multiplier={coinValue2} /></div>
                <img
                    className={`${classes.countdown} ${classes.center} ${countdown ?? 0 > 0 ? '' : classes.hide}`}
                    alt='countdown'
                    src={`/res/coin_flip/countdown/${countdown}.png`} />
            </div>
            <button onClick={controllStep} style={{ width: '200px', height: '100px', fontSize: '30px', backgroundColor: 'yellow' }}>next step</button>
        </div>
    );
}
