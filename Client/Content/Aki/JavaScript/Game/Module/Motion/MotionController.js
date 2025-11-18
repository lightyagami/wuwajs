"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class MotionController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19311, MotionController.hqi);
    Net_1.Net.Register(27289, MotionController.lqi);
    Net_1.Net.Register(19645, MotionController._qi);
    Net_1.Net.Register(15619, MotionController.uqi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19311);
    Net_1.Net.UnRegister(27289);
    Net_1.Net.UnRegister(19645);
    Net_1.Net.UnRegister(15619);
  }
}
(exports.MotionController = MotionController).RequestUnlockMotion = (e, o) => {
  var t = new Protocol_1.Aki.Protocol.Wts();
  t.Q6n = e;
  t.F7n = o;
  Net_1.Net.Call(24625, t, e => {
    if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27650);
    } else {
      ModelManager_1.ModelManager.MotionModel.OnMotionUnlock(e.Q6n, e.F7n);
    }
  });
};
MotionController.hqi = e => {
  ModelManager_1.ModelManager.MotionModel.OnNewMotionCanUnlock(e.Q6n, e.eUs);
};
MotionController.lqi = e => {
  ModelManager_1.ModelManager.MotionModel.OnRoleMotionActive(e);
};
MotionController._qi = e => {
  ModelManager_1.ModelManager.MotionModel.OnGetAllRoleMotionInfo(e);
};
MotionController.uqi = e => {
  ModelManager_1.ModelManager.MotionModel.OnMotionFinishCondition(e);
}; //# sourceMappingURL=MotionController.js.map