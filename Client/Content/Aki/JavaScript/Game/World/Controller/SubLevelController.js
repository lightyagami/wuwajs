"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SubLevelController = void 0;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ControllerWithAssistantBase_1 = require("../../Module/GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  AsyncTask_1 = require("../Task/AsyncTask"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal"),
  SubLevelVisibleAssistant_1 = require("./SubLevelAssistant/SubLevelVisibleAssistant");
class SubLevelInfo {
  constructor(e, o, r, l, t, a) {
    this.UnloadLevels = void 0, this.Levels = void 0, this.ScreenEffect = 0, this.Location = void 0, this.Rotator = void 0, this.Callback = void 0, this.UnloadLevels = e, this.Levels = o, this.ScreenEffect = r, this.Location = l ?? void 0, this.Rotator = t ?? void 0, this.Callback = a ?? void 0
  }
  Clear() {
    this.UnloadLevels = void 0, this.Levels = void 0, this.ScreenEffect = 0, this.Location = void 0, this.Rotator = void 0, this.Callback = void 0
  }
}
class SubLevelController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var e = super.OnInit();
    return this.aWs = new Queue_1.Queue, e
  }
  static OnClear() {
    var e = super.OnClear();
    return this.aWs?.Clear(), this.aWs = void 0, e
  }
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(), Net_1.Net.Register(17238, SubLevelController.b0r), Net_1.Net.Register(15180, SubLevelController.q0r)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17238), Net_1.Net.UnRegister(15180), super.OnUnRegisterNetEvent()
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new SubLevelVisibleAssistant_1.SubLevelVisibleAssistant)
  }
  static cYt(e) {
    return this.Assistants.get(e)
  }
  static LoadOrUnloadSubLevel(e, r) {
    if (e?.length) {
      var o = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
      const n = new Array,
        i = new Array;
      var l, t = new Set;
      for (const s of e) {
        t.add(s);
        var a = ModelManager_1.ModelManager.SubLevelModel.GetSubLevel(s);
        a && a.IsVisible === !r.includes(s) || i.push(s)
      }
      for ([l] of o) t.has(l) || n.push(l);
      (n.length || i.length) && (ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("LoadOrUnloadSubLevel"), e = new AsyncTask_1.AsyncTask("LoadOrUnloadSubLevel", async () => {
        const o = new CustomPromise_1.CustomPromise;
        return SubLevelController.ChangeSubLevel(n, i, 0, void 0, void 0, e => {
          e || Log_1.Log.CheckError() && Log_1.Log.Error("InstanceDungeon", 3, "SubLevelController.加载或者卸载子关卡失败", ["unloads", n], ["newLoads", i]), ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("LoadOrUnloadSubLevel"), e && ModelManager_1.ModelManager.GameModeModel.MapDone && ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal), o.SetResult(e)
        }, r), o.Promise
      }), TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run())
    }
  }
  static ChangeSubLevel(e, o, r, l, t, a, n) {
    var i = new Map;
    for (const L of o) {
      var s = n?.indexOf(L) ?? -1;
      i.set(L, s < 0)
    }
    this.Lfr(e, i, r, l, t, a)
  }
  static hWs(e) {
    e && this.aWs?.Push(e)
  }
  static async Lfr(r, l, t, a, n, i) {
    var s = ModelManager_1.ModelManager.GameModeModel,
      L = ModelManager_1.ModelManager.SubLevelLoadingModel;
    if (s.WorldDone)
      if (L.LoadSubLeveling) Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 3, "SubLevelController.当前正在加载子关卡，等所有子关卡加载完成才能继续加载新的子关卡。"), this.hWs(new SubLevelInfo(r, l, t, a, n, i));
      else {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(开始)", ["卸载的子关卡", r?.join()], ["加载的子关卡", l?.keys()], ["位置", a], ["旋转", n]), L.LoadSubLeveling = !0, L.LoadSubLevelPromise = new GameModePromise_1.GameModePromise, 0 !== (ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = t) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(14, 3), Log_1.Log.CheckInfo()) && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(完成)");
        let e = !1;
        for (var [_] of l) {
          _ = ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(_);
          if (!_ || 1 === _.LoadState) {
            e = !0;
            break
          }
        }
        s = "SubLevelController.ChangeSubLevelInternal";
        let o = !1;
        if (e && !ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformsEmpty() && (ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, s), o = !0), a && Global_1.Global.BaseCharacter?.KuroSetMovementMode({
            Mode: 0,
            Context: "[SubLevelController.ChangeSubLevelInternal]"
          }), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(开始)"), await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad(), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(结束)"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表加载(开始)"), await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsLoad(), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表加载(结束)"), r?.length) {
          Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(开始)");
          for (const v of r) ModelManager_1.ModelManager.SubLevelModel.RemoveSubLevel(v);
          await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad(), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(完成)")
        }
        l?.size && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(开始)"), await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevels(l), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubLevelAdded), Log_1.Log.CheckInfo()) && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(完成)"), await SubLevelController.Dfr(a, n), o && ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, s), 0 !== t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(14, 1), Log_1.Log.CheckInfo()) && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(完成)"), L.LoadSubLevelPromise.SetResult(!0), L.LoadSubLevelPromise = void 0, L.LoadSubLeveling = !1, Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(完成)"), i?.(!0), this.lWs()
      }
    else Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 3, "SubLevelController.切换子关卡:WorldDone为false,切换子关卡失败。"), i?.(!1)
  }
  static lWs() {
    var e;
    !this.aWs || this.aWs.Size <= 0 || 0 !== this.aWs.Size && ((e = this.aWs.Front) ? (this.aWs.Pop(), this.Lfr(e.UnloadLevels, e.Levels, e.ScreenEffect, e.Location, e.Rotator, e.Callback)) : this.aWs.Pop())
  }
  static async Dfr(e, o) {
    Global_1.Global.BaseCharacter || (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(开始)"), await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(完成)")), e && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家位置、地面修正(开始)", ["Location", e]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportStart, !0), EventSystem_1.EventSystem.EmitWithTarget(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, EventDefine_1.EEventName.TeleportStartEntity, !0), ControllerHolder_1.ControllerHolder.GameModeController.FixBornLocation(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTeleportComplete), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, 0), Log_1.Log.CheckInfo()) && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家位置、地面修正(结束)", ["修正后的Location", Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy]), o && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家旋转(开始)", ["Rotator", o]), Global_1.Global.BaseCharacter.CharacterActorComponent.SetInputRotator(o), Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(WorldGlobal_1.WorldGlobal.ToUeRotator(o), "SubLevelController.切换子关卡:设置玩家旋转", !1), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator()), Log_1.Log.CheckInfo()) && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家旋转(结束)", ["Rotator", Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy])
  }
  static async PreloadSubLevel(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel;
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDone) return Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 29, "SubLevelController.预加载子关卡:WorldDone为false,预加载子关卡失败"), !1;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.预加载子关卡:(开始)", ["加载的子关卡", e?.join()]);
    var r = new Array;
    for (const l of e) o.GetPreloadOrLoadedSubLevel(l) || r.push(l);
    return r?.length && await SubLevelController.yW_(r), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 29, "SubLevelController.预加载子关卡:(完成)"), !0
  }
  static async yW_(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel,
      r = new Array;
    for (const a of e) {
      var l, t = o.AddPreloadSubLevel(a);
      t && (t.LoadState = 1, r.push(t.LoadPromise.Promise), l = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(FNameUtil_1.FNameUtil.GetDynamicFName(a), t.LoadVisibleParam, !1), t.LinkId = l, Log_1.Log.CheckInfo()) && Log_1.Log.Info("World", 3, "SubLevelController.切换子关卡:加载子关卡(预加载)", ["Path", t.Path], ["LinkId", l])
    }
    return await Promise.all(r), !0
  }
  static async CheckLoadSubLevels(e) {
    var o = new Map;
    if (e.URs?.length)
      for (const t of e.URs) {
        var r = e.j$_.indexOf(t);
        o.set(t, r < 0)
      } else {
        var l = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.SubLevels;
        if (l)
          for (const a of l) o.set(a, !0)
      }
    return !o.size || this.LoadSubLevels(o)
  }
  static async LoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel;
    let l = r.GetPreloadSubLevel(e);
    if (l) return r.MovePreloadSubLevelToSubLevel(e), 1 === l.LoadState && await l.LoadPromise.Promise, await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel"), !0;
    if (l = r.GetSubLevel(e)) {
      if (2 === l.LoadState) return await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel"), !0
    } else l = r.AddSubLevel(e, o);
    return 0 === l.LoadState && (r = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(FNameUtil_1.FNameUtil.GetDynamicFName(e), l.LoadVisibleParam, !1), l.LinkId = r, Log_1.Log.CheckInfo()) && Log_1.Log.Info("World", 3, "SubLevelController:加载子关卡", ["Path", e], ["LinkId", r]), await l.LoadPromise.Promise
  }
  static async LoadSubLevels(e) {
    var o, r, l, t, a = new Array;
    for ([o, r] of e) r && a.push(SubLevelController.LoadSubLevel(o, r));
    for ([l, t] of e) t || a.push(SubLevelController.LoadSubLevel(l, t));
    return await Promise.all(a), !0
  }
  static async WaitSubLevelsLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel,
      o = e.GetAllSubLevels(),
      e = e.GetAllPreloadSubLevels();
    if (o.size || e.size) {
      var r, l, t = new Array;
      for ([, r] of e) 1 === r.LoadState && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的预加载的关卡", ["path", r.Path]), t.push(r.LoadPromise.Promise));
      for ([, l] of o) 1 === l.LoadState && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的加载的关卡", ["path", l.Path]), t.push(l.LoadPromise.Promise));
      t.length && await Promise.all(t)
    }
    return !0
  }
  static async WaitSubLevelsUnLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel.GetAllUnloadSubLevels();
    if (e.size) {
      var o, r = new Array;
      for ([, o] of e) r.push(o.UnLoadPromise.Promise);
      r.length && await Promise.all(r)
    }
    return !0
  }
  static OnLoadSubLevel(e, o, r) {
    var l, t = ModelManager_1.ModelManager.SubLevelModel;
    let a = void 0;
    for ([, l] of t.GetAllPreloadSubLevels())
      if (l.LinkId === e) {
        a = l;
        break
      } if (!a)
      for (var [, n] of t.GetAllSubLevels())
        if (n.LinkId === e) {
          a = n;
          break
        } if (!a && (a = t.GetUnloadSubLevel(o))) return a.LoadPromise?.SetResult(!0), t = FNameUtil_1.FNameUtil.GetDynamicFName(a.Path), void(a.UnLoadLinkId = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(t, !0));
    a ? (a.OnLevelLoad(r), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 18, "SubLevelController:子关卡加载完成", ["Level", o], ["LinkId", e], ["LevelStreaming", r?.IsValid()])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameMode", 3, "SubLevelController:加载的子关卡不存在", ["LinkId", e], ["Level", o], ["LevelStreaming", r?.IsValid()])
  }
  static OnUnLoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel,
      l = r.GetUnloadSubLevel(o);
    l ? (r.RemoveUnloadSubLevel(o), l.UnLoadPromise.SetResult(!0), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:子关卡卸载完成", ["Level", o], ["unloadLinkId", e], ["LoadLinkId", l.LinkId])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("GameMode", 3, "SubLevelController.切换子关卡:卸载的子关卡不存在", ["LinkId", e], ["Level", o])
  }
  static SetSubLevelVisible(e) {
    this.cYt(0).SetSubLevelVisible(e)
  }
}(exports.SubLevelController = SubLevelController).aWs = void 0, SubLevelController.b0r = e => {
  let o = void 0,
    r = void 0;
  var l = ModelManager_1.ModelManager.AutoRunModel;
  if (e.$Ds && -1 !== e.$Ds) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.$Ds);
    if (t) {
      var a = t.Transform.Pos,
        a = (a && (o = Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0)), t.Transform.Rot);
      a && (r = Rotator_1.Rotator.Create(a.Y ?? 0, a.Z ?? 0, a.X ?? 0))
    } else if (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[SubLevelController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。", ["TeleportEntityId", e.$Ds]), !l?.IsInAfterRunningState()) return
  }
  l?.IsInAfterRunningState() && (l.ShouldTpAfterSkip ? (t = l.GetOverrideTpInfo() ?? l.GetGuaranteeTpInfo()) && (o = t.Location, r = t.Rotator) : (o = void 0, r = void 0));
  const n = new Array;
  var i = new Array;
  const s = new Array;
  a = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
  if (a)
    for (var [L] of a)(e.FDs.includes(L) ? i : n).push(L);
  for (const _ of e.FDs) i.includes(_) || s.push(_);
  SubLevelController.ChangeSubLevel(n, s, 0, o, r, e => {
    e || Log_1.Log.CheckError() && Log_1.Log.Error("InstanceDungeon", 39, "SubLevelController 加载子关卡失败", ["unloads", n], ["newLoads", s]), ModelManager_1.ModelManager.AutoRunModel?.IsInAfterRunningState() && ModelManager_1.ModelManager.AutoRunModel.StopAutoRunAndClearInfo()
  })
}, SubLevelController.q0r = e => {
  SubLevelController.LoadOrUnloadSubLevel(e.HDs, e.H$_)
};
//# sourceMappingURL=SubLevelController.js.map