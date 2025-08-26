"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkContainer = undefined;
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeUtil");
const TrackController_1 = require("../../../../Track/TrackController");
const MapUtil_1 = require("../../../MapUtil");
const MarkDefine_1 = require("../../../Mark/MarkDefine");
const MapLogger_1 = require("../../../Misc/MapLogger");
const MapMarkPreemptiveFrameQueue_1 = require("./MapFrameTaskQueue/MapMarkPreemptiveFrameQueue");
class MapMarkContainer {
  constructor() {
    this.vlh = new MapMarkPreemptiveFrameQueue_1.MapMarkPreemptiveFrameQueue(50);
    this.rUi = new Map();
    this.Mlh = new Map();
    this.nUi = new Map();
    this.hUi = new Map();
    this.sUi = new Set();
    this.aUi = new Set();
    this.qDl = new Set();
  }
  Tick() {
    this.vlh.Process();
  }
  ClearMarkItems(e, r) {
    if (e) {
      var t = this.rUi.get(e);
      if (t) {
        for (var [, a] of t) {
          this.hUi.delete(a.MarkId);
          a.Destroy(r);
          this.LUi(a);
        }
        t.clear();
      }
      t = this.Mlh.get(e);
      if (t) {
        for (var [, i] of t) {
          i.Destroy(r);
        }
        t.clear();
      }
      this.vlh.CancelMapTaskByType(e);
    } else {
      this.nIl(this.rUi, r);
      this.nIl(this.Mlh, r);
      this.sUi.clear();
      this.rUi.clear();
      this.Mlh.clear();
      this.nUi.clear();
      this.vlh.Dispose();
    }
  }
  AddMarkItem(r, t) {
    var e;
    if (t) {
      if (t.MarkId && t.MarkId > 0 && (t.MarkId < 10000000 || t.MarkId > 10000020) && ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t.MarkId) === undefined) {
        MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.AddMarkItem, 未知标记", ["MarkId", t.MarkId]);
      }
      if (t.IsTracked && t.MarkType !== 12) {
        e = {
          MarkType: t.MarkType,
          MarkId: t.MarkId,
          Track: true
        };
        if (!ModelManager_1.ModelManager.MapModel.IsEqualToCurTrack(e)) {
          ModelManager_1.ModelManager.MapModel.SetCurTrackMark(e);
        }
        this.sUi.add(t);
      }
      if (t.IsInConsistentDistrict()) {
        MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.AddMarkItem, 被添加到跨地图列表，将不会显示在地图上", ["markType", r], ["markId", t.MarkId], ["MapType", t.MapType], ["InstanceDungeonId", t.InstanceDungeonId], ["MapId", t.MapId]);
        this.Slh(r, t);
      } else {
        let e = this.GetMarkItemsByType(r, false);
        if (!e) {
          e = new Map();
          this.rUi.set(r, e);
        }
        if (e.has(t.MarkId)) {
          if (ModelManager_1.ModelManager.WorldMapModel.EnableDebug) {
            MapLogger_1.MapLogger.ErrorOnce(t.MarkId, 63, "重复添加标记_MarkMgr", ["MarkId", t.MarkId]);
          }
        } else {
          e.set(t.MarkId, t);
          this.TUi(t);
          MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.AddMarkItem", ["markType", r], ["markId", t.MarkId], ["MapType", t.MapType]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddMapMark, t);
        }
      }
    }
  }
  Slh(r, t) {
    if (t) {
      let e = this.GetDifferMapMarkItemsByType(r);
      if (!e) {
        e = new Map();
        this.Mlh.set(r, e);
      }
      e.set(t.MarkId, t);
    }
  }
  RemoveMarkItem(e, r) {
    this.vlh.CancelMapTask(e, r);
    var t = this.GetMarkItemsByType(e);
    if (t && t.size !== 0) {
      var a = t.get(r);
      t.delete(r);
      this.hUi.delete(r);
      if (a) {
        this.LUi(a);
        MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.RemoveMarkItem", ["markType", e], ["markId", r]);
        return a;
      }
    }
  }
  nIl(e, r) {
    for (var [, t] of e) {
      for (var [, a] of t) {
        this.hUi.delete(a.MarkId);
        a.Destroy(r);
      }
    }
  }
  TUi(e) {
    var r;
    var t = e.WorldPosition;
    if (t) {
      t = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(t);
      if (r = this.nUi.get(t)) {
        this.DO_(r, e);
      } else {
        r = new Set().add(e);
        this.nUi.set(t, r);
      }
      e.GridId = t;
    }
  }
  DO_(e, r) {
    if (e.has(r)) {
      MapLogger_1.MapLogger.ErrorOnce(r.MarkId, 63, "重复添加标记到格子集合中_MarkMarkContainer", ["MarkId", r.MarkId]);
    } else {
      e.add(r);
    }
  }
  LUi(e) {
    var r = e.GridId;
    var r = this.nUi.get(r);
    if (r) {
      r.delete(e);
    }
  }
  ExistMarkItem(e, r) {
    return this.GetMarkItemPurely(e, r) !== undefined;
  }
  ExistMarkItemTask(e, r) {
    return this.vlh.HasTask(e, r);
  }
  GetMarkItem(e, r) {
    this.vlh.ForceExecuteTask(e, r);
    return this.GetMarkItemPurely(e, r);
  }
  GetMarkItemPurely(e, r) {
    if (e === 0) {
      const a = this.GetMarkItemById(r);
      return a;
    }
    var t = this.GetMarkItemsByType(e);
    if (t) {
      const a = t.get(r);
      return a || this.GetDifferMapMarkItem(e, r);
    }
  }
  GetMarkItemById(a, e = false) {
    var r = e => {
      let r = undefined;
      for (var [, t] of e) {
        if (r = t.get(a)) {
          break;
        }
      }
      return r;
    };
    let t = r(this.GetAllMarkItems());
    if (t === undefined && e) {
      e = this.GetAllDiffMapMarkItems();
      t = r(e);
    }
    return t;
  }
  GetDifferMapMarkItem(e, r) {
    e = this.GetDifferMapMarkItemsByType(e);
    if (e) {
      return e.get(r) || undefined;
    }
  }
  GetMarkItemsByType(e, r = true) {
    var t = this.rUi.get(e);
    if ((!t || t.size <= 0) && r) {
      return this.GetDifferMapMarkItemsByType(e);
    } else {
      return t;
    }
  }
  GetDifferMapMarkItemsByType(e) {
    return this.Mlh.get(e);
  }
  GetAllMarkItems() {
    return this.rUi;
  }
  GetAllDiffMapMarkItems() {
    return this.Mlh;
  }
  GetMarkItemsByClickPosition(e) {
    var e = MapUtil_1.MapUtil.UiPosition2WorldPosition(e);
    var e = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(e);
    var r = [];
    for (const a of MapUtil_1.MapUtil.GetAroundIndex(e)) {
      var t = this.nUi.get(a);
      if (t) {
        r.push(...t);
      }
    }
    return r;
  }
  UpdateNearbyMarkItem(e, r, t) {
    this.vlh.Flush();
    var a;
    var e = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(e);
    var i = MapUtil_1.MapUtil.GetAroundIndex(e);
    for (const o of i) {
      var s = this.nUi.get(o);
      if (s) {
        for (const h of s) {
          if (!this.hUi.has(h.MarkId) && h.MarkType !== 11) {
            this.hUi.set(h.MarkId, h);
          }
        }
      }
    }
    this.GDl();
    for ([, a] of this.hUi) {
      r(a);
      var M = a.GridId;
      if (!this.qDl.has(a.MarkId) && (!a.IsCanShowView || !i.has(M))) {
        this.aUi.add(a);
        this.hUi.delete(a.MarkId);
      }
    }
    for (const k of this.sUi) {
      r(k);
    }
    if (this.aUi.size !== 0) {
      for (const f of this.aUi) {
        if (!f.IsDestroy) {
          t(f);
        }
      }
      this.aUi.clear();
    }
    for (const _ of i) {
      var n = this.nUi.get(_);
      if (n) {
        for (const p of n) {
          r(p);
        }
      }
    }
  }
  GDl() {
    this.qDl.clear();
    for (const t of MarkDefine_1.permanentUpdateTypeSet) {
      var e = this.GetMarkItemsByType(t);
      if (e) {
        for (var [, r] of e) {
          this.hUi.set(r.MarkId, r);
          this.qDl.add(r.MarkId);
        }
      }
    }
  }
  FindNearbyMarkItems(t, e, a) {
    this.vlh.Flush();
    var r = MapUtil_1.MapUtil.GetQueryNearestIndexSet(t.WorldPosition, e);
    const i = [];
    const s = e * e;
    for (const M of r) {
      this.nUi.get(M)?.forEach(e => {
        var r;
        if ((a?.(e) ?? true) && (r = t.MarkType !== 9 && t.MarkType !== 22 || !MathUtils_1.MathUtils.IsNearlyZero(t.WorldPosition.Z) ? Vector_1.Vector.DistSquared(e.WorldPosition, t.WorldPosition) : Vector2D_1.Vector2D.DistSquared(Vector2D_1.Vector2D.Create(e.WorldPosition.X, e.WorldPosition.Y), Vector2D_1.Vector2D.Create(t.WorldPosition.X, t.WorldPosition.Y))) <= s) {
          i.push([e, r]);
        }
      });
    }
    if (i.length > 0) {
      i.sort((e, r) => e[1] - r[1]);
    }
    return i;
  }
  RemoveDynamicMark(e, r) {
    var t = this.GetMarkItem(e, r);
    if (t && (this.TrackMapMark(e, t.MarkId, false), this.hUi.has(r) && this.hUi.delete(r), (t = this.RemoveMarkItem(e, r)) !== undefined)) {
      t.Destroy();
    }
  }
  TrackMapMark(r, t, a, i = false) {
    var s = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, t);
    var M = this.GetMarkItem(r, t);
    if (M || s) {
      let e = 0;
      if (s) {
        e = s.TrackSource;
        s.IconPath = M?.IconPath ?? s.IconPath;
      }
      if (M) {
        e = M.TrackSource;
      }
      s = ModelManager_1.ModelManager.TrackModel.IsTracking(e, t);
      if (i || s !== a) {
        if (a) {
          if (M) {
            i = M.MarkItemEntity.GetComponent(15)?.Config;
            TrackController_1.TrackController.StartTrack({
              TrackSource: M.TrackSource,
              Id: t,
              MarkType: r,
              IconPath: M.IconPath,
              TrackTarget: M.TrackTarget,
              TrackInstanceId: M.RelativeInstanceDungeonId,
              TrackHudEnable: i?.TrackHudEnable === 1,
              TrackAutoCancelDistance: i?.TrackAutoCancelDistance
            });
            this.sUi.add(M);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, M);
          }
        } else {
          TrackController_1.TrackController.EndTrack(e, t);
          if (M) {
            this.aUi.add(M);
            this.sUi.delete(M);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, M);
          }
        }
      } else if (M) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, M);
      }
    }
  }
  TrackMark(e) {
    e = this.GetMarkItem(e.MarkType ?? 0, e.Id);
    if (e && !e.IsTracked) {
      e.LogicUpdate(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation());
    }
    if ((e && e.View) ?? e?.IsTracked) {
      this.sUi.add(e);
    }
  }
  UnTrackMark(e) {
    e = this.GetMarkItem(e.MarkType ?? 0, e.Id);
    if (e) {
      this.sUi.delete(e);
      this.aUi.add(e);
    }
  }
  ClearTrackMark() {
    for (const e of this.sUi) {
      if (e && e.View) {
        this.aUi.add(e);
      }
    }
    this.sUi.clear();
  }
  GetTrackMenuMarkList() {
    const r = [];
    this.GetMarkItemsByType(11, false)?.forEach(e => {
      r.push(e);
    });
    this.GetMarkItemsByType(12, false)?.forEach(e => {
      if (e.IsTracked) {
        r.push(e);
      }
    });
    this.sUi.forEach(e => {
      if (e.IsTracked && !e.IsInConsistentDistrict()) {
        r.push(e);
      }
    });
    return r;
  }
  GetNavigateMarkList() {
    const t = [];
    const a = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    this.GetMarkItemsByType(11, false)?.forEach(e => {
      var r = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(e.InstanceDungeonOrMapConfigId);
      if (a === r) {
        t.push(e);
      }
    });
    this.GetDifferMapMarkItemsByType(11)?.forEach(e => {
      var r = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(e.InstanceDungeonOrMapConfigId);
      if (ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(r ?? e.MapId)) {
        t.push(e);
      }
    });
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    var r = e?.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
    var e = e?.GetDefaultMark(r) ?? 0;
    var r = this.GetMarkItem(12, e);
    if (r && r.IsBtTypeQuest()) {
      t.push(r);
    }
    return t;
  }
  RemoveNeedUpdateMark(e) {
    if (this.hUi.has(e)) {
      this.hUi.delete(e);
    }
  }
  AddCreateMarkTask(e, r, t, a) {
    this.vlh.AddTask({
      Priority: e ? 0 : 1,
      MarkType: r,
      MarkId: t,
      Execute: a
    });
  }
}
exports.MapMarkContainer = MapMarkContainer;
//# sourceMappingURL=MapMarkContainer.js.map