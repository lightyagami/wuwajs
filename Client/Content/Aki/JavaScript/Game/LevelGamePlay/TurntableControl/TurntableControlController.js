"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableControlController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class TurntableControlController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.Eqn);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail, this.Eqn);
  }
  static Clear() {
    this.Owe();
    return super.Clear();
  }
  static kwe() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntity && !EventSystem_1.EventSystem.HasWithTarget(e.CurControllerEntity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Fwe)) {
      EventSystem_1.EventSystem.AddWithTarget(e.CurControllerEntity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Fwe);
    }
  }
  static Owe() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntity && EventSystem_1.EventSystem.HasWithTarget(e.CurControllerEntity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Fwe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.CurControllerEntity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Fwe);
    }
  }
  static async OpenTurntableControlView(e) {
    var t;
    return !!UiManager_1.UiManager.IsViewShow("TurntableControlView") || !((t = ModelManager_1.ModelManager.TurntableControlModel).CurControllerEntity && this.Owe(), t.SetCurControllerEntity(e), !t?.CurControllerEntityComp || !t.CurControllerEntity || (t.CurControllerEntityComp.IsAllRingsAtTarget() || t.CurControllerEntityComp.SetAllowRotate(true), this.kwe(), (await UiManager_1.UiManager.OpenViewAsync("TurntableControlView")) === undefined));
  }
  static HandleTurntableControlViewClose() {
    this.Owe();
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    var t = e.CurControllerEntityComp;
    if (t) {
      t.TriggerStopAllRingsRotate();
      t.DeselectAllRings(true);
      t.SetAllowRotate(false);
    }
    e.ClearCurControllerEntity();
  }
  static GetControllerEntity() {
    return ModelManager_1.ModelManager.TurntableControlModel.CurControllerEntity;
  }
  static StartRotateSelected() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntityComp) {
      e.CurControllerEntityComp.TriggerStartSelectedRingsRotate();
    }
  }
  static StopAllRotate() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntityComp && e.CurControllerEntityComp.GetControlType() === IComponent_1.EControllerType.FreeAngle) {
      e.CurControllerEntityComp.TriggerStopAllRingsRotate();
    }
  }
  static IsAllRingsAtTarget() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    return !!e?.CurControllerEntityComp && e.CurControllerEntityComp.IsAllRingsAtTarget();
  }
  static IsBusyRotating() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    return !!e?.CurControllerEntityComp && e.CurControllerEntityComp.IsBusyRotating();
  }
  static SwitchSelectedRing() {
    var t = ModelManager_1.ModelManager.TurntableControlModel;
    if (t?.CurControllerEntityComp) {
      var n;
      var r = t.CurControllerEntityComp.GetRingsNum();
      for (let e = 0; e < r; e++) {
        if (t.CurControllerEntityComp.IsRingSelectedByIndex(e)) {
          n = e + 1 >= r ? 0 : e + 1;
          this.SelectRingByIndex(n, true);
          return;
        }
      }
      this.SelectRingByIndex(0, true);
    }
  }
  static SelectRingByIndex(e, t) {
    var n = ModelManager_1.ModelManager.TurntableControlModel;
    if (n?.CurControllerEntityComp) {
      if (t) {
        n.CurControllerEntityComp.DeselectAllRings(false);
        n.CurControllerEntityComp.SelectRingByIndex(e, false);
        n.CurControllerEntityComp.UpdateAllRingsSelectedEffect();
      } else {
        n.CurControllerEntityComp.SelectRingByIndex(e, true);
      }
    }
  }
  static DeselectRingByIndex(e) {
    var t = ModelManager_1.ModelManager.TurntableControlModel;
    if (t?.CurControllerEntityComp) {
      t.CurControllerEntityComp.DeselectRingByIndex(e, true);
    }
  }
  static ResetRingsAngle() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntityComp) {
      e.CurControllerEntityComp.TriggerResetAllRingsToInitAngle();
    }
  }
  static GetControlType() {
    var e = ModelManager_1.ModelManager.TurntableControlModel;
    if (e?.CurControllerEntityComp) {
      return e.CurControllerEntityComp.GetControlType();
    }
  }
}
exports.TurntableControlController = TurntableControlController;
(_a = TurntableControlController).Eqn = () => {
  if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("SceneItem", 39, "[TurntableControlView] 激活UI相机Seq失败，关闭UI");
  }
  if (UiManager_1.UiManager.IsViewOpen("TurntableControlView")) {
    UiManager_1.UiManager.CloseView("TurntableControlView");
  }
};
TurntableControlController.Fwe = (e, t) => {
  if (e === 1298716444 && t) {
    _a.HandleTurntableControlViewClose();
    UiManager_1.UiManager.CloseView("TurntableControlView");
  }
}; //# sourceMappingURL=TurntableControlController.js.map