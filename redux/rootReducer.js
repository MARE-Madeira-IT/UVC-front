import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import contact from "./redux-modules/contact";
import surveyProgram from "./redux-modules/surveyProgram";
import report from "./redux-modules/report";
import locality from "./redux-modules/locality";
import user from "./redux-modules/user";
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

const rootReducer = combineReducers({
  auth,
  contact,
  surveyProgram,
  report,
  locality,
  user,
  taxa,
  indicator,
  taxa_category,
  depth,
  _function,
  benthic,
  substrate,
  motile,
  size_category,
  permissions
});

export default rootReducer;
