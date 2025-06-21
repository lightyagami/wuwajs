"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventCameraLookAtPosition = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.LLe = Vector_1.Vector.Create(), this.dae = Vector_1.Vector.Create(), this.pLe = "CameraLookAtPosition Ban Input", this.Ctc = !0
  }
  ExecuteNew(o, e) {
    this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Start");
    const t = o;
    if (t) {
      var o = t.Pos.X ?? 0,
        a = t.Pos.Y ?? 0,
        i = t.Pos.Z ?? 0,
        r = t.PosEntityId,
        n = t.FadeInTime,
        s = t.StayTime,
        l = t.FadeOutTime,
        m = t.CameraPos?.X,
        L = t.CameraPos?.Y,
        _ = t.CameraPos?.Z,
        d = t.CameraPosEntityId,
        v = t.Fov;
      if (isNaN(o) || isNaN(a) || isNaN(i) || isNaN(n) || isNaN(s) || isNaN(l)) Log_1.Log.CheckError() && Log_1.Log.Error("Camera", 14, "关卡事件[LevelEventCameraLookAtPosition]参数非法", ["x", o], ["y", a], ["z", i], ["positionOverride", r], ["fadeInTime", n], ["stayTime", s], ["fadeOutTime", l], ["endPositionX", m], ["endPositionY", L], ["endPositionZ", _], ["endPositionOverride", d], ["fov", v]), this.FinishExecute(!1);
      else {
        r = t.PosEntityId ?? void 0;
        if (void 0 !== r) {
          if (!this.Gw1(r, this.LLe)) return Log_1.Log.CheckError() && Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overridePositionEntityId failed"), void this.FinishExecute(!1)
        } else this.LLe.Set(o, a, i);
        m = t.CameraPosEntityId ?? void 0;
        let e = void 0;
        if (void 0 !== m) {
          if (e = this.dae, !this.Gw1(m, e)) return Log_1.Log.CheckError() && Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overrideEndPositionEntityId failed"), void this.FinishExecute(!1)
        } else t.CameraPos ? (e = this.dae).Set(t.CameraPos.X, t.CameraPos.Y, t.CameraPos.Z) : e = void 0;
        if (t.BanInput && (this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition BanInput"), ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()), t.HideUi && (this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition HideUi"), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1)), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(this.LLe, n, s, l, t.LockCamera ?? !1, e, t.Fov, t.CancelBuffer ?? !1, t.IsLockCameraPos ?? !1), this.IsAsync) t.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !1, ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()), t.HideUi && ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1), this.FinishExecute(!0), this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut]);
        else {
          let e = n + s;
          t.CancelBlendOut || (e += l), TimerSystem_1.TimerSystem.Delay(() => {
            t.BanInput && (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !1, ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()), t.HideUi && ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1), this.FinishExecute(!0), this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync Finish", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut], ["endTime", e])
          }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND), this.Ctc && Log_1.Log.CheckInfo() && Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut], ["endTime", e])
        }
        Global_1.Global.BaseCharacter && ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("进入相机调整LookAtPosition", !0)
      }
    } else this.FinishExecute(!1)
  }
  ExecuteInGm(e, o) {
    this.FinishExecute(!0)
  }
  Gw1(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (t?.Valid) {
      var a = t.Entity.GetComponent(1);
      if (a?.Valid) return o.DeepCopy(a.ActorLocationProxy), !0;
      a = t.Entity.GetComponent(0);
      if (a?.Valid) return o.DeepCopy(a.GetLocation()), !0
    } else {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
      if (!t) return Log_1.Log.CheckError() && Log_1.Log.Error("Level", 57, "[CameraLookAt]覆盖实体不存在", ["pbDataId", e]), !1;
      a = t.Transform;
      if (a) return o.Set(a.Pos?.X ?? 0, a.Pos?.Y ?? 0, a.Pos?.Z ?? 0), !0
    }
    return Log_1.Log.CheckError() && Log_1.Log.Error("Level", 57, "[CameraLookAt]覆盖实体无法获取有效位置", ["pbDataId", e]), !1
  }
}
exports.LevelEventCameraLookAtPosition = LevelEventCameraLookAtPosition;
//# sourceMappingURL=LevelEventCameraLookAtPosition.js.map