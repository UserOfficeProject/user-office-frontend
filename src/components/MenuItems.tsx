import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CalendarToday from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import EventIcon from '@material-ui/icons/Event';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FolderOpen from '@material-ui/icons/FolderOpen';
import FunctionsIcon from '@material-ui/icons/Functions';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import Help from '@material-ui/icons/Help';
import InboxIcon from '@material-ui/icons/Inbox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NoteAdd from '@material-ui/icons/NoteAdd';
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import VpnKey from '@material-ui/icons/VpnKey';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

import { FeatureContext } from 'context/FeatureContextProvider';
import { Call, FeatureId, UserRole } from 'generated/sdk';

import BoxIcon from './common/icons/BoxIcon';
import CommentQuestionIcon from './common/icons/CommentQuestionIcon';
import EsiIcon from './common/icons/EsiIcon';
import ProposalSettingsIcon from './common/icons/ProposalSettingsIcon';
import ProposalWorkflowIcon from './common/icons/ProposalWorkflowIcon';
import ScienceIcon from './common/icons/ScienceIcon';

type MenuItemsProps = {
  currentRole: UserRole | null;
  callsData: Call[];
};

const SettingsMenuListItem = () => {
  const history = useHistory();
  const shouldExpand =
    history.location.pathname === '/ProposalStatuses' ||
    history.location.pathname === '/ProposalWorkflows' ||
    history.location.pathname.includes('ProposalWorkflowEditor');
  const [isExpanded, setIsExpanded] = useState(shouldExpand);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Tooltip title="Settings">
        <ListItem button onClick={toggleExpand}>
          <ListItemIcon>
            {isExpanded ? (
              <>
                <Settings />
                <ExpandLess fontSize="small" />
              </>
            ) : (
              <>
                <Settings />
                <ExpandMore fontSize="small" />
              </>
            )}
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </Tooltip>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Tooltip title="Units">
          <ListItem component={NavLink} to="/Units" button>
            <ListItemIcon>
              <FunctionsIcon />
            </ListItemIcon>
            <ListItemText primary="Units" />
          </ListItem>
        </Tooltip>

        <Tooltip title="Proposal statuses">
          <ListItem component={NavLink} to="/ProposalStatuses" button>
            <ListItemIcon>
              <ProposalSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Proposal statuses" />
          </ListItem>
        </Tooltip>

        <Tooltip title="Proposal workflows">
          <ListItem
            component={NavLink}
            isActive={() =>
              history.location.pathname.includes('/ProposalWorkflows') ||
              history.location.pathname.includes('ProposalWorkflowEditor')
            }
            to="/ProposalWorkflows"
            button
          >
            <ListItemIcon>
              <ProposalWorkflowIcon />
            </ListItemIcon>
            <ListItemText primary="Proposal workflows" />
          </ListItem>
        </Tooltip>

        <Tooltip title="API access tokens">
          <ListItem component={NavLink} to="/ApiAccessTokens" button>
            <ListItemIcon>
              <VpnKey />
            </ListItemIcon>
            <ListItemText primary="API access tokens" />
          </ListItem>
        </Tooltip>
      </Collapse>
    </>
  );
};

const EsiTemplatesMenuListItem = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Tooltip title="Experiment Safety Input (ESI)">
        <ListItem button onClick={() => setIsExpanded(!isExpanded)}>
          <ListItemIcon>
            {isExpanded ? (
              <>
                <EsiIcon />
                <ExpandLess fontSize="small" />
              </>
            ) : (
              <>
                <EsiIcon />
                <ExpandMore fontSize="small" />
              </>
            )}
          </ListItemIcon>
          <ListItemText primary="ESI" />
        </ListItem>
      </Tooltip>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        style={{ marginLeft: '10px' }}
      >
        <Tooltip title="Experiment Safety Input (Proposal)">
          <ListItem component={NavLink} to="/EsiTemplates" button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Proposal ESI" title="Proposal ESI" />
          </ListItem>
        </Tooltip>
        <Tooltip title="Experiment Safety Input (Sample)">
          <ListItem component={NavLink} to="/SampleEsiTemplates" button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sample ESI" title="Sample ESI" />
          </ListItem>
        </Tooltip>
      </Collapse>
    </>
  );
};

