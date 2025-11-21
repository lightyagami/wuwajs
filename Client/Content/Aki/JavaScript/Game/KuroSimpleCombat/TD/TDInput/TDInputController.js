"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInputController = undefined;
const InputController_1 = require("../../../Input/InputController");
const KscEnv_1 = require("../../KscEnv");
const KscLog_1 = require("../../KscLog");
const TDPlayerController_1 = require("../TDPlayer/TDPlayerController");
class TowerDefenseInputController {
  static OnStart() {
    return true;
  }
  static OnStop() {
    this.RemoveInputLayer();
    return true;
  }
  static BMd() {
    var r = TDPlayerController_1.TowerDefensePlayerController.GetPossessedPlayerEntity();
    if (r) {
      return InputController_1.InputController.GetInputLayer(r.Id, 6);
    }
  }
  static AddInputLayer() {
    var r;
    var t;
    if (this.BMd()) {
      this.RemoveInputLayer();
    }
    if (r = InputController_1.InputController.CreateInputLayer(6)) {
      if (t = TDPlayerController_1.TowerDefensePlayerController.GetPossessedPlayerEntity()) {
        InputController_1.InputController.AddInputLayer(t.Id, r);
      } else {
        KscLog_1.KscLog.Warn("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层加入异常,无法绑定实体");
      }
      return true;
    } else {
      KscLog_1.KscLog.Warn("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层加入异常");
      return false;
    }
  }
  static RemoveInputLayer() {
    var r = this.BMd();
    if (r) {
      InputController_1.InputController.RemoveInputLayer(r);
      r.Clear();
      return true;
    } else {
      KscLog_1.KscLog.Warn("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层移除异常");
      return false;
    }
  }
}
exports.TowerDefenseInputController = TowerDefenseInputController;
//# sourceMappingURL=TDInputController.js.map