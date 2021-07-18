import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IServiceOwner } from 'app/shared/model/service-owner.model';
import { getEntities as getServiceOwners } from 'app/entities/service-owner/service-owner.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './environment.reducer';
import { IEnvironment } from 'app/shared/model/environment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EnvironmentUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const serviceOwners = useAppSelector(state => state.serviceOwner.entities);
  const projects = useAppSelector(state => state.project.entities);
  const environmentEntity = useAppSelector(state => state.environment.entity);
  const loading = useAppSelector(state => state.environment.loading);
  const updating = useAppSelector(state => state.environment.updating);
  const updateSuccess = useAppSelector(state => state.environment.updateSuccess);

  const handleClose = () => {
    props.history.push('/environment' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getServiceOwners({}));
    dispatch(getProjects({}));
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
      ...environmentEntity,
      ...values,
      serviceOwner: serviceOwners.find(it => it.id.toString() === values.serviceOwnerId.toString()),
      project: projects.find(it => it.id.toString() === values.projectId.toString()),
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
          ...environmentEntity,
          appType: 'CRM',
          type: 'STANDALONE',
          purpose: 'PROFILING',
          creationDate: convertDateTimeFromServer(environmentEntity.creationDate),
          lastUpdated: convertDateTimeFromServer(environmentEntity.lastUpdated),
          serviceOwnerId: environmentEntity?.serviceOwner?.id,
          projectId: environmentEntity?.project?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="dataelyReactAppV1App.environment.home.createOrEditLabel" data-cy="EnvironmentCreateUpdateHeading">
            Create or edit a Environment
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="environment-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Code"
                id="environment-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Name"
                id="environment-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Detail" id="environment-detail" name="detail" data-cy="detail" type="text" />
              <ValidatedField label="App Type" id="environment-appType" name="appType" data-cy="appType" type="select">
                <option value="CRM">CRM</option>
                <option value="HR">HR</option>
                <option value="FINANCE">FINANCE</option>
                <option value="COMMUNICATION">COMMUNICATION</option>
                <option value="MESSAGING">MESSAGING</option>
                <option value="MARKETING">MARKETING</option>
                <option value="WEB">WEB</option>
                <option value="MOBILE">MOBILE</option>
                <option value="SERVICE">SERVICE</option>
                <option value="DMS">DMS</option>
                <option value="HELPDESK">HELPDESK</option>
                <option value="ACCOUNTING">ACCOUNTING</option>
                <option value="ERP">ERP</option>
                <option value="ANALYTICS">ANALYTICS</option>
                <option value="BI">BI</option>
                <option value="OTHER">OTHER</option>
              </ValidatedField>
              <ValidatedField label="Type" id="environment-type" name="type" data-cy="type" type="select">
                <option value="STANDALONE">STANDALONE</option>
                <option value="INTEGRATED">INTEGRATED</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="TESTING">TESTING</option>
                <option value="TRAINING">TRAINING</option>
                <option value="STAGING">STAGING</option>
                <option value="PRODUCTION">PRODUCTION</option>
                <option value="OTHER">OTHER</option>
              </ValidatedField>
              <ValidatedField label="Purpose" id="environment-purpose" name="purpose" data-cy="purpose" type="select">
                <option value="PROFILING">PROFILING</option>
                <option value="MASKING">MASKING</option>
                <option value="REPORTING">REPORTING</option>
              </ValidatedField>
              <ValidatedField
                label="Creation Date"
                id="environment-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Last Updated"
                id="environment-lastUpdated"
                name="lastUpdated"
                data-cy="lastUpdated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="environment-serviceOwner"
                name="serviceOwnerId"
                data-cy="serviceOwner"
                label="Service Owner"
                type="select"
              >
                <option value="" key="0" />
                {serviceOwners
                  ? serviceOwners.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="environment-project" name="projectId" data-cy="project" label="Project" type="select">
                <option value="" key="0" />
                {projects
                  ? projects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/environment" replace color="info">
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

export default EnvironmentUpdate;
