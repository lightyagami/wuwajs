"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController");
const PostProcessTrigger_1 = require("../GI/PostProcessTrigger/PostProcessTrigger");
const RenderModuleController_1 = require("../Manager/RenderModuleController");
const WuYinQuBattleStateFighting1_1 = require("./States/WuYinQuBattleStateFighting1");
const WuYinQuBattleStateFighting2_1 = require("./States/WuYinQuBattleStateFighting2");
const WuYinQuBattleStateFighting3_1 = require("./States/WuYinQuBattleStateFighting3");
const WuYinQuBattleStateFightingToFighting_1 = require("./States/WuYinQuBattleStateFightingToFighting");
const WuYinQuBattleStateFightingToIdle_1 = require("./States/WuYinQuBattleStateFightingToIdle");
const WuYinQuBattleStateIdle_1 = require("./States/WuYinQuBattleStateIdle");
const WuYinQuBattleStateIdleToFighting_1 = require("./States/WuYinQuBattleStateIdleToFighting");
const WuYinQuBattleConfig_1 = require("./WuYinQuBattleConfig");
class WuYinQuBattleActor extends UE.KuroWuYinQuActorBase {
  constructor() {
    super(...arguments);
    this.当前状态 = "无";
    this.是否已经初始化 = "未初始化";
    this.ReferenceKuroLevelSequence = undefined;
    this.Root = undefined;
    this.IdleInnerBox1 = undefined;
    this.IdleInnerBox2 = undefined;
    this.IdleInnerPostProcess = undefined;
    this.IdleOuterBox1 = undefined;
    this.IdleOuterBox2 = undefined;
    this.IdleOuterPostProcess = undefined;
    this.FightingPhase1Box1 = undefined;
    this.FightingPhase1Box2 = undefined;
    this.FightingPhase1PostProcess = undefined;
    this.FightingPhase2Box1 = undefined;
    this.FightingPhase2Box2 = undefined;
    this.FightingPhase2PostProcess = undefined;
    this.FightingPhase3Box1 = undefined;
    this.FightingPhase3Box2 = undefined;
    this.FightingPhase3PostProcess = undefined;
    this.WuYinQuFightingData = undefined;
    this.CurrentBattleState = 4;
    this.LastBattleState = 4;
    this.IsInit = false;
    this.StateMachine = undefined;
    this.IdleInnerPostProcessTrigger = undefined;
    this.IdleOuterPostProcessTrigger = undefined;
    this.FightingPhase1PostProcessTrigger = undefined;
    this.FightingPhase2PostProcessTrigger = undefined;
    this.FightingPhase3PostProcessTrigger = undefined;
    this.StringKey = "";
  }
  Constructor() {
    this.CurrentBattleState = 4;
    this.LastBattleState = 4;
    this.IsInit = false;
    this.StateMachine = undefined;
    this.IdleInnerPostProcessTrigger = undefined;
    this.IdleOuterPostProcessTrigger = undefined;
    this.FightingPhase1PostProcessTrigger = undefined;
    this.FightingPhase2PostProcessTrigger = undefined;
    this.FightingPhase3PostProcessTrigger = undefined;
    this.StringKey = "";
  }
  手动初始化() {
    RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActor(this);
  }
  显示Debug线框() {
    RoleTriggerController_1.RoleTriggerController.DebugTestWorldDone();
    this.IdleOuterBox1.LineThickness = 20;
    this.IdleOuterBox1.ShapeColor = new UE.Color(0, 223, 83, 255);
    this.IdleOuterBox1.SetHiddenInGame(false);
    this.IdleOuterBox2.LineThickness = 10;
    this.IdleOuterBox2.ShapeColor = new UE.Color(0, 223, 83, 255);
    this.IdleOuterBox2.SetHiddenInGame(false);
    this.IdleInnerBox1.LineThickness = 20;
    this.IdleInnerBox1.ShapeColor = new UE.Color(0, 223, 83, 255);
    this.IdleInnerBox1.SetHiddenInGame(false);
    this.IdleInnerBox2.LineThickness = 10;
    this.IdleInnerBox2.ShapeColor = new UE.Color(0, 223, 83, 255);
    this.IdleInnerBox2.SetHiddenInGame(false);
  }
  切换到清空状态() {
    RenderModuleController_1.RenderModuleController.SetBattleState(this.GetKey(), 4);
  }
  切换到静止状态() {
    RenderModuleController_1.RenderModuleController.SetBattleState(this.GetKey(), 0);
  }
  切换到战斗阶段1() {
    RenderModuleController_1.RenderModuleController.SetBattleState(this.GetKey(), 1);
  }
  切换到战斗阶段2() {
    RenderModuleController_1.RenderModuleController.SetBattleState(this.GetKey(), 2);
  }
  切换到战斗阶段3() {
    RenderModuleController_1.RenderModuleController.SetBattleState(this.GetKey(), 3);
  }
  ChangeState(t, i = false) {
    if (this.IsInit) {
      if (this.CurrentBattleState !== t) {
        this.LastBattleState = this.CurrentBattleState;
        this.CurrentBattleState = t;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderBattle", 11, "BOSS战切换状态 from:", [" fromState:", this.LastBattleState], [" toState:", this.CurrentBattleState]);
        }
        if (t === 0) {
          if (i) {
            this.StateMachine.Switch(0);
          } else {
            this.StateMachine.Switch(6);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderBattle", 11, "切换Fighting to Idle:", ["Key:", this.Key], ["Instant:", i]);
          }
        } else if (t === 1) {
          if (i) {
            this.StateMachine.Switch(1);
          } else {
            this.StateMachine.Switch(4);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderBattle", 11, "切换Idle To Fighting1:", ["Key:", this.Key], ["Instant:", i]);
          }
        } else if (t === 2) {
          if (i) {
            this.StateMachine.Switch(2);
          } else {
            this.StateMachine.Switch(5);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderBattle", 11, "切换Fighting1 to Fighting2:", ["Key:", this.Key], ["Instant:", i]);
          }
        } else if (t === 3 && (i ? this.StateMachine.Switch(3) : this.StateMachine.Switch(5), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("RenderBattle", 11, "切换Fighting2 to Fighting3:", ["Key:", this.Key], ["Instant:", i]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderBattle", 11, "没有初始化WuYinQuBattle:", ["key:", this.Key]);
    }
  }
  ReceiveBeginPlay() {
    if (ModelManager_1.ModelManager.RenderModuleModel) {
      RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActor(this);
    } else {
      RenderModuleController_1.RenderModuleController.AddWuYinQuBattleActorWaiting(this);
    }
  }
  ReceiveEndPlay() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "Receive End Play Battle Actor:", ["Key:", this.Key]);
    }
    RenderModuleController_1.RenderModuleController.RemoveWuYinQuBattleActor(this);
    this.IsInit = false;
    this.是否已经初始化 = "无";
    this.CurrentBattleState = 0;
    this.LastBattleState = 0;
    if (this.IdleInnerPostProcessTrigger) {
      this.IdleInnerPostProcessTrigger.Dispose();
    }
    if (this.IdleOuterPostProcessTrigger) {
      this.IdleOuterPostProcessTrigger.Dispose();
    }
    if (this.FightingPhase1PostProcessTrigger) {
      this.FightingPhase1PostProcessTrigger.Dispose();
    }
    if (this.FightingPhase2PostProcessTrigger) {
      this.FightingPhase2PostProcessTrigger.Dispose();
    }
    if (this.FightingPhase3PostProcessTrigger) {
      this.FightingPhase3PostProcessTrigger.Dispose();
    }
  }
  GetKuroLevelSequenceActor() {
    if (UE.KismetSystemLibrary.IsValid(this.ReferenceKuroLevelSequence)) {
      return this.ReferenceKuroLevelSequence;
    }
  }
  GetCurrentBattleState() {
    return this.CurrentBattleState;
  }
  GetLastBattleState() {
    return this.LastBattleState;
  }
  IsInitialize() {
    return this.IsInit;
  }
  GetKey() {
    this.StringKey ||= this.Key.toString();
    return this.StringKey;
  }
  Tick(t) {
    if (this.IsInit && (this.StateMachine.Update(t), this.IdleInnerPostProcessTrigger && this.IdleInnerPostProcessTrigger.Tick(t), this.IdleOuterPostProcessTrigger && this.IdleOuterPostProcessTrigger.Tick(t), this.FightingPhase1PostProcessTrigger && this.FightingPhase1PostProcessTrigger.Tick(t), this.FightingPhase2PostProcessTrigger && this.FightingPhase2PostProcessTrigger.Tick(t), this.FightingPhase3PostProcessTrigger)) {
      this.FightingPhase3PostProcessTrigger.Tick(t);
    }
  }
  Init() {
    if (this.IsInit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderBattle", 11, "已经初始化过了 handleId:", ["Key:", this.Key]);
      }
      return false;
    } else if (UE.KismetSystemLibrary.IsValid(this.WuYinQuFightingData)) {
      this.CurrentBattleState = 0;
      this.LastBattleState = 0;
      this.StateMachine = new StateMachine_1.StateMachine(this);
      this.StateMachine.AddState(0, WuYinQuBattleStateIdle_1.default);
      this.StateMachine.AddState(1, WuYinQuBattleStateFighting1_1.default);
      this.StateMachine.AddState(2, WuYinQuBattleStateFighting2_1.default);
      this.StateMachine.AddState(3, WuYinQuBattleStateFighting3_1.default);
      this.StateMachine.AddState(4, WuYinQuBattleStateIdleToFighting_1.default);
      this.StateMachine.AddState(5, WuYinQuBattleStateFightingToFighting_1.default);
      this.StateMachine.AddState(6, WuYinQuBattleStateFightingToIdle_1.default);
      this.InitComponents();
      this.StateMachine.Start(0);
      this.IsInit = true;
      this.是否已经初始化 = "已经初始化";
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderBattle", 11, "初始化无音区状态成功:", ["Key:", this.GetKey()]);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderBattle", 11, "无音区战斗数据无效 handleId:", ["Key:", this.Key]);
      }
      return false;
    }
  }
  InitComponents() {
    var t;
    var i;
    this.IdleInnerPostProcess.BlendWeight = 0;
    this.IdleOuterPostProcess.BlendWeight = 0;
    this.FightingPhase1PostProcess.BlendWeight = 0;
    this.FightingPhase2PostProcess.BlendWeight = 0;
    this.FightingPhase3PostProcess.BlendWeight = 0;
    this.IdleInnerPostProcess.bUnbound = true;
    this.IdleOuterPostProcess.bUnbound = true;
    this.FightingPhase1PostProcess.bUnbound = true;
    this.FightingPhase2PostProcess.bUnbound = true;
    this.FightingPhase3PostProcess.bUnbound = true;
    if (this.WuYinQuFightingData?.WuYinQuIdleData?.IsValid() && (this.IdleInnerPostProcess.WeatherDataAsset = this.WuYinQuFightingData.WuYinQuIdleData.AtmosInnerData, this.IdleInnerPostProcess.WeatherDataAsset?.IsValid() && (t = this.WuYinQuFightingData.TriggerInnerSize, i = new UE.VectorDouble(t + WuYinQuBattleConfig_1.default.TriggerThreshold.X, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z), this.IdleInnerBox1.D_SetRelativeScale3D(new UE.VectorDouble(t, t, t)), this.IdleInnerBox2.D_SetRelativeScale3D(i), this.IdleInnerPostProcessTrigger = new PostProcessTrigger_1.default(), this.IdleInnerPostProcessTrigger.Init(this.IdleInnerBox1, this.IdleInnerBox2, this.IdleInnerPostProcess, WuYinQuBattleConfig_1.default.TriggerTransitionTime, 0, this.GetKey())), this.IdleOuterPostProcess.WeatherDataAsset = this.WuYinQuFightingData.WuYinQuIdleData.AtmosOuterData, this.IdleOuterPostProcess.WeatherDataAsset?.IsValid())) {
      t = this.WuYinQuFightingData.TriggerOuterSize;
      i = new UE.VectorDouble(t + WuYinQuBattleConfig_1.default.TriggerThreshold.X, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z);
      this.IdleOuterBox1.D_SetRelativeScale3D(new UE.VectorDouble(t, t, t));
      this.IdleOuterBox2.D_SetRelativeScale3D(i);
      this.IdleOuterPostProcessTrigger = new PostProcessTrigger_1.default();
      this.IdleOuterPostProcessTrigger.Init(this.IdleOuterBox1, this.IdleOuterBox2, this.IdleOuterPostProcess, WuYinQuBattleConfig_1.default.TriggerTransitionTime, 0, this.GetKey());
    }
    if (this.WuYinQuFightingData?.WuYinQuFightingData1?.IsValid() && (this.FightingPhase1PostProcess.WeatherDataAsset = this.WuYinQuFightingData.WuYinQuFightingData1.AtmosFightingData, this.FightingPhase1PostProcess.WeatherDataAsset?.IsValid())) {
      t = this.WuYinQuFightingData.TriggerOuterSize;
      i = new UE.VectorDouble(t + WuYinQuBattleConfig_1.default.TriggerThreshold.X, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z);
      this.FightingPhase1Box1.D_SetRelativeScale3D(new UE.VectorDouble(t, t, t));
      this.FightingPhase1Box2.D_SetRelativeScale3D(i);
      this.FightingPhase1PostProcessTrigger = new PostProcessTrigger_1.default();
      this.FightingPhase1PostProcessTrigger.Init(this.FightingPhase1Box1, this.FightingPhase1Box2, this.FightingPhase1PostProcess, WuYinQuBattleConfig_1.default.TriggerTransitionTime, 1, this.GetKey());
    }
    if (this.WuYinQuFightingData?.WuYinQuFightingData2?.IsValid() && (this.FightingPhase2PostProcess.WeatherDataAsset = this.WuYinQuFightingData.WuYinQuFightingData2.AtmosFightingData, this.FightingPhase2PostProcess.WeatherDataAsset?.IsValid())) {
      t = this.WuYinQuFightingData.TriggerOuterSize;
      i = new UE.VectorDouble(t + WuYinQuBattleConfig_1.default.TriggerThreshold.X, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z);
      this.FightingPhase2Box1.D_SetRelativeScale3D(new UE.VectorDouble(t, t, t));
      this.FightingPhase2Box2.D_SetRelativeScale3D(i);
      this.FightingPhase2PostProcessTrigger = new PostProcessTrigger_1.default();
      this.FightingPhase2PostProcessTrigger.Init(this.FightingPhase2Box1, this.FightingPhase2Box2, this.FightingPhase2PostProcess, WuYinQuBattleConfig_1.default.TriggerTransitionTime, 2, this.GetKey());
    }
    if (this.WuYinQuFightingData?.WuYinQuFightingData3?.IsValid() && (this.FightingPhase3PostProcess.WeatherDataAsset = this.WuYinQuFightingData.WuYinQuFightingData3.AtmosFightingData, this.FightingPhase3PostProcess.WeatherDataAsset?.IsValid())) {
      t = this.WuYinQuFightingData.TriggerOuterSize;
      i = new UE.VectorDouble(t + WuYinQuBattleConfig_1.default.TriggerThreshold.X, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Y, t + WuYinQuBattleConfig_1.default.TriggerThreshold.Z);
      this.FightingPhase3Box1.D_SetRelativeScale3D(new UE.VectorDouble(t, t, t));
      this.FightingPhase3Box2.D_SetRelativeScale3D(i);
      this.FightingPhase3PostProcessTrigger = new PostProcessTrigger_1.default();
      this.FightingPhase3PostProcessTrigger.Init(this.FightingPhase3Box1, this.FightingPhase3Box2, this.FightingPhase3PostProcess, WuYinQuBattleConfig_1.default.TriggerTransitionTime, 3, this.GetKey());
    }
  }
}
exports.default = WuYinQuBattleActor;
//# sourceMappingURL=WuYinQuBattleActor.js.map