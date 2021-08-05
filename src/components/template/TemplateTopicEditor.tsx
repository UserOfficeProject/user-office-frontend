import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import {
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import * as Yup from 'yup';

import { getQuestionaryComponentDefinition } from 'components/questionary/QuestionaryComponentRegistry';
import {
  DependenciesLogicOperator,
  QuestionTemplateRelation,
  TemplateStep,
} from 'generated/sdk';
import { Event, EventType } from 'models/questionary/QuestionaryEditorModel';

import TemplateQuestionEditor, {
  TemplateTopicEditorData,
} from './TemplateQuestionEditor';

class TemplateTopicEditor implements TemplateTopicEditorData {
  constructor(public source: QuestionTemplateRelation) {}

  get id() {
    return this.source.question.id;
  }
  get question() {
    return this.source.question.question;
  }
  get naturalKey() {
    return this.source.question.naturalKey;
  }
  get dataType() {
    return this.source.question.dataType;
  }
  get dependencies() {
    return this.source.dependencies;
  }
  get dependenciesOperator() {
    return this.source.dependenciesOperator as DependenciesLogicOperator;
  }
  get config() {
    return this.source.config;
  }
  get categoryId() {
    return this.source.question.categoryId;
  }
}

export default function QuestionaryEditorTopic(props: {
  data: TemplateStep;
  dispatch: React.Dispatch<Event>;
  index: number;
  dragMode: boolean;
  hoveredDependency: string;
}) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const classes = makeStyles({
    // TODO move out styles
    container: {
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      background: '#FFF',
      flexBasis: '100%',
      height: '100%',
    },
    appBar: {
      background: 'transparent',
      boxShadow: 'none',
      paddingRight: 0,
    },
    toolbar: {
      minHeight: '36px',
      padding: '0 6px',
    },
    inputHeading: {
      fontSize: '15px',
      color: theme.palette.grey[600],
      fontWeight: 600,
      width: '100%',
      height: '36px',
    },
    itemContainer: {
      minHeight: '180px',
      height: 'calc(100% - 36px)',
      padding: '1px',
    },
    topic: {
      fontSize: '15px',
      padding: '0 5px',
      color: theme.palette.grey[600],
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    addQuestionMenuItem: {
      minHeight: 0,
    },
    toolbarButton: {
      cursor: 'pointer',
      color: theme.palette.grey[600],
    },
    addIcon: {
      textAlign: 'right',
      paddingRight: '8px',
    },
    dragMode: {
      borderColor: theme.palette.grey[400],
      padding: '5px',
      borderWidth: '1px',
      borderStyle: 'dashed',
    },
    button: {
      '&:first-child': {
        marginLeft: '0',
      },
      '&:last-child': {
        marginRight: '0',
      },
    },
    title: {
      margin: 0,
    },
  })();

  const { data, dispatch, index } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver
      ? theme.palette.primary.light
      : theme.palette.grey[100],
    transition: 'all 500ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  });

  const getItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    background: '#FFF',
    ...draggableStyle,
  });

  const titleJsx = (
    <Formik
      initialValues={{ title: data.topic.title }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(1),
      })}
      onSubmit={async (values): Promise<void> => {
        dispatch({
          type: EventType.UPDATE_TOPIC_TITLE_REQUESTED,
          payload: {
            topicId: data.topic.id,
            title: values.title,
            sortOrder: data.topic.sortOrder,
          },
        });
        setIsEditMode(false);
      }}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form>
          {isEditMode ? (
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Field
                  name="title"
                  id="title"
                  type="text"
                  component={TextField}
                  className={classes.title}
                  value={values.title}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  data-cy="topic-title-input"
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  disabled={isSubmitting}
                  variant="text"
                  size="small"
                  color="secondary"
                  onClick={() => setIsEditMode(false)}
                  className={classes.button}
                  data-cy="topic-title-cancel-update"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  data-cy="topic-title-update"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          ) : (
            <div>
              <span data-cy="topic-title">{values.title}</span>{' '}
              <EditIcon
                fontSize="small"
                data-cy="topic-title-edit"
                onClick={() => {
                  setIsEditMode(true);
                }}
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );

  const getItems = () => {
    if (props.dragMode) {
      return null;
    } else {
      return data.fields.map((item, index) => (
        <TemplateQuestionEditor
          index={index}
          data={new TemplateTopicEditor(item)}
          isHighlighted={props.hoveredDependency === item.question.id}
          dispatch={dispatch}
          onClick={(item) =>
            dispatch({
              type: EventType.OPEN_QUESTIONREL_EDITOR,
              payload: { questionId: item.id },
            })
          }
          key={item.question.id.toString()}
        />
      ));
    }
  };

  return (
    <Draggable
      key={data.topic.id.toString()}
      draggableId={data.topic.id.toString()}
      index={index}
      isDragDisabled={!props.dragMode}
    >
      {(provided) => (
        <Grid
          container
          className={`${classes.container} ${
            props.dragMode ? classes.dragMode : null
          }`}
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(provided.draggableProps.style)}
          {...provided.dragHandleProps}
        >
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Grid item xs={10} className={classes.topic}>
                {titleJsx}
              </Grid>
              <Grid item xs={2} className={classes.addIcon}>
                <MoreVertIcon
                  onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                    setAnchorEl(event.currentTarget)
                  }
                  className={classes.toolbarButton}
                  data-cy="show-more-button"
                />
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    data-cy="add-question-menu-item"
                    className={classes.addQuestionMenuItem}
                    onClick={() => {
                      dispatch({
                        type: EventType.PICK_QUESTION_REQUESTED,
                        payload: {
                          sortOrder: index + 1,
                          topic: props.data.topic,
                        },
                        // +1 means - add immediately after this topic
                      });
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon>
                      <PlaylistAddIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Add question</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    className={classes.addQuestionMenuItem}
                    data-cy="delete-topic-menu-item"
                    onClick={() => {
                      const isAllQuestionsInTopicDeletable = data.fields.every(
                        (item) => {
                          const definition = getQuestionaryComponentDefinition(
                            item.question.dataType
                          );

                          return definition.creatable;
                        }
                      );
                      if (isAllQuestionsInTopicDeletable === false) {
                        enqueueSnackbar(
                          'This topic can not be deleted because it contains protected question(s)',
                          {
                            variant: 'warning',
                          }
                        );

                        return;
                      }

                      dispatch({
                        type: EventType.DELETE_TOPIC_REQUESTED,
                        payload: data.topic.id,
                      });
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon>
                      <DeleteRoundedIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete topic</Typography>
                  </MenuItem>

                  <MenuItem
                    className={classes.addQuestionMenuItem}
                    data-cy="add-topic-menu-item"
                    onClick={() => {
                      dispatch({
                        type: EventType.CREATE_TOPIC_REQUESTED,
                        payload: {
                          topicId: data.topic.id,
                          isFirstTopic: false,
                        },
                      });
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon>
                      <PlaylistAddIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Add topic</Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            </Toolbar>
          </AppBar>

          <Droppable droppableId={data.topic.id.toString()} type="field">
            {(provided, snapshot) => (
              <Grid
                item
                xs={12}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={classes.itemContainer}
              >
                {getItems()}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      )}
    </Draggable>
  );
}
