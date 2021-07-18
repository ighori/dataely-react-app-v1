import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Organization from './organization';
import BusinessUnit from './business-unit';
import Project from './project';
import ServiceOwner from './service-owner';
import Environment from './environment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}business-unit`} component={BusinessUnit} />
      <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}service-owner`} component={ServiceOwner} />
      <ErrorBoundaryRoute path={`${match.url}environment`} component={Environment} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
