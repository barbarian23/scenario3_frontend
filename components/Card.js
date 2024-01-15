
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/main.module.scss';
import {

} from "../actions/index.action"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function CardComponent(props) {

  const {weather} = props;

  return (
    <div className={styles.main}>
      {
        weather ?
          <Card sx={{ width: "50%", margin: "0px auto" }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Country: {weather.location.country}
              </Typography>
              <Typography variant="h5" component="div">
                  Weather in: {weather.location.name}  
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 LocalTime: {weather.location.localtime}
              </Typography>

              <Typography variant="body2">
                Condition: {weather.current.condition.text}
                <br />
                Humidity: {weather.current.humidity}
                <br />
                UV: {weather.current.uv}
                <br />
                Wind: {weather.current.wind_kph} kph
              </Typography>
            </CardContent>
          </Card>
          :
          null
      }

    </div>
  )
}
