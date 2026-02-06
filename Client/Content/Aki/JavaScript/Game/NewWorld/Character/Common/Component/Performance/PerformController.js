"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformController = undefined;
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../../../Core/Net/Net");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PerformActionCenter_1 = require("./Action/PerformActionCenter");
class PerformController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(15073, this.tX_);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(15073);
    return true;
  }
  static RecoverTreeInfo(e) {
    for (const r of e) {
      ModelManager_1.ModelManager.PerformModel.SetSightTarget(r);
    }
  }
  static OnLeaveLevel() {
    PerformActionCenter_1.PerformActionPool.Clear();
    return true;
  }
}
(exports.PerformController = PerformController).tX_ = e => {
  for (const r of e.hK_) {
    ModelManager_1.ModelManager.PerformModel.SetSightTarget(r);
  }
};
//# sourceMappingURL=PerformController.js.map