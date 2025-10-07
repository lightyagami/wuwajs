"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCameraLookAtPosition = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.LLe = Vector_1.Vector.Create();
    this.dae = Vector_1.Vector.Create();
    this.pLe = "CameraLookAtPosition Ban Input";
    this.Ctc = true;
  }
  ExecuteNew(o, e) {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Start");
    }
    const t = o;
    if (t) {
      var o = t.Pos.X ?? 0;
      var a = t.Pos.Y ?? 0;
      var i = t.Pos.Z ?? 0;
      var r = t.PosEntityId;
      var n = t.FadeInTime;
      var s = t.StayTime;
      var l = t.FadeOutTime;
      var m = t.CameraPos?.X;
      var L = t.CameraPos?.Y;
      var _ = t.CameraPos?.Z;
      var d = t.CameraPosEntityId;
      var v = t.Fov;
      if (isNaN(o) || isNaN(a) || isNaN(i) || isNaN(n) || isNaN(s) || isNaN(l)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 14, "关卡事件[LevelEventCameraLookAtPosition]参数非法", ["x", o], ["y", a], ["z", i], ["positionOverride", r], ["fadeInTime", n], ["stayTime", s], ["fadeOutTime", l], ["endPositionX", m], ["endPositionY", L], ["endPositionZ", _], ["endPositionOverride", d], ["fov", v]);
        }
        this.FinishExecute(false);
      } else {
        r = t.PosEntityId ?? undefined;
        if (r !== undefined) {
          if (!this.dA1(r, this.LLe)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overridePositionEntityId failed");
            }
            this.FinishExecute(false);
            return;
          }
        } else {
          this.LLe.Set(o, a, i);
        }
        m = t.CameraPosEntityId ?? undefined;
        let e = undefined;
        if (m !== undefined) {
          e = this.dae;
          if (!this.dA1(m, e)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overrideEndPositionEntityId failed");
            }
            this.FinishExecute(false);
            return;
          }
        } else if (t.CameraPos) {
          (e = this.dae).Set(t.CameraPos.X, t.CameraPos.Y, t.CameraPos.Z);
        } else {
          e = undefined;
        }
        if (t.BanInput) {
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition BanInput");
          }
          ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe);
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
        }
        if (t.HideUi) {
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition HideUi");
          }
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1);
        }
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue();
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(this.LLe, n, s, l, t.LockCamera ?? false, e, t.Fov, t.CancelBuffer ?? false, t.IsLockCameraPos ?? false, t.ArmLength ?? 0, t.DisableCameraOffSet ?? false);
        if (this.IsAsync) {
          if (t.BanInput) {
            ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
          }
          if (t.HideUi) {
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
          }
          this.FinishExecute(true);
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut]);
          }
        } else {
          let e = n + s;
          if (!t.CancelBlendOut) {
            e += l;
          }
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            if (t.BanInput) {
              ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
              ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
            }
            if (t.HideUi) {
              ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
            }
            this.FinishExecute(true);
            if (this.Ctc && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync Finish", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut], ["endTime", e]);
            }
          }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync", ["params.BanInput", t.BanInput], ["params.HideUi", t.HideUi], ["params.CancelBlendOut", t.CancelBlendOut], ["endTime", e]);
          }
        }
        if (Global_1.Global.BaseCharacter) {
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("进入相机调整LookAtPosition", true);
        }
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteInGm(e, o) {
    this.FinishExecute(true);
  }
  dA1(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (t?.Valid) {
      var a = t.Entity.GetComponent(1);
      if (a?.Valid) {
        o.DeepCopy(a.ActorLocationProxy);
        return true;
      }
      a = t.Entity.GetComponent(0);
      if (a?.Valid) {
        o.DeepCopy(a.GetLocation());
        return true;
      }
    } else {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 57, "[CameraLookAt]覆盖实体不存在", ["pbDataId", e]);
        }
        return false;
      }
      a = t.Transform;
      if (a) {
        o.Set(a.Pos?.X ?? 0, a.Pos?.Y ?? 0, a.Pos?.Z ?? 0);
        return true;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 57, "[CameraLookAt]覆盖实体无法获取有效位置", ["pbDataId", e]);
    }
    return false;
  }
}
exports.LevelEventCameraLookAtPosition = LevelEventCameraLookAtPosition;
//# sourceMappingURL=LevelEventCameraLookAtPosition.js.map