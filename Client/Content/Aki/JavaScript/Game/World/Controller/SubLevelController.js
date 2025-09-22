"use strict";

var _a;
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
const LoadLevelDefine_1 = require("../Define/LoadLevelDefine");
const AsyncTask_1 = require("../Task/AsyncTask");
const TaskSystem_1 = require("../Task/TaskSystem");
const WorldGlobal_1 = require("../WorldGlobal");
const SubLevelVisibleAssistant_1 = require("./SubLevelAssistant/SubLevelVisibleAssistant");
class SubLevelController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var e = super.OnInit();
    this.$Er = new Queue_1.Queue();
    return e;
  }
  static OnClear() {
    var e = super.OnClear();
    this.$Er?.Clear();
    this.$Er = undefined;
    return e;
  }
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent();
    Net_1.Net.Register(28871, SubLevelController.b0r);
    Net_1.Net.Register(26243, SubLevelController.q0r);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28871);
    Net_1.Net.UnRegister(26243);
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
      var a = new Set();
      for (const L of e) {
        a.add(L);
        var t = ModelManager_1.ModelManager.SubLevelModel.GetSubLevel(L);
        if (!t || t.IsVisible !== !r.includes(L)) {
          i.push(L);
        }
      }
      for ([l] of o) {
        if (!a.has(l)) {
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
  static ChangeSubLevel(e, o, r, l, a, t, n) {
    var i = new Map();
    for (const s of o) {
      var L = n?.indexOf(s) ?? -1;
      i.set(s, L < 0);
    }
    o = {
      LevelsWithVisible: i,
      UnloadLevels: e,
      ScreenEffect: r,
      Location: l,
      Rotator: a,
      FinishCallback: t
    };
    e = new LoadLevelDefine_1.SwitchSubLevelProcess(o);
    if (this.$Er.Empty) {
      this.$Er.Push(e);
      this.e9d();
    } else {
      this.$Er.Push(e);
    }
  }
  static async Lfr(e, o, r, l, a) {
    var t;
    var n = ModelManager_1.ModelManager.GameModeModel;
    var i = ModelManager_1.ModelManager.SubLevelLoadingModel;
    if (!n.WorldDone) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 3, "SubLevelController.切换子关卡:WorldDone为false,切换子关卡失败。");
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(开始)", ["卸载的子关卡", e], ["加载的子关卡", o], ["位置", l], ["旋转", a]);
    }
    i.LoadSubLevelPromise = new GameModePromise_1.GameModePromise();
    if ((ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect = r) !== 0 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(14, 3), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:打开黑幕Loading界面(完成)");
    }
    let L = false;
    for ([t] of o) {
      var s = ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(t);
      if (!s || s.LoadState === 1) {
        L = true;
        break;
      }
    }
    n = "SubLevelController.ChangeSubLevelInternal";
    let _ = false;
    if (L && !ModelManager_1.ModelManager.LevelLoadingModel.CheckLoadingPerformsEmpty()) {
      ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, n);
      _ = true;
    }
    if (l) {
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
    if (e?.length) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(开始)");
      }
      for (const v of e) {
        ModelManager_1.ModelManager.SubLevelModel.RemoveSubLevel(v);
      }
      await ControllerHolder_1.ControllerHolder.SubLevelController.WaitSubLevelsUnLoad();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:卸载子关卡列表(完成)");
      }
    }
    if (o?.size && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(开始)"), await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevels(o), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubLevelAdded), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:加载子关卡列表(完成)");
    }
    await SubLevelController.Dfr(l, a);
    if (_) {
      ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, n);
    }
    if (r !== 0 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(14, 1), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:关闭黑幕Loading界面(完成)");
    }
    i.LoadSubLevelPromise.SetResult(true);
    i.LoadSubLevelPromise = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 3, "SubLevelController.切换子关卡:(完成)");
    }
    return true;
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
    for (const t of e) {
      var l;
      var a = o.AddPreloadSubLevel(t);
      if (a && (a.LoadState = 1, r.push(a.LoadPromise.Promise), l = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(FNameUtil_1.FNameUtil.GetDynamicFName(t), a.LoadVisibleParam, false), a.LinkId = l, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("World", 3, "SubLevelController.切换子关卡:加载子关卡(预加载)", ["Path", a.Path], ["LinkId", l]);
      }
    }
    await Promise.all(r);
    return true;
  }
  static async CheckLoadSubLevels(e) {
    var o = new Map();
    if (e.URs?.length) {
      for (const a of e.URs) {
        var r = e.j$_.indexOf(a);
        o.set(a, r < 0);
      }
    } else {
      var l = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.SubLevels;
      if (l) {
        for (const t of l) {
          o.set(t, true);
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
    var a;
    var t = new Array();
    for ([o, r] of e) {
      if (r) {
        t.push(SubLevelController.LoadSubLevel(o, r));
      }
    }
    for ([l, a] of e) {
      if (!a) {
        t.push(SubLevelController.LoadSubLevel(l, a));
      }
    }
    await Promise.all(t);
    return true;
  }
  static async WaitSubLevelsLoad() {
    var e = ModelManager_1.ModelManager.SubLevelModel;
    var o = e.GetAllSubLevels();
    var e = e.GetAllPreloadSubLevels();
    if (o.size || e.size) {
      var r;
      var l;
      var a = new Array();
      for ([, r] of e) {
        if (r.LoadState === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的预加载的关卡", ["path", r.Path]);
          }
          a.push(r.LoadPromise.Promise);
        }
      }
      for ([, l] of o) {
        if (l.LoadState === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 18, "SubLevelController.切换子关卡:等待之前的加载的关卡", ["path", l.Path]);
          }
          a.push(l.LoadPromise.Promise);
        }
      }
      if (a.length) {
        await Promise.all(a);
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
    var a = ModelManager_1.ModelManager.SubLevelModel;
    let t = undefined;
    for ([, l] of a.GetAllPreloadSubLevels()) {
      if (l.LinkId === e) {
        t = l;
        break;
      }
    }
    if (!t) {
      for (var [, n] of a.GetAllSubLevels()) {
        if (n.LinkId === e) {
          t = n;
          break;
        }
      }
    }
    if (!t && (t = a.GetUnloadSubLevel(o))) {
      t.LoadPromise?.SetResult(true);
      a = FNameUtil_1.FNameUtil.GetDynamicFName(t.Path);
      t.UnLoadLinkId = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(a, true);
      return;
    }
    if (t) {
      t.OnLevelLoad(r).then(() => {
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
  static e9d() {
    var e;
    if (this.$Er && !this.$Er.Empty) {
      e = this.$Er.Front;
      this.t9d(e);
    }
  }
  static async t9d(e) {
    let o = false;
    switch (e.Type) {
      case 0:
        o = await this.Lfr(e.Params.UnloadLevels, e.Params.LevelsWithVisible, e.Params.ScreenEffect, e.Params.Location, e.Params.Rotator);
        break;
      case 1:
        o = await this.cYt(0).SetSubLevelVisible(e.Params);
    }
    SubLevelController.mj1(o);
  }
  static SetSubLevelVisible(e) {
    e = new LoadLevelDefine_1.SetSubLevelVisibleProcess(e);
    if (this.$Er.Empty) {
      this.$Er.Push(e);
      this.e9d();
    } else {
      this.$Er.Push(e);
    }
  }
}
exports.SubLevelController = SubLevelController;
(_a = SubLevelController).$Er = undefined;
SubLevelController.b0r = e => {
  let o = undefined;
  let r = undefined;
  var l = ModelManager_1.ModelManager.AutoRunModel;
  if (e.$Ds && e.$Ds !== -1) {
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e.$Ds);
    if (a) {
      var t = a.Transform.Pos;
      if (t) {
        o = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
      }
      var t = a.Transform.Rot;
      if (t) {
        r = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0);
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
      if (a = l.GetOverrideTpInfo() ?? l.GetGuaranteeTpInfo()) {
        o = a.Location;
        r = a.Rotator;
      }
    } else {
      o = undefined;
      r = undefined;
    }
  }
  const n = new Array();
  var i = new Array();
  const L = new Array();
  t = ModelManager_1.ModelManager.SubLevelModel.GetAllSubLevels();
  if (t) {
    for (var [s] of t) {
      (e.FDs.includes(s) ? i : n).push(s);
    }
  }
  for (const _ of e.FDs) {
    if (!i.includes(_)) {
      L.push(_);
    }
  }
  SubLevelController.ChangeSubLevel(n, L, 0, o, r, e => {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 39, "SubLevelController 加载子关卡失败", ["unloads", n], ["newLoads", L]);
      }
    }
    if (ModelManager_1.ModelManager.AutoRunModel?.IsInAfterRunningState()) {
      ModelManager_1.ModelManager.AutoRunModel.StopAutoRunAndClearInfo();
    }
  });
};
SubLevelController.q0r = e => {
  SubLevelController.LoadOrUnloadSubLevel(e.HDs, e.H$_);
};
SubLevelController.mj1 = e => {
  _a.$Er?.Pop()?.Params.FinishCallback?.(e);
  _a.e9d();
}; //# sourceMappingURL=SubLevelController.js.map