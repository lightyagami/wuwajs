"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralController = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const ConditionById_1 = require("../../Core/Define/ConfigQuery/ConditionById");
const ConditionGroupById_1 = require("../../Core/Define/ConfigQuery/ConditionGroupById");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const RenderDataManager_1 = require("../Render/Data/RenderDataManager");
const CodeDefineLevelConditionInfo_1 = require("./LevelConditions/CodeDefineLevelConditionInfo");
const LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter");
const LevelConditionRegistry_1 = require("./LevelConditions/LevelConditionRegistry");
const LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
const LevelGeneralBaseFrameScheduler_1 = require("./LevelGeneralBaseFrameScheduler");
const LevelGeneralCommons_1 = require("./LevelGeneralCommons");
const LevelGeneralNetworks_1 = require("./LevelGeneralNetworks");
class LevelGeneralController extends ControllerBase_1.ControllerBase {
  static pie() {
    this.PUe = new Map();
    this.qDa = new Map();
    this.xUe = new Map();
    this.wUe = new Map();
    this.Cih = new Map();
    this.$ih = new Map();
    this.LevelEventLogOpen = true;
    if (!Info_1.Info.IsBuildDevelopmentOrDebug) {
      this.LevelEventLogOpen = false;
    }
  }
  static OnInit() {
    LevelGeneralCommons_1.LevelGeneralCommons.Init();
    LevelGeneralNetworks_1.LevelGeneralNetworks.Register();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddToTickList, this.BUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HandleNextAction, this.bUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HandleActionFailure, this.qUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
    this.pie();
    this.AddAttributeEvent();
    return true;
  }
  static OnClear() {
    LevelGeneralCommons_1.LevelGeneralCommons.Clear();
    LevelGeneralNetworks_1.LevelGeneralNetworks.UnRegister();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddToTickList, this.BUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HandleNextAction, this.bUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HandleActionFailure, this.qUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
    this.RemoveAttributeEvent();
    return true;
  }
  static AddAttributeEvent() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(11, this.dCc);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(11, this.mCc);
  }
  static RemoveAttributeEvent() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(11, this.dCc);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(11, this.mCc);
  }
  static fCc() {
    var e;
    var t;
    var n;
    var r = RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection();
    if (r?.IsValid()) {
      e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(11);
      t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(11);
      n = UE.KismetMaterialLibrary.GetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), r, FNameUtil_1.FNameUtil.GetDynamicFName("FlameRaceStrength"));
      UE.KuroMaterialParameterCollectionManager.SetScalarParameterValueTimeCurve(GlobalData_1.GlobalData.GameInstance.GetWorld(), r, FNameUtil_1.FNameUtil.GetDynamicFName("FlameRaceStrength"), e / t, n, 0.1, GlobalData_1.GlobalData.GameInstance.GetWorld(), false);
    }
  }
  static GetBehaviorTreeRunningActions() {
    if (this.PUe.size) {
      var e = new Array();
      for (const t of this.PUe.values()) {
        for (const n of t) {
          if (n.Context.Type === 6) {
            e.push(n);
          }
        }
      }
      return e;
    }
  }
  static ExecuteActionsNew(n, r, i) {
    var e = --this.NUe;
    if (i) {
      this.xUe.set(e, i);
    }
    var i = n.length;
    if (i === 1) {
      var t = n[0];
      var o = EventTempData.Create();
      o.EventType = t.Name || t.Params.constructor.name;
      o.EventParamsNew = t.Params;
      o.IsAsync = t.Async ?? false;
      if (r.Type === 1) {
        o.EventEntityId = r.EntityId;
      }
      o.Context = r;
      o.ActionIndex = 0;
      o.ActionId = t.ActionId ?? 0;
      o.ActionGuid = t.ActionGuid ?? "";
      this.kUe(e, o);
    } else {
      var s = new Array();
      this.PUe.set(e, s);
      let t = i;
      for (let e = i - 1; e > -1; e--) {
        var l = n[e];
        var a = EventTempData.Create();
        a.EventType = l.Name || l.Params.constructor.name;
        a.EventParamsNew = l.Params;
        a.IsAsync = l.Async ?? false;
        if (r.Type === 1) {
          a.EventEntityId = r.EntityId;
        }
        a.Context = r;
        a.ActionIndex = --t;
        a.ActionId = l.ActionId ?? 0;
        s.push(a);
      }
      this.HandleNextAction(e);
    }
  }
  static ExecuteActionsByServerNotify(r, i, e, o, s, l, n, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 7, "开始执行行为组", ["PlayerId", e], ["SessionId", o], ["StartIndex", s], ["EndIndex", l]);
    }
    var v = r.length;
    if (v <= s || v <= l) {
      this.HandleFinishActions(e, o, s, `行为组开始节点超过数组上限  StartIndex：${s}，EndIndex：${l}，ActionsLen：${v}`);
    } else {
      if (this.LevelEventLogOpen) {
        let t = "";
        try {
          t = JSON.stringify(i);
        } catch (e) {
          t = "无法JSON序列化的Context";
        }
        let n = "";
        try {
          n = JSON.stringify(r);
        } catch (e) {
          n = "无法JSON序列化的Actions";
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 7, "开始执行行为组", ["PlayerId", e], ["SessionId", o], ["StartIndex", s], ["EndIndex", l], ["Context", t], ["Actions", n]);
        }
      }
      v = o;
      if (a) {
        this.xUe.set(v, a);
      }
      this.Cih.set(v, n);
      if (n) {
        this.$ih.set(v, s);
      }
      let t = this.PUe.get(v);
      if (t) {
        for (let e = s; e <= l; e++) {
          var h = r[e];
          var _ = EventTempData.Create();
          _.EventType = h.Name || h.Params.constructor.name;
          _.EventParamsNew = h.Params;
          _.IsAsync = h.Async ?? false;
          if (i.Type === 1) {
            _.EventEntityId = i.EntityId;
          }
          _.Context = i;
          _.ActionIndex = e;
          _.ActionId = h.ActionId ?? 0;
          _.SessionId = o;
          if (!(t[0]?.ActionIndex >= _.ActionIndex)) {
            t.unshift(_);
          }
        }
      } else {
        t = new Array();
        this.PUe.set(v, t);
        for (let e = l; e >= s; e--) {
          var d = r[e];
          var C = EventTempData.Create();
          C.EventType = d.Name || d.Params.constructor.name;
          C.EventParamsNew = d.Params;
          C.IsAsync = d.Async ?? false;
          if (i.Type === 1) {
            C.EventEntityId = i.EntityId;
          }
          C.Context = i;
          C.ActionIndex = e;
          C.ActionId = d.ActionId ?? 0;
          C.SessionId = o;
          t.push(C);
        }
        a = new Array();
        a.push(e);
        a.push(o);
        a.push(s);
        this.wUe.set(v, a);
        this.HandleNextAction(v);
      }
    }
  }
  static HandleNextAction(e) {
    var t = this.PUe.get(e);
    if (this.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行下一个行为", ["行为组剩余个数", t?.length]);
    }
    if (t && t.length > 0) {
      t = t.pop();
      this.kUe(e, t);
    } else {
      this.qDa.delete(e);
      this.PUe.delete(e);
      this.VUe(e);
    }
  }
  static VUe(e, t = "") {
    var n;
    var r = this.wUe.get(e);
    if (this.LevelEventLogOpen) {
      let e = "";
      e = r ? `PlayerId：${r[0]} SessionId：${r[1]} StartIndex：${r[2]}` : "空";
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "行为组为空，准备删除", ["ContextArray", e]);
      }
    }
    if (r && this.Cih.get(e)) {
      this.wUe.delete(e);
      i = r[0];
      n = r[1];
      r = this.$ih.get(e) ?? r[2];
      this.HandleFinishActions(i, n, r, t);
    }
    var i = this.xUe.get(e);
    if (i) {
      i(1);
      this.xUe.delete(e);
    }
  }
  static HandleActionsFailure(e, t, n, r) {
    var i = this.PUe.get(e);
    if (i) {
      while (i.length > 0) {
        var o = i.pop();
        EventTempData.Release(o);
      }
      this.PUe.delete(e);
    }
    var s;
    var l = this.wUe.get(e);
    if (l) {
      a = `PlayerId：${l[0]} SessionId：${l[1]} StartIndex：${l[2]}`;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "行为组执行失败，准备删除", ["ContextArray", a]);
      }
      this.wUe.delete(e);
      a = l[0];
      s = l[1];
      l = l[2];
      this.HandleFinishActions(a, s, l, "行为:" + t + " 执行失败");
    }
    var a = this.xUe.get(e);
    if (a) {
      a(n ? 3 : 2);
      this.xUe.delete(e);
    }
    LevelEventCenter_1.LevelEventCenter.RemoveEventGroup(e);
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelEvent", 7, "行为组执行失败（定位问题专用日志，不是报错信息）", ["Msg", t]);
    }
  }
  static HandleFinishActions(e, t, n, r) {
    if (this.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 7, "请求完成行为组", ["SessionId", t]);
    }
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActionsFinish(e, t, n, r, e => {});
  }
  static StopActionsExecute(e) {
    var t = this.PUe?.get(e);
    t?.splice(0, t.length);
    this.qDa?.get(e)?.Finish();
  }
  static CheckCondition(n, r, e = true, ...i) {
    if (n === "None") {
      return true;
    }
    var o = ConditionGroupById_1.configConditionGroupById.GetConfig(Number(n));
    if (o) {
      let e = undefined;
      let t = false;
      if (o.Relation) {
        for (const s of o.GroupId) {
          if ((e = ConditionById_1.configConditionById.GetConfig(s)) && (t = this.HandleCondition(e, r, n, ...i))) {
            return t;
          }
        }
      } else {
        for (const l of o.GroupId) {
          if ((e = ConditionById_1.configConditionById.GetConfig(l)) && !(t = this.HandleCondition(e, r, n, ...i))) {
            return t;
          }
        }
      }
      return t;
    }
    return e;
  }
  static CheckConditionNew(e, t, n) {
    if (!e || !e.Conditions || e.Conditions.length === 0) {
      return true;
    }
    let r = false;
    if (e.Type === 0) {
      for (const i of e.Conditions) {
        if (!(r = this.HUe(i, t, n))) {
          return r;
        }
      }
    } else {
      for (const o of e.Conditions) {
        if (r = this.HUe(o, t, n)) {
          return r;
        }
      }
    }
    return r;
  }
  static kUe(e, t) {
    var n = t.EventType;
    if (t.SessionId === -1 || LevelEventCenter_1.LevelEventCenter.HasAction(n)) {
      this.jUe(e, t);
    } else {
      if (this.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, `服务端驱动执行一个纯服务端逻辑的行为(${t.EventType})`, ["PlayerId", t.PlayerId], ["SessionId", t.SessionId], ["ActionIndex", t.ActionIndex]);
      }
      EventTempData.Release(t);
      this.HandleNextAction(e);
    }
  }
  static jUe(e, t) {
    if (this.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, `执行行为组节点(${t.EventType})`, ["PlayerId", t.PlayerId], ["SessionId", t.SessionId], ["ActionIndex", t.ActionIndex]);
    }
    var n = t.EventType;
    var r = LevelEventCenter_1.LevelEventCenter.GetEvent(n);
    if (r) {
      r.GroupId = e;
      r.IsAsync = t.IsAsync;
      r.SessionId = t.SessionId;
      r.ActionIndex = t.ActionIndex;
      if (LevelEventCenter_1.LevelEventCenter.IsNeedTick(n)) {
        r.OpenTick();
      }
      try {
        this.qDa.set(e, r);
        if (t.EventParamsNew) {
          r.ExecuteAction(t.EventParamsNew, t.Context, t.ActionId);
        }
        if (!r.IsWaitEnd) {
          r.Finish();
        }
      } catch (e) {
        r.Failure();
        r = "行为节点：" + n + "逻辑执行异常，请检查报错信息";
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(r);
        if (e instanceof Error && Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("LevelEvent", 7, r, e, ["Details", e.message]);
        }
      }
    } else {
      this.HandleNextAction(e);
    }
    EventTempData.Release(t);
  }
  static HandleCondition(e, t, n, ...r) {
    var i = LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type);
    if (i) {
      return i.Check(e, t, ...r);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 16, `条件组使用场合不恰当!!!
            该组中包含的条件类型必须要有客户端实现，
            否则条件组的判定结果始终为false，可能会出现不合预期的情况`, ["有问题的条件组id", n], ["有问题的条件id", e.Id], ["缺乏客户端实现的条件类型", e.Type]);
      }
      return false;
    }
  }
  static HUe(e, t, n) {
    let r = undefined;
    return !!(r = e instanceof CodeDefineLevelConditionInfo_1.CodeCondition ? LevelConditionCenter_1.LevelConditionCenter.GetCodeCondition(e.CodeType) : LevelConditionCenter_1.LevelConditionCenter.GetCondition(e.Type)) && r.CheckNew(e, t, n);
  }
  static OnTick(e) {
    LevelGeneralBaseFrameScheduler_1.LevelGeneralBaseFrameScheduler.UpdateActionFrameScheduler();
    LevelEventCenter_1.LevelEventCenter.Tick(e);
  }
  static OnLeaveLevel() {
    LevelGeneralBaseFrameScheduler_1.LevelGeneralBaseFrameScheduler.ClearActionFrameScheduler();
    return true;
  }
}
exports.LevelGeneralController = LevelGeneralController;
(_a = LevelGeneralController).IsTickEvenPausedInternal = true;
LevelGeneralController.qDa = undefined;
LevelGeneralController.NUe = 0;
LevelGeneralController.LevelEventLogOpen = false;
LevelGeneralController.dCc = (e, t, n) => {
  _a.fCc();
};
LevelGeneralController.mCc = (e, t, n) => {
  _a.fCc();
};
LevelGeneralController.BUe = (e, t) => {
  if (e) {
    LevelEventCenter_1.LevelEventCenter.AddToTickList(true, t);
  } else {
    LevelEventCenter_1.LevelEventCenter.AddToTickList(false, t);
  }
};
LevelGeneralController.bUe = e => {
  TimerSystem_1.TimerSystem.Next(() => {
    LevelGeneralController.HandleNextAction(e);
  });
};
LevelGeneralController.qUe = (e, t, n, r) => {
  LevelGeneralController.HandleActionsFailure(e, t, n, r);
};
LevelGeneralController.GUe = (e, t, n) => {
  LevelConditionRegistry_1.LevelConditionRegistry.RegisterEntityPawnRange(t.Entity);
};
LevelGeneralController.zfi = e => {
  LevelGeneralBaseFrameScheduler_1.LevelGeneralBaseFrameScheduler.OnSettingFrameRateChanged(e);
};
class EventTempData {
  constructor() {
    this.EventType = "";
    this.EventParams = undefined;
    this.EventParamsNew = undefined;
    this.EventEntityId = 0;
    this.Context = undefined;
    this.PlayerId = -1;
    this.SessionId = -1;
    this.ActionIndex = -1;
    this.ActionId = 0;
    this.ActionGuid = "";
    this.IsAsync = false;
    this.EventTrigger = undefined;
  }
  Reset() {
    this.EventType = "";
    this.EventParams = undefined;
    this.EventParamsNew = undefined;
    this.EventType = "";
    this.Context = undefined;
    this.PlayerId = -1;
    this.SessionId = -1;
    this.ActionIndex = -1;
    this.ActionId = 0;
    this.EventEntityId = 0;
    this.EventTrigger = undefined;
    this.IsAsync = false;
  }
  static Create() {
    if (this.RUe.length > 0) {
      return this.RUe.pop();
    } else {
      return new EventTempData();
    }
  }
  static Release(e) {
    e.Reset();
    this.RUe.push(e);
  }
}
EventTempData.RUe = new Array();
//# sourceMappingURL=LevelGeneralController.js.map