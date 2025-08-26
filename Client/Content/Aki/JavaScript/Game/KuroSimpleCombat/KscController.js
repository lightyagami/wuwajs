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
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const DamageUiManager_1 = require("../Module/DamageUi/DamageUiManager");
const KscActionBuffLayoutUpdate_1 = require("./KscAction/KscActionBuffLayoutUpdate");
const KscActionBuffsAdd_1 = require("./KscAction/KscActionBuffsAdd");
const KscActionBuffUpdate_1 = require("./KscAction/KscActionBuffUpdate");
const KscActionEntityAdd_1 = require("./KscAction/KscActionEntityAdd");
const KscActionEntityRemove_1 = require("./KscAction/KscActionEntityRemove");
const KscData_1 = require("./KscData");
const KscEntityHandle_1 = require("./KscEntityHandle");
const KscEnv_1 = require("./KscEnv");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
const TowerDefenseSubController_1 = require("./TD/TowerDefenseSubController");
class KuroSimpleCombatController extends ControllerBase_1.ControllerBase {
  static get MapInit() {
    return this.U_d;
  }
  static get WorldInit() {
    return this.B_d;
  }
  static get CurSubModel() {
    return this.CurSubController?.Model;
  }
  static OnInit() {
    this.PauseTick();
    this.TowerDefenseSubController.Init();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGameModeDataDone, KuroSimpleCombatController.AHu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, KuroSimpleCombatController.k2a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, KuroSimpleCombatController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, KuroSimpleCombatController.PHu);
    Net_1.Net.Register(28273, KuroSimpleCombatController.ZHu);
    Net_1.Net.Register(23899, KuroSimpleCombatController.uud);
    Net_1.Net.Register(27104, KuroSimpleCombatController.ncd);
    return true;
  }
  static OnClear() {
    this.TowerDefenseSubController.Clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGameModeDataDone, KuroSimpleCombatController.AHu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, KuroSimpleCombatController.k2a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, KuroSimpleCombatController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, KuroSimpleCombatController.PHu);
    Net_1.Net.UnRegister(28273);
    Net_1.Net.UnRegister(23899);
    return true;
  }
  static OnTick(t) {
    var e = KscEnv_1.KscEnv.KscWorld;
    if (e) {
      this.CurSubController?.Tick();
      e.GetEntityPositionsEx(this.fcd);
      e.GetHeadHpInfos(this.gcd);
      ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.SyncMainLocations(t);
      var o = e.PopHitInfos();
      var r = o.Num();
      for (let t = 0; t < r; t++) {
        var n = o.Get(t);
        DamageUiManager_1.DamageUiManager.ApplyDamageForKsc(n.Damage, n.ElementType, n.Location, n.IsCrit, n.IsCure);
      }
      KuroSimpleCombatController.e$u(e);
    }
  }
  static e$u(t) {
    var e = ControllerHolder_1.ControllerHolder.TowerDefenseUiController.HeadStateManager;
    if (e) {
      var o = (0, puerts_1.$unref)(this.gcd);
      var r = o.Num();
      var n = [];
      for (let t = 0; t < r; t++) {
        var i = o.Get(t);
        if (i.ActionType === 0) {
          e.AddEntity(i.EntityId, i.Location, i.MaxHp, i.CurHp, i.Shield);
        } else if (i.ActionType === 2) {
          n.push(i.EntityId);
        } else {
          e.HandleMsg(i.EntityId, i.Location, i.MaxHp, i.CurHp, i.Shield);
        }
      }
      for (const s of n) {
        e.RemoveEntity(s);
      }
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
    const i = new Map();
    t = t.map(async n => new Promise((e, o) => {
      const r = Number.parseInt(n);
      var t = KSCBuffById_1.configKSCBuffById.GetConfig(r)?.AssetPath;
      if (t) {
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: r,
          Path: t,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: t => {
            i.set(r, t);
            e();
          },
          FailCallback: t => {
            o(new Error(t));
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      } else {
        o(new Error(`Buff${r}安全加载路径非法`));
      }
    }));
    await Promise.all(t);
    return i;
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
      KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防加入战斗实体", ["asset", t.GetName()], ["creature", e.CreatureId]);
      this.CurSubModel.KscEntities.set(r.EntityId_, o);
      if (e.PropertyId) {
        this.CurSubController.SetAttrs(r, e.PropertyId);
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
      KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "移除战斗实体", ["id", t], ["entity", r.KscEntity?.GetName()], ["removeReason", e]);
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
  static AddEntityDt(e, t, o, r, n) {
    KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "加入Dt战斗实体加载中", ["creatureId", e], ["dt key", t]);
    const i = this.CurSubModel.EntityDataDt.get(t)?.[1];
    if (i) {
      KscUtil_1.KscUtil.AsyncLoadKscAsset({
        Context: KscEnv_1.KscEnv.KscWorld,
        Id: t,
        Path: i,
        NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedEntityDa,
        Callback: t => {
          if (this.B_d) {
            if (t && t?.IsValid()) {
              KscLog_1.KscLog.Info("Load", 84, KscEnv_1.KscEnv.KscWorld, "从Dt加入战斗实体时加载成功", ["Path", i]);
              if ((t = this.AddEntityImpl(t, {
                CreatureId: e,
                PropertyId: o ?? 0,
                Transform: r
              })) && n) {
                n(t);
              }
            } else {
              KscLog_1.KscLog.Warn("Load", 84, KscEnv_1.KscEnv.KscWorld, "从Dt加入战斗实体时加载失败", ["Path", i]);
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
  static i$u(e) {
    var t = Protocol_1.Aki.Protocol.Cwu.create();
    t.mju = e;
    KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "请求实体死亡", ["requestInfos", e]);
    Net_1.Net.Call(17855, t, t => {
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
        this.Nid.InitFromRemoveContext(e.Get(t), this.CurSubModel.KscEntities);
        this.r$u(this.Nid, r);
      }
      if (Object.keys(r).length > 0) {
        this.i$u(r);
      }
    }
  }
  static LandFireSpawn(e) {
    var o = e.Num();
    if (o !== 0) {
      var r = {};
      for (let t = 0; t < o; ++t) {
        this.Nid.InitFromLandFireContext(e.Get(t), this.CurSubModel.KscEntities);
        this.r$u(this.Nid, r);
      }
      if (Object.keys(r).length > 0) {
        this.i$u(r);
      }
    }
  }
  static r$u(t, e) {
    if (this.IsDebugOn()) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(KscEnv_1.KscEnv.KscWorld, t.Location.ToUeVector(), 16, 16, new UE.LinearColor(1, 0, 0, 1), 16);
    }
    if (t.CreatureDataId !== 0) {
      if (this.CurSubController) {
        this.CurSubController.OnEntityRemoved(t, e);
      } else {
        KscLog_1.KscLog.Warn("Common", 60, KscEnv_1.KscEnv.KscWorld, "没有注册OnEntityRemoved回调, 无法批量移除实体");
      }
      this.RemoveEntity(t.CreatureDataId, t.ReasonName);
    }
  }
  static GetEntityPositions() {
    if (KscEnv_1.KscEnv.KscWorld) {
      var e = [];
      var o = (0, puerts_1.$unref)(this.fcd);
      for (let t = 0; t < o.Num(); t++) {
        var r = o.Get(t);
        e.push(r);
      }
      return e;
    }
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
}
exports.KuroSimpleCombatController = KuroSimpleCombatController;
(_a = KuroSimpleCombatController).CurSubController = undefined;
KuroSimpleCombatController.TowerDefenseSubController = new TowerDefenseSubController_1.TowerDefenseSubController();
KuroSimpleCombatController.gcd = (0, puerts_1.$ref)(UE.NewArray(UE.KSC_HeadHpContext));
KuroSimpleCombatController.fcd = (0, puerts_1.$ref)(UE.NewArray(UE.KSC_MiniMapContext));
KuroSimpleCombatController.U_d = false;
KuroSimpleCombatController.B_d = false;
KuroSimpleCombatController.AHu = () => {
  _a.CurSubController = undefined;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.InstSubType === 37 && (_a.CurSubController = KuroSimpleCombatController.TowerDefenseSubController), _a.CurSubController)) {
    _a.U_d = true;
    _a.CurSubController.InitMap();
  }
};
KuroSimpleCombatController.k2a = () => {
  _a.B_d = true;
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
KuroSimpleCombatController.PHu = () => {
  if (_a.B_d) {
    _a.B_d = false;
    _a.CurSubModel?.EntityProcessMgr.CancelAllTask();
    _a.CurSubController?.WorldReset();
  }
  if (_a.U_d) {
    _a.U_d = false;
    _a.CurSubController?.ClearMap();
  }
  (0, puerts_1.$unref)(_a.gcd).Empty();
  (0, puerts_1.$unref)(_a.fcd).Empty();
  _a.CurSubController = undefined;
  _a.PauseTick();
};
KuroSimpleCombatController.Nid = new KscData_1.KscRemoveContext();
KuroSimpleCombatController.ZHu = t => {
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
KuroSimpleCombatController.uud = t => {
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
KuroSimpleCombatController.ncd = t => {
  var e;
  if (t.F4n) {
    if (!!(e = t.Rju?.dju) && !(Object.keys(e).length <= 0)) {
      e = new KscActionBuffsAdd_1.KscActionBuffsAdd(t);
      _a.CurSubModel?.EntityProcessMgr.RunTask(e.Task);
    }
  } else {
    KscLog_1.KscLog.Warn("Skill", 60, KscEnv_1.KscEnv.KscWorld, "实体子类型变更时 Id 为空");
  }
};
KuroSimpleCombatController.IsDebug = false; //# sourceMappingURL=KscController.js.map