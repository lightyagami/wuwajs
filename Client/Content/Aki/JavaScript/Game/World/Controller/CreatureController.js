"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, t, r, o) {
  var a;
  var l = arguments.length;
  var n = l < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, r, o);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (a = e[i]) {
        n = (l < 3 ? a(n) : l > 3 ? a(t, r, n) : a(t, r)) || n;
      }
    }
  }
  if (l > 3 && n) {
    Object.defineProperty(t, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatureController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const LogProfiler_1 = require("../../../Core/Common/LogProfiler");
const Stats_1 = require("../../../Core/Common/Stats");
const DataLayerConfigById_1 = require("../../../Core/Define/ConfigQuery/DataLayerConfigById");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const SummonCfgById_1 = require("../../../Core/Define/ConfigQuery/SummonCfgById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const EntityHelper_1 = require("../../../Core/Entity/EntityHelper");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LauncherLogUpload_1 = require("../../../Launcher/LogUpload/LauncherLogUpload");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const HotFixUtils_1 = require("../../HotFix/HotFixUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationDataController_1 = require("../../Module/Abilities/FormationDataController");
const BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatMessageController_1 = require("../../Module/CombatMessage/CombatMessageController");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const SceneTeamData_1 = require("../../Module/SceneTeam/SceneTeamData");
const SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController");
const SeamlessTravelDefine_1 = require("../../Module/SeamlessTravel/SeamlessTravelDefine");
const TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController");
const CharacterBuffController_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffController");
const CreateEntityData_1 = require("../../NewWorld/Character/CreateEntityData");
const EntityHandle_1 = require("../../NewWorld/Character/EntityHandle");
const BattleSetting_1 = require("../../NewWorld/Setting/BattleSetting");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
const GameMode_1 = require("../Define/GameMode");
const ScenePlayerData_1 = require("../Define/ScenePlayerData");
const WaitEntityToLoadTask_1 = require("../Define/WaitEntityToLoadTask");
const CreatureModel_1 = require("../Model/CreatureModel");
const GameModeModel_1 = require("../Model/GameModeModel");
const TaskSystem_1 = require("../Task/TaskSystem");
const WorldGlobal_1 = require("../WorldGlobal");
const BattleLogicController_1 = require("./BattleLogicController");
const LogController_1 = require("./LogController");
const PreloadController_1 = require("./PreloadController");
const PreloadControllerNew_1 = require("./PreloadControllerNew");
const TimeController_1 = require("./TimeController");
const idDefaultValue = -1n;
const increment = 2n;
const playerBit = 20n;
const unitMax = 4294967295n;
const HOLD_ENTITY_TIMEOUT = 8000;
class CreatureController extends ControllerBase_1.ControllerBase {
  static get LeaveAoiFadeOutDuration() {
    var e;
    if (this.Mj1 === undefined) {
      e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("FadeOutDuration")?.Value;
      this.Mj1 = e ? parseFloat(e) : CreatureController.Ej1;
    }
    return this.Mj1;
  }
  static get CurrentCreatureDensityLevelExternal() {
    return this.hYs;
  }
  static OnInit() {
    WorldGlobal_1.WorldGlobal.Initialize();
    this.hYs = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.NPCDENSITY, GameSettingsDefine_1.NPC_DENSITY_THRESHOLD);
    return !!Global_1.Global.WorldEntityHelper.Initialize() && (Net_1.Net.Register(16399, CreatureController.P0r), Net_1.Net.Register(15848, CreatureController.x0r), Net_1.Net.Register(21501, CreatureController.w0r), Net_1.Net.Register(19587, CreatureController.B0r), Net_1.Net.Register(18090, CreatureController.PushContextIdNotify), Net_1.Net.Register(23028, CreatureController.JoinSceneNotify), Net_1.Net.Register(15785, CreatureController.AfterJoinSceneNotify), Net_1.Net.Register(17834, CreatureController.G0r), Net_1.Net.Register(25440, CreatureController.N0r), Net_1.Net.Register(29218, CreatureController.V0r), Net_1.Net.Register(20599, CreatureController.j0r), Net_1.Net.Register(15961, this.SwitchBattleModeNotify), Net_1.Net.Register(17318, this.GravityUpdateNotify), Net_1.Net.Register(28125, this.BattleLogNotify), Net_1.Net.Register(27336, this.W0r), Net_1.Net.Register(21336, this.STn), Net_1.Net.Register(28051, this.K0r), Net_1.Net.Register(21835, this.SceneLoadingTimeOutNotify), Net_1.Net.Register(16595, CreatureController.Q0r), Net_1.Net.Register(28340, CreatureController.X0r), Net_1.Net.Register(15638, CreatureController.$0r), Net_1.Net.Register(19509, CreatureController.Y0r), Net_1.Net.Register(24020, TimeController_1.TimeController.TimeCheckNotify), Net_1.Net.Register(18871, CreatureController.J0r), Net_1.Net.Register(29395, CreatureController.z0r), Net_1.Net.Register(27553, CreatureController.Z0r), Net_1.Net.Register(29086, CreatureController.oZa), Net_1.Net.Register(24589, CreatureController.FIc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntityFail, CreatureController.OnCreateEntityFail), EntitySystem_1.EntitySystem.SetEntityDestroyHandle(CreatureController.OnRemoveTargetEntity), this.IEa.OnInit(), true);
  }
  static CheckEnableEntityLog(t) {
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) {
      return true;
    }
    if (t !== undefined) {
      let e = 0;
      switch (e = t instanceof EntityHandle_1.EntityHandle ? t.EntityType : t) {
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          return true;
      }
    }
    return false;
  }
  static OnClear() {
    WorldGlobal_1.WorldGlobal.Clear();
    return !!Global_1.Global.WorldEntityHelper.Clear() && (this.DBi(), Net_1.Net.UnRegister(16399), Net_1.Net.UnRegister(15848), Net_1.Net.UnRegister(21501), Net_1.Net.UnRegister(19587), Net_1.Net.UnRegister(23028), Net_1.Net.UnRegister(15785), Net_1.Net.UnRegister(25440), Net_1.Net.UnRegister(29218), Net_1.Net.UnRegister(20599), Net_1.Net.UnRegister(15961), Net_1.Net.UnRegister(27336), Net_1.Net.UnRegister(21336), Net_1.Net.UnRegister(21835), Net_1.Net.UnRegister(16595), Net_1.Net.UnRegister(28051), Net_1.Net.UnRegister(28340), Net_1.Net.UnRegister(19509), Net_1.Net.UnRegister(18871), Net_1.Net.UnRegister(29395), Net_1.Net.UnRegister(27553), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntityFail, CreatureController.OnCreateEntityFail), EntitySystem_1.EntitySystem.SetEntityDestroyHandle(undefined), this.IEa.OnClear(), this.aTa.clear(), true);
  }
  static async PreAwakeEntitiesFromPending(e) {
    var t;
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntitiesNeedToPreAwake();
    var o = new Array();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 80, "[PreAwakeEntity]", ["Num", r.length], ["Entity", r]);
    }
    for (const a of r) {
      if (a?.Valid) {
        t = new Promise(t => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 80, "[PreAwakeEntity]", ["EntityId", a.PbDataId]);
          }
          this.LoadEntityAsync(a, e => {
            t();
          }, true);
        });
        o.push(t);
      }
    }
    this.IEa.Flush();
    await Promise.all(o);
  }
  static CreateEntityFromPending(e) {
    this.dKc();
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (t?.Valid) {
        this.LoadEntityAsync(t);
      }
    }
    this.IEa.Flush();
  }
  static RemoveStandaloneEntity(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (r?.Valid && r.Entity.GetComponent(1)?.Owner) {
      r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
      this.RemoveEntity(r, "RemoveStandaloneEntity", t);
    }
  }
  static NotifyAddEntity(e, t, r) {
    return !t.Entity.GetComponent(0).GetRemoveState() && (GlobalData_1.GlobalData.BpEventManager.增加实体.Broadcast(t.Id, r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddEntity, e, t, r), EntityHelper_1.EntitySystemHelper.IsSortDirty ||= true, true);
  }
  static NotifyRemoveEntity(e, t, r) {
    if (t?.Valid) {
      GlobalData_1.GlobalData.BpEventManager.删除实体.Broadcast(r);
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.RemoveEntity, e, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveEntity, e, t);
      EntityHelper_1.EntitySystemHelper.IsFilterDirty ||= true;
    }
  }
  static RemoveEntity(e, t, r = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce) {
    if (this.KVu(e)) {
      return true;
    }
    this.ofr.Start();
    var o = ModelManager_1.ModelManager.CreatureModel.RemoveDensityItem(e);
    if (o) {
      if (!o.EntityHandle) {
        if (o.DensityLevel <= this.hYs && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 6, "[实体生命周期:删除实体] DensityLevel和创建情况不匹配", ["CurrentLevel", this.hYs], ["SelfLevel", o.DensityLevel], ["CreatureDataId", o.CreatureDataId], ["Context", t]);
        }
        this.ofr.Stop();
        return true;
      }
      if (o.DensityLevel > this.hYs && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 6, "[实体生命周期:删除实体] DensityLevel和创建情况不匹配2", ["CurrentLevel", this.hYs], ["SelfLevel", o.DensityLevel], ["CreatureDataId", o.CreatureDataId], ["Context", t]);
      }
    }
    this.nfr.Start();
    o = this.rfr(e, t, r);
    this.nfr.Stop();
    this.ofr.Stop();
    return o;
  }
  static rfr(e, t, r) {
    CreatureController.aTa.delete(e);
    var o;
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (a) {
      o = a.Entity.GetComponent(1);
      if (this.CheckEnableEntityLog(a) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] 删除实体", ["Context", t], ["CreatureDataId", e], ["RemoveType", r], ["ActorLocationProxy", o?.ActorLocationProxy]);
      }
      o = a.Entity.GetComponent(0);
      (o = Stats_1.Stat.CreateNoFlameGraph(`CreatureDataId:${o.GetCreatureDataId()}, PbDataId:${o.GetPbDataId()}, EntityType:${o.GetEntityType()}}`)).Start();
      if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
        PreloadControllerNew_1.PreloadControllerNew.RemoveEntity(e);
      } else {
        PreloadController_1.PreloadController.RemovePreloadEntity(e);
      }
      a = this.lYs(a, e, r, t);
      o.Stop();
      return a;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:删除实体] 删除实体失败,CreatureModel不存在该Id。", ["Context", t], ["CreatureDataId", e], ["RemoveType", r]);
      }
      return false;
    }
  }
  static lYs(e, t, r, o) {
    var a = ModelManager_1.ModelManager.CreatureModel;
    if (!e.Valid) {
      return a.RemoveEntity(t, "RemoveEntityInternal handle.Valid=false");
    }
    var l = e.Entity.GetComponent(0);
    l.SetRemoveState(true);
    this.IEa.RemoveEntity(e);
    var n = e.Entity.GetComponent(1)?.Owner;
    CreatureController.NotifyRemoveEntity(r, e, n);
    if (!e.IsInit) {
      CreatureController.DestroyEntity(e, r !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange);
      return a.RemoveEntity(t, "RemoveEntityInternal handle.IsInit=false");
    }
    var i = l.GetEntityType();
    if (i !== Protocol_1.Aki.Protocol.kks.Proto_Custom && !n?.IsValid()) {
      CreatureController.DestroyEntity(e, r !== Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange);
      return a.RemoveEntity(t, "RemoveEntityInternal actor?.IsValid()=false");
    }
    if (r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeResetByModeChange) {
      CreatureController.DestroyEntity(e, false);
      return a.RemoveEntity(t, "RemoveEntityInternal RemoveTypeResetByModeChange");
    }
    let _ = r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce;
    if (!_ && !(r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal && i !== Protocol_1.Aki.Protocol.kks.Proto_Npc && i !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem && i !== Protocol_1.Aki.Protocol.kks.Proto_Animal && i !== Protocol_1.Aki.Protocol.kks.HI_ && (_ = true), e.Entity.Active)) {
      _ = true;
    }
    if (i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
      n = e.Entity.GetComponent(134);
      if (l.GetModelComponent()?.AoiFadeOut) {
        this.AddDelayRemoveEntity(t, e);
        n.StartFadeOut();
        return true;
      }
    }
    if (_) {
      CreatureController.DestroyEntity(e);
      return a.RemoveEntity(t, "RemoveEntityInternal forceRemove=true");
    }
    if (this.CheckEnableEntityLog(e) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] 延迟删除实体", ["Context", o], ["CreatureDataId", t], ["EntityId", e.Id], ["RemoveType", r]);
    }
    this.AddDelayRemoveEntity(t, e);
    if (i === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      if (l = e.Entity.GetComponent(187)) {
        l.HandlePendingDestroy();
      } else {
        CreatureController.DelayRemoveEntityFinished(e);
      }
    } else {
      if (i === Protocol_1.Aki.Protocol.kks.Proto_Animal) {
        n = e.Entity.GetComponent(172);
        if (!n?.PendingDestroy) {
          CreatureController.DelayRemoveEntityFinished(e);
          return true;
        }
        n.HandlePendingDestroy();
      }
      if (i === Protocol_1.Aki.Protocol.kks.HI_) {
        e.Entity.GetComponent(234).HandlePendingDestroy();
      } else if (r === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeDrop) {
        if (a = e.Entity.GetComponent(150)) {
          a.DestroyWithEffect();
        }
      } else if (i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        e.Entity.GetComponent(134).HandleDestroyState();
      }
    }
    return true;
  }
  static SummonRandomRequest(e, t, r, o = 0, a = true) {
    var e = (EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)).GetCreatureDataId();
    var l = Protocol_1.Aki.Protocol.QSc.create();
    l.YWn = e;
    var e = Protocol_1.Aki.Protocol.zSc.create();
    e.rVn = a;
    e.l8n = r.GetLocation();
    var a = Protocol_1.Aki.Protocol.D2s.create();
    var r = r.Rotator();
    a.Pitch = r.Pitch;
    a.Roll = r.Roll;
    a.Yaw = r.Yaw;
    e._8n = a;
    e.r5n = o;
    e.YSc = t;
    l.DKn = e;
    CreatureController.SummonRandomRequestInternal(l);
  }
  static SummonRequest(e, t, r, o, a, l = 0) {
    var n;
    var i;
    var _;
    var C = SummonCfgById_1.configSummonCfgById.GetConfig(a);
    if (C === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.SummonRequest] 召唤表中找不到对应配置。", ["召唤表Id", a]);
      }
    } else if (ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(C.BlueprintType)) {
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityModel(C.BlueprintType)) {
        n = (EntitySystem_1.EntitySystem.Get(o)?.GetComponent(0)).GetCreatureDataId();
        i = CreatureController.GenUniqueId();
        if (l > 0) {
          (_ = Protocol_1.Aki.Protocol.xcs.create()).DKn = this.sfr(e, t, r, a, i);
          _.AKn = MathUtils_1.MathUtils.NumberToLong(n);
          _.K7n = l;
          CreatureController.Summon2RequestInternal(_, i, o);
        } else {
          (l = Protocol_1.Aki.Protocol.Ucs.create()).DKn = this.sfr(e, t, r, a, i);
          l.AKn = MathUtils_1.MathUtils.NumberToLong(n);
          CreatureController.SummonRequestInternal(l, i);
        }
        return i;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.SummonRequest] 找不到新实体配置。", ["BlueprintType", C.BlueprintType]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.SummonRequest] 不存在新实体配置。", ["BlueprintType", C.BlueprintType]);
    }
  }
  static sfr(e, t, r, o, a) {
    var l = Protocol_1.Aki.Protocol.s4s.create();
    l.r5n = e;
    l.rVn = t;
    l.l8n = r.GetLocation();
    var e = Protocol_1.Aki.Protocol.D2s.create();
    var t = r.Rotator();
    e.Pitch = t.Pitch;
    e.Roll = t.Roll;
    e.Yaw = t.Yaw;
    l._8n = e;
    l.UKn = o;
    l.RKn = MathUtils_1.MathUtils.NumberToLong(a);
    return l;
  }
  static async SummonRequestInternal(e, t) {
    e = await Net_1.Net.CallAsync(15235, e);
    return e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t), CreatureController.RemoveEntity(t, "SummonRequestInternal"), ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24731), false);
  }
  static async SummonRandomRequestInternal(e) {
    e = await Net_1.Net.CallAsync(22863, e);
    return e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20135), false);
  }
  static async Summon2RequestInternal(e, t, r) {
    e = await Net_1.Net.CallAsync(28996, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.CreatureModel.RemovePreCreature(t);
      CreatureController.RemoveEntity(t, "Summon2RequestInternal");
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28501);
      return false;
    } else {
      EntitySystem_1.EntitySystem.Get(r).GetComponent(0).SetSummonsVersion(e.K7n);
      return true;
    }
  }
  static async RemoveSummonEntityRequest(e, t, r) {
    var o = Protocol_1.Aki.Protocol.scs.create();
    o.xKn = [ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(r)];
    o.PKn = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce;
    o.r5n = e;
    o.YWn = ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t);
    var r = await Net_1.Net.CallAsync(22907, o);
    return r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.G9n, 24514), false);
  }
  static async RemoveSummonEntityByServerIdRequest(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity?.GetComponent(0).GetEntityType();
    var a = Protocol_1.Aki.Protocol.scs.create();
    a.xKn = [MathUtils_1.MathUtils.NumberToLong(r)];
    a.PKn = o && o === Protocol_1.Aki.Protocol.kks.Proto_SceneItem ? Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal : Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce;
    a.r5n = e;
    a.YWn = ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(t);
    var r = await Net_1.Net.CallAsync(22907, a);
    return r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.G9n, 24514), false);
  }
  static async ChangeEntityRoleRequest(e, t) {
    var r;
    var o;
    if (e === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.ChangeEntityRoleRequest] 实体ID无效。", ["EntityId", e]);
      }
      return false;
    } else if (r = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)) {
      (o = Protocol_1.Aki.Protocol.hcs.create()).s5n = MathUtils_1.MathUtils.NumberToLong(r);
      o.W5n = t;
      return !!(t = await Net_1.Net.CallAsync(27959, o)) && !(t.KRs ? (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) ? (o.Entity.GetComponent(0).SetPlayerId(t.W5n), o.IsInit && (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t.W5n, o.Entity.GetComponent(1).SetAutonomous(t)), 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[CreatureController.ChangeEntityRoleRequest] 不存在实体Entity。", ["CreatureDataId", r]), 1) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[CreatureController.ChangeEntityRoleRequest] 改变权限失败。", ["EntityId", e]), 1));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.ChangeEntityRoleRequest] 实体ID无效。", ["EntityId", e], ["CreatureDataId", r]);
      }
      return false;
    }
  }
  static NotifySpawnBoss(e) {
    var t;
    if (e && (t = e.Entity.GetComponent(3)) && t.IsBoss) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpawnBoss, e);
    }
  }
  static async H$a(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var r = e.f5n;
    var o = e.W5n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 16, "[CreatureController.LeaveSceneNotify] LeaveSceneNotify", ["leavePlayerId", o], ["myPlayerId]", t], ["option", r]);
    }
    if (ModelManager_1.ModelManager.GameModeModel.Loading && (Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 3, "[CreatureController.LeaveSceneNotify] 等待Loading(开始)"), Net_1.Net.PauseAllNotifyCallback(), await TaskSystem_1.TaskSystem.Promise, Net_1.Net.ResumeAllNotifyCallback(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("World", 3, "[CreatureController.LeaveSceneNotify] 等待Loading(完成)");
    }
    if (o !== t) {
      ModelManager_1.ModelManager.CreatureModel.RemoveScenePlayerData(o);
      ModelManager_1.ModelManager.VehicleModel.RemoveOtherPlayerVehicleData(o);
      ModelManager_1.ModelManager.OnlineModel.RemovePlayerDisableHandles(o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerLeaveScene, e.W5n);
    } else if (ModelManager_1.ModelManager.GameModeModel.HasGameModeData) {
      ModelManager_1.ModelManager.GameModeModel.HasGameModeData = false;
      ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo = undefined;
      if (o === t) {
        if (ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("World", 16, "[CreatureController.LeaveSceneNotify] 场景加载中");
          }
        } else {
          if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceDungeon);
          }
          if (r) {
            CreatureController.ParseTravelConfig(e.f5n);
          }
          if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
            Net_1.Net.PauseAllNotifyCallback();
            await SeamlessTravelController_1.SeamlessTravelController.PreLeaveLevel();
            Net_1.Net.ResumeAllNotifyCallback();
          } else if (!ControllerHolder_1.ControllerHolder.LevelLoadingController.CheckIsOpen(3)) {
            BlackScreenController_1.BlackScreenController.AddBlackScreen("None", "LeaveScene");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DoLeaveLevel);
          if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
            SeamlessTravelController_1.SeamlessTravelController.PostLeaveLevel();
          }
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 3, "不存在场景数据，服务器下发LeaveSceneNotify流程有问题");
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 16, "[CreatureController.LeaveSceneNotify] 副本Id不存在");
      }
    }
  }
  static async SceneLoadingFinishRequest(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 5, "世界加载完成", ["SceneId", e]);
    }
    var t = new Protocol_1.Aki.Protocol.zds();
    t.BKn = e;
    var e = await Net_1.Net.CallAsync(16262, t);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28636);
    }
  }
  static DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback();
    if (this.nZa) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack);
      this.nZa = undefined;
    }
  }
  static IBi() {
    CreatureController.DBi();
    this.nZa = (0, puerts_1.toManualReleaseDelegate)(this.UploadEventCallBack);
    LogController_1.LogController.RequestOutputDebugInfo();
    LauncherLogUpload_1.LauncherLogUpload.SendLog(this.nZa);
  }
  static AnimalDieRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.pes.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    r.l8n = Protocol_1.Aki.Protocol.Gks.create();
    r.l8n.X = t.X;
    r.l8n.Y = t.Y;
    r.l8n.Z = t.Z;
    Net_1.Net.Call(23151, r, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23870);
      }
    });
  }
  static AnimalDropItemRequest(e) {
    var t = Protocol_1.Aki.Protocol.Ies.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(15423, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17261);
      }
    });
  }
  static AnimalDestroyRequest(e) {
    var t = Protocol_1.Aki.Protocol.Ees.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(19299, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrAnimalEntityNotExist && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16638);
      }
    });
  }
  static LandingDamageRequest(e, t, r) {
    var o = Protocol_1.Aki.Protocol.yis.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    o.wKn = t;
    o.bKn = r;
    Net_1.Net.Call(23822, o, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29818);
      }
    });
  }
  static AddPublicTags(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      var o = r.GetComponent(0);
      for (const a of t) {
        o.AddPublicTags(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.AddPublicTags] 不存Entity，添加公有标签失败。", ["EntityId", e]);
    }
  }
  static RemovePublicTags(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(e);
    if (r) {
      var o = r.GetComponent(0);
      for (const a of t) {
        o.RemovePublicTag(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.RemovePublicTags] 不存在Entity,删除公有标签失败。", ["EntityId", e]);
    }
  }
  static async HardnessModeChangedRequest(e, t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    var r = Protocol_1.Aki.Protocol.Dcs.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    r.$Wn = t;
    await Net_1.Net.CallAsync(24629, r);
    return new Promise(e => {
      e(true);
    });
  }
  static GenUniqueId() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var e = BigInt(e);
    this.xe += increment;
    return Number(e << playerBit | this.xe);
  }
  static ResumeId(e) {
    if (e) {
      if (0n === (1n & e)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "服务恢复实体Id有问题。", ["LastId", e]);
        }
      } else {
        this.xe = e & unitMax;
      }
    } else {
      this.xe = idDefaultValue;
    }
  }
  static async hfr(r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    var a = ModelManager_1.ModelManager.GameModeModel;
    if (a.HasGameModeData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.JoinSceneNotify] 未清理前一个场景的数据,就下发了JoinSceneNotify，服务器流程有问题");
      }
    } else if (ModelManager_1.ModelManager.GameModeModel.Loading) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[CreatureController.JoinSceneNotify] 上一次Loading没有完成");
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.JoinSceneNotify] JoinSceneNotify");
      }
      Net_1.Net.PauseAllNotifyCallback();
      await ModelManager_1.ModelManager.LoginModel.WaitLoginPromise();
      LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearSceneBegin);
      await GlobalData_1.GlobalData.ClearSceneDone?.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.JoinSceneNotify] 场景清理完成");
      }
      Net_1.Net.ResumeAllNotifyCallback();
      CombatMessageController_1.CombatMessageController.FlushMessagePack();
      a.LoadingPhase = 2;
      var l = r.$Rs;
      var e = (a.JoinSceneInfo = l).d5n;
      o.LeavingLevel = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.JoinSceneNotify] Begin", ["InstanceId", e]);
      }
      var n = Protocol_1.Aki.Protocol.EC_.create();
      n.brl = l.brl;
      Net_1.Net.Call(16208, n, () => {});
      o.SetIsLoadingScene(true);
      if (ControllerHolder_1.ControllerHolder.GameModeController.SetGameModeData(e, l.E7n)) {
        CreatureController.ResumeId(MathUtils_1.MathUtils.LongToBigInt(r.HRs));
        o.SetInstanceId(e);
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
        ModelManager_1.ModelManager.MapModel.LastHighLevelArea = l.bq1;
        if (o.InitEntityDataConfig(ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId)) {
          PublicUtil_1.PublicUtil.RegisterEditorLocalConfig();
          o.InitDynamicEntityDataConfig();
          FormationDataController_1.FormationDataController.RefreshPlayerEntities();
          o.SetWorldOwner(l.nIs);
          o.SetSceneId(l.BKn);
          o.SetSceneTraceId(MathUtils_1.MathUtils.LongToBigInt(l.brl));
          var n = l.RRs;
          var i = l.TRs;
          if (i) {
            const y = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
            var _ = i.find(e => e.W5n === y);
            if (_) {
              CharacterBuffController_1.default.SetHandlePrefix(_.mRs, _.CRs);
              ModelManager_1.ModelManager.CombatMessageModel.SetLastPrefix(_.mRs);
              ModelManager_1.ModelManager.OnlineModel.SetPlayerGravityIsNormal(_.ZE_);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[CreatureController.JoinSceneNotify] 未找到自身玩家信息", ["PlayerId", y]);
            }
          }
          CreatureController.lfr(n.gDs);
          ModelManager_1.ModelManager.BlackboardModel.SetWorldBlackboardByProtocol(l.pIs);
          let e = Global_1.Global.BaseCharacter = undefined;
          let t = undefined;
          if (i) {
            var C = new Array();
            for (const M of i) {
              var s = M.W5n;
              var d = new ScenePlayerData_1.ScenePlayerData(s);
              d.SetTimerStart();
              var u = new Array();
              for (const v of M.ERs) {
                var g = [];
                for (const f of v.gRs) {
                  var c = new SceneTeamData_1.SceneTeamRole();
                  c.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(f.F4n);
                  c.RoleId = f.Q6n;
                  c.OnStageWithoutControl = f.eT_;
                  g.push(c);
                }
                u.push({
                  GroupType: v.USs,
                  GroupRoleList: g,
                  CurrentRoleId: v.NVn,
                  LivingState: ControllerHolder_1.ControllerHolder.SceneTeamController.GetLivingSate(v.JEs)
                });
              }
              C.push({
                PlayerId: s,
                CurrentGroupType: M.USs,
                Groups: u
              });
              o.AddScenePlayerData(M.W5n, d);
              if (M.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
                e = M.P5n;
                t = M.g8n;
              }
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("World", 48, "[CreatureController.JoinSceneNotify] 全量更新编队", ["编队数据", C]);
            }
            ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(C);
            ModelManager_1.ModelManager.VehicleModel.UpdateAllPlayerVehicleData(i);
          }
          ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState();
          a.SetBornInfo(e, t);
          TimeOfDayController_1.TimeOfDayController.SyncSceneTime(l.ARs.rjn, l.ARs.ojn, l.ARs.FRs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InitArea, l.wRs);
          o.SetRestoreEntityId(l.xRs);
          ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioState(l.wSs);
          ControllerHolder_1.ControllerHolder.GameAudioController.UpdateLoadingTypeFromTransitionOption(r.f5n);
          ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId = MathUtils_1.MathUtils.LongToNumber(l.tla);
          if (GameModeModel_1.GameModeModel.EnableLoadMapMode) {
            _ = ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.MapPath);
            if (_ && _.size !== 0) {
              await ControllerHolder_1.ControllerHolder.LoadMapController.Load(ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo);
            } else {
              switch (ModelManager_1.ModelManager.GameModeModel.LoadMapMode) {
                case GameMode_1.ELoadMapMode.ClientTravel:
                  await ControllerHolder_1.ControllerHolder.GameModeController.Load(ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo);
                  break;
                case GameMode_1.ELoadMapMode.LevelStreamingDynamic:
                  await ControllerHolder_1.ControllerHolder.LoadMapController.Load(ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo);
              }
            }
          } else {
            await ControllerHolder_1.ControllerHolder.GameModeController.Load(ModelManager_1.ModelManager.GameModeModel.JoinSceneInfo);
          }
          ControllerHolder_1.ControllerHolder.GameAudioController.UpdateLoadingType(undefined);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[CreatureController.JoinSceneNotify] 初始化EntityDataConfig失败。", ["InstanceId", e]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.JoinSceneNotify] 设置GameModeData失败。", ["InstanceId", e]);
      }
    }
  }
  static lfr(e) {
    for (const t of e) {
      this.CreateEntity(t);
    }
  }
  static RegisterCreateEntityFilter(e) {
    this.XVu.push(e);
  }
  static UnregisterCreateEntityFilter(e) {
    e = this.XVu.indexOf(e);
    if (e !== -1) {
      this.XVu.splice(e, 1);
    }
  }
  static YVu(e) {
    for (const t of this.XVu) {
      if (t.TryCreateEntity(e)) {
        return true;
      }
    }
    return false;
  }
  static dKc() {
    for (const e of this.XVu) {
      e.InstantiateEntities();
    }
  }
  static KVu(e) {
    for (const t of this.XVu) {
      if (t.TryRemoveEntity(e)) {
        return true;
      }
    }
    return false;
  }
  static CreateEntity(e, t = "Default") {
    if (!this.YVu(e)) {
      var r;
      var o;
      var a = MathUtils_1.MathUtils.LongToNumber(e.s5n);
      var l = e.zHn;
      if (l === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
        if (ModelManager_1.ModelManager.CreatureModel.GetOrAddDensityItem(a, e).DensityLevel > this.hYs) {
          r = e.ZHn;
          o = e.v9n;
          if (this.CheckEnableEntityLog(l) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 6, "[实体生命周期:创建实体] CreateEntity(Density拦截)", ["CreatureDataId", a], ["ConfigType", r], ["PbDataId", o], ["EntityType", l], ["Context", t]);
          }
          return;
        }
      }
      return this._Ys(a, e, t);
    }
  }
  static GetDensityItemByPbDataId(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetDensityItemByPbDataId(e);
  }
  static _Ys(t, e, r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    var a = e.ZHn;
    var l = e.v9n;
    var n = e.LEs;
    var i = e.zHn;
    var _ = e.rVn;
    if (this.CheckEnableEntityLog(i) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] CreateEntity(开始)", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n], ["IsVisible", _], ["Context", r]);
    }
    if (SeamlessTravelController_1.SeamlessTravelController.WasRoleInSeamlessTraveling(t)) {
      const d = ModelManager_1.ModelManager.SeamlessTravelModel.GetSeamlessTravelRoleEntityHandle(t);
      d?.Entity.GetComponent(134)?.StopFadeOut();
      var C = d?.Entity?.GetComponent(0);
      if (C) {
        ModelManager_1.ModelManager.CreatureModel.RemoveEntity(t, "无缝加载复用实体");
        d.CreatureDataId = t;
        ModelManager_1.ModelManager.CreatureModel.AddEntity(t, d);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "[无缝加载:重新添加保留实体", ["creatureDataId", t]);
        }
        ModelManager_1.ModelManager.CreatureModel.CheckSetPrefabEntity(d);
        C.SetCreatureDataId(t);
        C.SetLocation(e.l8n);
        C.SetRotation(e._8n);
        return d;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SeamlessTravel", 50, "无缝加载复用Entity失败");
        }
        return;
      }
    }
    if (o.ExistEntity(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 已经存在实体，创建实体失败。", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n]);
      }
    } else if (Global_1.Global.WorldEntityHelper) {
      var s = new CreateEntityData_1.CreateEntityData();
      s.Init(e);
      if (this.IsAllowedOnThisPlatform(s.PbEntityInitData)) {
        let e = undefined;
        switch (i) {
          case Protocol_1.Aki.Protocol.kks.HI_:
          case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
          case Protocol_1.Aki.Protocol.kks.Proto_Npc:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          case Protocol_1.Aki.Protocol.kks.Proto_Custom:
          case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
          case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneEntity:
            e = Global_1.Global.WorldEntityHelper.CreateWorldEntity(s);
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 下发了不支持的实体类型, 创建实体失败。", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n], ["EntityType", i]);
            }
            return;
        }
        if (e?.Valid) {
          e.Entity.GetComponent(134)?.StopFadeOut();
          o.AddEntity(t, e);
          if (ControllerHolder_1.ControllerHolder.CharacterController.InitData(e, e.Entity, s)) {
            CreatureController.SetEntityEnable(e.Entity, _, "CreatureController.CreateEntity");
            o.AddLoadingEntity(e);
            o.AddOwnerEntityInfo(t);
            C = e.Entity.GetComponent(0);
            o.CheckSetPrefabEntity(e);
            if (this.CheckEnableEntityLog(e) && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 实体详细数据。", ["CreatureDataId", t], ["EntityId", e.Id], ["ConfigType", a], ["EntityType", C.GetEntityType()], ["PbDataId", l], ["PrefabId", n], ["ModelId", C.GetModelId()], ["ModelBlueprintPath", C.ModelBlueprintPath], ["Visible", C.GetVisible()], ["PlayerId", C.GetPlayerId()], ["OwnerId", C.GetOwnerId()], ["Location", C.GetLocation()], ["Rotation", C.GetRotation()], ["Flag", e.Entity?.Flag]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateEntity, C, e);
            return e;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] InitData失败，创建实体失败。", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n]);
          }
          o.RemoveEntity(t, "CreateEntity执行InitData失败");
          ControllerHolder_1.ControllerHolder.CharacterController.Destroy(e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n]);
        }
      } else if (this.CheckEnableEntityLog(i) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 35, "[实体生命周期:创建实体] CreateEntity(平台拦截)", ["CreatureDataId", t], ["ConfigType", e.ZHn], ["PbDataId", e.v9n], ["EntityType", i], ["Context", r]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] WorldEntityHelper不存在，创建实体失败。", ["CreatureDataId", t], ["ConfigType", a], ["PbDataId", l], ["PrefabId", n]);
    }
  }
  static DestroyEntity(r, e = true) {
    var t;
    var o;
    var a;
    var l;
    if (!!r?.Valid && (!e || !r.PendingRemoving)) {
      r.PendingRemoving = true;
      o = (t = (l = r.Entity).GetComponent(0)).GetCreatureDataId();
      this.aTa.delete(o);
      this.IEa.RemoveEntity(r);
      ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(o, "DestroyEntity");
      if (this.CheckEnableEntityLog(r) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] DestroyEntity开始", ["CreatureDataId", t.GetCreatureDataId()], ["EntityId", r.Id], ["PendingRemove", e]);
      }
      if ((a = l.GetComponent(1)?.Owner)?.IsValid() && Global_1.Global.BaseCharacter === a && Global_1.Global.CharacterController) {
        Global_1.Global.CharacterController.UnPossess();
        Global_1.Global.BaseCharacter = undefined;
      }
      l.Disable("DestroyEntity");
      if (e) {
        if (!r.AllowDestroy) {
          TimerSystem_1.TimerSystem.Delay(() => {
            if (r.Valid && !r.AllowDestroy) {
              for (var [e, t] of r.HoldEntityMap) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("World", 3, "非法持有PendingRemove的Entity", ["CreatureDataId", r.CreatureDataId], ["EntityId", r.Id], ["Reason", e], ["Count", t]);
                }
              }
              r.ClearHoldEntity();
            }
          }, HOLD_ENTITY_TIMEOUT);
        }
        ModelManager_1.ModelManager.CreatureModel.AddPendingRemoveEntity(t.GetCreatureDataId(), r);
      } else if (Global_1.Global.WorldEntityHelper) {
        if (l = Global_1.Global.WorldEntityHelper.Destroy(r)) {
          ModelManager_1.ModelManager.WorldModel.AddDestroyActor(o, r.Id, a);
        } else {
          ControllerHolder_1.ControllerHolder.WorldController.DestroyEntityActor(o, r.Id, a, false);
        }
        if (this.CheckEnableEntityLog(r) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 3, "[实体生命周期:删除实体] DestroyEntity结束", ["CreatureDataId", o], ["EntityId", r.Id], ["EntitySystem.DestroyEntity结果", l]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:删除实体] WorldEntityHelper不存在，删除实体失败。", ["CreatureDataId", o], ["EntityId", r.Id]);
      }
    }
  }
  static LoadEntityAsync(e, t, r = false) {
    if (ModelManager_1.ModelManager.GameModeModel.MapDone || r) {
      if (this.TEa(e, this.nja)) {
        if (r) {
          e.Entity.GetComponent(0).IsPreAwakeEntity = true;
        }
        this.IEa.QueueToInvoke(e, t, this.nja.Component.GetCreatureDataId(), this.nja.Component.GetPbDataId());
      } else {
        t?.(this.nja.Result);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 地图未加载完成，创建实体失败。", ["EntityId", e?.Id], ["CreatureDataId", e?.CreatureDataId], ["PbDataId", e?.PbDataId]);
      }
      t?.(2);
    }
  }
  static TEa(e, t) {
    var r;
    t.Component = undefined;
    if (e?.Valid) {
      if ((r = e.Entity.GetComponent(0)).GetRemoveState()) {
        return !(t.Result = 4);
      } else if (e.IsInit) {
        return !(t.Result = 3);
      } else {
        t.Result = 0;
        t.Component = r;
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] entity.Valid=false，创建实体失败。");
      }
      return !(t.Result = 2);
    }
  }
  static LEa(r, o) {
    if (!this.TEa(r, this.nja)) {
      return this.nja.Result;
    }
    const a = this.nja.Component;
    if (PreloadDefine_1.PreloadSetting.UseNewPreload && a.GetPreloadFinished()) {
      return 3;
    }
    if (!a.GetLoading()) {
      a.SetLoading(true);
      let t = undefined;
      if (ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal) {
        (t = new LogProfiler_1.LogProfiler("预加载实体Profiler:" + a.GetCreatureDataId())).Start();
      }
      const l = e => {
        if (this.CheckEnableEntityLog(r) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Preload", 3, "预加载实体:结束", ["EntityId", r.Id], ["CreatureDataId", a.GetCreatureDataId()], ["PbDataId", a.GetPbDataId()], ["是否成功", e === 3], ["预加载结果", e]);
        }
        if (ModelManager_1.ModelManager.PreloadModel.UseEntityProfilerInternal && (t.Stop(), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Preload", 3, t.ToString());
        }
        if (!r?.Valid || a.GetRemoveState()) {
          o(4);
        } else {
          o(e);
        }
      };
      if (this.CheckEnableEntityLog(r) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 3, "预加载实体:开始", ["EntityId", r.Id], ["CreatureDataId", a.GetCreatureDataId()], ["PbDataId", a.GetPbDataId()], ["Reason", "CreatureController.LoadEntityAsync"]);
      }
      if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
        PreloadControllerNew_1.PreloadControllerNew.PreloadEntity(r, t, l);
      } else {
        PreloadController_1.PreloadController.PreloadEntity(r, t, e => {
          e = e ? 3 : 2;
          l(e);
        });
      }
    }
    return 1;
  }
  static cfr(t, r) {
    if (t?.Valid) {
      const l = t.Entity.GetComponent(0);
      const n = l.GetCreatureDataId();
      if (l.GetRemoveState()) {
        ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(n, "RemoveStateBeforeQueue");
        r?.(4);
      } else {
        var e = ControllerHolder_1.ControllerHolder.CreatureGroupController.GetBindGroup(n);
        if (e) {
          var o = Math.max(...e.map(e => ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Priority ?? 0));
          for (const i of e) {
            var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
            if (a?.Valid) {
              a.Priority = o;
              ControllerHolder_1.ControllerHolder.CharacterController.SortItem(a);
            }
          }
        }
        ControllerHolder_1.ControllerHolder.CharacterController.AddEntityToAwakeQueue(t, e => {
          if (e) {
            if (l.GetRemoveState()) {
              ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(n, "RemoveStateAfterQueue");
              r?.(4);
            } else {
              t?.Entity?.ExecutePendingEnableProcess();
              if (r) {
                CreatureController.aTa.set(n, r);
              }
              if (ControllerHolder_1.ControllerHolder.CreatureGroupController.HasBindGroup(n)) {
                ControllerHolder_1.ControllerHolder.CreatureGroupController.RefreshBindGroup(n, "Entity Started");
              } else {
                CreatureController.ActivateEntityRequest(t);
              }
            }
          } else {
            ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(n, "initOrStartFailed");
            r?.(2);
          }
        });
      }
    } else {
      ControllerHolder_1.ControllerHolder.CreatureGroupController.RemoveFromBindGroup(t.CreatureDataId, "handleInvalid");
      r?.(4);
    }
  }
  static ActivateEntityRequest(n) {
    var e = (n.Entity?.Flag ?? 0) & 8;
    if (!e && !n.HasSendingRequest) {
      n.HasSendingRequest = true;
      if (GlobalData_1.GlobalData.Networking()) {
        const i = n.Entity.GetComponent(0);
        switch (i.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_Custom:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          case Protocol_1.Aki.Protocol.kks.Proto_Animal:
            CreatureController._Ta(n, true);
            return;
        }
        e = Protocol_1.Aki.Protocol.ges.create();
        const _ = i.GetCreatureDataId();
        e.F4n = MathUtils_1.MathUtils.NumberToLong(_);
        if (this.CheckEnableEntityLog(n) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 请求Activate实体", ["CreatureDataId", _], ["PbDataId", i.GetPbDataId()], ["EntityId", n.Id]);
        }
        Net_1.Net.Call(18741, e, t => {
          var r = (n.Entity?.Flag ?? 0) & 8;
          if (!r) {
            let e = false;
            if (t) {
              if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
                e = true;
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18589, undefined, false, true);
              } else {
                CreatureController.SetEntityEnable(n.Entity, t.rVn, "EntityActiveResponse");
                var r = WorldGlobal_1.WorldGlobal.ToUeVector(t.l8n);
                var o = WorldGlobal_1.WorldGlobal.ToUeRotator(t._8n);
                n.Entity.GetComponent(1)?.SetActorLocationAndRotation(r, o, "ActivateEntityRequest");
                for (const l of t.zEs) {
                  var a = l.C3s;
                  i.ComponentDataMap.set(a, l);
                }
              }
            } else {
              e = true;
            }
            if (ModelManager_1.ModelManager.CreatureModel.GetEntityId(_) !== n.Id) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Entity", 3, "[实体生命周期:创建实体] 激活实体时，实体已经销毁", ["CreatureDataId", _], ["EntityConfigType", i.GetEntityConfigType()], ["PbDataId", i.GetPbDataId()]);
              }
            } else {
              if (e && Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] 激活实体消息异常，创建实体失败。", ["CreatureDataId", _], ["EntityConfigType", i.GetEntityConfigType()], ["PbDataId", i.GetPbDataId()]);
              }
              if (this.CheckEnableEntityLog(n) && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 服务器返回Activate实体成功", ["CreatureDataId", _], ["PbDataId", i.GetPbDataId()], ["EntityId", n.Id]);
              }
              CreatureController._Ta(n, true);
            }
          }
        });
      } else {
        CreatureController._Ta(n, true);
      }
    }
  }
  static dfr(e) {
    var t = e.Entity.GetComponent(0);
    t.SetLoading(false);
    var r = e.Entity.GetComponent(1)?.Owner;
    var o = t.GetEntityType();
    if (o === Protocol_1.Aki.Protocol.kks.Proto_Custom || o === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity || o === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity || r) {
      if (this.CheckEnableEntityLog(e) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "[实体生命周期:创建实体] 实体创建成功", ["CreatureDataId", t.GetCreatureDataId()], ["EntityId", e.Id], ["PbDataId", t.GetPbDataId()], ["Entity.Active", e.Entity.Active]);
      }
      CreatureController.SetEntityEnable(e.Entity, t.GetVisible(), "CreatureController.AfterEntityActivate");
      if (CreatureController.NotifyAddEntity(Protocol_1.Aki.Protocol.Nks.Proto_Normal, e, r) && (CreatureController.NotifySpawnBoss(e), t.IsRole() && ModelManager_1.ModelManager.WorldModel.AddIgnore(r), t.IsPlayer())) {
        o = t.GetPlayerId();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpawnPlayer, e, o);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[实体生命周期:创建实体] actor无效，注意检查前面的组件的报错，创建实体失败。", ["CreatureDataId", t.GetCreatureDataId()], ["EntityId", e.Id], ["PbDataId", t.GetPbDataId()]);
      }
      return false;
    }
  }
  static ChangeMeshAnim(e, t, r) {
    e.SetSkeletalMesh(t);
    e.SetAnimClass(r);
  }
  static IsAllowedOnThisPlatform(e) {
    var t;
    return !e || !e.ComponentsData || !(t = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityVisibleComponent")) || t.TargetPlatform !== 1 || !Info_1.Info.IsMobilePlatform() || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Entity", 35, "当前平台拦截该实体", ["CreatureDataId", e.BlueprintType], ["TargetPlatform", t.TargetPlatform], ["CurPlatform", Info_1.Info.PlatformType]), 1);
  }
  static OnLeaveLevel() {
    var e = ModelManager_1.ModelManager.CreatureModel;
    var t = e.GetPlayerId();
    if (t !== 0) {
      e.LeavingLevel = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.OnLeaveLevel] OnLeaveLevel 开始");
      }
      if (!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
        CameraController_1.CameraController.FightCamera.LogicComponent.SetCharacter(undefined);
      }
      ConfigManager_1.ConfigManager.WorldConfig.ClearCommonSkillData();
      try {
        var r = e.GetAllEntities();
        var o = e.DelayRemoveContainer.GetAllEntities();
        for (let e = o.length - 1; e >= 0; e--) {
          var a = o[e];
          CreatureController.DestroyEntity(a, false);
        }
        for (let e = r.length - 1; e >= 0; e--) {
          var l = r[e];
          var n = l.Entity.GetComponent(0);
          if (SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(l.Entity)) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 4, "[无缝加载:保留实体]", ["EntityId", l.Id]);
            }
          } else if (!CreatureController.RemoveEntity(n.GetCreatureDataId(), "OnLeaveLevel")) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[CreatureController.ClearWorldData] 销毁实体失败。", ["CreatureDataId", n.GetCreatureDataId()], ["实体类型", n.GetEntityType()]);
            }
          }
        }
        ControllerHolder_1.ControllerHolder.WorldController.DoLeaveLevel();
        ModelManager_1.ModelManager.AttachToActorModel.ClearEntityActor("CreatureController.OnLeaveLevel");
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("World", 3, "[CreatureController.ClearWorldData] 销毁实体异常。", e, ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[CreatureController.ClearWorldData] 销毁实体异常。", ["error", e]);
        }
      }
      if (!Info_1.Info.IsBuildDevelopmentOrDebug) {
        ModelManager_1.ModelManager.CreatureModel.EnableEntityLog = false;
      }
      e.LeavingLevel = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "[CreatureController.OnLeaveLevel] OnLeaveLevel 结束");
      }
    }
    return true;
  }
  static ChangeLockTagByCreatureGenId(e, t) {
    var r;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (o.IsInit && o.Entity.GetComponent(0).GetOwnerId() === e && (r = o.Entity.GetComponent(105))) {
        r.ChangeLockTag(t);
      }
    }
  }
  static ChangeLockTagByTeleportPbDataId(e, t) {
    var r;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (o.IsInit && o.Entity.GetComponent(0).GetPbDataId() === e && (r = o.Entity.GetComponent(105))) {
        r.ChangeLockTag(t);
      }
    }
  }
  static LoadActorByPbModelConfig(e, t) {
    var r = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(UE.KismetSystemLibrary.MakeSoftObjectPath(e.BluePrintClass));
    if (r) {
      r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(r.ToAssetPathName(), UE.Class);
      if ((r = ActorSystem_1.ActorSystem.Get(r, t))?.IsValid()) {
        r.SetActorHiddenInGame(true);
        r.SetActorTickEnabled(false);
        r.SetActorEnableCollision(false);
      }
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。", ["BluePrintId", e.BluePrintId]);
    }
  }
  static AddDelayRemoveEntity(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel;
    if (r.AddDelayRemoveEntity(e, t)) {
      r.RemoveEntity(e, "AddDelayRemoveEntity 加入延迟删除列表");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[CreatureController.AddPendingRemoveEntity] 实体添加到PendingRemoveEntityMap列表失败。", ["CreatureDataId", e]);
    }
  }
  static CheckDelayRemove(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetEntityWithDelayRemoveContainer(e);
    return !!(a = a || t !== Protocol_1.Aki.Protocol.rLs.F6n ? a : o.DelayRemoveContainer.GetEntityByPbDataId(r))?.Valid && (o.RemoveDelayRemoveEntity(a.CreatureDataId), CreatureController.DestroyEntity(a, false), true);
  }
  static CheckPendingRemove(e, t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel;
    let a = o.GetPendingRemoveEntity(e);
    return !!(a = a || t !== Protocol_1.Aki.Protocol.rLs.F6n ? a : o.GetPendingRemoveEntityByPbDataId(r))?.Valid && (o.RemovePendingRemoveEntity(a.CreatureDataId), CreatureController.DestroyEntity(a, false), true);
  }
  static DelayRemoveEntityFinished(t) {
    if (t) {
      let e = undefined;
      var r;
      var o;
      if ((e = t instanceof Entity_1.Entity ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t) : t)?.Valid && !e.PendingRemoving) {
        t = ModelManager_1.ModelManager.CreatureModel;
        if (r = e.Entity.GetComponent(0)?.GetCreatureDataId()) {
          if (GlobalData_1.GlobalData.Networking()) {
            if ((o = t.DelayRemoveContainer.GetEntity(r))?.Valid) {
              t.DelayRemoveContainer.RemoveEntity(r);
              CreatureController.DestroyEntity(o);
            }
          } else {
            CreatureController.RemoveEntity(r, "DelayRemoveEntityFinished", Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[CreatureController.DelayRemoveEntityFinished] CreatureDataId无效, 延迟删除失败。", ["CreatureDataId", r]);
        }
      }
    }
  }
  static EntityLogicToEntityType(e) {
    switch (e) {
      case "Item":
        return Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
      case "Npc":
        return Protocol_1.Aki.Protocol.kks.Proto_Npc;
      case "Monster":
        return Protocol_1.Aki.Protocol.kks.Proto_Monster;
      case "Vision":
        return Protocol_1.Aki.Protocol.kks.Proto_Vision;
      default:
        return Protocol_1.Aki.Protocol.kks.Proto_Custom;
    }
  }
  static MonsterBoomRequest(e, t) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (e && e.Entity) {
      CombatMessage_1.CombatNet.Send(16939, e.Entity, Protocol_1.Aki.Protocol.be_.create({
        qKn: t
      }));
    }
  }
  static ParseTravelConfig(t) {
    var r = new SeamlessTravelDefine_1.SeamlessTravelContext();
    switch (t.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
        r.EffectPath = t.q$_?.y5n;
        SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(r);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
        let e = IAction_1.EFadeInScreenShowType.Black;
        if (t.q$_?.QNc?.HNc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite) {
          ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor = IAction_1.EMovieBackgroundType.White;
        } else {
          ModelManager_1.ModelManager.GameModeModel.Mp4FadeInScreenColor = IAction_1.EMovieBackgroundType.Black;
        }
        if (t.q$_?.QNc?.$Nc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite) {
          ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = IAction_1.EMovieBackgroundType.White;
        } else {
          ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = IAction_1.EMovieBackgroundType.Black;
        }
        if (t.q$_?.KNc !== undefined) {
          e = t.q$_?.KNc === Protocol_1.Aki.Protocol.KNc.Proto_AfterTeleportScreenColorWhite ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black;
        }
        if (t.q$_?.WNc) {
          ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = true;
          ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, 1, e);
        } else {
          ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = false;
        }
        ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
        ControllerHolder_1.ControllerHolder.GameModeController.SetTravelMp4(true, t.q$_.y5n);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = t.E5n;
        ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = true;
        ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        if (ModelManager_1.ModelManager.SeamlessTravelModel?.HasPreEnableSeamlessTravel) {
          SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(ModelManager_1.ModelManager.SeamlessTravelModel.Config);
        } else {
          r.ParseConfig(t.R$s);
          SeamlessTravelController_1.SeamlessTravelController.EnableSeamlessTravel(r);
        }
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
        ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = true;
        ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
        if (t.EIl === 0) {
          ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.White;
        } else {
          ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
        }
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
        ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(t.Th1?.bh1);
    }
  }
  static SetEntityEnable(e, t, r, o = false) {
    if (e?.Valid && t !== !e.HasDisableKey(2) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 28, "CreatureController.SetEntityEnable", ["Enable", t], ["EntityId", e.Id], ["Reason", r]), (r = ModelManager_1.ModelManager.CreatureModel).DisableLock.has(e.Id) && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 28, "递归设置EntityEnable"), r.DisableLock.add(e.Id), e.GetComponent(0).SetVisible(t), t ? e.EnableByKey(2, true) : e.DisableByKey(2, true), r.DisableLock.delete(e.Id), o)) {
      CreatureController.Cfr(e, !e.HasDisableKey(2));
    }
  }
  static SetActorVisible(e, t, r, o, a, l = false) {
    var n;
    var i;
    if (e?.Valid && (n = e.GetComponent(1), i = e.GetComponent(102), Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 28, "CreatureController.SetActorVisible", ["Visible", t], ["EntityId", e.Id], ["Reason", a]), n.SetActorVisible(t, a), n.SetCollisionEnable(r, a), i?.SetIsInGame(t), this.SetActorMovable(e, o, a), l)) {
      CreatureController.gfr(e, t);
    }
  }
  static SetActorMovable(e, t, r) {
    var o;
    var a = e.GetComponent(114);
    var l = e.GetComponent(115);
    if (a && l && !t != !!(o = ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.get(e.Id))) {
      if (t) {
        a.Enable(o[0], r);
        l.Enable(o[1], r);
        ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.delete(e.Id);
      } else {
        o = [a.Disable(r), l.Disable(r)];
        ModelManager_1.ModelManager.CreatureModel.ActorMovableHandleMap.set(e.Id, o);
      }
    }
  }
  static Cfr(e, t) {
    var r = e.GetComponent(0);
    var o = Protocol_1.Aki.Protocol.le_.create();
    o.s5n = MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId());
    o.rVn = t;
    CombatMessage_1.CombatNet.Send(22140, e, o);
  }
  static gfr(e, t) {
    var r;
    var o;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      r = e.GetComponent(0);
      (o = Protocol_1.Aki.Protocol.Oe_.create()).s5n = MathUtils_1.MathUtils.NumberToLong(r.GetCreatureDataId());
      o.oVn = t;
      CombatMessage_1.CombatNet.Send(18545, e, o);
    }
  }
  static RecoverDensityEntity(e, t) {
    var r = this.GetDensityItemByPbDataId(e);
    if (r && !(r.DensityLevel <= this.hYs) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 26, "恢复人群密度屏蔽的实体", ["PbDataId", e], ["context", t]), e = this._Ys(r.CreatureDataId, r.EntityData, t))) {
      ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(e);
    }
  }
  static RefreshDensityLevel(e) {
    if (this.hYs !== e) {
      for (var t, r, o, a, l, n = ModelManager_1.ModelManager.CreatureModel; this.hYs < e;) {
        ++this.hYs;
        for ([t, r] of n.GetDensityLevelGroup(this.hYs)) {
          if (r.EntityData.oys === 2) {
            this.uf1(t);
            n.RemoveDensityItem(t);
          } else if ((o = this._Ys(t, r.EntityData, "Density")) && ModelManager_1.ModelManager.GameModeModel.MapDone) {
            ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(o);
          }
        }
      }
      while (this.hYs > e) {
        for ([a, l] of n.GetDensityLevelGroup(this.hYs)) {
          if (l.EntityData.oys === 2) {
            this.uf1(a);
            n.RemoveDensityItem(a);
          } else {
            this.rfr(a, "DensityLevelChanged", Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce);
          }
        }
        --this.hYs;
      }
    }
  }
  static uf1(e) {
    var t = Protocol_1.Aki.Protocol.Zes.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(27858, t, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 18281);
      }
    });
  }
  static SetKawaiiEnable(e) {
    var t;
    var r = ModelManager_1.ModelManager.CreatureModel;
    r.SetKawaiiMask(e > 0);
    for (const o of r.GetAllEntities()) {
      if (o.Valid && (t = o.Entity?.GetComponent(178))?.Actor?.Mesh) {
        if (e > 0) {
          t.Actor.Mesh.KuroLodMask &= CreatureModel_1.ENABLE_KAWAII_MASK;
        } else {
          t.Actor.Mesh.KuroLodMask |= CreatureModel_1.DISABLE_KAWAII_MASK;
        }
      }
    }
  }
  static OnModifyEntityCampNotify(e, t) {
    var r;
    var o;
    var a;
    if (e?.Valid) {
      if ((r = e.GetComponent(3))?.Valid) {
        o = r.Actor.Camp;
        a = t.nys;
        r.Actor.SetCamp(a);
        e.GetComponent(0).SetServerCamp(a);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityCampModify, e, o, a);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 20, "修改对象阵营时不存在CharacterActorComponent", ["CreatureId", t.TVn]);
      }
    } else {
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(t.TVn));
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 20, "修改对象阵营时对象已经不存在", ["CreatureId", t.TVn], ["EntityId", r]);
      }
    }
  }
  static GetCharactersLocationNearBy(e, t, r) {
    var o;
    var a = new UE.SCharacterLocationsAndRadius();
    this.jRc.FromUeVector(e);
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.jRc, t, 248, this.Ioe);
    for (const i of this.Ioe) {
      if (i.Valid && i.Entity?.Active && (o = i.Entity.GetComponent(3))?.Active) {
        this.HRc.push(new LocationStruct(o));
      }
    }
    if (r < this.HRc.length) {
      var l = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy ?? Vector_1.Vector.Create(e);
      for (const _ of this.HRc) {
        _.DistSquared = Vector_1.Vector.DistSquared(l, _.ActorComp.ActorLocationProxy);
      }
      this.HRc.sort((e, t) => e.DistSquared - t.DistSquared);
      for (let e = 0; e < r; ++e) {
        var n = this.HRc[e];
        a.Locations.Add(n.ActorComp.ActorLocation);
        a.Radius.Add(n.ActorComp.ScaledRadius);
        a.HalfHeight.Add(n.ActorComp.ScaledHalfHeight);
      }
    } else {
      for (const C of this.HRc) {
        a.Locations.Add(C.ActorComp.ActorLocation);
        a.Radius.Add(C.ActorComp.ScaledRadius);
        a.HalfHeight.Add(C.ActorComp.ScaledHalfHeight);
      }
    }
    this.HRc.length = 0;
    return a;
  }
}
(_a = CreatureController).xe = idDefaultValue;
CreatureController.ofr = Stats_1.Stat.Create("CreatureController.RemoveEntity");
CreatureController.nfr = Stats_1.Stat.Create("CreatureController.RemoveEntityInternal");
CreatureController.Mj1 = undefined;
CreatureController.Ej1 = 0.5;
CreatureController.hYs = 2;
CreatureController.nZa = undefined;
CreatureController.OnRemoveTargetEntity = e => {
  EventSystem_1.EventSystem.RemoveTargetEvents(e);
};
CreatureController.V0r = e => {
  BattleLogicController_1.BattleLogicController.OnEntityLivingStatusNotify(e);
};
CreatureController.j0r = e => {
  for (const o of e.QRs) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(o.s5n));
    if (!t?.Valid) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 19, "[CreatureController.MonsterAttributeArrayNotify] 更新Monster属性失败, Entity无效或不存在。", ["CreatureDataId", o.s5n]);
      }
      return;
    }
    var r = t.Entity.GetComponent(174);
    if (r) {
      for (const a of Object.keys(o.GSs)) {
        r.SetBaseValue(Number(a), o.GSs[a]);
      }
    }
  }
};
CreatureController.FIc = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.YWn);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  var r = t.Entity.GetComponent(0);
  if (t && r) {
    const o = [];
    e.zRs.forEach(e => {
      e = MathUtils_1.MathUtils.LongToNumber(e);
      o.push(e);
    });
    r.SetSummonRandomInfo(o);
  }
};
CreatureController.x0r = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  var r = MathUtils_1.MathUtils.LongToNumber(e.Z5n);
  t.Entity.GetComponent(43)?.SetVisionSkillInformationList(e.CIs, r);
  t.Entity.GetComponent(0).VisionSkillServerEntityId = r;
  EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.EntityVisionSkillChanged);
};
CreatureController.w0r = e => {
  var t;
  var r = MathUtils_1.MathUtils.LongToNumber(e.s5n);
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
  if (o) {
    t = o.Entity.GetComponent(0);
    if (e.W5n) {
      t.SetPlayerId(e.W5n);
    }
    if (e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      if (t = o.Entity.GetComponent(3).Actor) {
        t.Kuro_SetRole(2);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "ChangeEntityRoleNotify,actor无效。", ["CreatureDataId", r]);
      }
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("World", 3, "[CreatureController.ChangeEntityRoleNotify] 不存在Entity。", ["CreatureDataId", r]);
  }
};
CreatureController.P0r = e => {
  CreatureController.H$a(e);
};
CreatureController.J0r = e => {
  var t;
  if (e.VRs && (e = e.W5n) !== (t = ModelManager_1.ModelManager.CreatureModel).GetPlayerId()) {
    t.GetScenePlayerData(e)?.SetRemoteSceneLoading(true);
  }
};
CreatureController.z0r = e => {
  var e = e.W5n;
  var t = ModelManager_1.ModelManager.CreatureModel;
  if (e !== t.GetPlayerId()) {
    if (t = t.GetScenePlayerData(e)) {
      t.SetRemoteSceneLoading(false);
      if (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId) {
        if (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("World", 48, "模拟端加载完成，显示玩家当前实体", ["entity", t.Id]);
          }
          t.EnableByKey(1, true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 48, "模拟端加载完成，无法获取当前实体id", ["playerId", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("World", 48, "模拟端加载完成，无法获取玩家数据", ["playerId", e]);
    }
  }
};
CreatureController.Z0r = e => {
  e = e.P8n;
  HotFixUtils_1.HotFixUtils.EvalScript(e);
};
CreatureController.UploadEventCallBack = (e, t) => {};
CreatureController.oZa = e => {
  CreatureController.IBi();
};
CreatureController.SceneLoadingTimeOutNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("World", 5, "世界加载超时");
  }
};
CreatureController.X0r = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (r) {
    (r = r.Entity.GetComponent(206))?.AddTag(1008164187);
    if (e.W5n !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      r?.AddTag(1961456719);
      r?.AddTag(1800978500);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Animal", 29, "[CreatureController.AnimalDieNotify] 不存Entity。", ["CreatureDataId", t]);
  }
};
CreatureController.B0r = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (r) {
    r.Entity.GetComponent(0).SetHardnessModeId(e.$Wn);
    (r = r.Entity.GetComponent(61)).SetHardnessModeId(e.$Wn);
    r.RefreshHardnessModeConfig();
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("World", 14, "[CreatureController.HardnessModeChangedNotify] entity为空。", ["creatureDataId", t]);
  }
};
CreatureController.PushContextIdNotify = e => {
  ModelManager_1.ModelManager.CombatMessageModel.SetLastMessageId(MathUtils_1.MathUtils.LongToBigInt(e.s5n));
};
CreatureController.JoinSceneNotify = e => {
  CreatureController.hfr(e);
};
CreatureController.AfterJoinSceneNotify = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("World", 3, "[CreatureController.AfterJoinSceneAsync] AfterJoinSceneAsync");
  }
  if (ModelManager_1.ModelManager.GameModeModel.HasGameModeData) {
    ModelManager_1.ModelManager.GameModeModel.AfterJoinSceneNotifyPromise.SetResult(true);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("World", 3, "未下发场景数据,就下发了AfterJoinSceneNotify，服务器流程有问题");
  }
};
CreatureController.G0r = e => {
  const t = new Array();
  const r = new Array();
  for (const l of e.WDs) {
    var o = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(l);
    t.push(o.DataLayer);
  }
  for (const n of e.jDs) {
    var a = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(n);
    r.push(a.DataLayer);
  }
  ControllerHolder_1.ControllerHolder.GameModeController.SwitchDataLayer(t, r, e => {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 29, "切换DataLayer失败", ["unloads", t.join()], ["newLoads", r.join()]);
      }
    }
  }, e.$Yc);
};
CreatureController.N0r = e => {
  var e = e.jRs.W5n;
  var t = new ScenePlayerData_1.ScenePlayerData(e);
  t.SetTimerStart();
  t.SetRemoteSceneLoading(true);
  ModelManager_1.ModelManager.CreatureModel.AddScenePlayerData(e, t);
  ModelManager_1.ModelManager.VehicleModel.AddOtherPlayerVehicleData(e);
  ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(e, 2);
  ModelManager_1.ModelManager.OnlineModel.DeleteOtherScenePlayerDataList(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerChanged);
};
CreatureController.XVu = new Array();
CreatureController.IEa = new WaitEntityToLoadTask_1.WaitEntityToLoadTask(_a.LEa.bind(_a), _a.cfr.bind(_a));
CreatureController.nja = {
  Result: 0,
  Component: undefined
};
CreatureController.aTa = new Map();
CreatureController._Ta = (e, t) => {
  var r = e.Entity.GetComponent(0);
  var o = r.GetCreatureDataId();
  var a = CreatureController.aTa.get(o);
  CreatureController.aTa.delete(o);
  if (t) {
    if (r.GetRemoveState()) {
      a?.(4);
    } else {
      ControllerHolder_1.ControllerHolder.CharacterController.ActivateEntity(e);
      if (CreatureController.dfr(e)) {
        a?.(3);
        if (ControllerHolder_1.ControllerHolder.CreatureGroupController.HasBindGroup(o)) {
          ControllerHolder_1.ControllerHolder.CreatureGroupController.RefreshBindGroup(o, "Entity Activated");
        } else if (e.Entity) {
          EntitySystem_1.EntitySystem.PostActive(e.Entity);
        }
      } else {
        a?.(2);
      }
    }
  } else {
    a?.(2);
  }
};
CreatureController.SwitchBattleModeNotify = e => {
  for (const t of e.AAs) {
    BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(t, true);
  }
  for (const r of e.DAs) {
    BattleSetting_1.BattleSetting.ReceiveSetModuleNetworkState(r, false);
  }
};
CreatureController.GravityUpdateNotify = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (r) {
    r = r.Entity?.GetComponent(179) ?? r.Entity?.GetComponent(237);
    if (r) {
      var o = Vector_1.Vector.Create(e.wI_);
      if (ModelManager_1.ModelManager.TeleportModel?.IsTeleport) {
        var a = ModelManager_1.ModelManager.TeleportModel.TeleportEntityCreatureDataId !== 0 ? ModelManager_1.ModelManager.TeleportModel.TeleportEntityCreatureDataId : ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.CreatureDataId;
        if (a && a === t) {
          if (ModelManager_1.ModelManager.TeleportModel.TargetGravityDirect?.Equals(o, MathCommon_1.MathCommon.KindaSmallNumber)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Movement", 39, "[CreatureController.GravityUpdateNotify] 实体传送过程中收到更新重力方向，且重力方向与传送目标重力方向一致，忽略", ["GravityDirection", e.wI_]);
            }
            return;
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Movement", 39, "[CreatureController.GravityUpdateNotify] 实体传送过程中收到更新重力方向，且重力方向与传送目标重力方向不一致，可能造成问题，请关注", ["GravityDirection", e.wI_], ["TeleportTargetGravityDirection", ModelManager_1.ModelManager.TeleportModel.TargetGravityDirect]);
          }
        }
      }
      r.SetGravityDirect(Vector_1.Vector.Create(e.wI_));
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 4, "[CreatureController.GravityUpdateNotify] 更新重力方向", ["GravityDirection", e.wI_]);
      }
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Animal", 29, "[CreatureController.GravityUpdateNotify] 不存Entity。", ["CreatureDataId", t]);
  }
};
CreatureController.BattleLogNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Battle", 19, "Server Log", ["log", e.PAs]);
  }
};
CreatureController.W0r = e => {
  ControllerHolder_1.ControllerHolder.GameModeController.Change(e).catch(() => {});
};
CreatureController.STn = e => {
  ModelManager_1.ModelManager.GameModeModel.ChangeSceneModeEndNotifyPromise.SetResult(true);
};
CreatureController.Q0r = e => {
  ModelManager_1.ModelManager.CreatureModel.SetRestoreEntityId(e.xRs);
};
CreatureController.K0r = e => {
  var t = e.vTs;
  var r = ModelManager_1.ModelManager.CreatureModel;
  for (const l of Object.keys(t)) {
    var o = Number(l);
    var a = t[l];
    r.RecordEntitySilenceState(o, a);
  }
};
CreatureController.$0r = e => {
  ModelManager_1.ModelManager.WorldModel.UpdateWorldState(e.KBs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnReceivePlayerVar);
};
CreatureController.Y0r = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.YWn);
  ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(0).SummonEntityIds = e.zRs.map(e => MathUtils_1.MathUtils.LongToNumber(e));
};
CreatureController.OnCreateEntityFail = e => {
  ModelManager_1.ModelManager.CreatureModel.RemoveEntity(e, "OnCreateEntityFail");
};
CreatureController.jRc = Vector_1.Vector.Create();
CreatureController.Ioe = [];
CreatureController.HRc = new Array();
__decorate([CombatMessage_1.CombatNet.Listen("Wul", false)], CreatureController, "OnModifyEntityCampNotify", null);
exports.CreatureController = CreatureController;
class LocationStruct {
  constructor(e) {
    this.ActorComp = e;
    this.DistSquared = 0;
  }
}
//# sourceMappingURL=CreatureController.js.map