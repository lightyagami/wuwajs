"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStatePalsy = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterHitComponent_1 = require("../../../NewWorld/Character/Common/Component/CharacterHitComponent");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStatePalsy extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.wne = "";
    this.Bne = "";
  }
  OnActivate() {
    var e;
    var t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "TestOnActivate");
    }
    if (this.Bne) {
      if (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(this.Bne, UE.CounterAttackCameraData_C)) {
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(t.CameraData.Tag, t.CameraData.持续时间, t.CameraData.淡入时间, t.CameraData.淡出时间, t.CameraData.摄像机配置, undefined, t.CameraData.打断淡出时间, undefined, undefined, undefined, t.CameraData.CameraAttachSocket);
        this.Node?.TimeScaleComponent?.SetTimeScale(t.VictimTimeScale.优先级, t.VictimTimeScale.时间膨胀值, t.VictimTimeScale.时间膨胀变化曲线, t.VictimTimeScale.时间膨胀时长, 4);
        if (e = this.Node.AiController.AiHateList.GetCurrentTarget()) {
          e.Entity.GetComponent(122).SetTimeScale(t.AttackerTimeScale.优先级, t.AttackerTimeScale.时间膨胀值, t.AttackerTimeScale.时间膨胀变化曲线, t.AttackerTimeScale.时间膨胀时长, 4);
        }
        if (!!t.CameraShake && !ControllerHolder_1.ControllerHolder.CameraController.Model.IsModeEnabled(2) && !ControllerHolder_1.ControllerHolder.CameraController.Model.IsModeEnabled(1)) {
          e = ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation();
          ControllerHolder_1.ControllerHolder.CameraController.PlayWorldCameraShake(t.CameraShake, e, 0, CharacterHitComponent_1.OUTER_RADIUS, 1, false);
        }
      } else {
        t = this.Node.Entity.GetComponent(0);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 14, "AiStateMachineStatePalsy Camera 资源加载资产为空", ["actorName", this.Node.ActorComponent?.Actor.GetName()], ["pbDataId", t.GetPbDataId()], ["path", this.Bne]);
        }
      }
    }
    if (this.wne) {
      if (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(this.wne, UE.CounterAttackEffectData_C)) {
        if (t = this.Node?.HitComponent?.LastHitData) {
          this.Node?.HitComponent?.PlayCounterAttackEffect(t, e.EffectDA.AssetPathName?.toString(), new UE.VectorDouble(e.Scale));
        }
      } else {
        t = this.Node.Entity.GetComponent(0);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 14, "AiStateMachineStatePalsy Effect 资源加载资产为空", ["actorName", this.Node.ActorComponent?.Actor.GetName()], ["pbDataId", t.GetPbDataId()], ["path", this.wne]);
        }
      }
    }
  }
  OnDeactivate() {}
  OnInit(e) {
    this.wne = e.BindPalsy.CounterAttackEffect;
    this.Bne = e.BindPalsy.CounterAttackCamera;
    return true;
  }
  ToString(e, t = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(e, t);
  }
}
exports.AiStateMachineStatePalsy = AiStateMachineStatePalsy;
//# sourceMappingURL=AiStateMachineStatePalsy.js.map