import { CSSProperties, ReactElement, forwardRef, useEffect, useState } from 'react';
import classes from './Wheel3D.module.scss';

const Wheel3D = forwardRef((props: {
    width: number,
    children: ReactElement[]
}, ref) => {
    const { width, children } = props;

    const [angle, setAngle] = useState<number>(10);
    const [radius, setRadius] = useState<number>();
    useEffect(() => {
        const len = children.length;
        const angle = 360 / len;
        const radius = width / 2 / Math.tan(Math.PI / len);
        setAngle(angle);
        setRadius(radius);
    }, [width, children])


    const [spinning, setSpinning] = useState(false);
    const [wheelStyle, setWheelStyle] = useState<CSSProperties>();
    const [currentAngle, setCurrentAngle] = useState(0);
    const [count, setCount] = useState(1);
    const [styleSheet, _] = useState(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        return styleElement.sheet;
    });
    const addAnimation = (style: string) => {
        styleSheet?.insertRule(style, styleSheet.cssRules.length);
    }

    const onClickStart = () => {
        if (spinning) {
            return;
        }
        spin(count);
        setCount(d => d + 1);
    }
    const spin = (targetIndex: number) => {
        if (spinning) {
            return;
        }
        setSpinning(true);
        let targetAngle = getTargetAngle(targetIndex);
        const animate = `
        @keyframes spin {
            0% {
                transform: rotateY(${currentAngle}deg);
            }
            
            100% {
                transform: rotateY(${targetAngle}deg);
            }
        }
        `;
        addAnimation(animate);
        setCurrentAngle(targetAngle % 360);
        setWheelStyle({
            animation: `spin 1s cubic-bezier(.51, 0, .1, 1.06)`,
            transform: `rotateY(${currentAngle - angle}deg)`
        });
    }
    const stopSpin = () => {
        setWheelStyle({
            transform: `rotateY(${currentAngle}deg)`
        });
        setSpinning(false);
    }
    const getTargetAngle = (targetIndex: number) => {
        const targetAngle = targetIndex * angle;
        return -targetAngle;
    }

    return (
        <section className={classes.wheel}>
            <div
                className={`${classes.wheel_inner}`}
                style={wheelStyle}
                onAnimationEnd={stopSpin}>
                <div style={{
                    backgroundColor: 'red',
                    width: `${width}px`,
                    height: '10px',
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, 0)'
                }} />
                {children.map((d, i) => {
                    return (
                        <div
                            key={i}
                            className={classes.wheel_segment}
                            style={{
                                transform: `rotateY(${angle * i}deg) translateZ(${radius}px)`,
                                width: `${width}px`,
                                marginLeft: `-${width / 2}px`
                            }}
                        >
                            {d}
                        </div>
                    );
                })}
            </div>
            <button onClick={onClickStart} style={{ width: '200px', height: '200px', backgroundColor: 'yellow' }}></button>
        </section >
    )
})
export default Wheel3D;