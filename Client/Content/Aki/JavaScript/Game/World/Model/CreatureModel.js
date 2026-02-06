"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatureModel = exports.globalEntityTypePerceptionType = exports.DISABLE_KAWAII_MOBLIE_MASK = exports.ENABLE_KAWAII_MASK = exports.DISABLE_ON_ELEVATOR_KAWAII_MASK = exports.DISABLE_KAWAII_MASK = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const BlueprintConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/BlueprintConfigByBlueprintType");
const LevelEntityConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByBlueprintType");
const LevelEntityConfigByMapId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapId");
const LevelEntityConfigByMapIdAndEntityId_1 = require("../../../Core/Define/ConfigQuery/LevelEntityConfigByMapIdAndEntityId");
const PrefabConfigById_1 = require("../../../Core/Define/ConfigQuery/PrefabConfigById");
const TemplateConfigByBlueprintType_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType");
const TemplateConfigById_1 = require("../../../Core/Define/ConfigQuery/TemplateConfigById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const flatbuffers = require("../../../RunTimeLibs/FlatBuffers/flatbuffers");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../UniverseEditor/Interface/IEntity");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const StaticSceneUtils_1 = require("../../LevelGamePlay/StaticScene/StaticSceneUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController");
const CreatureDensityContainer_1 = require("../Define/CreatureDensityContainer");
const EntityContainer_1 = require("../Define/EntityContainer");
const ComponentReadHelper_1 = require("../EntityReadCode/Component/ComponentReadHelper");
const zero = 0n;
const ONE_HUNDRED = 100;
exports.DISABLE_KAWAII_MASK = 1;
exports.DISABLE_ON_ELEVATOR_KAWAII_MASK = 2;
exports.ENABLE_KAWAII_MASK = ~exports.DISABLE_KAWAII_MASK;
exports.DISABLE_KAWAII_MOBLIE_MASK = 4;
exports.globalEntityTypePerceptionType = [1, 1, 1, 2, 2, 2, 2, 4];
class CreatureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.EnableEntityLog = true;
    this.UseFbEntityConfig = false;
    this._Mr = 0;
    this.uMr = undefined;
    this.qrl = undefined;
    this.Ypr = undefined;
    this.NUe = 0;
    this.ScenePlayerDataMap = new Map();
    this.cMr = zero;
    this.hPr = new EntityContainer_1.EntityContainer();
    this.mMr = new Map();
    this.dMr = new Map();
    this.NCa = new Map();
    this.CMr = false;
    this.RemoveCreaturePendingSet = new Set();
    this.Lvl = undefined;
    this.fMr = undefined;
    this.pMr = undefined;
    this.vMr = undefined;
    this.MMr = undefined;
    this.EMr = undefined;
    this.SMr = undefined;
    this.DelayRemoveContainer = new EntityContainer_1.EntityContainer();
    this.lPr = new EntityContainer_1.EntityContainer();
    this.uYs = new CreatureDensityContainer_1.CreatureDensityContainer();
    this.LMr = false;
    this.DMr = undefined;
    this.RMr = new Map();
    this.UMr = undefined;
    this.ActorMovableHandleMap = new Map();
    this.LeavingLevel = false;
    this.ifl = 0;
    this.AMr = () => {
      for (const t of this.GetAllEntities()) {
        if (!this.dMr.has(t.Id) && !SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(t.Entity)) {
          this.dMr.set(t.Id, t.Entity.Disable("[CharacterModel.OnLoadMap] Loading"));
        }
      }
      this.CMr = true;
    };
    this.nye = () => {
      this.CMr = false;
      for (var [t, e] of this.dMr) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
        if (t?.Valid) {
          t.Entity.Enable(e, "CreatureModel.OnWorldDone");
        }
      }
      this.dMr.clear();
    };
    this.bpr = t => {
      if (t) {
        for (const i of this.GetAllEntities()) {
          var e;
          if ((!Global_1.Global.BaseCharacter?.IsValid() || Global_1.Global.BaseCharacter.EntityId !== i.Id) && i.Entity.GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem && !this.dMr.has(i.Id) && !this.NCa.has(i.Id)) {
            if (i.IsInit) {
              if (e = i.Entity.GetComponent(122)) {
                e = e.DisableTickWithLog("CreatureModel.OnTeleportStart");
                this.NCa.set(i.Id, e);
              }
              if (e = i.Entity.GetComponent(124)) {
                e.TeleportLock = true;
              }
            } else {
              this.dMr.set(i.Id, i.Entity.Disable("CreatureModel.OnTeleportStart"));
            }
          }
        }
        this.CMr = true;
      }
    };
    this.Ilt = () => {
      if (this.CMr) {
        this.CMr = false;
        for (var [t, e] of this.dMr) {
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
          if (t?.Valid) {
            t.Entity.Enable(e, "CreatureModel.OnTeleportComplete");
          }
        }
        for (var [i, r] of this.NCa) {
          i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i);
          if (i?.Valid && (i.Entity.GetComponent(122).EnableTickWithLog(r, "CreatureModel.OnTeleportComplete"), r = i.Entity.GetComponent(124))) {
            r.OnEntityBudgetTickEnableChange(true);
            r.TeleportLock = false;
          }
        }
        this.dMr.clear();
        this.NCa.clear();
      }
    };
  }
  get KuroLodMask() {
    return this.ifl;
  }
  OnInit() {
    this.EnableEntityLog = Info_1.Info.IsBuildDevelopmentOrDebug;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "实体配置信息", ["是否启用DB", PublicUtil_1.PublicUtil.UseDbConfig()], ["EnableEntityLog", this.EnableEntityLog]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLoadMap, this.AMr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.UseDelayAnim True");
    var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.DynamicBones);
    this.SetKawaiiMask(t !== undefined && t > 0);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLoadMap, this.AMr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    return true;
  }
  AddEntity(t, e) {
    this.hPr.AddEntity(t, e);
    t = this.uYs.GetItem(t);
    if (t) {
      t.EntityHandle = e;
    }
  }
  AddLoadingEntity(t) {
    if (t?.Valid) {
      if (this.CMr && !this.dMr.has(t.Id)) {
        this.dMr.set(t.Id, t.Entity.Disable("[CreatureModel.AddEntity] LoadingWorld"));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "实体句柄无效。");
    }
  }
  RemoveEntity(t, e) {
    var i = this.hPr.RemoveEntity(t);
    if (this.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] 删除实体成功", ["CreatureDataId", t], ["Reason", e], ["Result", i]);
    }
    var e = this.uYs.GetItem(t);
    if (e) {
      e.EntityHandle = undefined;
    }
    return i;
  }
  GetAllEntities() {
    return this.hPr.GetAllEntities();
  }
  GetAllEntitiesNeedToPreAwake() {
    var t = [];
    for (const e of this.hPr.GetAllEntities()) {
      if (function t(e) {
        if (e.EntityType === Protocol_1.Aki.Protocol.kks.Proto_SceneItem && e.ConfigType !== Protocol_1.Aki.Protocol.rLs.lTs && e.ConfigType !== Protocol_1.Aki.Protocol.rLs.Proto_Template) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.PbDataId);
          if (i) {
            i = i.BlueprintType;
            i = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(i);
            if (!i || i.EntityType !== "SceneAura".toString()) {
              return;
            }
            i = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e.PbDataId);
            if (i) {
              for (const r of i) {
                if (r.ActorName?.startsWith("KuroPostProcessVolume")) {
                  return 1;
                }
              }
            }
          }
        }
      }(e)) {
        t.push(e);
      }
    }
    return t;
  }
  GetEntitiesInRange(t, e, i, r = true, n = false) {
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRange(t, e, i, r, n);
  }
  GetEntitiesInRangeWithLocation(t, e, i, r, n = true) {
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRangeWithLocation(t.ToUeVector(), e, i, r, n);
  }
  GetEntitiesWithTag(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities()) {
      if (i.Entity.GetComponent(0).ContainsTag(t)) {
        e.push(i);
      }
    }
  }
  GetEntitiesWithPbDataId(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities()) {
      if (i.Entity.GetComponent(0).GetPbDataId() === t) {
        e.push(i);
      }
    }
  }
  GetEntitiesWithOwnerId(t, e) {
    e.length = 0;
    for (const i of this.GetAllEntities()) {
      if (i.Entity.GetComponent(0).GetOwnerId() === t) {
        e.push(i);
      }
    }
  }
  GetEntity(t) {
    return this.hPr.GetEntity(t);
  }
  GetEntityWithDelayRemoveContainer(t) {
    return this.DelayRemoveContainer.GetEntity(t);
  }
  GetEntityWithPendingRemoveContainer(t) {
    return this.lPr.GetEntity(t);
  }
  ExistEntity(t) {
    return this.hPr.ExistEntity(t);
  }
  GetEntityById(t) {
    return this.hPr.GetEntityById(t);
  }
  GetCreatureDataId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return t.GetComponent(0).GetCreatureDataId();
    } else {
      return 0;
    }
  }
  GetCreaturePbDataId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return t.GetComponent(0).GetPbDataId();
    } else {
      return 0;
    }
  }
  GetEntityId(t) {
    return this.hPr.GetEntity(t)?.Id ?? 0;
  }
  GetEntityIdByPbDataId(t) {
    t = this.GetEntityByPbDataId(t);
    if (t) {
      return t.Id;
    } else {
      return 0;
    }
  }
  GetServerEntityId(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      t = t.GetComponent(0);
      return MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId());
    }
  }
  OnLeaveLevel() {
    for (var [, t] of this.ScenePlayerDataMap) {
      t.Clear();
    }
    this.ScenePlayerDataMap.clear();
    this.RemoveCreaturePendingSet.clear();
    this.DelayRemoveContainer.Clear();
    this.lPr.Clear();
    this.RMr.clear();
    this.hPr.Clear();
    this.uYs.Clear();
    this.Lvl = undefined;
    this.fMr = undefined;
    return !(this.pMr = undefined);
  }
  GetWorldOwner() {
    return this._Mr;
  }
  SetWorldOwner(t) {
    this._Mr = t;
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInstanceChange, this.NUe, t);
    this.NUe = t;
  }
  GetPlayerId() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return t || 0;
  }
  IsMyWorld() {
    return this._Mr === this.GetPlayerId();
  }
  IsWorldOwner(t) {
    return this._Mr === t;
  }
  GetScenePlayerData(t) {
    return this.ScenePlayerDataMap.get(t);
  }
  AddScenePlayerData(t, e) {
    this.ScenePlayerDataMap.set(t, e);
  }
  GetAllScenePlayers() {
    var t;
    var e = new Array();
    for ([, t] of this.ScenePlayerDataMap) {
      e.push(t);
    }
    return e;
  }
  RemoveScenePlayerData(t) {
    var e = this.ScenePlayerDataMap.get(t);
    if (e) {
      e.Clear();
    }
    return this.ScenePlayerDataMap.delete(t);
  }
  GetGameplayTagHash() {
    return this.cMr;
  }
  SetGameplayTagHash(t) {
    this.cMr = t;
  }
  SetSceneId(t) {
    this.uMr = t;
  }
  GetSceneId() {
    return this.uMr;
  }
  SetSceneTraceId(t) {
    this.qrl = t;
  }
  GetSceneTraceId() {
    return this.qrl;
  }
  SetToken(t) {
    this.Ypr = t;
  }
  GetToken() {
    return this.Ypr;
  }
  AddRemoveCreaturePending(t) {
    return !this.RemoveCreaturePendingSet.has(t) && (this.RemoveCreaturePendingSet.add(t), true);
  }
  RemoveRemoveCreaturePending(t) {
    return this.RemoveCreaturePendingSet.delete(t);
  }
  ClearRemoveCreaturePending() {
    this.RemoveCreaturePendingSet.clear();
  }
  InitEntityDataConfig(t) {
    this.Lvl = new Map();
    return this.AddEntityDataConfig(t);
  }
  AddEntityDataConfig(i) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      let t = "";
      var r = (0, puerts_1.$ref)(t);
      let e = (0, PublicUtil_1.getConfigPath)(`${IGlobal_1.globalConfig.LevelsDataDir}/${i}/Level.json`);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        e = (0, PublicUtil_1.getConfigPath)(`${IGlobal_1.globalConfigTemp.LevelsDataDir}/${i}/Level.json`);
      }
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        UE.KuroStaticLibrary.LoadFileToString(r, e);
        if (!(t = (0, puerts_1.$unref)(r))) {
          return false;
        }
        t = t.trim();
        var n = Info_1.Info.IsBuildDevelopmentOrDebug;
        var r = JSON.parse(t);
        var o = new Map();
        this.Lvl ||= new Map();
        for (const a of r.EntityDatas) {
          a.EdWpPath = undefined;
          if (!n) {
            a.Name = "";
          }
          o.set(a.Id, a);
        }
        this.Lvl.set(i, o);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 3, "不存在EntityConfigData配置文件。", ["Path", e]);
      }
    }
    return true;
  }
  InitDynamicEntityDataConfig() {
    var t = (0, puerts_1.$ref)("");
    let e = (0, PublicUtil_1.getConfigPath)("" + IGlobal_1.globalConfig.EntityDataConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)("" + IGlobal_1.globalConfigTemp.EntityDataConfigPath);
    }
    if (!UE.BlueprintPathsLibrary.FileExists(e)) {
      return false;
    }
    UE.KuroStaticLibrary.LoadFileToString(t, e);
    if (!(t = (0, puerts_1.$unref)(t))) {
      return false;
    }
    var i = Info_1.Info.IsBuildDevelopmentOrDebug;
    var t = JSON.parse(t);
    this.fMr = new Map();
    for (const r of t.EntityDatas) {
      r.EdWpPath = undefined;
      if (!i) {
        r.Name = "";
      }
      this.fMr.set(r.Id, r);
    }
    return true;
  }
  xMr() {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.BlueprintConfigPath);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.BlueprintConfigPath);
      }
      if (UE.BlueprintPathsLibrary.FileExists(t)) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        var i;
        var r;
        var e = (0, puerts_1.$unref)(e);
        var e = JSON.parse(e);
        for ([i, r] of Object.entries(e.BlueprintConfig)) {
          this.vMr.set(i, r);
        }
      }
    }
  }
  InitEntityTemplateMap(e = false) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.MMr = new Map();
      this.SMr = new Map();
      e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.TemplateConfigPath);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.TemplateConfigPath);
      }
      if (UE.BlueprintPathsLibrary.FileExists(t)) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        e = (0, puerts_1.$unref)(e);
        for (const i of JSON.parse(e).Templates) {
          this.MMr.set(i.Id, i);
          this.SMr.set(i.BlueprintType, i.Id);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CreatureModel.InitEntityTemplateMap] 不存在Template.json文件。", ["Path", t]);
      }
    }
  }
  BMr(e = false) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.EMr = new Map();
      e = (0, puerts_1.$ref)("");
      let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.PrefabConfigPath);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.PrefabConfigPath);
      }
      if (UE.BlueprintPathsLibrary.FileExists(t)) {
        UE.KuroStaticLibrary.LoadFileToString(e, t);
        e = (0, puerts_1.$unref)(e);
        for (const r of JSON.parse(e).Prefabs) {
          if (r.Entities?.length) {
            let t = this.EMr.get(r.PrefabId);
            if (!t) {
              t = new Map();
              this.EMr.set(r.PrefabId, t);
            }
            for (const n of r.Entities) {
              var i = this.GetEntityTemplate(n.EntityData.BlueprintType);
              if (i) {
                i = (0, IEntity_1.decompressEntityData)(n.EntityData, i);
                t.set(n.EntityData.Id, i);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "[CreatureModel.InitEntityPrefabMap] 不存在对应的Template。", ["PrefabId", r.PrefabId], ["Id", n.EntityData.Id], ["BlueprintType", n.EntityData.BlueprintType]);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CreatureModel.InitEntityPrefabMap] 不存在Prefab.json文件。", ["Path", t]);
      }
    }
  }
  bMr() {
    this.pMr = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.EntityOwnerConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.EntityOwnerConfigPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      var e = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(e, t);
      e = (0, puerts_1.$unref)(e);
      var e = JSON.parse(e);
      for (const i of e) {
        let t = this.pMr.get(i.LevelId);
        if (!t) {
          t = new Map();
          this.pMr.set(i.LevelId, t);
        }
        t.set(i.EntityId, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "[CreatureModel.InitEntityTemplateMap] 不存在EntityOwner.json文件。", ["Path", t]);
    }
  }
  GetEntityData(e, t) {
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CreatureModel.GetEntityData] pbDataId为undefined，外部调用的地方要保证这个参数不能为undefined");
      }
    } else {
      var i = t ?? ModelManager_1.ModelManager.GameModeModel.MapId;
      if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
        let t = this.Lvl?.get(i);
        if (t) {
          return t?.get(e);
        } else {
          this.AddEntityDataConfig(i);
          return (t = this.Lvl?.get(i))?.get(e);
        }
      }
      var r = LevelEntityConfigByMapIdAndEntityId_1.configLevelEntityConfigByMapIdAndEntityId.GetConfig(i, e);
      if (r) {
        var n = {
          Id: r.EntityId,
          BlueprintType: r.BlueprintType,
          InSleep: r.InSleep,
          AreaId: r.AreaId,
          IsScaleEnabled: r.IsScaleEnabled,
          Transform: {}
        };
        if (Info_1.Info.IsBuildDevelopmentOrDebug) {
          n.Name = r.Name;
        }
        n.Transform.Pos = {
          X: r.Transform[0].X / ONE_HUNDRED,
          Y: r.Transform[0].Y / ONE_HUNDRED,
          Z: r.Transform[0].Z / ONE_HUNDRED
        };
        n.Transform.Rot = {
          X: r.Transform[1].X / ONE_HUNDRED,
          Y: r.Transform[1].Y / ONE_HUNDRED,
          Z: r.Transform[1].Z / ONE_HUNDRED
        };
        n.Transform.Scale = {
          X: r.Transform[2].X / ONE_HUNDRED,
          Y: r.Transform[2].Y / ONE_HUNDRED,
          Z: r.Transform[2].Z / ONE_HUNDRED
        };
        if (this.UseFbEntityConfig) {
          var i = `${UE.BlueprintPathsLibrary.ProjectContentDir()}Aki/Config/UniverseEditorConfig/LevelEntity/${i}_${n.Id}.bytes`;
          var o = (0, puerts_1.$ref)(undefined);
          if (!UE.KuroStaticLibrary.LoadFileToArray(i, o)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "加载文件失败", ["MapId", t], ["PbDataId", e], ["File", i]);
            }
            return;
          }
          t = UE.KuroStaticLibrary.ArrayToBuffer(o);
          e = new Uint8Array(t);
          i = new flatbuffers.ByteBuffer(e);
          n.ComponentsData = ComponentReadHelper_1.ComponentReadHelper.ReadComponents(i);
          n.BufferArray = o;
        } else {
          n.ComponentsData = JSON.parse(r.ComponentsData);
        }
        return n;
      }
    }
  }
  GetEntityDataByCreatureDataId(t) {
    t = this.GetEntity(t);
    if (t) {
      t = this.GetPbDataIdByEntity(t);
      if (t) {
        return this.GetEntityData(t);
      }
    }
  }
  GetAllEntityIdOfBlueprintType(t) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (this.Lvl === undefined) {
        return [];
      }
      const n = new Array();
      var e = this.Lvl.get(ModelManager_1.ModelManager.GameModeModel.MapId);
      if (e) {
        for (const o of e.keys()) {
          var i = e.get(o);
          if (i.BlueprintType === t) {
            n.push(i.Id);
          }
        }
      }
      return n;
    }
    var r = LevelEntityConfigByBlueprintType_1.configLevelEntityConfigByBlueprintType.GetConfigList(t);
    if (!r) {
      return [];
    }
    const n = new Array();
    for (const a of r) {
      n.push(a.EntityId);
    }
    return n;
  }
  GetAllEntityIdOfMapIdAndEntityType(t, e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (this.Lvl === undefined) {
        return [];
      }
      const o = new Array();
      var i = this.Lvl.get(t);
      if (i) {
        for (const s of i.keys()) {
          var r = i.get(s);
          var n = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(r.BlueprintType);
          if (n && n.EntityType === e) {
            o.push(r.Id);
          }
        }
      }
      return o;
    }
    t = LevelEntityConfigByMapId_1.configLevelEntityConfigByMapId.GetConfigList(t);
    if (!t) {
      return [];
    }
    const o = new Array();
    for (const l of t) {
      var a = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(l.BlueprintType);
      if (a && a.EntityType === e) {
        o.push(l.EntityId);
      }
    }
    return o;
  }
  GetDynamicEntityData(t) {
    if (this.fMr) {
      return this.fMr.get(t);
    }
  }
  GetEntityModel(t) {
    var e;
    var i;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (e = BlueprintConfigByBlueprintType_1.configBlueprintConfigByBlueprintType.GetConfig(t)) {
        (i = {}).EntityType = e.EntityType;
        i.EntityLogic = e.EntityLogic;
        i.ModelId = e.ModelId;
        i.HalfHeight = e.HalfHeight;
        i.TrackHeight = e.TrackHeight;
        return i;
      } else {
        return undefined;
      }
    } else {
      if (!this.vMr) {
        this.vMr = new Map();
        this.xMr();
      }
      return this.vMr.get(t);
    }
  }
  GetAllEntityTemplate(t = false) {
    if (!this.MMr) {
      this.InitEntityTemplateMap(t);
    }
    return this.MMr;
  }
  GetEntityTemplate(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this.MMr) {
        this.InitEntityTemplateMap();
      }
      let t = 0;
      t = typeof e == "string" ? this.SMr.get(e) : e;
      return this.MMr.get(t);
    }
    let t = undefined;
    if (t = (typeof e == "string" ? TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType : TemplateConfigById_1.configTemplateConfigById).GetConfig(e)) {
      (e = {}).Id = t.Id;
      e.BlueprintType = t.BlueprintType;
      e.Name = t.Name;
      e.ComponentsData = JSON.parse(t.ComponentsData);
      return e;
    }
  }
  GetEntityPrefab(t, e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this.EMr) {
        this.BMr();
      }
      return this.EMr.get(t)?.get(e);
    }
    this.EMr ||= new Map();
    let i = this.EMr.get(t);
    if (i?.size) {
      return i.get(e);
    }
    var r = PrefabConfigById_1.configPrefabConfigById.GetConfig(t);
    if (r) {
      i = new Map();
      this.EMr.set(t, i);
      for (const o of JSON.parse(r.Entities)) {
        var n = this.GetEntityTemplate(o.EntityData.BlueprintType);
        if (n) {
          n = (0, IEntity_1.decompressEntityData)(o.EntityData, n);
          i.set(o.EntityData.Id, n);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[CreatureModel.GetEntityPrefab] 不存在对应的Template。", ["PrefabId", t], ["Id", o.EntityData.Id], ["BlueprintType", o.EntityData.BlueprintType]);
        }
      }
      return i.get(e);
    }
  }
  GetCompleteEntityData(t, e) {
    t = this.GetEntityData(t, e);
    if (t) {
      e = this.GetEntityTemplate(t.BlueprintType);
      return (0, IEntity_1.decompressEntityData)(t, e);
    }
  }
  GetEntityOwner(e, i, r = false) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.pMr ||= new Map();
      if (!this.pMr.get(e)) {
        this.pMr.set(e, new Map());
      }
      if (!this.pMr.get(e).get(i)) {
        var n = e.toString() + "_" + i.toString();
        let t = undefined;
        if (!(t = r ? ConfigManager_1.ConfigManager.EntityOwnerConfig.CheckEntityOwnerConfig(n) : ConfigManager_1.ConfigManager.EntityOwnerConfig.GetEntityOwnerConfig(n))) {
          return;
        }
        r = {
          LevelId: e,
          EntityId: i,
          Owner: JSON.parse(t.Owner)
        };
        this.pMr.get(e).set(i, r);
      }
      const t = this.pMr.get(e).get(i);
      if (t.Owner.length === 0) {
        return undefined;
      } else {
        return t.Owner[0];
      }
    }
    if (!this.pMr) {
      this.bMr();
    }
    n = this.pMr.get(e);
    if (n) {
      const t = n.get(i);
      if (t && t.Owner.length !== 0) {
        return t.Owner[0];
      }
    }
  }
  CheckSetPrefabEntity(t) {
    this.hPr.CheckSetPrefabEntity(t);
  }
  GetPbDataIdByEntity(t) {
    if (t = t && t.Entity.GetComponent(0)) {
      return t.GetPbDataId();
    } else {
      return 0;
    }
  }
  GetEntityByPbDataId(t) {
    return this.hPr.GetEntityByPbDataId(t);
  }
  GetIsLoadingScene() {
    return this.LMr;
  }
  SetIsLoadingScene(t) {
    this.LMr = t;
  }
  GetCreatureDataIdByPbDataId(t) {
    return this.hPr.GetCreatureDataIdByPbDataId(t);
  }
  AddDelayRemoveEntity(t, e) {
    if (e.Valid) {
      if (this.DelayRemoveContainer.ExistEntity(t)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[CreatureModel.AddDelayRemoveEntity] 重复添加DelayRemoveEntityMap列表。", ["CreatureDataId", t]);
        }
        return false;
      } else {
        this.DelayRemoveContainer.AddEntity(t, e);
        this.DelayRemoveContainer.CheckSetPrefabEntity(e);
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureModel.AddDelayRemoveEntity] entity.Valid = false，添加到DelayRemoveEntityMap列表失败。", ["CreatureDataId", t]);
      }
      return false;
    }
  }
  RemoveDelayRemoveEntity(t) {
    this.DelayRemoveContainer.RemoveEntity(t);
  }
  AddPendingRemoveEntity(t, e) {
    if (e?.Valid) {
      this.lPr.AddEntity(t, e);
      this.lPr.CheckSetPrefabEntity(e);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureModel.AddPendingRemoveEntity] entity.Valid = false，添加到PendingRemoveEntityQueue队列失败。", ["CreatureDataId", t], ["EntityId", e?.Id]);
      }
      return false;
    }
  }
  PopPendingRemoveEntity() {
    return this.lPr.PopEntity();
  }
  PeekPendingRemoveEntity() {
    return this.lPr.PeekEntity();
  }
  GetPendingRemoveEntity(t) {
    return this.lPr.GetEntity(t);
  }
  GetPendingRemoveEntityByPbDataId(t) {
    return this.lPr.GetEntityByPbDataId(t);
  }
  RemovePendingRemoveEntity(t) {
    return this.lPr.RemoveEntity(t);
  }
  PendingRemoveEntitySize() {
    return this.lPr.Size();
  }
  RemovePreCreature(t) {
    return false;
  }
  SetRestoreEntityId(t) {
    this.DMr = t;
  }
  GetRestoreEntityId() {
    return this.DMr;
  }
  RecordEntitySilenceState(t, e) {
    this.RMr.set(t, e);
  }
  CheckEntityVisible(t) {
    return !!ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) || !this.RMr.get(t);
  }
  GetActorRefData() {
    if (this.UMr) {
      return this.UMr;
    }
    this.UMr = new Map();
    let t = "";
    t = PublicUtil_1.PublicUtil.UseDbConfig() ? UE.BlueprintPathsLibrary.ProjectContentDir() + "Aki/Config/Json/ActorRefConfig.json" : (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.ActorRefConfigPath);
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      var e = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(e, t);
      if (!(e = (0, puerts_1.$unref)(e))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 7, "配置文件为空", ["filePath", t]);
        }
      }
      var e = Json_1.Json.Parse(e);
      for (const n of e.LevelRefList) {
        var i = n.LevelPath;
        let e = this.UMr.get(i);
        e = e || new Map();
        for (const o of n.StreamingGroups) {
          var r = o.EntityId;
          let t = e.get(r);
          t = t || [];
          for (const a of o.RefData) {
            if (!a.Platform || !!Platform_1.Platform.CheckAssetPlatformInclude(a.Platform.toString())) {
              t.push(a);
            }
          }
          e.set(r, t);
        }
        this.UMr.set(i, e);
      }
      return this.UMr;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "检查配置文件是否存在", ["filePath", t]);
    }
  }
  GetEntityByChildActor(t) {
    t = this.GetEntityActorByChildActor(t);
    if (t) {
      return this.GetEntityById(t.GetEntityId());
    }
  }
  GetEntityActorByChildActor(t) {
    let e = t;
    while (e && !UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      e = e.GetAttachParentActor();
    }
    if (e) {
      t = e;
      if (this.GetEntityById(t.GetEntityId())?.Valid) {
        return e;
      }
    }
  }
  GetOwnerEntity(t) {
    t = this.mMr.get(t);
    if (t) {
      return t[0];
    }
  }
  AddOwnerEntityInfo(e) {
    var t = this.hPr.GetEntity(e)?.Entity?.GetComponent(0);
    var i = t?.GetBaseInfo()?.ChildEntityIds;
    if (i) {
      var r = t.GetPbDataId();
      for (const n of i) {
        let t = this.mMr.get(n);
        if (t) {
          if (t[0] !== r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 50, "子实体具有与记录不同的父实体", ["CreatureId", e], ["ChildPbDataId", n], ["OwnerPbDataId", t[0]], ["RefCount", t[1]]);
            }
            continue;
          }
          t[1]++;
        } else {
          t = [r, 1];
          this.mMr.set(n, t);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 50, "添加实体Owner信息", ["CreatureId", e], ["ChildPbDataId", n], ["OwnerPbDataId", t[0]], ["RefCount", t[1]]);
        }
      }
    }
  }
  RemoveOwnerEntityInfo(t) {
    var e = this.hPr.GetEntity(t)?.Entity?.GetComponent(0)?.GetBaseInfo()?.ChildEntityIds;
    if (e) {
      for (const r of e) {
        var i = this.mMr.get(r);
        if (i && (--i[1] == 0 && this.mMr.delete(r), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("World", 50, "移除实体Owner信息", ["CreatureId", t], ["ChildPbDataId", r], ["OwnerPbDataId", i[0]], ["RefCount", i[1]]);
        }
      }
    }
  }
  GetDensityItemByPbDataId(t) {
    return this.uYs.GetItemByPbDataId(t);
  }
  GetOrAddDensityItem(t, e) {
    var i;
    var r = this.uYs.GetItem(t);
    if (r) {
      return r;
    }
    let n = 0;
    if (e.oys === 2) {
      n = 2;
    } else if (e.oys === 1) {
      r = e.v9n;
      if (i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r)) {
        i = (0, IComponent_1.getComponent)(i.ComponentsData, "BaseInfoComponent");
        n = i && i.LowerNpcDensity !== undefined ? this._r_(i.LowerNpcDensity) : 1;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 6, "不存在的pbDataId", ["creatureDataID", t], ["pbDataId", r]);
      }
    }
    return this.uYs.AddItem(t, n, e);
  }
  RemoveDensityItem(t) {
    return this.uYs.RemoveItem(t);
  }
  GetDensityLevelGroup(t) {
    return this.uYs.GetLevel(t);
  }
  SetKawaiiMask(t) {
    if (t) {
      this.ifl &= exports.ENABLE_KAWAII_MASK;
    } else {
      this.ifl |= exports.DISABLE_KAWAII_MASK;
    }
    if (Platform_1.Platform.IsMobilePlatform()) {
      this.ifl |= exports.DISABLE_KAWAII_MOBLIE_MASK;
    }
  }
  _r_(t) {
    switch (t) {
      case 1:
        return 0;
      case 0:
        return 1;
      case 2:
        return 2;
      default:
        return 1;
    }
  }
}
exports.CreatureModel = CreatureModel;
//# sourceMappingURL=CreatureModel.js.map