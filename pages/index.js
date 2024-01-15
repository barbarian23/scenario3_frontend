
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/main.module.scss';
import {

} from "../actions/index.action"
import { CardComponent } from "../components";
import commonConstant from "../constants/common.constant";

export default function Main() {

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${commonConstant.URL}/${commonConstant.weather}?q=Seoul`)
      .then(response => response.json())
      .then(data => {
        setError(null);
        setLoading(false);
        setWeather(data);
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
      fetch(`${commonConstant.URL}/${commonConstant.weather}?q=${search}`)
        .then(response => response.json())
        .then(data => {
          setError(null);
          setLoading(false);
          setWeather(data);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          console.error(error);
        });

    }
  }, [search])

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
        error ?
          <div className={styles.error}>{JSON.stringify(error, null, 4)}</div>
          :
          null
      }
      {
        weather ?
          <CardComponent weather={weather} />
          :
          <div className={styles.noData}>"No data"</div>
      }

    </div>
  )
}
