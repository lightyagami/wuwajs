"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowCameraLookAtPosition = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowCameraLookAtPosition extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.jwu = undefined;
    this.LLe = Vector_1.Vector.Create();
    this.dae = Vector_1.Vector.Create();
    this.pLe = "CameraLookAtPosition Ban Input";
    this.CXd = false;
    this.Ctc = true;
  }
  Init(e, o) {
    this.jwu = e;
    this.CXd = o;
    return this;
  }
  OnExecute() {
    if (this.jwu === undefined) {
      this.FinishExecute(false);
    } else {
      const _ = this.jwu;
      var o = _.Pos.X ?? 0;
      var t = _.Pos.Y ?? 0;
      var i = _.Pos.Z ?? 0;
      var r = _.PosEntityId;
      var a = _.FadeInTime;
      var n = _.StayTime;
      var s = _.FadeOutTime;
      var l = _.CameraPos?.X;
      var e = _.CameraPos?.Y;
      var m = _.CameraPos?.Z;
      var L = _.CameraPosEntityId;
      var d = _.Fov;
      if (isNaN(o) || isNaN(t) || isNaN(i) || isNaN(a) || isNaN(n) || isNaN(s)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 14, "关卡事件[LevelEventCameraLookAtPosition]参数非法", ["x", o], ["y", t], ["z", i], ["positionOverride", r], ["fadeInTime", a], ["stayTime", n], ["fadeOutTime", s], ["endPositionX", l], ["endPositionY", e], ["endPositionZ", m], ["endPositionOverride", L], ["fov", d]);
        }
        this.FinishExecute(false);
      } else {
        r = _.PosEntityId ?? undefined;
        if (r !== undefined) {
          if (!this.dA1(r, this.LLe)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overridePositionEntityId failed");
            }
            this.FinishExecute(false);
            return;
          }
        } else {
          this.LLe.Set(o, t, i);
        }
        l = _.CameraPosEntityId ?? undefined;
        let e = undefined;
        if (l !== undefined) {
          e = this.dae;
          if (!this.dA1(l, e)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition overrideEndPositionEntityId failed");
            }
            this.FinishExecute(false);
            return;
          }
        } else if (_.CameraPos) {
          (e = this.dae).Set(_.CameraPos.X, _.CameraPos.Y, _.CameraPos.Z);
        } else {
          e = undefined;
        }
        if (_.BanInput) {
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition BanInput");
          }
          ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe);
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
        }
        if (_.HideUi) {
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition HideUi");
          }
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1);
        }
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue();
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(this.LLe, a, n, s, _.LockCamera ?? false, e, _.Fov, _.CancelBuffer ?? false, _.IsLockCameraPos ?? false, _.ArmLength ?? 0);
        if (this.CXd) {
          if (_.BanInput) {
            ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
          }
          if (_.HideUi) {
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
          }
          this.FinishExecute(true);
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop", ["params.BanInput", _.BanInput], ["params.HideUi", _.HideUi], ["params.CancelBlendOut", _.CancelBlendOut]);
          }
        } else {
          let e = a + n;
          if (!_.CancelBlendOut) {
            e += s;
          }
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            if (_.BanInput) {
              ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = false;
              ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
            }
            if (_.HideUi) {
              ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
            }
            this.FinishExecute(true);
            if (this.Ctc && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync Finish", ["params.BanInput", _.BanInput], ["params.HideUi", _.HideUi], ["params.CancelBlendOut", _.CancelBlendOut], ["endTime", e]);
            }
          }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync", ["params.BanInput", _.BanInput], ["params.HideUi", _.HideUi], ["params.CancelBlendOut", _.CancelBlendOut], ["endTime", e]);
          }
        }
        if (Global_1.Global.BaseCharacter) {
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(65)?.InterruptAutoMoving("进入相机调整LookAtPosition", true);
        }
      }
    }
  }
  dA1(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (t?.Valid) {
      var i = t.Entity.GetComponent(1);
      if (i?.Valid) {
        o.DeepCopy(i.ActorLocationProxy);
        return true;
      }
      i = t.Entity.GetComponent(0);
      if (i?.Valid) {
        o.DeepCopy(i.GetLocation());
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
      i = t.Transform;
      if (i) {
        o.Set(i.Pos?.X ?? 0, i.Pos?.Y ?? 0, i.Pos?.Z ?? 0);
        return true;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 57, "[CameraLookAt]覆盖实体无法获取有效位置", ["pbDataId", e]);
    }
    return false;
  }
}
exports.LevelFlowCameraLookAtPosition = LevelFlowCameraLookAtPosition;
//# sourceMappingURL=LevelFlowCameraLookAtPosition.js.map