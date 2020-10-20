import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Landing = lazy(() => import('./components/Landing/Landing'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Signin = lazy(() => import('./components/Signin/Signin'));
const MyJournal = lazy(() => import('./components/MyJournal/MyJournal'));
const NewEntry = lazy(() => import('./components/NewEntry/NewEntry'));
const ErrorPage = lazy(() => import('./components/ErrorPage/ErrorPage'));

const SecureRouteFront = lazy(() => import('./lib/SecureRouteFront'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <main data-testid='main'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
            <SecureRouteFront path='/myjournal' component={MyJournal} />
            <SecureRouteFront
              path='/new-entry'
              component={(props: any) => {
                return <NewEntry {...props} />;
              }}
            />
            <Route path='/*' component={ErrorPage} />
          </Switch>
        </main>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
