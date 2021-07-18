import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrganizationUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const organizationEntity = useAppSelector(state => state.organization.entity);
  const loading = useAppSelector(state => state.organization.loading);
  const updating = useAppSelector(state => state.organization.updating);
  const updateSuccess = useAppSelector(state => state.organization.updateSuccess);

  const handleClose = () => {
    props.history.push('/organization' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
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
      ...organizationEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.userId.toString()),
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
          ...organizationEntity,
          creationDate: convertDateTimeFromServer(organizationEntity.creationDate),
          lastUpdated: convertDateTimeFromServer(organizationEntity.lastUpdated),
          userId: organizationEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="dataelyReactAppV1App.organization.home.createOrEditLabel" data-cy="OrganizationCreateUpdateHeading">
            Create or edit a Organization
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="organization-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Code"
                id="organization-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Name"
                id="organization-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Detail" id="organization-detail" name="detail" data-cy="detail" type="text" />
              <ValidatedField
                label="Creation Date"
                id="organization-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Last Updated"
                id="organization-lastUpdated"
                name="lastUpdated"
                data-cy="lastUpdated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="organization-user" name="userId" data-cy="user" label="User" type="select" required>
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/organization" replace color="info">
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

export default OrganizationUpdate;
