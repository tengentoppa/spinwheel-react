import Spinner from '../Spinner';
import Wheel from '../Wheel';
import classes from './TestField.module.scss';

export function TestField() {
    const segments = [
        "5X",
        "50X",
        "5X",
        "25X",
        "5X",
        "35X",
        "5X",
        "10X",
        "5X",
        "15X",
    ];
    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
        "#EE4040",
        "#F0CF50",
    ];
    const wheelNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const backgroundColours = ["#ffff00", "#ffff00", "#ffff00", "#ffff00", "#005def", "#ffff00", "#ffff00", "#ffff00", "#ffff00", "#66ffff"];
    const onFinished = (winner: any) => {
        console.log(winner);
    };

    return (
        <div className={classes.root}>
        </div>
    );
}
