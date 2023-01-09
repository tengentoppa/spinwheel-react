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

    return (
        <section className={classes.wheel}>
            <div className={classes.wheel_inner}>
                {data.map((d, i) => {
                    return (
                        <div
                            key={i}
                            className={classes.wheel_segment}
                            style={{
                                transform: `rotateY(${angle * i}deg) translateZ(${radius}px)`,
                                width: `${width}px`,
                                marginLeft: `-${width/2}px`
                            }}
                        >
                            <span>Item {i}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
export default Wheel3D;