import Spinner from '../Spinner/Spinner';
import Wheel from '../Wheel/Wheel';
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
            <Wheel
                wheelNumbers={wheelNumbers}
                backgroundColours={backgroundColours}
            />
            <Spinner
                segments={segments}
                segColors={segColors}
                winningSegment={null}
                onFinished={(winner: any) => onFinished(winner)}
                primaryColor="black"
                contrastColor="white"
                isOnlyOnce={false}
                size={300}
                upDuration={500}
                downDuration={800}
                fontFamily="Arial" />
        </div>
    );
}
