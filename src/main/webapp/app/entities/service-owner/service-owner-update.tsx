import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './service-owner.reducer';
import { IServiceOwner } from 'app/shared/model/service-owner.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ServiceOwnerUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const serviceOwnerEntity = useAppSelector(state => state.serviceOwner.entity);
  const loading = useAppSelector(state => state.serviceOwner.loading);
  const updating = useAppSelector(state => state.serviceOwner.updating);
  const updateSuccess = useAppSelector(state => state.serviceOwner.updateSuccess);

  const handleClose = () => {
    props.history.push('/service-owner' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...serviceOwnerEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...serviceOwnerEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="dataelyReactAppV1App.serviceOwner.home.createOrEditLabel" data-cy="ServiceOwnerCreateUpdateHeading">
            Create or edit a ServiceOwner
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="service-owner-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="First Name"
                id="service-owner-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Last Name"
                id="service-owner-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Name"
                id="service-owner-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Role"
                id="service-owner-role"
                name="role"
                data-cy="role"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Email"
                id="service-owner-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "This field should follow pattern for '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+..",
                  },
                }}
              />
              <ValidatedField
                label="Contact Number"
                id="service-owner-contactNumber"
                name="contactNumber"
                data-cy="contactNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Extension" id="service-owner-extension" name="extension" data-cy="extension" type="text" />
              <ValidatedField label="Location" id="service-owner-location" name="location" data-cy="location" type="text" />
              <ValidatedField
                label="Address Line 1"
                id="service-owner-addressLine1"
                name="addressLine1"
                data-cy="addressLine1"
                type="text"
              />
              <ValidatedField
                label="Address Line 2"
                id="service-owner-addressLine2"
                name="addressLine2"
                data-cy="addressLine2"
                type="text"
              />
              <ValidatedField label="City" id="service-owner-city" name="city" data-cy="city" type="text" />
              <ValidatedField label="Country" id="service-owner-country" name="country" data-cy="country" type="text" />
              <ValidatedBlobField label="Image" id="service-owner-image" name="image" data-cy="image" isImage accept="image/*" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/service-owner" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ServiceOwnerUpdate;
