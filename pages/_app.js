import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from '../assets/globals.css';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';
import { createWrapper } from 'next-redux-wrapper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Link from 'next/link'
import { PAGE_URLS } from '../constants/urls'
import { Inter } from 'next/font/google'

//import '../services/i18n/i18n.service'

//store
export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

const wrapper = createWrapper(makeStore, { debug: true })

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check 
    // authCheck(router.asPath);
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div class="container">
        <div class="container-child-left">
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
              <ListItem disablePadding>
                <Link href="/">
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search for book">
                      Search for book
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/forecast">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Content saved">
                      Content saved
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href="/forecast">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create new content">
                      Create new content
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </div>
        <div class="container-child-right">
          <Component {...pageProps} />
        </div>
      </div>
    </React.Suspense>
  )
}

export default wrapper.withRedux(MyApp);
