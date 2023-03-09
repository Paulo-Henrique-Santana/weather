import sun from "../../img/sun.png";
import cloudy from "../../img/cloudy.png";
import clearSky from "../../img/clear-sky.png";
import snowy from "../../img/snowy.png";
import lightRain from "../../img/light-rain.png";
import moderateRain from "../../img/moderate-rain.png";
import storm from "../../img/storm.png";
import styles from "./Weather.module.scss";

interface Props {
  data: Data | null;
}

const Weather = ({ data }: Props) => {
  if (data) {
    const { description, temp, humidity, country, speed, timezone, name } =
      data;
    const daysWeek = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];
    const months = [
      "janeiro",
      "fevereiro",
      "Março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const images = [
      { name: "céu limpo", src: sun },
      { name: "algumas nuvens", src: clearSky },
      { name: "nuvens dispersas", src: clearSky },
      { name: "nublado", src: cloudy },
      { name: "chuva leve", src: lightRain },
      { name: "chuva moderada", src: moderateRain },
      { name: "trovoadas", src: storm },
      { name: "trovoada com chuva", src: storm },
      { name: "pouca neve", src: snowy },
    ];
    const img = images.find((item) => item.name === description);

    const date = new Date();
    date.setTime(date.getTime() + timezone * 1000);

    const formatTime = (time: number) => {
      return time < 10 ? `0${time}` : time;
    };

    const hours = formatTime(date.getUTCHours());
    const minutes = formatTime(date.getUTCMinutes());
    const dayWeek = daysWeek[date.getDay()];
    const dayMonth = date.getDate();
    const month = months[date.getMonth()];

    return (
      <div className={styles.container}>
        <p className={styles.local}>{`${name}, ${country}`}</p>
        <p className={styles.hour}>{`${hours}:${minutes}`}</p>
        <p className={styles.date}>{`${dayWeek}, ${dayMonth} ${month}`}</p>

        <div className={styles.containerTemp}>
          <img src={img?.src} />
          <p className={styles.temperature}>
            {Math.round(temp)}º<span className={styles.celsius}>C</span>
          </p>
        </div>

        <p className={styles.description}>{description}</p>
        <p className={styles.humidity}>Umidade: {humidity}%</p>
        <p className={styles.windSpeed}>
          Vento: {Math.round(speed * 3.6)} km/h
        </p>
      </div>
    );
  } else return <></>;
};

export default Weather;
