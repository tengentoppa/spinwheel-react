import { CSSProperties, AnimationEvent, ReactElement, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import classes from './Wheel3D.module.scss';

export type Wheel3DHandler = {
    spin: (
        targetIndex: number,
        minRound?: number,
        maxRound?: number,
        timeFunc?: string) => void;
};
const Wheel3D = forwardRef((props: {
    width: number,
    time: number,
    children: ReactElement[],
}, ref) => {
    useImperativeHandle(
        ref,
        (): Wheel3DHandler => ({
            spin(targetIndex: number,
                minRound?: number,
                maxRound?: number,
                timeFunc?: string) {
                spin(
                    targetIndex,
                    minRound ?? 3,
                    maxRound ?? 5,
                    timeFunc ?? 'cubic-bezier(.51, 0, .1, 1.06)',
                );
            }
        })
    )
    const { width, time, children } = props;

    const [angle, setAngle] = useState<number>(() => 360 / children.length);
    const [radius, setRadius] = useState<number>(() => width / 2 / Math.tan(Math.PI / children.length));
    const [spinning, setSpinning] = useState(false);
    const [blurStyle, setBlurStyle] = useState<CSSProperties>();
    const [wheelStyle, setWheelStyle] = useState<CSSProperties>();
    const [backStyle, setBackStyle] = useState<CSSProperties>();
    const [currentAngle, setCurrentAngle] = useState(0);
    const [eles, setEles] = useState<JSX.Element[]>();
    const [styleSheet] = useState(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        return styleElement.sheet;
    });

    useEffect(() => {
        const getEles = (children: ReactElement[]) => {
            return (children.map((d, i) => {
                const width: string = d.props.style.width;
                const trueWidth = Number(width.replace('px', ''));
                return (
                    <div
                        key={i}
                        className={classes.wheel_segment}
                        style={{
                            transform: `rotateY(${angle * i}deg) translateZ(${radius}px)`,
                            marginLeft: `-${trueWidth / 2}px`,
                            ...blurStyle
                        }}
                    >
                        {d}
                    </div>
                );
            }));
        }
        const len = children.length;
        const angle = 360 / len;
        const r = width / 2 / Math.tan(Math.PI / len);
        setEles(getEles(children));
        setAngle(angle);
        setRadius(r);
    }, [width, ...props.children.map(d => d.key), blurStyle]);
    const spin = (
        targetIndex: number,
        minRound: number,
        maxRound: number,
        timeFunc: string) => {
        if (spinning) {
            return;
        }
        if (minRound < 0 || maxRound < minRound) {
            throw 'minRound or maxRound error';
        }
        setSpinning(true);
        let targetAngle = getTargetAngle(targetIndex, minRound, maxRound);
        const animateSpin = `
        @keyframes spin {
            0% {
                transform: rotateY(${currentAngle}deg);
            }
            
            100% {
                transform: rotateY(${targetAngle}deg);
            }
        }
        `;
        const animateBack = `
        @keyframes back {
            0% {
                transform: rotateY(${-currentAngle}deg);
            }
            
            100% {
                transform: rotateY(${-targetAngle}deg);
            }
        }`
        addAnimation(animateSpin);
        addAnimation(animateBack);
        setCurrentAngle(targetAngle % 360);
        setBlurStyle({ animation: `${classes.blur_filter} ${time}s ${timeFunc}` });
        setWheelStyle({
            animation: `spin ${time}s ${timeFunc}`,
            transform: `rotateY(${targetAngle}deg)`
        });
        setBackStyle({
            animation: `back ${time}s ${timeFunc}`,
            transform: `rotateY(${-targetAngle}deg)`
        });
    }

    //#region private methods
    const spinStopped = (props: AnimationEvent<HTMLDivElement>) => {
        if (props.animationName != 'spin') {
            return;
        }
        setBlurStyle(undefined);
        setWheelStyle({ transform: `rotateY(${currentAngle}deg)` });
        setBackStyle({ transform: `rotateY(${-currentAngle}deg)` });
        // insert css rule twice, so remove twice
        removeAnimation();
        removeAnimation();
        setSpinning(false);
    }
    const addAnimation = (style: string) => {
        styleSheet?.insertRule(style, styleSheet.cssRules.length);
    }
    const removeAnimation = () => {
        styleSheet?.deleteRule(styleSheet.cssRules.length - 1);
    }
    const getTargetAngle = (
        targetIndex: number,
        minRound: number,
        maxRound: number) => {
        const targetAngle = targetIndex * angle + (Math.floor(Math.random() * (maxRound - minRound)) + minRound) * 360;
        return -targetAngle;
    }
    //#endregion

    return (
        <section className={classes.wheel}>
            <div
                className={`${classes.wheel_inner}`}
                style={wheelStyle}
                onAnimationEnd={spinStopped}>
                <div className={classes.background} style={backStyle}></div>
                <div style={{
                    backgroundColor: 'red',
                    width: `${width}px`,
                    height: '10px',
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                }} />
                {eles}
            </div>
        </section >
    )
});
export default Wheel3D;