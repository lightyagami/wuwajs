"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapModel = void 0;
const Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  TrimLru_1 = require("../../../Core/Container/TrimLru"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TeleporterById_1 = require("../../../Core/Define/ConfigQuery/TeleporterById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapDefine_1 = require("./MapDefine"),
  MapUtil_1 = require("./MapUtil"),
  MapLogger_1 = require("./Misc/MapLogger");
class MapModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.MDi = 0, this.EDi = void 0, this.SDi = void 0, this.yDi = void 0, this.IDi = void 0, this.TDi = void 0, this.LDi = void 0, this.Nhl = void 0, this.DDi = void 0, this.Kpc = void 0, this.UDi = void 0, this.ADi = void 0, this.SSl = void 0, this.PDi = void 0, this.vgu = [], this.UnlockMapBlockIds = void 0, this.LastSafeLocation = Vector_1.Vector.Create(), this.CacheEnrichmentAreaWorldMapCircle = void 0, this.CacheEnrichmentAreaEntityId = 0, this.Wcl = void 0, this.Qcl = void 0, this.MapLifeEventListenerTriggerMap = void 0, this.Qcc = [], this.H81 = new Set, this.Bm1 = new Map, this.LastHighLevelAreaInner = void 0, this.O$1 = new Map, this.q$1 = new TrimLru_1.TrimLru(3)
  }
  get LastHighLevelArea() {
    return this.LastHighLevelAreaInner
  }
  set LastHighLevelArea(e) {
    this.LastHighLevelAreaInner = e
  }
  OnInit() {
    return this.EDi = new Map, this.LDi = new Map, this.Nhl = new Map, this.DDi = new Map, this.ADi = new Map, this.SSl = new Set, this.UDi = new Map, this.TDi = new Map, this.SDi = new Map, this.yDi = new Map, this.IDi = new Map, this.PDi = new Map, this.MapLifeEventListenerTriggerMap = new Map, this.Wcl = new Map, this.Qcl = new Map, this.UnlockMapBlockIds = [], this.Bm1 = new Map, this.InitTeleportMarkQueryCache(), !0
  }
  OnChangeMode() {
    return ModelManager_1.ModelManager.TrackModel.ClearTrackData(), ModelManager_1.ModelManager.MapModel.SetCurTrackMark(void 0), !0
  }
  OnClear() {
    return this.EDi.clear(), this.LDi.clear(), this.Nhl.clear(), this.DDi.clear(), this.ADi.clear(), this.SSl.clear(), this.SDi.clear(), this.yDi.clear(), this.IDi.clear(), this.PDi.clear(), this.Wcl.clear(), this.Qcl.clear(), this.Bm1.clear(), this.EDi = void 0, this.LDi = void 0, this.Nhl = void 0, this.DDi = void 0, this.ADi = void 0, this.SSl = void 0, this.Kpc = void 0, this.UnlockMapBlockIds = void 0, this.CacheEnrichmentAreaWorldMapCircle = void 0, !(this.CacheEnrichmentAreaEntityId = 0)
  }
  GetUnlockedTeleportMap() {
    return this.LDi
  }
  GetDynamicMark(e) {
    return this.TDi?.get(e)
  }
  GetMark(e, r) {
    return this.EDi.get(e)?.get(r)
  }
  GetMarkByType(e) {
    return this.EDi.get(e)
  }
  GetMarkCountByType(e) {
    return this.EDi.get(e)?.size ?? 0
  }
  GetConfigMarkTrackTarget(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    if (void 0 !== e) {
      if (e.EntityConfigId) return e.EntityConfigId;
      if (e.MarkVector) return Vector_1.Vector.Create(e.MarkVector)
    }
    return 0
  }
  GetMarkByQuestId(e) {
    var r = this.GetMarkByType(12);
    if (r)
      for (const a of r.values()) {
        var t = a;
        if (t.NodeId) {
          var i = t.TreeId,
            i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(i);
          if (i && i.TreeConfigId === e) return t
        } else if (t.TreeId === e) return t
      }
  }
  GetAllDynamicMarks() {
    return this.EDi
  }
  GetDynamicMarkInfoById(r) {
    let t = void 0;
    return this.EDi.forEach(e => {
      e.has(r) && (t = e.get(r))
    }), t
  }
  SetCurTrackMark(e) {
    this.Kpc = e
  }
  IsEqualToCurTrack(e) {
    return e?.MarkId === this.Kpc?.MarkId && e?.MarkType === this.Kpc?.MarkType && e?.Track === this.Kpc?.Track
  }
  GetCurTrackMark() {
    return this.Kpc
  }
  CreateServerSaveMark(e) {
    this.xDi(e)
  }
  CreateDyMarkByEntity(r, e, t, i) {
    var a = this.EDi?.get(e);
    if (a) {
      a = Array.from(a.values()).find(e => e.TrackTarget === r);
      if (a) return a.MarkId
    }
    a = new MapDefine_1.DynamicMarkCreateInfo({
      TrackTarget: r,
      MarkConfigId: t,
      MarkType: e,
      DestroyOnUnTrack: !0,
      MapAndDungeonInfo: {
        MapConfigId: i
      }
    });
    return this.CreateMapMark(a)
  }
  CreateTempMapMark(e) {
    this.SSl.add(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateTempMapMark, e)
  }
  GetPendingAddTempMapMarkList() {
    return this.SSl
  }
  ClearPendingAddTempMapMarkList() {
    this.SSl.clear()
  }
  CreateMapMark(e) {
    return e.MarkId = this.SpawnDynamicMarkId(), this.xDi(e), e.MarkId
  }
  CacheMapFishingShipMark(e) {
    this.Qcc.length = 0;
    for (const r of e) this.Qcc.push({
      InstanceId: r.r6n ?? 0,
      TemplateId: r.IIs ?? 0,
      PositionX: r.P5n?.X ?? 0,
      PositionY: r.P5n?.Y ?? 0,
      PositionZ: r.P5n?.Z ?? 0
    }), MapLogger_1.MapLogger.Debug(63, "标记系统->CacheMapFishingShipMark", ["MarkInfo", r]);
    this.TryRecreateShipMark()
  }
  TryRecreateShipMark() {
    var e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(31);
    if (!(0 < e))
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
        this.CreateMapMark(r)
      }
  }
  SyncLocalShipLocationToCacheInfo() {
    var e = this.GetMarkByType(31);
    if (e)
      for (const [, i] of e) {
        var r = this.Qcc.filter(e => e.TemplateId === i.EntityConfigId && e.InstanceId === i.InstanceDungeonId),
          t = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(i.TrackTarget, i.MapId);
        if (0 < r?.length)
          for (const a of r) a.PositionX = t.X, a.PositionY = t.Y, a.PositionZ = t.Z;
        else this.Qcc.push({
          InstanceId: i.InstanceDungeonId ?? 0,
          TemplateId: i.EntityConfigId ?? 0,
          PositionX: t.X,
          PositionY: t.Y,
          PositionZ: t.Z
        })
      }
  }
  wDi(e) {
    return !(12 === e.MarkType || 15 === e.MarkType || 17 === e.MarkType || 9 === e.MarkType)
  }
  ResetDynamicMarkData() {
    this.UDi.clear(), this.PDi.clear();
    var e = this.EDi.get(12),
      r = this.EDi.get(7);
    this.EDi?.clear(), this.TDi?.clear(), this.Vlh(12, e), this.Vlh(7, r)
  }
  Vlh(e, r) {
    r && (this.EDi?.set(e, r), r.forEach(e => {
      this.TDi?.set(e.MarkId, e)
    }))
  }
  xDi(t) {
    if (this.EDi) {
      MapLogger_1.MapLogger.Debug(63, "标记系统->CreateDynamicMark", ["DynamicMarkCreateInfo", t]);
      let e = this.EDi.get(t.MarkType),
        r = (e || (e = new Map, this.EDi.set(t.MarkType, e)), void 0);
      e.forEach(e => {
        this.wDi(t) && e.TrackTarget instanceof Vector_1.Vector && t.TrackTarget instanceof Vector_1.Vector && e.TrackTarget.Equality(t.TrackTarget) && (r = e), e.MarkId === t.MarkId && (r = e)
      }), r && (MapLogger_1.MapLogger.Debug(63, "标记系统->existMarkInfo", ["DynamicMarkCreateInfo", t]), this.RemoveMapMark(r.MarkType, r.MarkId)), e.set(t.MarkId, t), this.TDi?.set(t.MarkId, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CreateMapMark, t)
    }
  }
  SetTrackMark(e, r, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMapMark, e, r, t), t || this.EDi && (t = this.EDi.get(e)) && t.get(r)?.DestroyOnUnTrack && this.RemoveMapMark(e, r)
  }
  IsMarkIdExist(e, r) {
    var t;
    return !!(this.EDi && e && r) && ((t = this.EDi.get(e)) ? t.has(r) : void 0 !== (t = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(r)) && t.ObjectType === e)
  }
  GetMarkTypeByMarkId(e) {
    var r = this.GetDynamicMark(e);
    return void 0 !== r ? r.MarkType : ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.ObjectType
  }
  GetSoundBoxDetectMark() {
    var e = this.GetMarkByType(16);
    return e && 0 < e.size || (e = this.GetMarkByType(21)) && 0 < e.size ? [(e = e.values().next().value).MarkId, e.MarkType] : void 0
  }
  GetSoundBoxDetectMarkCalc() {
    var e = this.GetMarkByType(16),
      r = this.GetMarkByType(21);
    if (e?.size || r?.size) {
      const t = ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId,
        n = [];
      if (e?.forEach(e => {
          e.MapId === t && n.push(e)
        }), r?.forEach(e => {
          e.MapId === t && n.push(e)
        }), 0 < n.length) {
        let i = n[0],
          a = Number.MAX_VALUE;
        const o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
        return n.forEach((e, r) => {
          var t = Vector_1.Vector.Create(e.TrackTarget),
            t = Vector_1.Vector.Dist(o, t);
          t < a && (a = t, i = e)
        }), [i.MarkId, i.MarkType]
      }
      return this.GetSoundBoxDetectMark()
    }
  }
  IsConfigMarkIdUnlock(e) {
    var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return !!r && !!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r.ObjectType, e) && (e = this.BDi(r), r = this.bDi(r), e) && r
  }
  BDi(e) {
    return 1 === e.FogShow || this.CheckFogUnlocked(e.FogHide)
  }
  bDi(e) {
    var r = e.ShowCondition,
      e = e.MarkId;
    return r < 0 ? this.GetMarkExtraShowState(e).IsShow : 0 === r || this.IsMarkUnlockedByServer(e)
  }
  RemoveMapMark(e, r) {
    var t;
    this.EDi && void 0 !== e && void 0 !== r && (t = this.EDi.get(e)) && (this.RemoveTrackMarkId(r), t = t.delete(r), this.TDi?.delete(r), t) && (MapLogger_1.MapLogger.Debug(63, "标记系统->RemoveMapMark", ["markType", e], ["markId", r]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveMapMark, e, r))
  }
  RemoveMapMarkByType(e) {
    var r = this.GetMarkByType(e);
    if (void 0 !== r && 0 < r.size) {
      var t = new Set;
      for (const a of r.values()) {
        var i = a.MarkId;
        t.add(i)
      }
      for (const n of t) this.RemoveMapMark(e, n)
    }
  }
  RemoveMapMarksByConfigId(e, r) {
    if (this.EDi && void 0 !== e && void 0 !== r) {
      r = this.EDi.get(e);
      if (r) {
        var t, i, a = [];
        for ([t, i] of r) i.MarkType === e && a.push(t);
        for (const n of a) this.RemoveMapMark(e, n)
      }
    }
  }
  RemoveDynamicMapMark(e) {
    var r = this.TDi?.get(e);
    r ? this.RemoveMapMark(r?.MarkType, r?.MarkId) : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 63, "找不到mark id:", ["markId", e])
  }
  UpdateCustomMarkInfo(e, r) {
    var t;
    this.EDi && ((t = this.EDi.get(9)) ? t.get(e).TrackTarget = r : Log_1.Log.CheckError() && Log_1.Log.Error("Map", 63, "找不到markId"))
  }
  ReplaceCustomMarkIcon(e, r) {
    var t;
    this.EDi && (t = this.EDi.get(9)) && (t = t.get(e)) && (t.MarkConfigId = r, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapReplaceMarkResponse, 9, e, r))
  }
  SpawnDynamicMarkId() {
    return --this.MDi
  }
  UnlockTeleports(e, r = !1) {
    if (r && this.LDi.clear(), !(e.length <= 0)) {
      var t = new Array;
      for (const a of e) {
        var i = TeleporterById_1.configTeleporterById.GetConfig(a);
        i && t.push(i)
      }
      for (const n of t) n.TeleportEntityConfigId && ControllerHolder_1.ControllerHolder.CreatureController.ChangeLockTagByTeleportPbDataId(n.TeleportEntityConfigId, 1196894179), this.LDi.set(n.Id, !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnlockTeleport, n.Id)
    }
  }
  CheckTeleportUnlocked(e) {
    return this.LDi.get(e)
  }
  IsTeleportLocked(e) {
    return ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(e).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable || !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(e)
  }
  GetAllUnlockedFogs() {
    return this.Nhl
  }
  GetAllUnlockedAreas() {
    return this.DDi
  }
  AddUnlockedFogs(e) {
    this.Nhl.set(e, !0), this.Fhl(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapOpenFogChange, e)
  }
  FullUpdateUnlockedFogs(e) {
    this.Nhl.clear(), this.DDi.clear();
    for (const r of e) this.Nhl.set(r, !0), this.Fhl(r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.Nhl)
  }
  Fhl(e) {
    e = ConfigManager_1.ConfigManager.WorldMapConfig.GetMapFogConfig(e);
    e && this.DDi.set(e.AreaId, !0)
  }
  CheckAreasUnlocked(e, r = !0) {
    return !(0 !== e || !r) || (this.DDi.get(e) ?? !1)
  }
  CheckFogUnlocked(e) {
    return 0 === e || (this.Nhl.get(e) ?? !1)
  }
  IsMarkFogUnlock(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    return void 0 !== e && (1 === e.FogShow || ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(e?.FogHide))
  }
  SetUnlockMultiMapIds(e) {
    this.vgu = e
  }
  AddUnlockMultiMapIds(e) {
    this.vgu = Array.from(new Set([...this.vgu, ...e]))
  }
  SetUnlockMapBlockIds(e) {
    this.UnlockMapBlockIds = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MiniMapForceUpdate)
  }
  CheckUnlockMultiMapIds(e) {
    return this.vgu.includes(e)
  }
  CheckUnlockMapBlockIds(e, r, t) {
    let i = 0;
    var a = [];
    for (const o of this.UnlockMapBlockIds ?? []) {
      var n = ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(o);
      void 0 !== n && n.Block === e && n.GravityFlip === r && n.MapConfigId === t && a.push(n)
    }
    return 0 < a.length && (a.sort((e, r) => r.Priority - e.Priority), i = a[0].Id), i
  }
  CheckIsInMultiMapWithAreaId(e) {
    let r = 0;
    for (const t of ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig())
      if (t.Area.includes(e)) {
        r = t.Id;
        break
      } return r
  }
  AddEntityIdToPendingList(e, r) {
    this.ADi.set(e, r)
  }
  RemoveEntityIdToPendingList(e) {
    this.ADi.delete(e)
  }
  GetEntityPendingList() {
    return this.ADi
  }
  IsInMapPolygon(e) {
    if (!this.CurrentInWorld) return !0;
    this.LastSafeLocation.IsNearlyZero() && this.LastSafeLocation.DeepCopy(e);
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
      t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id,
      r = UnopenedAreaController_1.UnopenedAreaController.OnCheckUnopenedArea(e, r, t);
    return r && this.LastSafeLocation.DeepCopy(e), r
  }
  GetLastSafeLocation() {
    return this.LastSafeLocation
  }
  IsInUnopenedAreaPullback() {
    return !!ModelManager_1.ModelManager.GameModeModel.WorldDone && !ModelManager_1.ModelManager.GameModeModel.IsTeleport && !!ModelManager_1.ModelManager.MapModel.CurrentInWorld && UnopenedAreaController_1.UnopenedAreaController.CheckInPullback()
  }
  SetMarkExtraShowState(e, r, t, i) {
    return this.UDi.set(e, {
      Id: e,
      IsShow: r,
      NeedFocus: t,
      ShowFlag: i
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemShowStateChange, e), t
  }
  GetMarkExtraShowState(e) {
    let r = this.UDi.get(e);
    void 0 === r && (r = {
      Id: e,
      IsShow: !1,
      NeedFocus: !1,
      ShowFlag: Protocol_1.Aki.Protocol.U5s.Proto_ShowNormal
    });
    var t = this.GetMarkTypeByMarkId(e);
    return void 0 !== t && this.IsMarkForbidGravityTeleport(e, t) && (r.ShowFlag = Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable), r
  }
  IsMarkForbidGravityTeleport(e, r) {
    var t = this.GetMarkMapConfigId(e, r);
    return 2 === this.GetMarkMapGravity(e, r) && ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(t) && ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() && this.MapMarkConfigIsCanTeleport(e, r)
  }
  MapMarkConfigIsCanTeleport(e, r) {
    return 5 === r || 6 === r || void 0 !== (r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)) && 1 === r.EnableQuickTransfer
  }
  MapMarkIsCanTeleport(e) {
    return !!this.MapMarkConfigIsCanTeleport(e) && !this.IsTeleportLocked(e)
  }
  GetCurMapBorderConfig(r, t, i, a) {
    var e = this.GetCurMapBorderByFilterFunc(e => {
      var r = e.InstanceDungeonId === t && e.GravityFlip === a;
      return 0 !== e.instanceDungeonIdMapType ? r && e.instanceDungeonIdMapType === i : r
    });
    return void 0 !== e ? e : this.GetCurMapBorderByFilterFunc(e => e.MapId === r && e.GravityFlip === a && 0 === e.InstanceDungeonId) ?? ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(MapDefine_1.DEFAULT_MAP_BORDER_ID, r)
  }
  GetCurMapBorderByFilterFunc(e) {
    let r = void 0;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
      var t = i.ConditionId;
      if (e(i)) {
        let e = !1;
        if (!(e = 0 === t || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), void 0, !1))) break;
        r = i
      }
    }
    return r
  }
  ForceSetMarkVisible(e, r, t) {
    let i = this.SDi.get(e);
    void 0 === i && (i = new Map, this.SDi.set(e, i)), i.set(r, t)
  }
  GetMarkForceVisible(e, r) {
    let t = !0;
    e = this.SDi.get(e);
    return t = e && e.has(r) ? e.get(r) ?? !1 : t
  }
  AddOccupationInfo(e) {
    var r = ConfigManager_1.ConfigManager.QuestNewConfig.GetNewOccupationConfig(e.qEs);
    if (r && r.OccupationData && !StringUtils_1.StringUtils.IsEmpty(r.OccupationData) && "Empty" !== r.OccupationData) {
      r = Json_1.Json.Parse(r.OccupationData);
      if (r) {
        r = r.LevelPlayIds;
        for (const t of r) this.yDi.set(t, MathUtils_1.MathUtils.LongToBigInt(e.w5n));
        this.IDi.set(e.qEs, r)
      }
    }
  }
  RemoveOccupationInfo(e) {
    if (this.IDi.has(e)) {
      var r = this.IDi.get(e);
      this.IDi.delete(e);
      for (const t of r) this.yDi.delete(t)
    }
  }
  IsLevelPlayOccupied(e) {
    e = this.yDi.get(e);
    return {
      IsOccupied: !!e,
      QuestId: e
    }
  }
  IsMarkUnlockedByServer(e) {
    return this.PDi.get(e) ?? !1
  }
  SetMarkServerOpenState(e, r) {
    this.PDi.set(e, r)
  }
  GetMarkAreaText(e, r) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(e, r)?.AreaId ?? 0;
    return this.GetMarkAreaTextByAreaId(e)
  }
  GetMarkAreaTextByAreaId(e) {
    var r = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(e),
      e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e),
      t = e ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title) : "",
      r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r),
      i = r ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r.Title) : "",
      e = e ? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(e.CountryId) : "",
      a = r?.Level ?? 0;
    return 0 === r?.Father || a <= 0 ? e + "-" + t : e + `-${i}-` + t
  }
  UpdateBoxSlotInfo(e) {
    this.Wcl.set(e.T7n, e)
  }
  RemoveBoxSlotInfo(e) {
    for (var [, r] of this.Wcl)
      if (r.b7n === e) {
        this.Wcl.delete(r.T7n);
        break
      }
  }
  FullUpdateBoxSlotInfo(e) {
    this.Wcl.clear();
    for (const r of e) this.UpdateBoxSlotInfo(r)
  }
  GetBoxSlotInfoByMarkId(e) {
    for (var [, r] of this.Wcl)
      if (r.T7n === e) return r
  }
  UpdateTemporaryTeleportInfo(e) {
    this.Qcl.set(e.T7n, e);
    var r = this.GetDynamicMark(e.T7n);
    r && (r.TeleportId = MathUtils_1.MathUtils.LongToNumber(e.R7n), e.Suc) && (r.AreaId = e.Suc)
  }
  RemoveTemporaryTeleportInfo(e) {
    for (var [, r] of this.Qcl)
      if (r.T7n === e) {
        this.Qcl.delete(r.T7n);
        break
      }
  }
  FullUpdateTemporaryTeleportInfo(e) {
    this.Qcl.clear();
    for (const r of e) this.UpdateTemporaryTeleportInfo(r)
  }
  GetDungeonMapConfigId(e) {
    var r;
    return 0 === e || void 0 === (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) ? e : r.MapConfigId
  }
  GetDungeonLocateWorldMapId(e) {
    if (0 !== e) {
      e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
      if (void 0 !== e) return (12 === e.InstSubType ? this.GetDungeonEntranceConfig(e) : e).MapConfigId
    }
  }
  GetDungeonLocateWorldMapLocation(e, r) {
    if (0 !== r) {
      var t, i, r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
      if (void 0 !== r) return 12 === r.InstSubType ? void 0 !== (t = this.GetDungeonEntranceConfig(r)) ? (i = r.EntranceEntities[0].EntranceEntityId, ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(i, t.MapConfigId)) : void 0 : ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId)
    }
  }
  GetDungeonExitLocation(e, r) {
    if (0 !== r) {
      var t, r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
      if (void 0 !== r) return 12 === r.InstSubType ? (t = r.ExitEntities[0], ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(t, r.MapConfigId)) : ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId)
    }
  }
  GetDungeonEntranceConfig(e) {
    var r, t;
    if (!(e.EntranceEntities.length < 1)) return r = e.EntranceEntities[0].DungeonId, void 0 === (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r)) && MapLogger_1.MapLogger.ErrorOnce(e.Id, 63, "世界副本查找入口实体失败->入口副本配置为空", ["副本Id", e.Id], ["entranceDungeonId", r]), t;
    MapLogger_1.MapLogger.ErrorOnce(e.Id, 63, "世界副本查找入口实体失败->实体列表为空", ["副本Id", e.Id])
  }
  GetMarkMapConfigId(e, r) {
    r = this.GetMark(r, e);
    return void 0 === r ? ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e)?.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID : r.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID
  }
  GetMarkMapGravity(e, r) {
    r = this.GetMark(r, e);
    return void 0 === r ? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)?.GravityFlip ?? 1 : r.MapGravity ?? 1
  }
  get CurrentMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    return 0 !== e.ViewMapId ? e.ViewMapId : e.MapConfigId
  }
  GetDungeonWorldMapConfigId(e) {
    var r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    return void 0 !== r && 0 !== r.ViewMapId ? r.ViewMapId : this.GetDungeonLocateWorldMapId(e) ?? r.MapConfigId
  }
  get CurrentWorldMapConfigId() {
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    return 0 !== e.ViewMapId ? e.ViewMapId : this.GetDungeonLocateWorldMapId(e.Id) ?? e.MapConfigId
  }
  get CurrentInWorld() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(e)
  }
  get CurrentPlayerGravity() {
    return (Global_1.Global.BaseCharacter?.CharacterActorComponent)?.MoveComp?.IsStandardGravity ? 1 : 2
  }
  get CurrentPlayerGravityDirection() {
    return (Global_1.Global.BaseCharacter?.CharacterActorComponent)?.MoveComp?.GravityDirect
  }
  get IsPlayerInStandardGravity() {
    return 1 === this.CurrentPlayerGravity
  }
  GetInstanceIdByWorldMapId(e) {
    return e !== ModelManager_1.ModelManager.MapModel.CurrentWorldMapConfigId && ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(e) ? e : ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
  }
  AddTrackMarkId(e) {
    this.H81.has(e) || this.H81.add(e)
  }
  RemoveTrackMarkId(e) {
    this.H81.delete(e)
  }
  ClearTrackMarkId() {
    this.H81.clear()
  }
  IsMarkTracking(e) {
    return this.H81.has(e) ?? !1
  }
  UpdateMarkHideInfo(e) {
    var r = this.GetMarkHideInfoKey(e.w7n, e.A5n);
    StringUtils_1.StringUtils.IsEmpty(e.Yd1) ? this.Bm1.delete(r) : this.Bm1.set(r, e)
  }
  ClearMarkHideInfo() {
    this.Bm1.clear()
  }
  GetMarkHideInfoKey(e, r) {
    return e + "_" + r
  }
  IsMarkHideByServer(e, r) {
    e = this.GetMarkHideInfoKey(e, r);
    return void 0 !== this.Bm1.get(e)
  }
  GetMarkHideReason(e, r) {
    e = this.GetMarkHideInfoKey(e, r), r = this.Bm1.get(e);
    if (void 0 !== r?.Yd1) return this.ParseHideReason(r?.Yd1)
  }
  ParseHideReason(e) {
    if ("d" === e.toLowerCase()) return ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Occupied_Not_Refresh_Text");
    var e = e.split("_"),
      r = e[0].toLowerCase(),
      e = Number(e[1]);
    if ("q" === r) return t = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e), ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Quest_Occupied_Text", t);
    if ("l" === r) {
      var t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e);
      if (void 0 !== t) return r = t.Name, ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Mark_Play_Occupied_Text", r)
    }
  }
  InitTeleportMarkQueryCache() {
    var e, r, t;
    for (const i of ConfigManager_1.ConfigManager.MapConfig.GetConfigMarkMap().values()) 15 !== i.ObjectType && 5 !== i.ObjectType && 6 !== i.ObjectType && 10 !== i.ObjectType && 19 !== i.ObjectType && 1 !== i.EnableQuickTransfer || (r = Vector_1.Vector.Create(), MapUtil_1.MapUtil.GetConfigPosition(i.EntityConfigId, r, i.RelativeDungeonId), e = {
      MarkId: i.MarkId,
      MarkType: i.ObjectType,
      MapId: i.MapId,
      InstanceDungeonId: i.RelativeDungeonId,
      Gravity: i.GravityFlip,
      WorldPosition: r
    }, r = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(r), (t = this.O$1.get(r)) ? t.add(e) : (t = (new Set).add(e), this.O$1.set(r, t)))
  }
  QueryNearestTeleporter(a, e, r) {
    const n = this.GetMark(e, a)?.InstanceDungeonId ?? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a)?.RelativeDungeonId ?? 0,
      o = this.GetMark(e, a)?.MapGravity ?? ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a)?.GravityFlip ?? 0;
    return this.G$1(a, e, r, e => {
      if (a === e.MarkId) return !1;
      var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId);
      if (!(n === e.InstanceDungeonId)) return !1;
      var t = ModelManager_1.ModelManager.MapModel.IsTeleportLocked(e.MarkId),
        i = ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(e.MarkId);
      if (t || !i) return !1;
      if ((10 === e.MarkType || 19 === e.MarkType) && r) {
        t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r.RelativeId);
        if (!t || t.IsClose) return !1;
        if (ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(t.Id).IsOccupied) return !1
      }
      return !(15 !== e.MarkType && 5 !== e.MarkType && 6 !== e.MarkType && 10 !== e.MarkType && 19 !== e.MarkType || 0 !== o && 0 !== e.Gravity && e.Gravity !== o)
    })
  }
  F$1(e, r) {
    var t = this.GetMark(r, e);
    let i = 0;
    if (void 0 === t) {
      var a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
      if (void 0 === a) return MapLogger_1.MapLogger.ErrorOnce(e, 63, "查询标记追踪目标->目标的标记配置和数据都为空", ["trackTargetMarkId", e], ["targetMarkType", r]), i;
      i = a.EntityConfigId ?? Vector_1.Vector.Create(a.MarkVector)
    } else i = t.TrackTarget;
    return i
  }
  G$1(e, r, i, a) {
    var n = this.F$1(e, r);
    if (0 !== n) {
      var o, s = this.GetMarkMapConfigId(e, r);
      const M = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(n, s);
      let t = this.q$1.Get(e);
      if (void 0 === t) {
        t = [];
        n = CommonParamById_1.configCommonParamById.GetIntConfig("QuickTransferRange") * MapDefine_1.UNIT, s = MapUtil_1.MapUtil.GetQueryNearestIndexSet(M, n);
        const h = n * n;
        for (const d of s) this.O$1.get(d)?.forEach(e => {
          var r = Vector_1.Vector.DistSquared(e.WorldPosition, M);
          r <= h && t.push([e, r])
        });
        this.q$1.Put(e, t), t.sort((e, r) => e[1] - r[1])
      }
      for ([o] of t)
        if (a?.(o) ?? !0) return Vector_1.Vector.DistSquared(i, M) <= Vector_1.Vector.DistSquared(o.WorldPosition, M) ? {
          TargetMarkId: e,
          TargetMarkType: r,
          FailedReason: 1
        } : {
          TargetMarkId: e,
          TargetMarkType: r,
          Info: o
        }
    }
    return {
      TargetMarkId: e,
      TargetMarkType: r,
      FailedReason: 0
    }
  }
}
exports.MapModel = MapModel;
//# sourceMappingURL=MapModel.js.map