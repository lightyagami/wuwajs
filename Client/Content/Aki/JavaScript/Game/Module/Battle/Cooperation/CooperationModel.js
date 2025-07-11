"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CooperationModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const LinkCooperationHandler_1 = require("./CooperationHandler/LinkCooperationHandler");
const QteCooperationHandler_1 = require("./CooperationHandler/QteCooperationHandler");
const SceneTeamCooperationHandler_1 = require("./CooperationHandler/SceneTeamCooperationHandler");
class CooperationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.vYo = undefined;
  }
  OnInit() {
    this.vYo = [new LinkCooperationHandler_1.LinkCooperationHandler(), new QteCooperationHandler_1.QteCooperationHandler(), new SceneTeamCooperationHandler_1.SceneTeamCooperationHandler()];
    return true;
  }
  OnLeaveLevel() {
    if (this.vYo) {
      for (const e of this.vYo) {
        e.Clear();
      }
    }
    return true;
  }
  GetHandlers() {
    return this.vYo;
  }
}
exports.CooperationModel = CooperationModel;
//# sourceMappingURL=CooperationModel.js.map