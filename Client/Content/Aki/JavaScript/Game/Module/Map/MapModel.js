"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapModel = undefined;
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const TrimLru_1 = require("../../../Core/Container/TrimLru");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MapDefine_1 = require("./MapDefine");
const MapUtil_1 = require("./MapUtil");
const MapLogger_1 = require("./Misc/MapLogger");
class MapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.MDi = 0;
    this.EDi = undefined;
    this.SDi = undefined;
    this.yDi = undefined;
    this.IDi = undefined;
    this.TDi = undefined;
    this.LDi = undefined;
    this.Nhl = undefined;
    this.DDi = undefined;
    this.Kpc = undefined;
    this.UDi = undefined;
    this.ADi = undefined;
    this.SSl = undefined;
    this.PDi = undefined;
    this.K4u = [];
    this.UnlockMapBlockIds = [];
    this.LastSafeLocation = Vector_1.Vector.Create();
    this.CacheEnrichmentAreaWorldMapCircle = undefined;
    this.CacheEnrichmentAreaEntityId = 0;
    this.HonamiScanMarkInfo = new Map();
    this.Wcl = undefined;
    this.Qcl = undefined;
    this.MapLifeEventListenerTriggerMap = undefined;
    this.Qcc = [];
    this.Tj1 = new Set();
    this.of1 = new Map();
    this.rQd = undefined;
    this.LastHighLevelAreaInner = undefined;
    this.rAg = undefined;
    this.yW1 = new Map();
    this.SW1 = new TrimLru_1.TrimLru(3);
  }
  get LastHighLevelArea() {
    return this.LastHighLevelAreaInner;
  }
  set LastHighLevelArea(e) {
    this.LastHighLevelAreaInner = e;
  }
  OnInit() {
    this.EDi = new Map();
    this.LDi = new Map();
    this.Nhl = new Map();
    this.DDi = new Map();
    this.ADi = new Map();
    this.SSl = new Set();
    this.UDi = new Map();
    this.TDi = new Map();
    this.SDi = new Map();
    this.yDi = new Map();
    this.IDi = new Map();
    this.PDi = new Map();
    this.MapLifeEventListenerTriggerMap = new Map();
    this.Wcl = new Map();
    this.Qcl = new Map();
    this.UnlockMapBlockIds = [];
    this.of1 = new Map();
    this.rQd = new Map();
    this.rAg = new Map();
    this.rAg.set(1, new Set());
    this.rAg.set(2, new Set());
    this.InitTeleportMarkQueryCache();
    return true;
  }
  OnChangeMode() {
    ModelManager_1.ModelManager.TrackModel.ClearTrackData();
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(undefined);
    return true;
  }
  OnClear() {
    this.EDi.clear();
    this.LDi.clear();
    this.Nhl.clear();
    this.DDi.clear();
    this.ADi.clear();
    this.SSl.clear();
    this.SDi.clear();
    this.yDi.clear();
    this.IDi.clear();
    this.PDi.clear();
    this.Wcl.clear();
    this.Qcl.clear();
    this.of1.clear();
    this.rQd.clear();
    this.rAg.clear();
    this.EDi = undefined;
    this.LDi = undefined;
    this.Nhl = undefined;
    this.DDi = undefined;
    this.ADi = undefined;
    this.SSl = undefined;
    this.Kpc = undefined;
    this.CacheEnrichmentAreaWorldMapCircle = undefined;
    this.CacheEnrichmentAreaEntityId = 0;
    return !(this.rAg = undefined);
  }
  GetUnlockedTeleportMap() {
    return this.LDi;
  }
  GetDynamicMark(e) {
    return this.TDi?.get(e);
  }
  GetMark(e, r) {
    return this.EDi.get(e)?.get(r);
  }
  GetMarkByType(e) {
    return this.EDi.get(e);
  }
  GetMarkCountByType(e) {
    return this.EDi.get(e)?.size ?? 0;
  }
  GetConfigMarkTrackTarget(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    if (e !== undefined) {
      if (e.EntityConfigId) {
        return e.EntityConfigId;
      }
      if (e.MarkVector) {
        return Vector_1.Vector.Create(e.MarkVector);
      }
    }
    return 0;
  }
  GetMarkByQuestId(e) {
    var r = this.GetMarkByType(12);
    if (r) {
      for (const a of r.values()) {
        var t = a;
        if (t.NodeId) {
          var i = t.TreeId;
          var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(i);
          if (i && i.TreeConfigId === e) {
            return t;
          }
        } else if (t.TreeId === e) {
          return t;
        }
      }
    }
  }
  GetAllDynamicMarks() {
    return this.EDi;
  }
  GetDynamicMarkInfoById(r) {
    let t = undefined;
    this.EDi.forEach(e => {
      if (e.has(r)) {
        t = e.get(r);
      }
    });
    return t;
  }
  SetCurTrackMark(e) {
    this.Kpc = e;
  }
  IsEqualToCurTrack(e) {
    return e?.MarkId === this.Kpc?.MarkId && e?.MarkType === this.Kpc?.MarkType && e?.Track === this.Kpc?.Track;
  }
  GetCurTrackMark() {
    return this.Kpc;
  }
  CreateServerSaveMark(e) {
    this.xDi(e);
  }
  CreateDyMarkByEntity(r, e, t, i) {
    var a = this.EDi?.get(e);
    if (a) {
      a = Array.from(a.values()).find(e => e.TrackTarget === r);
      if (a) {
        return a.MarkId;
      }
    }
    a = new MapDefine_1.DynamicMarkCreateInfo({
      TrackTarget: r,
      MarkConfigId: t,
      MarkType: e,
      DestroyOnUnTrack: true,
      MapAndDungeonInfo: {
        MapConfigId: i
      },
      EntityConfigId: r
    });
    return this.CreateMapMark(a);
  }
  CreateTempMapMark(e) {
    this.AddPendingTempMapMarkList(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateTempMapMark, e);
  }
  GetPendingAddTempMapMarkList() {
    return this.SSl;
  }
  ClearPendingAddTempMapMarkList() {
    this.SSl.clear();
  }
  AddPendingTempMapMarkList(e) {
    this.SSl.add(e);
  }
  CreateMapMark(e) {
    e.MarkId = this.SpawnDynamicMarkId();
    this.xDi(e);
    return e.MarkId;
  }
  CacheMapFishingShipMark(e) {
    this.Qcc.length = 0;
    for (const r of e) {
      this.Qcc.push({
        InstanceId: r.r6n ?? 0,
        TemplateId: r.IIs ?? 0,
        PositionX: r.P5n?.X ?? 0,
        PositionY: r.P5n?.Y ?? 0,
        PositionZ: r.P5n?.Z ?? 0
      });
      MapLogger_1.MapLogger.Debug(63, "标记系统->CacheMapFishingShipMark", ["MarkInfo", r]);
    }
    this.TryRecreateShipMark();
  }
  TryRecreateShipMark() {
    var e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(31);
    if (!(e > 0)) {
      for (const t of this.Qcc) {
        var r = new MapDefine_1.FishingShipMarkCreateInfo({
          TrackTarget: Vector_1.Vector.Create(t.PositionX, t.PositionY, t.PositionZ),
          MarkConfigId: MapDefine_1.FISHING_SHIP_MARK_ID,
          MarkType: 31,
          TrackSource: 1,
          EntityConfigId: t.TemplateId,
          MapAndDungeonInfo: {
            DungeonId: t.InstanceId
          }
        });
        this.CreateMapMark(r);
      }
    }
  }
  SyncLocalShipLocationToCacheInfo() {
    var e = this.GetMarkByType(31);
    if (e) {
      for (const [, i] of e) {
        var r = this.Qcc.filter(e => e.TemplateId === i.EntityConfigId && e.InstanceId === i.InstanceDungeonId);
        var t = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(i.TrackTarget, i.MapId);
        if (r?.length > 0) {
          for (const a of r) {
            a.PositionX = t.X;
            a.PositionY = t.Y;
            a.PositionZ = t.Z;
          }
        } else {
          this.Qcc.push({
            InstanceId: i.InstanceDungeonId ?? 0,
            TemplateId: i.EntityConfigId ?? 0,
            PositionX: t.X,
            PositionY: t.Y,
            PositionZ: t.Z
          });
        }
      }
    }
  }
  wDi(e) {
    return e.MarkType !== 12 && e.MarkType !== 15 && e.MarkType !== 17 && e.MarkType !== 9;
  }
  ResetDynamicMarkData() {
    this.UDi.clear();
    this.PDi.clear();
    var e = this.EDi.get(12);
    var r = this.EDi.get(7);
    var t = this._Cf();
    this.EDi?.clear();
    this.TDi?.clear();
    this.Vlh(12, e);
    this.Vlh(7, r);
    this.uCf(t);
  }
  Vlh(e, r) {
    if (r) {
      this.EDi?.set(e, r);
      r.forEach(e => {
        this.TDi?.set(e.MarkId, e);
      });
    }
  }
  uCf(e) {
    for (var [r, t] of e) {
      this.EDi?.set(r, t);
      t.forEach(e => {
        this.TDi?.set(e.MarkId, e);
      });
    }
  }
  _Cf() {
    var e = new Map();
    var r = this.EDi?.get(36);
    if (r) {
      e.set(36, r);
    }
    if (r = this.EDi?.get(37)) {
      e.set(37, r);
    }
    if (r = this.EDi?.get(38)) {
      e.set(38, r);
    }
    return e;
  }
  xDi(t) {
    if (this.EDi) {
      MapLogger_1.MapLogger.Debug(63, "标记系统->CreateDynamicMark", ["DynamicMarkCreateInfo", t]);
      let e = this.EDi.get(t.MarkType);
      if (!e) {
        e = new Map();
        this.EDi.set(t.MarkType, e);
      }
      let r = undefined;
      e.forEach(e => {
        if (this.wDi(t) && e.TrackTarget instanceof Vector_1.Vector && t.TrackTarget instanceof Vector_1.Vector && e.TrackTarget.Equality(t.TrackTarget)) {
          r = e;
        }
        if (e.MarkId === t.MarkId) {
          r = e;
        }
      });
      if (r) {
        MapLogger_1.MapLogger.Debug(63, "标记系统->existMarkInfo", ["DynamicMarkCreateInfo", t]);
        this.RemoveMapMark(r.MarkType, r.MarkId);
      }
      e.set(t.MarkId, t);
      this.TDi?.set(t.MarkId, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateMapMark, t);
    }
  }
  SetTrackMark(e, r, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMapMark, e, r, t);
    if (!t) {
      if (this.EDi && (t = this.EDi.get(e)) && t.get(r)?.DestroyOnUnTrack) {
        this.RemoveMapMark(e, r);
      }
    }
  }
  IsMarkIdExist(e, r) {
    var t;
    return !!this.EDi && !!e && !!r && ((t = this.EDi.get(e)) ? t.has(r) : (t = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(r)) !== undefined && t.ObjectType === e);
  }
  GetMarkTypeByMarkId(e) {
    var r = this.GetDynamicMark(e);
    if (r !== undefined) {
      return r.MarkType;
    } else {
      return ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.ObjectType;
    }
  }
  GetSoundBoxDetectMark() {
    var e = this.GetMarkByType(16);
    if (e && e.size > 0 || (e = this.GetMarkByType(21)) && e.size > 0) {
      return [(e = e.values().next().value).MarkId, e.MarkType];
    } else {
      return undefined;
    }
  }
  GetSoundBoxDetectMarkCalc() {
    var e = this.GetMarkByType(16);
    var r = this.GetMarkByType(21);
    if (e?.size || r?.size) {
      const t = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId;
      const n = [];
      e?.forEach(e => {
        if (e.MapId === t) {
          n.push(e);
        }
      });
      r?.forEach(e => {
        if (e.MapId === t) {
          n.push(e);
        }
      });
      if (n.length > 0) {
        let i = n[0];
        let a = Number.MAX_VALUE;
        const o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
        n.forEach((e, r) => {
          var t = Vector_1.Vector.Create(e.TrackTarget);
          var t = Vector_1.Vector.Dist(o, t);
          if (t < a) {
            a = t;
            i = e;
          }
        });
        return [i.MarkId, i.MarkType];
      }
      return this.GetSoundBoxDetectMark();
    }
  }
  IsConfigMarkIdUnlock(e) {
    var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return !!r && !!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r.ObjectType, e) && (e = this.BDi(r), r = this.bDi(r), e) && r;
  }
  BDi(e) {
    return e.FogShow === 1 || this.CheckFogUnlocked(e.FogHide);
  }
  bDi(e) {
    var r = e.ShowCondition;
    var e = e.MarkId;
    if (r < 0) {
      return this.GetMarkExtraShowState(e).IsShow;
    } else {
      return r === 0 || this.IsMarkUnlockedByServer(e);
    }
  }
  RemoveMapMark(e, r) {
    var t;
    if (this.EDi && e !== undefined && r !== undefined && (t = this.EDi.get(e)) && (this.RemoveTrackMarkId(r), t = t.delete(r), this.TDi?.delete(r), t)) {
      MapLogger_1.MapLogger.Debug(63, "标记系统->RemoveMapMark", ["markType", e], ["markId", r]);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveMapMark, e, r);
    }
  }
  RemoveMapMarkByType(e) {
    var r = this.GetMarkByType(e);
    if (r !== undefined && r.size > 0) {
      var t = new Set();
      for (const a of r.values()) {
        var i = a.MarkId;
        t.add(i);
      }
      for (const n of t) {
        this.RemoveMapMark(e, n);
      }
    }
  }
  RemoveMapMarksByConfigId(e, r) {
    if (this.EDi && e !== undefined && r !== undefined) {
      r = this.EDi.get(e);
      if (r) {
        var t;
        var i;
        var a = [];
        for ([t, i] of r) {
          if (i.MarkType === e) {
            a.push(t);
          }
        }
        for (const n of a) {
          this.RemoveMapMark(e, n);
        }
      }
    }
  }
  RemoveDynamicMapMark(e) {
    var r = this.TDi?.get(e);
    if (r) {
      this.RemoveMapMark(r?.MarkType, r?.MarkId);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "找不到mark id:", ["markId", e]);
    }
  }
  UpdateCustomMarkInfo(e, r) {
    var t;
    if (this.EDi) {
      if (t = this.EDi.get(9)) {
        t.get(e).TrackTarget = r;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "找不到markId");
      }
    }
  }
  ReplaceCustomMarkIcon(e, r) {
    var t;
    if (this.EDi && (t = this.EDi.get(9)) && (t = t.get(e))) {
      t.MarkConfigId = r;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapReplaceMarkResponse, 9, e, r);
    }
  }
  SpawnDynamicMarkId() {
    return --this.MDi;
  }
  UnlockTeleports(e, r = false) {
    if (r) {
      this.LDi.clear();
    }
    if (!(e.length <= 0)) {
      var t = new Array();
      for (const a of e) {
        var i = TeleporterById_1.configTeleporterById.GetConfig(a);
        if (i) {
          t.push(i);
        }
      }
      for (const n of t) {
        if (n.TeleportEntityConfigId) {
          ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(n.TeleportEntityConfigId, 1196894179);
        }
        this.LDi.set(n.Id, true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnlockTeleport, n.Id);
      }
    }
  }
  CheckTeleportUnlocked(e) {
    return this.LDi.get(e);
  }
  IsTeleportLocked(e) {
    return ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(e).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable || !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(e);
  }
  GetAllUnlockedFogs() {
    return this.Nhl;
  }
  GetFogIsUnlocked(e) {
    return this.Nhl.get(e) ?? false;
  }
  GetAllUnlockedAreas() {
    return this.DDi;
  }
  AddUnlockedFogs(e) {
    this.Nhl.set(e, true);
    this.Fhl(e);
    ModelManager_1.ModelManager.HonamiStoryModel.CurrentUnlockFogId = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapOpenFogChange, e);
  }
  FullUpdateUnlockedFogs(e) {
    this.Nhl.clear();
    this.DDi.clear();
    for (const r of e) {
      this.Nhl.set(r, true);
      this.Fhl(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.Nhl);
  }
  Fhl(e) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(e);
    if (e) {
      this.DDi.set(e.AreaId, true);
    }
  }
  CheckAreasUnlocked(e, r = true) {
    return e === 0 && !!r || (this.DDi.get(e) ?? false);
  }
  CheckFogUnlocked(e) {
    return e === 0 || (this.Nhl.get(e) ?? false);
  }
  IsMarkFogUnlock(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return e !== undefined && (e.FogShow === 1 || ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(e?.FogHide));
  }
  SetUnlockMultiMapIds(e) {
    this.K4u = e;
  }
  AddUnlockMultiMapIds(e) {
    this.K4u = Array.from(new Set([...this.K4u, ...e]));
  }
  SetUnlockMapBlockIds(e) {
    this.UnlockMapBlockIds = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MiniMapForceUpdate);
  }
  AddUnlockMapBlockIds(e) {
    this.UnlockMapBlockIds = Array.from(new Set([...this.UnlockMapBlockIds, ...e]));
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MiniMapForceUpdate);
  }
  CheckUnlockMultiMapIds(e) {
    return this.K4u.includes(e);
  }
  CheckUnlockMapBlockIds(e, r, t) {
    let i = 0;
    var a = [];
    for (const o of this.UnlockMapBlockIds) {
      var n = ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(o);
      if (n !== undefined && n.Block === e && n.GravityFlip === r && n.MapConfigId === t) {
        a.push(n);
      }
    }
    if (a.length > 0) {
      a.sort((e, r) => r.Priority - e.Priority);
      i = a[0].Id;
    }
    return i;
  }
  CheckIsInMultiMapWithAreaId(e) {
    let r = 0;
    for (const t of ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()) {
      if (t.Area.includes(e)) {
        r = t.Id;
        break;
      }
    }
    return r;
  }
  AddEntityIdToPendingList(e, r) {
    this.ADi.set(e, r);
  }
  RemoveEntityIdToPendingList(e) {
    this.ADi.delete(e);
  }
  GetEntityPendingList() {
    return this.ADi;
  }
  IsInMapPolygon(e) {
    if (!this.CurrentInWorld) {
      return true;
    }
    if (this.LastSafeLocation.IsNearlyZero()) {
      this.LastSafeLocation.DeepCopy(e);
    }
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId;
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var r = UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(e, r, t);
    if (r) {
      this.LastSafeLocation.DeepCopy(e);
    }
    return r;
  }
  GetLastSafeLocation() {
    return this.LastSafeLocation;
  }
  IsInUnopenedAreaPullback() {
    return !!ModelManager_1.ModelManager.GameModeModel.WorldDone && !ModelManager_1.ModelManager.GameModeModel.IsTeleport && !!ModelManager_1.ModelManager.MapModel.CurrentInWorld && UnopenedAreaController_1.UnopenedAreaController.CheckInPullback();
  }
  SetMarkExtraShowState(e, r, t, i) {
    this.UDi.set(e, {
      Id: e,
      IsShow: r,
      NeedFocus: t,
      ShowFlag: i
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemShowStateChange, e);
    return t;
  }
  GetMarkExtraShowState(e) {
    let r = this.UDi.get(e);
    if (r === undefined) {
      r = {
        Id: e,
        IsShow: false,
        NeedFocus: false,
        ShowFlag: Protocol_1.Aki.Protocol.U5s.Proto_ShowNormal
      };
    }
    var t = this.GetMarkTypeByMarkId(e);
    if (t !== undefined && this.IsMarkForbidGravityTeleport(e, t)) {
      r.ShowFlag = Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    }
    return r;
  }
  IsMarkForbidGravityTeleport(e, r) {
    var t = this.GetMarkMapConfigId(e, r);
    return this.GetMarkMapGravity(e, r) === 2 && ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(t) && ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() && this.MapMarkConfigIsCanTeleport(e, r);
  }
  MapMarkConfigIsCanTeleport(e, r) {
    return r === 5 || r === 6 || (r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)) !== undefined && r.EnableQuickTransfer === 1;
  }
  MapMarkIsCanTeleport(e) {
    return !!this.MapMarkConfigIsCanTeleport(e) && !this.IsTeleportLocked(e);
  }
  GetCurMapBorderConfig(r, t, i, a) {
    var e = this.GetCurMapBorderByFilterFunc(e => {
      var r = e.InstanceDungeonId === t && e.GravityFlip === a;
      if (e.instanceDungeonIdMapType !== 0) {
        return r && e.instanceDungeonIdMapType === i;
      } else {
        return r;
      }
    });
    if (e !== undefined) {
      return e;
    } else {
      return this.GetCurMapBorderByFilterFunc(e => e.MapId === r && e.GravityFlip === a && e.InstanceDungeonId === 0) ?? ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(MapDefine_1.DEFAULT_MAP_BORDER_ID, r);
    }
  }
  GetCurMapBorderByFilterFunc(e) {
    let r = undefined;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var t = i.ConditionId;
      if (e(i)) {
        let e = false;
        if (!(e = t === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), undefined, false))) {
          break;
        }
        r = i;
      }
    }
    return r;
  }
  ForceSetMarkVisible(e, r, t) {
    let i = this.SDi.get(e);
    if (i === undefined) {
      i = new Map();
      this.SDi.set(e, i);
    }
    i.set(r, t);
  }
  GetMarkForceVisible(e, r) {
    let t = true;
    e = this.SDi.get(e);
    return t = e && e.has(r) ? e.get(r) ?? false : t;
  }
  AddOccupationInfo(e) {
    var r = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(e.qEs);
    if (r && r.OccupationData && !StringUtils_1.StringUtils.IsEmpty(r.OccupationData) && r.OccupationData !== "Empty") {
      r = Json_1.Json.Parse(r.OccupationData);
      if (r) {
        r = r.LevelPlayIds;
        for (const t of r) {
          this.yDi.set(t, MathUtils_1.MathUtils.LongToBigInt(e.w5n));
        }
        this.IDi.set(e.qEs, r);
      }
    }
  }
  RemoveOccupationInfo(e) {
    if (this.IDi.has(e)) {
      var r = this.IDi.get(e);
      this.IDi.delete(e);
      for (const t of r) {
        this.yDi.delete(t);
      }
    }
  }
  IsLevelPlayOccupied(e) {
    e = this.yDi.get(e);
    return {
      IsOccupied: !!e,
      QuestId: e
    };
  }
  IsMarkUnlockedByServer(e) {
    return this.PDi.get(e) ?? false;
  }
  SetMarkServerOpenState(e, r) {
    this.PDi.set(e, r);
  }
  GetMarkAreaText(e, r) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(e, r)?.AreaId ?? 0;
    return this.GetMarkAreaTextByAreaId(e);
  }
  GetMarkAreaTextByAreaId(e) {
    var r = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(e);
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    var t = e ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title) : "";
    var r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
    var i = r ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r.Title) : "";
    var e = e ? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(e.CountryId) : "";
    var a = r?.Level ?? 0;
    if (r?.Father === 0 || a <= 0) {
      return e + "-" + t;
    } else {
      return `${e}-${i}-${t}`;
    }
  }
  UpdateBoxSlotInfo(e) {
    this.Wcl.set(e.T7n, e);
  }
  RemoveBoxSlotInfo(e) {
    for (var [, r] of this.Wcl) {
      if (r.b7n === e) {
        this.Wcl.delete(r.T7n);
        break;
      }
    }
  }
  FullUpdateBoxSlotInfo(e) {
    this.Wcl.clear();
    for (const r of e) {
      this.UpdateBoxSlotInfo(r);
    }
  }
  GetBoxSlotInfoByMarkId(e) {
    for (var [, r] of this.Wcl) {
      if (r.T7n === e) {
        return r;
      }
    }
  }
  UpdateTemporaryTeleportInfo(e) {
    this.Qcl.set(e.T7n, e);
    var r = this.GetDynamicMark(e.T7n);
    if (r && (r.TeleportId = MathUtils_1.MathUtils.LongToNumber(e.R7n), e.Suc)) {
      r.AreaId = e.Suc;
    }
  }
  RemoveTemporaryTeleportInfo(e) {
    for (var [, r] of this.Qcl) {
      if (r.T7n === e) {
        this.Qcl.delete(r.T7n);
        break;
      }
    }
  }
  FullUpdateTemporaryTeleportInfo(e) {
    this.Qcl.clear();
    for (const r of e) {
      this.UpdateTemporaryTeleportInfo(r);
    }
  }
  GetDungeonMapConfigId(e) {
    var r;
    if (e === 0 || (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) === undefined) {
      return e;
    } else {
      return r.MapConfigId;
    }
  }
  GetDungeonLocateWorldMapId(e) {
    if (e !== 0) {
      e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
      if (e !== undefined) {
        if (e.InstSubType === 12) {
          var r = this.GetDungeonEntranceConfig(e);
          if (r) {
            return r.MapConfigId;
          }
        }
        return e.MapConfigId;
      }
    }
  }
  GetDungeonLocateWorldMapLocation(e) {
    var r;
    if (e !== 0 && (e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) !== undefined && e.InstSubType === 12 && (r = this.GetDungeonEntranceConfig(e)) !== undefined) {
      e = e.EntranceEntities[0].EntranceEntityId;
      return ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId);
    } else {
      return undefined;
    }
  }
  GetDungeonExitLocation(e) {
    if (e !== 0) {
      e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
      if (e !== undefined) {
        var r = e.InstSubType;
        if (r === 12) {
          r = e.ExitEntities[0];
          return ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(r, e.MapConfigId);
        }
      }
    }
  }
  GetDungeonEntranceConfig(e) {
    var r;
    var t;
    if (!(e.EntranceEntities.length < 1)) {
      r = e.EntranceEntities[0].DungeonId;
      if ((t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r)) === undefined) {
        MapLogger_1.MapLogger.ErrorOnce(e.Id, 63, "世界副本查找入口实体失败->入口副本配置为空", ["副本Id", e.Id], ["entranceDungeonId", r]);
      }
      return t;
    }
    MapLogger_1.MapLogger.ErrorOnce(e.Id, 63, "世界副本查找入口实体失败->实体列表为空", ["副本Id", e.Id]);
  }
  GetMarkMapConfigId(e, r) {
    r = this.GetMark(r, e);
    if (r === undefined) {
      return ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID;
    } else {
      return r.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID;
    }
  }
  GetMarkMapGravity(e, r) {
    r = this.GetMark(r, e);
    if (r === undefined) {
      return ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)?.GravityFlip ?? 1;
    } else {
      return r.MapGravity ?? 1;
    }
  }
  get CurrentMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    if (e.ViewMapId !== 0) {
      return e.ViewMapId;
    } else {
      return e.MapConfigId;
    }
  }
  GetDungeonWorldMapConfigId(e) {
    var r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    if (r !== undefined && r.ViewMapId !== 0) {
      return r.ViewMapId;
    } else {
      return this.GetDungeonLocateWorldMapId(e) ?? r.MapConfigId;
    }
  }
  get CurrentWorldMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    if (e.ViewMapId !== 0) {
      return e.ViewMapId;
    } else {
      return this.GetDungeonLocateWorldMapId(e.Id) ?? e.MapConfigId;
    }
  }
  get CurrentInWorld() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e);
  }
  get CurrentPlayerGravity() {
    if (Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.IsStandardGravity) {
      return 1;
    } else {
      return 2;
    }
  }
  get CurrentPlayerGravityDirection() {
    return Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp?.GravityDirect;
  }
  get IsPlayerInStandardGravity() {
    return this.CurrentPlayerGravity === 1;
  }
  GetInstanceIdByWorldMapId(e) {
    if (e !== ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId && ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(e)) {
      return e;
    } else {
      return ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    }
  }
  AddTrackMarkId(e) {
    if (!this.Tj1.has(e)) {
      this.Tj1.add(e);
    }
  }
  RemoveTrackMarkId(e) {
    this.Tj1.delete(e);
  }
  ClearTrackMarkId() {
    this.Tj1.clear();
  }
  IsMarkTracking(e) {
    return this.Tj1.has(e) ?? false;
  }
  UpdateMarkHideInfo(e) {
    var r = this.GetMarkHideInfoKey(e.w7n, e.A5n);
    if (StringUtils_1.StringUtils.IsEmpty(e.vm1)) {
      this.of1.delete(r);
    } else {
      this.of1.set(r, e);
    }
  }
  ClearMarkHideInfo() {
    this.of1.clear();
  }
  GetMarkHideInfoKey(e, r) {
    return e + "_" + r;
  }
  IsMarkHideByServer(e, r) {
    e = this.GetMarkHideInfoKey(e, r);
    return this.of1.get(e) !== undefined;
  }
  GetMarkHideReason(e, r) {
    e = this.GetMarkHideInfoKey(e, r);
    r = this.of1.get(e);
    if (r?.vm1 !== undefined) {
      return this.ParseHideReason(r?.vm1);
    }
  }
  ParseHideReason(e) {
    if (e.toLowerCase() === "d") {
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Occupied_Not_Refresh_Text");
    }
    var e = e.split("_");
    var r = e[0].toLowerCase();
    var e = Number(e[1]);
    if (r === "q") {
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e);
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Quest_Occupied_Text", t);
    }
    if (r === "l") {
      var t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e);
      if (t !== undefined) {
        r = t.Name;
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Play_Occupied_Text", r);
      }
    }
  }
  InitTeleportMarkQueryCache() {
    var e;
    var r;
    var t;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetConfigMarkMap().values()) {
      if (i.ObjectType === 15 || i.ObjectType === 5 || i.ObjectType === 6 || i.ObjectType === 10 || i.ObjectType === 19 || i.EnableQuickTransfer === 1) {
        r = Vector_1.Vector.Create();
        MapUtil_1.MapUtil.GetConfigPosition(i.EntityConfigId, r, i.RelativeDungeonId);
        e = {
          MarkId: i.MarkId,
          MarkType: i.ObjectType,
          MapId: i.MapId,
          InstanceDungeonId: i.RelativeDungeonId,
          Gravity: i.GravityFlip,
          WorldPosition: r
        };
        r = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(r);
        if (t = this.yW1.get(r)) {
          t.add(e);
        } else {
          t = new Set().add(e);
          this.yW1.set(r, t);
        }
      }
    }
  }
  QueryNearestTeleporter(a, e, r) {
    const n = this.GetMark(e, a)?.InstanceDungeonId ?? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a)?.RelativeDungeonId ?? 0;
    const o = this.GetMark(e, a)?.MapGravity ?? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a)?.GravityFlip ?? 0;
    return this.MW1(a, e, r, e => {
      if (a === e.MarkId) {
        return false;
      }
      var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId);
      if (n !== e.InstanceDungeonId) {
        return false;
      }
      var t = ModelManager_1.ModelManager.MapModel.IsTeleportLocked(e.MarkId);
      var i = ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(e.MarkId);
      if (t || !i) {
        return false;
      }
      if ((e.MarkType === 10 || e.MarkType === 19) && r) {
        t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r.RelativeId);
        if (!t || t.IsClose) {
          return false;
        }
        if (ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(t.Id).IsOccupied) {
          return false;
        }
      }
      return (e.MarkType === 15 || e.MarkType === 5 || e.MarkType === 6 || e.MarkType === 10 || e.MarkType === 19) && (o === 0 || e.Gravity === 0 || e.Gravity === o);
    });
  }
  EW1(e, r) {
    var t = this.GetMark(r, e);
    let i = 0;
    if (t === undefined) {
      var a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
      if (a === undefined) {
        MapLogger_1.MapLogger.ErrorOnce(e, 63, "查询标记追踪目标->目标的标记配置和数据都为空", ["trackTargetMarkId", e], ["targetMarkType", r]);
        return i;
      }
      i = a.EntityConfigId ?? Vector_1.Vector.Create(a.MarkVector);
    } else {
      i = t.TrackTarget;
    }
    return i;
  }
  MW1(e, r, i, a) {
    var n = this.EW1(e, r);
    if (n !== 0) {
      var o;
      var s = this.GetMarkMapConfigId(e, r);
      const M = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(n, s);
      let t = this.SW1.Get(e);
      if (t === undefined) {
        t = [];
        n = CommonParamById_1.configCommonParamById.GetIntConfig("QuickTransferRange") * MapDefine_1.UNIT;
        s = MapUtil_1.MapUtil.GetQueryNearestIndexSet(M, n);
        const h = n * n;
        for (const d of s) {
          this.yW1.get(d)?.forEach(e => {
            var r = Vector_1.Vector.DistSquared(e.WorldPosition, M);
            if (r <= h) {
              t.push([e, r]);
            }
          });
        }
        this.SW1.Put(e, t);
        t.sort((e, r) => e[1] - r[1]);
      }
      for ([o] of t) {
        if (a?.(o) ?? true) {
          if (Vector_1.Vector.DistSquared(i, M) <= Vector_1.Vector.DistSquared(o.WorldPosition, M)) {
            return {
              TargetMarkId: e,
              TargetMarkType: r,
              FailedReason: 1
            };
          } else {
            return {
              TargetMarkId: e,
              TargetMarkType: r,
              Info: o
            };
          }
        }
      }
    }
    return {
      TargetMarkId: e,
      TargetMarkType: r,
      FailedReason: 0
    };
  }
  GetEntityIdToMarkType(e) {
    return this.rQd?.get(e);
  }
  AddEntityIdToMarkType(e, r) {
    this.rQd?.set(e, r);
  }
  RemoveEntityIdToMarkType(e) {
    this.rQd?.delete(e);
  }
  UpdateHonamiScanMarkInfo(e, r) {
    this.HonamiScanMarkInfo.set(e, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiScanMarkInfoUpdate, e);
  }
  GetHonamiScanMarkInfo(e) {
    return this.HonamiScanMarkInfo.get(e) ?? Protocol_1.Aki.Protocol.Tom.Proto_MarkDisable;
  }
  ClearHonamiScanMarkInfo() {
    this.HonamiScanMarkInfo.clear();
  }
  UpdateExtraUiMarkTypeVisible(e, r, t) {
    if (t) {
      this.rAg?.get(e)?.add(r);
    } else {
      this.rAg?.get(e)?.delete(r);
    }
  }
  HasExtraUiMarkType(e) {
    e = this.rAg?.get(e);
    return !!e && e.size > 0;
  }
  IsExtraUiMarkTypeVisible(e, r) {
    return this.rAg?.get(e)?.has(r) ?? false;
  }
  ClearExtraUiMarkType(e) {
    this.rAg?.get(e)?.clear();
  }
}
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map