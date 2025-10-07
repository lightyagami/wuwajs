"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelConditionRegistry_1 = require("../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const GuidePrefabDefine_1 = require("./Views/GuidePrefabDefine");
class GuideController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23863, this.vJt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23863);
  }
  static MJt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e;
      var t;
      var o = i.AutoOpenCondition;
      if (o && (e = i.Id, ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e)) && !GuideController.EJt.has(e)) {
        t = new LevelConditionRegistry_1.ConditionPassCallback(GuideController.SJt, [e]);
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(o, t);
        GuideController.EJt.set(e, t);
      }
    }
  }
  static yJt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e;
      var t;
      var o = i.AutoOpenCondition;
      if (o && (e = i.Id, t = this.EJt.get(e))) {
        LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(o, t);
        this.EJt.delete(e);
      }
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupOpening, this.IJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, this.TJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.LJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBlackFadeScreenFinish, this.LJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleSettlementStateChanged, this.LJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, this.Jcd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupOpening, this.IJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.TJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.LJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBlackFadeScreenFinish, this.LJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleSettlementStateChanged, this.LJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCameraSequenceSetUiVisible, this.Jcd);
    this.yJt();
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("GuideTutorialView", GuideController.DJt, "GuideController.CanOpenTutorial");
    UiManager_1.UiManager.AddOpenViewCheckFunction("GuideTutorialPopView", GuideController.DJt, "GuideController.CanOpenTutorial");
  }
  static InvokeGuideGroupByGm(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "通过GM指令调用引导组 ", ["groupId", e], ["是否触发服务端完成", !t]);
    }
    ModelManager_1.ModelManager.GuideModel.IsGmInvoke = true;
    var o = ModelManager_1.ModelManager.GuideModel.TryGetGuideGroup(e);
    ModelManager_1.ModelManager.GuideModel.IsGmInvoke = false;
    if (o) {
      if (o.IsFake = t) {
        if (o.StateMachine.CurrentState !== 0) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Guide", 16, "(GM)引导组  正在执行中, 不再重复执行", ["group.Id", o.Id]);
          }
        } else {
          o.SwitchState(2);
        }
      } else {
        GuideController.TryStartGuide(e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "引导组  数据创建失败！", ["groupId", e]);
    }
  }
  static FinishGuide(t, e) {
    if (e) {
      GuideController.RJt(t);
    } else {
      (e = Protocol_1.Aki.Protocol.uos.create()).S9n = t;
      Net_1.Net.Call(15598, e, e => {
        if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "引导请求服务端完成失败", ["组Id", t]);
        }
        GuideController.RJt(t);
      });
    }
  }
  static GmCleanGuideData() {
    ModelManager_1.ModelManager.GuideModel.GmResetAllGuideGroup();
    GuideController.yJt();
    GuideController.MJt();
  }
  static OnGmCleanGuideGroupDataByGroupId(e) {
    GuideController.ResetFinishedGuide(e);
  }
  static TryStartGuide(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "开始执行引导组", ["组Id", e]);
    }
    e = ModelManager_1.ModelManager.GuideModel.TryGetGuideGroup(e);
    return !!e && (e.SwitchState(1), true);
  }
  static TryFinishGuide(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "引导外部请求完成", ["groupId", e]);
    }
    return !ModelManager_1.ModelManager.GuideModel.IsGroupFinished(e) && (this.FinishGuide(e), true);
  }
  static TryFinishRunningGuides() {
    for (const e of ModelManager_1.ModelManager.GuideModel.GetRunningGroupIdList()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 64, "停止当前引导: " + e);
      }
      GuideController.TryFinishGuide(e);
    }
  }
  static FinishGuideGm(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "引导GM命令请求完成", ["groupId", e]);
    }
    if (ModelManager_1.ModelManager.GuideModel.CheckGuideInfoExist(e)) {
      GuideController.RJt(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "引导GM命令请求完成时错误, 当前引导数据不存在", ["引导Id", e]);
    }
  }
  static RJt(e) {
    ModelManager_1.ModelManager.GuideModel.FinishGroup(e);
    GuideController.UJt(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuideGroupFinished, e);
  }
  static ResetFinishedGuide(e) {
    if (ModelManager_1.ModelManager.GuideModel.IsGroupFinished(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 53, "重置已完成引导", ["groupId", e]);
      }
      ModelManager_1.ModelManager.GuideModel.ResetFinishedGuide(e);
      GuideController.AJt(e);
    }
  }
  static AJt(e) {
    var t;
    var o;
    if (!GuideController.EJt.has(e)) {
      if (ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e) && (t = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(e).AutoOpenCondition)) {
        o = new LevelConditionRegistry_1.ConditionPassCallback(GuideController.SJt, [e]);
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(t, o);
        GuideController.EJt.set(e, o);
      }
    }
  }
  static UJt(e) {
    var t;
    var o = GuideController.EJt.get(e);
    if (o && !ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e) && (t = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(e).AutoOpenCondition)) {
      LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(t, o);
      GuideController.EJt.delete(e);
    }
  }
  static CheckAvailableWhenOnline(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (e !== 1) {
        return true;
      }
    } else if (e !== 2) {
      return true;
    }
    return false;
  }
  static CheckHasNewTagInHookNameForShow(e) {
    return e.HookNameForShow.includes(GuidePrefabDefine_1.NEW_TAG) || e.ExtraParam.length > 0 && e.ExtraParam[0].includes(GuidePrefabDefine_1.NEW_TAG);
  }
  static async WaitForCurrentTutorialFinish() {
    var e = ModelManager_1.ModelManager.GuideModel.CurrentGroupMap;
    if (e) {
      var t = [];
      for (const o of e.values()) {
        for (const i of o.StepInfoList) {
          if (i.Config.ContentType === 3 && o.FinishPromise) {
            t.push(o.FinishPromise.Promise);
          }
        }
      }
      if (t.length > 0) {
        await Promise.all(t);
      }
    }
  }
  static get GmEnableFocusTextPosTick() {
    return this.Asu;
  }
  static set GmEnableFocusTextPosTick(e) {
    this.Asu = e;
  }
}
(exports.GuideController = GuideController).vJt = e => {
  if (e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "初始化GuideTriggerNotify发来的数据, 服务端监听的打开条件通过，主动发一个引导组下来", ["groupId", e.S9n]);
    }
    e = e.S9n;
    GuideController.TryStartGuide(e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Guide", 16, "服务端发来的GuideTriggerNotify为空");
  }
};
GuideController.EJt = new Map();
GuideController.SJt = e => {
  GuideController.TryStartGuide(e[0]);
};
GuideController.DJt = () => !ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement;
GuideController.IJt = (t, o) => {
  var e = Protocol_1.Aki.Protocol.los.create();
  e.S9n = t;
  Net_1.Net.Call(24915, e, e => {
    if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.GuideModel.SwitchGroupState(t, 0);
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28924, e.lvs);
    } else if (!o) {
      ModelManager_1.ModelManager.GuideModel.SwitchGroupState(t, 2);
    }
  });
};
GuideController.LJt = () => {
  ModelManager_1.ModelManager.GuideModel.ShowFailedOpenTutorialView();
};
GuideController.nye = () => {
  ModelManager_1.ModelManager.GuideModel.EnsureCurrentDungeonId();
};
GuideController.jZs = [20013];
GuideController.FWe = () => {
  var e = ModelManager_1.ModelManager.GuideModel.CurrentGroupMap;
  if (e) {
    for (const o of GuideController.jZs) {
      var t = e.get(o);
      if (t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Guide", 16, "引导组在场景加载完成（包括客户端加载和服务器交互确认）前被触发，强制终止引导", ["GuideGroupId", o]);
        }
        t.Break();
        e.delete(o);
      }
    }
  }
};
GuideController.TJt = () => {
  var e = Protocol_1.Aki.Protocol.aos.create();
  Net_1.Net.Call(23031, e, e => {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "初始化GuideInfoNotify发来的数据", ["FinishedList", e.sws]);
      }
      for (const t of e.sws) {
        ModelManager_1.ModelManager.GuideModel.FinishGroup(t);
      }
      GuideController.MJt();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "服务端发来的GuideInfoNotify为空");
    }
  });
};
GuideController.XBo = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Guide", 16, "控制器类型发生变更，引导组数据重置");
  }
  ModelManager_1.ModelManager.GuideModel.ClearAllGroup();
};
GuideController.Jcd = e => {
  ModelManager_1.ModelManager.GuideModel.ShouldBlockGuideBecauseUiNotRender = !e;
};
GuideController.Asu = true; //# sourceMappingURL=GuideController.js.map