import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './business-unit.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BusinessUnitDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const businessUnitEntity = useAppSelector(state => state.businessUnit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="businessUnitDetailsHeading">BusinessUnit</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{businessUnitEntity.id}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{businessUnitEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{businessUnitEntity.name}</dd>
          <dt>
            <span id="detail">Detail</span>
          </dt>
          <dd>{businessUnitEntity.detail}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>
            {businessUnitEntity.creationDate ? (
              <TextFormat value={businessUnitEntity.creationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdated">Last Updated</span>
          </dt>
          <dd>
            {businessUnitEntity.lastUpdated ? (
              <TextFormat value={businessUnitEntity.lastUpdated} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Organization</dt>
          <dd>{businessUnitEntity.organization ? businessUnitEntity.organization.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-unit" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-unit/${businessUnitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BusinessUnitDetail;
