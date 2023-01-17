import { CSSProperties, AnimationEvent, ReactElement, forwardRef, useImperativeHandle, useState, Ref } from 'react';
import classes from './Wheel3D.module.scss';

export type Wheel3DHandler = {
    spin: (
        /**The chosen target what are you want */
        targetIndex: number,
        /**Elapsed seconds */
        time?: number,
        /**Base round, must greater than or equal 0 */
        minRound?: number,
        /**Max round, must greater than or equal minRound */
        maxRound?: number,
        /**See animation-timing-function in w3 css */
        timeFunc?: string
    ) => void;
};

export interface Wheel3DProps {
    /**The width of every cell is different from the children's width */
    childrenWidth: number;
    /**Wheel contents */
    children: ReactElement[];
    /**Wheel background */
    background: ReactElement;
    /**Handle event on wheel stop */
    onSpinEnd?: () => void;
}

const Wheel3D = forwardRef(
    ({ childrenWidth, children, background, onSpinEnd }: Wheel3DProps, ref: Ref<Wheel3DHandler>) => {
        const [spinning, setSpinning] = useState(false);
        const [blurStyle, setBlurStyle] = useState<CSSProperties>();
        const [wheelStyle, setWheelStyle] = useState<CSSProperties>();
        const [backStyle, setBackStyle] = useState<CSSProperties>();
        const [currentAngle, setCurrentAngle] = useState(0);
        const [styleSheet] = useState(() => {
            const styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
            return styleElement.sheet;
        });

        const len = children.length;
        const angle = 360 / len;
        const radius = childrenWidth / 2 / Math.tan(Math.PI / len);

        const spin = (targetIndex: number, time: number, minRound: number, maxRound: number, timeFunc: string) => {
            if (spinning) {
                return;
            }
            if (minRound < 0 || maxRound < minRound) {
                throw new Error('minRound or maxRound error');
            }
            setSpinning(true);
            const targetAngle = getTargetAngle(targetIndex, minRound, maxRound);
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
        }`;
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
        };

        //#region private methods
        const spinStopped = (props: AnimationEvent<HTMLDivElement>) => {
            if (props.animationName !== 'spin') {
                return;
            }
            onSpinEnd && onSpinEnd();
            setBlurStyle(undefined);
            setWheelStyle({ transform: `rotateY(${currentAngle}deg)` });
            setBackStyle({ transform: `rotateY(${-currentAngle}deg)` });
            // insert css rule twice, so remove twice
            removeAnimation();
            removeAnimation();
            setSpinning(false);
        };
        const addAnimation = (style: string) => {
            styleSheet?.insertRule(style, styleSheet.cssRules.length);
        };
        const removeAnimation = () => {
            styleSheet?.deleteRule(styleSheet.cssRules.length - 1);
        };
        const getTargetAngle = (targetIndex: number, minRound: number, maxRound: number) => {
            const targetAngle = targetIndex * angle + (Math.floor(Math.random() * (maxRound - minRound)) + minRound) * 360;
            return -targetAngle;
        };
        //#endregion

        useImperativeHandle(ref, () => ({
            spin(targetIndex: number, time = 3, minRound = 3, maxRound = 5, timeFunc = 'cubic-bezier(.21,.01,.74,1.02)') {
                spin(targetIndex, time, minRound, maxRound, timeFunc);
            }
        }));

        return (
            <section className={classes.wheel}>
                <div className={`${classes.wheel_inner}`} style={wheelStyle} onAnimationEnd={spinStopped}>
                    <div className={classes.background} style={backStyle}>
                        {background}
                    </div>
                    {children.map((d, i) => {
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
                    })}
                </div>
            </section>
        );
    }
);

export default Wheel3D;