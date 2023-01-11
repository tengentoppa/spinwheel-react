import { useEffect, useState } from 'react';
import classes from './Multiplier.module.scss';

const Multiplier = (props: {
    multiplier: number,
    back: 'blue' | 'red' | 'normal' | 'blur',
}) => {
    const { multiplier, back: color } = props;
    const [Multies, setMulties] = useState<string[]>();
    useEffect(() => {
        splitNums(multiplier);
    }, [multiplier]);
    const splitNums = (num: number) => {
        if (num == 0) {
            setMulties(['0']);
            return;
        }
        let tmp: string[] = [];
        while (num > 0) {
            const remainder = num % 10;
            tmp.unshift(remainder.toString());
            num = Math.floor(num / 10);
        }
        setMulties(tmp);
    }
    return (
        <section className={classes.root} style={{ backgroundImage: `${color == 'normal' ? '' : `url('./res/coin_flip/multiplier/${color}/coin_large.png')`}` }}>
            <img className={`${classes.coin_x}`} src={`/res/coin_flip/multiplier/${color}/x.png`} />
            {Multies?.map(d => {
                return (
                    <img className={`${classes.coin_num}`} src={`/res/coin_flip/multiplier/${color}/${d}.png`} />
                );
            })}
        </section>
    )
}
export default Multiplier;