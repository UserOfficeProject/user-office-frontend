import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  IntStringDateBoolArray: any;
  /** DateTime without timezone in 'yyyy-MM-dd HH:mm:ss' format */
  TzLessDateTime: string;
};

export type AddProposalWorkflowStatusInput = {
  proposalWorkflowId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  droppableGroupId: Scalars['String'];
  parentDroppableGroupId?: Maybe<Scalars['String']>;
  proposalStatusId: Scalars['Int'];
  nextProposalStatusId?: Maybe<Scalars['Int']>;
  prevProposalStatusId?: Maybe<Scalars['Int']>;
};

export type AddStatusChangingEventsToConnectionInput = {
  proposalWorkflowConnectionId: Scalars['Int'];
  statusChangingEvents: Array<Scalars['String']>;
};

export type AddTechnicalReviewInput = {
  proposalPk: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  publicComment?: Maybe<Scalars['String']>;
  timeAllocation?: Maybe<Scalars['Int']>;
  status?: Maybe<TechnicalReviewStatus>;
  submitted?: Maybe<Scalars['Boolean']>;
  reviewerId?: Maybe<Scalars['Int']>;
};

export type AddUserRoleResponseWrap = {
  __typename?: 'AddUserRoleResponseWrap';
  rejection: Maybe<Rejection>;
  success: Maybe<Scalars['Boolean']>;
};

export enum AllocationTimeUnits {
  DAY = 'Day',
  HOUR = 'Hour'
}

export type Answer = {
  __typename?: 'Answer';
  question: Question;
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator: Maybe<DependenciesLogicOperator>;
  answerId: Maybe<Scalars['Int']>;
  value: Maybe<Scalars['IntStringDateBoolArray']>;
};

