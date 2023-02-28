import './App.css';
import { Suspense } from "react";
import Main from './presentation/MainComponent';
import history from './redux/history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
      <Provider store={store}>
        <Suspense fallback="loading">
          <Router history={history}>
              <Main />
          </Router>
        </Suspense>
      </Provider>
  );
}

export default App;
