"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ue_1 = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("./MapDefine");
const MapLogger_1 = require("./Misc/MapLogger");
class MapUtil {
  static WorldPosition2UiPosition(e, t) {
    t = t ?? Vector_1.Vector.Create();
    e.Multiply(MapDefine_1.world2UiUnit, t);
    return t;
  }
  static WorldPosition2UiPosition2D(e, t) {
    t = t ?? Vector2D_1.Vector2D.Create();
    return e.Multiply(MapDefine_1.worldToScreenScale, t);
  }
  static UiPosition2WorldPosition(e, t) {
    t = t ?? Vector_1.Vector.Create();
    return e.Division(MapDefine_1.world2UiUnit, t);
  }
  static WorldToScreenPosition(e) {
    var t = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(t, e, this.Swl, false)) {
      t = (0, puerts_1.$unref)(this.Swl);
      if (t) {
        var e = t.X;
        var r = t.Y;
        if (!isNaN(e) && !isNaN(r) && isFinite(e) && isFinite(r)) {
          return t;
        }
      }
    }
  }
  static GetTilePosition(e, t = 0) {
    var e = Vector2D_1.Vector2D.Create(e);
    e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE * 100);
    var r = Math.ceil(e.X + t);
    return {
      X: r,
      Y: Math.ceil(-e.Y + t)
    };
  }
  static GetTilePositionByUiPosition(e) {
    var e = Vector2D_1.Vector2D.Create(e);
    e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE);
    var t = Math.ceil(e.X);
    return {
      X: t,
      Y: Math.ceil(e.Y)
    };
  }
  static UiConvertToWorldMapLocalPosition(e) {
    var t = ModelManager_1.ModelManager.WorldMapModel.MapScale;
    e.UnaryNegation(e);
    e.MultiplyEqual(t);
    return e;
  }
  static GetTrackPositionByTrackTarget(e, t, r, a, i = true) {
    var [r, n] = this.PDl(e, r);
    if (!r) {
      MapUtil.GetEntityPosition(e, t, a, n, i);
    }
    return n;
  }
  static GetTrackDistanceByMarkId(e) {
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!t) {
      return 0;
    }
    const r = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
    if (!r || !r.TrackSource) {
      return 0;
    }
    let a = 0;
    let i = undefined;
    var n = ModelManager_1.ModelManager.TrackModel.GetTrackData(r.TrackSource, e);
    if (n) {
      a = n.TrackInstanceId ?? 0;
      i = n.TrackTarget;
    } else {
      const r = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
      a = r?.InstanceDungeonId ?? 0;
      i = r?.TrackTarget;
    }
    n = MapUtil.GetTrackPositionByTrackTarget(i, true, undefined, a);
    if (n) {
      return Math.round(Vector_1.Vector.Distance(n, t) * 0.01);
    } else {
      return 0;
    }
  }
  static GetTrackUiPositionByTrackTargetConfig(e, t) {
    e = MapUtil.GetTrackPositionByTrackTargetConfig(e, t);
    return MapUtil.WorldPosition2UiPosition(e);
  }
  static GetTrackPositionByTrackTargetConfig(e, t, r) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(t);
    var i = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i);
    if (!a && !i) {
      const [M, n] = MapUtil.PDl(e, r);
      if (M) {
        return n;
      } else {
        return MapUtil.GetEntityPositionByConfig(e, t, n);
      }
    }
    if (a && i) {
      const [_, n] = MapUtil.PDl(e, r);
      if (_) {
        return n;
      } else {
        return MapUtil.GetEntityPosition(e, false, t, n);
      }
    }
    const n = r ?? Vector_1.Vector.Create();
    let o = undefined;
    if (o = i ? ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(t) : ModelManager_1.ModelManager.MapModel.GetDungeonExitLocation(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) {
      n.FromUeVector(o);
    }
    n.Division(100, n);
    return n;
  }
  static PDl(e, t) {
    if (e) {
      t = t ?? Vector_1.Vector.Create();
      if (e instanceof Vector_1.Vector) {
        t.DeepCopy(e);
        return [true, t];
      } else if (e instanceof Vector2D_1.Vector2D) {
        t.Set(e.X, e.Y, 0);
        return [true, t];
      } else if (e instanceof ue_1.Actor) {
        if (e.IsValid()) {
          t.FromUeVector(e.D_K2_GetActorLocation());
        }
        return [true, t];
      } else {
        return [false, t];
      }
    } else {
      return [true, Vector_1.Vector.ZeroVectorProxy];
    }
  }
  static GetEntityPosition(t, r, a = 0, i, n = false) {
    var o;
    var i = i ?? Vector_1.Vector.Create();
    if (MapUtil.GetDungeonsRelation(a, ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) !== 1) {
      MapUtil.GetConfigPosition(t, i, a);
    } else {
      let e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (!(e = e || ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)) || !e?.IsInit) {
        o = a === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() ? a : ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId;
        ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestEntityPosition(o, t, i);
        if (i?.Equality(Vector_1.Vector.ZeroVectorProxy)) {
          MapUtil.GetConfigPosition(t, i, a);
        }
        if (n && i?.Equality(Vector_1.Vector.ZeroVectorProxy)) {
          MapLogger_1.MapLogger.ErrorOnce(t, 63, "获取实体位置失败, 可能会导致地图或者主界面追踪追到原点", ["pbDataOrEntityId:", t], ["addHalfCapsule", r], ["传入的参数副本Id:", a], ["最终使用的副本Id:", o], ["当前玩家所处副本Id:", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["CurrentWorldMapConfigId:", ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId]);
        }
        return i ?? Vector_1.Vector.ZeroVectorProxy;
      }
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetEntityPos(e, r, i);
    }
    return i;
  }
  static GetEntityPositionByConfig(e, t, r) {
    r = r ?? Vector_1.Vector.Create();
    MapUtil.GetConfigPosition(e, r, t);
    return r ?? Vector_1.Vector.ZeroVectorProxy;
  }
  static GetWorldMapLevelOneAreaId() {
    var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(2);
    if (e !== 0) {
      return e;
    } else if ((e = ModelManager_1.ModelManager.MapModel.LastHighLevelArea) && e !== 0) {
      return ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    } else {
      return ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(2);
    }
  }
  static GetMapNameByInstanceId(e, t) {
    var r = MapUtil.GetInstanceDungeonBelongWorldId(e) ?? e;
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAllMapRangeConfigByMapId(r);
    if (a) {
      for (const _ of a) {
        if (!(_.AreaRange.length >= 4)) {
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(_.MapName);
        }
        var i = _.AreaRange[0];
        var n = _.AreaRange[1];
        var o = _.AreaRange[2];
        var M = _.AreaRange[3];
        if (i <= t.X && t.X <= o && n <= t.Y && t.Y <= M) {
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(_.MapName);
        }
      }
    }
    a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(r);
    if (a) {
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(a.MapName);
    } else {
      MapLogger_1.MapLogger.Error(63, "[地图系统]找不到副本Id对应的地图配置->", ["instanceId", e], ["mapId", r], ["worldPosition", t]);
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText("Country_1_Title");
    }
  }
  static GetConfigPosition(e, t, r) {
    if (r !== 0 && (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r))) {
      if (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId)) {
        t.FromUeVector(e);
      }
      t.Division(100, t);
    }
  }
  static CrossingTest(t, r) {
    let a = false;
    var i;
    let n = false;
    var o;
    let M = t[t.length - 1];
    let _ = t[0];
    a = M.Y >= r.Y;
    n = false;
    let l = 0;
    var s = t.length;
    for (let e = 0; e < s; e++) {
      i = _.Y >= r.Y;
      if (a !== i) {
        if ((o = M.X >= r.X) == _.X >= r.X) {
          if (o) {
            n = !n;
          }
        } else if (_.X - (_.Y - r.Y) * (M.X - _.X) / (M.Y - _.Y) >= r.X) {
          n = !n;
        }
        a = i;
      }
      M = _;
      l += 1;
      _ = t[l];
    }
    return n;
  }
  static IsTemporaryTeleportEntity(e) {
    e = e.ComponentsData;
    return (0, IComponent_1.getComponent)(e, "DynamicTeleportComponent") !== undefined;
  }
  static IsTreasureBox(e) {
    e = e.ComponentsData;
    return (0, IComponent_1.getComponent)(e, "TreasureBoxComponent") !== undefined;
  }
  static FindMinCircle(t) {
    if (t.length < 1) {
      return new MapDefine_1.Circle(0, 0, 0);
    }
    if (t.length === 1) {
      return new MapDefine_1.Circle(t[0].X, t[0].Y, 0);
    }
    let r = t[0].X;
    let a = t[0].Y;
    let i = t[0].X;
    let n = t[0].Y;
    for (let e = 1; e < t.length; e++) {
      var o = t[e];
      r = Math.min(r, o.X);
      a = Math.min(a, o.Y);
      i = Math.max(i, o.X);
      n = Math.max(n, o.Y);
    }
    var e = (r + i) * 0.5;
    var M = (a + n) * 0.5;
    var _ = new Vector2D_1.Vector2D(e, M);
    let l = 0;
    var s = new Vector2D_1.Vector2D(e, M);
    for (const g of t) {
      var c = Vector2D_1.Vector2D.DistSquared(g, _);
      if (c > l) {
        l = c;
        s.X = g.X;
        s.Y = g.Y;
      }
    }
    var f = Math.sqrt(l);
    return new MapDefine_1.Circle(e, M, f);
  }
  static IsDungeonDiffWorld(r, a) {
    if (r !== 0 && a !== 0) {
      r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
      a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(a);
      if (r !== undefined && a !== undefined) {
        var i = r.InstSubType;
        var n = a.InstSubType;
        let e = r.MapConfigId;
        let t = a.MapConfigId;
        if (i === 12) {
          i = MapUtil.slh(r);
          e = i.MapConfigId;
        }
        if (n === 12) {
          r = MapUtil.slh(a);
          t = r.MapConfigId;
        }
        return e !== t;
      }
    }
  }
  static GetDungeonsRelation(e, t) {
    if (!t || !e) {
      return 0;
    }
    if (t === e) {
      return 1;
    }
    var r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t);
    if (!r || !a) {
      return 0;
    }
    var i = r.InstSubType;
    var n = a.InstSubType;
    let o = e;
    let M = t;
    if (i === 12 && r.EntranceEntities?.length) {
      o = r.EntranceEntities[0].DungeonId;
    }
    if (n === 12 && a.EntranceEntities?.length) {
      M = a.EntranceEntities[0].DungeonId;
    }
    if (o === M) {
      return 2;
    } else {
      return 3;
    }
  }
  static GetInstanceDungeonBelongWorldId(e) {
    var t;
    if (e !== 0 && (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) !== undefined && t.InstSubType === 12) {
      return MapUtil.slh(t).Id;
    } else {
      return e;
    }
  }
  static slh(e) {
    var t;
    var r;
    if (!(e.EntranceEntities.length < 1)) {
      t = e.EntranceEntities[0].DungeonId;
      if ((r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t)) === undefined) {
        MapLogger_1.MapLogger.Error(63, "[地图系统]世界副本查找入口实体失败->入口副本配置为空", ["config", e], ["entranceDungeonId", t]);
      }
      return r;
    }
    MapLogger_1.MapLogger.Error(63, "[地图系统]世界副本查找入口实体失败->实体列表为空", ["config", e]);
  }
  static GetLastBigScenePlayerUiPosition() {
    var e = this.GetLastBigScenePlayerPosition();
    return this.WorldPosition2UiPosition2D(Vector2D_1.Vector2D.Create(e.X, e.Y));
  }
  static GetLastBigScenePlayerPosition() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo;
    if (e) {
      return e.Position;
    } else if (e = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) {
      return e.Division(100, e);
    } else {
      return GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    }
  }
  static GetGamePlayKey(e, t) {
    return e + "_" + t;
  }
  static IsStandardGravity(e) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, -1);
  }
  static ConvertWorldPositionToIndex(e) {
    var t = Math.floor(Math.round(e.X * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    var e = Math.floor(Math.round(e.Y * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    return t * MapDefine_1.MARK_HASH_XY_PANDING + e;
  }
  static GetAroundIndex(e) {
    return new Set([e, e + MapDefine_1.MARK_HASH_XY_PANDING, e - MapDefine_1.MARK_HASH_XY_PANDING, e + 1, e - 1, e + MapDefine_1.MARK_HASH_XY_PANDING - 1, e + MapDefine_1.MARK_HASH_XY_PANDING + 1, e - MapDefine_1.MARK_HASH_XY_PANDING - 1, e - MapDefine_1.MARK_HASH_XY_PANDING + 1]);
  }
  static GetUpdateAroundIndex(e) {
    return new Set([...this.GetAroundIndex(e), e - MapDefine_1.MARK_HASH_XY_PANDING * 2 - 2, e - MapDefine_1.MARK_HASH_XY_PANDING * 2 - 1, e - MapDefine_1.MARK_HASH_XY_PANDING * 2, e - MapDefine_1.MARK_HASH_XY_PANDING * 2 + 1, e - MapDefine_1.MARK_HASH_XY_PANDING * 2 + 2, e - MapDefine_1.MARK_HASH_XY_PANDING - 2, e - MapDefine_1.MARK_HASH_XY_PANDING + 2, e - 2, e + 2, e + MapDefine_1.MARK_HASH_XY_PANDING - 2, e + MapDefine_1.MARK_HASH_XY_PANDING + 2, e + MapDefine_1.MARK_HASH_XY_PANDING * 2 - 2, e + MapDefine_1.MARK_HASH_XY_PANDING * 2 - 1, e + MapDefine_1.MARK_HASH_XY_PANDING * 2, e + MapDefine_1.MARK_HASH_XY_PANDING * 2 + 1, e + MapDefine_1.MARK_HASH_XY_PANDING * 2 + 2]);
  }
  static GetQueryNearestIndexSet(e, t) {
    var e = MapUtil.ConvertWorldPositionToIndex(e);
    var r = Math.ceil(Math.round(t * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    var t = MapUtil.GetAroundIndex(e);
    let a = Array.from(t.values());
    var i = new Set();
    i.add(e);
    for (let e = 0; e <= r; ++e) {
      var n = [];
      for (const o of a) {
        if (!i.has(o)) {
          for (const M of MapUtil.GetAroundIndex(o)) {
            if (!i.has(M)) {
              n.push(M);
            }
          }
          i.add(o);
        }
      }
      a = n;
    }
    return i;
  }
}
(exports.MapUtil = MapUtil).Swl = (0, puerts_1.$ref)(undefined);
//# sourceMappingURL=MapUtil.js.map