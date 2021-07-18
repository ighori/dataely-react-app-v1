import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './environment.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EnvironmentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const environmentEntity = useAppSelector(state => state.environment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="environmentDetailsHeading">Environment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{environmentEntity.id}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{environmentEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{environmentEntity.name}</dd>
          <dt>
            <span id="detail">Detail</span>
          </dt>
          <dd>{environmentEntity.detail}</dd>
          <dt>
            <span id="appType">App Type</span>
          </dt>
          <dd>{environmentEntity.appType}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{environmentEntity.type}</dd>
          <dt>
            <span id="purpose">Purpose</span>
          </dt>
          <dd>{environmentEntity.purpose}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>
            {environmentEntity.creationDate ? (
              <TextFormat value={environmentEntity.creationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdated">Last Updated</span>
          </dt>
          <dd>
            {environmentEntity.lastUpdated ? (
              <TextFormat value={environmentEntity.lastUpdated} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Service Owner</dt>
          <dd>{environmentEntity.serviceOwner ? environmentEntity.serviceOwner.name : ''}</dd>
          <dt>Project</dt>
          <dd>{environmentEntity.project ? environmentEntity.project.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/environment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/environment/${environmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EnvironmentDetail;
