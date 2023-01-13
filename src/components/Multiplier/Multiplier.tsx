import { useEffect, useState } from 'react';
import classes from './Multiplier.module.scss';

const Multiplier = (props: {
    multiplier: number,
    back: 'blue' | 'red' | 'normal' | 'blur',
    xHeight?: number,
    numHeight?: number
}) => {
    const { multiplier, back, xHeight, numHeight } = props;
    const [Multies, setMulties] = useState<string[]>();
    useEffect(() => {
        splitNums(multiplier);
    }, [multiplier]);
    const splitNums = (num: number) => {
        if (num === 0) {
            setMulties(['0']);
            return;
        }
        const nums: string[] = [];
        while (num > 0) {
            const remainder = num % 10;
            nums.unshift(remainder.toString());
            num = Math.floor(num / 10);
        }
        setMulties(nums);
    }
    return (
        <section
            className={classes.root}
            style={{ backgroundImage: `${back === 'normal' ? '' : `url('./res/coin_flip/multiplier/${back}/coin_large.png')`}` }}>
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