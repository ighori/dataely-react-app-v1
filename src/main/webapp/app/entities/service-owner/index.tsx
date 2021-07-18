import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ServiceOwner from './service-owner';
import ServiceOwnerDetail from './service-owner-detail';
import ServiceOwnerUpdate from './service-owner-update';
import ServiceOwnerDeleteDialog from './service-owner-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServiceOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServiceOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ServiceOwnerDetail} />
      <ErrorBoundaryRoute path={match.url} component={ServiceOwner} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ServiceOwnerDeleteDialog} />
  </>
);

export default Routes;
