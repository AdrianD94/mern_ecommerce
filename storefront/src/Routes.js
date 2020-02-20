import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import Home from './components/share/Home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './components/user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './components/user/AdminDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
