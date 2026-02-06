"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroSimpleCombatController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const KSCBuffById_1 = require("../../Core/Define/ConfigQuery/KSCBuffById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Net_1 = require("../../Core/Net/Net");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const KscActionBuffLayoutUpdate_1 = require("./KscAction/KscActionBuffLayoutUpdate");
const KscActionBuffModifyLocal_1 = require("./KscAction/KscActionBuffModifyLocal");
const KscActionBuffsAdd_1 = require("./KscAction/KscActionBuffsAdd");
const KscActionBuffUpdate_1 = require("./KscAction/KscActionBuffUpdate");
const KscActionEntityAdd_1 = require("./KscAction/KscActionEntityAdd");
const KscActionEntityRemove_1 = require("./KscAction/KscActionEntityRemove");
const KscData_1 = require("./KscData");
const KscEntityHandle_1 = require("./KscEntityHandle");
const KscEnv_1 = require("./KscEnv");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
const MotorcycleArrowSubController_1 = require("./MA/MotorcycleArrowSubController");
const SurvivorsRogueSubController_1 = require("./SR/SurvivorsRogueSubController");
const TDPlayerController_1 = require("./TD/TDPlayer/TDPlayerController");
const TowerDefenseSubController_1 = require("./TD/TowerDefenseSubController");
class KuroSimpleCombatController extends ControllerBase_1.ControllerBase {
  static get MapInit() {
    return this.ECd;
  }
  static get WorldInit() {
    return this.ICd;
  }
  static get CurSubModel() {
    return this.CurSubController?.Model;
  }
  static GetSubController(t) {
    return this.DSd.get(t);
  }
  static GetSubModel(t) {
    return this.GetSubController(t)?.Model;
  }
  static OnInit() {
    this.PauseTick();
    for (var [t, e] of this.DSd) {
      e.Init(t);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGameModeDataDone, KuroSimpleCombatController.dYc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, KuroSimpleCombatController.k2a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, KuroSimpleCombatController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, KuroSimpleCombatController.mYc);
    Net_1.Net.Register(27907, KuroSimpleCombatController.GKu);
    Net_1.Net.Register(26322, KuroSimpleCombatController.qSd);
    Net_1.Net.Register(22777, KuroSimpleCombatController.wId);
    return true;
  }
  static OnClear() {
    for (const t of this.DSd.values()) {
      t.Clear();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGameModeDataDone, KuroSimpleCombatController.dYc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, KuroSimpleCombatController.k2a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, KuroSimpleCombatController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, KuroSimpleCombatController.mYc);
    Net_1.Net.UnRegister(27907);
    Net_1.Net.UnRegister(26322);
    this.StopKscHeadStateManager();
    return true;
  }
  static OnLeaveLevel() {
    this.StopKscHeadStateManager();
    return true;
  }
  static OnPreload() {
    return this.CurSubController?.OnPreload() ?? undefined;
  }
  static OnTick(t) {
    var e = KscEnv_1.KscEnv.KscWorld;
    if (e) {
      this.CurSubController?.Tick(t);
      e.GetEntityPositionsEx(this.vbd);
      TDPlayerController_1.TowerDefensePlayerController.SyncMainLocations(t);
    }
  }
  static GetSkillPathDt(t) {
    return this.CurSubModel.SkillDataDt.get(t)?.[1];
  }
  static GetSkillRowDt(t) {
    return this.CurSubModel.SkillDataDt.get(t)?.[0];
  }
  static GetSkillDataDt(t) {
    return this.CurSubModel.SkillDataDt.get(t);
  }
  static GetAllSkillDataDt() {
    return this.CurSubModel.SkillDataDt;
  }
  static async LoadBuffAssets(t) {
    const s = new Map();
    t = t.map(async i => new Promise((e, o) => {
      const r = Number.parseInt(i);
      var t = KSCBuffById_1.configKSCBuffById.GetConfig(r)?.AssetPath;
      if (t) {
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: r,
          Path: t,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: t => {
            s.set(r, t);
            e();
          },
          FailCallback: t => {
            o(new Error(t));
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      } else {
        KscLog_1.KscLog.Error("Load", 17, KscEnv_1.KscEnv.KscWorld, "Buff加载路径非法", ["buffId", r], ["path", t]);
        o(new Error(`Buff${r}安全加载路径非法`));
      }
    }));
    await Promise.all(t);
    return s;
  }
  static AddEntityImpl(t, e) {
    var o;
    var r = KscEnv_1.KscEnv.KscWorld?.D_AddDaEntity(t, e.Transform, e.IsPreview, e.CreatureId ?? -1);
    if (r) {
      if (e.Faction !== undefined) {
        r.SetFaction(e.Faction);
      }
      if (t.IsA(UE.KSC_DA_Entity_Enemy.StaticClass()) && e.Spline) {
        r.GetMoveComponent()?.SetSpline(e.Spline);
      }
      if (t.IsA(UE.KSC_DA_Entity_Tower.StaticClass()) && e.RenderActor) {
        r.SetRenderActor(e.RenderActor);
      }
      o = new KscEntityHandle_1.KscEntityHandle(r, e.CreatureId);
      this.CurSubModel.KscEntities.set(r.EntityId_, o);
      if (e.PropertyId) {
        this.CurSubController.SetAttrs(r, e.PropertyId, e.AttributeMap);
      }
      this.CurSubModel.SetLogicProxy(e.CreatureId, r.EntityId_);
      return r;
    }
    KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "加入战斗实体失败", ["asset", t.GetName()]);
  }
  static AsyncAddEntity(t) {
    t = new KscActionEntityAdd_1.KscActionEntityAdd(t);
    this.CurSubModel?.EntityProcessMgr.RunTask(t.Task);
  }
  static RemoveEntityImpl(t, e) {
    var o;
    var r = this.CurSubModel.KscEntities.get(t);
    if (r && r.Valid) {
      if (this.CurSubModel.KscPlayerEntity === r.KscEntity) {
        this.CurSubModel.SetKscPlayerEntity(undefined, 0);
      }
      o = r.CreatureDataId;
      KscEnv_1.KscEnv.KscWorld?.RemoveEntityReason(r.KscEntity, e);
      this.CurSubModel.KscEntities.delete(t);
      this.CurSubModel.RemoveLogicProxy(o);
    } else {
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "移除战斗实体失败", ["id", t]);
    }
  }
  static RemoveEntity(t, e) {
    t = new KscActionEntityRemove_1.KscActionEntityRemove(t, e);
    this.CurSubModel?.EntityProcessMgr.RunTask(t.Task);
  }
  static RemoveEntityImplByReasonType(t, e) {
    var o;
    var r;
    var i = this.CurSubModel.KscEntities.get(t);
    if (i && i.Valid) {
      o = KscData_1.kscEntityRemoveReasonList[e];
      if (this.CurSubModel.KscPlayerEntity === i.KscEntity) {
        this.CurSubModel.SetKscPlayerEntity(undefined, 0);
      }
      r = i.CreatureDataId;
      if (e === 0) {
        if (i.KscEntity) {
          i.KscEntity.Dead(0);
        }
      } else {
        KscEnv_1.KscEnv.KscWorld?.RemoveEntityReason(i.KscEntity, o);
      }
      this.CurSubModel.KscEntities.delete(t);
      this.CurSubModel.RemoveLogicProxy(r);
    } else {
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "移除战斗实体失败", ["id", t]);
    }
  }
  static RemoveEntityByReasonType(t, e) {
    t = new KscActionEntityRemove_1.KscActionEntityRemove(t, undefined, e);
    this.CurSubModel?.EntityProcessMgr.RunTask(t.Task);
  }
  static AddEntityDt(e, t, o, r, i) {
    KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "加入Dt战斗实体加载中", ["creatureId", e], ["dt key", t]);
    const s = this.CurSubModel.EntityDataDt.get(t)?.[1];
    if (s) {
      KscUtil_1.KscUtil.AsyncLoadKscAsset({
        Context: KscEnv_1.KscEnv.KscWorld,
        Id: t,
        Path: s,
        NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedEntityDa,
        Callback: t => {
          if (this.ICd) {
            if (t && t?.IsValid()) {
              KscLog_1.KscLog.Info("Load", 84, KscEnv_1.KscEnv.KscWorld, "从Dt加入战斗实体时加载成功", ["Path", s]);
              if ((t = this.AddEntityImpl(t, {
                CreatureId: e,
                PropertyId: o ?? 0,
                Transform: r
              })) && i) {
                i(t);
              }
            } else {
              KscLog_1.KscLog.Warn("Load", 84, KscEnv_1.KscEnv.KscWorld, "从Dt加入战斗实体时加载失败", ["Path", s]);
            }
          } else {
            KscLog_1.KscLog.Warn("Load", 84, KscEnv_1.KscEnv.KscWorld, "战斗实体加载失败，KSC世界已清理");
          }
        },
        KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
      });
    }
  }
  static GetLogicProxy(t) {
    return this.CurSubModel.GetLogicProxy(t) ?? 0;
  }
  static _Wu(e) {
    var t = Protocol_1.Aki.Protocol.Cwu.create();
    t.pWc = e;
    Net_1.Net.Call(24373, t, t => {
      if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "请求实体死亡异常", ["requestInfos", e], ["error", t?.Q4n]);
      }
    });
  }
  static BatchRemove(e) {
    var o = e.Num();
    if (o !== 0) {
      var r = {};
      for (let t = 0; t < o; ++t) {
        this.Qod.InitFromRemoveContext(e.Get(t), this.CurSubModel.KscEntities);
        this.uWu(this.Qod, r, true);
      }
      if (Object.keys(r).length > 0) {
        this._Wu(r);
      }
    }
  }
  static LandFireSpawn(e) {
    var o = e.Num();
    if (o !== 0) {
      var r = {};
      for (let t = 0; t < o; ++t) {
        this.Qod.InitFromLandFireContext(e.Get(t), this.CurSubModel.KscEntities);
        this.uWu(this.Qod, r);
      }
      if (Object.keys(r).length > 0) {
        this._Wu(r);
      }
    }
  }
  static uWu(t, e, o = false) {
    if (this.IsDebugOn()) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(KscEnv_1.KscEnv.KscWorld, t.Location.ToUeVector(), 16, 16, new UE.LinearColor(1, 0, 0, 1), 16);
    }
    if (t.CreatureDataId !== 0) {
      if (this.CurSubController) {
        this.CurSubController.OnEntityRemoved(t, e);
      } else {
        KscLog_1.KscLog.Warn("Common", 60, KscEnv_1.KscEnv.KscWorld, "没有注册OnEntityRemoved回调, 无法批量移除实体");
      }
      if (o) {
        if (e = this.CurSubModel.GetLogicProxy(t.CreatureDataId)) {
          this.CurSubModel.KscEntities.delete(e);
        }
        this.CurSubModel.RemoveLogicProxy(t.CreatureDataId);
      } else {
        this.RemoveEntity(t.CreatureDataId, t.ReasonName);
      }
    }
  }
  static ModifyBuffAsync(t, e, o) {
    var r = this.CurSubModel.KscEntities.get(t);
    if (r && r.Valid) {
      r = new KscActionBuffModifyLocal_1.KscActionBuffModifyLocal(t, e, o);
      this.CurSubModel?.EntityProcessMgr.RunTask(r.Task);
    } else {
      KscLog_1.KscLog.Warn("Skill", 17, KscEnv_1.KscEnv.KscWorld, "刷新buff时失败", ["id", t]);
    }
  }
  static GetEntityPositions() {
    if (KscEnv_1.KscEnv.KscWorld) {
      var e = [];
      var o = (0, puerts_1.$unref)(this.vbd);
      for (let t = 0; t < o.Num(); t++) {
        var r = o.Get(t);
        e.push(r);
      }
      return e;
    }
  }
  static PushSimpleCombatEntityHp(t, e, o) {
    var r = Protocol_1.Aki.Protocol.pGd.create();
    var i = {};
    var s = Protocol_1.Aki.Protocol.MGd.create();
    var n = {
      3: e,
      2: o
    };
    s.vGd = n;
    i[t] = s;
    r.yGd = i;
    Net_1.Net.Send(21551, r);
  }
  static SetDebugOn(t) {
    this.IsDebug = t;
  }
  static IsDebugOn() {
    return this.IsDebug;
  }
  static ToggleDebug() {
    this.IsDebug = !this.IsDebug;
  }
  static get KscHeadStateManager() {
    return this.zjd;
  }
  static StartKscHeadStateManager() {
    this.zjd ||= UE.KSC_HeadStateManager.CreateInstance(GlobalData_1.GlobalData.World);
  }
  static StopKscHeadStateManager() {
    if (this.zjd) {
      UE.KSC_HeadStateManager.DestroyInstance();
      this.zjd = undefined;
    }
  }
  static GmCreateEntity(t, e) {
    var o;
    var r = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.GetEntityPathById(t);
    if (r) {
      if (o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
        if (o = o.GetComponent(1)) {
          o = o.ActorLocationProxy.Addition(o.ActorForwardProxy.Multiply(e, MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.CommonTempVector);
          e = new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, o.ToUeVector(), Vector_1.Vector.OneVectorDouble);
          ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
            CreatureId: -1,
            SimpleCombatId: t,
            AssetPath: r,
            PropertyId: 0,
            Transform: e
          });
        } else {
          KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]baseActorComponent为空");
        }
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]playerEntity为空");
      }
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]实体资产路径不存在", ["simpleCombatId", t]);
    }
  }
  static GmAddBuff(t, e) {
    if (t === 0 && this.CurSubController instanceof MotorcycleArrowSubController_1.MotorcycleArrowSubController) {
      this.CurSubController.EffectManager.AddBuffEffect(e, undefined, true);
    } else if ((t = t === 0 ? this.GmGetPlayerEntityId() : t) !== 0) {
      this.ModifyBuffAsync(t, true, e);
    }
  }
  static GmRemoveBuff(t, e) {
    if (t === 0 && this.CurSubController instanceof MotorcycleArrowSubController_1.MotorcycleArrowSubController) {
      this.CurSubController.EffectManager.RemovePlayerBuff(e);
    } else if ((t = t === 0 ? this.GmGetPlayerEntityId() : t) !== 0) {
      this.ModifyBuffAsync(t, false, e);
    }
  }
  static GmGetPlayerEntityId() {
    return this.CurSubModel?.KscPlayerEntity?.EntityId_ ?? 0;
  }
  static GmAddPlayerEntity() {
    if (this.CurSubController) {
      this.CurSubController.GmAddPlayerEntity();
    }
  }
  static GmPrintInfo() {
    if (this.CurSubController) {
      this.CurSubController.GmPrintInfo();
    }
  }
  static GmCreateKSCWorld(t) {
    if (!this.CurSubController) {
      if (t = this.DSd.get(t)) {
        this.CurSubController = t;
        this.ECd = true;
        this.CurSubController.InitMap();
        this.CurSubController.MapLoaded();
        this.CurSubController.WorldDone();
        this.ResumeTick();
      }
    }
  }
}
exports.KuroSimpleCombatController = KuroSimpleCombatController;
(_a = KuroSimpleCombatController).DSd = new Map([[0, new TowerDefenseSubController_1.TowerDefenseSubController()], [1, new SurvivorsRogueSubController_1.SurvivorsRogueSubController()], [2, new MotorcycleArrowSubController_1.MotorcycleArrowSubController()]]);
KuroSimpleCombatController.CurSubController = undefined;
KuroSimpleCombatController.vbd = (0, puerts_1.$ref)(UE.NewArray(UE.KSC_MiniMapContext));
KuroSimpleCombatController.ECd = false;
KuroSimpleCombatController.ICd = false;
KuroSimpleCombatController.dYc = () => {
  _a.CurSubController = undefined;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType;
    if (t) {
      for (const e of _a.DSd.values()) {
        if (e.IsTargetMap(t)) {
          _a.CurSubController = e;
          break;
        }
      }
    }
    if (_a.CurSubController) {
      _a.ECd = true;
      _a.CurSubController.InitMap();
    }
  }
};
KuroSimpleCombatController.k2a = () => {
  _a.ICd = true;
  if (_a.CurSubController) {
    _a.CurSubController.MapLoaded();
  }
};
KuroSimpleCombatController.nye = () => {
  if (_a.CurSubController) {
    _a.CurSubController.WorldDone();
    _a.ResumeTick();
  }
};
KuroSimpleCombatController.mYc = () => {
  if (_a.ICd) {
    _a.ICd = false;
    _a.CurSubModel?.EntityProcessMgr.CancelAllTask();
    _a.CurSubController?.WorldReset();
  }
  if (_a.ECd) {
    _a.ECd = false;
    _a.CurSubController?.ClearMap();
  }
  (0, puerts_1.$unref)(_a.vbd).Empty();
  _a.CurSubController = undefined;
  _a.PauseTick();
};
KuroSimpleCombatController.Qod = new KscData_1.KscRemoveContext();
KuroSimpleCombatController.GKu = t => {
  if (t.b6n) {
    if (t.F4n) {
      t = new KscActionBuffUpdate_1.KscActionBuffUpdate(t);
      _a.CurSubModel?.EntityProcessMgr.RunTask(t.Task);
    } else {
      KscLog_1.KscLog.Warn("Skill", 38, KscEnv_1.KscEnv.KscWorld, "刷新buff时 Id 为空");
    }
  } else {
    KscLog_1.KscLog.Warn("Skill", 38, KscEnv_1.KscEnv.KscWorld, "刷新buff时 BuffId 为空");
  }
};
KuroSimpleCombatController.qSd = t => {
  if (t.b6n) {
    if (t.F4n) {
      t = new KscActionBuffLayoutUpdate_1.KscActionBuffLayoutUpdate(t);
      _a.CurSubModel?.EntityProcessMgr.RunTask(t.Task);
    } else {
      KscLog_1.KscLog.Warn("Skill", 38, KscEnv_1.KscEnv.KscWorld, "刷新buff Layer时时 Id 为空");
    }
  } else {
    KscLog_1.KscLog.Warn("Skill", 38, KscEnv_1.KscEnv.KscWorld, "刷新buff Layer时 BuffId 为空");
  }
};
KuroSimpleCombatController.wId = t => {
  var e;
  if (t.F4n) {
    if (!!(e = t.Uzc?.JHu) && !(Object.keys(e).length <= 0)) {
      e = new KscActionBuffsAdd_1.KscActionBuffsAdd(t);
      _a.CurSubModel?.EntityProcessMgr.RunTask(e.Task);
    }
  } else {
    KscLog_1.KscLog.Warn("Skill", 60, KscEnv_1.KscEnv.KscWorld, "实体子类型变更时 Id 为空");
  }
};
KuroSimpleCombatController.IsDebug = false;
KuroSimpleCombatController.zjd = undefined; //# sourceMappingURL=KscController.js.map