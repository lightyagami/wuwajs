"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitEntityTaskController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class WaitEntityTaskController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, WaitEntityTaskController.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, WaitEntityTaskController.zpe);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, WaitEntityTaskController.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, WaitEntityTaskController.zpe);
    return true;
  }
  static AddTask(e) {
    var t = WaitEntityTaskController.BOe++;
    ModelManager_1.ModelManager.WaitEntityTaskModel.AddTask(t, e);
    return t;
  }
  static RemoveTask(e) {
    ModelManager_1.ModelManager.WaitEntityTaskModel.RemoveTask(e);
  }
}
(exports.WaitEntityTaskController = WaitEntityTaskController).BOe = 0;
WaitEntityTaskController.GUe = (e, t, n) => {
  var t = t.Entity.GetComponent(0);
  var r = t.GetCreatureDataId();
  var t = t.GetPbDataId();
  ModelManager_1.ModelManager.WaitEntityTaskModel.OnAddEntity(r, t);
};
WaitEntityTaskController.zpe = (e, t) => {
  var t = t.Entity.GetComponent(0);
  var n = t.GetCreatureDataId();
  var t = t.GetPbDataId();
  ModelManager_1.ModelManager.WaitEntityTaskModel.OnRemoveEntity(n, t);
}; //# sourceMappingURL=WaitEntityTaskController.js.map