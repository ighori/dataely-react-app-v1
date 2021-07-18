import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './organization.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrganizationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const organizationEntity = useAppSelector(state => state.organization.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="organizationDetailsHeading">Organization</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{organizationEntity.id}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{organizationEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{organizationEntity.name}</dd>
          <dt>
            <span id="detail">Detail</span>
          </dt>
          <dd>{organizationEntity.detail}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>
            {organizationEntity.creationDate ? (
              <TextFormat value={organizationEntity.creationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdated">Last Updated</span>
          </dt>
          <dd>
            {organizationEntity.lastUpdated ? (
              <TextFormat value={organizationEntity.lastUpdated} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>User</dt>
          <dd>{organizationEntity.user ? organizationEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization/${organizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrganizationDetail;
