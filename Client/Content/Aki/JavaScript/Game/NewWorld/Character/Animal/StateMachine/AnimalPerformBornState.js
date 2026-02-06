"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformBornState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
const DEFAULT_BLEND_OUT_TIME = 0.5;
class AnimalBornMontageInfo {
  constructor() {
    this.Start = undefined;
    this.Loop = undefined;
    this.Branch = undefined;
    this.End = undefined;
    this.BranchList = new Array();
    this.StartPath = "";
    this.LoopPath = "";
    this.EndPath = "";
    this.BranchPath = "";
    this.BranchLoadedCount = 0;
    this.BranchPathList = new Array();
    this.StartReady = false;
    this.LoopReady = false;
    this.BranchReady = false;
    this.EndReady = false;
  }
  Init(t) {
    this.StartPath = this.IsPathValid(t.MontageStart) ? t.MontageStart : "";
    this.LoopPath = this.IsPathValid(t.MontageLoop) ? t.MontageLoop : "";
    this.EndPath = this.IsPathValid(t.MontageEnd) ? t.MontageEnd : "";
    if (this.IsPathValid(t.MontageBranch1)) {
      this.BranchPathList.push(t.MontageBranch1);
    }
    if (this.IsPathValid(t.MontageBranch2)) {
      this.BranchPathList.push(t.MontageBranch2);
    }
    if (this.IsPathValid(t.MontageBranch3)) {
      this.BranchPathList.push(t.MontageBranch3);
    }
    if (this.IsPathValid(t.MontageBranch4)) {
      this.BranchPathList.push(t.MontageBranch4);
    }
  }
  IsPathValid(t) {
    return !!t && t !== "" && t !== "None";
  }
  IsAssetReady() {
    return this.StartReady && this.LoopReady && this.BranchReady && this.EndReady;
  }
  IsConfigValid() {
    var t = !!this.StartPath && this.StartPath !== "" && this.StartPath !== "None";
    var i = !!this.LoopPath && this.LoopPath !== "" && this.LoopPath !== "None";
    return t || i;
  }
  GetStartMontage() {
    if (this.Start?.IsValid()) {
      return this.Start;
    } else {
      return this.Loop;
    }
  }
}
class AnimalPerformBornState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  constructor() {
    super(...arguments);
    this.PerformComp = undefined;
    this.TagComp = undefined;
    this.AnimComp = undefined;
    this.CreatureData = undefined;
    this.BornMontageInfo = undefined;
    this.BornMontagePhase = 0;
    this.TimerHandle = undefined;
    this.BornEndMontageCallback = undefined;
    this.OnStartSectionFinished = (t, i) => {
      if (this.BornMontageInfo && this.BornMontageInfo.Start === t && this.PerformComp?.Valid) {
        this.AnimComp?.MainAnimInstance?.OnMontageEnded.Remove(this.OnStartSectionFinished);
        if (this.BornMontagePhase === 1 && !(this.TimerHandle && TimerSystem_1.TimerSystem.Remove(this.TimerHandle), this.TimerHandle = undefined, this.TryPlayBornMontageLoop())) {
          this.FinishBornPerformance();
        }
      }
    };
    this.OnLoopSectionFinished = (t, i) => {
      if (this.BornMontageInfo && this.BornMontageInfo.Loop === t && this.PerformComp?.Valid) {
        this.AnimComp?.MainAnimInstance?.OnMontageEnded.Remove(this.OnLoopSectionFinished);
        if (this.BornMontagePhase === 2 && !(this.TimerHandle && TimerSystem_1.TimerSystem.Remove(this.TimerHandle), this.TimerHandle = undefined, this.TryPlayBornMontageBranch())) {
          this.FinishBornPerformance();
        }
      }
    };
    this.OnBranchSectionFinished = (t, i) => {
      if (this.BornMontageInfo && this.BornMontageInfo.Branch === t && this.PerformComp?.Valid) {
        this.AnimComp?.MainAnimInstance?.OnMontageEnded.Remove(this.OnBranchSectionFinished);
        if (this.BornMontagePhase === 3 && !(this.TimerHandle && TimerSystem_1.TimerSystem.Remove(this.TimerHandle), this.TimerHandle = undefined, this.TryPlayBornMontageLoop())) {
          this.FinishBornPerformance();
        }
      }
    };
    this.OnEndSectionFinished = (t, i) => {
      if (this.BornMontageInfo && this.BornMontageInfo.End === t && (this.BornEndMontageCallback?.(), this.PerformComp?.Valid) && (this.AnimComp?.MainAnimInstance?.OnMontageEnded.Remove(this.OnEndSectionFinished), this.BornMontagePhase === 4)) {
        if (this.TimerHandle) {
          TimerSystem_1.TimerSystem.Remove(this.TimerHandle);
        }
        this.TimerHandle = undefined;
        this.FinishBornPerformance();
      }
    };
  }
  OnStart() {
    this.PerformComp = this.Owner?.GetComponent(49);
    this.TagComp = this.Owner?.GetComponent(217);
    this.AnimComp = this.Owner?.GetComponent(188);
    this.CreatureData = this.Owner?.GetComponent(0);
    if (this.PerformComp && this.TagComp) {
      this.TagComp.AddTag(1713932038);
      this.InitBornMontageInfo();
      if (!this.BornMontageInfo) {
        this.FinishBornPerformance();
      }
    }
  }
  OnExit(t) {
    this.TagComp.AddTag(1900394806);
    this.TagComp.RemoveTag(1713932038);
    this.AbortBornMontage();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Animal", 50, "[AnimBornState] 停止播放出生表现", ["PbDataId", this.CreatureData?.GetPbDataId()], ["NextState", t]);
    }
  }
  InitBornMontageInfo() {
    if (this.TagComp?.HasTag(-252159923)) {
      var t = this.CreatureData?.GetModelConfig()?.蓝图.ToAssetPathName();
      if (t && !(t.length < 2)) {
        t = t.slice(0, -2);
        t = ConfigManager_1.ConfigManager.AnimalStandbyMontageConfig.GetAnimalStandbyMontageData(t);
        if (t && t.length) {
          for (const s of t) {
            var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.Tag);
            if (this.TagComp?.HasTag(i)) {
              i = new AnimalBornMontageInfo();
              i.Init(s);
              if (i.IsConfigValid()) {
                this.BornMontageInfo = i;
              }
              break;
            }
          }
          if (this.BornMontageInfo) {
            this.TryLoadBornMontageAsset(this.BornMontageInfo.StartPath, 1);
            this.TryLoadBornMontageAsset(this.BornMontageInfo.LoopPath, 2);
            this.TryLoadBornMontageAsset(this.BornMontageInfo.EndPath, 4);
            this.TryLoadBornBranchMontageAssets(this.BornMontageInfo.BranchPathList);
          }
        }
      }
    }
  }
  TryLoadBornMontageAsset(t, s) {
    if (t && t !== "" && t !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t, i) => {
        this.MarkAssetLoadedComplete(t, s);
        this.WaitAssetLoadedComplete();
      });
    } else {
      this.MarkAssetLoadedComplete(undefined, s);
      this.WaitAssetLoadedComplete();
    }
  }
  TryLoadBornBranchMontageAssets(s) {
    if (s.length) {
      for (const t of s) {
        if (t === "" || t === "None") {
          this.BornMontageInfo.BranchLoadedCount++;
          if (this.BornMontageInfo.BranchLoadedCount === s.length) {
            this.MarkAssetLoadedComplete(undefined, 3);
            this.WaitAssetLoadedComplete();
          }
        } else {
          ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t, i) => {
            if (this.BornMontageInfo && (this.BornMontageInfo.BranchLoadedCount++, t?.IsValid() && this.BornMontageInfo.BranchList.push(t), this.BornMontageInfo.BranchLoadedCount === s.length)) {
              this.MarkAssetLoadedComplete(t, 3);
              this.WaitAssetLoadedComplete();
            }
          });
        }
      }
    }
  }
  MarkAssetLoadedComplete(t, i) {
    switch (i) {
      case 1:
        this.BornMontageInfo.Start = t;
        this.BornMontageInfo.StartReady = true;
        break;
      case 2:
        this.BornMontageInfo.Loop = t;
        this.BornMontageInfo.LoopReady = true;
        break;
      case 3:
        this.BornMontageInfo.BranchReady = true;
        break;
      case 4:
        this.BornMontageInfo.End = t;
        this.BornMontageInfo.EndReady = true;
    }
  }
  WaitAssetLoadedComplete() {
    if (!!this.BornMontageInfo?.IsAssetReady() && !this.TryPlayBornMontageStart() && !this.TryPlayBornMontageLoop()) {
      this.FinishBornPerformance();
    }
  }
  TryPlayBornMontageStart() {
    return this.BornMontagePhase !== 5 && this.BornMontagePhase !== 4 && !!this.BornMontageInfo?.Start?.IsValid() && (this.BornMontagePhase = 1, this.PlayBornMontage(this.BornMontageInfo.Start, 0, this.OnStartSectionFinished), true);
  }
  TryPlayBornMontageLoop() {
    var t;
    var i;
    return this.BornMontagePhase !== 5 && this.BornMontagePhase !== 4 && !!this.BornMontageInfo?.Loop?.IsValid() && (this.BornMontagePhase = 2, this.BornMontageInfo?.BranchList.length ? (t = this.BornMontageInfo.Loop.SequenceLength, i = Math.min(1, Math.floor(15 / t)), this.PlayBornMontage(this.BornMontageInfo.Loop, i * t, this.OnLoopSectionFinished)) : this.PlayBornMontage(this.BornMontageInfo.Loop, -1, this.OnLoopSectionFinished), true);
  }
  TryPlayBornMontageBranch() {
    var t;
    return this.BornMontagePhase !== 5 && this.BornMontagePhase !== 4 && !!this.BornMontageInfo?.BranchList.length && (t = this.BornMontageInfo.BranchList.length, t = Math.floor(MathUtils_1.MathUtils.GetRandomRange(0, t)), this.BornMontageInfo.Branch = this.BornMontageInfo.BranchList[t], !!this.BornMontageInfo?.Branch?.IsValid()) && (this.BornMontagePhase = 3, this.PlayBornMontage(this.BornMontageInfo.Branch, 0, this.OnBranchSectionFinished), true);
  }
  TryPlayBornMontageEnd(t) {
    return this.BornMontagePhase !== 5 && this.BornMontagePhase !== 4 && (this.BornEndMontageCallback = t, this.BornMontageInfo?.End?.IsValid() ? (this.BornMontagePhase = 4, this.PlayBornMontage(this.BornMontageInfo.End, 0, this.OnEndSectionFinished), true) : (this.OnEndSectionFinished(this.BornMontageInfo?.End, false), false));
  }
  InterruptBornPerformance(t) {
    if (!this.TryPlayBornMontageEnd(t)) {
      if (this.AbortBornMontage()) {
        TimerSystem_1.TimerSystem.Delay(t, DEFAULT_BLEND_OUT_TIME * MathUtils_1.MathUtils.SecondToMillisecond);
      } else {
        t();
      }
    }
  }
  FinishBornPerformance() {
    if (this.StateMachine.CurrentState === 0) {
      this.AbortBornMontage();
      this.BornMontagePhase = 5;
      this.StateMachine.Switch(1);
      this.AnimalEcologicalInterface.StateMachineInitializationComplete();
    }
  }
  AbortBornMontage() {
    if (!this.BornMontageInfo) {
      return false;
    }
    if (this.BornMontagePhase === 5) {
      return false;
    }
    let t = undefined;
    switch (this.BornMontagePhase) {
      case 1:
        t = this.BornMontageInfo.Start;
        break;
      case 2:
        t = this.BornMontageInfo.Loop;
        break;
      case 3:
        t = this.BornMontageInfo.Branch;
        break;
      case 4:
        t = this.BornMontageInfo.End;
    }
    this.BornMontagePhase = 5;
    return !!t?.IsValid() && (this.AnimComp?.MainAnimInstance?.Montage_Stop(DEFAULT_BLEND_OUT_TIME, t), true);
  }
  PlayBornMontage(t, i, s) {
    this.AnimComp?.MainAnimInstance?.Montage_Play(t);
    this.AnimComp?.MainAnimInstance?.OnMontageEnded.Add(s);
    this.AnimComp?.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Animal", 50, "[AnimBornState] 开始播放出生表现", ["PbDataId", this.CreatureData?.GetPbDataId()], ["Montage", t.GetName()], ["Time", i || t.SequenceLength]);
    }
    if (this.TimerHandle) {
      TimerSystem_1.TimerSystem.Remove(this.TimerHandle);
    }
    this.TimerHandle = undefined;
    if (i !== -1) {
      i = (i = i || t.SequenceLength) < DEFAULT_BLEND_OUT_TIME ? i : i - DEFAULT_BLEND_OUT_TIME;
      this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
        s(t, false);
      }, i * MathUtils_1.MathUtils.SecondToMillisecond);
    }
  }
}
exports.AnimalPerformBornState = AnimalPerformBornState;
//# sourceMappingURL=AnimalPerformBornState.js.map