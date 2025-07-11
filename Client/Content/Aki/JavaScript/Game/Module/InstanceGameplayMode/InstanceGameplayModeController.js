"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceGameplayModeController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class InstanceGameplayModeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  static OnChangeMode() {
    this.Tt1();
    return true;
  }
  static OnLeaveLevel() {
    this.Tt1();
    return true;
  }
  static Tt1() {
    if (ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode === 1) {
      this.bt1();
    }
    ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode = 0;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CreateEntity, this.Jpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static Lt1(e, t) {
    if ((ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode = e) !== 0 && e === 1) {
      this.Rt1(t);
    }
  }
  static Rt1(e) {
    ModelManager_1.ModelManager.CameraModel.CreateFreeCamera();
    ModelManager_1.ModelManager.CameraModel.FreeCamera.LogicComponent.InitConfig(e);
    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(5);
  }
  static bt1() {
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(5);
    ModelManager_1.ModelManager.CameraModel.DestroyFreeCamera();
  }
  static DisableAllPlayerRole() {
    var e;
    var t;
    var n = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (n) {
      for (const r of n) {
        if (r.Valid && r.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player && (e = r.Entity)) {
          t = r.CreatureDataId;
          e.DisableByKey(5, true);
          ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.add(t);
        }
      }
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CreateEntity, this.Jpe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, this.Jpe);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
}
exports.InstanceGameplayModeController = InstanceGameplayModeController;
(_a = InstanceGameplayModeController).nye = () => {
  var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.GameplayMode ?? 0;
  if (!(e <= 0)) {
    if (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGameplayModeConfig(e)) {
      if (e.DisableAllPlayerRole) {
        _a.DisableAllPlayerRole();
      }
      _a.Lt1(e.DefaultCameraMode, e.CameraParams);
    }
  }
};
InstanceGameplayModeController.Jpe = (e, t) => {
  var n;
  if (t.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player && (n = t.Entity)?.Valid) {
    n.DisableByKey(5, true);
    ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.add(t.CreatureDataId);
  }
};
InstanceGameplayModeController.zpe = (e, t) => {
  if (t.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player) {
    ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.delete(t.CreatureDataId);
  }
}; //# sourceMappingURL=InstanceGameplayModeController.js.map