import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOrganization } from 'app/shared/model/organization.model';
import { getEntities as getOrganizations } from 'app/entities/organization/organization.reducer';
import { getEntity, updateEntity, createEntity, reset } from './business-unit.reducer';
import { IBusinessUnit } from 'app/shared/model/business-unit.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const BusinessUnitUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const organizations = useAppSelector(state => state.organization.entities);
  const businessUnitEntity = useAppSelector(state => state.businessUnit.entity);
  const loading = useAppSelector(state => state.businessUnit.loading);
  const updating = useAppSelector(state => state.businessUnit.updating);
  const updateSuccess = useAppSelector(state => state.businessUnit.updateSuccess);

  const handleClose = () => {
    props.history.push('/business-unit' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getOrganizations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.creationDate = convertDateTimeToServer(values.creationDate);
    values.lastUpdated = convertDateTimeToServer(values.lastUpdated);

    const entity = {
      ...businessUnitEntity,
      ...values,
      organization: organizations.find(it => it.id.toString() === values.organizationId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          creationDate: displayDefaultDateTime(),
          lastUpdated: displayDefaultDateTime(),
        }
      : {
          ...businessUnitEntity,
          creationDate: convertDateTimeFromServer(businessUnitEntity.creationDate),
          lastUpdated: convertDateTimeFromServer(businessUnitEntity.lastUpdated),
          organizationId: businessUnitEntity?.organization?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="dataelyReactAppV1App.businessUnit.home.createOrEditLabel" data-cy="BusinessUnitCreateUpdateHeading">
            Create or edit a BusinessUnit
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
                <ValidatedField name="id" required readOnly id="business-unit-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Code"
                id="business-unit-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Name"
                id="business-unit-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Detail" id="business-unit-detail" name="detail" data-cy="detail" type="text" />
              <ValidatedField
                label="Creation Date"
                id="business-unit-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Last Updated"
                id="business-unit-lastUpdated"
                name="lastUpdated"
                data-cy="lastUpdated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="business-unit-organization"
                name="organizationId"
                data-cy="organization"
                label="Organization"
                type="select"
              >
                <option value="" key="0" />
                {organizations
                  ? organizations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/business-unit" replace color="info">
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

export default BusinessUnitUpdate;
