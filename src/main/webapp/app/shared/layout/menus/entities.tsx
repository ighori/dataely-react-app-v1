import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/organization">
      Organization
    </MenuItem>
    <MenuItem icon="asterisk" to="/business-unit">
      Business Unit
    </MenuItem>
    <MenuItem icon="asterisk" to="/project">
      Project
    </MenuItem>
    <MenuItem icon="asterisk" to="/service-owner">
      Service Owner
    </MenuItem>
    <MenuItem icon="asterisk" to="/environment">
      Environment
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
