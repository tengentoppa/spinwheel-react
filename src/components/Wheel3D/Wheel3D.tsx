import { CSSProperties, useState } from 'react';
import classes from './Wheel3D.module.scss';

const Wheel3D = (props: {
}) => {
    const len = 20;
    const diameter = 1000;

    const data = Array.from({ length: len }, (x, i) => i);
    const radius = diameter / 2;
    const angle = 360 / len;
    const circumference = Math.PI * diameter;
    const width = circumference / len;

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
        setSpinning(true);
        let targetAngle = getTargetAngle(count);
        setCount(d => d + 1);
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
        })
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
                {data.map((_, i) => {
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
                            <span>Item {i}</span>
                        </div>
                    );
                })}
            </div>
            <button onClick={onClickStart} style={{ width: '200px', height: '200px', backgroundColor: 'yellow' }}></button>
        </section >
    )
}
export default Wheel3D;