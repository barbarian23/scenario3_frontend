
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/main.module.scss';
import {

} from "../actions/index.action";
import { CardComponent, TableComponent } from "../components";
import commonConstant from "../constants/common.constant";

export default function Main() {

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${commonConstant.URL}/${commonConstant.forecast}?q=Seoul`)
      .then(response => response.json())
      .then(data => {
        setError(null);
        setLoading(false);
        setForecast(data);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error(error);
      });
  }, [])

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`${commonConstant.URL}/${commonConstant.forecast}?q=${search}`)
        .then(response => response.json())
        .then(data => {
          setError(null);
          setLoading(false);
          setForecast(data);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          console.error(error);
        });
    }
  }, [search])

  // useEffect(()=> {
  //   console.log()
  // }, [])

  // let dispatch = useDispatch();
  // let dispatchToStore = (action) => {
  //   dispatch(action);
  // }

  return (
    <div className={styles.main}>
      {
        loading ?
        <div class="loading-parent">
          <div class="loader"></div>
          <span>Loading ...</span>
        </div>
        :
        null
      }
      {
        forecast ?
          <>
          <div className={styles.forecastWeather}>
            <CardComponent weather={forecast} /></div>
          <div className={styles.forecastHour}>
            <TableComponent forecastday={forecast.forecast.forecastday} /></div>
          </>
          :
          <div className={styles.noData}>"No data"</div>
      }
      {
        error ?
          <div className={styles.error}>{JSON.stringify(error, null, 4)}</div>
          :
          null
      }
    </div>
  )
}
