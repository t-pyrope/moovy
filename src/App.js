import React from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Search from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';
import RatedMoviesPage from './pages/RatedMoviesPage';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Switch location={location} key={location.pathname}>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/movie/:id">
          <MovieDetails />
        </Route>
        <Route path="/rated">
          <RatedMoviesPage />
        </Route>
        <Route
          render={() => <Redirect to="/search" /> }
        />
      </Switch>
    </div>
  );
}

export default App;
