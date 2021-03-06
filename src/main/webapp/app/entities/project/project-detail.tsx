import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './project.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProjectDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectEntity = useAppSelector(state => state.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">Project</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{projectEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="detail">Detail</span>
          </dt>
          <dd>{projectEntity.detail}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>
            {projectEntity.creationDate ? <TextFormat value={projectEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastUpdated">Last Updated</span>
          </dt>
          <dd>
            {projectEntity.lastUpdated ? <TextFormat value={projectEntity.lastUpdated} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Business Unit</dt>
          <dd>{projectEntity.businessUnit ? projectEntity.businessUnit.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
