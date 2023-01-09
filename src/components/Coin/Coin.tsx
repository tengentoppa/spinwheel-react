import { useEffect, useState } from 'react';
import classes from './Coin.module.scss';

const Coin = (props: {
    multiplier: number,
    color: 'blue' | 'red',
}) => {
    const { multiplier, color } = props;
    const [Multies, setMulties] = useState<string[]>();
    useEffect(() => {
        bar(multiplier);
    }, [multiplier]);
    const bar = (num: number) => {
        let tmp = [];
        while (num > 0) {
            const remainder = num % 10;
            tmp.unshift(remainder.toString());
            num = Math.floor(num / 10);
        }
        setMulties(tmp);
    }
    return (
        <section className={classes.root} style={{ backgroundImage: `url('./res/coin_flip/coin_${color}/coin_large.png')` }}>
            <img className={`${classes.coin_x}`} src={`/res/coin_flip/coin_${color}/x.png`} />
            {Multies?.map(d => {
                return (
                    <img className={`${classes.coin_num}`} src={`/res/coin_flip/coin_${color}/${d}.png`} />
                );
            })}
        </section>
    )
}
export default Coin;