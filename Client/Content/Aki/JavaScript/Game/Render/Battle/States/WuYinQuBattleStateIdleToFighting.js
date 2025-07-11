"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const RenderModuleController_1 = require("../../Manager/RenderModuleController");
const WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig");
const WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines");
const WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateIdleToFighting extends WuYinQuBattleStateBase_1.default {
  constructor() {
    super(...arguments);
    this.j3 = -0;
    this.Jar = undefined;
    this.zar = ResourceSystem_1.ResourceSystem.InvalidId;
  }
  OnEnter(e) {
    const t = this.Owner.GetKuroLevelSequenceActor();
    var i;
    if (t && UE.KismetSystemLibrary.IsValid(t) && UE.KismetSystemLibrary.IsValid(t.SequencePlayer)) {
      this.Jar = t?.GetSequence();
      if (UE.KismetSystemLibrary.IsValid(this.Jar)) {
        t.SetSequence(this.Jar);
        this.Zar();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderBattle", 38, "进入Idle2Fighting的过度状态时没有Sequence资源，开始资源加载。", ["WuYinQuBattleActor", this.Owner?.GetName()]);
        }
        i = t.LevelSequence.AssetPathName.toString();
        this.zar = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, e => {
          this.zar = ResourceSystem_1.ResourceSystem.InvalidId;
          if (UE.KismetSystemLibrary.IsValid(e)) {
            this.Jar = e;
            t.SetSequence(this.Jar);
            this.Zar();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderBattle", 38, "进入Idle2Fighting的过度状态时没有Sequence资源，资源加载失败。", ["WuYinQuBattleActor", this.Owner?.GetName()]);
          }
        });
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderBattle", 38, "进入Idle2Fighting的过度状态时没有SequencePlayer", ["WuYinQuBattleActor", this.Owner?.GetName()]);
    }
  }
  Zar() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "进入Idle2Fighting的过度状态");
    }
    this.Owner.当前状态 = "静止状态到战斗阶段1";
    var e = this.Owner.WuYinQuFightingData;
    var t = this.Owner.D_K2_GetActorLocation();
    RenderModuleController_1.RenderModuleController.AddBattleReference(t);
    var i = this.Owner.GetKuroLevelSequenceActor();
    if (i && UE.KismetSystemLibrary.IsValid(i) && UE.KismetSystemLibrary.IsValid(i.GetSequence()) && UE.KismetSystemLibrary.IsValid(i.SequencePlayer)) {
      if (i.SequencePlayer.IsPlaying()) {
        i.SequencePlayer.Stop();
      }
      i.SequencePlayer.Play();
      i.SequencePlayer.JumpToMarkedFrame(WuYinQuBattleConfig_1.default.MarkFightingStart1);
    }
    if (e.IdleToFightingTransitionTime <= 0 || !UE.KismetSystemLibrary.IsValid(e.IdleToFightingCurve)) {
      this.StateMachine.Switch(1);
    } else {
      this.j3 = 0;
      if (i = this.Owner.WuYinQuFightingData.GlobalMPC) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeCenterAndIntensity, new UE.LinearColor(t.X, t.Y, t.Z, 1));
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeRadiusAndHardness, new UE.LinearColor(0, WuYinQuBattleConfig_1.default.LandscapeHardness, 0, 0));
      }
      if (i) {
        UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalBlackStoneErosion, 0);
      }
    }
  }
  OnUpdate(e) {
    var t;
    var i;
    var s;
    if (this.j3 > this.Owner.WuYinQuFightingData.IdleToFightingTransitionTime) {
      this.StateMachine.Switch(1);
    } else {
      this.j3 += e / 1000;
      e = MathUtils_1.MathUtils.Clamp(this.j3 / this.Owner.WuYinQuFightingData.IdleToFightingTransitionTime, 0, 1);
      t = MathUtils_1.MathUtils.Clamp(this.Owner.WuYinQuFightingData.IdleToFightingCurve.GetFloatValue(e), 0, 1);
      e = this.Owner.WuYinQuFightingData.LandscapeShowingRadiusCurve.GetFloatValue(e);
      if (i = this.Owner.WuYinQuFightingData.GlobalMPC) {
        s = this.Owner.D_K2_GetActorLocation();
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeCenterAndIntensity, new UE.LinearColor(s.X, s.Y, s.Z, 1));
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeRadiusAndHardness, new UE.LinearColor(e, WuYinQuBattleConfig_1.default.LandscapeHardness, 0, 0));
      }
      if (i) {
        UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), i, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalBlackStoneErosion, t);
      }
    }
  }
  OnExit(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "退出Idle2Fighting的过度状态");
    }
    this.Jar = undefined;
    if (this.zar !== ResourceSystem_1.ResourceSystem.InvalidId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zar), this.zar = ResourceSystem_1.ResourceSystem.InvalidId, Log_1.Log.CheckError())) {
      Log_1.Log.Error("RenderBattle", 38, "退出Idle2Fighting的过度状态时还在加载资源，取消资源加载");
    }
  }
}
exports.default = WuYinQuBattleStateIdleToFighting;
//# sourceMappingURL=WuYinQuBattleStateIdleToFighting.js.map