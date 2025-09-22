"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscSubControllerBase = exports.KscEntityRedirectFilter = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById");
const KSCBasePropertyByKscGameplayType_1 = require("../../Core/Define/ConfigQuery/KSCBasePropertyByKscGameplayType");
const KSCDamageByKscGameplayType_1 = require("../../Core/Define/ConfigQuery/KSCDamageByKscGameplayType");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const UiLayer_1 = require("../Ui/UiLayer");
const KscEnv_1 = require("./KscEnv");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
const DIVIDED_TEN_THOUSAND = 0.0001;
const PLAYER_ENTITY_KEY = 1001;
class KscEntityRedirectFilter {
  constructor() {
    this.lYc = new Set();
    this.TryCreateEntity = e => {
      var t = KscEntityRedirectFilter.KNu;
      t.clear();
      for (const o of e.zEs) {
        var r = o.C3s;
        t.set(r, o);
      }
      var s = t.has("sEu");
      if (t.get("WVu")?.WVu?.KVu?.GNc !== undefined) {
        KscLog_1.KscLog.Info("Common", 60, undefined, "塔防辅助机不拦截", ["CreatureDataId", e.s5n]);
        return false;
      } else {
        if (s) {
          this.lYc.add(MathUtils_1.MathUtils.LongToNumber(e.s5n));
          if (!this.OnCreateEntity(e, t)) {
            KscLog_1.KscLog.Error("Common", 60, undefined, "创建KSC实体数据失败", ["CreatureDataId", e.s5n]);
          }
        }
        t.clear();
        return s;
      }
    };
    this.InstantiateEntities = () => {
      this.OnInstantiateEntities();
    };
    this.TryRemoveEntity = e => !!this.lYc.has(e) && (this.lYc.delete(e), this.OnRemoveEntity(e) || KscLog_1.KscLog.Error("Common", 60, undefined, "移除KSC实体数据失败", ["CreatureDataId", e]), true);
  }
  Reset() {
    this.lYc.clear();
  }
  OnCreateEntity(e, t) {
    return false;
  }
  OnInstantiateEntities() {}
  OnRemoveEntity(e) {
    return false;
  }
}
(exports.KscEntityRedirectFilter = KscEntityRedirectFilter).KNu = new Map();
class KscSubControllerBase {
  constructor() {
    this.iLd = 1;
    this.SubModel = undefined;
    this.RedirectFilter = undefined;
    this.HeadInfos = (0, puerts_1.$ref)(UE.NewArray(UE.KSC_HeadHpContext));
    this.HeadStateScaleCurve = undefined;
    this.HeadStateDynamicBatchActor = undefined;
    this.HeadStateViewActor = undefined;
  }
  get Model() {
    return this.SubModel;
  }
  Init(e) {
    this.CreateModel();
    this.Model.KscGameplayType = e;
    this.OnInit();
  }
  InitMap() {
    this.Model.Init();
    this.InitPropertyConfigs();
    this.InitEntityAndSkillDt();
    this.InitEntityFilter();
    this.OnInitMap();
    this.AddEvents();
  }
  OnPreload() {
    const t = new CustomPromise_1.CustomPromise();
    this.PreloadAsync().then(() => {
      t.SetResult(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("CombatInfo", 17, "Preload异常", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CombatInfo", 17, "Preload异常", ["error", e]);
      }
      t.SetResult(false);
    });
    return ["KSC Preload", t];
  }
  async PreloadAsync() {
    await this.PreloadHeadStateRes();
  }
  MapLoaded() {
    this.vYc();
    this.iLd = 1;
    this.InitDamageConfigs();
    this.OnMapLoaded();
  }
  WorldDone() {
    this.OnWorldDone();
    this.InitHeadStateManagerRes();
    this.AddKscPlayerEntity();
  }
  WorldReset() {
    this.yYc();
    this.RemoveInputLayer();
    this.OnWorldReset();
  }
  ClearMap() {
    this.RemoveEvents();
    this.ResetEntityFilter();
    this.OnClearMap();
    this.ClearHeadState();
    this.Model.Clear();
  }
  Tick(e) {
    if (Time_1.Time.TimeDilation !== this.iLd) {
      this.iLd = Time_1.Time.TimeDilation;
      KscEnv_1.KscEnv.KscWorld?.SetWorldTimeDilation(this.iLd);
    }
    this.SyncPlayerTransform();
    this.HandleHeadHpInfos(e);
    this.PushPlayerHp();
    this.OnTick(e);
  }
  Clear() {
    this.OnClear();
  }
  IsTargetMap(e) {
    return false;
  }
  CreateModel() {}
  ClearModel() {}
  OnInit() {}
  OnInitMap() {}
  OnMapLoaded() {}
  OnWorldDone() {}
  OnWorldReset() {}
  OnClearMap() {}
  OnTick(e) {}
  OnClear() {}
  AddEvents() {}
  RemoveEvents() {}
  vYc() {
    KscEnv_1.KscEnv.Start();
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.StartKscHeadStateManager();
  }
  yYc() {
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.StopKscHeadStateManager();
    KscEnv_1.KscEnv.Stop();
  }
  OnEntityRemoved(e, t) {}
  InitPropertyConfigs() {
    if (this.Model) {
      for (const e of KSCBasePropertyByKscGameplayType_1.configKSCBasePropertyByKscGameplayType.GetConfigList(this.Model.GameplayType)) {
        this.Model.PropertyConfigs.set(e.Id, e);
      }
    }
  }
  SetAttrs(e, t, r) {
    if (e) {
      var s = this.GetAttrsDefault(t);
      if (!s || s.size <= 0) {
        KscLog_1.KscLog.Warn("Attr", 17, KscEnv_1.KscEnv.KscWorld, "塔防属性设置失败:异常配置", ["entityId", e.EntityId_], ["propertyId", t]);
      } else {
        KscLog_1.KscLog.Info("Attr", 17, KscEnv_1.KscEnv.KscWorld, "塔防属性设置成功", ["entityId", e.EntityId_], ["propertyId", t], ["attrConfig", s]);
        if (r) {
          for (var [o, i] of s) {
            i = r[o] ?? i;
            e.SetAttr(o, i);
          }
        } else {
          for (var [n, a] of s) {
            e.SetAttr(n, a);
          }
        }
      }
    } else {
      KscLog_1.KscLog.Warn("Attr", 17, KscEnv_1.KscEnv.KscWorld, "塔防属性设置失败:异常Entity", ["propertyId", t]);
    }
  }
  GetAttrsDefault(e) {
    e = this.Model.PropertyConfigs.get(e);
    if (e) {
      return KscUtil_1.KscUtil.GetAttrsDataByPropertyConfig(e);
    } else {
      return new Map();
    }
  }
  InitDamageConfigs() {
    var e = KscEnv_1.KscEnv.KscWorld;
    if (!e) {
      KscLog_1.KscLog.Error("Load", 85, KscEnv_1.KscEnv.KscWorld, "塔防InitDamageIdConfig failed");
    }
    var t = e?.DamageData;
    if (!t || !t.IsValid()) {
      KscLog_1.KscLog.Error("Load", 85, KscEnv_1.KscEnv.KscWorld, "塔防InitDamageIdConfig failed");
    }
    for (const s of KSCDamageByKscGameplayType_1.configKSCDamageByKscGameplayType.GetConfigList(this.Model.GameplayType)) {
      var r = new UE.KSCDamage(s.CalculateType, s.Element, s.Amplify * DIVIDED_TEN_THOUSAND, s.RelatedProperty);
      t.AddDamageData(s.Id, r);
    }
  }
  InitEntityAndSkillDt() {
    KscUtil_1.KscUtil.LoadDt(KscEnv_1.KscEnv.KscWorld, this.Model.GetEntityDtPath(), this.Model.EntityDataDt);
    KscUtil_1.KscUtil.LoadDt(KscEnv_1.KscEnv.KscWorld, this.Model.GetSkillDtPath(), this.Model.SkillDataDt);
  }
  InitEntityFilter() {
    this.CreateEntityFilter();
    ControllerHolder_1.ControllerHolder.CreatureController.RegisterCreateEntityFilter(this.RedirectFilter);
  }
  CreateEntityFilter() {
    this.RedirectFilter = new KscEntityRedirectFilter();
  }
  ResetEntityFilter() {
    this.RedirectFilter.Reset();
    ControllerHolder_1.ControllerHolder.CreatureController.UnregisterCreateEntityFilter(this.RedirectFilter);
  }
  AddKscPlayerEntity() {
    var e;
    var t;
    if (KscEnv_1.KscEnv.KscWorld) {
      if ((e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)?.Valid) {
        KscLog_1.KscLog.Info("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色", ["Player", e?.Id]);
        t = e.Entity.GetComponent(3).ActorTransform;
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AddEntityDt(e.CreatureDataId, PLAYER_ENTITY_KEY, undefined, t, e => {
          this.Model.SetKscPlayerEntity(e, 0);
          this.OnPlayerEntityCreated();
          this.AddInputLayer();
        });
      } else {
        KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色,entity非法");
      }
    } else {
      KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色,世界非法");
    }
  }
  OnPlayerEntityCreated() {
    this.SyncPlayerTransform();
  }
  AddInputLayer() {}
  RemoveInputLayer() {}
  SyncPlayerTransform() {
    this.NSd()?.SyncEntityLocation();
  }
  NSd() {
    var e = this.Model?.KscPlayerEntity;
    if (e) {
      return this.Model?.KscEntities.get(e.EntityId_);
    }
  }
  GetPossessedPlayerEntity() {
    var e = this.NSd();
    var t = e?.CreatureDataId;
    if (t && e.Valid) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    }
  }
  async PreloadHeadStateRes() {
    var e = [];
    e.push(this.LoadHeadStateCurve());
    e.push(this.LoadHeadStateDynamicBatchActor());
    e.push(this.LoadHeadStateViewActor());
    await Promise.all(e);
  }
  async LoadHeadStateCurve() {
    const t = new CustomPromise_1.CustomPromise();
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("HeadStateScaleCurvePath");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      if (e) {
        this.HeadStateScaleCurve = e;
      } else {
        KscLog_1.KscLog.Error("Common", 17, KscEnv_1.KscEnv.KscWorld, "LoadHeadStateCurve失败");
      }
      t.SetResult();
    });
    return t.Promise;
  }
  async LoadHeadStateDynamicBatchActor() {
    const t = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_TowerDefenseHPDynamicBatch");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, e => {
      if (e) {
        this.HeadStateDynamicBatchActor = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, e, UiLayer_1.UiLayer.WorldSpaceUiRootItem);
      } else {
        KscLog_1.KscLog.Error("Common", 17, KscEnv_1.KscEnv.KscWorld, "LoadHeadStateDynamicBatchActor失败");
      }
      t.SetResult();
    });
    return t.Promise;
  }
  async LoadHeadStateViewActor() {
    const t = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_TowerDefenseHP");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, e => {
      if (e) {
        this.HeadStateViewActor = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, e, UiLayer_1.UiLayer.WorldSpaceUiRootItem);
      } else {
        KscLog_1.KscLog.Error("Common", 17, KscEnv_1.KscEnv.KscWorld, "LoadHeadStateViewActor失败");
      }
      t.SetResult();
    });
    return t.Promise;
  }
  InitHeadStateManagerRes() {
    if (this.HeadStateScaleCurve && this.HeadStateViewActor && this.HeadStateDynamicBatchActor) {
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.KscHeadStateManager?.InitAllRes(UiLayer_1.UiLayer.WorldSpaceUiRootItem, this.HeadStateDynamicBatchActor, this.HeadStateViewActor, this.HeadStateScaleCurve);
    }
  }
  HandleHeadHpInfos(e) {
    if (ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.KscHeadStateManager) {
      t = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.KscHeadStateManager.Update(e * TimeUtil_1.TimeUtil.Millisecond, t.ToUeVector());
    }
    var t;
    var e = KscEnv_1.KscEnv.KscWorld;
    if (e) {
      e.GetHeadHpInfos(this.HeadInfos);
      var r = (0, puerts_1.$unref)(this.HeadInfos);
      var s = r.Num();
      var o = this.Model?.KscPlayerHeadStateData;
      if (o) {
        for (let e = 0; e < s; e++) {
          var i = r.Get(e);
          if (i.EntityId === o.EntityId) {
            this.SubModel.IsHpModify = true;
            this.OnHandlePlayerHeadHpInfo(o, i);
          } else {
            this.OnHandleHeadHpInfo(i);
          }
        }
      } else {
        for (let e = 0; e < s; e++) {
          var n = r.Get(e);
          this.OnHandleHeadHpInfo(n);
        }
      }
    }
  }
  PushPlayerHp() {
    if (!!this.Model?.IsHpModify && !(this.Model.NextPlayerHpSyncTime > Time_1.Time.FlowTime)) {
      if (this.Model.KscPlayerCreatureDataId !== 0) {
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.PushSimpleCombatEntityHp(this.Model.KscPlayerCreatureDataId, this.Model.KscPlayerHeadStateData.Hp);
        this.SubModel.IsHpModify = false;
        this.Model.NextPlayerHpSyncTime = Time_1.Time.FlowTime + 1000;
      }
    }
  }
  OnHandlePlayerHeadHpInfo(e, t) {
    if (t.ActionType === 0 || t.ActionType === 1) {
      e.MaxHp = t.MaxHp;
      e.Hp = t.CurHp;
      e.Shield = t.Shield;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKscPlayerHpChanged, e);
  }
  OnHandleHeadHpInfo(e) {
    KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "推送的血条数据没有处理");
  }
  ClearHeadState() {
    this.HeadStateScaleCurve = undefined;
    this.HeadStateDynamicBatchActor = undefined;
    (this.HeadStateViewActor = undefined, puerts_1.$unref)(this.HeadInfos).Empty();
  }
  GmAddPlayerEntity() {
    var e;
    var t;
    if (KscEnv_1.KscEnv.KscWorld) {
      if ((e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)?.Valid) {
        KscLog_1.KscLog.Info("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色", ["Player", e?.Id]);
        t = e.Entity.GetComponent(3).ActorTransform;
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AddEntityDt(e.CreatureDataId, PLAYER_ENTITY_KEY, undefined, t, e => {
          this.Model.SetKscPlayerEntity(e, 0);
          this.OnPlayerEntityCreated();
        });
      } else {
        KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色,entity非法");
      }
    } else {
      KscLog_1.KscLog.Warn("Common", 17, KscEnv_1.KscEnv.KscWorld, "Ksc尝试添加玩家角色,世界非法");
    }
  }
  GmPrintInfo() {}
}
exports.KscSubControllerBase = KscSubControllerBase;
//# sourceMappingURL=KscSubControllerBase.js.map