import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './service-owner.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ServiceOwnerDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const serviceOwnerEntity = useAppSelector(state => state.serviceOwner.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="serviceOwnerDetailsHeading">ServiceOwner</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{serviceOwnerEntity.id}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{serviceOwnerEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{serviceOwnerEntity.lastName}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{serviceOwnerEntity.name}</dd>
          <dt>
            <span id="role">Role</span>
          </dt>
          <dd>{serviceOwnerEntity.role}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{serviceOwnerEntity.email}</dd>
          <dt>
            <span id="contactNumber">Contact Number</span>
          </dt>
          <dd>{serviceOwnerEntity.contactNumber}</dd>
          <dt>
            <span id="extension">Extension</span>
          </dt>
          <dd>{serviceOwnerEntity.extension}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{serviceOwnerEntity.location}</dd>
          <dt>
            <span id="addressLine1">Address Line 1</span>
          </dt>
          <dd>{serviceOwnerEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">Address Line 2</span>
          </dt>
          <dd>{serviceOwnerEntity.addressLine2}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{serviceOwnerEntity.city}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{serviceOwnerEntity.country}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {serviceOwnerEntity.image ? (
              <div>
                {serviceOwnerEntity.imageContentType ? (
                  <a onClick={openFile(serviceOwnerEntity.imageContentType, serviceOwnerEntity.image)}>
                    <img
                      src={`data:${serviceOwnerEntity.imageContentType};base64,${serviceOwnerEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {serviceOwnerEntity.imageContentType}, {byteSize(serviceOwnerEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/service-owner" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/service-owner/${serviceOwnerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ServiceOwnerDetail;
