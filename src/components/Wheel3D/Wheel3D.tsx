import { CSSProperties, ReactElement, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import classes from './Wheel3D.module.scss';

export type Wheel3DHandler = {
    spin: (targetIndex: number) => void;
};
const Wheel3D = forwardRef((props: {
    width: number,
    time: number,
    children: ReactElement[],
}, ref) => {
    useImperativeHandle(
        ref,
        (): Wheel3DHandler => ({
            spin(targetIndex: number) {
                spin(targetIndex);
            }
        })
    )
    const { width, time, children } = props;

    const timeFunc = 'cubic-bezier(.51, 0, .1, 1.06)';

    const [angle, setAngle] = useState<number>(() => 360 / children.length);
    const [radius, setRadius] = useState<number>(() => width / 2 / Math.tan(Math.PI / children.length));
    const [spinning, setSpinning] = useState(false);
    const [rootStyle, setRootStyle] = useState<CSSProperties>();
    const [wheelStyle, setWheelStyle] = useState<CSSProperties>();
    const [currentAngle, setCurrentAngle] = useState(0);
    const getEles = (children: ReactElement[]) => {
        return children.map((d, i) => {
            let width: string = d.props.style.width;
            let trueWidth = Number(width.replace('px', ''));
            return (
                <div
                    key={i}
                    className={classes.wheel_segment}
                    style={{
                        transform: `rotateY(${angle * i}deg) translateZ(${radius}px)`,
                        marginLeft: `-${trueWidth / 2}px`
                    }}
                >
                    {d}
                </div>
            );
        });
    }
    const [eles, setEles] = useState(() => getEles(children));
    const [styleSheet, _] = useState(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        return styleElement.sheet;
    });

    useEffect(() => {
        const len = children.length;
        const angle = 360 / len;
        const radius = width / 2 / Math.tan(Math.PI / len);
        setEles(getEles(children));
        setAngle(angle);
        setRadius(radius);
    }, [width, ...children.map(d => d.key)]);
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
        setRootStyle({ animation: `${classes.blur_filter} ${time}s ${timeFunc}` });
        setWheelStyle({
            animation: `spin ${time}s ${timeFunc}`,
            transform: `rotateY(${targetAngle}deg)`
        });
    }
    const stopSpin = () => {
        setRootStyle(undefined);
        setWheelStyle({ transform: `rotateY(${currentAngle}deg)` });
        removeAnimation();
        setSpinning(false);
    }

    //#region private methods
    const addAnimation = (style: string) => {
        styleSheet?.insertRule(style, styleSheet.cssRules.length);
    }
    const removeAnimation = () => {
        styleSheet?.deleteRule(styleSheet.cssRules.length - 1);
    }
    const getTargetAngle = (targetIndex: number) => {
        const targetAngle = targetIndex * angle;
        return -targetAngle;
    }
    //#endregion

    return (
        <section className={classes.wheel} style={rootStyle}>
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
                {eles}
            </div>
        </section >
    )
});
export default Wheel3D;