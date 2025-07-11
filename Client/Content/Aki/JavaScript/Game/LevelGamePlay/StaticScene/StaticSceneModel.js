"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticSceneModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class StaticSceneModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsNotAutoExitSceneCamera = false;
    this.IsForceKeepUi = false;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.IsNotAutoExitSceneCamera = false;
    return !(this.IsForceKeepUi = false);
  }
}
exports.StaticSceneModel = StaticSceneModel;
//# sourceMappingURL=StaticSceneModel.js.map