export type AnswerBasic = {
  __typename?: 'AnswerBasic';
  answerId: Maybe<Scalars['Int']>;
  answer: Scalars['IntStringDateBoolArray'];
  questionaryId: Scalars['Int'];
  questionId: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type AnswerInput = {
  questionId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type ApiAccessTokenResponseWrap = {
  __typename?: 'ApiAccessTokenResponseWrap';
  rejection: Maybe<Rejection>;
  apiAccessToken: Maybe<PermissionsWithAccessToken>;
};

export type AssignChairOrSecretaryToSepInput = {
  userId: Scalars['Int'];
  roleId: UserRole;
  sepId: Scalars['Int'];
};

export type AssignEquipmentsToScheduledEventInput = {
  scheduledEventId: Scalars['ID'];
  proposalBookingId: Scalars['ID'];
  equipmentIds: Array<Scalars['ID']>;
};

export type AssignInstrumentsToCallInput = {
  instrumentIds: Array<Scalars['Int']>;
  callId: Scalars['Int'];
};

export type AuthJwtApiTokenPayload = {
  __typename?: 'AuthJwtApiTokenPayload';
  accessTokenId: Scalars['String'];
};

export type AuthJwtPayload = {
  __typename?: 'AuthJwtPayload';
  user: User;
  currentRole: Role;
  roles: Array<Role>;
};

export type BasicUserDetails = {
  __typename?: 'BasicUserDetails';
  id: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  organisation: Scalars['String'];
  position: Scalars['String'];
  placeholder: Maybe<Scalars['Boolean']>;
  created: Maybe<Scalars['DateTime']>;
};

export type BasicUserDetailsResponseWrap = {
  __typename?: 'BasicUserDetailsResponseWrap';
  rejection: Maybe<Rejection>;
  user: Maybe<BasicUserDetails>;
};

export type BooleanConfig = {
  __typename?: 'BooleanConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
};

export type BulkUpsertLostTimesInput = {
  proposalBookingId: Scalars['ID'];
  lostTimes: Array<SimpleLostTimeInput>;
};

export type BulkUpsertScheduledEventsInput = {
  proposalBookingId: Scalars['ID'];
  scheduledEvents: Array<SimpleScheduledEventInput>;
};

export type Call = {
  __typename?: 'Call';
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview: Maybe<Scalars['DateTime']>;
  endSEPReview: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  referenceNumberFormat: Maybe<Scalars['String']>;
  proposalSequence: Maybe<Scalars['Int']>;
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  proposalWorkflowId: Maybe<Scalars['Int']>;
  allocationTimeUnit: AllocationTimeUnits;
  templateId: Scalars['Int'];
  instruments: Array<InstrumentWithAvailabilityTime>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
  template: Template;
  proposalCount: Scalars['Int'];
  isActive: Scalars['Boolean'];
};

export type CallResponseWrap = {
  __typename?: 'CallResponseWrap';
  rejection: Maybe<Rejection>;
  call: Maybe<Call>;
};

export type CallsFilter = {
  templateIds?: Maybe<Array<Scalars['Int']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isEnded?: Maybe<Scalars['Boolean']>;
  isReviewEnded?: Maybe<Scalars['Boolean']>;
  isSEPReviewEnded?: Maybe<Scalars['Boolean']>;
};

export type ChangeProposalsStatusInput = {
  statusId: Scalars['Int'];
  proposals: Array<ProposalPkWithCallId>;
};

export type CheckExternalTokenWrap = {
  __typename?: 'CheckExternalTokenWrap';
  rejection: Maybe<Rejection>;
  token: Maybe<Scalars['String']>;
};

export type CloneProposalInput = {
  callId: Scalars['Int'];
  proposalToClonePk: Scalars['Int'];
};

export type ConfirmEquipmentAssignmentInput = {
  scheduledEventId: Scalars['ID'];
  equipmentId: Scalars['ID'];
  newStatus: EquipmentAssignmentStatus;
};

export type CreateApiAccessTokenInput = {
  name: Scalars['String'];
  accessPermissions: Scalars['String'];
};

export type CreateCallInput = {
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  referenceNumberFormat?: Maybe<Scalars['String']>;
  proposalSequence?: Maybe<Scalars['Int']>;
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  allocationTimeUnit: AllocationTimeUnits;
  proposalWorkflowId: Scalars['Int'];
  templateId: Scalars['Int'];
};

export type CreateProposalStatusInput = {
  shortCode: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateProposalWorkflowInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateUserByEmailInviteResponseWrap = {
  __typename?: 'CreateUserByEmailInviteResponseWrap';
  rejection: Maybe<Rejection>;
  id: Maybe<Scalars['Int']>;
};

export enum DataType {
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  EMBELLISHMENT = 'EMBELLISHMENT',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SELECTION_FROM_OPTIONS = 'SELECTION_FROM_OPTIONS',
  TEXT_INPUT = 'TEXT_INPUT',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION',
  SAMPLE_BASIS = 'SAMPLE_BASIS',
  PROPOSAL_BASIS = 'PROPOSAL_BASIS',
  INTERVAL = 'INTERVAL',
  NUMBER_INPUT = 'NUMBER_INPUT',
  SHIPMENT_BASIS = 'SHIPMENT_BASIS',
  RICH_TEXT_INPUT = 'RICH_TEXT_INPUT',
  VISIT_BASIS = 'VISIT_BASIS'
}

export type DateConfig = {
  __typename?: 'DateConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  minDate: Maybe<Scalars['String']>;
  maxDate: Maybe<Scalars['String']>;
  defaultDate: Maybe<Scalars['String']>;
  includeTime: Scalars['Boolean'];
};


export type DbStat = {
  __typename?: 'DbStat';
  total: Scalars['Float'];
  state: Maybe<Scalars['String']>;
};

export type DeleteApiAccessTokenInput = {
  accessTokenId: Scalars['String'];
};

export type DeleteEquipmentAssignmentInput = {
  scheduledEventId: Scalars['ID'];
  proposalBookingId: Scalars['ID'];
  equipmentId: Scalars['ID'];
};

export type DeleteProposalWorkflowStatusInput = {
  proposalStatusId: Scalars['Int'];
  proposalWorkflowId: Scalars['Int'];
  sortOrder: Scalars['Int'];
};

export enum DependenciesLogicOperator {
  AND = 'AND',
  OR = 'OR'
}

export type EmailVerificationResponseWrap = {
  __typename?: 'EmailVerificationResponseWrap';
  rejection: Maybe<Rejection>;
  success: Maybe<Scalars['Boolean']>;
};

export type EmbellishmentConfig = {
  __typename?: 'EmbellishmentConfig';
  omitFromPdf: Scalars['Boolean'];
  html: Scalars['String'];
  plain: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  id: Scalars['Int'];
  value: Scalars['String'];
};

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  owner: Maybe<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  maintenanceStartsAt: Maybe<Scalars['TzLessDateTime']>;
  maintenanceEndsAt: Maybe<Scalars['TzLessDateTime']>;
  autoAccept: Scalars['Boolean'];
  events: Array<ScheduledEvent>;
  equipmentResponsible: Array<User>;
};


export type EquipmentEventsArgs = {
  endsAt: Scalars['TzLessDateTime'];
  startsAt: Scalars['TzLessDateTime'];
};

export enum EquipmentAssignmentStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export type EquipmentInput = {
  name: Scalars['String'];
  maintenanceStartsAt?: Maybe<Scalars['TzLessDateTime']>;
  maintenanceEndsAt?: Maybe<Scalars['TzLessDateTime']>;
  autoAccept: Scalars['Boolean'];
};

export type EquipmentResponseWrap = {
  __typename?: 'EquipmentResponseWrap';
  error: Maybe<Scalars['String']>;
  equipment: Maybe<Equipment>;
};

export type EquipmentResponsibleInput = {
  equipmentId: Scalars['ID'];
  userIds: Array<Scalars['Int']>;
};

export type EquipmentWithAssignmentStatus = {
  __typename?: 'EquipmentWithAssignmentStatus';
  id: Scalars['ID'];
  owner: Maybe<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  maintenanceStartsAt: Maybe<Scalars['TzLessDateTime']>;
  maintenanceEndsAt: Maybe<Scalars['TzLessDateTime']>;
  autoAccept: Scalars['Boolean'];
  events: Array<ScheduledEvent>;
  equipmentResponsible: Array<User>;
  status: EquipmentAssignmentStatus;
};


export type EquipmentWithAssignmentStatusEventsArgs = {
  endsAt: Scalars['TzLessDateTime'];
  startsAt: Scalars['TzLessDateTime'];
};

export enum EvaluatorOperator {
  EQ = 'eq',
  NEQ = 'neq'
}

export enum Event {
  PROPOSAL_CREATED = 'PROPOSAL_CREATED',
  PROPOSAL_UPDATED = 'PROPOSAL_UPDATED',
  PROPOSAL_SUBMITTED = 'PROPOSAL_SUBMITTED',
  PROPOSAL_FEASIBLE = 'PROPOSAL_FEASIBLE',
  PROPOSAL_UNFEASIBLE = 'PROPOSAL_UNFEASIBLE',
  PROPOSAL_SEP_SELECTED = 'PROPOSAL_SEP_SELECTED',
  PROPOSAL_INSTRUMENT_SELECTED = 'PROPOSAL_INSTRUMENT_SELECTED',
  PROPOSAL_FEASIBILITY_REVIEW_UPDATED = 'PROPOSAL_FEASIBILITY_REVIEW_UPDATED',
  PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED = 'PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED',
  PROPOSAL_SAMPLE_REVIEW_SUBMITTED = 'PROPOSAL_SAMPLE_REVIEW_SUBMITTED',
  PROPOSAL_SAMPLE_SAFE = 'PROPOSAL_SAMPLE_SAFE',
  PROPOSAL_ALL_SEP_REVIEWERS_SELECTED = 'PROPOSAL_ALL_SEP_REVIEWERS_SELECTED',
  PROPOSAL_SEP_REVIEW_UPDATED = 'PROPOSAL_SEP_REVIEW_UPDATED',
  PROPOSAL_SEP_REVIEW_SUBMITTED = 'PROPOSAL_SEP_REVIEW_SUBMITTED',
  PROPOSAL_ALL_SEP_REVIEWS_SUBMITTED = 'PROPOSAL_ALL_SEP_REVIEWS_SUBMITTED',
  PROPOSAL_SEP_MEETING_SAVED = 'PROPOSAL_SEP_MEETING_SAVED',
  PROPOSAL_SEP_MEETING_SUBMITTED = 'PROPOSAL_SEP_MEETING_SUBMITTED',
  PROPOSAL_SEP_MEETING_RANKING_OVERWRITTEN = 'PROPOSAL_SEP_MEETING_RANKING_OVERWRITTEN',
  PROPOSAL_SEP_MEETING_REORDER = 'PROPOSAL_SEP_MEETING_REORDER',
  PROPOSAL_MANAGEMENT_DECISION_UPDATED = 'PROPOSAL_MANAGEMENT_DECISION_UPDATED',
  PROPOSAL_MANAGEMENT_DECISION_SUBMITTED = 'PROPOSAL_MANAGEMENT_DECISION_SUBMITTED',
  PROPOSAL_INSTRUMENT_SUBMITTED = 'PROPOSAL_INSTRUMENT_SUBMITTED',
  PROPOSAL_ACCEPTED = 'PROPOSAL_ACCEPTED',
  PROPOSAL_RESERVED = 'PROPOSAL_RESERVED',
  PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
  PROPOSAL_STATUS_UPDATED = 'PROPOSAL_STATUS_UPDATED',
  CALL_ENDED = 'CALL_ENDED',
  CALL_REVIEW_ENDED = 'CALL_REVIEW_ENDED',
  CALL_SEP_REVIEW_ENDED = 'CALL_SEP_REVIEW_ENDED',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_ROLE_UPDATED = 'USER_ROLE_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_PASSWORD_RESET_EMAIL = 'USER_PASSWORD_RESET_EMAIL',
  EMAIL_INVITE = 'EMAIL_INVITE',
  SEP_CREATED = 'SEP_CREATED',
  SEP_UPDATED = 'SEP_UPDATED',
  SEP_MEMBERS_ASSIGNED = 'SEP_MEMBERS_ASSIGNED',
  SEP_MEMBER_REMOVED = 'SEP_MEMBER_REMOVED',
  SEP_PROPOSAL_REMOVED = 'SEP_PROPOSAL_REMOVED',
  SEP_MEMBER_ASSIGNED_TO_PROPOSAL = 'SEP_MEMBER_ASSIGNED_TO_PROPOSAL',
  SEP_MEMBER_REMOVED_FROM_PROPOSAL = 'SEP_MEMBER_REMOVED_FROM_PROPOSAL',
  PROPOSAL_NOTIFIED = 'PROPOSAL_NOTIFIED',
  PROPOSAL_CLONED = 'PROPOSAL_CLONED',
  PROPOSAL_STATUS_CHANGED_BY_WORKFLOW = 'PROPOSAL_STATUS_CHANGED_BY_WORKFLOW',
  PROPOSAL_STATUS_CHANGED_BY_USER = 'PROPOSAL_STATUS_CHANGED_BY_USER',
  TOPIC_ANSWERED = 'TOPIC_ANSWERED'
}

export type EventLog = {
  __typename?: 'EventLog';
  id: Scalars['Int'];
  eventType: Scalars['String'];
  rowData: Scalars['String'];
  eventTStamp: Scalars['DateTime'];
  changedObjectId: Scalars['String'];
  changedBy: User;
};

export type Feature = {
  __typename?: 'Feature';
  id: FeatureId;
  isEnabled: Scalars['Boolean'];
  description: Scalars['String'];
};

export enum FeatureId {
  SHIPPING = 'SHIPPING',
  SCHEDULER = 'SCHEDULER',
  EXTERNAL_AUTH = 'EXTERNAL_AUTH'
}

export type FieldCondition = {
  __typename?: 'FieldCondition';
  condition: EvaluatorOperator;
  params: Scalars['IntStringDateBoolArray'];
};

export type FieldConditionInput = {
  condition: EvaluatorOperator;
  params: Scalars['String'];
};

export type FieldConfig = BooleanConfig | DateConfig | EmbellishmentConfig | FileUploadConfig | SelectionFromOptionsConfig | TextInputConfig | SampleBasisConfig | SubTemplateConfig | ProposalBasisConfig | IntervalConfig | NumberInputConfig | ShipmentBasisConfig | RichTextInputConfig | VisitBasisConfig;

export type FieldDependency = {
  __typename?: 'FieldDependency';
  questionId: Scalars['String'];
  dependencyId: Scalars['String'];
  dependencyNaturalKey: Scalars['String'];
  condition: FieldCondition;
};

export type FieldDependencyInput = {
  dependencyId: Scalars['String'];
  condition: FieldConditionInput;
};

export type Fields = {
  __typename?: 'Fields';
  nationalities: Array<Entry>;
  countries: Array<Entry>;
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  originalFileName: Scalars['String'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  fileId: Scalars['String'];
};

export type FileUploadConfig = {
  __typename?: 'FileUploadConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  file_type: Array<Scalars['String']>;
  max_files: Scalars['Int'];
};

export type HealthStats = {
  __typename?: 'HealthStats';
  message: Scalars['String'];
  dbStats: Array<DbStat>;
};

export type IndexWithGroupId = {
  index: Scalars['Int'];
  droppableId: Scalars['String'];
};

export type Institution = {
  __typename?: 'Institution';
  id: Scalars['Int'];
  name: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type InstitutionResponseWrap = {
  __typename?: 'InstitutionResponseWrap';
  rejection: Maybe<Rejection>;
  institution: Maybe<Institution>;
};

export type InstitutionsFilter = {
  isVerified?: Maybe<Scalars['Boolean']>;
};

export type Instrument = {
  __typename?: 'Instrument';
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
  scientists: Array<BasicUserDetails>;
};

export type InstrumentResponseWrap = {
  __typename?: 'InstrumentResponseWrap';
  rejection: Maybe<Rejection>;
  instrument: Maybe<Instrument>;
};

export type InstrumentWithAvailabilityTime = {
  __typename?: 'InstrumentWithAvailabilityTime';
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
  scientists: Array<BasicUserDetails>;
  availabilityTime: Maybe<Scalars['Int']>;
  submitted: Maybe<Scalars['Boolean']>;
};

export type InstrumentsQueryResult = {
  __typename?: 'InstrumentsQueryResult';
  totalCount: Scalars['Int'];
  instruments: Array<Instrument>;
};


export type IntervalConfig = {
  __typename?: 'IntervalConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  units: Maybe<Array<Scalars['String']>>;
};

export type LostTime = {
  __typename?: 'LostTime';
  id: Scalars['ID'];
  proposalBookingId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
};

export type LostTimesResponseWrap = {
  __typename?: 'LostTimesResponseWrap';
  error: Maybe<Scalars['String']>;
  lostTime: Maybe<Array<LostTime>>;
};

export type MoveProposalWorkflowStatusInput = {
  from: IndexWithGroupId;
  to: IndexWithGroupId;
  proposalWorkflowId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApiAccessToken: ApiAccessTokenResponseWrap;
  createInstitution: InstitutionResponseWrap;
  createUnit: UnitResponseWrap;
  deleteApiAccessToken: SuccessResponseWrap;
  updateApiAccessToken: ApiAccessTokenResponseWrap;
  updateInstitution: InstitutionResponseWrap;
  createCall: CallResponseWrap;
  updateCall: CallResponseWrap;
  assignInstrumentsToCall: CallResponseWrap;
  removeAssignedInstrumentFromCall: CallResponseWrap;
  changeProposalsStatus: SuccessResponseWrap;
  assignProposalsToInstrument: SuccessResponseWrap;
  removeProposalsFromInstrument: SuccessResponseWrap;
  assignScientistsToInstrument: SuccessResponseWrap;
  removeScientistFromInstrument: SuccessResponseWrap;
  createInstrument: InstrumentResponseWrap;
  updateInstrument: InstrumentResponseWrap;
  setInstrumentAvailabilityTime: SuccessResponseWrap;
  submitInstrument: SuccessResponseWrap;
  administrationProposal: ProposalResponseWrap;
  cloneProposal: ProposalResponseWrap;
  updateProposal: ProposalResponseWrap;
  addProposalWorkflowStatus: ProposalWorkflowConnectionResponseWrap;
  addStatusChangingEventsToConnection: ProposalStatusChangingEventResponseWrap;
  createProposalStatus: ProposalStatusResponseWrap;
  createProposalWorkflow: ProposalWorkflowResponseWrap;
  deleteProposalWorkflowStatus: SuccessResponseWrap;
  moveProposalWorkflowStatus: ProposalWorkflowConnectionResponseWrap;
  updateProposalStatus: ProposalStatusResponseWrap;
  updateProposalWorkflow: ProposalWorkflowResponseWrap;
  answerTopic: QuestionaryStepResponseWrap;
  createQuestionary: QuestionaryResponseWrap;
  updateAnswer: UpdateAnswerResponseWrap;
  addReview: ReviewWithNextStatusResponseWrap;
  addUserForReview: ReviewResponseWrap;
  submitProposalsReview: SuccessResponseWrap;
  updateTechnicalReviewAssignee: ProposalsResponseWrap;
  createSample: SampleResponseWrap;
  updateSample: SampleResponseWrap;
  assignChairOrSecretary: SepResponseWrap;
  assignReviewersToSEP: SepResponseWrap;
  removeMemberFromSep: SepResponseWrap;
  assignSepReviewersToProposal: SepResponseWrap;
  removeMemberFromSEPProposal: SepResponseWrap;
  assignProposalsToSep: NextProposalStatusResponseWrap;
  removeProposalsFromSep: SepResponseWrap;
  createSEP: SepResponseWrap;
  reorderSepMeetingDecisionProposals: SepMeetingDecisionResponseWrap;
  saveSepMeetingDecision: SepMeetingDecisionResponseWrap;
  updateSEP: SepResponseWrap;
  updateSEPTimeAllocation: SepProposalResponseWrap;
  createShipment: ShipmentResponseWrap;
  updateShipment: ShipmentResponseWrap;
  createQuestion: QuestionResponseWrap;
  createQuestionTemplateRelation: TemplateResponseWrap;
  createTemplate: TemplateResponseWrap;
  createTopic: TemplateResponseWrap;
  deleteQuestionTemplateRelation: TemplateResponseWrap;
  setActiveTemplate: SuccessResponseWrap;
  updateQuestion: QuestionResponseWrap;
  updateQuestionTemplateRelation: TemplateResponseWrap;
  updateQuestionTemplateRelationSettings: TemplateResponseWrap;
  updateTemplate: TemplateResponseWrap;
  updateTopic: TemplateResponseWrap;
  addUserRole: AddUserRoleResponseWrap;
  createUserByEmailInvite: CreateUserByEmailInviteResponseWrap;
  createUser: UserResponseWrap;
  updateUser: UserResponseWrap;
  updateUserRoles: UserResponseWrap;
  setUserEmailVerified: UserResponseWrap;
  setUserNotPlaceholder: UserResponseWrap;
  createVisit: VisitResponseWrap;
  updateVisit: VisitResponseWrap;
  updateVisitRegistration: VisitRegistrationResponseWrap;
  addClientLog: SuccessResponseWrap;
  addSamplesToShipment: ShipmentResponseWrap;
  addTechnicalReview: TechnicalReviewResponseWrap;
  applyPatches: PrepareDbResponseWrap;
  checkExternalToken: CheckExternalTokenWrap;
  cloneSample: SampleResponseWrap;
  cloneTemplate: TemplateResponseWrap;
  createProposal: ProposalResponseWrap;
  createVisitRegistrationQuestionary: VisitRegistrationResponseWrap;
  deleteCall: CallResponseWrap;
  deleteInstitution: InstitutionResponseWrap;
  deleteInstrument: InstrumentResponseWrap;
  deleteProposal: ProposalResponseWrap;
  deleteQuestion: QuestionResponseWrap;
  deleteSample: SampleResponseWrap;
  deleteSEP: SepResponseWrap;
  deleteShipment: ShipmentResponseWrap;
  deleteTemplate: TemplateResponseWrap;
  deleteTopic: TemplateResponseWrap;
  deleteUnit: UnitResponseWrap;
  deleteUser: UserResponseWrap;
  deleteVisit: VisitResponseWrap;
  emailVerification: EmailVerificationResponseWrap;
  getTokenForUser: TokenResponseWrap;
  login: TokenResponseWrap;
  notifyProposal: ProposalResponseWrap;
  prepareDB: PrepareDbResponseWrap;
  removeUserForReview: ReviewResponseWrap;
  resetPasswordEmail: SuccessResponseWrap;
  resetPassword: BasicUserDetailsResponseWrap;
  setPageContent: PageResponseWrap;
  deleteProposalStatus: ProposalStatusResponseWrap;
  deleteProposalWorkflow: ProposalWorkflowResponseWrap;
  submitProposal: ProposalResponseWrap;
  submitShipment: ShipmentResponseWrap;
  submitTechnicalReview: TechnicalReviewResponseWrap;
  token: TokenResponseWrap;
  selectRole: TokenResponseWrap;
  updatePassword: BasicUserDetailsResponseWrap;
  createEquipment: EquipmentResponseWrap;
  updateEquipment: EquipmentResponseWrap;
  assignToScheduledEvents: Scalars['Boolean'];
  deleteEquipmentAssignment: Scalars['Boolean'];
  confirmEquipmentAssignment: Scalars['Boolean'];
  addEquipmentResponsible: Scalars['Boolean'];
  bulkUpsertLostTimes: LostTimesResponseWrap;
  createScheduledEvent: ScheduledEventResponseWrap;
  bulkUpsertScheduledEvents: ScheduledEventsResponseWrap;
  finalizeProposalBooking: ProposalBookingResponseWrap;
  activateProposalBooking: ProposalBookingResponseWrap;
  resetSchedulerDb: Scalars['String'];
};


export type MutationCreateApiAccessTokenArgs = {
  createApiAccessTokenInput: CreateApiAccessTokenInput;
};


export type MutationCreateInstitutionArgs = {
  name: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type MutationCreateUnitArgs = {
  name: Scalars['String'];
};


export type MutationDeleteApiAccessTokenArgs = {
  deleteApiAccessTokenInput: DeleteApiAccessTokenInput;
};


export type MutationUpdateApiAccessTokenArgs = {
  updateApiAccessTokenInput: UpdateApiAccessTokenInput;
};


export type MutationUpdateInstitutionArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateCallArgs = {
  createCallInput: CreateCallInput;
};


export type MutationUpdateCallArgs = {
  updateCallInput: UpdateCallInput;
};


export type MutationAssignInstrumentsToCallArgs = {
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
};


export type MutationRemoveAssignedInstrumentFromCallArgs = {
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
};


export type MutationChangeProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
};


export type MutationAssignProposalsToInstrumentArgs = {
  proposals: Array<ProposalPkWithCallId>;
  instrumentId: Scalars['Int'];
};


export type MutationRemoveProposalsFromInstrumentArgs = {
  proposalPks: Array<Scalars['Int']>;
};


export type MutationAssignScientistsToInstrumentArgs = {
  scientistIds: Array<Scalars['Int']>;
  instrumentId: Scalars['Int'];
};


export type MutationRemoveScientistFromInstrumentArgs = {
  scientistId: Scalars['Int'];
  instrumentId: Scalars['Int'];
};


export type MutationCreateInstrumentArgs = {
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
};


export type MutationUpdateInstrumentArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
};


export type MutationSetInstrumentAvailabilityTimeArgs = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
  availabilityTime: Scalars['Int'];
};


export type MutationSubmitInstrumentArgs = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type MutationAdministrationProposalArgs = {
  proposalPk: Scalars['Int'];
  commentForUser?: Maybe<Scalars['String']>;
  commentForManagement?: Maybe<Scalars['String']>;
  finalStatus?: Maybe<ProposalEndStatus>;
  statusId?: Maybe<Scalars['Int']>;
  managementTimeAllocation?: Maybe<Scalars['Int']>;
  managementDecisionSubmitted?: Maybe<Scalars['Boolean']>;
};


export type MutationCloneProposalArgs = {
  cloneProposalInput: CloneProposalInput;
};


export type MutationUpdateProposalArgs = {
  proposalPk: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Scalars['Int']>>;
  proposerId?: Maybe<Scalars['Int']>;
};


export type MutationAddProposalWorkflowStatusArgs = {
  newProposalWorkflowStatusInput: AddProposalWorkflowStatusInput;
};


export type MutationAddStatusChangingEventsToConnectionArgs = {
  addStatusChangingEventsToConnectionInput: AddStatusChangingEventsToConnectionInput;
};


export type MutationCreateProposalStatusArgs = {
  newProposalStatusInput: CreateProposalStatusInput;
};


export type MutationCreateProposalWorkflowArgs = {
  newProposalWorkflowInput: CreateProposalWorkflowInput;
};


export type MutationDeleteProposalWorkflowStatusArgs = {
  deleteProposalWorkflowStatusInput: DeleteProposalWorkflowStatusInput;
};


export type MutationMoveProposalWorkflowStatusArgs = {
  moveProposalWorkflowStatusInput: MoveProposalWorkflowStatusInput;
};


export type MutationUpdateProposalStatusArgs = {
  updatedProposalStatusInput: UpdateProposalStatusInput;
};


export type MutationUpdateProposalWorkflowArgs = {
  updatedProposalWorkflowInput: UpdateProposalWorkflowInput;
};


export type MutationAnswerTopicArgs = {
  questionaryId: Scalars['Int'];
  topicId: Scalars['Int'];
  answers: Array<AnswerInput>;
  isPartialSave?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateQuestionaryArgs = {
  templateId: Scalars['Int'];
};


export type MutationUpdateAnswerArgs = {
  questionaryId: Scalars['Int'];
  answer: AnswerInput;
};


export type MutationAddReviewArgs = {
  reviewID: Scalars['Int'];
  comment: Scalars['String'];
  grade: Scalars['Int'];
  status: ReviewStatus;
  sepID: Scalars['Int'];
};


export type MutationAddUserForReviewArgs = {
  userID: Scalars['Int'];
  proposalPk: Scalars['Int'];
  sepID: Scalars['Int'];
};


export type MutationSubmitProposalsReviewArgs = {
  submitProposalsReviewInput: SubmitProposalsReviewInput;
};


export type MutationUpdateTechnicalReviewAssigneeArgs = {
  userId: Scalars['Int'];
  proposalPks: Array<Scalars['Int']>;
};


export type MutationCreateSampleArgs = {
  title: Scalars['String'];
  templateId: Scalars['Int'];
  proposalPk: Scalars['Int'];
  questionId: Scalars['String'];
};


export type MutationUpdateSampleArgs = {
  sampleId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  safetyComment?: Maybe<Scalars['String']>;
  safetyStatus?: Maybe<SampleStatus>;
};


export type MutationAssignChairOrSecretaryArgs = {
  assignChairOrSecretaryToSEPInput: AssignChairOrSecretaryToSepInput;
};


export type MutationAssignReviewersToSepArgs = {
  memberIds: Array<Scalars['Int']>;
  sepId: Scalars['Int'];
};


export type MutationRemoveMemberFromSepArgs = {
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  roleId: UserRole;
};


export type MutationAssignSepReviewersToProposalArgs = {
  memberIds: Array<Scalars['Int']>;
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
};


export type MutationRemoveMemberFromSepProposalArgs = {
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
};


export type MutationAssignProposalsToSepArgs = {
  proposals: Array<ProposalPkWithCallId>;
  sepId: Scalars['Int'];
};


export type MutationRemoveProposalsFromSepArgs = {
  proposalPks: Array<Scalars['Int']>;
  sepId: Scalars['Int'];
};


export type MutationCreateSepArgs = {
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired?: Maybe<Scalars['Int']>;
  active: Scalars['Boolean'];
};


export type MutationReorderSepMeetingDecisionProposalsArgs = {
  reorderSepMeetingDecisionProposalsInput: ReorderSepMeetingDecisionProposalsInput;
};


export type MutationSaveSepMeetingDecisionArgs = {
  saveSepMeetingDecisionInput: SaveSepMeetingDecisionInput;
};


export type MutationUpdateSepArgs = {
  id: Scalars['Int'];
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired?: Maybe<Scalars['Int']>;
  active: Scalars['Boolean'];
};


export type MutationUpdateSepTimeAllocationArgs = {
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
  sepTimeAllocation?: Maybe<Scalars['Int']>;
};


export type MutationCreateShipmentArgs = {
  title: Scalars['String'];
  proposalPk: Scalars['Int'];
  visitId: Scalars['Int'];
};


export type MutationUpdateShipmentArgs = {
  shipmentId: Scalars['Int'];
  proposalPk?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  status?: Maybe<ShipmentStatus>;
  externalRef?: Maybe<Scalars['String']>;
};


export type MutationCreateQuestionArgs = {
  categoryId: TemplateCategoryId;
  dataType: DataType;
};


export type MutationCreateQuestionTemplateRelationArgs = {
  templateId: Scalars['Int'];
  questionId: Scalars['String'];
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
};


export type MutationCreateTemplateArgs = {
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type MutationCreateTopicArgs = {
  templateId: Scalars['Int'];
  sortOrder?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['Int']>;
};


export type MutationDeleteQuestionTemplateRelationArgs = {
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
};


export type MutationSetActiveTemplateArgs = {
  templateCategoryId: TemplateCategoryId;
  templateId: Scalars['Int'];
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['String'];
  naturalKey?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  config?: Maybe<Scalars['String']>;
};


export type MutationUpdateQuestionTemplateRelationArgs = {
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
  topicId?: Maybe<Scalars['Int']>;
  sortOrder: Scalars['Int'];
  config?: Maybe<Scalars['String']>;
};


export type MutationUpdateQuestionTemplateRelationSettingsArgs = {
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
  config?: Maybe<Scalars['String']>;
  dependencies: Array<FieldDependencyInput>;
  dependenciesOperator?: Maybe<DependenciesLogicOperator>;
};


export type MutationUpdateTemplateArgs = {
  templateId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isArchived?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Int'];
  templateId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};


export type MutationAddUserRoleArgs = {
  userID: Scalars['Int'];
  roleID: Scalars['Int'];
};


export type MutationCreateUserByEmailInviteArgs = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  userRole: UserRole;
};


export type MutationCreateUserArgs = {
  user_title?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  middlename?: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  password: Scalars['String'];
  preferredname?: Maybe<Scalars['String']>;
  orcid: Scalars['String'];
  orcidHash: Scalars['String'];
  refreshToken: Scalars['String'];
  gender: Scalars['String'];
  nationality: Scalars['Int'];
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  telephone_alt?: Maybe<Scalars['String']>;
  otherOrganisation?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  user_title?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  middlename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  preferredname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['Int']>;
  birthdate?: Maybe<Scalars['String']>;
  organisation?: Maybe<Scalars['Int']>;
  department?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  telephone_alt?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['Int']>>;
  orcid?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserRolesArgs = {
  id: Scalars['Int'];
  roles?: Maybe<Array<Scalars['Int']>>;
};


export type MutationSetUserEmailVerifiedArgs = {
  id: Scalars['Int'];
};


export type MutationSetUserNotPlaceholderArgs = {
  id: Scalars['Int'];
};


export type MutationCreateVisitArgs = {
  proposalPk: Scalars['Int'];
  scheduledEventId: Scalars['Int'];
  team: Array<Scalars['Int']>;
  teamLeadUserId: Scalars['Int'];
};


export type MutationUpdateVisitArgs = {
  visitId: Scalars['Int'];
  status?: Maybe<VisitStatus>;
  proposalPkAndEventId?: Maybe<ProposalPkAndEventId>;
  team?: Maybe<Array<Scalars['Int']>>;
  teamLeadUserId?: Maybe<Scalars['Int']>;
};


export type MutationUpdateVisitRegistrationArgs = {
  visitId: Scalars['Int'];
  trainingExpiryDate?: Maybe<Scalars['DateTime']>;
  isRegistrationSubmitted?: Maybe<Scalars['Boolean']>;
};


export type MutationAddClientLogArgs = {
  error: Scalars['String'];
};


export type MutationAddSamplesToShipmentArgs = {
  shipmentId: Scalars['Int'];
  sampleIds: Array<Scalars['Int']>;
};


export type MutationAddTechnicalReviewArgs = {
  addTechnicalReviewInput: AddTechnicalReviewInput;
};


export type MutationCheckExternalTokenArgs = {
  externalToken: Scalars['String'];
};


export type MutationCloneSampleArgs = {
  sampleId: Scalars['Int'];
};


export type MutationCloneTemplateArgs = {
  templateId: Scalars['Int'];
};


export type MutationCreateProposalArgs = {
  callId: Scalars['Int'];
};


export type MutationCreateVisitRegistrationQuestionaryArgs = {
  visitId: Scalars['Int'];
};


export type MutationDeleteCallArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteInstrumentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProposalArgs = {
  proposalPk: Scalars['Int'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String'];
};


export type MutationDeleteSampleArgs = {
  sampleId: Scalars['Int'];
};


export type MutationDeleteSepArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteShipmentArgs = {
  shipmentId: Scalars['Int'];
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['Int'];
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['Int'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteVisitArgs = {
  visitId: Scalars['Int'];
};


export type MutationEmailVerificationArgs = {
  token: Scalars['String'];
};


export type MutationGetTokenForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNotifyProposalArgs = {
  proposalPk: Scalars['Int'];
};


export type MutationPrepareDbArgs = {
  includeSeeds?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveUserForReviewArgs = {
  sepId: Scalars['Int'];
  reviewId: Scalars['Int'];
};


export type MutationResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetPageContentArgs = {
  text: Scalars['String'];
  id: PageName;
};


export type MutationDeleteProposalStatusArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProposalWorkflowArgs = {
  id: Scalars['Int'];
};


export type MutationSubmitProposalArgs = {
  proposalPk: Scalars['Int'];
};


export type MutationSubmitShipmentArgs = {
  shipmentId: Scalars['Int'];
};


export type MutationSubmitTechnicalReviewArgs = {
  submitTechnicalReviewInput: SubmitTechnicalReviewInput;
};


export type MutationTokenArgs = {
  token: Scalars['String'];
};


export type MutationSelectRoleArgs = {
  token: Scalars['String'];
  selectedRoleId?: Maybe<Scalars['Int']>;
};


export type MutationUpdatePasswordArgs = {
  id: Scalars['Int'];
  password: Scalars['String'];
};


export type MutationCreateEquipmentArgs = {
  newEquipmentInput: EquipmentInput;
};


export type MutationUpdateEquipmentArgs = {
  updateEquipmentInput: EquipmentInput;
  id: Scalars['ID'];
};


export type MutationAssignToScheduledEventsArgs = {
  assignEquipmentsToScheduledEventInput: AssignEquipmentsToScheduledEventInput;
};


export type MutationDeleteEquipmentAssignmentArgs = {
  deleteEquipmentAssignmentInput: DeleteEquipmentAssignmentInput;
};


export type MutationConfirmEquipmentAssignmentArgs = {
  confirmEquipmentAssignmentInput: ConfirmEquipmentAssignmentInput;
};


export type MutationAddEquipmentResponsibleArgs = {
  equipmentResponsibleInput: EquipmentResponsibleInput;
};


export type MutationBulkUpsertLostTimesArgs = {
  bulkUpsertLostTimes: BulkUpsertLostTimesInput;
};


export type MutationCreateScheduledEventArgs = {
  newScheduledEvent: NewScheduledEventInput;
};


export type MutationBulkUpsertScheduledEventsArgs = {
  bulkUpsertScheduledEvents: BulkUpsertScheduledEventsInput;
};


export type MutationFinalizeProposalBookingArgs = {
  id: Scalars['ID'];
  action: ProposalBookingFinalizeAction;
};


export type MutationActivateProposalBookingArgs = {
  id: Scalars['ID'];
};


export type MutationResetSchedulerDbArgs = {
  includeSeeds?: Maybe<Scalars['Boolean']>;
};

export type NewScheduledEventInput = {
  bookingType: ScheduledEventBookingType;
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  description?: Maybe<Scalars['String']>;
  instrumentId: Scalars['ID'];
};

export type NextProposalStatus = {
  __typename?: 'NextProposalStatus';
  id: Maybe<Scalars['Int']>;
  shortCode: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  isDefault: Maybe<Scalars['Boolean']>;
};

export type NextProposalStatusResponseWrap = {
  __typename?: 'NextProposalStatusResponseWrap';
  rejection: Maybe<Rejection>;
  nextProposalStatus: Maybe<NextProposalStatus>;
};

export type NumberInputConfig = {
  __typename?: 'NumberInputConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  units: Maybe<Array<Scalars['String']>>;
  numberValueConstraint: Maybe<NumberValueConstraint>;
};

export enum NumberValueConstraint {
  NONE = 'NONE',
  ONLY_POSITIVE = 'ONLY_POSITIVE',
  ONLY_NEGATIVE = 'ONLY_NEGATIVE'
}

export type OrcIdInformation = {
  __typename?: 'OrcIDInformation';
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  orcid: Maybe<Scalars['String']>;
  orcidHash: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  id: Scalars['Int'];
  content: Maybe<Scalars['String']>;
};

export enum PageName {
  HOMEPAGE = 'HOMEPAGE',
  HELPPAGE = 'HELPPAGE',
  PRIVACYPAGE = 'PRIVACYPAGE',
  COOKIEPAGE = 'COOKIEPAGE',
  REVIEWPAGE = 'REVIEWPAGE',
  FOOTERCONTENT = 'FOOTERCONTENT'
}

export type PageResponseWrap = {
  __typename?: 'PageResponseWrap';
  rejection: Maybe<Rejection>;
  page: Maybe<Page>;
};

export type PermissionsWithAccessToken = {
  __typename?: 'PermissionsWithAccessToken';
  id: Scalars['String'];
  name: Scalars['String'];
  accessToken: Scalars['String'];
  accessPermissions: Scalars['String'];
};

export type PrepareDbResponseWrap = {
  __typename?: 'PrepareDBResponseWrap';
  rejection: Maybe<Rejection>;
  log: Maybe<Scalars['String']>;
};

export type Proposal = {
  __typename?: 'Proposal';
  primaryKey: Scalars['Int'];
  title: Scalars['String'];
  abstract: Scalars['String'];
  statusId: Scalars['Int'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  proposalId: Scalars['String'];
  finalStatus: Maybe<ProposalEndStatus>;
  callId: Scalars['Int'];
  questionaryId: Scalars['Int'];
  commentForUser: Maybe<Scalars['String']>;
  commentForManagement: Maybe<Scalars['String']>;
  notified: Scalars['Boolean'];
  submitted: Scalars['Boolean'];
  managementTimeAllocation: Maybe<Scalars['Int']>;
  managementDecisionSubmitted: Scalars['Boolean'];
  technicalReviewAssignee: Maybe<Scalars['Int']>;
  users: Array<BasicUserDetails>;
  proposer: Maybe<BasicUserDetails>;
  status: Maybe<ProposalStatus>;
  publicStatus: ProposalPublicStatus;
  reviews: Maybe<Array<Review>>;
  technicalReview: Maybe<TechnicalReview>;
  instrument: Maybe<Instrument>;
  sep: Maybe<Sep>;
  call: Maybe<Call>;
  questionary: Questionary;
  sepMeetingDecision: Maybe<SepMeetingDecision>;
  samples: Maybe<Array<Sample>>;
  visits: Maybe<Array<Visit>>;
  riskAssessmentQuestionary: Maybe<Questionary>;
  proposalBooking: Maybe<ProposalBooking>;
};


export type ProposalProposalBookingArgs = {
  filter?: Maybe<ProposalProposalBookingFilter>;
};

export type ProposalBasisConfig = {
  __typename?: 'ProposalBasisConfig';
  tooltip: Scalars['String'];
};

export type ProposalBooking = {
  __typename?: 'ProposalBooking';
  id: Scalars['ID'];
  call: Maybe<Call>;
  proposal: Maybe<Proposal>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  status: ProposalBookingStatus;
  allocatedTime: Scalars['Int'];
  instrument: Maybe<Instrument>;
  scheduledEvents: Array<ScheduledEvent>;
};


export type ProposalBookingScheduledEventsArgs = {
  filter: ProposalBookingScheduledEventFilter;
};

export enum ProposalBookingFinalizeAction {
  CLOSE = 'CLOSE',
  RESTART = 'RESTART'
}

export type ProposalBookingResponseWrap = {
  __typename?: 'ProposalBookingResponseWrap';
  error: Maybe<Scalars['String']>;
  proposalBooking: Maybe<ProposalBooking>;
};

export type ProposalBookingScheduledEventFilter = {
  bookingType?: Maybe<ScheduledEventBookingType>;
  endsAfter?: Maybe<Scalars['TzLessDateTime']>;
  endsBefore?: Maybe<Scalars['TzLessDateTime']>;
};

export enum ProposalBookingStatus {
  DRAFT = 'DRAFT',
  BOOKED = 'BOOKED',
  CLOSED = 'CLOSED'
}

export enum ProposalEndStatus {
  UNSET = 'UNSET',
  ACCEPTED = 'ACCEPTED',
  RESERVED = 'RESERVED',
  REJECTED = 'REJECTED'
}

export type ProposalEvent = {
  __typename?: 'ProposalEvent';
  name: Event;
  description: Maybe<Scalars['String']>;
};

export type ProposalPkAndEventId = {
  proposalPK: Scalars['Int'];
  scheduledEventId: Scalars['Int'];
};

export type ProposalPkWithCallId = {
  primaryKey: Scalars['Int'];
  callId: Scalars['Int'];
};

export type ProposalPkWithRankOrder = {
  proposalPk: Scalars['Int'];
  rankOrder: Scalars['Int'];
};

export type ProposalPkWithReviewId = {
  proposalPk: Scalars['Int'];
  reviewId: Scalars['Int'];
};

export type ProposalProposalBookingFilter = {
  status?: Maybe<Array<ProposalBookingStatus>>;
};

export enum ProposalPublicStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  UNKNOWN = 'unknown',
  RESERVED = 'reserved'
}

export type ProposalResponseWrap = {
  __typename?: 'ProposalResponseWrap';
  rejection: Maybe<Rejection>;
  proposal: Maybe<Proposal>;
};

export type ProposalStatus = {
  __typename?: 'ProposalStatus';
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  isDefault: Scalars['Boolean'];
};

export type ProposalStatusChangingEventResponseWrap = {
  __typename?: 'ProposalStatusChangingEventResponseWrap';
  rejection: Maybe<Rejection>;
  statusChangingEvents: Maybe<Array<StatusChangingEvent>>;
};

export type ProposalStatusResponseWrap = {
  __typename?: 'ProposalStatusResponseWrap';
  rejection: Maybe<Rejection>;
  proposalStatus: Maybe<ProposalStatus>;
};

export type ProposalTemplate = {
  __typename?: 'ProposalTemplate';
  templateId: Scalars['Int'];
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  isArchived: Scalars['Boolean'];
  steps: Array<TemplateStep>;
  complementaryQuestions: Array<Question>;
  questionaryCount: Scalars['Int'];
  callCount: Scalars['Int'];
};

export type ProposalTemplatesFilter = {
  isArchived?: Maybe<Scalars['Boolean']>;
  templateIds?: Maybe<Array<Scalars['Int']>>;
};

export type ProposalView = {
  __typename?: 'ProposalView';
  primaryKey: Scalars['Int'];
  title: Scalars['String'];
  statusId: Scalars['Int'];
  statusName: Scalars['String'];
  statusDescription: Scalars['String'];
  proposalId: Scalars['String'];
  rankOrder: Maybe<Scalars['Int']>;
  finalStatus: Maybe<ProposalEndStatus>;
  notified: Scalars['Boolean'];
  submitted: Scalars['Boolean'];
  timeAllocation: Maybe<Scalars['Int']>;
  technicalStatus: Maybe<TechnicalReviewStatus>;
  instrumentName: Maybe<Scalars['String']>;
  callShortCode: Maybe<Scalars['String']>;
  sepCode: Maybe<Scalars['String']>;
  sepId: Maybe<Scalars['Int']>;
  reviewAverage: Maybe<Scalars['Float']>;
  reviewDeviation: Maybe<Scalars['Float']>;
  instrumentId: Maybe<Scalars['Int']>;
  callId: Scalars['Int'];
  allocationTimeUnit: AllocationTimeUnits;
};

export type ProposalWorkflow = {
  __typename?: 'ProposalWorkflow';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  proposalWorkflowConnectionGroups: Array<ProposalWorkflowConnectionGroup>;
};

export type ProposalWorkflowConnection = {
  __typename?: 'ProposalWorkflowConnection';
  id: Scalars['Int'];
  sortOrder: Scalars['Int'];
  proposalWorkflowId: Scalars['Int'];
  proposalStatusId: Scalars['Int'];
  proposalStatus: ProposalStatus;
  nextProposalStatusId: Maybe<Scalars['Int']>;
  prevProposalStatusId: Maybe<Scalars['Int']>;
  droppableGroupId: Scalars['String'];
  statusChangingEvents: Maybe<Array<StatusChangingEvent>>;
};

export type ProposalWorkflowConnectionGroup = {
  __typename?: 'ProposalWorkflowConnectionGroup';
  groupId: Scalars['String'];
  parentGroupId: Maybe<Scalars['String']>;
  connections: Array<ProposalWorkflowConnection>;
};

export type ProposalWorkflowConnectionResponseWrap = {
  __typename?: 'ProposalWorkflowConnectionResponseWrap';
  rejection: Maybe<Rejection>;
  proposalWorkflowConnection: Maybe<ProposalWorkflowConnection>;
};

export type ProposalWorkflowResponseWrap = {
  __typename?: 'ProposalWorkflowResponseWrap';
  rejection: Maybe<Rejection>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
};

export type ProposalsFilter = {
  text?: Maybe<Scalars['String']>;
  questionaryIds?: Maybe<Array<Scalars['Int']>>;
  callId?: Maybe<Scalars['Int']>;
  instrumentId?: Maybe<Scalars['Int']>;
  proposalStatusId?: Maybe<Scalars['Int']>;
  shortCodes?: Maybe<Array<Scalars['String']>>;
  questionFilter?: Maybe<QuestionFilterInput>;
};

export type ProposalsQueryResult = {
  __typename?: 'ProposalsQueryResult';
  totalCount: Scalars['Int'];
  proposals: Array<Proposal>;
};

export type ProposalsResponseWrap = {
  __typename?: 'ProposalsResponseWrap';
  rejection: Maybe<Rejection>;
  proposals: Array<Proposal>;
};

export type QueriesAndMutations = {
  __typename?: 'QueriesAndMutations';
  queries: Array<Scalars['String']>;
  mutations: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  calls: Maybe<Array<Call>>;
  callsByInstrumentScientist: Maybe<Array<Call>>;
  proposals: Maybe<ProposalsQueryResult>;
  instrumentScientistProposals: Maybe<ProposalsQueryResult>;
  shipments: Maybe<Array<Shipment>>;
  questions: Array<QuestionWithUsage>;
  templates: Maybe<Array<Template>>;
  visits: Array<Visit>;
  myVisits: Array<Visit>;
  activeTemplateId: Maybe<Scalars['Int']>;
  basicUserDetails: Maybe<BasicUserDetails>;
  blankQuestionarySteps: Maybe<Array<QuestionaryStep>>;
  call: Maybe<Call>;
  checkEmailExist: Maybe<Scalars['Boolean']>;
  eventLogs: Maybe<Array<EventLog>>;
  features: Array<Feature>;
  fileMetadata: Maybe<Array<FileMetadata>>;
  allAccessTokensAndPermissions: Maybe<Array<PermissionsWithAccessToken>>;
  queriesAndMutations: Maybe<QueriesAndMutations>;
  accessTokenAndPermissions: Maybe<PermissionsWithAccessToken>;
  getFields: Maybe<Fields>;
  getOrcIDInformation: Maybe<OrcIdInformation>;
  getPageContent: Maybe<Scalars['String']>;
  institutions: Maybe<Array<Institution>>;
  instrument: Maybe<Instrument>;
  instruments: Maybe<InstrumentsQueryResult>;
  instrumentsBySep: Maybe<Array<InstrumentWithAvailabilityTime>>;
  userInstruments: Maybe<InstrumentsQueryResult>;
  instrumentScientistHasInstrument: Maybe<Scalars['Boolean']>;
  instrumentScientistHasAccess: Maybe<Scalars['Boolean']>;
  isNaturalKeyPresent: Maybe<Scalars['Boolean']>;
  myShipments: Maybe<Array<Shipment>>;
  proposal: Maybe<Proposal>;
  userHasAccessToProposal: Maybe<Scalars['Boolean']>;
  proposalStatus: Maybe<ProposalStatus>;
  proposalStatuses: Maybe<Array<ProposalStatus>>;
  proposalsView: Maybe<Array<ProposalView>>;
  proposalTemplates: Maybe<Array<ProposalTemplate>>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
  proposalWorkflows: Maybe<Array<ProposalWorkflow>>;
  proposalEvents: Maybe<Array<ProposalEvent>>;
  questionary: Maybe<Questionary>;
  review: Maybe<Review>;
  proposalReviews: Maybe<Array<Review>>;
  roles: Maybe<Array<Role>>;
  sample: Maybe<Sample>;
  samplesByCallId: Maybe<Array<Sample>>;
  samples: Maybe<Array<Sample>>;
  sep: Maybe<Sep>;
  sepMembers: Maybe<Array<SepReviewer>>;
  sepReviewers: Maybe<Array<SepReviewer>>;
  sepProposals: Maybe<Array<SepProposal>>;
  sepProposal: Maybe<SepProposal>;
  sepProposalsByInstrument: Maybe<Array<SepProposal>>;
  seps: Maybe<SePsQueryResult>;
  settings: Array<Settings>;
  shipment: Maybe<Shipment>;
  version: Scalars['String'];
  factoryVersion: Scalars['String'];
  templateCategories: Maybe<Array<TemplateCategory>>;
  template: Maybe<Template>;
  checkToken: TokenResult;
  units: Maybe<Array<Unit>>;
  user: Maybe<User>;
  me: Maybe<User>;
  users: Maybe<UserQueryResult>;
  visitRegistration: Maybe<VisitRegistration>;
  visit: Maybe<Visit>;
  scheduledEvents: Array<ScheduledEvent>;
  scheduledEvent: Maybe<ScheduledEvent>;
  proposalBookingScheduledEvents: Array<ScheduledEvent>;
  proposalBookingScheduledEvent: Maybe<ScheduledEvent>;
  equipments: Array<Equipment>;
  availableEquipments: Array<Equipment>;
  equipment: Maybe<Equipment>;
  proposalBookingLostTimes: Array<LostTime>;
  instrumentProposalBookings: Array<ProposalBooking>;
  proposalBooking: Maybe<ProposalBooking>;
  healthCheck: HealthStats;
  schedulerConfig: SchedulerConfig;
  schedulerVersion: Scalars['String'];
};


export type QueryCallsArgs = {
  filter?: Maybe<CallsFilter>;
};


export type QueryCallsByInstrumentScientistArgs = {
  scientistId: Scalars['Int'];
};


export type QueryProposalsArgs = {
  filter?: Maybe<ProposalsFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryInstrumentScientistProposalsArgs = {
  filter?: Maybe<ProposalsFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryShipmentsArgs = {
  filter?: Maybe<ShipmentsFilter>;
};


export type QueryQuestionsArgs = {
  filter?: Maybe<QuestionsFilter>;
};


export type QueryTemplatesArgs = {
  filter?: Maybe<TemplatesFilter>;
};


export type QueryVisitsArgs = {
  filter?: Maybe<VisitsFilter>;
};


export type QueryActiveTemplateIdArgs = {
  templateCategoryId: TemplateCategoryId;
};


export type QueryBasicUserDetailsArgs = {
  id: Scalars['Int'];
};


export type QueryBlankQuestionaryStepsArgs = {
  templateId: Scalars['Int'];
};


export type QueryCallArgs = {
  id: Scalars['Int'];
};


export type QueryCheckEmailExistArgs = {
  email: Scalars['String'];
};


export type QueryEventLogsArgs = {
  changedObjectId: Scalars['String'];
  eventType: Scalars['String'];
};


export type QueryFileMetadataArgs = {
  fileIds: Array<Scalars['String']>;
};


export type QueryAccessTokenAndPermissionsArgs = {
  accessTokenId: Scalars['String'];
};


export type QueryGetOrcIdInformationArgs = {
  authorizationCode: Scalars['String'];
};


export type QueryGetPageContentArgs = {
  id: PageName;
};


export type QueryInstitutionsArgs = {
  filter?: Maybe<InstitutionsFilter>;
};


export type QueryInstrumentArgs = {
  instrumentId: Scalars['Int'];
};


export type QueryInstrumentsArgs = {
  callIds?: Maybe<Array<Scalars['Int']>>;
};


export type QueryInstrumentsBySepArgs = {
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QueryInstrumentScientistHasInstrumentArgs = {
  instrumentId: Scalars['Int'];
};


export type QueryInstrumentScientistHasAccessArgs = {
  proposalPk: Scalars['Int'];
  instrumentId: Scalars['Int'];
};


export type QueryIsNaturalKeyPresentArgs = {
  naturalKey: Scalars['String'];
};


export type QueryProposalArgs = {
  primaryKey: Scalars['Int'];
};


export type QueryUserHasAccessToProposalArgs = {
  proposalPk: Scalars['Int'];
};


export type QueryProposalStatusArgs = {
  id: Scalars['Int'];
};


export type QueryProposalsViewArgs = {
  filter?: Maybe<ProposalsFilter>;
};


export type QueryProposalTemplatesArgs = {
  filter?: Maybe<ProposalTemplatesFilter>;
};


export type QueryProposalWorkflowArgs = {
  id: Scalars['Int'];
};


export type QueryQuestionaryArgs = {
  questionaryId: Scalars['Int'];
};


export type QueryReviewArgs = {
  sepId?: Maybe<Scalars['Int']>;
  reviewId: Scalars['Int'];
};


export type QueryProposalReviewsArgs = {
  proposalPk: Scalars['Int'];
};


export type QuerySampleArgs = {
  sampleId: Scalars['Int'];
};


export type QuerySamplesByCallIdArgs = {
  callId: Scalars['Int'];
};


export type QuerySamplesArgs = {
  filter?: Maybe<SamplesFilter>;
};


export type QuerySepArgs = {
  id: Scalars['Int'];
};


export type QuerySepMembersArgs = {
  sepId: Scalars['Int'];
};


export type QuerySepReviewersArgs = {
  sepId: Scalars['Int'];
};


export type QuerySepProposalsArgs = {
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QuerySepProposalArgs = {
  proposalPk: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QuerySepProposalsByInstrumentArgs = {
  callId: Scalars['Int'];
  instrumentId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QuerySepsArgs = {
  active?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryShipmentArgs = {
  shipmentId: Scalars['Int'];
};


export type QueryTemplateArgs = {
  templateId: Scalars['Int'];
};


export type QueryCheckTokenArgs = {
  token: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  userRole?: Maybe<UserRole>;
  subtractUsers?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryVisitRegistrationArgs = {
  visitId: Scalars['Int'];
};


export type QueryVisitArgs = {
  visitId: Scalars['Int'];
};


export type QueryScheduledEventsArgs = {
  filter: ScheduledEventFilter;
};


export type QueryScheduledEventArgs = {
  id: Scalars['ID'];
};


export type QueryProposalBookingScheduledEventsArgs = {
  proposalBookingId: Scalars['ID'];
};


export type QueryProposalBookingScheduledEventArgs = {
  scheduledEventId: Scalars['ID'];
  proposalBookingId: Scalars['ID'];
};


export type QueryEquipmentsArgs = {
  equipmentIds?: Maybe<Array<Scalars['Int']>>;
};


export type QueryAvailableEquipmentsArgs = {
  scheduledEventId: Scalars['ID'];
};


export type QueryEquipmentArgs = {
  id: Scalars['ID'];
};


export type QueryProposalBookingLostTimesArgs = {
  proposalBookingId: Scalars['ID'];
};


export type QueryInstrumentProposalBookingsArgs = {
  instrumentId: Scalars['ID'];
};


export type QueryProposalBookingArgs = {
  id: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['String'];
  categoryId: TemplateCategoryId;
  naturalKey: Scalars['String'];
  dataType: DataType;
  question: Scalars['String'];
  config: FieldConfig;
};

export enum QuestionFilterCompareOperator {
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  EQUALS = 'EQUALS',
  INCLUDES = 'INCLUDES',
  EXISTS = 'EXISTS'
}

export type QuestionFilterInput = {
  questionId: Scalars['String'];
  value: Scalars['String'];
  compareOperator: QuestionFilterCompareOperator;
  dataType: DataType;
};

export type QuestionResponseWrap = {
  __typename?: 'QuestionResponseWrap';
  rejection: Maybe<Rejection>;
  question: Maybe<Question>;
};

export type QuestionTemplateRelation = {
  __typename?: 'QuestionTemplateRelation';
  question: Question;
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator: Maybe<DependenciesLogicOperator>;
};

export type QuestionWithUsage = {
  __typename?: 'QuestionWithUsage';
  id: Scalars['String'];
  categoryId: TemplateCategoryId;
  naturalKey: Scalars['String'];
  dataType: DataType;
  question: Scalars['String'];
  config: FieldConfig;
  answers: Array<AnswerBasic>;
  templates: Array<Template>;
};

export type Questionary = {
  __typename?: 'Questionary';
  questionaryId: Scalars['Int'];
  templateId: Scalars['Int'];
  created: Scalars['DateTime'];
  steps: Array<QuestionaryStep>;
  isCompleted: Scalars['Boolean'];
};

export type QuestionaryResponseWrap = {
  __typename?: 'QuestionaryResponseWrap';
  rejection: Maybe<Rejection>;
  questionary: Maybe<Questionary>;
};

export type QuestionaryStep = {
  __typename?: 'QuestionaryStep';
  topic: Topic;
  isCompleted: Scalars['Boolean'];
  fields: Array<Answer>;
};

export type QuestionaryStepResponseWrap = {
  __typename?: 'QuestionaryStepResponseWrap';
  rejection: Maybe<Rejection>;
  questionaryStep: Maybe<QuestionaryStep>;
};

export type QuestionsFilter = {
  text?: Maybe<Scalars['String']>;
  category?: Maybe<TemplateCategoryId>;
  dataType?: Maybe<Array<DataType>>;
  excludeDataType?: Maybe<Array<DataType>>;
};

export type Rejection = {
  __typename?: 'Rejection';
  reason: Scalars['String'];
  context: Maybe<Scalars['String']>;
  exception: Maybe<Scalars['String']>;
};

export type RemoveAssignedInstrumentFromCallInput = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
};

export type ReorderSepMeetingDecisionProposalsInput = {
  proposals: Array<ProposalPkWithRankOrder>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  userID: Scalars['Int'];
  comment: Maybe<Scalars['String']>;
  grade: Maybe<Scalars['Int']>;
  status: ReviewStatus;
  sepID: Scalars['Int'];
  reviewer: Maybe<BasicUserDetails>;
  proposal: Maybe<Proposal>;
};

export type ReviewResponseWrap = {
  __typename?: 'ReviewResponseWrap';
  rejection: Maybe<Rejection>;
  review: Maybe<Review>;
};

export enum ReviewStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type ReviewWithNextProposalStatus = {
  __typename?: 'ReviewWithNextProposalStatus';
  id: Scalars['Int'];
  userID: Scalars['Int'];
  comment: Maybe<Scalars['String']>;
  grade: Maybe<Scalars['Int']>;
  status: ReviewStatus;
  sepID: Scalars['Int'];
  reviewer: Maybe<BasicUserDetails>;
  proposal: Maybe<Proposal>;
  nextProposalStatus: Maybe<NextProposalStatus>;
};

export type ReviewWithNextStatusResponseWrap = {
  __typename?: 'ReviewWithNextStatusResponseWrap';
  rejection: Maybe<Rejection>;
  review: Maybe<ReviewWithNextProposalStatus>;
};

export enum ReviewerFilter {
  YOU = 'YOU',
  ALL = 'ALL'
}

export type RichTextInputConfig = {
  __typename?: 'RichTextInputConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  max: Maybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  title: Scalars['String'];
};

export type Sep = {
  __typename?: 'SEP';
  id: Scalars['Int'];
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired: Scalars['Float'];
  active: Scalars['Boolean'];
  sepChair: Maybe<BasicUserDetails>;
  sepSecretary: Maybe<BasicUserDetails>;
};

export type SepAssignment = {
  __typename?: 'SEPAssignment';
  proposalPk: Scalars['Int'];
  sepMemberUserId: Maybe<Scalars['Int']>;
  sepId: Scalars['Int'];
  dateAssigned: Scalars['DateTime'];
  reassigned: Scalars['Boolean'];
  dateReassigned: Maybe<Scalars['DateTime']>;
  emailSent: Scalars['Boolean'];
  proposal: Proposal;
  role: Maybe<Role>;
  user: Maybe<BasicUserDetails>;
  review: Maybe<Review>;
};

export type SepProposal = {
  __typename?: 'SEPProposal';
  proposalPk: Scalars['Int'];
  sepId: Scalars['Int'];
  dateAssigned: Scalars['DateTime'];
  sepTimeAllocation: Maybe<Scalars['Int']>;
  proposal: Proposal;
  assignments: Maybe<Array<SepAssignment>>;
  instrumentSubmitted: Scalars['Boolean'];
};

export type SepProposalResponseWrap = {
  __typename?: 'SEPProposalResponseWrap';
  rejection: Maybe<Rejection>;
  sepProposal: Maybe<SepProposal>;
};

export type SepResponseWrap = {
  __typename?: 'SEPResponseWrap';
  rejection: Maybe<Rejection>;
  sep: Maybe<Sep>;
};

export type SepReviewer = {
  __typename?: 'SEPReviewer';
  userId: Scalars['Int'];
  sepId: Scalars['Int'];
  role: Maybe<Role>;
  user: BasicUserDetails;
};

export type SePsQueryResult = {
  __typename?: 'SEPsQueryResult';
  totalCount: Scalars['Int'];
  seps: Array<Sep>;
};

export type Sample = {
  __typename?: 'Sample';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  questionaryId: Scalars['Int'];
  proposalPk: Scalars['Int'];
  questionId: Scalars['String'];
  safetyStatus: SampleStatus;
  safetyComment: Scalars['String'];
  created: Scalars['DateTime'];
  questionary: Questionary;
  proposal: Proposal;
};

export type SampleBasisConfig = {
  __typename?: 'SampleBasisConfig';
  titlePlaceholder: Scalars['String'];
};

export type SampleResponseWrap = {
  __typename?: 'SampleResponseWrap';
  rejection: Maybe<Rejection>;
  sample: Maybe<Sample>;
};

export enum SampleStatus {
  PENDING_EVALUATION = 'PENDING_EVALUATION',
  LOW_RISK = 'LOW_RISK',
  ELEVATED_RISK = 'ELEVATED_RISK',
  HIGH_RISK = 'HIGH_RISK'
}

export type SamplesFilter = {
  title?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['Int']>;
  questionaryIds?: Maybe<Array<Scalars['Int']>>;
  sampleIds?: Maybe<Array<Scalars['Int']>>;
  status?: Maybe<SampleStatus>;
  questionId?: Maybe<Scalars['String']>;
  proposalPk?: Maybe<Scalars['Int']>;
};

export type SaveSepMeetingDecisionInput = {
  proposalPk: Scalars['Int'];
  commentForUser?: Maybe<Scalars['String']>;
  commentForManagement?: Maybe<Scalars['String']>;
  recommendation?: Maybe<ProposalEndStatus>;
  rankOrder?: Maybe<Scalars['Int']>;
  submitted?: Maybe<Scalars['Boolean']>;
};

export type ScheduledEvent = {
  __typename?: 'ScheduledEvent';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bookingType: ScheduledEventBookingType;
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  proposalBookingId: Maybe<Scalars['Int']>;
  scheduledBy: Maybe<User>;
  description: Maybe<Scalars['String']>;
  instrument: Maybe<Instrument>;
  equipmentId: Maybe<Scalars['Int']>;
  equipments: Array<EquipmentWithAssignmentStatus>;
  equipmentAssignmentStatus: Maybe<EquipmentAssignmentStatus>;
  proposalBooking: Maybe<ProposalBooking>;
  visit: Maybe<Visit>;
};

export enum ScheduledEventBookingType {
  USER_OPERATIONS = 'USER_OPERATIONS',
  MAINTENANCE = 'MAINTENANCE',
  SHUTDOWN = 'SHUTDOWN',
  COMMISSIONING = 'COMMISSIONING',
  EQUIPMENT = 'EQUIPMENT'
}

export type ScheduledEventFilter = {
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  instrumentId?: Maybe<Scalars['ID']>;
};

export type ScheduledEventResponseWrap = {
  __typename?: 'ScheduledEventResponseWrap';
  error: Maybe<Scalars['String']>;
  scheduledEvent: Maybe<ScheduledEvent>;
};

export type ScheduledEventsResponseWrap = {
  __typename?: 'ScheduledEventsResponseWrap';
  error: Maybe<Scalars['String']>;
  scheduledEvent: Maybe<Array<ScheduledEvent>>;
};

export type SchedulerConfig = {
  __typename?: 'SchedulerConfig';
  authRedirect: Scalars['String'];
};

export type SelectionFromOptionsConfig = {
  __typename?: 'SelectionFromOptionsConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  variant: Scalars['String'];
  options: Array<Scalars['String']>;
  isMultipleSelect: Scalars['Boolean'];
};

export type SepMeetingDecision = {
  __typename?: 'SepMeetingDecision';
  proposalPk: Scalars['Int'];
  recommendation: Maybe<ProposalEndStatus>;
  commentForManagement: Maybe<Scalars['String']>;
  commentForUser: Maybe<Scalars['String']>;
  rankOrder: Maybe<Scalars['Int']>;
  submitted: Scalars['Boolean'];
  submittedBy: Maybe<Scalars['Int']>;
};

export type SepMeetingDecisionResponseWrap = {
  __typename?: 'SepMeetingDecisionResponseWrap';
  rejection: Maybe<Rejection>;
  sepMeetingDecision: Maybe<SepMeetingDecision>;
};

export type Settings = {
  __typename?: 'Settings';
  id: SettingsId;
  settingsValue: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export enum SettingsId {
  EXTERNAL_AUTH_LOGIN_URL = 'EXTERNAL_AUTH_LOGIN_URL',
  PROFILE_PAGE_LINK = 'PROFILE_PAGE_LINK',
  PALETTE_PRIMARY_DARK = 'PALETTE_PRIMARY_DARK',
  PALETTE_PRIMARY_MAIN = 'PALETTE_PRIMARY_MAIN',
  PALETTE_PRIMARY_LIGHT = 'PALETTE_PRIMARY_LIGHT',
  PALETTE_PRIMARY_CONTRAST = 'PALETTE_PRIMARY_CONTRAST',
  PALETTE_SECONDARY_DARK = 'PALETTE_SECONDARY_DARK',
  PALETTE_SECONDARY_MAIN = 'PALETTE_SECONDARY_MAIN',
  PALETTE_SECONDARY_LIGHT = 'PALETTE_SECONDARY_LIGHT',
  PALETTE_SECONDARY_CONTRAST = 'PALETTE_SECONDARY_CONTRAST',
  PALETTE_ERROR_MAIN = 'PALETTE_ERROR_MAIN',
  PALETTE_SUCCESS_MAIN = 'PALETTE_SUCCESS_MAIN',
  PALETTE_WARNING_MAIN = 'PALETTE_WARNING_MAIN',
  PALETTE_INFO_MAIN = 'PALETTE_INFO_MAIN',
  HEADER_LOGO_FILENAME = 'HEADER_LOGO_FILENAME'
}

export type Shipment = {
  __typename?: 'Shipment';
  id: Scalars['Int'];
  title: Scalars['String'];
  proposalPk: Scalars['Int'];
  status: ShipmentStatus;
  externalRef: Maybe<Scalars['String']>;
  questionaryId: Scalars['Int'];
  visitId: Scalars['Int'];
  creatorId: Scalars['Int'];
  created: Scalars['DateTime'];
  questionary: Questionary;
  samples: Array<Sample>;
  proposal: Proposal;
};

export type ShipmentBasisConfig = {
  __typename?: 'ShipmentBasisConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
};

export type ShipmentResponseWrap = {
  __typename?: 'ShipmentResponseWrap';
  rejection: Maybe<Rejection>;
  shipment: Maybe<Shipment>;
};

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type ShipmentsFilter = {
  title?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['Int']>;
  proposalPk?: Maybe<Scalars['Int']>;
  questionaryIds?: Maybe<Array<Scalars['Int']>>;
  status?: Maybe<ShipmentStatus>;
  externalRef?: Maybe<Scalars['String']>;
  shipmentIds?: Maybe<Array<Scalars['Int']>>;
  visitId?: Maybe<Scalars['Int']>;
};

export type SimpleLostTimeInput = {
  id: Scalars['ID'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  newlyCreated?: Maybe<Scalars['Boolean']>;
};

export type SimpleScheduledEventInput = {
  id: Scalars['ID'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  newlyCreated?: Maybe<Scalars['Boolean']>;
};

export type StatusChangingEvent = {
  __typename?: 'StatusChangingEvent';
  statusChangingEventId: Scalars['Int'];
  proposalWorkflowConnectionId: Scalars['Int'];
  statusChangingEvent: Scalars['String'];
};

export type SubTemplateConfig = {
  __typename?: 'SubTemplateConfig';
  minEntries: Maybe<Scalars['Int']>;
  maxEntries: Maybe<Scalars['Int']>;
  templateId: Maybe<Scalars['Int']>;
  templateCategory: Scalars['String'];
  addEntryButtonLabel: Scalars['String'];
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
};

export type SubmitProposalsReviewInput = {
  proposals: Array<ProposalPkWithReviewId>;
};

export type SubmitTechnicalReviewInput = {
  proposalPk: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  publicComment?: Maybe<Scalars['String']>;
  timeAllocation?: Maybe<Scalars['Int']>;
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean'];
  reviewerId: Scalars['Int'];
};

export type SuccessResponseWrap = {
  __typename?: 'SuccessResponseWrap';
  rejection: Maybe<Rejection>;
  isSuccess: Maybe<Scalars['Boolean']>;
};

export type TechnicalReview = {
  __typename?: 'TechnicalReview';
  id: Scalars['Int'];
  proposalPk: Scalars['Int'];
  comment: Maybe<Scalars['String']>;
  publicComment: Maybe<Scalars['String']>;
  timeAllocation: Maybe<Scalars['Int']>;
  status: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean'];
  reviewerId: Scalars['Int'];
  proposal: Maybe<Proposal>;
  reviewer: Maybe<BasicUserDetails>;
};

export type TechnicalReviewResponseWrap = {
  __typename?: 'TechnicalReviewResponseWrap';
  rejection: Maybe<Rejection>;
  technicalReview: Maybe<TechnicalReview>;
};

export enum TechnicalReviewStatus {
  FEASIBLE = 'FEASIBLE',
  PARTIALLY_FEASIBLE = 'PARTIALLY_FEASIBLE',
  UNFEASIBLE = 'UNFEASIBLE'
}

export type Template = {
  __typename?: 'Template';
  templateId: Scalars['Int'];
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  isArchived: Scalars['Boolean'];
  steps: Array<TemplateStep>;
  complementaryQuestions: Array<Question>;
  questionaryCount: Scalars['Int'];
};

export type TemplateCategory = {
  __typename?: 'TemplateCategory';
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
};

export enum TemplateCategoryId {
  PROPOSAL_QUESTIONARY = 'PROPOSAL_QUESTIONARY',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION',
  SHIPMENT_DECLARATION = 'SHIPMENT_DECLARATION',
  VISIT = 'VISIT'
}

export type TemplateResponseWrap = {
  __typename?: 'TemplateResponseWrap';
  rejection: Maybe<Rejection>;
  template: Maybe<Template>;
};

export type TemplateStep = {
  __typename?: 'TemplateStep';
  topic: Topic;
  fields: Array<QuestionTemplateRelation>;
};

export type TemplatesFilter = {
  isArchived?: Maybe<Scalars['Boolean']>;
  category?: Maybe<TemplateCategoryId>;
  templateIds?: Maybe<Array<Scalars['Int']>>;
};

export type TextInputConfig = {
  __typename?: 'TextInputConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
  multiline: Scalars['Boolean'];
  placeholder: Scalars['String'];
  htmlQuestion: Maybe<Scalars['String']>;
  isHtmlQuestion: Scalars['Boolean'];
  isCounterHidden: Scalars['Boolean'];
};

export type TokenPayloadUnion = AuthJwtPayload | AuthJwtApiTokenPayload;

export type TokenResponseWrap = {
  __typename?: 'TokenResponseWrap';
  rejection: Maybe<Rejection>;
  token: Maybe<Scalars['String']>;
};

export type TokenResult = {
  __typename?: 'TokenResult';
  isValid: Scalars['Boolean'];
  payload: Maybe<TokenPayloadUnion>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['Int'];
  title: Scalars['String'];
  templateId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  isEnabled: Scalars['Boolean'];
};


export type Unit = {
  __typename?: 'Unit';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UnitResponseWrap = {
  __typename?: 'UnitResponseWrap';
  rejection: Maybe<Rejection>;
  unit: Maybe<Unit>;
};

export type UpdateAnswerResponseWrap = {
  __typename?: 'UpdateAnswerResponseWrap';
  rejection: Maybe<Rejection>;
  questionId: Maybe<Scalars['String']>;
};

export type UpdateApiAccessTokenInput = {
  accessTokenId: Scalars['String'];
  name: Scalars['String'];
  accessPermissions: Scalars['String'];
};

export type UpdateCallInput = {
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  referenceNumberFormat?: Maybe<Scalars['String']>;
  proposalSequence?: Maybe<Scalars['Int']>;
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  allocationTimeUnit: AllocationTimeUnits;
  proposalWorkflowId: Scalars['Int'];
  callEnded?: Maybe<Scalars['Int']>;
  callReviewEnded?: Maybe<Scalars['Int']>;
  callSEPReviewEnded?: Maybe<Scalars['Int']>;
  templateId: Scalars['Int'];
};

export type UpdateProposalStatusInput = {
  id: Scalars['Int'];
  shortCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
};

export type UpdateProposalWorkflowInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  user_title: Scalars['String'];
  firstname: Scalars['String'];
  middlename: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  username: Scalars['String'];
  preferredname: Maybe<Scalars['String']>;
  orcid: Scalars['String'];
  refreshToken: Scalars['String'];
  gender: Scalars['String'];
  nationality: Maybe<Scalars['Int']>;
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  telephone: Scalars['String'];
  telephone_alt: Maybe<Scalars['String']>;
  placeholder: Scalars['Boolean'];
  created: Scalars['String'];
  updated: Scalars['String'];
  roles: Array<Role>;
  reviews: Array<Review>;
  proposals: Array<Proposal>;
  seps: Array<Sep>;
  instruments: Array<Instrument>;
};


export type UserReviewsArgs = {
  reviewer?: Maybe<ReviewerFilter>;
  status?: Maybe<ReviewStatus>;
  instrumentId?: Maybe<Scalars['Int']>;
  callId?: Maybe<Scalars['Int']>;
};


export type UserProposalsArgs = {
  filter?: Maybe<UserProposalsFilter>;
};

export type UserProposalsFilter = {
  instrumentId?: Maybe<Scalars['Int']>;
  managementDecisionSubmitted?: Maybe<Scalars['Boolean']>;
  finalStatus?: Maybe<ProposalEndStatus>;
};

export type UserQueryResult = {
  __typename?: 'UserQueryResult';
  users: Array<BasicUserDetails>;
  totalCount: Scalars['Int'];
};

export type UserResponseWrap = {
  __typename?: 'UserResponseWrap';
  rejection: Maybe<Rejection>;
  user: Maybe<User>;
};

export enum UserRole {
  USER = 'USER',
  USER_OFFICER = 'USER_OFFICER',
  SEP_CHAIR = 'SEP_CHAIR',
  SEP_SECRETARY = 'SEP_SECRETARY',
  SEP_REVIEWER = 'SEP_REVIEWER',
  INSTRUMENT_SCIENTIST = 'INSTRUMENT_SCIENTIST',
  SAMPLE_SAFETY_REVIEWER = 'SAMPLE_SAFETY_REVIEWER'
}

export type Visit = {
  __typename?: 'Visit';
  id: Scalars['Int'];
  proposalPk: Scalars['Int'];
  status: VisitStatus;
  creatorId: Scalars['Int'];
  teamLeadUserId: Scalars['Int'];
  proposal: Proposal;
  registrations: Array<VisitRegistration>;
  teamLead: BasicUserDetails;
  shipments: Array<Shipment>;
};

export type VisitBasisConfig = {
  __typename?: 'VisitBasisConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
};

export type VisitRegistration = {
  __typename?: 'VisitRegistration';
  userId: Scalars['Int'];
  visitId: Scalars['Int'];
  registrationQuestionaryId: Maybe<Scalars['Int']>;
  isRegistrationSubmitted: Scalars['Boolean'];
  trainingExpiryDate: Maybe<Scalars['DateTime']>;
  user: BasicUserDetails;
  questionary: Questionary;
};

export type VisitRegistrationResponseWrap = {
  __typename?: 'VisitRegistrationResponseWrap';
  rejection: Maybe<Rejection>;
  registration: Maybe<VisitRegistration>;
};

export type VisitResponseWrap = {
  __typename?: 'VisitResponseWrap';
  rejection: Maybe<Rejection>;
  visit: Maybe<Visit>;
};

export enum VisitStatus {
  DRAFT = 'DRAFT',
  ACCEPTED = 'ACCEPTED',
  SUBMITTED = 'SUBMITTED'
}

export type VisitsFilter = {
  creatorId?: Maybe<Scalars['Int']>;
  proposalPk?: Maybe<Scalars['Int']>;
};

export type AssignProposalsToSepMutationVariables = Exact<{
  proposals: Array<ProposalPkWithCallId> | ProposalPkWithCallId;
  sepId: Scalars['Int'];
}>;


export type AssignProposalsToSepMutation = (
  { __typename?: 'Mutation' }
  & { assignProposalsToSep: (
    { __typename?: 'NextProposalStatusResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, nextProposalStatus: Maybe<(
      { __typename?: 'NextProposalStatus' }
      & Pick<NextProposalStatus, 'id' | 'shortCode' | 'name'>
    )> }
  ) }
);

export type AssignReviewersToSepMutationVariables = Exact<{
  memberIds: Array<Scalars['Int']> | Scalars['Int'];
  sepId: Scalars['Int'];
}>;


export type AssignReviewersToSepMutation = (
  { __typename?: 'Mutation' }
  & { assignReviewersToSEP: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type AssignChairOrSecretaryMutationVariables = Exact<{
  assignChairOrSecretaryToSEPInput: AssignChairOrSecretaryToSepInput;
}>;


export type AssignChairOrSecretaryMutation = (
  { __typename?: 'Mutation' }
  & { assignChairOrSecretary: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type AssignSepReviewersToProposalMutationVariables = Exact<{
  memberIds: Array<Scalars['Int']> | Scalars['Int'];
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
}>;


export type AssignSepReviewersToProposalMutation = (
  { __typename?: 'Mutation' }
  & { assignSepReviewersToProposal: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type CreateSepMutationVariables = Exact<{
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired: Scalars['Int'];
  active: Scalars['Boolean'];
}>;


export type CreateSepMutation = (
  { __typename?: 'Mutation' }
  & { createSEP: (
    { __typename?: 'SEPResponseWrap' }
    & { sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id' | 'code' | 'description' | 'numberRatingsRequired' | 'active'>
      & { sepChair: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, sepSecretary: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteSepMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSepMutation = (
  { __typename?: 'Mutation' }
  & { deleteSEP: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type SepMeetingDecisionFragment = (
  { __typename?: 'SepMeetingDecision' }
  & Pick<SepMeetingDecision, 'proposalPk' | 'recommendation' | 'commentForUser' | 'commentForManagement' | 'rankOrder' | 'submitted' | 'submittedBy'>
);

export type GetInstrumentsBySepQueryVariables = Exact<{
  sepId: Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type GetInstrumentsBySepQuery = (
  { __typename?: 'Query' }
  & { instrumentsBySep: Maybe<Array<(
    { __typename?: 'InstrumentWithAvailabilityTime' }
    & Pick<InstrumentWithAvailabilityTime, 'id' | 'name' | 'shortCode' | 'description' | 'availabilityTime' | 'submitted'>
    & { scientists: Array<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )> }
  )>> }
);

export type GetUserSepsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSepsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & { seps: Array<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id' | 'code' | 'description' | 'numberRatingsRequired' | 'active'>
      & { sepChair: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, sepSecretary: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )> }
  )> }
);

export type GetSepQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetSepQuery = (
  { __typename?: 'Query' }
  & { sep: Maybe<(
    { __typename?: 'SEP' }
    & Pick<Sep, 'id' | 'code' | 'description' | 'numberRatingsRequired' | 'active'>
    & { sepChair: Maybe<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )>, sepSecretary: Maybe<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )> }
  )> }
);

export type GetSepMembersQueryVariables = Exact<{
  sepId: Scalars['Int'];
}>;


export type GetSepMembersQuery = (
  { __typename?: 'Query' }
  & { sepMembers: Maybe<Array<(
    { __typename?: 'SEPReviewer' }
    & Pick<SepReviewer, 'userId' | 'sepId'>
    & { role: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'shortCode' | 'title'>
    )>, user: (
      { __typename?: 'BasicUserDetails' }
      & Pick<BasicUserDetails, 'id' | 'firstname' | 'lastname' | 'organisation' | 'position' | 'placeholder' | 'created'>
    ) }
  )>> }
);

export type GetSepProposalQueryVariables = Exact<{
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
}>;


export type GetSepProposalQuery = (
  { __typename?: 'Query' }
  & { sepProposal: Maybe<(
    { __typename?: 'SEPProposal' }
    & Pick<SepProposal, 'proposalPk' | 'sepId' | 'sepTimeAllocation' | 'instrumentSubmitted'>
    & { proposal: (
      { __typename?: 'Proposal' }
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, questionary: (
        { __typename?: 'Questionary' }
        & QuestionaryFragment
      ), technicalReview: Maybe<(
        { __typename?: 'TechnicalReview' }
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & BasicUserDetailsFragment
        )> }
        & CoreTechnicalReviewFragment
      )>, reviews: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'userID' | 'sepID'>
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & Pick<BasicUserDetails, 'firstname' | 'lastname' | 'id'>
        )> }
      )>>, instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'id' | 'name' | 'shortCode'>
      )>, call: Maybe<(
        { __typename?: 'Call' }
        & Pick<Call, 'id' | 'shortCode' | 'allocationTimeUnit'>
      )> }
      & ProposalFragment
    ) }
  )> }
);

export type GetSepProposalsQueryVariables = Exact<{
  sepId: Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type GetSepProposalsQuery = (
  { __typename?: 'Query' }
  & { sepProposals: Maybe<Array<(
    { __typename?: 'SEPProposal' }
    & Pick<SepProposal, 'proposalPk' | 'dateAssigned' | 'sepId' | 'sepTimeAllocation'>
    & { proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'title' | 'primaryKey' | 'proposalId'>
      & { status: Maybe<(
        { __typename?: 'ProposalStatus' }
        & ProposalStatusFragment
      )> }
    ), assignments: Maybe<Array<(
      { __typename?: 'SEPAssignment' }
      & Pick<SepAssignment, 'sepMemberUserId' | 'dateAssigned'>
      & { user: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, role: Maybe<(
        { __typename?: 'Role' }
        & Pick<Role, 'id' | 'shortCode' | 'title'>
      )>, review: Maybe<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'status' | 'comment' | 'grade' | 'sepID'>
      )> }
    )>> }
  )>> }
);

export type SepProposalsByInstrumentQueryVariables = Exact<{
  instrumentId: Scalars['Int'];
  sepId: Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type SepProposalsByInstrumentQuery = (
  { __typename?: 'Query' }
  & { sepProposalsByInstrument: Maybe<Array<(
    { __typename?: 'SEPProposal' }
    & Pick<SepProposal, 'sepTimeAllocation'>
    & { proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'title' | 'proposalId'>
      & { status: Maybe<(
        { __typename?: 'ProposalStatus' }
        & ProposalStatusFragment
      )>, sepMeetingDecision: Maybe<(
        { __typename?: 'SepMeetingDecision' }
        & SepMeetingDecisionFragment
      )>, reviews: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'comment' | 'grade' | 'status'>
      )>>, technicalReview: Maybe<(
        { __typename?: 'TechnicalReview' }
        & Pick<TechnicalReview, 'publicComment' | 'status' | 'timeAllocation'>
      )> }
    ), assignments: Maybe<Array<(
      { __typename?: 'SEPAssignment' }
      & Pick<SepAssignment, 'sepMemberUserId'>
    )>> }
  )>> }
);

export type GetSepReviewersQueryVariables = Exact<{
  sepId: Scalars['Int'];
}>;


export type GetSepReviewersQuery = (
  { __typename?: 'Query' }
  & { sepReviewers: Maybe<Array<(
    { __typename?: 'SEPReviewer' }
    & Pick<SepReviewer, 'userId' | 'sepId'>
    & { role: Maybe<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'shortCode' | 'title'>
    )>, user: (
      { __typename?: 'BasicUserDetails' }
      & Pick<BasicUserDetails, 'id' | 'firstname' | 'lastname' | 'organisation' | 'position' | 'placeholder' | 'created'>
    ) }
  )>> }
);

export type GetSePsQueryVariables = Exact<{
  filter: Scalars['String'];
  active?: Maybe<Scalars['Boolean']>;
}>;


export type GetSePsQuery = (
  { __typename?: 'Query' }
  & { seps: Maybe<(
    { __typename?: 'SEPsQueryResult' }
    & Pick<SePsQueryResult, 'totalCount'>
    & { seps: Array<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id' | 'code' | 'description' | 'numberRatingsRequired' | 'active'>
      & { sepChair: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, sepSecretary: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )> }
  )> }
);

export type RemoveProposalsFromSepMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']> | Scalars['Int'];
  sepId: Scalars['Int'];
}>;


export type RemoveProposalsFromSepMutation = (
  { __typename?: 'Mutation' }
  & { removeProposalsFromSep: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type RemoveMemberFromSepMutationVariables = Exact<{
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  roleId: UserRole;
}>;


export type RemoveMemberFromSepMutation = (
  { __typename?: 'Mutation' }
  & { removeMemberFromSep: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type RemoveMemberFromSepProposalMutationVariables = Exact<{
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
}>;


export type RemoveMemberFromSepProposalMutation = (
  { __typename?: 'Mutation' }
  & { removeMemberFromSEPProposal: (
    { __typename?: 'SEPResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )> }
  ) }
);

export type ReorderSepMeetingDecisionProposalsMutationVariables = Exact<{
  reorderSepMeetingDecisionProposalsInput: ReorderSepMeetingDecisionProposalsInput;
}>;


export type ReorderSepMeetingDecisionProposalsMutation = (
  { __typename?: 'Mutation' }
  & { reorderSepMeetingDecisionProposals: (
    { __typename?: 'SepMeetingDecisionResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sepMeetingDecision: Maybe<(
      { __typename?: 'SepMeetingDecision' }
      & Pick<SepMeetingDecision, 'proposalPk'>
    )> }
  ) }
);

export type SaveSepMeetingDecisionMutationVariables = Exact<{
  saveSepMeetingDecisionInput: SaveSepMeetingDecisionInput;
}>;


export type SaveSepMeetingDecisionMutation = (
  { __typename?: 'Mutation' }
  & { saveSepMeetingDecision: (
    { __typename?: 'SepMeetingDecisionResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, sepMeetingDecision: Maybe<(
      { __typename?: 'SepMeetingDecision' }
      & Pick<SepMeetingDecision, 'proposalPk'>
    )> }
  ) }
);

export type UpdateSepMutationVariables = Exact<{
  id: Scalars['Int'];
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired: Scalars['Int'];
  active: Scalars['Boolean'];
}>;


export type UpdateSepMutation = (
  { __typename?: 'Mutation' }
  & { updateSEP: (
    { __typename?: 'SEPResponseWrap' }
    & { sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateSepTimeAllocationMutationVariables = Exact<{
  sepId: Scalars['Int'];
  proposalPk: Scalars['Int'];
  sepTimeAllocation?: Maybe<Scalars['Int']>;
}>;


export type UpdateSepTimeAllocationMutation = (
  { __typename?: 'Mutation' }
  & { updateSEPTimeAllocation: (
    { __typename?: 'SEPProposalResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AddClientLogMutationVariables = Exact<{
  error: Scalars['String'];
}>;


export type AddClientLogMutation = (
  { __typename?: 'Mutation' }
  & { addClientLog: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateApiAccessTokenMutationVariables = Exact<{
  name: Scalars['String'];
  accessPermissions: Scalars['String'];
}>;


export type CreateApiAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & { createApiAccessToken: (
    { __typename?: 'ApiAccessTokenResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, apiAccessToken: Maybe<(
      { __typename?: 'PermissionsWithAccessToken' }
      & Pick<PermissionsWithAccessToken, 'id' | 'name' | 'accessToken' | 'accessPermissions'>
    )> }
  ) }
);

export type CreateInstitutionMutationVariables = Exact<{
  name: Scalars['String'];
  verified: Scalars['Boolean'];
}>;


export type CreateInstitutionMutation = (
  { __typename?: 'Mutation' }
  & { createInstitution: (
    { __typename?: 'InstitutionResponseWrap' }
    & { institution: Maybe<(
      { __typename?: 'Institution' }
      & Pick<Institution, 'id' | 'name' | 'verified'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateUnitMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateUnitMutation = (
  { __typename?: 'Mutation' }
  & { createUnit: (
    { __typename?: 'UnitResponseWrap' }
    & { unit: Maybe<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'id' | 'name'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteApiAccessTokenMutationVariables = Exact<{
  accessTokenId: Scalars['String'];
}>;


export type DeleteApiAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & { deleteApiAccessToken: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteInstitutionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteInstitutionMutation = (
  { __typename?: 'Mutation' }
  & { deleteInstitution: (
    { __typename?: 'InstitutionResponseWrap' }
    & { institution: Maybe<(
      { __typename?: 'Institution' }
      & Pick<Institution, 'id' | 'verified'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteUnitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUnitMutation = (
  { __typename?: 'Mutation' }
  & { deleteUnit: (
    { __typename?: 'UnitResponseWrap' }
    & { unit: Maybe<(
      { __typename?: 'Unit' }
      & Pick<Unit, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type GetAllApiAccessTokensAndPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllApiAccessTokensAndPermissionsQuery = (
  { __typename?: 'Query' }
  & { allAccessTokensAndPermissions: Maybe<Array<(
    { __typename?: 'PermissionsWithAccessToken' }
    & Pick<PermissionsWithAccessToken, 'id' | 'name' | 'accessToken' | 'accessPermissions'>
  )>> }
);

export type GetAllQueriesAndMutationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQueriesAndMutationsQuery = (
  { __typename?: 'Query' }
  & { queriesAndMutations: Maybe<(
    { __typename?: 'QueriesAndMutations' }
    & Pick<QueriesAndMutations, 'queries' | 'mutations'>
  )> }
);

export type GetFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturesQuery = (
  { __typename?: 'Query' }
  & { features: Array<(
    { __typename?: 'Feature' }
    & Pick<Feature, 'id' | 'isEnabled' | 'description'>
  )> }
);

export type GetInstitutionsQueryVariables = Exact<{
  filter?: Maybe<InstitutionsFilter>;
}>;


export type GetInstitutionsQuery = (
  { __typename?: 'Query' }
  & { institutions: Maybe<Array<(
    { __typename?: 'Institution' }
    & Pick<Institution, 'id' | 'name' | 'verified'>
  )>> }
);

export type GetPageContentQueryVariables = Exact<{
  id: PageName;
}>;


export type GetPageContentQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getPageContent'>
);

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = (
  { __typename?: 'Query' }
  & { settings: Array<(
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'settingsValue' | 'description'>
  )> }
);

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = (
  { __typename?: 'Query' }
  & { units: Maybe<Array<(
    { __typename?: 'Unit' }
    & Pick<Unit, 'id' | 'name'>
  )>> }
);

export type RejectionFragment = (
  { __typename?: 'Rejection' }
  & Pick<Rejection, 'reason' | 'context' | 'exception'>
);

export type SetPageContentMutationVariables = Exact<{
  id: PageName;
  text: Scalars['String'];
}>;


export type SetPageContentMutation = (
  { __typename?: 'Mutation' }
  & { setPageContent: (
    { __typename?: 'PageResponseWrap' }
    & { page: Maybe<(
      { __typename?: 'Page' }
      & Pick<Page, 'id' | 'content'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateApiAccessTokenMutationVariables = Exact<{
  accessTokenId: Scalars['String'];
  name: Scalars['String'];
  accessPermissions: Scalars['String'];
}>;


export type UpdateApiAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & { updateApiAccessToken: (
    { __typename?: 'ApiAccessTokenResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, apiAccessToken: Maybe<(
      { __typename?: 'PermissionsWithAccessToken' }
      & Pick<PermissionsWithAccessToken, 'id' | 'name' | 'accessToken' | 'accessPermissions'>
    )> }
  ) }
);

export type UpdateInstitutionMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  verified: Scalars['Boolean'];
}>;


export type UpdateInstitutionMutation = (
  { __typename?: 'Mutation' }
  & { updateInstitution: (
    { __typename?: 'InstitutionResponseWrap' }
    & { institution: Maybe<(
      { __typename?: 'Institution' }
      & Pick<Institution, 'id' | 'verified' | 'name'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AssignInstrumentsToCallMutationVariables = Exact<{
  instrumentIds: Array<Scalars['Int']> | Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type AssignInstrumentsToCallMutation = (
  { __typename?: 'Mutation' }
  & { assignInstrumentsToCall: (
    { __typename?: 'CallResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & Pick<Call, 'id'>
    )> }
  ) }
);

export type CreateCallMutationVariables = Exact<{
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  allocationTimeUnit: AllocationTimeUnits;
  referenceNumberFormat?: Maybe<Scalars['String']>;
  proposalWorkflowId: Scalars['Int'];
  templateId: Scalars['Int'];
}>;


export type CreateCallMutation = (
  { __typename?: 'Mutation' }
  & { createCall: (
    { __typename?: 'CallResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & CallFragment
    )> }
  ) }
);

export type DeleteCallMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCallMutation = (
  { __typename?: 'Mutation' }
  & { deleteCall: (
    { __typename?: 'CallResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
      & RejectionFragment
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & Pick<Call, 'id'>
    )> }
  ) }
);

export type CallFragment = (
  { __typename?: 'Call' }
  & Pick<Call, 'id' | 'shortCode' | 'startCall' | 'endCall' | 'startReview' | 'endReview' | 'startSEPReview' | 'endSEPReview' | 'startNotify' | 'endNotify' | 'startCycle' | 'endCycle' | 'cycleComment' | 'surveyComment' | 'referenceNumberFormat' | 'proposalWorkflowId' | 'templateId' | 'allocationTimeUnit' | 'proposalCount'>
  & { instruments: Array<(
    { __typename?: 'InstrumentWithAvailabilityTime' }
    & Pick<InstrumentWithAvailabilityTime, 'id' | 'name' | 'shortCode' | 'description' | 'availabilityTime' | 'submitted'>
    & { scientists: Array<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )> }
  )>, proposalWorkflow: Maybe<(
    { __typename?: 'ProposalWorkflow' }
    & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
  )>, template: (
    { __typename?: 'Template' }
    & Pick<Template, 'templateId' | 'name' | 'isArchived'>
  ) }
);

export type GetCallQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCallQuery = (
  { __typename?: 'Query' }
  & { call: Maybe<(
    { __typename?: 'Call' }
    & CallFragment
  )> }
);

export type GetCallsQueryVariables = Exact<{
  filter?: Maybe<CallsFilter>;
}>;


export type GetCallsQuery = (
  { __typename?: 'Query' }
  & { calls: Maybe<Array<(
    { __typename?: 'Call' }
    & CallFragment
  )>> }
);

export type GetCallsByInstrumentScientistQueryVariables = Exact<{
  scientistId: Scalars['Int'];
}>;


export type GetCallsByInstrumentScientistQuery = (
  { __typename?: 'Query' }
  & { callsByInstrumentScientist: Maybe<Array<(
    { __typename?: 'Call' }
    & CallFragment
  )>> }
);

export type RemoveAssignedInstrumentFromCallMutationVariables = Exact<{
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type RemoveAssignedInstrumentFromCallMutation = (
  { __typename?: 'Mutation' }
  & { removeAssignedInstrumentFromCall: (
    { __typename?: 'CallResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & Pick<Call, 'id'>
    )> }
  ) }
);

export type UpdateCallMutationVariables = Exact<{
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  allocationTimeUnit: AllocationTimeUnits;
  referenceNumberFormat?: Maybe<Scalars['String']>;
  proposalWorkflowId: Scalars['Int'];
  templateId: Scalars['Int'];
}>;


export type UpdateCallMutation = (
  { __typename?: 'Mutation' }
  & { updateCall: (
    { __typename?: 'CallResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & CallFragment
    )> }
  ) }
);

export type GetEventLogsQueryVariables = Exact<{
  eventType: Scalars['String'];
  changedObjectId: Scalars['String'];
}>;


export type GetEventLogsQuery = (
  { __typename?: 'Query' }
  & { eventLogs: Maybe<Array<(
    { __typename?: 'EventLog' }
    & Pick<EventLog, 'id' | 'eventType' | 'eventTStamp' | 'rowData' | 'changedObjectId'>
    & { changedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'email'>
    ) }
  )>> }
);

export type AssignProposalsToInstrumentMutationVariables = Exact<{
  proposals: Array<ProposalPkWithCallId> | ProposalPkWithCallId;
  instrumentId: Scalars['Int'];
}>;


export type AssignProposalsToInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { assignProposalsToInstrument: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AssignScientistsToInstrumentMutationVariables = Exact<{
  scientistIds: Array<Scalars['Int']> | Scalars['Int'];
  instrumentId: Scalars['Int'];
}>;


export type AssignScientistsToInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { assignScientistsToInstrument: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateInstrumentMutationVariables = Exact<{
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
}>;


export type CreateInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { createInstrument: (
    { __typename?: 'InstrumentResponseWrap' }
    & { instrument: Maybe<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name' | 'shortCode' | 'description' | 'managerUserId'>
      & { scientists: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteInstrumentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { deleteInstrument: (
    { __typename?: 'InstrumentResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type GetInstrumentsQueryVariables = Exact<{
  callIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetInstrumentsQuery = (
  { __typename?: 'Query' }
  & { instruments: Maybe<(
    { __typename?: 'InstrumentsQueryResult' }
    & Pick<InstrumentsQueryResult, 'totalCount'>
    & { instruments: Array<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name' | 'shortCode' | 'description' | 'managerUserId'>
      & { scientists: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )> }
  )> }
);

export type GetUserInstrumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInstrumentsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & { instruments: Array<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name' | 'shortCode' | 'description'>
      & { scientists: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )> }
  )> }
);

export type RemoveProposalsFromInstrumentMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type RemoveProposalsFromInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { removeProposalsFromInstrument: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type RemoveScientistFromInstrumentMutationVariables = Exact<{
  scientistId: Scalars['Int'];
  instrumentId: Scalars['Int'];
}>;


export type RemoveScientistFromInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { removeScientistFromInstrument: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SetInstrumentAvailabilityTimeMutationVariables = Exact<{
  callId: Scalars['Int'];
  instrumentId: Scalars['Int'];
  availabilityTime: Scalars['Int'];
}>;


export type SetInstrumentAvailabilityTimeMutation = (
  { __typename?: 'Mutation' }
  & { setInstrumentAvailabilityTime: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SubmitInstrumentMutationVariables = Exact<{
  callId: Scalars['Int'];
  instrumentId: Scalars['Int'];
  sepId: Scalars['Int'];
}>;


export type SubmitInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { submitInstrument: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateInstrumentMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  managerUserId: Scalars['Int'];
}>;


export type UpdateInstrumentMutation = (
  { __typename?: 'Mutation' }
  & { updateInstrument: (
    { __typename?: 'InstrumentResponseWrap' }
    & { instrument: Maybe<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name' | 'shortCode' | 'description' | 'managerUserId'>
      & { scientists: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AdministrationProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
  finalStatus?: Maybe<ProposalEndStatus>;
  statusId?: Maybe<Scalars['Int']>;
  commentForUser?: Maybe<Scalars['String']>;
  commentForManagement?: Maybe<Scalars['String']>;
  managementTimeAllocation?: Maybe<Scalars['Int']>;
  managementDecisionSubmitted?: Maybe<Scalars['Boolean']>;
}>;


export type AdministrationProposalMutation = (
  { __typename?: 'Mutation' }
  & { administrationProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type ChangeProposalsStatusMutationVariables = Exact<{
  proposals: Array<ProposalPkWithCallId> | ProposalPkWithCallId;
  statusId: Scalars['Int'];
}>;


export type ChangeProposalsStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeProposalsStatus: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CloneProposalMutationVariables = Exact<{
  proposalToClonePk: Scalars['Int'];
  callId: Scalars['Int'];
}>;


export type CloneProposalMutation = (
  { __typename?: 'Mutation' }
  & { cloneProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ), technicalReview: Maybe<(
        { __typename?: 'TechnicalReview' }
        & CoreTechnicalReviewFragment
      )>, reviews: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'userID' | 'sepID'>
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & Pick<BasicUserDetails, 'firstname' | 'lastname' | 'id'>
        )> }
      )>>, instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'id' | 'name' | 'shortCode'>
      )>, call: Maybe<(
        { __typename?: 'Call' }
        & Pick<Call, 'id' | 'shortCode' | 'isActive'>
      )> }
      & ProposalFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateProposalMutationVariables = Exact<{
  callId: Scalars['Int'];
}>;


export type CreateProposalMutation = (
  { __typename?: 'Mutation' }
  & { createProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'proposalId' | 'questionaryId'>
      & { status: Maybe<(
        { __typename?: 'ProposalStatus' }
        & ProposalStatusFragment
      )>, questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ), proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, samples: Maybe<Array<(
        { __typename?: 'Sample' }
        & { questionary: (
          { __typename?: 'Questionary' }
          & Pick<Questionary, 'isCompleted'>
        ) }
        & SampleFragment
      )>> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
}>;


export type DeleteProposalMutation = (
  { __typename?: 'Mutation' }
  & { deleteProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey'>
    )> }
  ) }
);

export type CoreTechnicalReviewFragment = (
  { __typename?: 'TechnicalReview' }
  & Pick<TechnicalReview, 'id' | 'comment' | 'publicComment' | 'timeAllocation' | 'status' | 'proposalPk' | 'submitted'>
);

export type ProposalFragment = (
  { __typename?: 'Proposal' }
  & Pick<Proposal, 'primaryKey' | 'title' | 'abstract' | 'statusId' | 'publicStatus' | 'proposalId' | 'finalStatus' | 'commentForUser' | 'commentForManagement' | 'created' | 'updated' | 'callId' | 'questionaryId' | 'notified' | 'submitted' | 'managementTimeAllocation' | 'managementDecisionSubmitted' | 'technicalReviewAssignee'>
  & { status: Maybe<(
    { __typename?: 'ProposalStatus' }
    & ProposalStatusFragment
  )>, sepMeetingDecision: Maybe<(
    { __typename?: 'SepMeetingDecision' }
    & SepMeetingDecisionFragment
  )> }
);

export type GetInstrumentScientistProposalsQueryVariables = Exact<{
  filter?: Maybe<ProposalsFilter>;
}>;


export type GetInstrumentScientistProposalsQuery = (
  { __typename?: 'Query' }
  & { instrumentScientistProposals: Maybe<(
    { __typename?: 'ProposalsQueryResult' }
    & Pick<ProposalsQueryResult, 'totalCount'>
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, reviews: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'userID' | 'sepID'>
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & Pick<BasicUserDetails, 'firstname' | 'lastname' | 'id'>
        )> }
      )>>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, technicalReview: Maybe<(
        { __typename?: 'TechnicalReview' }
        & CoreTechnicalReviewFragment
      )>, instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'id' | 'name'>
      )>, call: Maybe<(
        { __typename?: 'Call' }
        & Pick<Call, 'id' | 'shortCode' | 'allocationTimeUnit'>
      )>, sep: Maybe<(
        { __typename?: 'SEP' }
        & Pick<Sep, 'id' | 'code'>
      )> }
      & ProposalFragment
    )> }
  )> }
);

export type GetMyProposalsQueryVariables = Exact<{
  filter?: Maybe<UserProposalsFilter>;
}>;


export type GetMyProposalsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & ProposalFragment
    )> }
  )> }
);

export type GetProposalQueryVariables = Exact<{
  primaryKey: Scalars['Int'];
}>;


export type GetProposalQuery = (
  { __typename?: 'Query' }
  & { proposal: Maybe<(
    { __typename?: 'Proposal' }
    & { proposer: Maybe<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )>, users: Array<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )>, questionary: (
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
      & QuestionaryFragment
    ), technicalReview: Maybe<(
      { __typename?: 'TechnicalReview' }
      & { reviewer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
      & CoreTechnicalReviewFragment
    )>, reviews: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'userID' | 'sepID'>
      & { reviewer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & Pick<BasicUserDetails, 'firstname' | 'lastname' | 'id'>
      )> }
    )>>, instrument: Maybe<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name' | 'shortCode'>
    )>, call: Maybe<(
      { __typename?: 'Call' }
      & Pick<Call, 'id' | 'shortCode' | 'isActive' | 'allocationTimeUnit'>
    )>, sep: Maybe<(
      { __typename?: 'SEP' }
      & Pick<Sep, 'id' | 'code'>
    )>, samples: Maybe<Array<(
      { __typename?: 'Sample' }
      & { questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
      ) }
      & SampleFragment
    )>> }
    & ProposalFragment
  )> }
);

export type GetProposalsQueryVariables = Exact<{
  filter?: Maybe<ProposalsFilter>;
}>;


export type GetProposalsQuery = (
  { __typename?: 'Query' }
  & { proposals: Maybe<(
    { __typename?: 'ProposalsQueryResult' }
    & Pick<ProposalsQueryResult, 'totalCount'>
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, reviews: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'userID' | 'sepID'>
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & Pick<BasicUserDetails, 'firstname' | 'lastname' | 'id'>
        )> }
      )>>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, technicalReview: Maybe<(
        { __typename?: 'TechnicalReview' }
        & { reviewer: Maybe<(
          { __typename?: 'BasicUserDetails' }
          & BasicUserDetailsFragment
        )> }
        & CoreTechnicalReviewFragment
      )>, instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'id' | 'name'>
      )>, call: Maybe<(
        { __typename?: 'Call' }
        & Pick<Call, 'id' | 'shortCode'>
      )>, sep: Maybe<(
        { __typename?: 'SEP' }
        & Pick<Sep, 'id' | 'code'>
      )> }
      & ProposalFragment
    )> }
  )> }
);

export type GetProposalsCoreQueryVariables = Exact<{
  filter?: Maybe<ProposalsFilter>;
}>;


export type GetProposalsCoreQuery = (
  { __typename?: 'Query' }
  & { proposalsView: Maybe<Array<(
    { __typename?: 'ProposalView' }
    & Pick<ProposalView, 'primaryKey' | 'title' | 'statusId' | 'statusName' | 'statusDescription' | 'proposalId' | 'rankOrder' | 'finalStatus' | 'notified' | 'timeAllocation' | 'technicalStatus' | 'instrumentName' | 'callShortCode' | 'sepCode' | 'sepId' | 'reviewAverage' | 'reviewDeviation' | 'instrumentId' | 'callId' | 'submitted' | 'allocationTimeUnit'>
  )>> }
);

export type NotifyProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
}>;


export type NotifyProposalMutation = (
  { __typename?: 'Mutation' }
  & { notifyProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SubmitProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
}>;


export type SubmitProposalMutation = (
  { __typename?: 'Mutation' }
  & { submitProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & ProposalFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateProposalMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  proposerId?: Maybe<Scalars['Int']>;
}>;


export type UpdateProposalMutation = (
  { __typename?: 'Mutation' }
  & { updateProposal: (
    { __typename?: 'ProposalResponseWrap' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'title' | 'abstract'>
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type GetUserProposalBookingsWithEventsQueryVariables = Exact<{
  endsAfter?: Maybe<Scalars['TzLessDateTime']>;
  status?: Maybe<Array<ProposalBookingStatus> | ProposalBookingStatus>;
  instrumentId?: Maybe<Scalars['Int']>;
}>;


export type GetUserProposalBookingsWithEventsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'title' | 'proposalId' | 'finalStatus' | 'managementDecisionSubmitted'>
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, users: Array<(
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      )>, proposalBooking: Maybe<(
        { __typename?: 'ProposalBooking' }
        & { scheduledEvents: Array<(
          { __typename?: 'ScheduledEvent' }
          & Pick<ScheduledEvent, 'id' | 'startsAt' | 'endsAt' | 'bookingType'>
          & { visit: Maybe<(
            { __typename?: 'Visit' }
            & { teamLead: (
              { __typename?: 'BasicUserDetails' }
              & BasicUserDetailsFragment
            ), shipments: Array<(
              { __typename?: 'Shipment' }
              & ShipmentFragment
            )>, registrations: Array<(
              { __typename?: 'VisitRegistration' }
              & { user: (
                { __typename?: 'BasicUserDetails' }
                & BasicUserDetailsFragment
              ) }
              & VisitRegistrationFragment
            )> }
            & VisitFragment
          )> }
        )> }
      )>, visits: Maybe<Array<(
        { __typename?: 'Visit' }
        & VisitFragment
      )>>, riskAssessmentQuestionary: Maybe<(
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'questionaryId'>
      )>, instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type AnswerTopicMutationVariables = Exact<{
  questionaryId: Scalars['Int'];
  topicId: Scalars['Int'];
  answers: Array<AnswerInput> | AnswerInput;
  isPartialSave?: Maybe<Scalars['Boolean']>;
}>;


export type AnswerTopicMutation = (
  { __typename?: 'Mutation' }
  & { answerTopic: (
    { __typename?: 'QuestionaryStepResponseWrap' }
    & { questionaryStep: Maybe<(
      { __typename?: 'QuestionaryStep' }
      & QuestionaryStepFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateQuestionaryMutationVariables = Exact<{
  templateId: Scalars['Int'];
}>;


export type CreateQuestionaryMutation = (
  { __typename?: 'Mutation' }
  & { createQuestionary: (
    { __typename?: 'QuestionaryResponseWrap' }
    & { questionary: Maybe<(
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
      & QuestionaryFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AnswerFragment = (
  { __typename?: 'Answer' }
  & Pick<Answer, 'answerId' | 'sortOrder' | 'topicId' | 'dependenciesOperator' | 'value'>
  & { question: (
    { __typename?: 'Question' }
    & QuestionFragment
  ), config: (
    { __typename?: 'BooleanConfig' }
    & FieldConfigBooleanConfigFragment
  ) | (
    { __typename?: 'DateConfig' }
    & FieldConfigDateConfigFragment
  ) | (
    { __typename?: 'EmbellishmentConfig' }
    & FieldConfigEmbellishmentConfigFragment
  ) | (
    { __typename?: 'FileUploadConfig' }
    & FieldConfigFileUploadConfigFragment
  ) | (
    { __typename?: 'SelectionFromOptionsConfig' }
    & FieldConfigSelectionFromOptionsConfigFragment
  ) | (
    { __typename?: 'TextInputConfig' }
    & FieldConfigTextInputConfigFragment
  ) | (
    { __typename?: 'SampleBasisConfig' }
    & FieldConfigSampleBasisConfigFragment
  ) | (
    { __typename?: 'SubTemplateConfig' }
    & FieldConfigSubTemplateConfigFragment
  ) | (
    { __typename?: 'ProposalBasisConfig' }
    & FieldConfigProposalBasisConfigFragment
  ) | (
    { __typename?: 'IntervalConfig' }
    & FieldConfigIntervalConfigFragment
  ) | (
    { __typename?: 'NumberInputConfig' }
    & FieldConfigNumberInputConfigFragment
  ) | (
    { __typename?: 'ShipmentBasisConfig' }
    & FieldConfigShipmentBasisConfigFragment
  ) | (
    { __typename?: 'RichTextInputConfig' }
    & FieldConfigRichTextInputConfigFragment
  ) | (
    { __typename?: 'VisitBasisConfig' }
    & FieldConfigVisitBasisConfigFragment
  ), dependencies: Array<(
    { __typename?: 'FieldDependency' }
    & Pick<FieldDependency, 'questionId' | 'dependencyId' | 'dependencyNaturalKey'>
    & { condition: (
      { __typename?: 'FieldCondition' }
      & FieldConditionFragment
    ) }
  )> }
);

export type QuestionaryFragment = (
  { __typename?: 'Questionary' }
  & Pick<Questionary, 'questionaryId' | 'templateId' | 'created'>
  & { steps: Array<(
    { __typename?: 'QuestionaryStep' }
    & QuestionaryStepFragment
  )> }
);

export type QuestionaryStepFragment = (
  { __typename?: 'QuestionaryStep' }
  & Pick<QuestionaryStep, 'isCompleted'>
  & { topic: (
    { __typename?: 'Topic' }
    & TopicFragment
  ), fields: Array<(
    { __typename?: 'Answer' }
    & AnswerFragment
  )> }
);

export type GetBlankQuestionaryStepsQueryVariables = Exact<{
  templateId: Scalars['Int'];
}>;


export type GetBlankQuestionaryStepsQuery = (
  { __typename?: 'Query' }
  & { blankQuestionarySteps: Maybe<Array<(
    { __typename?: 'QuestionaryStep' }
    & QuestionaryStepFragment
  )>> }
);

export type GetFileMetadataQueryVariables = Exact<{
  fileIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetFileMetadataQuery = (
  { __typename?: 'Query' }
  & { fileMetadata: Maybe<Array<(
    { __typename?: 'FileMetadata' }
    & Pick<FileMetadata, 'fileId' | 'originalFileName' | 'mimeType' | 'sizeInBytes' | 'createdDate'>
  )>> }
);

export type GetQuestionaryQueryVariables = Exact<{
  questionaryId: Scalars['Int'];
}>;


export type GetQuestionaryQuery = (
  { __typename?: 'Query' }
  & { questionary: Maybe<(
    { __typename?: 'Questionary' }
    & QuestionaryFragment
  )> }
);

export type AddTechnicalReviewMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
  timeAllocation?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  publicComment?: Maybe<Scalars['String']>;
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean'];
  reviewerId: Scalars['Int'];
}>;


export type AddTechnicalReviewMutation = (
  { __typename?: 'Mutation' }
  & { addTechnicalReview: (
    { __typename?: 'TechnicalReviewResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, technicalReview: Maybe<(
      { __typename?: 'TechnicalReview' }
      & Pick<TechnicalReview, 'id'>
    )> }
  ) }
);

export type AddUserForReviewMutationVariables = Exact<{
  userID: Scalars['Int'];
  proposalPk: Scalars['Int'];
  sepID: Scalars['Int'];
}>;


export type AddUserForReviewMutation = (
  { __typename?: 'Mutation' }
  & { addUserForReview: (
    { __typename?: 'ReviewResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, review: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id'>
    )> }
  ) }
);

export type UpdateTechnicalReviewAssigneeMutationVariables = Exact<{
  proposalPks: Array<Scalars['Int']> | Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type UpdateTechnicalReviewAssigneeMutation = (
  { __typename?: 'Mutation' }
  & { updateTechnicalReviewAssignee: (
    { __typename?: 'ProposalsResponseWrap' }
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & ProposalFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CoreReviewFragment = (
  { __typename?: 'Review' }
  & Pick<Review, 'id' | 'userID' | 'status' | 'comment' | 'grade' | 'sepID'>
);

export type GetProposalReviewsQueryVariables = Exact<{
  proposalPk: Scalars['Int'];
}>;


export type GetProposalReviewsQuery = (
  { __typename?: 'Query' }
  & { proposalReviews: Maybe<Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'userID' | 'comment' | 'grade' | 'status' | 'sepID'>
  )>> }
);

export type GetReviewQueryVariables = Exact<{
  reviewId: Scalars['Int'];
  sepId?: Maybe<Scalars['Int']>;
}>;


export type GetReviewQuery = (
  { __typename?: 'Query' }
  & { review: Maybe<(
    { __typename?: 'Review' }
    & { proposal: Maybe<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'title' | 'abstract'>
      & { proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & Pick<BasicUserDetails, 'id'>
      )> }
    )>, reviewer: Maybe<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )> }
    & CoreReviewFragment
  )> }
);

export type RemoveUserForReviewMutationVariables = Exact<{
  reviewId: Scalars['Int'];
  sepId: Scalars['Int'];
}>;


export type RemoveUserForReviewMutation = (
  { __typename?: 'Mutation' }
  & { removeUserForReview: (
    { __typename?: 'ReviewResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SubmitProposalsReviewMutationVariables = Exact<{
  proposals: Array<ProposalPkWithReviewId> | ProposalPkWithReviewId;
}>;


export type SubmitProposalsReviewMutation = (
  { __typename?: 'Mutation' }
  & { submitProposalsReview: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SubmitTechnicalReviewMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
  timeAllocation?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  publicComment?: Maybe<Scalars['String']>;
  status?: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean'];
  reviewerId: Scalars['Int'];
}>;


export type SubmitTechnicalReviewMutation = (
  { __typename?: 'Mutation' }
  & { submitTechnicalReview: (
    { __typename?: 'TechnicalReviewResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, technicalReview: Maybe<(
      { __typename?: 'TechnicalReview' }
      & Pick<TechnicalReview, 'id'>
    )> }
  ) }
);

export type AddReviewMutationVariables = Exact<{
  reviewID: Scalars['Int'];
  grade: Scalars['Int'];
  comment: Scalars['String'];
  status: ReviewStatus;
  sepID: Scalars['Int'];
}>;


export type AddReviewMutation = (
  { __typename?: 'Mutation' }
  & { addReview: (
    { __typename?: 'ReviewWithNextStatusResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, review: Maybe<(
      { __typename?: 'ReviewWithNextProposalStatus' }
      & Pick<ReviewWithNextProposalStatus, 'id' | 'userID' | 'status' | 'comment' | 'grade' | 'sepID'>
      & { nextProposalStatus: Maybe<(
        { __typename?: 'NextProposalStatus' }
        & Pick<NextProposalStatus, 'id' | 'shortCode' | 'name'>
      )> }
    )> }
  ) }
);

export type UserWithReviewsQueryVariables = Exact<{
  callId?: Maybe<Scalars['Int']>;
  instrumentId?: Maybe<Scalars['Int']>;
  status?: Maybe<ReviewStatus>;
  reviewer?: Maybe<ReviewerFilter>;
}>;


export type UserWithReviewsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'organisation'>
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'grade' | 'comment' | 'status' | 'sepID'>
      & { proposal: Maybe<(
        { __typename?: 'Proposal' }
        & Pick<Proposal, 'primaryKey' | 'title' | 'proposalId'>
        & { call: Maybe<(
          { __typename?: 'Call' }
          & Pick<Call, 'shortCode'>
        )>, instrument: Maybe<(
          { __typename?: 'Instrument' }
          & Pick<Instrument, 'shortCode'>
        )> }
      )> }
    )> }
  )> }
);

export type CloneSampleMutationVariables = Exact<{
  sampleId: Scalars['Int'];
}>;


export type CloneSampleMutation = (
  { __typename?: 'Mutation' }
  & { cloneSample: (
    { __typename?: 'SampleResponseWrap' }
    & { sample: Maybe<(
      { __typename?: 'Sample' }
      & { questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ) }
      & SampleFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateSampleMutationVariables = Exact<{
  title: Scalars['String'];
  templateId: Scalars['Int'];
  proposalPk: Scalars['Int'];
  questionId: Scalars['String'];
}>;


export type CreateSampleMutation = (
  { __typename?: 'Mutation' }
  & { createSample: (
    { __typename?: 'SampleResponseWrap' }
    & { sample: Maybe<(
      { __typename?: 'Sample' }
      & { questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ) }
      & SampleFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteSampleMutationVariables = Exact<{
  sampleId: Scalars['Int'];
}>;


export type DeleteSampleMutation = (
  { __typename?: 'Mutation' }
  & { deleteSample: (
    { __typename?: 'SampleResponseWrap' }
    & { sample: Maybe<(
      { __typename?: 'Sample' }
      & SampleFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SampleFragment = (
  { __typename?: 'Sample' }
  & Pick<Sample, 'id' | 'title' | 'creatorId' | 'questionaryId' | 'safetyStatus' | 'safetyComment' | 'created' | 'proposalPk' | 'questionId'>
);

export type GetSampleQueryVariables = Exact<{
  sampleId: Scalars['Int'];
}>;


export type GetSampleQuery = (
  { __typename?: 'Query' }
  & { sample: Maybe<(
    { __typename?: 'Sample' }
    & { questionary: (
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
      & QuestionaryFragment
    ) }
    & SampleFragment
  )> }
);

export type GetSamplesByCallIdQueryVariables = Exact<{
  callId: Scalars['Int'];
}>;


export type GetSamplesByCallIdQuery = (
  { __typename?: 'Query' }
  & { samplesByCallId: Maybe<Array<(
    { __typename?: 'Sample' }
    & { proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'proposalId'>
    ) }
    & SampleFragment
  )>> }
);

export type GetSamplesWithProposalDataQueryVariables = Exact<{
  filter?: Maybe<SamplesFilter>;
}>;


export type GetSamplesWithProposalDataQuery = (
  { __typename?: 'Query' }
  & { samples: Maybe<Array<(
    { __typename?: 'Sample' }
    & { proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'proposalId'>
    ) }
    & SampleFragment
  )>> }
);

export type GetSamplesWithQuestionaryStatusQueryVariables = Exact<{
  filter?: Maybe<SamplesFilter>;
}>;


export type GetSamplesWithQuestionaryStatusQuery = (
  { __typename?: 'Query' }
  & { samples: Maybe<Array<(
    { __typename?: 'Sample' }
    & { questionary: (
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
    ) }
    & SampleFragment
  )>> }
);

export type UpdateSampleMutationVariables = Exact<{
  sampleId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  safetyComment?: Maybe<Scalars['String']>;
  safetyStatus?: Maybe<SampleStatus>;
}>;


export type UpdateSampleMutation = (
  { __typename?: 'Mutation' }
  & { updateSample: (
    { __typename?: 'SampleResponseWrap' }
    & { sample: Maybe<(
      { __typename?: 'Sample' }
      & SampleFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AddProposalWorkflowStatusMutationVariables = Exact<{
  proposalWorkflowId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  droppableGroupId: Scalars['String'];
  parentDroppableGroupId?: Maybe<Scalars['String']>;
  proposalStatusId: Scalars['Int'];
  nextProposalStatusId?: Maybe<Scalars['Int']>;
  prevProposalStatusId?: Maybe<Scalars['Int']>;
}>;


export type AddProposalWorkflowStatusMutation = (
  { __typename?: 'Mutation' }
  & { addProposalWorkflowStatus: (
    { __typename?: 'ProposalWorkflowConnectionResponseWrap' }
    & { proposalWorkflowConnection: Maybe<(
      { __typename?: 'ProposalWorkflowConnection' }
      & Pick<ProposalWorkflowConnection, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AddStatusChangingEventsToConnectionMutationVariables = Exact<{
  proposalWorkflowConnectionId: Scalars['Int'];
  statusChangingEvents: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddStatusChangingEventsToConnectionMutation = (
  { __typename?: 'Mutation' }
  & { addStatusChangingEventsToConnection: (
    { __typename?: 'ProposalStatusChangingEventResponseWrap' }
    & { statusChangingEvents: Maybe<Array<(
      { __typename?: 'StatusChangingEvent' }
      & Pick<StatusChangingEvent, 'statusChangingEventId' | 'proposalWorkflowConnectionId' | 'statusChangingEvent'>
    )>>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateProposalStatusMutationVariables = Exact<{
  shortCode: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateProposalStatusMutation = (
  { __typename?: 'Mutation' }
  & { createProposalStatus: (
    { __typename?: 'ProposalStatusResponseWrap' }
    & { proposalStatus: Maybe<(
      { __typename?: 'ProposalStatus' }
      & ProposalStatusFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateProposalWorkflowMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateProposalWorkflowMutation = (
  { __typename?: 'Mutation' }
  & { createProposalWorkflow: (
    { __typename?: 'ProposalWorkflowResponseWrap' }
    & { proposalWorkflow: Maybe<(
      { __typename?: 'ProposalWorkflow' }
      & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
      & { proposalWorkflowConnectionGroups: Array<(
        { __typename?: 'ProposalWorkflowConnectionGroup' }
        & Pick<ProposalWorkflowConnectionGroup, 'groupId' | 'parentGroupId'>
        & { connections: Array<(
          { __typename?: 'ProposalWorkflowConnection' }
          & Pick<ProposalWorkflowConnection, 'id' | 'sortOrder' | 'proposalWorkflowId' | 'proposalStatusId' | 'nextProposalStatusId' | 'prevProposalStatusId' | 'droppableGroupId'>
          & { proposalStatus: (
            { __typename?: 'ProposalStatus' }
            & ProposalStatusFragment
          ), statusChangingEvents: Maybe<Array<(
            { __typename?: 'StatusChangingEvent' }
            & Pick<StatusChangingEvent, 'statusChangingEventId' | 'proposalWorkflowConnectionId' | 'statusChangingEvent'>
          )>> }
        )> }
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteProposalStatusMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProposalStatusMutation = (
  { __typename?: 'Mutation' }
  & { deleteProposalStatus: (
    { __typename?: 'ProposalStatusResponseWrap' }
    & { proposalStatus: Maybe<(
      { __typename?: 'ProposalStatus' }
      & ProposalStatusFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteProposalWorkflowMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProposalWorkflowMutation = (
  { __typename?: 'Mutation' }
  & { deleteProposalWorkflow: (
    { __typename?: 'ProposalWorkflowResponseWrap' }
    & { proposalWorkflow: Maybe<(
      { __typename?: 'ProposalWorkflow' }
      & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteProposalWorkflowStatusMutationVariables = Exact<{
  proposalStatusId: Scalars['Int'];
  proposalWorkflowId: Scalars['Int'];
  sortOrder: Scalars['Int'];
}>;


export type DeleteProposalWorkflowStatusMutation = (
  { __typename?: 'Mutation' }
  & { deleteProposalWorkflowStatus: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type ProposalStatusFragment = (
  { __typename?: 'ProposalStatus' }
  & Pick<ProposalStatus, 'id' | 'shortCode' | 'name' | 'description' | 'isDefault'>
);

export type GetProposalEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProposalEventsQuery = (
  { __typename?: 'Query' }
  & { proposalEvents: Maybe<Array<(
    { __typename?: 'ProposalEvent' }
    & Pick<ProposalEvent, 'name' | 'description'>
  )>> }
);

export type GetProposalStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProposalStatusesQuery = (
  { __typename?: 'Query' }
  & { proposalStatuses: Maybe<Array<(
    { __typename?: 'ProposalStatus' }
    & ProposalStatusFragment
  )>> }
);

export type GetProposalWorkflowQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProposalWorkflowQuery = (
  { __typename?: 'Query' }
  & { proposalWorkflow: Maybe<(
    { __typename?: 'ProposalWorkflow' }
    & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
    & { proposalWorkflowConnectionGroups: Array<(
      { __typename?: 'ProposalWorkflowConnectionGroup' }
      & Pick<ProposalWorkflowConnectionGroup, 'groupId' | 'parentGroupId'>
      & { connections: Array<(
        { __typename?: 'ProposalWorkflowConnection' }
        & Pick<ProposalWorkflowConnection, 'id' | 'sortOrder' | 'proposalWorkflowId' | 'proposalStatusId' | 'nextProposalStatusId' | 'prevProposalStatusId' | 'droppableGroupId'>
        & { proposalStatus: (
          { __typename?: 'ProposalStatus' }
          & ProposalStatusFragment
        ), statusChangingEvents: Maybe<Array<(
          { __typename?: 'StatusChangingEvent' }
          & Pick<StatusChangingEvent, 'statusChangingEventId' | 'proposalWorkflowConnectionId' | 'statusChangingEvent'>
        )>> }
      )> }
    )> }
  )> }
);

export type GetProposalWorkflowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProposalWorkflowsQuery = (
  { __typename?: 'Query' }
  & { proposalWorkflows: Maybe<Array<(
    { __typename?: 'ProposalWorkflow' }
    & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
  )>> }
);

export type MoveProposalWorkflowStatusMutationVariables = Exact<{
  from: IndexWithGroupId;
  to: IndexWithGroupId;
  proposalWorkflowId: Scalars['Int'];
}>;


export type MoveProposalWorkflowStatusMutation = (
  { __typename?: 'Mutation' }
  & { moveProposalWorkflowStatus: (
    { __typename?: 'ProposalWorkflowConnectionResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateProposalStatusMutationVariables = Exact<{
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateProposalStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateProposalStatus: (
    { __typename?: 'ProposalStatusResponseWrap' }
    & { proposalStatus: Maybe<(
      { __typename?: 'ProposalStatus' }
      & ProposalStatusFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateProposalWorkflowMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateProposalWorkflowMutation = (
  { __typename?: 'Mutation' }
  & { updateProposalWorkflow: (
    { __typename?: 'ProposalWorkflowResponseWrap' }
    & { proposalWorkflow: Maybe<(
      { __typename?: 'ProposalWorkflow' }
      & Pick<ProposalWorkflow, 'id' | 'name' | 'description'>
      & { proposalWorkflowConnectionGroups: Array<(
        { __typename?: 'ProposalWorkflowConnectionGroup' }
        & Pick<ProposalWorkflowConnectionGroup, 'groupId' | 'parentGroupId'>
        & { connections: Array<(
          { __typename?: 'ProposalWorkflowConnection' }
          & Pick<ProposalWorkflowConnection, 'id' | 'sortOrder' | 'proposalWorkflowId' | 'proposalStatusId' | 'nextProposalStatusId' | 'prevProposalStatusId' | 'droppableGroupId'>
          & { proposalStatus: (
            { __typename?: 'ProposalStatus' }
            & Pick<ProposalStatus, 'id' | 'name' | 'description'>
          ), statusChangingEvents: Maybe<Array<(
            { __typename?: 'StatusChangingEvent' }
            & Pick<StatusChangingEvent, 'statusChangingEventId' | 'proposalWorkflowConnectionId' | 'statusChangingEvent'>
          )>> }
        )> }
      )> }
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type AddSamplesToShipmentMutationVariables = Exact<{
  shipmentId: Scalars['Int'];
  sampleIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type AddSamplesToShipmentMutation = (
  { __typename?: 'Mutation' }
  & { addSamplesToShipment: (
    { __typename?: 'ShipmentResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, shipment: Maybe<(
      { __typename?: 'Shipment' }
      & { samples: Array<(
        { __typename?: 'Sample' }
        & SampleFragment
      )> }
      & ShipmentFragment
    )> }
  ) }
);

export type CreateShipmentMutationVariables = Exact<{
  title: Scalars['String'];
  proposalPk: Scalars['Int'];
  visitId: Scalars['Int'];
}>;


export type CreateShipmentMutation = (
  { __typename?: 'Mutation' }
  & { createShipment: (
    { __typename?: 'ShipmentResponseWrap' }
    & { shipment: Maybe<(
      { __typename?: 'Shipment' }
      & { questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ), samples: Array<(
        { __typename?: 'Sample' }
        & SampleFragment
      )> }
      & ShipmentFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteShipmentMutationVariables = Exact<{
  shipmentId: Scalars['Int'];
}>;


export type DeleteShipmentMutation = (
  { __typename?: 'Mutation' }
  & { deleteShipment: (
    { __typename?: 'ShipmentResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type ShipmentFragment = (
  { __typename?: 'Shipment' }
  & Pick<Shipment, 'id' | 'title' | 'proposalPk' | 'status' | 'externalRef' | 'questionaryId' | 'visitId' | 'creatorId' | 'created'>
  & { proposal: (
    { __typename?: 'Proposal' }
    & Pick<Proposal, 'proposalId'>
  ) }
);

export type GetMyShipmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyShipmentsQuery = (
  { __typename?: 'Query' }
  & { myShipments: Maybe<Array<(
    { __typename?: 'Shipment' }
    & ShipmentFragment
  )>> }
);

export type GetShipmentQueryVariables = Exact<{
  shipmentId: Scalars['Int'];
}>;


export type GetShipmentQuery = (
  { __typename?: 'Query' }
  & { shipment: Maybe<(
    { __typename?: 'Shipment' }
    & { questionary: (
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
      & QuestionaryFragment
    ), samples: Array<(
      { __typename?: 'Sample' }
      & SampleFragment
    )> }
    & ShipmentFragment
  )> }
);

export type GetShipmentsQueryVariables = Exact<{
  filter?: Maybe<ShipmentsFilter>;
}>;


export type GetShipmentsQuery = (
  { __typename?: 'Query' }
  & { shipments: Maybe<Array<(
    { __typename?: 'Shipment' }
    & ShipmentFragment
  )>> }
);

export type SetActiveTemplateMutationVariables = Exact<{
  templateCategoryId: TemplateCategoryId;
  templateId: Scalars['Int'];
}>;


export type SetActiveTemplateMutation = (
  { __typename?: 'Mutation' }
  & { setActiveTemplate: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SubmitShipmentMutationVariables = Exact<{
  shipmentId: Scalars['Int'];
}>;


export type SubmitShipmentMutation = (
  { __typename?: 'Mutation' }
  & { submitShipment: (
    { __typename?: 'ShipmentResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, shipment: Maybe<(
      { __typename?: 'Shipment' }
      & ShipmentFragment
    )> }
  ) }
);

export type UpdateShipmentMutationVariables = Exact<{
  shipmentId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  proposalPk?: Maybe<Scalars['Int']>;
  status?: Maybe<ShipmentStatus>;
}>;


export type UpdateShipmentMutation = (
  { __typename?: 'Mutation' }
  & { updateShipment: (
    { __typename?: 'ShipmentResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )>, shipment: Maybe<(
      { __typename?: 'Shipment' }
      & { questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ) }
      & ShipmentFragment
    )> }
  ) }
);

export type CloneTemplateMutationVariables = Exact<{
  templateId: Scalars['Int'];
}>;


export type CloneTemplateMutation = (
  { __typename?: 'Mutation' }
  & { cloneTemplate: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateMetadataFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateTemplateMutationVariables = Exact<{
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type CreateTemplateMutation = (
  { __typename?: 'Mutation' }
  & { createTemplate: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateMetadataFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateQuestionMutationVariables = Exact<{
  categoryId: TemplateCategoryId;
  dataType: DataType;
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion: (
    { __typename?: 'QuestionResponseWrap' }
    & { question: Maybe<(
      { __typename?: 'Question' }
      & QuestionFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateQuestionTemplateRelationMutationVariables = Exact<{
  templateId: Scalars['Int'];
  questionId: Scalars['String'];
  topicId: Scalars['Int'];
  sortOrder: Scalars['Int'];
}>;


export type CreateQuestionTemplateRelationMutation = (
  { __typename?: 'Mutation' }
  & { createQuestionTemplateRelation: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateTopicMutationVariables = Exact<{
  templateId: Scalars['Int'];
  sortOrder: Scalars['Int'];
}>;


export type CreateTopicMutation = (
  { __typename?: 'Mutation' }
  & { createTopic: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['String'];
}>;


export type DeleteQuestionMutation = (
  { __typename?: 'Mutation' }
  & { deleteQuestion: (
    { __typename?: 'QuestionResponseWrap' }
    & { question: Maybe<(
      { __typename?: 'Question' }
      & QuestionFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteQuestionTemplateRelationMutationVariables = Exact<{
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
}>;


export type DeleteQuestionTemplateRelationMutation = (
  { __typename?: 'Mutation' }
  & { deleteQuestionTemplateRelation: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteTemplateMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTemplateMutation = (
  { __typename?: 'Mutation' }
  & { deleteTemplate: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & Pick<Template, 'templateId' | 'name'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteTopicMutationVariables = Exact<{
  topicId: Scalars['Int'];
}>;


export type DeleteTopicMutation = (
  { __typename?: 'Mutation' }
  & { deleteTopic: (
    { __typename?: 'TemplateResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type FieldConditionFragment = (
  { __typename?: 'FieldCondition' }
  & Pick<FieldCondition, 'condition' | 'params'>
);

type FieldConfigBooleanConfigFragment = (
  { __typename?: 'BooleanConfig' }
  & Pick<BooleanConfig, 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigDateConfigFragment = (
  { __typename?: 'DateConfig' }
  & Pick<DateConfig, 'small_label' | 'required' | 'tooltip' | 'minDate' | 'maxDate' | 'defaultDate' | 'includeTime'>
);

type FieldConfigEmbellishmentConfigFragment = (
  { __typename?: 'EmbellishmentConfig' }
  & Pick<EmbellishmentConfig, 'html' | 'plain' | 'omitFromPdf'>
);

type FieldConfigFileUploadConfigFragment = (
  { __typename?: 'FileUploadConfig' }
  & Pick<FileUploadConfig, 'file_type' | 'max_files' | 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigSelectionFromOptionsConfigFragment = (
  { __typename?: 'SelectionFromOptionsConfig' }
  & Pick<SelectionFromOptionsConfig, 'variant' | 'options' | 'isMultipleSelect' | 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigTextInputConfigFragment = (
  { __typename?: 'TextInputConfig' }
  & Pick<TextInputConfig, 'min' | 'max' | 'multiline' | 'placeholder' | 'small_label' | 'required' | 'tooltip' | 'htmlQuestion' | 'isHtmlQuestion' | 'isCounterHidden'>
);

type FieldConfigSampleBasisConfigFragment = (
  { __typename?: 'SampleBasisConfig' }
  & Pick<SampleBasisConfig, 'titlePlaceholder'>
);

type FieldConfigSubTemplateConfigFragment = (
  { __typename?: 'SubTemplateConfig' }
  & Pick<SubTemplateConfig, 'addEntryButtonLabel' | 'minEntries' | 'maxEntries' | 'templateId' | 'templateCategory' | 'required' | 'small_label'>
);

type FieldConfigProposalBasisConfigFragment = (
  { __typename?: 'ProposalBasisConfig' }
  & Pick<ProposalBasisConfig, 'tooltip'>
);

type FieldConfigIntervalConfigFragment = (
  { __typename?: 'IntervalConfig' }
  & Pick<IntervalConfig, 'units' | 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigNumberInputConfigFragment = (
  { __typename?: 'NumberInputConfig' }
  & Pick<NumberInputConfig, 'units' | 'numberValueConstraint' | 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigShipmentBasisConfigFragment = (
  { __typename?: 'ShipmentBasisConfig' }
  & Pick<ShipmentBasisConfig, 'small_label' | 'required' | 'tooltip'>
);

type FieldConfigRichTextInputConfigFragment = (
  { __typename?: 'RichTextInputConfig' }
  & Pick<RichTextInputConfig, 'small_label' | 'required' | 'tooltip' | 'max'>
);

type FieldConfigVisitBasisConfigFragment = (
  { __typename?: 'VisitBasisConfig' }
  & Pick<VisitBasisConfig, 'small_label' | 'required' | 'tooltip'>
);

export type FieldConfigFragment = FieldConfigBooleanConfigFragment | FieldConfigDateConfigFragment | FieldConfigEmbellishmentConfigFragment | FieldConfigFileUploadConfigFragment | FieldConfigSelectionFromOptionsConfigFragment | FieldConfigTextInputConfigFragment | FieldConfigSampleBasisConfigFragment | FieldConfigSubTemplateConfigFragment | FieldConfigProposalBasisConfigFragment | FieldConfigIntervalConfigFragment | FieldConfigNumberInputConfigFragment | FieldConfigShipmentBasisConfigFragment | FieldConfigRichTextInputConfigFragment | FieldConfigVisitBasisConfigFragment;

export type QuestionFragment = (
  { __typename?: 'Question' }
  & Pick<Question, 'id' | 'question' | 'naturalKey' | 'dataType' | 'categoryId'>
  & { config: (
    { __typename?: 'BooleanConfig' }
    & FieldConfigBooleanConfigFragment
  ) | (
    { __typename?: 'DateConfig' }
    & FieldConfigDateConfigFragment
  ) | (
    { __typename?: 'EmbellishmentConfig' }
    & FieldConfigEmbellishmentConfigFragment
  ) | (
    { __typename?: 'FileUploadConfig' }
    & FieldConfigFileUploadConfigFragment
  ) | (
    { __typename?: 'SelectionFromOptionsConfig' }
    & FieldConfigSelectionFromOptionsConfigFragment
  ) | (
    { __typename?: 'TextInputConfig' }
    & FieldConfigTextInputConfigFragment
  ) | (
    { __typename?: 'SampleBasisConfig' }
    & FieldConfigSampleBasisConfigFragment
  ) | (
    { __typename?: 'SubTemplateConfig' }
    & FieldConfigSubTemplateConfigFragment
  ) | (
    { __typename?: 'ProposalBasisConfig' }
    & FieldConfigProposalBasisConfigFragment
  ) | (
    { __typename?: 'IntervalConfig' }
    & FieldConfigIntervalConfigFragment
  ) | (
    { __typename?: 'NumberInputConfig' }
    & FieldConfigNumberInputConfigFragment
  ) | (
    { __typename?: 'ShipmentBasisConfig' }
    & FieldConfigShipmentBasisConfigFragment
  ) | (
    { __typename?: 'RichTextInputConfig' }
    & FieldConfigRichTextInputConfigFragment
  ) | (
    { __typename?: 'VisitBasisConfig' }
    & FieldConfigVisitBasisConfigFragment
  ) }
);

export type QuestionTemplateRelationFragment = (
  { __typename?: 'QuestionTemplateRelation' }
  & Pick<QuestionTemplateRelation, 'sortOrder' | 'topicId' | 'dependenciesOperator'>
  & { question: (
    { __typename?: 'Question' }
    & QuestionFragment
  ), config: (
    { __typename?: 'BooleanConfig' }
    & FieldConfigBooleanConfigFragment
  ) | (
    { __typename?: 'DateConfig' }
    & FieldConfigDateConfigFragment
  ) | (
    { __typename?: 'EmbellishmentConfig' }
    & FieldConfigEmbellishmentConfigFragment
  ) | (
    { __typename?: 'FileUploadConfig' }
    & FieldConfigFileUploadConfigFragment
  ) | (
    { __typename?: 'SelectionFromOptionsConfig' }
    & FieldConfigSelectionFromOptionsConfigFragment
  ) | (
    { __typename?: 'TextInputConfig' }
    & FieldConfigTextInputConfigFragment
  ) | (
    { __typename?: 'SampleBasisConfig' }
    & FieldConfigSampleBasisConfigFragment
  ) | (
    { __typename?: 'SubTemplateConfig' }
    & FieldConfigSubTemplateConfigFragment
  ) | (
    { __typename?: 'ProposalBasisConfig' }
    & FieldConfigProposalBasisConfigFragment
  ) | (
    { __typename?: 'IntervalConfig' }
    & FieldConfigIntervalConfigFragment
  ) | (
    { __typename?: 'NumberInputConfig' }
    & FieldConfigNumberInputConfigFragment
  ) | (
    { __typename?: 'ShipmentBasisConfig' }
    & FieldConfigShipmentBasisConfigFragment
  ) | (
    { __typename?: 'RichTextInputConfig' }
    & FieldConfigRichTextInputConfigFragment
  ) | (
    { __typename?: 'VisitBasisConfig' }
    & FieldConfigVisitBasisConfigFragment
  ), dependencies: Array<(
    { __typename?: 'FieldDependency' }
    & Pick<FieldDependency, 'questionId' | 'dependencyId' | 'dependencyNaturalKey'>
    & { condition: (
      { __typename?: 'FieldCondition' }
      & FieldConditionFragment
    ) }
  )> }
);

export type TemplateFragment = (
  { __typename?: 'Template' }
  & Pick<Template, 'isArchived' | 'questionaryCount' | 'templateId' | 'categoryId' | 'name' | 'description'>
  & { steps: Array<(
    { __typename?: 'TemplateStep' }
    & { topic: (
      { __typename?: 'Topic' }
      & TopicFragment
    ), fields: Array<(
      { __typename?: 'QuestionTemplateRelation' }
      & QuestionTemplateRelationFragment
    )> }
  )>, complementaryQuestions: Array<(
    { __typename?: 'Question' }
    & QuestionFragment
  )> }
);

export type TemplateMetadataFragment = (
  { __typename?: 'Template' }
  & Pick<Template, 'templateId' | 'name' | 'description' | 'isArchived'>
);

export type TemplateStepFragment = (
  { __typename?: 'TemplateStep' }
  & { topic: (
    { __typename?: 'Topic' }
    & Pick<Topic, 'title' | 'id' | 'sortOrder' | 'isEnabled'>
  ), fields: Array<(
    { __typename?: 'QuestionTemplateRelation' }
    & QuestionTemplateRelationFragment
  )> }
);

export type TopicFragment = (
  { __typename?: 'Topic' }
  & Pick<Topic, 'title' | 'id' | 'templateId' | 'sortOrder' | 'isEnabled'>
);

export type GetActiveTemplateIdQueryVariables = Exact<{
  templateCategoryId: TemplateCategoryId;
}>;


export type GetActiveTemplateIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'activeTemplateId'>
);

export type GetIsNaturalKeyPresentQueryVariables = Exact<{
  naturalKey: Scalars['String'];
}>;


export type GetIsNaturalKeyPresentQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isNaturalKeyPresent'>
);

export type GetProposalTemplatesQueryVariables = Exact<{
  filter?: Maybe<ProposalTemplatesFilter>;
}>;


export type GetProposalTemplatesQuery = (
  { __typename?: 'Query' }
  & { proposalTemplates: Maybe<Array<(
    { __typename?: 'ProposalTemplate' }
    & Pick<ProposalTemplate, 'templateId' | 'name' | 'description' | 'isArchived' | 'questionaryCount' | 'callCount'>
  )>> }
);

export type GetQuestionsQueryVariables = Exact<{
  filter?: Maybe<QuestionsFilter>;
}>;


export type GetQuestionsQuery = (
  { __typename?: 'Query' }
  & { questions: Array<(
    { __typename?: 'QuestionWithUsage' }
    & Pick<QuestionWithUsage, 'id' | 'question' | 'naturalKey' | 'dataType' | 'categoryId'>
    & { config: (
      { __typename?: 'BooleanConfig' }
      & FieldConfigBooleanConfigFragment
    ) | (
      { __typename?: 'DateConfig' }
      & FieldConfigDateConfigFragment
    ) | (
      { __typename?: 'EmbellishmentConfig' }
      & FieldConfigEmbellishmentConfigFragment
    ) | (
      { __typename?: 'FileUploadConfig' }
      & FieldConfigFileUploadConfigFragment
    ) | (
      { __typename?: 'SelectionFromOptionsConfig' }
      & FieldConfigSelectionFromOptionsConfigFragment
    ) | (
      { __typename?: 'TextInputConfig' }
      & FieldConfigTextInputConfigFragment
    ) | (
      { __typename?: 'SampleBasisConfig' }
      & FieldConfigSampleBasisConfigFragment
    ) | (
      { __typename?: 'SubTemplateConfig' }
      & FieldConfigSubTemplateConfigFragment
    ) | (
      { __typename?: 'ProposalBasisConfig' }
      & FieldConfigProposalBasisConfigFragment
    ) | (
      { __typename?: 'IntervalConfig' }
      & FieldConfigIntervalConfigFragment
    ) | (
      { __typename?: 'NumberInputConfig' }
      & FieldConfigNumberInputConfigFragment
    ) | (
      { __typename?: 'ShipmentBasisConfig' }
      & FieldConfigShipmentBasisConfigFragment
    ) | (
      { __typename?: 'RichTextInputConfig' }
      & FieldConfigRichTextInputConfigFragment
    ) | (
      { __typename?: 'VisitBasisConfig' }
      & FieldConfigVisitBasisConfigFragment
    ), answers: Array<(
      { __typename?: 'AnswerBasic' }
      & Pick<AnswerBasic, 'questionaryId'>
    )>, templates: Array<(
      { __typename?: 'Template' }
      & Pick<Template, 'templateId'>
    )> }
  )> }
);

export type GetTemplateQueryVariables = Exact<{
  templateId: Scalars['Int'];
}>;


export type GetTemplateQuery = (
  { __typename?: 'Query' }
  & { template: Maybe<(
    { __typename?: 'Template' }
    & TemplateFragment
  )> }
);

export type GetTemplateCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTemplateCategoriesQuery = (
  { __typename?: 'Query' }
  & { templateCategories: Maybe<Array<(
    { __typename?: 'TemplateCategory' }
    & Pick<TemplateCategory, 'categoryId' | 'name'>
  )>> }
);

export type GetTemplatesQueryVariables = Exact<{
  filter?: Maybe<TemplatesFilter>;
}>;


export type GetTemplatesQuery = (
  { __typename?: 'Query' }
  & { templates: Maybe<Array<(
    { __typename?: 'Template' }
    & Pick<Template, 'templateId' | 'name' | 'description' | 'isArchived' | 'questionaryCount'>
  )>> }
);

export type UpdateQuestionMutationVariables = Exact<{
  id: Scalars['String'];
  naturalKey?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  config?: Maybe<Scalars['String']>;
}>;


export type UpdateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { updateQuestion: (
    { __typename?: 'QuestionResponseWrap' }
    & { question: Maybe<(
      { __typename?: 'Question' }
      & QuestionFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateQuestionTemplateRelationMutationVariables = Exact<{
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
  topicId?: Maybe<Scalars['Int']>;
  sortOrder: Scalars['Int'];
  config?: Maybe<Scalars['String']>;
}>;


export type UpdateQuestionTemplateRelationMutation = (
  { __typename?: 'Mutation' }
  & { updateQuestionTemplateRelation: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateQuestionTemplateRelationSettingsMutationVariables = Exact<{
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
  config?: Maybe<Scalars['String']>;
  dependencies: Array<FieldDependencyInput> | FieldDependencyInput;
  dependenciesOperator?: Maybe<DependenciesLogicOperator>;
}>;


export type UpdateQuestionTemplateRelationSettingsMutation = (
  { __typename?: 'Mutation' }
  & { updateQuestionTemplateRelationSettings: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateTemplateMutationVariables = Exact<{
  templateId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isArchived?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateTemplateMutation = (
  { __typename?: 'Mutation' }
  & { updateTemplate: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateMetadataFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateTopicMutationVariables = Exact<{
  topicId: Scalars['Int'];
  templateId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateTopic: (
    { __typename?: 'TemplateResponseWrap' }
    & { template: Maybe<(
      { __typename?: 'Template' }
      & TemplateFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CheckExternalTokenMutationVariables = Exact<{
  externalToken: Scalars['String'];
}>;


export type CheckExternalTokenMutation = (
  { __typename?: 'Mutation' }
  & { checkExternalToken: (
    { __typename?: 'CheckExternalTokenWrap' }
    & Pick<CheckExternalTokenWrap, 'token'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CheckTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type CheckTokenQuery = (
  { __typename?: 'Query' }
  & { checkToken: (
    { __typename?: 'TokenResult' }
    & Pick<TokenResult, 'isValid'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  user_title?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  middlename?: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  password: Scalars['String'];
  preferredname?: Maybe<Scalars['String']>;
  orcid: Scalars['String'];
  orcidHash: Scalars['String'];
  refreshToken: Scalars['String'];
  gender: Scalars['String'];
  nationality: Scalars['Int'];
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  telephone_alt?: Maybe<Scalars['String']>;
  otherOrganisation?: Maybe<Scalars['String']>;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponseWrap' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateUserByEmailInviteMutationVariables = Exact<{
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  userRole: UserRole;
}>;


export type CreateUserByEmailInviteMutation = (
  { __typename?: 'Mutation' }
  & { createUserByEmailInvite: (
    { __typename?: 'CreateUserByEmailInviteResponseWrap' }
    & Pick<CreateUserByEmailInviteResponseWrap, 'id'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'UserResponseWrap' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type BasicUserDetailsFragment = (
  { __typename?: 'BasicUserDetails' }
  & Pick<BasicUserDetails, 'id' | 'firstname' | 'lastname' | 'organisation' | 'position' | 'created' | 'placeholder'>
);

export type GetBasicUserDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetBasicUserDetailsQuery = (
  { __typename?: 'Query' }
  & { basicUserDetails: Maybe<(
    { __typename?: 'BasicUserDetails' }
    & BasicUserDetailsFragment
  )> }
);

export type GetFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFieldsQuery = (
  { __typename?: 'Query' }
  & { getFields: Maybe<(
    { __typename?: 'Fields' }
    & { nationalities: Array<(
      { __typename?: 'Entry' }
      & Pick<Entry, 'id' | 'value'>
    )> }
  )> }
);

export type GetMyRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRolesQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstname' | 'lastname'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'shortCode' | 'title'>
    )> }
  )> }
);

export type GetOrcIdInformationQueryVariables = Exact<{
  authorizationCode: Scalars['String'];
}>;


export type GetOrcIdInformationQuery = (
  { __typename?: 'Query' }
  & { getOrcIDInformation: Maybe<(
    { __typename?: 'OrcIDInformation' }
    & Pick<OrcIdInformation, 'firstname' | 'lastname' | 'orcid' | 'orcidHash' | 'refreshToken' | 'token'>
  )> }
);

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = (
  { __typename?: 'Query' }
  & { roles: Maybe<Array<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'shortCode' | 'title'>
  )>> }
);

export type GetTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetTokenMutation = (
  { __typename?: 'Mutation' }
  & { token: (
    { __typename?: 'TokenResponseWrap' }
    & Pick<TokenResponseWrap, 'token'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type GetTokenForUserMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetTokenForUserMutation = (
  { __typename?: 'Mutation' }
  & { getTokenForUser: (
    { __typename?: 'TokenResponseWrap' }
    & Pick<TokenResponseWrap, 'token'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'user_title' | 'username' | 'firstname' | 'middlename' | 'lastname' | 'preferredname' | 'gender' | 'nationality' | 'birthdate' | 'organisation' | 'department' | 'position' | 'email' | 'telephone' | 'telephone_alt' | 'orcid' | 'emailVerified' | 'placeholder'>
  )> }
);

export type GetUserMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'user_title' | 'username' | 'firstname' | 'middlename' | 'lastname' | 'preferredname' | 'gender' | 'nationality' | 'birthdate' | 'organisation' | 'department' | 'position' | 'email' | 'telephone' | 'telephone_alt' | 'orcid' | 'emailVerified' | 'placeholder'>
  )> }
);

export type GetUserProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProposalsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & { proposals: Array<(
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'primaryKey' | 'proposalId' | 'title' | 'publicStatus' | 'statusId' | 'created' | 'finalStatus' | 'notified' | 'submitted'>
      & { status: Maybe<(
        { __typename?: 'ProposalStatus' }
        & ProposalStatusFragment
      )>, proposer: Maybe<(
        { __typename?: 'BasicUserDetails' }
        & Pick<BasicUserDetails, 'id'>
      )>, call: Maybe<(
        { __typename?: 'Call' }
        & Pick<Call, 'id' | 'shortCode' | 'isActive'>
      )> }
    )> }
  )> }
);

export type GetUserWithRolesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserWithRolesQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstname' | 'lastname'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'shortCode' | 'title'>
    )> }
  )> }
);

export type GetUsersQueryVariables = Exact<{
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  userRole?: Maybe<UserRole>;
  subtractUsers?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
    { __typename?: 'UserQueryResult' }
    & Pick<UserQueryResult, 'totalCount'>
    & { users: Array<(
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'TokenResponseWrap' }
    & Pick<TokenResponseWrap, 'token'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'BasicUserDetailsResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type ResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordEmailMutation = (
  { __typename?: 'Mutation' }
  & { resetPasswordEmail: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SelectRoleMutationVariables = Exact<{
  token: Scalars['String'];
  selectedRoleId: Scalars['Int'];
}>;


export type SelectRoleMutation = (
  { __typename?: 'Mutation' }
  & { selectRole: (
    { __typename?: 'TokenResponseWrap' }
    & Pick<TokenResponseWrap, 'token'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SetUserEmailVerifiedMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SetUserEmailVerifiedMutation = (
  { __typename?: 'Mutation' }
  & { setUserEmailVerified: (
    { __typename?: 'UserResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type SetUserNotPlaceholderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SetUserNotPlaceholderMutation = (
  { __typename?: 'Mutation' }
  & { setUserNotPlaceholder: (
    { __typename?: 'UserResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdatePasswordMutationVariables = Exact<{
  id: Scalars['Int'];
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { updatePassword: (
    { __typename?: 'BasicUserDetailsResponseWrap' }
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  user_title?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  middlename?: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  preferredname?: Maybe<Scalars['String']>;
  gender: Scalars['String'];
  nationality: Scalars['Int'];
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  telephone_alt?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponseWrap' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateUserRolesMutationVariables = Exact<{
  id: Scalars['Int'];
  roles?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type UpdateUserRolesMutation = (
  { __typename?: 'Mutation' }
  & { updateUserRoles: (
    { __typename?: 'UserResponseWrap' }
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & { emailVerification: (
    { __typename?: 'EmailVerificationResponseWrap' }
    & Pick<EmailVerificationResponseWrap, 'success'>
    & { rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateVisitMutationVariables = Exact<{
  proposalPk: Scalars['Int'];
  team: Array<Scalars['Int']> | Scalars['Int'];
  scheduledEventId: Scalars['Int'];
  teamLeadUserId: Scalars['Int'];
}>;


export type CreateVisitMutation = (
  { __typename?: 'Mutation' }
  & { createVisit: (
    { __typename?: 'VisitResponseWrap' }
    & { visit: Maybe<(
      { __typename?: 'Visit' }
      & { teamLead: (
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      ), registrations: Array<(
        { __typename?: 'VisitRegistration' }
        & { user: (
          { __typename?: 'BasicUserDetails' }
          & BasicUserDetailsFragment
        ) }
        & VisitRegistrationFragment
      )>, proposal: (
        { __typename?: 'Proposal' }
        & { instrument: Maybe<(
          { __typename?: 'Instrument' }
          & Pick<Instrument, 'name'>
        )> }
        & ProposalFragment
      ), shipments: Array<(
        { __typename?: 'Shipment' }
        & ShipmentFragment
      )> }
      & VisitFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type CreateVisitRegistrationQuestionaryMutationVariables = Exact<{
  visitId: Scalars['Int'];
}>;


export type CreateVisitRegistrationQuestionaryMutation = (
  { __typename?: 'Mutation' }
  & { createVisitRegistrationQuestionary: (
    { __typename?: 'VisitRegistrationResponseWrap' }
    & { registration: Maybe<(
      { __typename?: 'VisitRegistration' }
      & { user: (
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      ), questionary: (
        { __typename?: 'Questionary' }
        & Pick<Questionary, 'isCompleted'>
        & QuestionaryFragment
      ) }
      & VisitRegistrationFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type DeleteVisitMutationVariables = Exact<{
  visitId: Scalars['Int'];
}>;


export type DeleteVisitMutation = (
  { __typename?: 'Mutation' }
  & { deleteVisit: (
    { __typename?: 'VisitResponseWrap' }
    & { visit: Maybe<(
      { __typename?: 'Visit' }
      & VisitFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type VisitFragment = (
  { __typename?: 'Visit' }
  & Pick<Visit, 'id' | 'proposalPk' | 'status' | 'creatorId'>
);

export type VisitRegistrationFragment = (
  { __typename?: 'VisitRegistration' }
  & Pick<VisitRegistration, 'userId' | 'visitId' | 'registrationQuestionaryId' | 'isRegistrationSubmitted' | 'trainingExpiryDate'>
);

export type GetVisitQueryVariables = Exact<{
  visitId: Scalars['Int'];
}>;


export type GetVisitQuery = (
  { __typename?: 'Query' }
  & { visit: Maybe<(
    { __typename?: 'Visit' }
    & { registrations: Array<(
      { __typename?: 'VisitRegistration' }
      & { user: (
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      ) }
      & VisitRegistrationFragment
    )>, proposal: (
      { __typename?: 'Proposal' }
      & { instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'name'>
      )> }
      & ProposalFragment
    ) }
    & VisitFragment
  )> }
);

export type GetVisitRegistrationQueryVariables = Exact<{
  visitId: Scalars['Int'];
}>;


export type GetVisitRegistrationQuery = (
  { __typename?: 'Query' }
  & { visitRegistration: Maybe<(
    { __typename?: 'VisitRegistration' }
    & { user: (
      { __typename?: 'BasicUserDetails' }
      & BasicUserDetailsFragment
    ), questionary: (
      { __typename?: 'Questionary' }
      & Pick<Questionary, 'isCompleted'>
      & QuestionaryFragment
    ) }
    & VisitRegistrationFragment
  )> }
);

export type GetVisitsQueryVariables = Exact<{
  filter?: Maybe<VisitsFilter>;
}>;


export type GetVisitsQuery = (
  { __typename?: 'Query' }
  & { visits: Array<(
    { __typename?: 'Visit' }
    & { proposal: (
      { __typename?: 'Proposal' }
      & { instrument: Maybe<(
        { __typename?: 'Instrument' }
        & Pick<Instrument, 'name'>
      )> }
      & ProposalFragment
    ) }
    & VisitFragment
  )> }
);

export type UpdateVisitMutationVariables = Exact<{
  visitId: Scalars['Int'];
  proposalPkAndEventId?: Maybe<ProposalPkAndEventId>;
  team?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  status?: Maybe<VisitStatus>;
  teamLeadUserId?: Maybe<Scalars['Int']>;
}>;


export type UpdateVisitMutation = (
  { __typename?: 'Mutation' }
  & { updateVisit: (
    { __typename?: 'VisitResponseWrap' }
    & { visit: Maybe<(
      { __typename?: 'Visit' }
      & { teamLead: (
        { __typename?: 'BasicUserDetails' }
        & BasicUserDetailsFragment
      ), registrations: Array<(
        { __typename?: 'VisitRegistration' }
        & { user: (
          { __typename?: 'BasicUserDetails' }
          & BasicUserDetailsFragment
        ) }
        & VisitRegistrationFragment
      )>, proposal: (
        { __typename?: 'Proposal' }
        & { instrument: Maybe<(
          { __typename?: 'Instrument' }
          & Pick<Instrument, 'name'>
        )> }
        & ProposalFragment
      ), shipments: Array<(
        { __typename?: 'Shipment' }
        & ShipmentFragment
      )> }
      & VisitFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export type UpdateVisitRegistrationMutationVariables = Exact<{
  visitId: Scalars['Int'];
  trainingExpiryDate?: Maybe<Scalars['DateTime']>;
  isRegistrationSubmitted?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateVisitRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { updateVisitRegistration: (
    { __typename?: 'VisitRegistrationResponseWrap' }
    & { registration: Maybe<(
      { __typename?: 'VisitRegistration' }
      & VisitRegistrationFragment
    )>, rejection: Maybe<(
      { __typename?: 'Rejection' }
      & RejectionFragment
    )> }
  ) }
);

export const RejectionFragmentDoc = gql`
    fragment rejection on Rejection {
  reason
  context
  exception
}
    `;
export const BasicUserDetailsFragmentDoc = gql`
    fragment basicUserDetails on BasicUserDetails {
  id
  firstname
  lastname
  organisation
  position
  created
  placeholder
}
    `;
export const CallFragmentDoc = gql`
    fragment call on Call {
  id
  shortCode
  startCall
  endCall
  startReview
  endReview
  startSEPReview
  endSEPReview
  startNotify
  endNotify
  startCycle
  endCycle
  cycleComment
  surveyComment
  referenceNumberFormat
  proposalWorkflowId
  templateId
  allocationTimeUnit
  instruments {
    id
    name
    shortCode
    description
    availabilityTime
    submitted
    scientists {
      ...basicUserDetails
    }
  }
  proposalWorkflow {
    id
    name
    description
  }
  template {
    templateId
    name
    isArchived
  }
  proposalCount
}
    ${BasicUserDetailsFragmentDoc}`;
export const CoreTechnicalReviewFragmentDoc = gql`
    fragment coreTechnicalReview on TechnicalReview {
  id
  comment
  publicComment
  timeAllocation
  status
  proposalPk
  submitted
}
    `;
export const ProposalStatusFragmentDoc = gql`
    fragment proposalStatus on ProposalStatus {
  id
  shortCode
  name
  description
  isDefault
}
    `;
export const SepMeetingDecisionFragmentDoc = gql`
    fragment sepMeetingDecision on SepMeetingDecision {
  proposalPk
  recommendation
  commentForUser
  commentForManagement
  rankOrder
  submitted
  submittedBy
}
    `;
export const ProposalFragmentDoc = gql`
    fragment proposal on Proposal {
  primaryKey
  title
  abstract
  statusId
  status {
    ...proposalStatus
  }
  publicStatus
  proposalId
  finalStatus
  commentForUser
  commentForManagement
  created
  updated
  callId
  questionaryId
  notified
  submitted
  managementTimeAllocation
  managementDecisionSubmitted
  technicalReviewAssignee
  sepMeetingDecision {
    ...sepMeetingDecision
  }
}
    ${ProposalStatusFragmentDoc}
${SepMeetingDecisionFragmentDoc}`;
export const TopicFragmentDoc = gql`
    fragment topic on Topic {
  title
  id
  templateId
  sortOrder
  isEnabled
}
    `;
export const FieldConfigFragmentDoc = gql`
    fragment fieldConfig on FieldConfig {
  ... on BooleanConfig {
    small_label
    required
    tooltip
  }
  ... on DateConfig {
    small_label
    required
    tooltip
    minDate
    maxDate
    defaultDate
    includeTime
  }
  ... on EmbellishmentConfig {
    html
    plain
    omitFromPdf
  }
  ... on FileUploadConfig {
    file_type
    max_files
    small_label
    required
    tooltip
  }
  ... on IntervalConfig {
    units
    small_label
    required
    tooltip
  }
  ... on NumberInputConfig {
    units
    numberValueConstraint
    small_label
    required
    tooltip
  }
  ... on ProposalBasisConfig {
    tooltip
  }
  ... on SampleBasisConfig {
    titlePlaceholder
  }
  ... on SubTemplateConfig {
    addEntryButtonLabel
    minEntries
    maxEntries
    templateId
    templateCategory
    required
    small_label
  }
  ... on SelectionFromOptionsConfig {
    variant
    options
    isMultipleSelect
    small_label
    required
    tooltip
  }
  ... on TextInputConfig {
    min
    max
    multiline
    placeholder
    small_label
    required
    tooltip
    htmlQuestion
    isHtmlQuestion
    isCounterHidden
  }
  ... on ShipmentBasisConfig {
    small_label
    required
    tooltip
  }
  ... on RichTextInputConfig {
    small_label
    required
    tooltip
    max
  }
  ... on VisitBasisConfig {
    small_label
    required
    tooltip
  }
}
    `;
export const QuestionFragmentDoc = gql`
    fragment question on Question {
  id
  question
  naturalKey
  dataType
  categoryId
  config {
    ...fieldConfig
  }
}
    ${FieldConfigFragmentDoc}`;
export const FieldConditionFragmentDoc = gql`
    fragment fieldCondition on FieldCondition {
  condition
  params
}
    `;
export const AnswerFragmentDoc = gql`
    fragment answer on Answer {
  answerId
  question {
    ...question
  }
  sortOrder
  topicId
  config {
    ...fieldConfig
  }
  dependencies {
    questionId
    dependencyId
    dependencyNaturalKey
    condition {
      ...fieldCondition
    }
  }
  dependenciesOperator
  value
}
    ${QuestionFragmentDoc}
${FieldConfigFragmentDoc}
${FieldConditionFragmentDoc}`;
export const QuestionaryStepFragmentDoc = gql`
    fragment questionaryStep on QuestionaryStep {
  topic {
    ...topic
  }
  isCompleted
  fields {
    ...answer
  }
}
    ${TopicFragmentDoc}
${AnswerFragmentDoc}`;
export const QuestionaryFragmentDoc = gql`
    fragment questionary on Questionary {
  questionaryId
  templateId
  created
  steps {
    ...questionaryStep
  }
}
    ${QuestionaryStepFragmentDoc}`;
export const CoreReviewFragmentDoc = gql`
    fragment coreReview on Review {
  id
  userID
  status
  comment
  grade
  sepID
}
    `;
export const SampleFragmentDoc = gql`
    fragment sample on Sample {
  id
  title
  creatorId
  questionaryId
  safetyStatus
  safetyComment
  created
  proposalPk
  questionId
}
    `;
export const ShipmentFragmentDoc = gql`
    fragment shipment on Shipment {
  id
  title
  proposalPk
  status
  externalRef
  questionaryId
  visitId
  creatorId
  created
  proposal {
    proposalId
  }
}
    `;
export const QuestionTemplateRelationFragmentDoc = gql`
    fragment questionTemplateRelation on QuestionTemplateRelation {
  question {
    ...question
  }
  sortOrder
  topicId
  config {
    ...fieldConfig
  }
  dependencies {
    questionId
    dependencyId
    dependencyNaturalKey
    condition {
      ...fieldCondition
    }
  }
  dependenciesOperator
}
    ${QuestionFragmentDoc}
${FieldConfigFragmentDoc}
${FieldConditionFragmentDoc}`;
export const TemplateFragmentDoc = gql`
    fragment template on Template {
  steps {
    topic {
      ...topic
    }
    fields {
      ...questionTemplateRelation
    }
  }
  isArchived
  questionaryCount
  templateId
  categoryId
  name
  description
  complementaryQuestions {
    ...question
  }
}
    ${TopicFragmentDoc}
${QuestionTemplateRelationFragmentDoc}
${QuestionFragmentDoc}`;
export const TemplateMetadataFragmentDoc = gql`
    fragment templateMetadata on Template {
  templateId
  name
  description
  isArchived
}
    `;
export const TemplateStepFragmentDoc = gql`
    fragment templateStep on TemplateStep {
  topic {
    title
    id
    sortOrder
    isEnabled
  }
  fields {
    ...questionTemplateRelation
  }
}
    ${QuestionTemplateRelationFragmentDoc}`;
export const VisitFragmentDoc = gql`
    fragment visit on Visit {
  id
  proposalPk
  status
  creatorId
}
    `;
export const VisitRegistrationFragmentDoc = gql`
    fragment visitRegistration on VisitRegistration {
  userId
  visitId
  registrationQuestionaryId
  isRegistrationSubmitted
  trainingExpiryDate
}
    `;
export const AssignProposalsToSepDocument = gql`
    mutation assignProposalsToSep($proposals: [ProposalPkWithCallId!]!, $sepId: Int!) {
  assignProposalsToSep(proposals: $proposals, sepId: $sepId) {
    rejection {
      ...rejection
    }
    nextProposalStatus {
      id
      shortCode
      name
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AssignReviewersToSepDocument = gql`
    mutation assignReviewersToSEP($memberIds: [Int!]!, $sepId: Int!) {
  assignReviewersToSEP(memberIds: $memberIds, sepId: $sepId) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AssignChairOrSecretaryDocument = gql`
    mutation assignChairOrSecretary($assignChairOrSecretaryToSEPInput: AssignChairOrSecretaryToSEPInput!) {
  assignChairOrSecretary(
    assignChairOrSecretaryToSEPInput: $assignChairOrSecretaryToSEPInput
  ) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AssignSepReviewersToProposalDocument = gql`
    mutation assignSepReviewersToProposal($memberIds: [Int!]!, $sepId: Int!, $proposalPk: Int!) {
  assignSepReviewersToProposal(
    memberIds: $memberIds
    sepId: $sepId
    proposalPk: $proposalPk
  ) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateSepDocument = gql`
    mutation createSEP($code: String!, $description: String!, $numberRatingsRequired: Int!, $active: Boolean!) {
  createSEP(
    code: $code
    description: $description
    numberRatingsRequired: $numberRatingsRequired
    active: $active
  ) {
    sep {
      id
      code
      description
      numberRatingsRequired
      active
      sepChair {
        ...basicUserDetails
      }
      sepSecretary {
        ...basicUserDetails
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteSepDocument = gql`
    mutation deleteSEP($id: Int!) {
  deleteSEP(id: $id) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetInstrumentsBySepDocument = gql`
    query getInstrumentsBySEP($sepId: Int!, $callId: Int!) {
  instrumentsBySep(sepId: $sepId, callId: $callId) {
    id
    name
    shortCode
    description
    availabilityTime
    submitted
    scientists {
      ...basicUserDetails
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetUserSepsDocument = gql`
    query getUserSeps {
  me {
    seps {
      id
      code
      description
      numberRatingsRequired
      active
      sepChair {
        ...basicUserDetails
      }
      sepSecretary {
        ...basicUserDetails
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetSepDocument = gql`
    query getSEP($id: Int!) {
  sep(id: $id) {
    id
    code
    description
    numberRatingsRequired
    active
    sepChair {
      ...basicUserDetails
    }
    sepSecretary {
      ...basicUserDetails
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetSepMembersDocument = gql`
    query getSEPMembers($sepId: Int!) {
  sepMembers(sepId: $sepId) {
    userId
    sepId
    role {
      id
      shortCode
      title
    }
    user {
      id
      firstname
      lastname
      organisation
      position
      placeholder
      created
    }
  }
}
    `;
export const GetSepProposalDocument = gql`
    query getSEPProposal($sepId: Int!, $proposalPk: Int!) {
  sepProposal(sepId: $sepId, proposalPk: $proposalPk) {
    proposalPk
    sepId
    sepTimeAllocation
    instrumentSubmitted
    proposal {
      ...proposal
      proposer {
        ...basicUserDetails
      }
      users {
        ...basicUserDetails
      }
      questionary {
        ...questionary
      }
      technicalReview {
        ...coreTechnicalReview
        reviewer {
          ...basicUserDetails
        }
      }
      reviews {
        id
        grade
        comment
        status
        userID
        sepID
        reviewer {
          firstname
          lastname
          id
        }
      }
      instrument {
        id
        name
        shortCode
      }
      call {
        id
        shortCode
        allocationTimeUnit
      }
    }
  }
}
    ${ProposalFragmentDoc}
${BasicUserDetailsFragmentDoc}
${QuestionaryFragmentDoc}
${CoreTechnicalReviewFragmentDoc}`;
export const GetSepProposalsDocument = gql`
    query getSEPProposals($sepId: Int!, $callId: Int!) {
  sepProposals(sepId: $sepId, callId: $callId) {
    proposalPk
    dateAssigned
    sepId
    sepTimeAllocation
    proposal {
      title
      primaryKey
      proposalId
      status {
        ...proposalStatus
      }
    }
    assignments {
      sepMemberUserId
      dateAssigned
      user {
        ...basicUserDetails
      }
      role {
        id
        shortCode
        title
      }
      review {
        id
        status
        comment
        grade
        sepID
      }
    }
  }
}
    ${ProposalStatusFragmentDoc}
${BasicUserDetailsFragmentDoc}`;
export const SepProposalsByInstrumentDocument = gql`
    query sepProposalsByInstrument($instrumentId: Int!, $sepId: Int!, $callId: Int!) {
  sepProposalsByInstrument(
    instrumentId: $instrumentId
    sepId: $sepId
    callId: $callId
  ) {
    sepTimeAllocation
    proposal {
      primaryKey
      title
      proposalId
      status {
        ...proposalStatus
      }
      sepMeetingDecision {
        ...sepMeetingDecision
      }
      reviews {
        id
        comment
        grade
        status
      }
      technicalReview {
        publicComment
        status
        timeAllocation
      }
    }
    assignments {
      sepMemberUserId
    }
  }
}
    ${ProposalStatusFragmentDoc}
${SepMeetingDecisionFragmentDoc}`;
export const GetSepReviewersDocument = gql`
    query getSEPReviewers($sepId: Int!) {
  sepReviewers(sepId: $sepId) {
    userId
    sepId
    role {
      id
      shortCode
      title
    }
    user {
      id
      firstname
      lastname
      organisation
      position
      placeholder
      created
    }
  }
}
    `;
export const GetSePsDocument = gql`
    query getSEPs($filter: String!, $active: Boolean) {
  seps(filter: $filter, active: $active) {
    seps {
      id
      code
      description
      numberRatingsRequired
      active
      sepChair {
        ...basicUserDetails
      }
      sepSecretary {
        ...basicUserDetails
      }
    }
    totalCount
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const RemoveProposalsFromSepDocument = gql`
    mutation removeProposalsFromSep($proposalPks: [Int!]!, $sepId: Int!) {
  removeProposalsFromSep(proposalPks: $proposalPks, sepId: $sepId) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const RemoveMemberFromSepDocument = gql`
    mutation removeMemberFromSep($memberId: Int!, $sepId: Int!, $roleId: UserRole!) {
  removeMemberFromSep(memberId: $memberId, sepId: $sepId, roleId: $roleId) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const RemoveMemberFromSepProposalDocument = gql`
    mutation removeMemberFromSEPProposal($memberId: Int!, $sepId: Int!, $proposalPk: Int!) {
  removeMemberFromSEPProposal(
    memberId: $memberId
    sepId: $sepId
    proposalPk: $proposalPk
  ) {
    rejection {
      ...rejection
    }
    sep {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const ReorderSepMeetingDecisionProposalsDocument = gql`
    mutation reorderSepMeetingDecisionProposals($reorderSepMeetingDecisionProposalsInput: ReorderSepMeetingDecisionProposalsInput!) {
  reorderSepMeetingDecisionProposals(
    reorderSepMeetingDecisionProposalsInput: $reorderSepMeetingDecisionProposalsInput
  ) {
    rejection {
      ...rejection
    }
    sepMeetingDecision {
      proposalPk
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SaveSepMeetingDecisionDocument = gql`
    mutation saveSepMeetingDecision($saveSepMeetingDecisionInput: SaveSEPMeetingDecisionInput!) {
  saveSepMeetingDecision(
    saveSepMeetingDecisionInput: $saveSepMeetingDecisionInput
  ) {
    rejection {
      ...rejection
    }
    sepMeetingDecision {
      proposalPk
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateSepDocument = gql`
    mutation updateSEP($id: Int!, $code: String!, $description: String!, $numberRatingsRequired: Int!, $active: Boolean!) {
  updateSEP(
    id: $id
    code: $code
    description: $description
    numberRatingsRequired: $numberRatingsRequired
    active: $active
  ) {
    sep {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateSepTimeAllocationDocument = gql`
    mutation updateSEPTimeAllocation($sepId: Int!, $proposalPk: Int!, $sepTimeAllocation: Int) {
  updateSEPTimeAllocation(
    sepId: $sepId
    proposalPk: $proposalPk
    sepTimeAllocation: $sepTimeAllocation
  ) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AddClientLogDocument = gql`
    mutation addClientLog($error: String!) {
  addClientLog(error: $error) {
    isSuccess
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateApiAccessTokenDocument = gql`
    mutation createApiAccessToken($name: String!, $accessPermissions: String!) {
  createApiAccessToken(
    createApiAccessTokenInput: {name: $name, accessPermissions: $accessPermissions}
  ) {
    rejection {
      ...rejection
    }
    apiAccessToken {
      id
      name
      accessToken
      accessPermissions
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateInstitutionDocument = gql`
    mutation createInstitution($name: String!, $verified: Boolean!) {
  createInstitution(name: $name, verified: $verified) {
    institution {
      id
      name
      verified
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateUnitDocument = gql`
    mutation createUnit($name: String!) {
  createUnit(name: $name) {
    unit {
      id
      name
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteApiAccessTokenDocument = gql`
    mutation deleteApiAccessToken($accessTokenId: String!) {
  deleteApiAccessToken(deleteApiAccessTokenInput: {accessTokenId: $accessTokenId}) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteInstitutionDocument = gql`
    mutation deleteInstitution($id: Int!) {
  deleteInstitution(id: $id) {
    institution {
      id
      verified
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteUnitDocument = gql`
    mutation deleteUnit($id: Int!) {
  deleteUnit(id: $id) {
    unit {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetAllApiAccessTokensAndPermissionsDocument = gql`
    query getAllApiAccessTokensAndPermissions {
  allAccessTokensAndPermissions {
    id
    name
    accessToken
    accessPermissions
  }
}
    `;
export const GetAllQueriesAndMutationsDocument = gql`
    query getAllQueriesAndMutations {
  queriesAndMutations {
    queries
    mutations
  }
}
    `;
export const GetFeaturesDocument = gql`
    query getFeatures {
  features {
    id
    isEnabled
    description
  }
}
    `;
export const GetInstitutionsDocument = gql`
    query getInstitutions($filter: InstitutionsFilter) {
  institutions(filter: $filter) {
    id
    name
    verified
  }
}
    `;
export const GetPageContentDocument = gql`
    query getPageContent($id: PageName!) {
  getPageContent(id: $id)
}
    `;
export const GetSettingsDocument = gql`
    query getSettings {
  settings {
    id
    settingsValue
    description
  }
}
    `;
export const GetUnitsDocument = gql`
    query getUnits {
  units {
    id
    name
  }
}
    `;
export const SetPageContentDocument = gql`
    mutation setPageContent($id: PageName!, $text: String!) {
  setPageContent(id: $id, text: $text) {
    page {
      id
      content
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateApiAccessTokenDocument = gql`
    mutation updateApiAccessToken($accessTokenId: String!, $name: String!, $accessPermissions: String!) {
  updateApiAccessToken(
    updateApiAccessTokenInput: {accessTokenId: $accessTokenId, name: $name, accessPermissions: $accessPermissions}
  ) {
    rejection {
      ...rejection
    }
    apiAccessToken {
      id
      name
      accessToken
      accessPermissions
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateInstitutionDocument = gql`
    mutation updateInstitution($id: Int!, $name: String!, $verified: Boolean!) {
  updateInstitution(id: $id, name: $name, verified: $verified) {
    institution {
      id
      verified
      name
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AssignInstrumentsToCallDocument = gql`
    mutation assignInstrumentsToCall($instrumentIds: [Int!]!, $callId: Int!) {
  assignInstrumentsToCall(
    assignInstrumentsToCallInput: {instrumentIds: $instrumentIds, callId: $callId}
  ) {
    rejection {
      ...rejection
    }
    call {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateCallDocument = gql`
    mutation createCall($shortCode: String!, $startCall: DateTime!, $endCall: DateTime!, $startReview: DateTime!, $endReview: DateTime!, $startSEPReview: DateTime, $endSEPReview: DateTime, $startNotify: DateTime!, $endNotify: DateTime!, $startCycle: DateTime!, $endCycle: DateTime!, $cycleComment: String!, $surveyComment: String!, $allocationTimeUnit: AllocationTimeUnits!, $referenceNumberFormat: String, $proposalWorkflowId: Int!, $templateId: Int!) {
  createCall(
    createCallInput: {shortCode: $shortCode, startCall: $startCall, endCall: $endCall, startReview: $startReview, endReview: $endReview, startSEPReview: $startSEPReview, endSEPReview: $endSEPReview, startNotify: $startNotify, endNotify: $endNotify, startCycle: $startCycle, endCycle: $endCycle, cycleComment: $cycleComment, surveyComment: $surveyComment, allocationTimeUnit: $allocationTimeUnit, referenceNumberFormat: $referenceNumberFormat, proposalWorkflowId: $proposalWorkflowId, templateId: $templateId}
  ) {
    rejection {
      ...rejection
    }
    call {
      ...call
    }
  }
}
    ${RejectionFragmentDoc}
${CallFragmentDoc}`;
export const DeleteCallDocument = gql`
    mutation deleteCall($id: Int!) {
  deleteCall(id: $id) {
    rejection {
      ...rejection
      ...rejection
    }
    call {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetCallDocument = gql`
    query getCall($id: Int!) {
  call(id: $id) {
    ...call
  }
}
    ${CallFragmentDoc}`;
export const GetCallsDocument = gql`
    query getCalls($filter: CallsFilter) {
  calls(filter: $filter) {
    ...call
  }
}
    ${CallFragmentDoc}`;
export const GetCallsByInstrumentScientistDocument = gql`
    query getCallsByInstrumentScientist($scientistId: Int!) {
  callsByInstrumentScientist(scientistId: $scientistId) {
    ...call
  }
}
    ${CallFragmentDoc}`;
export const RemoveAssignedInstrumentFromCallDocument = gql`
    mutation removeAssignedInstrumentFromCall($instrumentId: Int!, $callId: Int!) {
  removeAssignedInstrumentFromCall(
    removeAssignedInstrumentFromCallInput: {instrumentId: $instrumentId, callId: $callId}
  ) {
    rejection {
      ...rejection
    }
    call {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateCallDocument = gql`
    mutation updateCall($id: Int!, $shortCode: String!, $startCall: DateTime!, $endCall: DateTime!, $startReview: DateTime!, $endReview: DateTime!, $startSEPReview: DateTime, $endSEPReview: DateTime, $startNotify: DateTime!, $endNotify: DateTime!, $startCycle: DateTime!, $endCycle: DateTime!, $cycleComment: String!, $surveyComment: String!, $allocationTimeUnit: AllocationTimeUnits!, $referenceNumberFormat: String, $proposalWorkflowId: Int!, $templateId: Int!) {
  updateCall(
    updateCallInput: {id: $id, shortCode: $shortCode, startCall: $startCall, endCall: $endCall, startReview: $startReview, endReview: $endReview, startSEPReview: $startSEPReview, endSEPReview: $endSEPReview, startNotify: $startNotify, endNotify: $endNotify, startCycle: $startCycle, endCycle: $endCycle, cycleComment: $cycleComment, surveyComment: $surveyComment, allocationTimeUnit: $allocationTimeUnit, referenceNumberFormat: $referenceNumberFormat, proposalWorkflowId: $proposalWorkflowId, templateId: $templateId}
  ) {
    rejection {
      ...rejection
    }
    call {
      ...call
    }
  }
}
    ${RejectionFragmentDoc}
${CallFragmentDoc}`;
export const GetEventLogsDocument = gql`
    query getEventLogs($eventType: String!, $changedObjectId: String!) {
  eventLogs(eventType: $eventType, changedObjectId: $changedObjectId) {
    id
    eventType
    changedBy {
      id
      firstname
      lastname
      email
    }
    eventTStamp
    rowData
    changedObjectId
  }
}
    `;
export const AssignProposalsToInstrumentDocument = gql`
    mutation assignProposalsToInstrument($proposals: [ProposalPkWithCallId!]!, $instrumentId: Int!) {
  assignProposalsToInstrument(proposals: $proposals, instrumentId: $instrumentId) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const AssignScientistsToInstrumentDocument = gql`
    mutation assignScientistsToInstrument($scientistIds: [Int!]!, $instrumentId: Int!) {
  assignScientistsToInstrument(
    scientistIds: $scientistIds
    instrumentId: $instrumentId
  ) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const CreateInstrumentDocument = gql`
    mutation createInstrument($name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {
  createInstrument(
    name: $name
    shortCode: $shortCode
    description: $description
    managerUserId: $managerUserId
  ) {
    instrument {
      id
      name
      shortCode
      description
      managerUserId
      scientists {
        ...basicUserDetails
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteInstrumentDocument = gql`
    mutation deleteInstrument($id: Int!) {
  deleteInstrument(id: $id) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetInstrumentsDocument = gql`
    query getInstruments($callIds: [Int!]) {
  instruments(callIds: $callIds) {
    instruments {
      id
      name
      shortCode
      description
      managerUserId
      scientists {
        ...basicUserDetails
      }
    }
    totalCount
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetUserInstrumentsDocument = gql`
    query getUserInstruments {
  me {
    instruments {
      id
      name
      shortCode
      description
      scientists {
        ...basicUserDetails
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const RemoveProposalsFromInstrumentDocument = gql`
    mutation removeProposalsFromInstrument($proposalPks: [Int!]!) {
  removeProposalsFromInstrument(proposalPks: $proposalPks) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const RemoveScientistFromInstrumentDocument = gql`
    mutation removeScientistFromInstrument($scientistId: Int!, $instrumentId: Int!) {
  removeScientistFromInstrument(
    scientistId: $scientistId
    instrumentId: $instrumentId
  ) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const SetInstrumentAvailabilityTimeDocument = gql`
    mutation setInstrumentAvailabilityTime($callId: Int!, $instrumentId: Int!, $availabilityTime: Int!) {
  setInstrumentAvailabilityTime(
    callId: $callId
    instrumentId: $instrumentId
    availabilityTime: $availabilityTime
  ) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const SubmitInstrumentDocument = gql`
    mutation submitInstrument($callId: Int!, $instrumentId: Int!, $sepId: Int!) {
  submitInstrument(callId: $callId, instrumentId: $instrumentId, sepId: $sepId) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateInstrumentDocument = gql`
    mutation updateInstrument($id: Int!, $name: String!, $shortCode: String!, $description: String!, $managerUserId: Int!) {
  updateInstrument(
    id: $id
    name: $name
    shortCode: $shortCode
    description: $description
    managerUserId: $managerUserId
  ) {
    instrument {
      id
      name
      shortCode
      description
      managerUserId
      scientists {
        ...basicUserDetails
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${RejectionFragmentDoc}`;
export const AdministrationProposalDocument = gql`
    mutation administrationProposal($proposalPk: Int!, $finalStatus: ProposalEndStatus, $statusId: Int, $commentForUser: String, $commentForManagement: String, $managementTimeAllocation: Int, $managementDecisionSubmitted: Boolean) {
  administrationProposal(
    proposalPk: $proposalPk
    finalStatus: $finalStatus
    statusId: $statusId
    commentForUser: $commentForUser
    commentForManagement: $commentForManagement
    managementTimeAllocation: $managementTimeAllocation
    managementDecisionSubmitted: $managementDecisionSubmitted
  ) {
    proposal {
      primaryKey
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const ChangeProposalsStatusDocument = gql`
    mutation changeProposalsStatus($proposals: [ProposalPkWithCallId!]!, $statusId: Int!) {
  changeProposalsStatus(
    changeProposalsStatusInput: {proposals: $proposals, statusId: $statusId}
  ) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const CloneProposalDocument = gql`
    mutation cloneProposal($proposalToClonePk: Int!, $callId: Int!) {
  cloneProposal(
    cloneProposalInput: {proposalToClonePk: $proposalToClonePk, callId: $callId}
  ) {
    proposal {
      ...proposal
      proposer {
        ...basicUserDetails
      }
      users {
        ...basicUserDetails
      }
      questionary {
        ...questionary
        isCompleted
      }
      technicalReview {
        ...coreTechnicalReview
      }
      reviews {
        id
        grade
        comment
        status
        userID
        sepID
        reviewer {
          firstname
          lastname
          id
        }
      }
      instrument {
        id
        name
        shortCode
      }
      call {
        id
        shortCode
        isActive
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalFragmentDoc}
${BasicUserDetailsFragmentDoc}
${QuestionaryFragmentDoc}
${CoreTechnicalReviewFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateProposalDocument = gql`
    mutation createProposal($callId: Int!) {
  createProposal(callId: $callId) {
    proposal {
      primaryKey
      status {
        ...proposalStatus
      }
      proposalId
      questionaryId
      questionary {
        ...questionary
        isCompleted
      }
      proposer {
        ...basicUserDetails
      }
      users {
        ...basicUserDetails
      }
      samples {
        ...sample
        questionary {
          isCompleted
        }
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalStatusFragmentDoc}
${QuestionaryFragmentDoc}
${BasicUserDetailsFragmentDoc}
${SampleFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteProposalDocument = gql`
    mutation deleteProposal($proposalPk: Int!) {
  deleteProposal(proposalPk: $proposalPk) {
    rejection {
      ...rejection
    }
    proposal {
      primaryKey
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetInstrumentScientistProposalsDocument = gql`
    query getInstrumentScientistProposals($filter: ProposalsFilter) {
  instrumentScientistProposals(filter: $filter) {
    proposals {
      ...proposal
      proposer {
        ...basicUserDetails
      }
      reviews {
        id
        grade
        comment
        status
        userID
        sepID
        reviewer {
          firstname
          lastname
          id
        }
      }
      users {
        ...basicUserDetails
      }
      technicalReview {
        ...coreTechnicalReview
      }
      instrument {
        id
        name
      }
      call {
        id
        shortCode
        allocationTimeUnit
      }
      sep {
        id
        code
      }
    }
    totalCount
  }
}
    ${ProposalFragmentDoc}
${BasicUserDetailsFragmentDoc}
${CoreTechnicalReviewFragmentDoc}`;
export const GetMyProposalsDocument = gql`
    query getMyProposals($filter: UserProposalsFilter) {
  me {
    proposals(filter: $filter) {
      ...proposal
    }
  }
}
    ${ProposalFragmentDoc}`;
export const GetProposalDocument = gql`
    query getProposal($primaryKey: Int!) {
  proposal(primaryKey: $primaryKey) {
    ...proposal
    proposer {
      ...basicUserDetails
    }
    users {
      ...basicUserDetails
    }
    questionary {
      ...questionary
      isCompleted
    }
    technicalReview {
      ...coreTechnicalReview
      reviewer {
        ...basicUserDetails
      }
    }
    reviews {
      id
      grade
      comment
      status
      userID
      sepID
      reviewer {
        firstname
        lastname
        id
      }
    }
    instrument {
      id
      name
      shortCode
    }
    call {
      id
      shortCode
      isActive
      allocationTimeUnit
    }
    sep {
      id
      code
    }
    samples {
      ...sample
      questionary {
        isCompleted
      }
    }
  }
}
    ${ProposalFragmentDoc}
${BasicUserDetailsFragmentDoc}
${QuestionaryFragmentDoc}
${CoreTechnicalReviewFragmentDoc}
${SampleFragmentDoc}`;
export const GetProposalsDocument = gql`
    query getProposals($filter: ProposalsFilter) {
  proposals(filter: $filter) {
    proposals {
      ...proposal
      proposer {
        ...basicUserDetails
      }
      reviews {
        id
        grade
        comment
        status
        userID
        sepID
        reviewer {
          firstname
          lastname
          id
        }
      }
      users {
        ...basicUserDetails
      }
      technicalReview {
        ...coreTechnicalReview
        reviewer {
          ...basicUserDetails
        }
      }
      instrument {
        id
        name
      }
      call {
        id
        shortCode
      }
      sep {
        id
        code
      }
    }
    totalCount
  }
}
    ${ProposalFragmentDoc}
${BasicUserDetailsFragmentDoc}
${CoreTechnicalReviewFragmentDoc}`;
export const GetProposalsCoreDocument = gql`
    query getProposalsCore($filter: ProposalsFilter) {
  proposalsView(filter: $filter) {
    primaryKey
    title
    statusId
    statusName
    statusDescription
    proposalId
    rankOrder
    finalStatus
    notified
    timeAllocation
    technicalStatus
    instrumentName
    callShortCode
    sepCode
    sepId
    reviewAverage
    reviewDeviation
    instrumentId
    callId
    submitted
    allocationTimeUnit
  }
}
    `;
export const NotifyProposalDocument = gql`
    mutation notifyProposal($proposalPk: Int!) {
  notifyProposal(proposalPk: $proposalPk) {
    proposal {
      primaryKey
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SubmitProposalDocument = gql`
    mutation submitProposal($proposalPk: Int!) {
  submitProposal(proposalPk: $proposalPk) {
    proposal {
      ...proposal
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateProposalDocument = gql`
    mutation updateProposal($proposalPk: Int!, $title: String, $abstract: String, $users: [Int!], $proposerId: Int) {
  updateProposal(
    proposalPk: $proposalPk
    title: $title
    abstract: $abstract
    users: $users
    proposerId: $proposerId
  ) {
    proposal {
      primaryKey
      title
      abstract
      proposer {
        ...basicUserDetails
      }
      users {
        ...basicUserDetails
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${RejectionFragmentDoc}`;
export const GetUserProposalBookingsWithEventsDocument = gql`
    query getUserProposalBookingsWithEvents($endsAfter: TzLessDateTime, $status: [ProposalBookingStatus!], $instrumentId: Int) {
  me {
    proposals(filter: {instrumentId: $instrumentId}) {
      primaryKey
      title
      proposalId
      finalStatus
      managementDecisionSubmitted
      proposer {
        ...basicUserDetails
      }
      users {
        ...basicUserDetails
      }
      proposalBooking(filter: {status: $status}) {
        scheduledEvents(filter: {endsAfter: $endsAfter}) {
          id
          startsAt
          endsAt
          bookingType
          visit {
            ...visit
            teamLead {
              ...basicUserDetails
            }
            shipments {
              ...shipment
            }
            registrations {
              ...visitRegistration
              user {
                ...basicUserDetails
              }
            }
          }
        }
      }
      visits {
        ...visit
      }
      riskAssessmentQuestionary {
        questionaryId
      }
      instrument {
        id
        name
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${VisitFragmentDoc}
${ShipmentFragmentDoc}
${VisitRegistrationFragmentDoc}`;
export const AnswerTopicDocument = gql`
    mutation answerTopic($questionaryId: Int!, $topicId: Int!, $answers: [AnswerInput!]!, $isPartialSave: Boolean) {
  answerTopic(
    questionaryId: $questionaryId
    topicId: $topicId
    answers: $answers
    isPartialSave: $isPartialSave
  ) {
    questionaryStep {
      ...questionaryStep
    }
    rejection {
      ...rejection
    }
  }
}
    ${QuestionaryStepFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateQuestionaryDocument = gql`
    mutation createQuestionary($templateId: Int!) {
  createQuestionary(templateId: $templateId) {
    questionary {
      ...questionary
      isCompleted
    }
    rejection {
      ...rejection
    }
  }
}
    ${QuestionaryFragmentDoc}
${RejectionFragmentDoc}`;
export const GetBlankQuestionaryStepsDocument = gql`
    query getBlankQuestionarySteps($templateId: Int!) {
  blankQuestionarySteps(templateId: $templateId) {
    ...questionaryStep
  }
}
    ${QuestionaryStepFragmentDoc}`;
export const GetFileMetadataDocument = gql`
    query getFileMetadata($fileIds: [String!]!) {
  fileMetadata(fileIds: $fileIds) {
    fileId
    originalFileName
    mimeType
    sizeInBytes
    createdDate
  }
}
    `;
export const GetQuestionaryDocument = gql`
    query getQuestionary($questionaryId: Int!) {
  questionary(questionaryId: $questionaryId) {
    ...questionary
  }
}
    ${QuestionaryFragmentDoc}`;
export const AddTechnicalReviewDocument = gql`
    mutation addTechnicalReview($proposalPk: Int!, $timeAllocation: Int, $comment: String, $publicComment: String, $status: TechnicalReviewStatus, $submitted: Boolean!, $reviewerId: Int!) {
  addTechnicalReview(
    addTechnicalReviewInput: {proposalPk: $proposalPk, timeAllocation: $timeAllocation, comment: $comment, publicComment: $publicComment, status: $status, submitted: $submitted, reviewerId: $reviewerId}
  ) {
    rejection {
      ...rejection
    }
    technicalReview {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AddUserForReviewDocument = gql`
    mutation addUserForReview($userID: Int!, $proposalPk: Int!, $sepID: Int!) {
  addUserForReview(userID: $userID, proposalPk: $proposalPk, sepID: $sepID) {
    rejection {
      ...rejection
    }
    review {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateTechnicalReviewAssigneeDocument = gql`
    mutation updateTechnicalReviewAssignee($proposalPks: [Int!]!, $userId: Int!) {
  updateTechnicalReviewAssignee(proposalPks: $proposalPks, userId: $userId) {
    proposals {
      ...proposal
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalFragmentDoc}
${RejectionFragmentDoc}`;
export const GetProposalReviewsDocument = gql`
    query getProposalReviews($proposalPk: Int!) {
  proposalReviews(proposalPk: $proposalPk) {
    id
    userID
    comment
    grade
    status
    sepID
  }
}
    `;
export const GetReviewDocument = gql`
    query getReview($reviewId: Int!, $sepId: Int) {
  review(reviewId: $reviewId, sepId: $sepId) {
    ...coreReview
    proposal {
      primaryKey
      title
      abstract
      proposer {
        id
      }
    }
    reviewer {
      ...basicUserDetails
    }
  }
}
    ${CoreReviewFragmentDoc}
${BasicUserDetailsFragmentDoc}`;
export const RemoveUserForReviewDocument = gql`
    mutation removeUserForReview($reviewId: Int!, $sepId: Int!) {
  removeUserForReview(reviewId: $reviewId, sepId: $sepId) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SubmitProposalsReviewDocument = gql`
    mutation submitProposalsReview($proposals: [ProposalPkWithReviewId!]!) {
  submitProposalsReview(submitProposalsReviewInput: {proposals: $proposals}) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const SubmitTechnicalReviewDocument = gql`
    mutation submitTechnicalReview($proposalPk: Int!, $timeAllocation: Int, $comment: String, $publicComment: String, $status: TechnicalReviewStatus, $submitted: Boolean!, $reviewerId: Int!) {
  submitTechnicalReview(
    submitTechnicalReviewInput: {proposalPk: $proposalPk, timeAllocation: $timeAllocation, comment: $comment, publicComment: $publicComment, status: $status, submitted: $submitted, reviewerId: $reviewerId}
  ) {
    rejection {
      ...rejection
    }
    technicalReview {
      id
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AddReviewDocument = gql`
    mutation addReview($reviewID: Int!, $grade: Int!, $comment: String!, $status: ReviewStatus!, $sepID: Int!) {
  addReview(
    reviewID: $reviewID
    grade: $grade
    comment: $comment
    status: $status
    sepID: $sepID
  ) {
    rejection {
      ...rejection
    }
    review {
      id
      userID
      status
      comment
      grade
      sepID
      nextProposalStatus {
        id
        shortCode
        name
      }
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UserWithReviewsDocument = gql`
    query userWithReviews($callId: Int, $instrumentId: Int, $status: ReviewStatus, $reviewer: ReviewerFilter) {
  me {
    id
    firstname
    lastname
    organisation
    reviews(
      callId: $callId
      instrumentId: $instrumentId
      status: $status
      reviewer: $reviewer
    ) {
      id
      grade
      comment
      status
      sepID
      proposal {
        primaryKey
        title
        proposalId
        call {
          shortCode
        }
        instrument {
          shortCode
        }
      }
    }
  }
}
    `;
export const CloneSampleDocument = gql`
    mutation cloneSample($sampleId: Int!) {
  cloneSample(sampleId: $sampleId) {
    sample {
      ...sample
      questionary {
        isCompleted
        ...questionary
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${SampleFragmentDoc}
${QuestionaryFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateSampleDocument = gql`
    mutation createSample($title: String!, $templateId: Int!, $proposalPk: Int!, $questionId: String!) {
  createSample(
    title: $title
    templateId: $templateId
    proposalPk: $proposalPk
    questionId: $questionId
  ) {
    sample {
      ...sample
      questionary {
        isCompleted
        ...questionary
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${SampleFragmentDoc}
${QuestionaryFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteSampleDocument = gql`
    mutation deleteSample($sampleId: Int!) {
  deleteSample(sampleId: $sampleId) {
    sample {
      ...sample
    }
    rejection {
      ...rejection
    }
  }
}
    ${SampleFragmentDoc}
${RejectionFragmentDoc}`;
export const GetSampleDocument = gql`
    query getSample($sampleId: Int!) {
  sample(sampleId: $sampleId) {
    ...sample
    questionary {
      isCompleted
      ...questionary
    }
  }
}
    ${SampleFragmentDoc}
${QuestionaryFragmentDoc}`;
export const GetSamplesByCallIdDocument = gql`
    query getSamplesByCallId($callId: Int!) {
  samplesByCallId(callId: $callId) {
    ...sample
    proposal {
      primaryKey
      proposalId
    }
  }
}
    ${SampleFragmentDoc}`;
export const GetSamplesWithProposalDataDocument = gql`
    query getSamplesWithProposalData($filter: SamplesFilter) {
  samples(filter: $filter) {
    ...sample
    proposal {
      primaryKey
      proposalId
    }
  }
}
    ${SampleFragmentDoc}`;
export const GetSamplesWithQuestionaryStatusDocument = gql`
    query getSamplesWithQuestionaryStatus($filter: SamplesFilter) {
  samples(filter: $filter) {
    ...sample
    questionary {
      isCompleted
    }
  }
}
    ${SampleFragmentDoc}`;
export const UpdateSampleDocument = gql`
    mutation updateSample($sampleId: Int!, $title: String, $safetyComment: String, $safetyStatus: SampleStatus) {
  updateSample(
    sampleId: $sampleId
    title: $title
    safetyComment: $safetyComment
    safetyStatus: $safetyStatus
  ) {
    sample {
      ...sample
    }
    rejection {
      ...rejection
    }
  }
}
    ${SampleFragmentDoc}
${RejectionFragmentDoc}`;
export const AddProposalWorkflowStatusDocument = gql`
    mutation addProposalWorkflowStatus($proposalWorkflowId: Int!, $sortOrder: Int!, $droppableGroupId: String!, $parentDroppableGroupId: String, $proposalStatusId: Int!, $nextProposalStatusId: Int, $prevProposalStatusId: Int) {
  addProposalWorkflowStatus(
    newProposalWorkflowStatusInput: {proposalWorkflowId: $proposalWorkflowId, sortOrder: $sortOrder, droppableGroupId: $droppableGroupId, parentDroppableGroupId: $parentDroppableGroupId, proposalStatusId: $proposalStatusId, nextProposalStatusId: $nextProposalStatusId, prevProposalStatusId: $prevProposalStatusId}
  ) {
    proposalWorkflowConnection {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AddStatusChangingEventsToConnectionDocument = gql`
    mutation addStatusChangingEventsToConnection($proposalWorkflowConnectionId: Int!, $statusChangingEvents: [String!]!) {
  addStatusChangingEventsToConnection(
    addStatusChangingEventsToConnectionInput: {proposalWorkflowConnectionId: $proposalWorkflowConnectionId, statusChangingEvents: $statusChangingEvents}
  ) {
    statusChangingEvents {
      statusChangingEventId
      proposalWorkflowConnectionId
      statusChangingEvent
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateProposalStatusDocument = gql`
    mutation createProposalStatus($shortCode: String!, $name: String!, $description: String!) {
  createProposalStatus(
    newProposalStatusInput: {shortCode: $shortCode, name: $name, description: $description}
  ) {
    proposalStatus {
      ...proposalStatus
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalStatusFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateProposalWorkflowDocument = gql`
    mutation createProposalWorkflow($name: String!, $description: String!) {
  createProposalWorkflow(
    newProposalWorkflowInput: {name: $name, description: $description}
  ) {
    proposalWorkflow {
      id
      name
      description
      proposalWorkflowConnectionGroups {
        groupId
        parentGroupId
        connections {
          id
          sortOrder
          proposalWorkflowId
          proposalStatusId
          proposalStatus {
            ...proposalStatus
          }
          nextProposalStatusId
          prevProposalStatusId
          droppableGroupId
          statusChangingEvents {
            statusChangingEventId
            proposalWorkflowConnectionId
            statusChangingEvent
          }
        }
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalStatusFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteProposalStatusDocument = gql`
    mutation deleteProposalStatus($id: Int!) {
  deleteProposalStatus(id: $id) {
    proposalStatus {
      ...proposalStatus
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalStatusFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteProposalWorkflowDocument = gql`
    mutation deleteProposalWorkflow($id: Int!) {
  deleteProposalWorkflow(id: $id) {
    proposalWorkflow {
      id
      name
      description
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteProposalWorkflowStatusDocument = gql`
    mutation deleteProposalWorkflowStatus($proposalStatusId: Int!, $proposalWorkflowId: Int!, $sortOrder: Int!) {
  deleteProposalWorkflowStatus(
    deleteProposalWorkflowStatusInput: {proposalStatusId: $proposalStatusId, proposalWorkflowId: $proposalWorkflowId, sortOrder: $sortOrder}
  ) {
    isSuccess
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetProposalEventsDocument = gql`
    query getProposalEvents {
  proposalEvents {
    name
    description
  }
}
    `;
export const GetProposalStatusesDocument = gql`
    query getProposalStatuses {
  proposalStatuses {
    ...proposalStatus
  }
}
    ${ProposalStatusFragmentDoc}`;
export const GetProposalWorkflowDocument = gql`
    query getProposalWorkflow($id: Int!) {
  proposalWorkflow(id: $id) {
    id
    name
    description
    proposalWorkflowConnectionGroups {
      groupId
      parentGroupId
      connections {
        id
        sortOrder
        proposalWorkflowId
        proposalStatusId
        proposalStatus {
          ...proposalStatus
        }
        nextProposalStatusId
        prevProposalStatusId
        droppableGroupId
        statusChangingEvents {
          statusChangingEventId
          proposalWorkflowConnectionId
          statusChangingEvent
        }
      }
    }
  }
}
    ${ProposalStatusFragmentDoc}`;
export const GetProposalWorkflowsDocument = gql`
    query getProposalWorkflows {
  proposalWorkflows {
    id
    name
    description
  }
}
    `;
export const MoveProposalWorkflowStatusDocument = gql`
    mutation moveProposalWorkflowStatus($from: IndexWithGroupId!, $to: IndexWithGroupId!, $proposalWorkflowId: Int!) {
  moveProposalWorkflowStatus(
    moveProposalWorkflowStatusInput: {from: $from, to: $to, proposalWorkflowId: $proposalWorkflowId}
  ) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateProposalStatusDocument = gql`
    mutation updateProposalStatus($id: Int!, $shortCode: String!, $name: String!, $description: String!) {
  updateProposalStatus(
    updatedProposalStatusInput: {id: $id, shortCode: $shortCode, name: $name, description: $description}
  ) {
    proposalStatus {
      ...proposalStatus
    }
    rejection {
      ...rejection
    }
  }
}
    ${ProposalStatusFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateProposalWorkflowDocument = gql`
    mutation updateProposalWorkflow($id: Int!, $name: String!, $description: String!) {
  updateProposalWorkflow(
    updatedProposalWorkflowInput: {id: $id, name: $name, description: $description}
  ) {
    proposalWorkflow {
      id
      name
      description
      proposalWorkflowConnectionGroups {
        groupId
        parentGroupId
        connections {
          id
          sortOrder
          proposalWorkflowId
          proposalStatusId
          proposalStatus {
            id
            name
            description
          }
          nextProposalStatusId
          prevProposalStatusId
          droppableGroupId
          statusChangingEvents {
            statusChangingEventId
            proposalWorkflowConnectionId
            statusChangingEvent
          }
        }
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const AddSamplesToShipmentDocument = gql`
    mutation addSamplesToShipment($shipmentId: Int!, $sampleIds: [Int!]!) {
  addSamplesToShipment(shipmentId: $shipmentId, sampleIds: $sampleIds) {
    rejection {
      ...rejection
    }
    shipment {
      ...shipment
      samples {
        ...sample
      }
    }
  }
}
    ${RejectionFragmentDoc}
${ShipmentFragmentDoc}
${SampleFragmentDoc}`;
export const CreateShipmentDocument = gql`
    mutation createShipment($title: String!, $proposalPk: Int!, $visitId: Int!) {
  createShipment(title: $title, proposalPk: $proposalPk, visitId: $visitId) {
    shipment {
      ...shipment
      questionary {
        ...questionary
        isCompleted
      }
      samples {
        ...sample
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${ShipmentFragmentDoc}
${QuestionaryFragmentDoc}
${SampleFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteShipmentDocument = gql`
    mutation deleteShipment($shipmentId: Int!) {
  deleteShipment(shipmentId: $shipmentId) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetMyShipmentsDocument = gql`
    query getMyShipments {
  myShipments {
    ...shipment
  }
}
    ${ShipmentFragmentDoc}`;
export const GetShipmentDocument = gql`
    query getShipment($shipmentId: Int!) {
  shipment(shipmentId: $shipmentId) {
    ...shipment
    questionary {
      ...questionary
      isCompleted
    }
    samples {
      ...sample
    }
  }
}
    ${ShipmentFragmentDoc}
${QuestionaryFragmentDoc}
${SampleFragmentDoc}`;
export const GetShipmentsDocument = gql`
    query getShipments($filter: ShipmentsFilter) {
  shipments(filter: $filter) {
    ...shipment
  }
}
    ${ShipmentFragmentDoc}`;
export const SetActiveTemplateDocument = gql`
    mutation setActiveTemplate($templateCategoryId: TemplateCategoryId!, $templateId: Int!) {
  setActiveTemplate(
    templateId: $templateId
    templateCategoryId: $templateCategoryId
  ) {
    isSuccess
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SubmitShipmentDocument = gql`
    mutation submitShipment($shipmentId: Int!) {
  submitShipment(shipmentId: $shipmentId) {
    rejection {
      ...rejection
    }
    shipment {
      ...shipment
    }
  }
}
    ${RejectionFragmentDoc}
${ShipmentFragmentDoc}`;
export const UpdateShipmentDocument = gql`
    mutation updateShipment($shipmentId: Int!, $title: String, $proposalPk: Int, $status: ShipmentStatus) {
  updateShipment(
    shipmentId: $shipmentId
    title: $title
    status: $status
    proposalPk: $proposalPk
  ) {
    rejection {
      ...rejection
    }
    shipment {
      ...shipment
      questionary {
        ...questionary
        isCompleted
      }
    }
  }
}
    ${RejectionFragmentDoc}
${ShipmentFragmentDoc}
${QuestionaryFragmentDoc}`;
export const CloneTemplateDocument = gql`
    mutation cloneTemplate($templateId: Int!) {
  cloneTemplate(templateId: $templateId) {
    template {
      ...templateMetadata
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateMetadataFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateTemplateDocument = gql`
    mutation createTemplate($categoryId: TemplateCategoryId!, $name: String!, $description: String) {
  createTemplate(categoryId: $categoryId, name: $name, description: $description) {
    template {
      ...templateMetadata
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateMetadataFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateQuestionDocument = gql`
    mutation createQuestion($categoryId: TemplateCategoryId!, $dataType: DataType!) {
  createQuestion(categoryId: $categoryId, dataType: $dataType) {
    question {
      ...question
    }
    rejection {
      ...rejection
    }
  }
}
    ${QuestionFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateQuestionTemplateRelationDocument = gql`
    mutation createQuestionTemplateRelation($templateId: Int!, $questionId: String!, $topicId: Int!, $sortOrder: Int!) {
  createQuestionTemplateRelation(
    templateId: $templateId
    questionId: $questionId
    topicId: $topicId
    sortOrder: $sortOrder
  ) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateTopicDocument = gql`
    mutation createTopic($templateId: Int!, $sortOrder: Int!) {
  createTopic(templateId: $templateId, sortOrder: $sortOrder) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteQuestionDocument = gql`
    mutation deleteQuestion($questionId: String!) {
  deleteQuestion(questionId: $questionId) {
    question {
      ...question
    }
    rejection {
      ...rejection
    }
  }
}
    ${QuestionFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteQuestionTemplateRelationDocument = gql`
    mutation deleteQuestionTemplateRelation($questionId: String!, $templateId: Int!) {
  deleteQuestionTemplateRelation(questionId: $questionId, templateId: $templateId) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteTemplateDocument = gql`
    mutation deleteTemplate($id: Int!) {
  deleteTemplate(templateId: $id) {
    template {
      templateId
      name
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteTopicDocument = gql`
    mutation deleteTopic($topicId: Int!) {
  deleteTopic(topicId: $topicId) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetActiveTemplateIdDocument = gql`
    query getActiveTemplateId($templateCategoryId: TemplateCategoryId!) {
  activeTemplateId(templateCategoryId: $templateCategoryId)
}
    `;
export const GetIsNaturalKeyPresentDocument = gql`
    query getIsNaturalKeyPresent($naturalKey: String!) {
  isNaturalKeyPresent(naturalKey: $naturalKey)
}
    `;
export const GetProposalTemplatesDocument = gql`
    query getProposalTemplates($filter: ProposalTemplatesFilter) {
  proposalTemplates(filter: $filter) {
    templateId
    name
    description
    isArchived
    questionaryCount
    callCount
  }
}
    `;
export const GetQuestionsDocument = gql`
    query getQuestions($filter: QuestionsFilter) {
  questions(filter: $filter) {
    id
    question
    naturalKey
    dataType
    categoryId
    config {
      ...fieldConfig
    }
    answers {
      questionaryId
    }
    templates {
      templateId
    }
  }
}
    ${FieldConfigFragmentDoc}`;
export const GetTemplateDocument = gql`
    query getTemplate($templateId: Int!) {
  template(templateId: $templateId) {
    ...template
  }
}
    ${TemplateFragmentDoc}`;
export const GetTemplateCategoriesDocument = gql`
    query getTemplateCategories {
  templateCategories {
    categoryId
    name
  }
}
    `;
export const GetTemplatesDocument = gql`
    query getTemplates($filter: TemplatesFilter) {
  templates(filter: $filter) {
    templateId
    name
    description
    isArchived
    questionaryCount
  }
}
    `;
export const UpdateQuestionDocument = gql`
    mutation updateQuestion($id: String!, $naturalKey: String, $question: String, $config: String) {
  updateQuestion(
    id: $id
    naturalKey: $naturalKey
    question: $question
    config: $config
  ) {
    question {
      ...question
    }
    rejection {
      ...rejection
    }
  }
}
    ${QuestionFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateQuestionTemplateRelationDocument = gql`
    mutation updateQuestionTemplateRelation($questionId: String!, $templateId: Int!, $topicId: Int, $sortOrder: Int!, $config: String) {
  updateQuestionTemplateRelation(
    questionId: $questionId
    templateId: $templateId
    topicId: $topicId
    sortOrder: $sortOrder
    config: $config
  ) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateQuestionTemplateRelationSettingsDocument = gql`
    mutation updateQuestionTemplateRelationSettings($questionId: String!, $templateId: Int!, $config: String, $dependencies: [FieldDependencyInput!]!, $dependenciesOperator: DependenciesLogicOperator) {
  updateQuestionTemplateRelationSettings(
    questionId: $questionId
    templateId: $templateId
    config: $config
    dependencies: $dependencies
    dependenciesOperator: $dependenciesOperator
  ) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateTemplateDocument = gql`
    mutation updateTemplate($templateId: Int!, $name: String, $description: String, $isArchived: Boolean) {
  updateTemplate(
    templateId: $templateId
    name: $name
    description: $description
    isArchived: $isArchived
  ) {
    template {
      ...templateMetadata
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateMetadataFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateTopicDocument = gql`
    mutation updateTopic($topicId: Int!, $templateId: Int, $title: String, $sortOrder: Int, $isEnabled: Boolean) {
  updateTopic(
    id: $topicId
    templateId: $templateId
    title: $title
    sortOrder: $sortOrder
    isEnabled: $isEnabled
  ) {
    template {
      ...template
    }
    rejection {
      ...rejection
    }
  }
}
    ${TemplateFragmentDoc}
${RejectionFragmentDoc}`;
export const CheckExternalTokenDocument = gql`
    mutation checkExternalToken($externalToken: String!) {
  checkExternalToken(externalToken: $externalToken) {
    token
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CheckTokenDocument = gql`
    query checkToken($token: String!) {
  checkToken(token: $token) {
    isValid
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($user_title: String, $firstname: String!, $middlename: String, $lastname: String!, $password: String!, $preferredname: String, $orcid: String!, $orcidHash: String!, $refreshToken: String!, $gender: String!, $nationality: Int!, $birthdate: String!, $organisation: Int!, $department: String!, $position: String!, $email: String!, $telephone: String!, $telephone_alt: String, $otherOrganisation: String) {
  createUser(
    user_title: $user_title
    firstname: $firstname
    middlename: $middlename
    lastname: $lastname
    password: $password
    preferredname: $preferredname
    orcid: $orcid
    orcidHash: $orcidHash
    refreshToken: $refreshToken
    gender: $gender
    nationality: $nationality
    birthdate: $birthdate
    organisation: $organisation
    department: $department
    position: $position
    email: $email
    telephone: $telephone
    telephone_alt: $telephone_alt
    otherOrganisation: $otherOrganisation
  ) {
    user {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const CreateUserByEmailInviteDocument = gql`
    mutation createUserByEmailInvite($firstname: String!, $lastname: String!, $email: String!, $userRole: UserRole!) {
  createUserByEmailInvite(
    firstname: $firstname
    lastname: $lastname
    email: $email
    userRole: $userRole
  ) {
    rejection {
      ...rejection
    }
    id
  }
}
    ${RejectionFragmentDoc}`;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: Int!) {
  deleteUser(id: $id) {
    user {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetBasicUserDetailsDocument = gql`
    query getBasicUserDetails($id: Int!) {
  basicUserDetails(id: $id) {
    ...basicUserDetails
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetFieldsDocument = gql`
    query getFields {
  getFields {
    nationalities {
      id
      value
    }
  }
}
    `;
export const GetMyRolesDocument = gql`
    query getMyRoles {
  me {
    firstname
    lastname
    roles {
      id
      shortCode
      title
    }
  }
}
    `;
export const GetOrcIdInformationDocument = gql`
    query getOrcIDInformation($authorizationCode: String!) {
  getOrcIDInformation(authorizationCode: $authorizationCode) {
    firstname
    lastname
    orcid
    orcidHash
    refreshToken
    token
  }
}
    `;
export const GetRolesDocument = gql`
    query getRoles {
  roles {
    id
    shortCode
    title
  }
}
    `;
export const GetTokenDocument = gql`
    mutation getToken($token: String!) {
  token(token: $token) {
    token
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetTokenForUserDocument = gql`
    mutation getTokenForUser($userId: Int!) {
  getTokenForUser(userId: $userId) {
    token
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const GetUserDocument = gql`
    query getUser($id: Int!) {
  user(id: $id) {
    user_title
    username
    firstname
    middlename
    lastname
    preferredname
    gender
    nationality
    birthdate
    organisation
    department
    position
    email
    telephone
    telephone_alt
    orcid
    emailVerified
    placeholder
  }
}
    `;
export const GetUserMeDocument = gql`
    query getUserMe {
  me {
    user_title
    username
    firstname
    middlename
    lastname
    preferredname
    gender
    nationality
    birthdate
    organisation
    department
    position
    email
    telephone
    telephone_alt
    orcid
    emailVerified
    placeholder
  }
}
    `;
export const GetUserProposalsDocument = gql`
    query getUserProposals {
  me {
    proposals {
      primaryKey
      proposalId
      title
      status {
        ...proposalStatus
      }
      publicStatus
      statusId
      created
      finalStatus
      notified
      submitted
      proposer {
        id
      }
      call {
        id
        shortCode
        isActive
      }
    }
  }
}
    ${ProposalStatusFragmentDoc}`;
export const GetUserWithRolesDocument = gql`
    query getUserWithRoles($id: Int!) {
  user(id: $id) {
    firstname
    lastname
    roles {
      id
      shortCode
      title
    }
  }
}
    `;
export const GetUsersDocument = gql`
    query getUsers($filter: String, $first: Int, $offset: Int, $userRole: UserRole, $subtractUsers: [Int!]) {
  users(
    filter: $filter
    first: $first
    offset: $offset
    userRole: $userRole
    subtractUsers: $subtractUsers
  ) {
    users {
      ...basicUserDetails
    }
    totalCount
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const ResetPasswordEmailDocument = gql`
    mutation resetPasswordEmail($email: String!) {
  resetPasswordEmail(email: $email) {
    rejection {
      ...rejection
    }
    isSuccess
  }
}
    ${RejectionFragmentDoc}`;
export const SelectRoleDocument = gql`
    mutation selectRole($token: String!, $selectedRoleId: Int!) {
  selectRole(token: $token, selectedRoleId: $selectedRoleId) {
    token
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SetUserEmailVerifiedDocument = gql`
    mutation setUserEmailVerified($id: Int!) {
  setUserEmailVerified(id: $id) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const SetUserNotPlaceholderDocument = gql`
    mutation setUserNotPlaceholder($id: Int!) {
  setUserNotPlaceholder(id: $id) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($id: Int!, $password: String!) {
  updatePassword(id: $id, password: $password) {
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateUserDocument = gql`
    mutation updateUser($id: Int!, $user_title: String, $firstname: String!, $middlename: String, $lastname: String!, $preferredname: String, $gender: String!, $nationality: Int!, $birthdate: String!, $organisation: Int!, $department: String!, $position: String!, $email: String!, $telephone: String!, $telephone_alt: String) {
  updateUser(
    id: $id
    user_title: $user_title
    firstname: $firstname
    middlename: $middlename
    lastname: $lastname
    preferredname: $preferredname
    gender: $gender
    nationality: $nationality
    birthdate: $birthdate
    organisation: $organisation
    department: $department
    position: $position
    email: $email
    telephone: $telephone
    telephone_alt: $telephone_alt
  ) {
    user {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const UpdateUserRolesDocument = gql`
    mutation updateUserRoles($id: Int!, $roles: [Int!]) {
  updateUserRoles(id: $id, roles: $roles) {
    user {
      id
    }
    rejection {
      ...rejection
    }
  }
}
    ${RejectionFragmentDoc}`;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($token: String!) {
  emailVerification(token: $token) {
    rejection {
      ...rejection
    }
    success
  }
}
    ${RejectionFragmentDoc}`;
export const CreateVisitDocument = gql`
    mutation createVisit($proposalPk: Int!, $team: [Int!]!, $scheduledEventId: Int!, $teamLeadUserId: Int!) {
  createVisit(
    proposalPk: $proposalPk
    team: $team
    scheduledEventId: $scheduledEventId
    teamLeadUserId: $teamLeadUserId
  ) {
    visit {
      ...visit
      teamLead {
        ...basicUserDetails
      }
      registrations {
        ...visitRegistration
        user {
          ...basicUserDetails
        }
      }
      proposal {
        ...proposal
        instrument {
          name
        }
      }
      shipments {
        ...shipment
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${VisitFragmentDoc}
${BasicUserDetailsFragmentDoc}
${VisitRegistrationFragmentDoc}
${ProposalFragmentDoc}
${ShipmentFragmentDoc}
${RejectionFragmentDoc}`;
export const CreateVisitRegistrationQuestionaryDocument = gql`
    mutation createVisitRegistrationQuestionary($visitId: Int!) {
  createVisitRegistrationQuestionary(visitId: $visitId) {
    registration {
      ...visitRegistration
      user {
        ...basicUserDetails
      }
      questionary {
        ...questionary
        isCompleted
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${VisitRegistrationFragmentDoc}
${BasicUserDetailsFragmentDoc}
${QuestionaryFragmentDoc}
${RejectionFragmentDoc}`;
export const DeleteVisitDocument = gql`
    mutation deleteVisit($visitId: Int!) {
  deleteVisit(visitId: $visitId) {
    visit {
      ...visit
    }
    rejection {
      ...rejection
    }
  }
}
    ${VisitFragmentDoc}
${RejectionFragmentDoc}`;
export const GetVisitDocument = gql`
    query getVisit($visitId: Int!) {
  visit(visitId: $visitId) {
    ...visit
    registrations {
      ...visitRegistration
      user {
        ...basicUserDetails
      }
    }
    proposal {
      ...proposal
      instrument {
        name
      }
    }
  }
}
    ${VisitFragmentDoc}
${VisitRegistrationFragmentDoc}
${BasicUserDetailsFragmentDoc}
${ProposalFragmentDoc}`;
export const GetVisitRegistrationDocument = gql`
    query getVisitRegistration($visitId: Int!) {
  visitRegistration(visitId: $visitId) {
    ...visitRegistration
    user {
      ...basicUserDetails
    }
    questionary {
      ...questionary
      isCompleted
    }
  }
}
    ${VisitRegistrationFragmentDoc}
${BasicUserDetailsFragmentDoc}
${QuestionaryFragmentDoc}`;
export const GetVisitsDocument = gql`
    query getVisits($filter: VisitsFilter) {
  visits(filter: $filter) {
    ...visit
    proposal {
      ...proposal
      instrument {
        name
      }
    }
  }
}
    ${VisitFragmentDoc}
${ProposalFragmentDoc}`;
export const UpdateVisitDocument = gql`
    mutation updateVisit($visitId: Int!, $proposalPkAndEventId: ProposalPkAndEventId, $team: [Int!], $status: VisitStatus, $teamLeadUserId: Int) {
  updateVisit(
    visitId: $visitId
    proposalPkAndEventId: $proposalPkAndEventId
    team: $team
    status: $status
    teamLeadUserId: $teamLeadUserId
  ) {
    visit {
      ...visit
      teamLead {
        ...basicUserDetails
      }
      registrations {
        ...visitRegistration
        user {
          ...basicUserDetails
        }
      }
      proposal {
        ...proposal
        instrument {
          name
        }
      }
      shipments {
        ...shipment
      }
    }
    rejection {
      ...rejection
    }
  }
}
    ${VisitFragmentDoc}
${BasicUserDetailsFragmentDoc}
${VisitRegistrationFragmentDoc}
${ProposalFragmentDoc}
${ShipmentFragmentDoc}
${RejectionFragmentDoc}`;
export const UpdateVisitRegistrationDocument = gql`
    mutation updateVisitRegistration($visitId: Int!, $trainingExpiryDate: DateTime, $isRegistrationSubmitted: Boolean) {
  updateVisitRegistration(
    visitId: $visitId
    trainingExpiryDate: $trainingExpiryDate
    isRegistrationSubmitted: $isRegistrationSubmitted
  ) {
    registration {
      ...visitRegistration
    }
    rejection {
      ...rejection
    }
  }
}
    ${VisitRegistrationFragmentDoc}
${RejectionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    assignProposalsToSep(variables: AssignProposalsToSepMutationVariables): Promise<AssignProposalsToSepMutation> {
      return withWrapper(() => client.request<AssignProposalsToSepMutation>(print(AssignProposalsToSepDocument), variables));
    },
    assignReviewersToSEP(variables: AssignReviewersToSepMutationVariables): Promise<AssignReviewersToSepMutation> {
      return withWrapper(() => client.request<AssignReviewersToSepMutation>(print(AssignReviewersToSepDocument), variables));
    },
    assignChairOrSecretary(variables: AssignChairOrSecretaryMutationVariables): Promise<AssignChairOrSecretaryMutation> {
      return withWrapper(() => client.request<AssignChairOrSecretaryMutation>(print(AssignChairOrSecretaryDocument), variables));
    },
    assignSepReviewersToProposal(variables: AssignSepReviewersToProposalMutationVariables): Promise<AssignSepReviewersToProposalMutation> {
      return withWrapper(() => client.request<AssignSepReviewersToProposalMutation>(print(AssignSepReviewersToProposalDocument), variables));
    },
    createSEP(variables: CreateSepMutationVariables): Promise<CreateSepMutation> {
      return withWrapper(() => client.request<CreateSepMutation>(print(CreateSepDocument), variables));
    },
    deleteSEP(variables: DeleteSepMutationVariables): Promise<DeleteSepMutation> {
      return withWrapper(() => client.request<DeleteSepMutation>(print(DeleteSepDocument), variables));
    },
    getInstrumentsBySEP(variables: GetInstrumentsBySepQueryVariables): Promise<GetInstrumentsBySepQuery> {
      return withWrapper(() => client.request<GetInstrumentsBySepQuery>(print(GetInstrumentsBySepDocument), variables));
    },
    getUserSeps(variables?: GetUserSepsQueryVariables): Promise<GetUserSepsQuery> {
      return withWrapper(() => client.request<GetUserSepsQuery>(print(GetUserSepsDocument), variables));
    },
    getSEP(variables: GetSepQueryVariables): Promise<GetSepQuery> {
      return withWrapper(() => client.request<GetSepQuery>(print(GetSepDocument), variables));
    },
    getSEPMembers(variables: GetSepMembersQueryVariables): Promise<GetSepMembersQuery> {
      return withWrapper(() => client.request<GetSepMembersQuery>(print(GetSepMembersDocument), variables));
    },
    getSEPProposal(variables: GetSepProposalQueryVariables): Promise<GetSepProposalQuery> {
      return withWrapper(() => client.request<GetSepProposalQuery>(print(GetSepProposalDocument), variables));
    },
    getSEPProposals(variables: GetSepProposalsQueryVariables): Promise<GetSepProposalsQuery> {
      return withWrapper(() => client.request<GetSepProposalsQuery>(print(GetSepProposalsDocument), variables));
    },
    sepProposalsByInstrument(variables: SepProposalsByInstrumentQueryVariables): Promise<SepProposalsByInstrumentQuery> {
      return withWrapper(() => client.request<SepProposalsByInstrumentQuery>(print(SepProposalsByInstrumentDocument), variables));
    },
    getSEPReviewers(variables: GetSepReviewersQueryVariables): Promise<GetSepReviewersQuery> {
      return withWrapper(() => client.request<GetSepReviewersQuery>(print(GetSepReviewersDocument), variables));
    },
    getSEPs(variables: GetSePsQueryVariables): Promise<GetSePsQuery> {
      return withWrapper(() => client.request<GetSePsQuery>(print(GetSePsDocument), variables));
    },
    removeProposalsFromSep(variables: RemoveProposalsFromSepMutationVariables): Promise<RemoveProposalsFromSepMutation> {
      return withWrapper(() => client.request<RemoveProposalsFromSepMutation>(print(RemoveProposalsFromSepDocument), variables));
    },
    removeMemberFromSep(variables: RemoveMemberFromSepMutationVariables): Promise<RemoveMemberFromSepMutation> {
      return withWrapper(() => client.request<RemoveMemberFromSepMutation>(print(RemoveMemberFromSepDocument), variables));
    },
    removeMemberFromSEPProposal(variables: RemoveMemberFromSepProposalMutationVariables): Promise<RemoveMemberFromSepProposalMutation> {
      return withWrapper(() => client.request<RemoveMemberFromSepProposalMutation>(print(RemoveMemberFromSepProposalDocument), variables));
    },
    reorderSepMeetingDecisionProposals(variables: ReorderSepMeetingDecisionProposalsMutationVariables): Promise<ReorderSepMeetingDecisionProposalsMutation> {
      return withWrapper(() => client.request<ReorderSepMeetingDecisionProposalsMutation>(print(ReorderSepMeetingDecisionProposalsDocument), variables));
    },
    saveSepMeetingDecision(variables: SaveSepMeetingDecisionMutationVariables): Promise<SaveSepMeetingDecisionMutation> {
      return withWrapper(() => client.request<SaveSepMeetingDecisionMutation>(print(SaveSepMeetingDecisionDocument), variables));
    },
    updateSEP(variables: UpdateSepMutationVariables): Promise<UpdateSepMutation> {
      return withWrapper(() => client.request<UpdateSepMutation>(print(UpdateSepDocument), variables));
    },
    updateSEPTimeAllocation(variables: UpdateSepTimeAllocationMutationVariables): Promise<UpdateSepTimeAllocationMutation> {
      return withWrapper(() => client.request<UpdateSepTimeAllocationMutation>(print(UpdateSepTimeAllocationDocument), variables));
    },
    addClientLog(variables: AddClientLogMutationVariables): Promise<AddClientLogMutation> {
      return withWrapper(() => client.request<AddClientLogMutation>(print(AddClientLogDocument), variables));
    },
    createApiAccessToken(variables: CreateApiAccessTokenMutationVariables): Promise<CreateApiAccessTokenMutation> {
      return withWrapper(() => client.request<CreateApiAccessTokenMutation>(print(CreateApiAccessTokenDocument), variables));
    },
    createInstitution(variables: CreateInstitutionMutationVariables): Promise<CreateInstitutionMutation> {
      return withWrapper(() => client.request<CreateInstitutionMutation>(print(CreateInstitutionDocument), variables));
    },
    createUnit(variables: CreateUnitMutationVariables): Promise<CreateUnitMutation> {
      return withWrapper(() => client.request<CreateUnitMutation>(print(CreateUnitDocument), variables));
    },
    deleteApiAccessToken(variables: DeleteApiAccessTokenMutationVariables): Promise<DeleteApiAccessTokenMutation> {
      return withWrapper(() => client.request<DeleteApiAccessTokenMutation>(print(DeleteApiAccessTokenDocument), variables));
    },
    deleteInstitution(variables: DeleteInstitutionMutationVariables): Promise<DeleteInstitutionMutation> {
      return withWrapper(() => client.request<DeleteInstitutionMutation>(print(DeleteInstitutionDocument), variables));
    },
    deleteUnit(variables: DeleteUnitMutationVariables): Promise<DeleteUnitMutation> {
      return withWrapper(() => client.request<DeleteUnitMutation>(print(DeleteUnitDocument), variables));
    },
    getAllApiAccessTokensAndPermissions(variables?: GetAllApiAccessTokensAndPermissionsQueryVariables): Promise<GetAllApiAccessTokensAndPermissionsQuery> {
      return withWrapper(() => client.request<GetAllApiAccessTokensAndPermissionsQuery>(print(GetAllApiAccessTokensAndPermissionsDocument), variables));
    },
    getAllQueriesAndMutations(variables?: GetAllQueriesAndMutationsQueryVariables): Promise<GetAllQueriesAndMutationsQuery> {
      return withWrapper(() => client.request<GetAllQueriesAndMutationsQuery>(print(GetAllQueriesAndMutationsDocument), variables));
    },
    getFeatures(variables?: GetFeaturesQueryVariables): Promise<GetFeaturesQuery> {
      return withWrapper(() => client.request<GetFeaturesQuery>(print(GetFeaturesDocument), variables));
    },
    getInstitutions(variables?: GetInstitutionsQueryVariables): Promise<GetInstitutionsQuery> {
      return withWrapper(() => client.request<GetInstitutionsQuery>(print(GetInstitutionsDocument), variables));
    },
    getPageContent(variables: GetPageContentQueryVariables): Promise<GetPageContentQuery> {
      return withWrapper(() => client.request<GetPageContentQuery>(print(GetPageContentDocument), variables));
    },
    getSettings(variables?: GetSettingsQueryVariables): Promise<GetSettingsQuery> {
      return withWrapper(() => client.request<GetSettingsQuery>(print(GetSettingsDocument), variables));
    },
    getUnits(variables?: GetUnitsQueryVariables): Promise<GetUnitsQuery> {
      return withWrapper(() => client.request<GetUnitsQuery>(print(GetUnitsDocument), variables));
    },
    setPageContent(variables: SetPageContentMutationVariables): Promise<SetPageContentMutation> {
      return withWrapper(() => client.request<SetPageContentMutation>(print(SetPageContentDocument), variables));
    },
    updateApiAccessToken(variables: UpdateApiAccessTokenMutationVariables): Promise<UpdateApiAccessTokenMutation> {
      return withWrapper(() => client.request<UpdateApiAccessTokenMutation>(print(UpdateApiAccessTokenDocument), variables));
    },
    updateInstitution(variables: UpdateInstitutionMutationVariables): Promise<UpdateInstitutionMutation> {
      return withWrapper(() => client.request<UpdateInstitutionMutation>(print(UpdateInstitutionDocument), variables));
    },
    assignInstrumentsToCall(variables: AssignInstrumentsToCallMutationVariables): Promise<AssignInstrumentsToCallMutation> {
      return withWrapper(() => client.request<AssignInstrumentsToCallMutation>(print(AssignInstrumentsToCallDocument), variables));
    },
    createCall(variables: CreateCallMutationVariables): Promise<CreateCallMutation> {
      return withWrapper(() => client.request<CreateCallMutation>(print(CreateCallDocument), variables));
    },
    deleteCall(variables: DeleteCallMutationVariables): Promise<DeleteCallMutation> {
      return withWrapper(() => client.request<DeleteCallMutation>(print(DeleteCallDocument), variables));
    },
    getCall(variables: GetCallQueryVariables): Promise<GetCallQuery> {
      return withWrapper(() => client.request<GetCallQuery>(print(GetCallDocument), variables));
    },
    getCalls(variables?: GetCallsQueryVariables): Promise<GetCallsQuery> {
      return withWrapper(() => client.request<GetCallsQuery>(print(GetCallsDocument), variables));
    },
    getCallsByInstrumentScientist(variables: GetCallsByInstrumentScientistQueryVariables): Promise<GetCallsByInstrumentScientistQuery> {
      return withWrapper(() => client.request<GetCallsByInstrumentScientistQuery>(print(GetCallsByInstrumentScientistDocument), variables));
    },
    removeAssignedInstrumentFromCall(variables: RemoveAssignedInstrumentFromCallMutationVariables): Promise<RemoveAssignedInstrumentFromCallMutation> {
      return withWrapper(() => client.request<RemoveAssignedInstrumentFromCallMutation>(print(RemoveAssignedInstrumentFromCallDocument), variables));
    },
    updateCall(variables: UpdateCallMutationVariables): Promise<UpdateCallMutation> {
      return withWrapper(() => client.request<UpdateCallMutation>(print(UpdateCallDocument), variables));
    },
    getEventLogs(variables: GetEventLogsQueryVariables): Promise<GetEventLogsQuery> {
      return withWrapper(() => client.request<GetEventLogsQuery>(print(GetEventLogsDocument), variables));
    },
    assignProposalsToInstrument(variables: AssignProposalsToInstrumentMutationVariables): Promise<AssignProposalsToInstrumentMutation> {
      return withWrapper(() => client.request<AssignProposalsToInstrumentMutation>(print(AssignProposalsToInstrumentDocument), variables));
    },
    assignScientistsToInstrument(variables: AssignScientistsToInstrumentMutationVariables): Promise<AssignScientistsToInstrumentMutation> {
      return withWrapper(() => client.request<AssignScientistsToInstrumentMutation>(print(AssignScientistsToInstrumentDocument), variables));
    },
    createInstrument(variables: CreateInstrumentMutationVariables): Promise<CreateInstrumentMutation> {
      return withWrapper(() => client.request<CreateInstrumentMutation>(print(CreateInstrumentDocument), variables));
    },
    deleteInstrument(variables: DeleteInstrumentMutationVariables): Promise<DeleteInstrumentMutation> {
      return withWrapper(() => client.request<DeleteInstrumentMutation>(print(DeleteInstrumentDocument), variables));
    },
    getInstruments(variables?: GetInstrumentsQueryVariables): Promise<GetInstrumentsQuery> {
      return withWrapper(() => client.request<GetInstrumentsQuery>(print(GetInstrumentsDocument), variables));
    },
    getUserInstruments(variables?: GetUserInstrumentsQueryVariables): Promise<GetUserInstrumentsQuery> {
      return withWrapper(() => client.request<GetUserInstrumentsQuery>(print(GetUserInstrumentsDocument), variables));
    },
    removeProposalsFromInstrument(variables: RemoveProposalsFromInstrumentMutationVariables): Promise<RemoveProposalsFromInstrumentMutation> {
      return withWrapper(() => client.request<RemoveProposalsFromInstrumentMutation>(print(RemoveProposalsFromInstrumentDocument), variables));
    },
    removeScientistFromInstrument(variables: RemoveScientistFromInstrumentMutationVariables): Promise<RemoveScientistFromInstrumentMutation> {
      return withWrapper(() => client.request<RemoveScientistFromInstrumentMutation>(print(RemoveScientistFromInstrumentDocument), variables));
    },
    setInstrumentAvailabilityTime(variables: SetInstrumentAvailabilityTimeMutationVariables): Promise<SetInstrumentAvailabilityTimeMutation> {
      return withWrapper(() => client.request<SetInstrumentAvailabilityTimeMutation>(print(SetInstrumentAvailabilityTimeDocument), variables));
    },
    submitInstrument(variables: SubmitInstrumentMutationVariables): Promise<SubmitInstrumentMutation> {
      return withWrapper(() => client.request<SubmitInstrumentMutation>(print(SubmitInstrumentDocument), variables));
    },
    updateInstrument(variables: UpdateInstrumentMutationVariables): Promise<UpdateInstrumentMutation> {
      return withWrapper(() => client.request<UpdateInstrumentMutation>(print(UpdateInstrumentDocument), variables));
    },
    administrationProposal(variables: AdministrationProposalMutationVariables): Promise<AdministrationProposalMutation> {
      return withWrapper(() => client.request<AdministrationProposalMutation>(print(AdministrationProposalDocument), variables));
    },
    changeProposalsStatus(variables: ChangeProposalsStatusMutationVariables): Promise<ChangeProposalsStatusMutation> {
      return withWrapper(() => client.request<ChangeProposalsStatusMutation>(print(ChangeProposalsStatusDocument), variables));
    },
    cloneProposal(variables: CloneProposalMutationVariables): Promise<CloneProposalMutation> {
      return withWrapper(() => client.request<CloneProposalMutation>(print(CloneProposalDocument), variables));
    },
    createProposal(variables: CreateProposalMutationVariables): Promise<CreateProposalMutation> {
      return withWrapper(() => client.request<CreateProposalMutation>(print(CreateProposalDocument), variables));
    },
    deleteProposal(variables: DeleteProposalMutationVariables): Promise<DeleteProposalMutation> {
      return withWrapper(() => client.request<DeleteProposalMutation>(print(DeleteProposalDocument), variables));
    },
    getInstrumentScientistProposals(variables?: GetInstrumentScientistProposalsQueryVariables): Promise<GetInstrumentScientistProposalsQuery> {
      return withWrapper(() => client.request<GetInstrumentScientistProposalsQuery>(print(GetInstrumentScientistProposalsDocument), variables));
    },
    getMyProposals(variables?: GetMyProposalsQueryVariables): Promise<GetMyProposalsQuery> {
      return withWrapper(() => client.request<GetMyProposalsQuery>(print(GetMyProposalsDocument), variables));
    },
    getProposal(variables: GetProposalQueryVariables): Promise<GetProposalQuery> {
      return withWrapper(() => client.request<GetProposalQuery>(print(GetProposalDocument), variables));
    },
    getProposals(variables?: GetProposalsQueryVariables): Promise<GetProposalsQuery> {
      return withWrapper(() => client.request<GetProposalsQuery>(print(GetProposalsDocument), variables));
    },
    getProposalsCore(variables?: GetProposalsCoreQueryVariables): Promise<GetProposalsCoreQuery> {
      return withWrapper(() => client.request<GetProposalsCoreQuery>(print(GetProposalsCoreDocument), variables));
    },
    notifyProposal(variables: NotifyProposalMutationVariables): Promise<NotifyProposalMutation> {
      return withWrapper(() => client.request<NotifyProposalMutation>(print(NotifyProposalDocument), variables));
    },
    submitProposal(variables: SubmitProposalMutationVariables): Promise<SubmitProposalMutation> {
      return withWrapper(() => client.request<SubmitProposalMutation>(print(SubmitProposalDocument), variables));
    },
    updateProposal(variables: UpdateProposalMutationVariables): Promise<UpdateProposalMutation> {
      return withWrapper(() => client.request<UpdateProposalMutation>(print(UpdateProposalDocument), variables));
    },
    getUserProposalBookingsWithEvents(variables?: GetUserProposalBookingsWithEventsQueryVariables): Promise<GetUserProposalBookingsWithEventsQuery> {
      return withWrapper(() => client.request<GetUserProposalBookingsWithEventsQuery>(print(GetUserProposalBookingsWithEventsDocument), variables));
    },
    answerTopic(variables: AnswerTopicMutationVariables): Promise<AnswerTopicMutation> {
      return withWrapper(() => client.request<AnswerTopicMutation>(print(AnswerTopicDocument), variables));
    },
    createQuestionary(variables: CreateQuestionaryMutationVariables): Promise<CreateQuestionaryMutation> {
      return withWrapper(() => client.request<CreateQuestionaryMutation>(print(CreateQuestionaryDocument), variables));
    },
    getBlankQuestionarySteps(variables: GetBlankQuestionaryStepsQueryVariables): Promise<GetBlankQuestionaryStepsQuery> {
      return withWrapper(() => client.request<GetBlankQuestionaryStepsQuery>(print(GetBlankQuestionaryStepsDocument), variables));
    },
    getFileMetadata(variables: GetFileMetadataQueryVariables): Promise<GetFileMetadataQuery> {
      return withWrapper(() => client.request<GetFileMetadataQuery>(print(GetFileMetadataDocument), variables));
    },
    getQuestionary(variables: GetQuestionaryQueryVariables): Promise<GetQuestionaryQuery> {
      return withWrapper(() => client.request<GetQuestionaryQuery>(print(GetQuestionaryDocument), variables));
    },
    addTechnicalReview(variables: AddTechnicalReviewMutationVariables): Promise<AddTechnicalReviewMutation> {
      return withWrapper(() => client.request<AddTechnicalReviewMutation>(print(AddTechnicalReviewDocument), variables));
    },
    addUserForReview(variables: AddUserForReviewMutationVariables): Promise<AddUserForReviewMutation> {
      return withWrapper(() => client.request<AddUserForReviewMutation>(print(AddUserForReviewDocument), variables));
    },
    updateTechnicalReviewAssignee(variables: UpdateTechnicalReviewAssigneeMutationVariables): Promise<UpdateTechnicalReviewAssigneeMutation> {
      return withWrapper(() => client.request<UpdateTechnicalReviewAssigneeMutation>(print(UpdateTechnicalReviewAssigneeDocument), variables));
    },
    getProposalReviews(variables: GetProposalReviewsQueryVariables): Promise<GetProposalReviewsQuery> {
      return withWrapper(() => client.request<GetProposalReviewsQuery>(print(GetProposalReviewsDocument), variables));
    },
    getReview(variables: GetReviewQueryVariables): Promise<GetReviewQuery> {
      return withWrapper(() => client.request<GetReviewQuery>(print(GetReviewDocument), variables));
    },
    removeUserForReview(variables: RemoveUserForReviewMutationVariables): Promise<RemoveUserForReviewMutation> {
      return withWrapper(() => client.request<RemoveUserForReviewMutation>(print(RemoveUserForReviewDocument), variables));
    },
    submitProposalsReview(variables: SubmitProposalsReviewMutationVariables): Promise<SubmitProposalsReviewMutation> {
      return withWrapper(() => client.request<SubmitProposalsReviewMutation>(print(SubmitProposalsReviewDocument), variables));
    },
    submitTechnicalReview(variables: SubmitTechnicalReviewMutationVariables): Promise<SubmitTechnicalReviewMutation> {
      return withWrapper(() => client.request<SubmitTechnicalReviewMutation>(print(SubmitTechnicalReviewDocument), variables));
    },
    addReview(variables: AddReviewMutationVariables): Promise<AddReviewMutation> {
      return withWrapper(() => client.request<AddReviewMutation>(print(AddReviewDocument), variables));
    },
    userWithReviews(variables?: UserWithReviewsQueryVariables): Promise<UserWithReviewsQuery> {
      return withWrapper(() => client.request<UserWithReviewsQuery>(print(UserWithReviewsDocument), variables));
    },
    cloneSample(variables: CloneSampleMutationVariables): Promise<CloneSampleMutation> {
      return withWrapper(() => client.request<CloneSampleMutation>(print(CloneSampleDocument), variables));
    },
    createSample(variables: CreateSampleMutationVariables): Promise<CreateSampleMutation> {
      return withWrapper(() => client.request<CreateSampleMutation>(print(CreateSampleDocument), variables));
    },
    deleteSample(variables: DeleteSampleMutationVariables): Promise<DeleteSampleMutation> {
      return withWrapper(() => client.request<DeleteSampleMutation>(print(DeleteSampleDocument), variables));
    },
    getSample(variables: GetSampleQueryVariables): Promise<GetSampleQuery> {
      return withWrapper(() => client.request<GetSampleQuery>(print(GetSampleDocument), variables));
    },
    getSamplesByCallId(variables: GetSamplesByCallIdQueryVariables): Promise<GetSamplesByCallIdQuery> {
      return withWrapper(() => client.request<GetSamplesByCallIdQuery>(print(GetSamplesByCallIdDocument), variables));
    },
    getSamplesWithProposalData(variables?: GetSamplesWithProposalDataQueryVariables): Promise<GetSamplesWithProposalDataQuery> {
      return withWrapper(() => client.request<GetSamplesWithProposalDataQuery>(print(GetSamplesWithProposalDataDocument), variables));
    },
    getSamplesWithQuestionaryStatus(variables?: GetSamplesWithQuestionaryStatusQueryVariables): Promise<GetSamplesWithQuestionaryStatusQuery> {
      return withWrapper(() => client.request<GetSamplesWithQuestionaryStatusQuery>(print(GetSamplesWithQuestionaryStatusDocument), variables));
    },
    updateSample(variables: UpdateSampleMutationVariables): Promise<UpdateSampleMutation> {
      return withWrapper(() => client.request<UpdateSampleMutation>(print(UpdateSampleDocument), variables));
    },
    addProposalWorkflowStatus(variables: AddProposalWorkflowStatusMutationVariables): Promise<AddProposalWorkflowStatusMutation> {
      return withWrapper(() => client.request<AddProposalWorkflowStatusMutation>(print(AddProposalWorkflowStatusDocument), variables));
    },
    addStatusChangingEventsToConnection(variables: AddStatusChangingEventsToConnectionMutationVariables): Promise<AddStatusChangingEventsToConnectionMutation> {
      return withWrapper(() => client.request<AddStatusChangingEventsToConnectionMutation>(print(AddStatusChangingEventsToConnectionDocument), variables));
    },
    createProposalStatus(variables: CreateProposalStatusMutationVariables): Promise<CreateProposalStatusMutation> {
      return withWrapper(() => client.request<CreateProposalStatusMutation>(print(CreateProposalStatusDocument), variables));
    },
    createProposalWorkflow(variables: CreateProposalWorkflowMutationVariables): Promise<CreateProposalWorkflowMutation> {
      return withWrapper(() => client.request<CreateProposalWorkflowMutation>(print(CreateProposalWorkflowDocument), variables));
    },
    deleteProposalStatus(variables: DeleteProposalStatusMutationVariables): Promise<DeleteProposalStatusMutation> {
      return withWrapper(() => client.request<DeleteProposalStatusMutation>(print(DeleteProposalStatusDocument), variables));
    },
    deleteProposalWorkflow(variables: DeleteProposalWorkflowMutationVariables): Promise<DeleteProposalWorkflowMutation> {
      return withWrapper(() => client.request<DeleteProposalWorkflowMutation>(print(DeleteProposalWorkflowDocument), variables));
    },
    deleteProposalWorkflowStatus(variables: DeleteProposalWorkflowStatusMutationVariables): Promise<DeleteProposalWorkflowStatusMutation> {
      return withWrapper(() => client.request<DeleteProposalWorkflowStatusMutation>(print(DeleteProposalWorkflowStatusDocument), variables));
    },
    getProposalEvents(variables?: GetProposalEventsQueryVariables): Promise<GetProposalEventsQuery> {
      return withWrapper(() => client.request<GetProposalEventsQuery>(print(GetProposalEventsDocument), variables));
    },
    getProposalStatuses(variables?: GetProposalStatusesQueryVariables): Promise<GetProposalStatusesQuery> {
      return withWrapper(() => client.request<GetProposalStatusesQuery>(print(GetProposalStatusesDocument), variables));
    },
    getProposalWorkflow(variables: GetProposalWorkflowQueryVariables): Promise<GetProposalWorkflowQuery> {
      return withWrapper(() => client.request<GetProposalWorkflowQuery>(print(GetProposalWorkflowDocument), variables));
    },
    getProposalWorkflows(variables?: GetProposalWorkflowsQueryVariables): Promise<GetProposalWorkflowsQuery> {
      return withWrapper(() => client.request<GetProposalWorkflowsQuery>(print(GetProposalWorkflowsDocument), variables));
    },
    moveProposalWorkflowStatus(variables: MoveProposalWorkflowStatusMutationVariables): Promise<MoveProposalWorkflowStatusMutation> {
      return withWrapper(() => client.request<MoveProposalWorkflowStatusMutation>(print(MoveProposalWorkflowStatusDocument), variables));
    },
    updateProposalStatus(variables: UpdateProposalStatusMutationVariables): Promise<UpdateProposalStatusMutation> {
      return withWrapper(() => client.request<UpdateProposalStatusMutation>(print(UpdateProposalStatusDocument), variables));
    },
    updateProposalWorkflow(variables: UpdateProposalWorkflowMutationVariables): Promise<UpdateProposalWorkflowMutation> {
      return withWrapper(() => client.request<UpdateProposalWorkflowMutation>(print(UpdateProposalWorkflowDocument), variables));
    },
    addSamplesToShipment(variables: AddSamplesToShipmentMutationVariables): Promise<AddSamplesToShipmentMutation> {
      return withWrapper(() => client.request<AddSamplesToShipmentMutation>(print(AddSamplesToShipmentDocument), variables));
    },
    createShipment(variables: CreateShipmentMutationVariables): Promise<CreateShipmentMutation> {
      return withWrapper(() => client.request<CreateShipmentMutation>(print(CreateShipmentDocument), variables));
    },
    deleteShipment(variables: DeleteShipmentMutationVariables): Promise<DeleteShipmentMutation> {
      return withWrapper(() => client.request<DeleteShipmentMutation>(print(DeleteShipmentDocument), variables));
    },
    getMyShipments(variables?: GetMyShipmentsQueryVariables): Promise<GetMyShipmentsQuery> {
      return withWrapper(() => client.request<GetMyShipmentsQuery>(print(GetMyShipmentsDocument), variables));
    },
    getShipment(variables: GetShipmentQueryVariables): Promise<GetShipmentQuery> {
      return withWrapper(() => client.request<GetShipmentQuery>(print(GetShipmentDocument), variables));
    },
    getShipments(variables?: GetShipmentsQueryVariables): Promise<GetShipmentsQuery> {
      return withWrapper(() => client.request<GetShipmentsQuery>(print(GetShipmentsDocument), variables));
    },
    setActiveTemplate(variables: SetActiveTemplateMutationVariables): Promise<SetActiveTemplateMutation> {
      return withWrapper(() => client.request<SetActiveTemplateMutation>(print(SetActiveTemplateDocument), variables));
    },
    submitShipment(variables: SubmitShipmentMutationVariables): Promise<SubmitShipmentMutation> {
      return withWrapper(() => client.request<SubmitShipmentMutation>(print(SubmitShipmentDocument), variables));
    },
    updateShipment(variables: UpdateShipmentMutationVariables): Promise<UpdateShipmentMutation> {
      return withWrapper(() => client.request<UpdateShipmentMutation>(print(UpdateShipmentDocument), variables));
    },
    cloneTemplate(variables: CloneTemplateMutationVariables): Promise<CloneTemplateMutation> {
      return withWrapper(() => client.request<CloneTemplateMutation>(print(CloneTemplateDocument), variables));
    },
    createTemplate(variables: CreateTemplateMutationVariables): Promise<CreateTemplateMutation> {
      return withWrapper(() => client.request<CreateTemplateMutation>(print(CreateTemplateDocument), variables));
    },
    createQuestion(variables: CreateQuestionMutationVariables): Promise<CreateQuestionMutation> {
      return withWrapper(() => client.request<CreateQuestionMutation>(print(CreateQuestionDocument), variables));
    },
    createQuestionTemplateRelation(variables: CreateQuestionTemplateRelationMutationVariables): Promise<CreateQuestionTemplateRelationMutation> {
      return withWrapper(() => client.request<CreateQuestionTemplateRelationMutation>(print(CreateQuestionTemplateRelationDocument), variables));
    },
    createTopic(variables: CreateTopicMutationVariables): Promise<CreateTopicMutation> {
      return withWrapper(() => client.request<CreateTopicMutation>(print(CreateTopicDocument), variables));
    },
    deleteQuestion(variables: DeleteQuestionMutationVariables): Promise<DeleteQuestionMutation> {
      return withWrapper(() => client.request<DeleteQuestionMutation>(print(DeleteQuestionDocument), variables));
    },
    deleteQuestionTemplateRelation(variables: DeleteQuestionTemplateRelationMutationVariables): Promise<DeleteQuestionTemplateRelationMutation> {
      return withWrapper(() => client.request<DeleteQuestionTemplateRelationMutation>(print(DeleteQuestionTemplateRelationDocument), variables));
    },
    deleteTemplate(variables: DeleteTemplateMutationVariables): Promise<DeleteTemplateMutation> {
      return withWrapper(() => client.request<DeleteTemplateMutation>(print(DeleteTemplateDocument), variables));
    },
    deleteTopic(variables: DeleteTopicMutationVariables): Promise<DeleteTopicMutation> {
      return withWrapper(() => client.request<DeleteTopicMutation>(print(DeleteTopicDocument), variables));
    },
    getActiveTemplateId(variables: GetActiveTemplateIdQueryVariables): Promise<GetActiveTemplateIdQuery> {
      return withWrapper(() => client.request<GetActiveTemplateIdQuery>(print(GetActiveTemplateIdDocument), variables));
    },
    getIsNaturalKeyPresent(variables: GetIsNaturalKeyPresentQueryVariables): Promise<GetIsNaturalKeyPresentQuery> {
      return withWrapper(() => client.request<GetIsNaturalKeyPresentQuery>(print(GetIsNaturalKeyPresentDocument), variables));
    },
    getProposalTemplates(variables?: GetProposalTemplatesQueryVariables): Promise<GetProposalTemplatesQuery> {
      return withWrapper(() => client.request<GetProposalTemplatesQuery>(print(GetProposalTemplatesDocument), variables));
    },
    getQuestions(variables?: GetQuestionsQueryVariables): Promise<GetQuestionsQuery> {
      return withWrapper(() => client.request<GetQuestionsQuery>(print(GetQuestionsDocument), variables));
    },
    getTemplate(variables: GetTemplateQueryVariables): Promise<GetTemplateQuery> {
      return withWrapper(() => client.request<GetTemplateQuery>(print(GetTemplateDocument), variables));
    },
    getTemplateCategories(variables?: GetTemplateCategoriesQueryVariables): Promise<GetTemplateCategoriesQuery> {
      return withWrapper(() => client.request<GetTemplateCategoriesQuery>(print(GetTemplateCategoriesDocument), variables));
    },
    getTemplates(variables?: GetTemplatesQueryVariables): Promise<GetTemplatesQuery> {
      return withWrapper(() => client.request<GetTemplatesQuery>(print(GetTemplatesDocument), variables));
    },
    updateQuestion(variables: UpdateQuestionMutationVariables): Promise<UpdateQuestionMutation> {
      return withWrapper(() => client.request<UpdateQuestionMutation>(print(UpdateQuestionDocument), variables));
    },
    updateQuestionTemplateRelation(variables: UpdateQuestionTemplateRelationMutationVariables): Promise<UpdateQuestionTemplateRelationMutation> {
      return withWrapper(() => client.request<UpdateQuestionTemplateRelationMutation>(print(UpdateQuestionTemplateRelationDocument), variables));
    },
    updateQuestionTemplateRelationSettings(variables: UpdateQuestionTemplateRelationSettingsMutationVariables): Promise<UpdateQuestionTemplateRelationSettingsMutation> {
      return withWrapper(() => client.request<UpdateQuestionTemplateRelationSettingsMutation>(print(UpdateQuestionTemplateRelationSettingsDocument), variables));
    },
    updateTemplate(variables: UpdateTemplateMutationVariables): Promise<UpdateTemplateMutation> {
      return withWrapper(() => client.request<UpdateTemplateMutation>(print(UpdateTemplateDocument), variables));
    },
    updateTopic(variables: UpdateTopicMutationVariables): Promise<UpdateTopicMutation> {
      return withWrapper(() => client.request<UpdateTopicMutation>(print(UpdateTopicDocument), variables));
    },
    checkExternalToken(variables: CheckExternalTokenMutationVariables): Promise<CheckExternalTokenMutation> {
      return withWrapper(() => client.request<CheckExternalTokenMutation>(print(CheckExternalTokenDocument), variables));
    },
    checkToken(variables: CheckTokenQueryVariables): Promise<CheckTokenQuery> {
      return withWrapper(() => client.request<CheckTokenQuery>(print(CheckTokenDocument), variables));
    },
    createUser(variables: CreateUserMutationVariables): Promise<CreateUserMutation> {
      return withWrapper(() => client.request<CreateUserMutation>(print(CreateUserDocument), variables));
    },
    createUserByEmailInvite(variables: CreateUserByEmailInviteMutationVariables): Promise<CreateUserByEmailInviteMutation> {
      return withWrapper(() => client.request<CreateUserByEmailInviteMutation>(print(CreateUserByEmailInviteDocument), variables));
    },
    deleteUser(variables: DeleteUserMutationVariables): Promise<DeleteUserMutation> {
      return withWrapper(() => client.request<DeleteUserMutation>(print(DeleteUserDocument), variables));
    },
    getBasicUserDetails(variables: GetBasicUserDetailsQueryVariables): Promise<GetBasicUserDetailsQuery> {
      return withWrapper(() => client.request<GetBasicUserDetailsQuery>(print(GetBasicUserDetailsDocument), variables));
    },
    getFields(variables?: GetFieldsQueryVariables): Promise<GetFieldsQuery> {
      return withWrapper(() => client.request<GetFieldsQuery>(print(GetFieldsDocument), variables));
    },
    getMyRoles(variables?: GetMyRolesQueryVariables): Promise<GetMyRolesQuery> {
      return withWrapper(() => client.request<GetMyRolesQuery>(print(GetMyRolesDocument), variables));
    },
    getOrcIDInformation(variables: GetOrcIdInformationQueryVariables): Promise<GetOrcIdInformationQuery> {
      return withWrapper(() => client.request<GetOrcIdInformationQuery>(print(GetOrcIdInformationDocument), variables));
    },
    getRoles(variables?: GetRolesQueryVariables): Promise<GetRolesQuery> {
      return withWrapper(() => client.request<GetRolesQuery>(print(GetRolesDocument), variables));
    },
    getToken(variables: GetTokenMutationVariables): Promise<GetTokenMutation> {
      return withWrapper(() => client.request<GetTokenMutation>(print(GetTokenDocument), variables));
    },
    getTokenForUser(variables: GetTokenForUserMutationVariables): Promise<GetTokenForUserMutation> {
      return withWrapper(() => client.request<GetTokenForUserMutation>(print(GetTokenForUserDocument), variables));
    },
    getUser(variables: GetUserQueryVariables): Promise<GetUserQuery> {
      return withWrapper(() => client.request<GetUserQuery>(print(GetUserDocument), variables));
    },
    getUserMe(variables?: GetUserMeQueryVariables): Promise<GetUserMeQuery> {
      return withWrapper(() => client.request<GetUserMeQuery>(print(GetUserMeDocument), variables));
    },
    getUserProposals(variables?: GetUserProposalsQueryVariables): Promise<GetUserProposalsQuery> {
      return withWrapper(() => client.request<GetUserProposalsQuery>(print(GetUserProposalsDocument), variables));
    },
    getUserWithRoles(variables: GetUserWithRolesQueryVariables): Promise<GetUserWithRolesQuery> {
      return withWrapper(() => client.request<GetUserWithRolesQuery>(print(GetUserWithRolesDocument), variables));
    },
    getUsers(variables?: GetUsersQueryVariables): Promise<GetUsersQuery> {
      return withWrapper(() => client.request<GetUsersQuery>(print(GetUsersDocument), variables));
    },
    login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables));
    },
    resetPassword(variables: ResetPasswordMutationVariables): Promise<ResetPasswordMutation> {
      return withWrapper(() => client.request<ResetPasswordMutation>(print(ResetPasswordDocument), variables));
    },
    resetPasswordEmail(variables: ResetPasswordEmailMutationVariables): Promise<ResetPasswordEmailMutation> {
      return withWrapper(() => client.request<ResetPasswordEmailMutation>(print(ResetPasswordEmailDocument), variables));
    },
    selectRole(variables: SelectRoleMutationVariables): Promise<SelectRoleMutation> {
      return withWrapper(() => client.request<SelectRoleMutation>(print(SelectRoleDocument), variables));
    },
    setUserEmailVerified(variables: SetUserEmailVerifiedMutationVariables): Promise<SetUserEmailVerifiedMutation> {
      return withWrapper(() => client.request<SetUserEmailVerifiedMutation>(print(SetUserEmailVerifiedDocument), variables));
    },
    setUserNotPlaceholder(variables: SetUserNotPlaceholderMutationVariables): Promise<SetUserNotPlaceholderMutation> {
      return withWrapper(() => client.request<SetUserNotPlaceholderMutation>(print(SetUserNotPlaceholderDocument), variables));
    },
    updatePassword(variables: UpdatePasswordMutationVariables): Promise<UpdatePasswordMutation> {
      return withWrapper(() => client.request<UpdatePasswordMutation>(print(UpdatePasswordDocument), variables));
    },
    updateUser(variables: UpdateUserMutationVariables): Promise<UpdateUserMutation> {
      return withWrapper(() => client.request<UpdateUserMutation>(print(UpdateUserDocument), variables));
    },
    updateUserRoles(variables: UpdateUserRolesMutationVariables): Promise<UpdateUserRolesMutation> {
      return withWrapper(() => client.request<UpdateUserRolesMutation>(print(UpdateUserRolesDocument), variables));
    },
    verifyEmail(variables: VerifyEmailMutationVariables): Promise<VerifyEmailMutation> {
      return withWrapper(() => client.request<VerifyEmailMutation>(print(VerifyEmailDocument), variables));
    },
    createVisit(variables: CreateVisitMutationVariables): Promise<CreateVisitMutation> {
      return withWrapper(() => client.request<CreateVisitMutation>(print(CreateVisitDocument), variables));
    },
    createVisitRegistrationQuestionary(variables: CreateVisitRegistrationQuestionaryMutationVariables): Promise<CreateVisitRegistrationQuestionaryMutation> {
      return withWrapper(() => client.request<CreateVisitRegistrationQuestionaryMutation>(print(CreateVisitRegistrationQuestionaryDocument), variables));
    },
    deleteVisit(variables: DeleteVisitMutationVariables): Promise<DeleteVisitMutation> {
      return withWrapper(() => client.request<DeleteVisitMutation>(print(DeleteVisitDocument), variables));
    },
    getVisit(variables: GetVisitQueryVariables): Promise<GetVisitQuery> {
      return withWrapper(() => client.request<GetVisitQuery>(print(GetVisitDocument), variables));
    },
    getVisitRegistration(variables: GetVisitRegistrationQueryVariables): Promise<GetVisitRegistrationQuery> {
      return withWrapper(() => client.request<GetVisitRegistrationQuery>(print(GetVisitRegistrationDocument), variables));
    },
    getVisits(variables?: GetVisitsQueryVariables): Promise<GetVisitsQuery> {
      return withWrapper(() => client.request<GetVisitsQuery>(print(GetVisitsDocument), variables));
    },
    updateVisit(variables: UpdateVisitMutationVariables): Promise<UpdateVisitMutation> {
      return withWrapper(() => client.request<UpdateVisitMutation>(print(UpdateVisitDocument), variables));
    },
    updateVisitRegistration(variables: UpdateVisitRegistrationMutationVariables): Promise<UpdateVisitRegistrationMutation> {
      return withWrapper(() => client.request<UpdateVisitRegistrationMutation>(print(UpdateVisitRegistrationDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;