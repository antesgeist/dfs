import { useState, useEffect } from 'react'

export const useToggle = (toggleRef, initialState) => {
    const [toggle, setToggle] = useState(initialState)

    useEffect(() => {
        const clickOutside = e => {
            if (!toggleRef.current.contains(e.target)) {
                setToggle(!toggle)
            }
        }

        if (toggle) {
            document.addEventListener('mousedown', clickOutside)
        } else {
            document.removeEventListener('mousedown', clickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [toggle, toggleRef])

    return [toggle, setToggle]
}
