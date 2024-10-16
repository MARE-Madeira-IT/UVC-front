import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import contact from "./redux-modules/contact";
import surveyProgram from "./redux-modules/surveyProgram";
import report from "./redux-modules/report";
import locality from "./redux-modules/locality";
import surveyProgramUser from "./redux-modules/surveyProgramUser";
import taxa from "./redux-modules/taxa";
import indicator from "./redux-modules/indicator";
import taxa_category from "./redux-modules/taxa_category";
import depth from "./redux-modules/depth";
import _function from "./redux-modules/function";
import benthic from "./redux-modules/benthic";
import substrate from "./redux-modules/substrate";
import motile from "./redux-modules/motile";
import size_category from "./redux-modules/size_category";
import permissions from "./redux-modules/permissions";
import projectUser from "./redux-modules/projectUser";
import workspaceUser from "./redux-modules/workspaceUser";
import workspace from "./redux-modules/workspace";
import project from "./redux-modules/project";
import _export from "./redux-modules/export";

const rootReducer = combineReducers({
  auth,
  contact,
  surveyProgram,
  project,
  workspace,
  report,
  locality,
  surveyProgramUser,
  projectUser,
  workspaceUser,
  taxa,
  indicator,
  taxa_category,
  depth,
  _function,
  benthic,
  substrate,
  motile,
  size_category,
  permissions,
  _export,
});

export default rootReducer;