const TemplateMenuListItem = () => {
  const history = useHistory();
  const shouldExpand =
    history.location.pathname === '/ProposalTemplates' ||
    history.location.pathname === '/SampleDeclarationTemplates';
  const [isExpanded, setIsExpanded] = useState(shouldExpand);
  const context = useContext(FeatureContext);
  const isShipmentFeatureEnabled = !!context.features.get(FeatureId.SHIPPING)
    ?.isEnabled;
  const isRiskAssessmentFeatureEnabled = !!context.features.get(
    FeatureId.RISK_ASSESSMENT
  )?.isEnabled;
  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <Tooltip title="Templates">
        <ListItem button onClick={toggleExpand}>
          <ListItemIcon>
            {isExpanded ? (
              <>
                <LibraryBooksIcon />
                <ExpandLess fontSize="small" />
              </>
            ) : (
              <>
                <LibraryBooksIcon />
                <ExpandMore fontSize="small" />
              </>
            )}
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItem>
      </Tooltip>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Tooltip title="Proposal">
          <ListItem component={NavLink} to="/ProposalTemplates" button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Proposal" />
          </ListItem>
        </Tooltip>

        <Tooltip title="Sample declaration">
          <ListItem component={NavLink} to="/SampleDeclarationTemplates" button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sample declaration" />
          </ListItem>
        </Tooltip>

        <Tooltip title="Sub Template">
          <ListItem component={NavLink} to="/GenericTemplates" button>
            <ListItemIcon>
              <DynamicFeedIcon />
            </ListItemIcon>
            <ListItemText primary="Sub Template" />
          </ListItem>
        </Tooltip>

        {isShipmentFeatureEnabled && (
          <Tooltip title="Shipment declaration templates">
            <ListItem
              component={NavLink}
              to="/ShipmentDeclarationTemplates"
              button
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Shipment declaration" />
            </ListItem>
          </Tooltip>
        )}
        <Tooltip title="Visit registration">
          <ListItem component={NavLink} to="/VisitTemplates" button>
            <ListItemIcon>
              <FlightTakeoffIcon />
            </ListItemIcon>
            <ListItemText primary="Visit registration" />
          </ListItem>
        </Tooltip>
        {isRiskAssessmentFeatureEnabled && <EsiTemplatesMenuListItem />}
      </Collapse>
    </>
  );
};

const SamplesMenuListItem = () => {
  return (
    <Tooltip title="Sample safety">
      <ListItem component={NavLink} to="/SampleSafety" button>
        <ListItemIcon>
          <BoxIcon />
        </ListItemIcon>
        <ListItemText primary="Sample safety" />
      </ListItem>
    </Tooltip>
  );
};

