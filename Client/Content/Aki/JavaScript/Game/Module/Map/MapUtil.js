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
  static WorldPosition2UiPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    e.Multiply(MapDefine_1.world2UiUnit, r);
    return r;
  }
  static WorldPosition2UiPosition2D(e, r) {
    r = r ?? Vector2D_1.Vector2D.Create();
    return e.Multiply(MapDefine_1.worldToScreenScale, r);
  }
  static UiPosition2WorldPosition(e, r) {
    r = r ?? Vector_1.Vector.Create();
    return e.Division(MapDefine_1.world2UiUnit, r);
  }
  static WorldToScreenPosition(e) {
    var r = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(r, e, this.Swl, false)) {
      r = (0, puerts_1.$unref)(this.Swl);
      if (r) {
        var e = r.X;
        var t = r.Y;
        if (!isNaN(e) && !isNaN(t) && isFinite(e) && isFinite(t)) {
          return r;
        }
      }
    }
  }
  static GetTilePosition(e, r = 0) {
    var e = Vector2D_1.Vector2D.Create(e);
    e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE * 100);
    var t = Math.ceil(e.X + r);
    return {
      X: t,
      Y: Math.ceil(-e.Y + r)
    };
  }
  static GetTilePositionByUiPosition(e) {
    var e = Vector2D_1.Vector2D.Create(e);
    e.DivisionEqual(MapDefine_1.DETAIL_TILE_REALSIZE);
    var r = Math.ceil(e.X);
    return {
      X: r,
      Y: Math.ceil(e.Y)
    };
  }
  static UiConvertToWorldMapLocalPosition(e) {
    var r = ModelManager_1.ModelManager.WorldMapModel.MapScale;
    e.UnaryNegation(e);
    e.MultiplyEqual(r);
    return e;
  }
  static GetTrackPositionByTrackTarget(e, r, t, a, i = true) {
    var [t, n] = this.PDl(e, t);
    if (!t) {
      MapUtil.GetEntityPosition(e, r, a, n, i);
    }
    return n;
  }
  static GetTrackDistanceByMarkId(e) {
    var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!r) {
      return 0;
    }
    const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
    if (!t || !t.TrackSource) {
      return 0;
    }
    let a = 0;
    let i = undefined;
    var n = ModelManager_1.ModelManager.TrackModel.GetTrackData(t.TrackSource, e);
    if (n) {
      a = n.TrackInstanceId ?? 0;
      i = n.TrackTarget;
    } else {
      const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
      a = t?.InstanceDungeonId ?? 0;
      i = t?.TrackTarget;
    }
    n = MapUtil.GetTrackPositionByTrackTarget(i, true, undefined, a);
    if (n) {
      return Math.round(Vector_1.Vector.Distance(n, r) * 0.01);
    } else {
      return 0;
    }
  }
  static GetTrackUiPositionByTrackTargetConfig(e, r) {
    e = MapUtil.GetTrackPositionByTrackTargetConfig(e, r);
    return MapUtil.WorldPosition2UiPosition(e);
  }
  static GetTrackPositionByTrackTargetConfig(e, r, t) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.IsDungeonInWorld(r);
    var i = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(i);
    if (!a && !i) {
      const [M, n] = MapUtil.PDl(e, t);
      if (M) {
        return n;
      } else {
        return MapUtil.GetEntityPositionByConfig(e, r, n);
      }
    }
    if (a && i) {
      const [l, n] = MapUtil.PDl(e, t);
      if (l) {
        return n;
      } else {
        return MapUtil.GetEntityPosition(e, false, r, n);
      }
    }
    const n = t ?? Vector_1.Vector.Create();
    let o = undefined;
    if (o = i ? ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapLocation(r) : ModelManager_1.ModelManager.MapModel.GetDungeonExitLocation(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())) {
      n.FromUeVector(o);
    }
    n.Division(100, n);
    return n;
  }
  static PDl(e, r) {
    if (e) {
      r = r ?? Vector_1.Vector.Create();
      if (e instanceof Vector_1.Vector) {
        r.DeepCopy(e);
        return [true, r];
      } else if (e instanceof Vector2D_1.Vector2D) {
        r.Set(e.X, e.Y, 0);
        return [true, r];
      } else if (e instanceof ue_1.Actor) {
        if (e.IsValid()) {
          r.FromUeVector(e.D_K2_GetActorLocation());
        }
        return [true, r];
      } else {
        return [false, r];
      }
    } else {
      return [true, Vector_1.Vector.ZeroVectorProxy];
    }
  }
  static GetEntityPosition(r, t, a = 0, i, n = false) {
    var o;
    var i = i ?? Vector_1.Vector.Create();
    if (MapUtil.GetDungeonsRelation(a, ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) !== 1) {
      MapUtil.GetConfigPosition(r, i, a);
    } else {
      let e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      if (!(e = e || ModelManager_1.ModelManager.CreatureModel.GetEntityById(r)) || !e?.IsInit) {
        o = a === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() ? a : ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId;
        ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestEntityPosition(o, r, i);
        if (i?.Equality(Vector_1.Vector.ZeroVectorProxy)) {
          MapUtil.GetConfigPosition(r, i, a);
        }
        if (n && i?.Equality(Vector_1.Vector.ZeroVectorProxy)) {
          MapLogger_1.MapLogger.ErrorOnce(r, 63, "获取实体位置失败, 可能会导致地图或者主界面追踪追到原点", ["pbDataOrEntityId:", r], ["addHalfCapsule", t], ["传入的参数副本Id:", a], ["最终使用的副本Id:", o], ["当前玩家所处副本Id:", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["CurrentWorldMapConfigId:", ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId]);
        }
        return i ?? Vector_1.Vector.ZeroVectorProxy;
      }
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetEntityPos(e, t, i);
    }
    return i;
  }
  static GetEntityPositionByConfig(e, r, t) {
    t = t ?? Vector_1.Vector.Create();
    MapUtil.GetConfigPosition(e, t, r);
    return t ?? Vector_1.Vector.ZeroVectorProxy;
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
  static GetMapNameByInstanceId(e, r) {
    var t = MapUtil.GetInstanceDungeonBelongWorldId(e) ?? e;
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAllMapRangeConfigByMapId(t);
    if (a) {
      for (const l of a) {
        if (!(l.AreaRange.length >= 4)) {
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(l.MapName);
        }
        var i = l.AreaRange[0];
        var n = l.AreaRange[1];
        var o = l.AreaRange[2];
        var M = l.AreaRange[3];
        if (i <= r.X && r.X <= o && n <= r.Y && r.Y <= M) {
          return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(l.MapName);
        }
      }
    }
    a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(t);
    if (a) {
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(a.MapName);
    } else {
      MapLogger_1.MapLogger.Error(63, "[地图系统]找不到副本Id对应的地图配置->", ["instanceId", e], ["mapId", t], ["worldPosition", r]);
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText("Country_1_Title");
    }
  }
  static GetConfigPosition(e, r, t) {
    if (t !== 0 && (t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t))) {
      if (e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, t.MapConfigId)) {
        r.FromUeVector(e);
      }
      r.Division(100, r);
    }
  }
  static CrossingTest(r, t) {
    let a = false;
    var i;
    let n = false;
    var o;
    let M = r[r.length - 1];
    let l = r[0];
    a = M.Y >= t.Y;
    n = false;
    let _ = 0;
    var s = r.length;
    for (let e = 0; e < s; e++) {
      i = l.Y >= t.Y;
      if (a !== i) {
        if ((o = M.X >= t.X) == l.X >= t.X) {
          if (o) {
            n = !n;
          }
        } else if (l.X - (l.Y - t.Y) * (M.X - l.X) / (M.Y - l.Y) >= t.X) {
          n = !n;
        }
        a = i;
      }
      M = l;
      _ += 1;
      l = r[_];
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
  static FindMinCircle(r) {
    if (r.length < 1) {
      return new MapDefine_1.Circle(0, 0, 0);
    }
    if (r.length === 1) {
      return new MapDefine_1.Circle(r[0].X, r[0].Y, 0);
    }
    let t = r[0].X;
    let a = r[0].Y;
    let i = r[0].X;
    let n = r[0].Y;
    for (let e = 1; e < r.length; e++) {
      var o = r[e];
      t = Math.min(t, o.X);
      a = Math.min(a, o.Y);
      i = Math.max(i, o.X);
      n = Math.max(n, o.Y);
    }
    var e = (t + i) * 0.5;
    var M = (a + n) * 0.5;
    var l = new Vector2D_1.Vector2D(e, M);
    let _ = 0;
    var s = new Vector2D_1.Vector2D(e, M);
    for (const f of r) {
      var c = Vector2D_1.Vector2D.DistSquared(f, l);
      if (c > _) {
        _ = c;
        s.X = f.X;
        s.Y = f.Y;
      }
    }
    var g = Math.sqrt(_);
    return new MapDefine_1.Circle(e, M, g);
  }
  static IsDungeonDiffWorld(t, a) {
    if (t !== 0 && a !== 0) {
      t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(t);
      a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(a);
      if (t !== undefined && a !== undefined) {
        var i = t.InstSubType;
        var n = a.InstSubType;
        let e = t.MapConfigId;
        let r = a.MapConfigId;
        if (i === 12) {
          i = MapUtil.slh(t);
          e = i.MapConfigId;
        }
        if (n === 12) {
          t = MapUtil.slh(a);
          r = t.MapConfigId;
        }
        return e !== r;
      }
    }
  }
  static GetDungeonsRelation(e, r) {
    if (!r || !e) {
      return 0;
    }
    if (r === e) {
      return 1;
    }
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e);
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r);
    if (!t || !a) {
      return 0;
    }
    var i = t.InstSubType;
    var n = a.InstSubType;
    let o = e;
    let M = r;
    if (i === 12 && t.EntranceEntities?.length) {
      o = t.EntranceEntities[0].DungeonId;
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
    var r;
    if (e !== 0 && (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(e)) !== undefined && r.InstSubType === 12) {
      return MapUtil.slh(r).Id;
    } else {
      return e;
    }
  }
  static slh(e) {
    var r;
    var t;
    if (!(e.EntranceEntities.length < 1)) {
      r = e.EntranceEntities[0].DungeonId;
      if ((t = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(r)) === undefined) {
        MapLogger_1.MapLogger.Error(63, "[地图系统]世界副本查找入口实体失败->入口副本配置为空", ["config", e], ["entranceDungeonId", r]);
      }
      return t;
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
  static GetGamePlayKey(e, r) {
    return e + "_" + r;
  }
  static IsStandardGravity(e) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, -1);
  }
  static ConvertWorldPositionToIndex(e) {
    var r = Math.floor(Math.round(e.X * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    var e = Math.floor(Math.round(e.Y * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    return r * MapDefine_1.MARK_HASH_XY_PANDING + e;
  }
  static GetAroundIndex(e) {
    return new Set([e, e + MapDefine_1.MARK_HASH_XY_PANDING, e - MapDefine_1.MARK_HASH_XY_PANDING, e + 1, e - 1, e + MapDefine_1.MARK_HASH_XY_PANDING - 1, e + MapDefine_1.MARK_HASH_XY_PANDING + 1, e - MapDefine_1.MARK_HASH_XY_PANDING - 1, e - MapDefine_1.MARK_HASH_XY_PANDING + 1]);
  }
  static GetQueryNearestIndexSet(e, r) {
    var e = MapUtil.ConvertWorldPositionToIndex(e);
    var t = Math.ceil(Math.round(r * MapDefine_1.MARK_WORLD_TO_HASH_SCALE) / MapDefine_1.MARK_SCOPE);
    var r = MapUtil.GetAroundIndex(e);
    let a = Array.from(r.values());
    var i = new Set();
    i.add(e);
    for (let e = 0; e <= t; ++e) {
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