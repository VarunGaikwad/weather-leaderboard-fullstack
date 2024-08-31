import { _postWeatherInfo } from '../external/externalCalls'
import PropTypes from 'prop-types'

AddMyCity.propTypes = {
    position: PropTypes.object,
}

export default function AddMyCity({ position }) {
    const onClick = () => {
        _postWeatherInfo({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        })
    }
    return (
        <button
            onClick={onClick}
            className="m-4 fixed bottom-0 right-0 p-1 bg-slate-50 hover:bg-slate-300 text-black rounded-full"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2rem"
                viewBox="0 -960 960 960"
                width="2rem"
                fill="currentColor"
            >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
        </button>
    )
}
