"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcLoadController = undefined;
const Queue_1 = require("../../../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SimpleNpcLoadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.Mor = new Queue_1.Queue(256);
    return true;
  }
  static OnLeaveLevel() {
    return true;
  }
  static OnTick(e) {
    var r;
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && this.Mor.Size !== 0 && (r = this.Mor.Pop(), ObjectUtils_1.ObjectUtils.IsValid(r)) && r.Mesh) {
      if (r.LoadModelByDA()) {
        r.SetDefaultCollision();
      }
      r.StartFlowLogic();
    }
  }
  static AddSimpleNpc(e) {
    if (this.Mor) {
      this.Mor.Push(e);
    }
  }
}
(exports.SimpleNpcLoadController = SimpleNpcLoadController).Mor = undefined;
//# sourceMappingURL=SimpleNpcLoadController.js.map