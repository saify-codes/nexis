import Lottie from 'lottie-react';
import animationData from '@/lottie/cat.json'
import { useEffect, useState } from 'react';

export default function cat() {

    const [isVisible, setVisibility] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setVisibility(true)
        }, 200)
    })

    return <div className='fixed inset-0 flex items-center justify-center'>
        {isVisible && <Lottie className='w-96 h-96' animationData={animationData} loop={true} />}
    </div>
}
