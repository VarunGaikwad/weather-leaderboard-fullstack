import WeatherCard from './components/WeatherCard'
import { useEffect, useState } from 'react'
import { _fetchAllInfo } from './external/externalCalls'
import AddMyCity from './components/AddMyCity'

export default function App() {
    const [cards, setCards] = useState([]),
        [position, setPosition] = useState({}),
        [myPositonIndex, setMyPositionIndex] = useState(-1),
        [utcEpoch, setUtcEpoch] = useState(new Date().getTime() + new Date().getTimezoneOffset() * 60000)

    useEffect(() => {
        const interval = setInterval(() => {
            setUtcEpoch((prev) => prev + 1000)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        _fetchAllInfo().then(setCards)
        navigator.geolocation.getCurrentPosition(setPosition)
    }, [])

    useEffect(() => {
        if (cards.length && position?.coords?.latitude) {
            const index = cards.findIndex(function ({ coord: { lat, lon } }) {
                return (
                    lat == Number(position.coords.latitude).toFixed(4) &&
                    lon == Number(position.coords.longitude).toFixed(4)
                )
            })
            setMyPositionIndex(index)
        }
    }, [cards, position])

    return (
        <div className="w-full p-3 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {cards.map((item, index) => (
                    <WeatherCard
                        isHighlighted={index === myPositonIndex}
                        position={position}
                        key={index}
                        {...item}
                        utcEpoch={utcEpoch}
                    />
                ))}
            </div>
            {myPositonIndex === -1 && <AddMyCity position={position} />}
        </div>
    )
}
