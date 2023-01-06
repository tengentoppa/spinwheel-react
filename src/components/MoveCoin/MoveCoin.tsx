import classes from './MoveCoin.module.scss';
import { useEffect, useState } from 'react';

const MoveCoin = (props: {
    strs: string[]
}) => {
    const { strs } = props;
    const [state, setState] = useState(1);
    useEffect(() => {
        const changeState = () => {
            setState(state => {
                let s = state + 1;
                if (state + 1 > 4) {
                    s = 0;
                }
                switch (s) {
                    case 0:
                        break;
                }
                return s;
            });
        }
        window.addEventListener('click', changeState);
        return () => {
            window.removeEventListener('click', changeState);
        }
    }, [])
    return (
        <section >
            <div
                className={`${classes.test} ${classes.a} ${state > 1 ? classes.toleft : ''}`}
                style={{ display: state > 0 ? 'block' : 'none' }}>
                {state + strs[0]}
            </div>
            <div
                className={`${classes.test} ${classes.b} ${state > 3 ? classes.toright : ''}`}
                style={{ display: state > 2 ? 'block' : 'none' }}>
                {state + strs[1]}
            </div>
        </section>
    )
}
export default MoveCoin;