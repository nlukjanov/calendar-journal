import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

const Landing = lazy(() => import('./components/Landing/Landing'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div> }>
      <BrowserRouter>
        <main data-testid='main'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </main>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
