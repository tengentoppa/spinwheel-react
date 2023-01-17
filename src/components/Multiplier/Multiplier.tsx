import { useEffect, useState } from 'react';
import classes from './Multiplier.module.scss';

const Multiplier = (props: {
    multiplier: number,
    back: 'blue' | 'red' | 'normal' | 'blur',
    backSize: 'screen' | 'large' | 'small'
    xHeight?: number,
    numHeight?: number
}) => {
    const { multiplier, back, backSize, xHeight, numHeight } = props;
    const [Multies, setMulties] = useState<string[]>();
    useEffect(() => {
        setMulties(multiplier.toString().split(''));
    }, [multiplier]);
    return (
        <section
            className={classes.root}
            style={{ backgroundImage: `${back === 'normal' ? '' : `url('./res/coin_flip/multiplier/${back}/coin_${backSize}.png')`}` }}>
            <img
                alt={`mx`}
                className={`${classes.coin_x}`}
                style={{ height: `${xHeight ?? 50}px` }}
                src={`/res/coin_flip/multiplier/${back}/x.png`} />
            {Multies?.map((d, i) => {
                return (
                    <img
                        key={i}
                        alt={`m${d}`}
                        className={`${classes.coin_num}`}
                        style={{ height: `${numHeight ?? 70}px` }}
                        src={`/res/coin_flip/multiplier/${back}/${d}.png`} />
                );
            })}
        </section>
    )
}
export default Multiplier;