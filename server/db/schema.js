import mongoose from "mongoose";

const weatherSchema = mongoose.Schema({
    coord: {
        lon: { type: Number, required: true },
        lat: { type: Number, required: true }
    },
    weather: [
        {
            id: { type: Number, required: true },
            main: { type: String, required: true },
            description: { type: String, required: true },
        }
    ],
    main: {
        temp: { type: Number, required: true },
        feels_like: { type: Number },
        temp_min: { type: Number },
        temp_max: { type: Number },
        pressure: { type: Number },
        humidity: { type: Number },
        sea_level: { type: Number },
        grnd_level: { type: Number }
    },
    sys: {
        type: { type: Number },
        id: { type: Number },
        country: { type: String },
        sunrise: { type: Number },
        sunset: { type: Number }
    },
    timezone: { type: Number },
    name: { type: String, unique: true },
}),
    weatherModel = mongoose.model('weather', weatherSchema);

export default weatherModel;