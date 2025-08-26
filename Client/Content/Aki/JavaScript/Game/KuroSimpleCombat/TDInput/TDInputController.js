"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInputController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const InputController_1 = require("../../Input/InputController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const TDInputModel_1 = require("./TDInputModel");
class TowerDefenseInputController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static OnStart() {
    this.BindInputActionFilters();
    return true;
  }
  static OnClear() {
    return true;
  }
  static OnStop() {
    this.RemoveInputLayer();
    this.UnBindInputActionFilters();
    return true;
  }
  static GetInputLayer() {
    var t = ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetPossessedPlayerEntity();
    if (t) {
      return InputController_1.InputController.GetInputLayer(t.Id, 5);
    }
  }
  static AddInputLayer() {
    var t;
    var r = this.GetInputLayer();
    if (r) {
      KscLog_1.KscLog.Info("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层已存在");
      this.RemoveInputLayer();
    }
    if (r = InputController_1.InputController.CreateInputLayer(5)) {
      if (t = ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.GetPossessedPlayerEntity()) {
        r.Init(t);
        InputController_1.InputController.AddInputLayer(t.Id, r);
        KscLog_1.KscLog.Info("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层加入成功");
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
    var t = this.GetInputLayer();
    if (t) {
      KscLog_1.KscLog.Info("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层移除");
      InputController_1.InputController.RemoveInputLayer(t);
      t.Clear();
      return true;
    } else {
      KscLog_1.KscLog.Warn("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层移除异常");
      return false;
    }
  }
  static BindInputActionFilters() {
    for (const t of ControllerHolder_1.ControllerHolder.InputController.Model.GetHandlers()) {
      const r = t.GetInputFilter();
      TDInputModel_1.TowerDefenseInputModel.ActionTypesInclusive.forEach(t => r.Actions.add(t));
    }
  }
  static UnBindInputActionFilters() {
    for (const t of ControllerHolder_1.ControllerHolder.InputController.Model.GetHandlers()) {
      const r = t.GetInputFilter();
      TDInputModel_1.TowerDefenseInputModel.ActionTypesInclusive.forEach(t => r.Actions.delete(t));
    }
  }
  static get Model() {
    return ModelManager_1.ModelManager.TowerDefenseInputModel;
  }
}
exports.TowerDefenseInputController = TowerDefenseInputController;
//# sourceMappingURL=TDInputController.js.map