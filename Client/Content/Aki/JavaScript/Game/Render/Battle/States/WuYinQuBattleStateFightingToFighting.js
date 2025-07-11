"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig");
const WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines");
const WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateFightingToFighting extends WuYinQuBattleStateBase_1.default {
  constructor() {
    super(...arguments);
    this.Timer = 0;
    this.LastUseFlowmapSky = false;
    this.CurrentUseFlowmapSky = false;
    this.Jar = undefined;
    this.zar = ResourceSystem_1.ResourceSystem.InvalidId;
  }
  OnEnter(e) {
    const t = this.Owner.GetKuroLevelSequenceActor();
    if (t && UE.KismetSystemLibrary.IsValid(t) && UE.KismetSystemLibrary.IsValid(t.SequencePlayer)) {
      this.Jar = t?.GetSequence();
      if (UE.KismetSystemLibrary.IsValid(this.Jar)) {
        t.SetSequence(this.Jar);
        this.Zar();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderBattle", 38, "进入战斗过渡状态时没有Sequence资源，开始资源加载。");
        }
        this.zar = ResourceSystem_1.ResourceSystem.LoadAsync(t.LevelSequence.AssetPathName.toString(), UE.LevelSequence, e => {
          this.zar = ResourceSystem_1.ResourceSystem.InvalidId;
          if (UE.KismetSystemLibrary.IsValid(e)) {
            this.Jar = e;
            t.SetSequence(this.Jar);
            this.Zar();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderBattle", 38, "进入战斗过渡状态时没有Sequence资源，资源加载失败。", ["WuYinQuBattleActor", this.Owner?.GetName()]);
          }
        });
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderBattle", 38, "进入战斗过渡状态时没有SequencePlayer", ["WuYinQuBattleActor", this.Owner?.GetName()]);
    }
  }
  Zar() {
    this.Timer = 0;
    var e = this.Owner.GetLastBattleState();
    var t = this.Owner.GetCurrentBattleState();
    let i = "未知状态";
    if (e === 1) {
      i = "战斗阶段1";
    } else if (e === 2) {
      i = "战斗阶段2";
    } else if (e === 3) {
      i = "战斗阶段3";
    }
    e = this.Owner.GetKuroLevelSequenceActor();
    let s = "未知状态";
    if (t === 1) {
      s = "战斗阶段1";
      if (e && UE.KismetSystemLibrary.IsValid(e) && UE.KismetSystemLibrary.IsValid(e.GetSequence()) && UE.KismetSystemLibrary.IsValid(e.SequencePlayer)) {
        e.SequencePlayer.JumpToMarkedFrame(WuYinQuBattleConfig_1.default.MarkFightingStart1);
        e.SequencePlayer.Play();
      }
    } else if (t === 2) {
      s = "战斗阶段2";
      if (e && UE.KismetSystemLibrary.IsValid(e) && UE.KismetSystemLibrary.IsValid(e.GetSequence()) && UE.KismetSystemLibrary.IsValid(e.SequencePlayer)) {
        e.SequencePlayer.JumpToMarkedFrame(WuYinQuBattleConfig_1.default.MarkFightingStart2);
        e.SequencePlayer.Play();
      }
    } else if (t === 3 && (s = "战斗阶段3", e) && UE.KismetSystemLibrary.IsValid(e) && UE.KismetSystemLibrary.IsValid(e.GetSequence()) && UE.KismetSystemLibrary.IsValid(e.SequencePlayer)) {
      e.SequencePlayer.JumpToMarkedFrame(WuYinQuBattleConfig_1.default.MarkFightingStart3);
      e.SequencePlayer.Play();
    }
    var u;
    var t = this.Owner.WuYinQuFightingData.GlobalMPC;
    var e = this.Owner.WuYinQuFightingData;
    if (t) {
      u = this.Owner.D_K2_GetActorLocation();
      UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), t, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeCenterAndIntensity, new UE.LinearColor(u.X, u.Y, u.Z, 1));
      UE.KismetMaterialLibrary.SetVectorParameterValue(this.Owner.GetWorld(), t, WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines.GlobalLandscapeRadiusAndHardness, new UE.LinearColor(e.LandscapeShowingRadiusCurve.GetFloatValue(1), WuYinQuBattleConfig_1.default.LandscapeHardness, 0, 0));
    }
    this.Owner.当前状态 = "从:" + i + "到:" + s;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "进入战斗过度阶段");
    }
  }
  OnUpdate(e) {
    var t = this.Owner.GetCurrentBattleState();
    if (this.Timer > this.Owner.WuYinQuFightingData.FightingTransitionTime) {
      if (t === 2) {
        this.StateMachine.Switch(2);
        return;
      }
      if (t === 3) {
        this.StateMachine.Switch(3);
        return;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderBattle", 11, "战斗过度状态错误!!!!");
      }
    }
    this.Timer += e / 1000;
  }
  OnExit(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "退出战斗过度阶段");
    }
    this.Jar = undefined;
    if (this.zar !== ResourceSystem_1.ResourceSystem.InvalidId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zar), this.zar = ResourceSystem_1.ResourceSystem.InvalidId, Log_1.Log.CheckError())) {
      Log_1.Log.Error("RenderBattle", 38, "退出战斗过渡状态时还在加载资源，取消资源加载");
    }
  }
}
exports.default = WuYinQuBattleStateFightingToFighting;
//# sourceMappingURL=WuYinQuBattleStateFightingToFighting.js.map