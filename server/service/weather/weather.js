import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();
const { OPENWEATHERMAP_API_KEY: appid } = process.env,
    units = "metric",
    _fetchWeatherInfo = async ({ lat, lon, q }) => {
        console.log(appid)
        const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: q ? { q, appid, units } : { lat, lon, appid, units },
        });
        console.log(data)
        return data;
    };

export default _fetchWeatherInfo;