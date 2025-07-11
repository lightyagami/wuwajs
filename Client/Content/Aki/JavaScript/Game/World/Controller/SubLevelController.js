"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevelController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ControllerWithAssistantBase_1 = require("../../Module/GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const GameModePromise_1 = require("../Define/GameModePromise");
const AsyncTask_1 = require("../Task/AsyncTask");
const TaskSystem_1 = require("../Task/TaskSystem");
const WorldGlobal_1 = require("../WorldGlobal");
const SubLevelVisibleAssistant_1 = require("./SubLevelAssistant/SubLevelVisibleAssistant");
class SubLevelInfo {
  constructor(e, o, r, l, t, a) {
    this.UnloadLevels = undefined;
    this.Levels = undefined;
    this.ScreenEffect = 0;
    this.Location = undefined;
    this.Rotator = undefined;
    this.Callback = undefined;
    this.UnloadLevels = e;
    this.Levels = o;
    this.ScreenEffect = r;
    this.Location = l ?? undefined;
    this.Rotator = t ?? undefined;
    this.Callback = a ?? undefined;
  }
  Clear() {
    this.UnloadLevels = undefined;
    this.Levels = undefined;
    this.ScreenEffect = 0;
    this.Location = undefined;
    this.Rotator = undefined;
    this.Callback = undefined;
  }
}
class SubLevelController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var e = super.OnInit();
    this.aWs = new Queue_1.Queue();
    return e;
  }
  static OnClear() {
    var e = super.OnClear();
    this.aWs?.Clear();
    this.aWs = undefined;
    return e;
  }
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.Register(16766, SubLevelController.b0r);
    Net_1.Net.Register(27169, SubLevelController.q0r);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16766);
    Net_1.Net.UnRegister(27169);
    super.OnUnRegisterNetEvent();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new SubLevelVisibleAssistant_1.SubLevelVisibleAssistant());
  }
  static cYt(e) {
    return this.Assistants.get(e);
  }
  static LoadOrUnloadSubLevel(e, r) {
    if (e?.length) {
      var o = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
      const n = new Array();
      const i = new Array();
      var l;
      var t = new Set();
      for (const s of e) {
        t.add(s);
        var a = ModelManager_1.ModelManager.SubLevelModel.GetSubLevel(s);
        if (!a || a.IsVisible !== !r.includes(s)) {
          i.push(s);
        }
      }
      for ([l] of o) {
        if (!t.has(l)) {
          n.push(l);
        }
      }
      if (n.length || i.length) {
        ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("LoadOrUnloadSubLevel");
        e = new AsyncTask_1.AsyncTask("LoadOrUnloadSubLevel", async () => {
          const o = new CustomPromise_1.CustomPromise();
          SubLevelController.ChangeSubLevel(n, i, 0, undefined, undefined, e => {
            if (!e) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("InstanceDungeon", 3, "SubLevelController.加载或者卸载子关卡失败", ["unloads", n], ["newLoads", i]);
              }
            }
            ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("LoadOrUnloadSubLevel");
            if (e && ModelManager_1.ModelManager.GameModeModel.MapDone) {
              ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
            }
            o.SetResult(e);
          }, r);
          return o.Promise;
        });
        TaskSystem_1.TaskSystem.AddTask(e);
        TaskSystem_1.TaskSystem.Run();
      }
    }
  }
  static ChangeSubLevel(e, o, r, l, t, a, n) {
    var i = new Map();
    for (const L of o) {
      var s = n?.indexOf(L) ?? -1;
      i.set(L, s < 0);
    }
    this.Lfr(e, i, r, l, t, a);
  }
  static hWs(e) {
    if (e) {
      this.aWs?.Push(e);
    }
  }
  static async Lfr(r, l, t, a, n, i) {
    var s = ModelManager_1.ModelManager.GameModeModel;
    var L = ModelManager_1.ModelManager.SubLevelLoadingModel;
    if (s.WorldDone) {
      if (L.LoadSubLeveling) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 3, "SubLevelController.当前正在加载子关卡，等所有子关卡加载完成才能继续加载新的子关卡。");
        }
        this.hWs(new SubLevelInfo(r, l, t, a, n, i));
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(开始)", ["卸载的子关卡", r?.join()], ["加载的子关卡", l?.keys()], ["位置", a], ["旋转", n]);
        }
        L.LoadSubLeveling = true;
        L.LoadSubLevelPromise = new GameModePromise_1.GameModePromise();
        if ((ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = t) !== 0 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(14, 3), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(完成)");
        }
        let e = false;
        for (var [_] of l) {
          _ = ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(_);
          if (!_ || _.LoadState === 1) {
            e = true;
            break;
          }
        }
        s = "SubLevelController.ChangeSubLevelInternal";
        let o = false;
        if (e && !ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformsEmpty()) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, s);
          o = true;
        }
        if (a) {
          Global_1.Global.BaseCharacter?.KuroSetMovementMode({
            Mode: 0,
            Context: "[SubLevelController.ChangeSubLevelInternal]"
          });
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(开始)");
        }
        await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表卸载(结束)");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表加载(开始)");
        }
        await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsLoad();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "SubLevelController.切换子关卡:等待之前的子关卡列表加载(结束)");
        }
        if (r?.length) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(开始)");
          }
          for (const v of r) {
            ModelManager_1.ModelManager.SubLevelModel.RemoveSubLevel(v);
          }
          await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(完成)");
          }
        }
        if (l?.size && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(开始)"), await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevels(l), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubLevelAdded), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(完成)");
        }
        await SubLevelController.Dfr(a, n);
        if (o) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, s);
        }
        if (t !== 0 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(14, 1), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(完成)");
        }
        L.LoadSubLevelPromise.SetResult(true);
        L.LoadSubLevelPromise = undefined;
        L.LoadSubLeveling = false;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(完成)");
        }
        i?.(true);
        this.lWs();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 3, "SubLevelController.切换子关卡:WorldDone为false,切换子关卡失败。");
      }
      i?.(false);
    }
  }
  static lWs() {
    var e;
    if (!!this.aWs && !(this.aWs.Size <= 0)) {
      if (this.aWs.Size !== 0) {
        if (e = this.aWs.Front) {
          this.aWs.Pop();
          this.Lfr(e.UnloadLevels, e.Levels, e.ScreenEffect, e.Location, e.Rotator, e.Callback);
        } else {
          this.aWs.Pop();
        }
      }
    }
  }
  static async Dfr(e, o) {
    if (!Global_1.Global.BaseCharacter) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(开始)");
      }
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "SubLevelController:等待加载编队(完成)");
      }
    }
    if (e && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家位置、地面修正(开始)", ["Location", e]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportStart, true), EventSystem_1.EventSystem.EmitWithTarget(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, EventDefine_1.EEventName.TeleportStartEntity, true), ControllerHolder_1.ControllerHolder.GameModeController.FixBornLocation(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTeleportComplete), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, 0), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家位置、地面修正(结束)", ["修正后的Location", Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy]);
    }
    if (o && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家旋转(开始)", ["Rotator", o]), Global_1.Global.BaseCharacter.CharacterActorComponent.SetInputRotator(o), Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(WorldGlobal_1.WorldGlobal.ToUeRotator(o), "SubLevelController.切换子关卡:设置玩家旋转", false), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator()), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:设置玩家旋转(结束)", ["Rotator", Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy]);
    }
  }
  static async PreloadSubLevel(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel;
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 29, "SubLevelController.预加载子关卡:WorldDone为false,预加载子关卡失败");
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 29, "SubLevelController.预加载子关卡:(开始)", ["加载的子关卡", e?.join()]);
    }
    var r = new Array();
    for (const l of e) {
      if (!o.GetPreloadOrLoadedSubLevel(l)) {
        r.push(l);
      }
    }
    if (r?.length) {
      await SubLevelController.yW_(r);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 29, "SubLevelController.预加载子关卡:(完成)");
    }
    return true;
  }
  static async yW_(e) {
    var o = ModelManager_1.ModelManager.SubLevelModel;
    var r = new Array();
    for (const a of e) {
      var l;
      var t = o.AddPreloadSubLevel(a);
      if (t && (t.LoadState = 1, r.push(t.LoadPromise.Promise), l = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(FNameUtil_1.FNameUtil.GetDynamicFName(a), t.LoadVisibleParam, false), t.LinkId = l, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("World", 3, "SubLevelController.切换子关卡:加载子关卡(预加载)", ["Path", t.Path], ["LinkId", l]);
      }
    }
    await Promise.all(r);
    return true;
  }
  static async CheckLoadSubLevels(e) {
    var o = new Map();
    if (e.URs?.length) {
      for (const t of e.URs) {
        var r = e.j$_.indexOf(t);
        o.set(t, r < 0);
      }
    } else {
      var l = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.SubLevels;
      if (l) {
        for (const a of l) {
          o.set(a, true);
        }
      }
    }
    return !o.size || this.LoadSubLevels(o);
  }
  static async LoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel;
    let l = r.GetPreloadSubLevel(e);
    if (l) {
      r.MovePreloadSubLevelToSubLevel(e);
      if (l.LoadState === 1) {
        await l.LoadPromise.Promise;
      }
      await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel");
      return true;
    }
    if (l = r.GetSubLevel(e)) {
      if (l.LoadState === 2) {
        await l.SetLevelVisible(o, "SubLevelController.LoadSubLevel");
        return true;
      }
    } else {
      l = r.AddSubLevel(e, o);
    }
    if (l.LoadState === 0 && (r = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(FNameUtil_1.FNameUtil.GetDynamicFName(e), l.LoadVisibleParam, false), l.LinkId = r, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("World", 3, "SubLevelController:加载子关卡", ["Path", e], ["LinkId", r]);
    }
    return await l.LoadPromise.Promise;
  }
  static async LoadSubLevels(e) {
    var o;
    var r;
    var l;
    var t;
    var a = new Array();
    for ([o, r] of e) {
      if (r) {
        a.push(SubLevelController.LoadSubLevel(o, r));
      }
    }
    for ([l, t] of e) {
      if (!t) {
        a.push(SubLevelController.LoadSubLevel(l, t));
      }
    }
    await Promise.all(a);
    return true;
  }
  static async WaitSubLevelsLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel;
    var o = e.GetAllSubLevels();
    var e = e.GetAllPreloadSubLevels();
    if (o.size || e.size) {
      var r;
      var l;
      var t = new Array();
      for ([, r] of e) {
        if (r.LoadState === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的预加载的关卡", ["path", r.Path]);
          }
          t.push(r.LoadPromise.Promise);
        }
      }
      for ([, l] of o) {
        if (l.LoadState === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的加载的关卡", ["path", l.Path]);
          }
          t.push(l.LoadPromise.Promise);
        }
      }
      if (t.length) {
        await Promise.all(t);
      }
    }
    return true;
  }
  static async WaitSubLevelsUnLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel.GetAllUnloadSubLevels();
    if (e.size) {
      var o;
      var r = new Array();
      for ([, o] of e) {
        r.push(o.UnLoadPromise.Promise);
      }
      if (r.length) {
        await Promise.all(r);
      }
    }
    return true;
  }
  static OnLoadSubLevel(e, o, r) {
    var l;
    var t = ModelManager_1.ModelManager.SubLevelModel;
    let a = undefined;
    for ([, l] of t.GetAllPreloadSubLevels()) {
      if (l.LinkId === e) {
        a = l;
        break;
      }
    }
    if (!a) {
      for (var [, n] of t.GetAllSubLevels()) {
        if (n.LinkId === e) {
          a = n;
          break;
        }
      }
    }
    if (!a && (a = t.GetUnloadSubLevel(o))) {
      a.LoadPromise?.SetResult(true);
      t = FNameUtil_1.FNameUtil.GetDynamicFName(a.Path);
      a.UnLoadLinkId = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(t, true);
      return;
    }
    if (a) {
      a.OnLevelLoad(r).then(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 18, "SubLevelController:子关卡加载完成", ["Level", o], ["LinkId", e], ["LevelStreaming", r?.IsValid()]);
        }
      });
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GameMode", 3, "SubLevelController:加载的子关卡不存在", ["LinkId", e], ["Level", o], ["LevelStreaming", r?.IsValid()]);
    }
  }
  static OnUnLoadSubLevel(e, o) {
    var r = ModelManager_1.ModelManager.SubLevelModel;
    var l = r.GetUnloadSubLevel(o);
    if (l) {
      r.RemoveUnloadSubLevel(o);
      l.UnLoadPromise.SetResult(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:子关卡卸载完成", ["Level", o], ["unloadLinkId", e], ["LoadLinkId", l.LinkId]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GameMode", 3, "SubLevelController.切换子关卡:卸载的子关卡不存在", ["LinkId", e], ["Level", o]);
    }
  }
  static SetSubLevelVisible(e) {
    this.cYt(0).SetSubLevelVisible(e);
  }
}
(exports.SubLevelController = SubLevelController).aWs = undefined;
SubLevelController.b0r = e => {
  let o = undefined;
  let r = undefined;
  var l = ModelManager_1.ModelManager.AutoRunModel;
  if (e.$Ds && e.$Ds !== -1) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.$Ds);
    if (t) {
      var a = t.Transform.Pos;
      if (a) {
        o = Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0);
      }
      var a = t.Transform.Rot;
      if (a) {
        r = Rotator_1.Rotator.Create(a.Y ?? 0, a.Z ?? 0, a.X ?? 0);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[SubLevelController.SceneSubLevelsChangedNotify] 要传送的TeleportEntityId不存在。", ["TeleportEntityId", e.$Ds]);
      }
      if (!l?.IsInAfterRunningState()) {
        return;
      }
    }
  }
  if (l?.IsInAfterRunningState()) {
    if (l.ShouldTpAfterSkip) {
      if (t = l.GetOverrideTpInfo() ?? l.GetGuaranteeTpInfo()) {
        o = t.Location;
        r = t.Rotator;
      }
    } else {
      o = undefined;
      r = undefined;
    }
  }
  const n = new Array();
  var i = new Array();
  const s = new Array();
  a = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
  if (a) {
    for (var [L] of a) {
      (e.FDs.includes(L) ? i : n).push(L);
    }
  }
  for (const _ of e.FDs) {
    if (!i.includes(_)) {
      s.push(_);
    }
  }
  SubLevelController.ChangeSubLevel(n, s, 0, o, r, e => {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 39, "SubLevelController 加载子关卡失败", ["unloads", n], ["newLoads", s]);
      }
    }
    if (ModelManager_1.ModelManager.AutoRunModel?.IsInAfterRunningState()) {
      ModelManager_1.ModelManager.AutoRunModel.StopAutoRunAndClearInfo();
    }
  });
};
SubLevelController.q0r = e => {
  SubLevelController.LoadOrUnloadSubLevel(e.HDs, e.H$_);
}; //# sourceMappingURL=SubLevelController.js.map