import { useEffect, useState } from 'react'
import SpineTest from '../SpineTest/SpineTest';

const CssSpinWheel = (props: {
}) => {
    return (
        <div>
            {
                [1, 2, 3, 4, 5].map(d => {
                    return (
                        <SpineTest key={d} />
                    )
                })
            }
        </div>
    )
}
export default CssSpinWheel;