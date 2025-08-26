"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipInterfaceController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const SkipTaskManager_1 = require("./SkipTaskManager");
class SkipInterfaceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.Ore();
    return true;
  }
  static OnClear() {
    this.kre();
    SkipTaskManager_1.SkipTaskManager.Clear();
    return true;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenViewBegined, this.vIo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, this.GFl);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenViewBegined, this.vIo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.GFl);
  }
  static async gFl() {
    var e = Protocol_1.Aki.Protocol.pv_.create();
    var e = await Net_1.Net.CallAsync(20140, e);
    if (e) {
      ModelManager_1.ModelManager.SkipInterfaceModel.FullUpdateAccessPathTimeServerConfig(e.Pb_);
    }
  }
}
exports.SkipInterfaceController = SkipInterfaceController;
(_a = SkipInterfaceController).vIo = e => {
  SkipTaskManager_1.SkipTaskManager.CheckContainRingView(e);
};
SkipInterfaceController.GFl = () => {
  _a.gFl();
}; //# sourceMappingURL=SkipInterfaceController.js.map