const MenuItems: React.FC<MenuItemsProps> = ({ currentRole, callsData }) => {
  const proposalDisabled = callsData.length === 0;
  const multipleCalls = callsData.length > 1;
  const context = useContext(FeatureContext);

  const isShipmentFeatureEnabled = !!context.features.get(FeatureId.SHIPPING)
    ?.isEnabled;

  const isSchedulerEnabled = context.features.get(
    FeatureId.SCHEDULER
  )?.isEnabled;

  const user = (
    <div data-cy="user-menu-items">
      <Tooltip title="Dashboard">
        <ListItem component={NavLink} to="/" exact button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Tooltip>
      <Tooltip title="New Proposal">
        <ListItem
          component={NavLink}
          to={
            multipleCalls
              ? '/ProposalSelectType'
              : `/ProposalCreate/${callsData[0]?.id}/${callsData[0]?.templateId}`
          }
          button
          disabled={proposalDisabled}
        >
          <ListItemIcon>
            <NoteAdd />
          </ListItemIcon>
          <ListItemText primary="New Proposal" />
        </ListItem>
      </Tooltip>
      {isShipmentFeatureEnabled && (
        <Tooltip title="Shipments">
          <ListItem component={NavLink} to="/MyShipments" button>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Shipments" />
          </ListItem>
        </Tooltip>
      )}
      {isSchedulerEnabled && (
        <Tooltip title="Experiment Times">
          <ListItem component={NavLink} to="/ExperimentTimes" button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Experiment Times" />
          </ListItem>
        </Tooltip>
      )}

      <Tooltip title="Help">
        <ListItem component={NavLink} to="/HelpPage" button>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </Tooltip>
    </div>
  );

  const userOfficer = (
    <div data-cy="officer-menu-items">
      <Tooltip title="Proposals">
        <ListItem component={NavLink} to="/ProposalPage" button>
          <ListItemIcon>
            <FolderOpen />
          </ListItemIcon>
          <ListItemText primary="Proposals" />
        </ListItem>
      </Tooltip>
      <Tooltip title="Calls">
        <ListItem component={NavLink} to="/CallPage" button>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Calls" />
        </ListItem>
      </Tooltip>
      <Tooltip title="People">
        <ListItem component={NavLink} to="/PeoplePage" button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="People" />
        </ListItem>
      </Tooltip>
      <Tooltip title="Instruments">
        <ListItem component={NavLink} to="/InstrumentPage" button>
          <ListItemIcon>
            <ScienceIcon />
          </ListItemIcon>
          <ListItemText primary="Instruments" />
        </ListItem>
      </Tooltip>
      <Tooltip title="Scientific evaluation panels">
        <ListItem component={NavLink} to="/SEPPage" button>
          <ListItemIcon>
            <GroupWorkIcon />
          </ListItemIcon>
          <ListItemText primary="SEPs" />
        </ListItem>
      </Tooltip>
      <Tooltip title="Pages">
        <ListItem component={NavLink} to="/PageEditor" button>
          <ListItemIcon>
            <SettingsApplications />
          </ListItemIcon>
          <ListItemText primary="Pages" />
        </ListItem>
      </Tooltip>
      <Tooltip title="Institutions">
        <ListItem component={NavLink} to="/InstitutionPage" button>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Institutions" />
        </ListItem>
      </Tooltip>
      <TemplateMenuListItem />
      <Tooltip title="Questions">
        <ListItem component={NavLink} to="/Questions" button>
          <ListItemIcon>
            <CommentQuestionIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItem>
      </Tooltip>
      <SamplesMenuListItem />
      <SettingsMenuListItem />
    </div>
  );

  const SEPRoles = (
    <div data-cy="SEPRoles-menu-items">
      <ListItem component={NavLink} to="/" exact button>
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText primary="Review Proposals" />
      </ListItem>
      <ListItem component={NavLink} to="/SEPPage" button>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <Tooltip title="Scientific evaluation panels">
          <ListItemText primary="SEPs" />
        </Tooltip>
      </ListItem>
    </div>
  );

  const SEPReviewer = (
    <div data-cy="SEPReviewer-menu-items">
      <ListItem component={NavLink} to="/" exact button>
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText primary="Review Proposals" />
      </ListItem>
    </div>
  );

  const instrumentScientist = (
    <div data-cy="instrument-scientist-menu-items">
      <ListItem component={NavLink} to="/" exact button>
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText primary="Proposals" />
      </ListItem>
      <ListItem component={NavLink} to="/InstrumentPage" button>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Instruments" />
      </ListItem>
      {isSchedulerEnabled && (
        <ListItem component={NavLink} to="/UpcomingExperimentTimes" button>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Upcoming experiments" />
        </ListItem>
      )}
    </div>
  );

  const sampleSafetyReviewer = (
    <div data-cy="reviewer-menu-items">
      <SamplesMenuListItem />
    </div>
  );

  switch (currentRole) {
    case UserRole.USER:
      return user;
    case UserRole.USER_OFFICER:
      return userOfficer;
    case UserRole.INSTRUMENT_SCIENTIST:
      return instrumentScientist;
    case UserRole.SEP_CHAIR:
    case UserRole.SEP_SECRETARY:
      return SEPRoles;
    case UserRole.SEP_REVIEWER:
      return SEPReviewer;
    case UserRole.SAMPLE_SAFETY_REVIEWER:
      return sampleSafetyReviewer;
    default:
      return null;
  }
};

export default MenuItems;
