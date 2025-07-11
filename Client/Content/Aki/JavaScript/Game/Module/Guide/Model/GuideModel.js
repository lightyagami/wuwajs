"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideController_1 = require("../GuideController");
const GuideGroupInfo_1 = require("./GuideGroupInfo");
class GuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsGmInvoke = false;
    this.BJt = undefined;
    this.bJt = undefined;
    this.CurrentGroupMap = undefined;
    this.qJt = undefined;
    this.GJt = undefined;
    this.NJt = undefined;
    this.OJt = false;
    this.kJt = undefined;
    this.FJt = 0;
    this.VJt = i => {
      for (let i = 0; i < this.qJt.length; i++) {
        if (this.qJt[i].Tick(TimerSystem_1.MIN_TIME)) {
          this.qJt.splice(i, 1);
          this.TryPauseTimer();
          i--;
        }
      }
    };
  }
  get IsGuideLockingInput() {
    return this.FJt > 0;
  }
  AddGuideLockInput() {
    if (!this.FJt++) {
      this.HJt();
    }
  }
  RemoveGuideLockInput() {
    if (! --this.FJt) {
      this.HJt();
    }
  }
  HJt() {
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(this.IsGuideLockingInput, "Guide");
    ModelManager_1.ModelManager.InputDistributeModel?.RefreshInputDistributeTag();
  }
  OnInit() {
    this.bJt = new Set();
    this.BJt = new Set();
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      if (i.ResetInDungeon) {
        this.BJt.add(i.Id);
      }
    }
    this.CurrentGroupMap = new Map();
    this.kJt = new Map([[4, undefined], [1, undefined]]);
    this.FJt = 0;
    return !(this.IsGmInvoke = false);
  }
  CheckGuideInfoExist(i) {
    return this.CurrentGroupMap.has(i);
  }
  static IsLocked() {
    return GuideModel.IsGmLock || GuideModel.IsLock;
  }
  SetLock(i) {
    if (i !== GuideModel.IsLock) {
      if (i) {
        this.ClearAllGroup();
      }
      GuideModel.IsLock = i;
    }
  }
  SetGmLock(i) {
    if (i !== GuideModel.IsGmLock) {
      if (i) {
        this.ClearAllGroup();
      }
      GuideModel.IsGmLock = i;
    }
  }
  AddTutorialInfo(i) {
    this.qJt ||= [];
    this.qJt.push(i);
    this.GJt ||= TimerSystem_1.GameplayTimerSystem.Forever(this.VJt, TimerSystem_1.MIN_TIME);
    this.TryShowTutorial();
  }
  TryShowTutorial() {
    var i;
    if (!(this.qJt.length <= 0) && !(i = this.qJt[this.qJt.length - 1], this.NJt && (this.NJt.TipState === 2 || i.TutorialTip && this.NJt.TipState !== 1))) {
      this.jJt(i);
    }
  }
  jJt(i) {
    this.NJt = i;
    if (UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView")) {
      UiManager_1.UiManager.CloseView("GuideTutorialTipsView");
    }
    if (this.NJt.TutorialTip) {
      this.WJt();
      UiManager_1.UiManager.OpenView("GuideTutorialTipsView", this.NJt);
    } else {
      this.TryPauseTimer();
      this.TryShowGuideTutorialView();
    }
  }
  async M8_() {
    var i = (await UiManager_1.UiManager.OpenViewAsync("TutorialView")) !== undefined;
    this.OJt = !i && !UiManager_1.UiManager.IsViewOpen("TutorialView");
    if (i) {
      this.qJt.length = 0;
      this.NJt = undefined;
      this.TryPauseTimer();
    }
  }
  TryShowGuideTutorialView(i = false) {
    if (i && this.AreMultipleTutorialsQueued()) {
      this.M8_();
    } else if (this.NJt?.IsOverrideGuideTutorialView) {
      i = {
        TutorialId: this.NJt.GuideId
      };
      UiManager_1.UiManager.OpenView("TutorialView", i, i => {
        this.OJt = !i && !UiManager_1.UiManager.IsViewOpen("TutorialView");
        i = UiManager_1.UiManager.GetViewByName("TutorialView");
        if (i) {
          i.IsOpenedByGuide = true;
        }
      });
    } else {
      const e = (ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.NJt?.GuideId ?? 0)?.ShowLayer ?? 0) === 0 ? "GuideTutorialView" : "GuideTutorialPopView";
      UiManager_1.UiManager.OpenView(e, this.NJt, i => {
        this.OJt = !i && !UiManager_1.UiManager.IsViewOpen(e);
      });
    }
  }
  ShowFailedOpenTutorialView() {
    if (this.OJt) {
      this.TryShowGuideTutorialView();
    }
  }
  ClipTipState() {
    for (const i of this.qJt) {
      if (i.TipState === 0) {
        i.TipState = 1;
      }
    }
  }
  RemoveCurrentTutorialInfo() {
    var i = this.qJt.indexOf(this.NJt);
    this.NJt = undefined;
    if (i >= 0) {
      this.qJt[i].StopGuide();
      this.qJt.splice(i, 1);
      this.TryPauseTimer();
    }
  }
  HaveCurrentTutorial() {
    return this.NJt !== undefined;
  }
  AreMultipleTutorialsQueued() {
    return (this.qJt?.length ?? 0) > 1;
  }
  TryPauseTimer() {
    if (this.GJt && !this.GJt.IsPause() && (this.qJt.length === 0 || this.NJt && this.NJt.TipState === 2)) {
      TimerSystem_1.GameplayTimerSystem.Pause(this.GJt);
    }
  }
  WJt() {
    if (this.GJt && this.GJt.IsPause() && this.qJt.length && (!this.NJt || this.NJt.TipState !== 2)) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.GJt)) {
        TimerSystem_1.GameplayTimerSystem.Resume(this.GJt);
      } else {
        this.GJt = TimerSystem_1.GameplayTimerSystem.Forever(this.VJt, TimerSystem_1.MIN_TIME);
      }
    }
  }
  BreakTypeViewStep(i) {
    this.kJt.get(i)?.SwitchState(3);
    this.kJt.set(i, undefined);
  }
  OpenGuideView(i) {
    var e = i.Config.ContentType;
    this.kJt.set(e, i);
    if (e === 4) {
      UiManager_1.UiManager.OpenView("GuideFocusView", i);
    } else {
      UiManager_1.UiManager.OpenView("GuideTipsView", i);
    }
  }
  RemoveStepViewSingletonMap(i) {
    var e = i.Config.ContentType;
    if (this.kJt.get(e) === i) {
      this.kJt.set(e, undefined);
    }
  }
  EnsureCurrentDungeonId() {
    const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    for (var [i, t] of this.CurrentGroupMap) {
      if (!GuideModel.qT1(i).find(i => i === e)) {
        t.Reset();
        this.CurrentGroupMap.delete(i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, "进入副本时清除不属于当前副本的引导数据", ["groupId", i]);
        }
      }
    }
    for (const r of this.BJt) {
      if (GuideModel.qT1(r).find(i => i === e)) {
        GuideController_1.GuideController.ResetFinishedGuide(r);
      }
    }
  }
  GmResetAllGuideGroup() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "通过GM命令清除了本地缓存的所有已完成引导数据, 同时所有执行中引导状态被重置, 重登后恢复");
    }
    this.bJt.clear();
    this.ClearAllGroup();
  }
  ClearAllGroup() {
    this.CurrentGroupMap.forEach(i => {
      i.Reset();
    });
    this.CurrentGroupMap.clear();
  }
  FinishGroup(i) {
    var e = this.CurrentGroupMap.get(i);
    if (e) {
      e.Reset();
      this.CurrentGroupMap.delete(i);
    }
    this.bJt.add(i);
  }
  ResetFinishedGuide(i) {
    this.bJt.delete(i);
  }
  IsGroupFinished(i) {
    return this.bJt?.has(i);
  }
  CanGroupInvoke(i) {
    return !this.IsGroupFinished(i) || this.IsGroupCanRepeat(i);
  }
  IsGroupCanRepeat(i) {
    var e = ConfigManager_1.ConfigManager.GuideConfig.GetLimitRepeatStepSetOfGroup(i);
    return e.size === 0 || !e.has(-1) && (!this.CheckGuideInfoExist(i) || !this.CurrentGroupMap.get(i).HasAnyFinishedStep(e));
  }
  TryGetGuideGroup(i) {
    if (this.CheckGuideInfoExist(i)) {
      return this.CurrentGroupMap.get(i);
    }
    if (GuideModel.IsLocked()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "引导当前处于屏蔽状态, 无法创建");
      }
    } else {
      var e = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(i);
      if (e) {
        if (this.CanGroupInvoke(i)) {
          for (var [t] of this.CurrentGroupMap) {
            var r = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(t);
            if (r === undefined) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Guide", 64, "当前引导组缓存不存在客户端配置", ["组Id", t]);
              }
              return;
            }
            if (r.Priority > e.Priority) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 16, "引导组当前缓存中存在更高优先级的引导, 不能触发新引导", ["当前组Id", i], ["高优先级组Id", t]);
              }
              return;
            }
          }
          var o = e.OnlineMode;
          if (GuideController_1.GuideController.CheckAvailableWhenOnline(o)) {
            var s = e.OpenLimitCondition;
            if (!s || this.IsGmInvoke || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(s.toString(), undefined)) {
              const a = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
              var h;
              var u = GuideModel.qT1(i);
              if (u.find(i => i === a)) {
                h = new GuideGroupInfo_1.GuideGroupInfo(i);
                this.CurrentGroupMap.set(h.Id, h);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Guide", 16, "创建引导组数据成功", ["组Id", i]);
                }
                return h;
              }
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Guide", 16, "引导组的副本Id与当前所在副本不匹配", ["组Id", i], ["当前所在副本Id", a], ["配置副本Id", u]);
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Guide", 16, "引导组的入队条件组不通过", ["组Id", i], ["conditionGroupId", s]);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 64, "引导组用于是否联机的情况不匹配", ["组Id", i], ["OnlineMode", o], ["是否处于联机", ModelManager_1.ModelManager.GameModeModel.IsMulti]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "引导组服务端已记录完成且未配置为可重复完成, 不能重复执行", ["组Id", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "引导组的客户端配置不存在, 无法创建", ["组Id", i]);
      }
    }
  }
  SwitchGroupState(i, e) {
    var t = this.CurrentGroupMap.get(i);
    if (t) {
      t.SwitchState(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "引导组数据未创建", ["组Id", i]);
    }
  }
  CheckGroupStatus(i, e, t) {
    if (!this.bJt) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "无法判定引导组状态, 引导数据尚未初始化", ["groupId", i], ["status", e], ["operator", t]);
      }
      return false;
    }
    if (!ConfigManager_1.ConfigManager.GuideConfig.GetGroup(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "不存在ID的引导组数据, 请策划检查配置是否有误！", ["组Id", i]);
      }
      return false;
    }
    let r = 0;
    if (this.bJt.has(i)) {
      r = 4;
    } else if (i = this.CurrentGroupMap.get(i)) {
      r = i.StateMachine.CurrentState;
    }
    return GuideModel.KJt(r, e, t);
  }
  static KJt(i, e, t) {
    if (t === "") {
      return i === e;
    } else if (t === "!=") {
      return i !== e;
    } else if (t === ">") {
      return e < i;
    } else if (t === ">=") {
      return e <= i;
    } else if (t === "<") {
      return i < e;
    } else {
      return t === "<=" && i <= e;
    }
  }
  OnClear() {
    this.bJt.clear();
    this.CurrentGroupMap.clear();
    this.BJt.clear();
    if (this.qJt) {
      this.qJt.length = 0;
    }
    if (this.GJt) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GJt);
    }
    this.bJt = undefined;
    this.CurrentGroupMap = undefined;
    this.BJt = undefined;
    this.qJt = undefined;
    this.NJt = undefined;
    this.GJt = undefined;
    return !(this.OJt = false);
  }
  GetRunningGroupIdList() {
    var i;
    var e;
    var t = [];
    for ([i, e] of this.CurrentGroupMap) {
      if (e.CheckIsGuideRunning()) {
        t.push(i);
      }
    }
    return t;
  }
  static qT1(i) {
    i = ConfigManager_1.ConfigManager.GuideConfig?.GetGroup(i);
    if (!i) {
      return [];
    }
    if (!i.DungeonSets || i.DungeonSets.length === 0) {
      return i.DungeonId;
    }
    var e = new Set();
    for (const r of i.DungeonSets) {
      var t = ConfigManager_1.ConfigManager.GuideConfig?.GetGuideDungeonSet(r);
      if (t) {
        for (const o of t.DungeonIdList) {
          e.add(o);
        }
      }
    }
    return Array.from(e);
  }
}
(exports.GuideModel = GuideModel).IsLock = false;
GuideModel.IsGmLock = false; //# sourceMappingURL=GuideModel.js.map