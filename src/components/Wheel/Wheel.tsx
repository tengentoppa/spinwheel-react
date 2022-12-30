import { useEffect, useState } from 'react'

const Wheel = (props: {
    wheelNumbers: string[],
    backgroundColours: string[]
}) => {
    const { wheelNumbers, backgroundColours } = props;
    const startAngle = Math.PI;
    const arc = Math.PI / (wheelNumbers.length / 2);
    const outsideRadius = 150;
    const insideRadius = 120;
    const textRadius = 160;
    const size = 180;

    useEffect(() => {
        drawWheel();
    }, [])

    const drawWheel = () => {
        let ctx;
        const canvas = document.getElementById("abc") as HTMLCanvasElement;

        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;

        if (canvas.getContext) {

            ctx = canvas.getContext("2d")!;
            //ctx.clearRect(0,0,400,400);

            //ctx.strokeStyle = "black";
            ctx.lineWidth = 0.8;

            ctx.font = 'bold 12px Helvetica, Arial';

            for (let i = 0; i < wheelNumbers.length; i++) {
                const angle = startAngle + i * arc;
                ctx.fillStyle = backgroundColours[i];

                ctx.beginPath();
                ctx.arc(size, size, outsideRadius, angle, angle + arc, false);
                ctx.arc(size, size, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                //
                ctx.save();
                //ctx.shadowOffsetX = -1;
                //ctx.shadowOffsetY = -1;
                //ctx.shadowBlur    = 0;
                //ctx.shadowColor   = "rgb(220,220,220)";
                //'#005def'
                ctx.fillStyle = '#444';

                ctx.translate(size + Math.cos(angle + arc / 2) * textRadius, size + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                const text = wheelNumbers[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();// restore goes here
            }
        }
    }
    return (
        <div id='test'>
            <canvas
                id='abc'
                width={size * 2}
                height={size * 2}
            />
        </div>
    )
}
export default Wheel;