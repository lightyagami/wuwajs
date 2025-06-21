"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapUtil = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("./MapDefine"),
  MapLogger_1 = require("./Misc/MapLogger");
class MapUtil {
  static WorldPosition2UiPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    return e.Multiply(MapDefine_1.world2UiUnit, r), r
  }
  static WorldPosition2UiPosition2D(e, r) {
    r = r ?? Vector2D_1.Vector2D.Create();
    return e.Multiply(MapDefine_1.worldToScreenScale, r)
  }
  static UiPosition2WorldPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    return e.Division(MapDefine_1.world2UiUnit, r)
  }
  static WorldToScreenPosition(e) {
    var r = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(r, e, this.Swl, !1)) {
      r = (0, puerts_1.$unref)(this.Swl);
      if (r) {
        var e = r.X,
          t = r.Y;
        if (!isNaN(e) && !isNaN(t) && isFinite(e) && isFinite(t)) return r
      }
    }
  }
  static GetTilePosition(e, r = 0) {
    var e = Vector2D_1.Vector2D.Create(e),
      t = (e.DivisionEqual(100 * MapDefine_1.DETAIL_TILE_REALSIZE), Math.ceil(e.X + r));
    return {
      X: t,
      Y: Math.ceil(-e.Y + r)
    }
  }
  static GetTilePositionByUiPosition(e) {
    var e = Vector2D_1.Vector2D.Create(e),
      r = (e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE), Math.ceil(e.X));
    return {
      X: r,
      Y: Math.ceil(e.Y)
    }
  }
  static GetTrackPositionByTrackTarget(e, r, t, a, i = !0) {
    var [t, n] = this.PDl(e, t);
    return t || MapUtil.GetEntityPosition(e, r, a, n, i), n
  }
  static GetTrackDistanceByMarkId(e) {
    var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!r) return 0;
    const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
    if (!t || !t.TrackSource) return 0;
    let a = 0,
      i = void 0;
    var n = ModelManager_1.ModelManager.TrackModel.GetTrackData(t.TrackSource, e);
    if (n) a = n.TrackInstanceId ?? 0, i = n.TrackTarget;
    else {
      const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
      a = t?.InstanceDungeonId ?? 0, i = t?.TrackTarget
    }
    n = MapUtil.GetTrackPositionByTrackTarget(i, !0, void 0, a);
    return n ? Math.round(.01 * Vector_1.Vector.Distance(n, r)) : 0
  }
  static GetTrackUiPositionByTrackTargetConfig(e, r) {
    e = MapUtil.GetTrackPositionByTrackTargetConfig(e, r);
    return MapUtil.WorldPosition2UiPosition(e)
  }
  static GetTrackPositionByTrackTargetConfig(e, r, t) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(r),
      i = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId,
      i = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i);
    if (!a && !i) {
      const [M, n] = MapUtil.PDl(e, t);
      return M ? n : MapUtil.GetEntityPositionByConfig(e, r, n)
    }
    if (a && i) {
      const [l, n] = MapUtil.PDl(e, t);
      return l ? n : MapUtil.GetEntityPosition(e, !1, r, n)
    }
    const n = t ?? Vector_1.Vector.Create();
    let o = void 0;
    return (o = i ? ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(e, r) : ModelManager_1.ModelManager.MapModel.GetDungeonExitLocation(e, ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) && n.FromUeVector(o), n.Division(100, n), n
  }
  static PDl(e, r) {
    return e ? (r = r ?? Vector_1.Vector.Create(), e instanceof Vector_1.Vector ? (r.DeepCopy(e), [!0, r]) : e instanceof Vector2D_1.Vector2D ? (r.Set(e.X, e.Y, 0), [!0, r]) : e instanceof ue_1.Actor ? (e.IsValid() && r.FromUeVector(e.D_K2_GetActorLocation()), [!0, r]) : [!1, r]) : [!0, Vector_1.Vector.ZeroVectorProxy]
  }
  static GetEntityPosition(r, t, a = 0, i, n = !1) {
    var o, i = i ?? Vector_1.Vector.Create();
    if (1 !== MapUtil.GetDungeonsRelation(a, ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) MapUtil.GetConfigPosition(r, i, a);
    else {
      let e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      if (!(e = e || ModelManager_1.ModelManager.CreatureModel.GetEntityById(r)) || !e?.IsInit) return o = a === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() ? a : ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId, ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestEntityPosition(o, r, i), i?.Equality(Vector_1.Vector.ZeroVectorProxy) && MapUtil.GetConfigPosition(r, i, a), n && i?.Equality(Vector_1.Vector.ZeroVectorProxy) && MapLogger_1.MapLogger.ErrorOnce(r, 63, "获取实体位置失败, 可能会导致地图或者主界面追踪追到原点", ["pbDataOrEntityId:", r], ["addHalfCapsule", t], ["传入的参数副本Id:", a], ["最终使用的副本Id:", o], ["当前玩家所处副本Id:", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["CurrentWorldMapConfigId:", ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId]), i ?? Vector_1.Vector.ZeroVectorProxy;
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetEntityPos(e, t, i)
    }
    return i
  }
  static GetEntityPositionByConfig(e, r, t) {
    t = t ?? Vector_1.Vector.Create();
    return MapUtil.GetConfigPosition(e, t, r), t ?? Vector_1.Vector.ZeroVectorProxy
  }
  static GetWorldMapLevelOneAreaId() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    if (e && 0 !== e.AreaId) return e = e.AreaId, ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(ExploreProgressDefine_1.AREA_LEVEL);
    if (e <= 1) {
      var r = ModelManager_1.ModelManager.MapModel.LastHighLevelArea;
      if (void 0 !== r) return ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(r)
    }
    return e
  }
  static GetMapNameByInstanceId(e, r) {
    var t = MapUtil.GetInstanceDungeonBelongWorldId(e) ?? e,
      a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAllMapRangeConfigByMapId(t);
    if (a)
      for (const l of a) {
        if (!(4 <= l.AreaRange.length)) return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(l.MapName);
        var i = l.AreaRange[0],
          n = l.AreaRange[1],
          o = l.AreaRange[2],
          M = l.AreaRange[3];
        if (i <= r.X && r.X <= o && n <= r.Y && r.Y <= M) return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(l.MapName)
      }
    a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(t);
    return a ? ConfigManager_1.ConfigManager.MapConfig.GetLocalText(a.MapName) : (MapLogger_1.MapLogger.Error(63, "[地图系统]找不到副本Id对应的地图配置->", ["instanceId", e], ["mapId", t], ["worldPosition", r]), ConfigManager_1.ConfigManager.MapConfig.GetLocalText("Country_1_Title"))
  }
  static GetConfigPosition(e, r, t) {
    0 !== t && (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t)) && ((e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, t.MapConfigId)) && r.FromUeVector(e), r.Division(100, r))
  }
  static CrossingTest(r, t) {
    let a = !1;
    var i;
    let n = !1;
    var o;
    let M = r[r.length - 1],
      l = r[0],
      s = (a = M.Y >= t.Y, n = !1, 0);
    var _ = r.length;
    for (let e = 0; e < _; e++) i = l.Y >= t.Y, a !== i && ((o = M.X >= t.X) == l.X >= t.X ? o && (n = !n) : l.X - (l.Y - t.Y) * (M.X - l.X) / (M.Y - l.Y) >= t.X && (n = !n), a = i), M = l, s += 1, l = r[s];
    return n
  }
  static IsTemporaryTeleportEntity(e) {
    e = e.ComponentsData;
    return void 0 !== (0, IComponent_1.getComponent)(e, "DynamicTeleportComponent")
  }
  static IsTreasureBox(e) {
    e = e.ComponentsData;
    return void 0 !== (0, IComponent_1.getComponent)(e, "TreasureBoxComponent")
  }
  static MinBoundingCircle(o, r = 10) {
    if (0 !== o.length) {
      if (1 === o.length) return new MapDefine_1.Circle(o[0].X, o[0].Y, 0);
      var e, t, a, i, M;
      if (2 === o.length) return [i, M] = o, e = M.X - i.X, t = M.Y - i.Y, a = (i.X + M.X) / 2, i = (i.Y + M.Y) / 2, M = Math.sqrt(e * e + t * t) / 2, new MapDefine_1.Circle(a, i, M);
      const g = o[0];
      let n = void 0;
      for (let e = 0; e < r; e++) {
        var l = o.filter(e => Vector2D_1.Vector2D.Distance(e, g) <= Vector2D_1.Vector2D.Distance(e, o[Math.floor(Math.random() * o.length)]));
        l.length < o.length && (l = MapUtil.MinBoundingCircle(l)) && (!n || l.R < n.R) && (n = l)
      }
      if (!n || !o.every(e => Vector2D_1.Vector2D.Distance(e, Vector2D_1.Vector2D.Create(n.X, n.Y)) <= n.R)) {
        let e = 1 / 0,
          r = -1 / 0,
          t = 1 / 0,
          a = -1 / 0;
        for (const f of o) e = Math.min(e, f.X), r = Math.max(r, f.X), t = Math.min(t, f.Y), a = Math.max(a, f.Y);
        var s = (e + r) / 2,
          _ = (t + a) / 2;
        let i = 0;
        for (const u of o) {
          var c = Vector2D_1.Vector2D.Distance(Vector2D_1.Vector2D.Create(s, _), u);
          i = Math.max(i, c)
        }
        n = new MapDefine_1.Circle(s, _, i)
      }
      return n
    }
  }
  static IsDungeonDiffWorld(t, a) {
    if (0 !== t && 0 !== a) {
      t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t), a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(a);
      if (void 0 !== t && void 0 !== a) {
        var i = t.InstSubType,
          n = a.InstSubType;
        let e = t.MapConfigId,
          r = a.MapConfigId;
        return 12 === i && (i = MapUtil.slh(t), e = i.MapConfigId), 12 === n && (t = MapUtil.slh(a), r = t.MapConfigId), e !== r
      }
    }
  }
  static GetDungeonsRelation(e, r) {
    if (!r || !e) return 0;
    if (r === e) return 1;
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e),
      a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
    if (!t || !a) return 0;
    var i = t.InstSubType,
      n = a.InstSubType;
    let o = e,
      M = r;
    return 12 === i && t.EntranceEntities?.length && (o = t.EntranceEntities[0].DungeonId), 12 === n && a.EntranceEntities?.length && (M = a.EntranceEntities[0].DungeonId), o === M ? 2 : 3
  }
  static GetInstanceDungeonBelongWorldId(e) {
    var r;
    return 0 !== e && void 0 !== (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) && 12 === r.InstSubType ? MapUtil.slh(r).Id : e
  }
  static slh(e) {
    var r, t;
    if (!(e.EntranceEntities.length < 1)) return r = e.EntranceEntities[0].DungeonId, void 0 === (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r)) && MapLogger_1.MapLogger.Error(63, "[地图系统]世界副本查找入口实体失败->入口副本配置为空", ["config", e], ["entranceDungeonId", r]), t;
    MapLogger_1.MapLogger.Error(63, "[地图系统]世界副本查找入口实体失败->实体列表为空", ["config", e])
  }
  static GetLastBigScenePlayerUiPosition() {
    var e = this.GetLastBigScenePlayerPosition();
    return this.WorldPosition2UiPosition2D(Vector2D_1.Vector2D.Create(e.X, e.Y))
  }
  static GetLastBigScenePlayerPosition() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    return e ? e.Position : (e = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(0, ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) ? e.Division(100, e) : GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()
  }
  static GetGamePlayKey(e, r) {
    return e + "_" + r
  }
  static IsStandardGravity(e) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, -1)
  }
  static ConvertWorldPositionToIndex(e) {
    var r = Math.floor(Math.round(e.X * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE),
      e = Math.floor(Math.round(e.Y * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    return r * MapDefine_1.MARK_HASH_XY_PANDING + e
  }
  static GetAroundIndex(e) {
    return new Set([e, e + MapDefine_1.MARK_HASH_XY_PANDING, e - MapDefine_1.MARK_HASH_XY_PANDING, e + 1, e - 1, e + MapDefine_1.MARK_HASH_XY_PANDING - 1, e + MapDefine_1.MARK_HASH_XY_PANDING + 1, e - MapDefine_1.MARK_HASH_XY_PANDING - 1, e - MapDefine_1.MARK_HASH_XY_PANDING + 1])
  }
  static GetQueryNearestIndexSet(e, r) {
    var e = MapUtil.ConvertWorldPositionToIndex(e),
      t = Math.ceil(Math.round(r * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE),
      r = MapUtil.GetAroundIndex(e);
    let a = Array.from(r.values());
    var i = new Set;
    i.add(e);
    for (let e = 0; e <= t; ++e) {
      var n = [];
      for (const o of a)
        if (!i.has(o)) {
          for (const M of MapUtil.GetAroundIndex(o)) i.has(M) || n.push(M);
          i.add(o)
        } a = n
    }
    return i
  }
}(exports.MapUtil = MapUtil).Swl = (0, puerts_1.$ref)(void 0);
//# sourceMappingURL=MapUtil.js.map