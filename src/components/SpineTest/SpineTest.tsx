
// import { useSpine } from '@/hooks/useSpine';
// import { useEffect } from 'react';

// function SpineTest() {
//     const [spinRef, player] = useSpine({
//         jsonUrl: 'spine/Bigwin-megawin.json',
//         atlasUrl: 'spine/Bigwin-megawin.atlas',
//         animation: 'bigwin'
//     });

//     const onClick = () => {
//         if (!player) return;
//     }
//     useEffect(() => {
//         if (!player) return;
//         // do some thing you need
//         window.addEventListener('click', onClick);
//         return () => {
//             window.removeEventListener('click', onClick);
//         };
//     }, [player]);

//     return <div ref={spinRef}></div>;
// }

import { Spine, SpinePlayer } from '@/components/Spine';
import { useEffect, useRef } from 'react';

function SpineTest() {
    const playerRef = useRef<SpinePlayer>(null);

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;
        // do some thing you need
    }, []);

    return (
        <Spine
            jsonUrl='spine/Bigwin-megawin.json'
            atlasUrl='spine/Bigwin-megawin.atlas'
            animation='bigwin'
            ref={playerRef}
        />
    );
}

export default SpineTest;

