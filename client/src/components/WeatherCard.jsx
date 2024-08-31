import PropTypes from 'prop-types'

WeatherCard.propTypes = {
    coord: PropTypes.shape({
        lon: PropTypes.number,
        lat: PropTypes.number,
    }),
    main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number,
        temp_min: PropTypes.number,
        temp_max: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            main: PropTypes.string,
            description: PropTypes.string,
            _id: PropTypes.string,
        }),
    ),
    name: PropTypes.string,
    timezone: PropTypes.number,
    utcEpoch: PropTypes.number,
    position: PropTypes.shape({
        coords: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    }),
    isHighlighted: PropTypes.bool,
}

function _TemperatureColor(temp) {
    const minTemp = -30,
        maxTemp = 50,
        normalizedTemp = Math.max(minTemp, Math.min(maxTemp, temp)),
        percentage = (normalizedTemp - minTemp) / (maxTemp - minTemp),
        r = Math.floor(255 * percentage),
        g = Math.floor(100 * percentage),
        b = Math.floor(255 * (1 - percentage))

    return `rgb(${r}, ${g}, ${b})`
}

export default function WeatherCard({ isHighlighted, main, name, weather, timezone, utcEpoch }) {
    const time = new Date(utcEpoch + timezone * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }),
        cardStyle = {
            backgroundColor: isHighlighted ? 'bg-yellow-200 dark:bg-yellow-600' : _TemperatureColor(main.temp),
            color: isHighlighted ? 'text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100',
            border: isHighlighted ? '2px solid #FFD700' : 'none', // Optional border for highlighted
        }

    return (
        <div
            className={`p-4 text-sm rounded-md space-y-4 ${cardStyle.backgroundColor} ${cardStyle.color} shadow-md transition-colors duration-300`}
            style={cardStyle}
        >
            <div className="flex justify-between">
                <span className="font-medium">{name}</span>
                <span className="font-medium">{time}</span>
            </div>
            <div className="flex items-center">
                <div className="w-1/2 flex flex-col gap-2">
                    <span className="text-6xl font-semibold">
                        {Math.round(main.temp)}°<span className="text-3xl">C</span>
                    </span>
                    <span className="capitalize">{weather[0].description}</span>
                </div>
                <div className="w-1/2 flex flex-col gap-4 font-semibold">
                    <div>RealFeel {Math.round(main.feels_like)}°</div>
                    <div>RealFeel Shade {Math.round(main.temp_min)}°</div>
                </div>
            </div>
        </div>
    )
}
