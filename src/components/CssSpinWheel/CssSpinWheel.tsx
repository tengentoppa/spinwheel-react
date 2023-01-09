import classes from './CssSpinWheel.module.scss';

const CssSpinWheel = (props: {
}) => {
    const data = [1, 2, 3, 4, 5];
    const vw = 100 / data.length;
    const elements = data.map(d =>
        <div className={`${classes.spine}`} style={{ width: `${vw}vw` }}>
            {d}
        </div>
    );
    return (
        <section className={classes.root}>
            <div className={`${classes.scroll} ${classes.first}`}>
                {elements}
            </div>
            <div className={`${classes.scroll} ${classes.second}`}>
                {elements}
            </div>
        </section>
    )
}
export default CssSpinWheel;