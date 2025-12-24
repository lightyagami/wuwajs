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
  ClearMarkItems(e, t) {
    if (e) {
      var r = this.rUi.get(e);
      if (r) {
        for (var [, a] of r) {
          this.hUi.delete(a.MarkId);
          a.Destroy(t);
          this.LUi(a);
        }
        r.clear();
      }
      r = this.Mlh.get(e);
      if (r) {
        for (var [, i] of r) {
          i.Destroy(t);
        }
        r.clear();
      }
      this.vlh.CancelMapTaskByType(e);
    } else {
      this.nIl(this.rUi, t);
      this.nIl(this.Mlh, t);
      this.sUi.clear();
      this.rUi.clear();
      this.Mlh.clear();
      this.nUi.clear();
      this.vlh.Dispose();
    }
  }
  AddMarkItem(t, r) {
    var e;
    if (r) {
      if (r.IsTracked && r.MarkType !== 12) {
        e = {
          MarkType: r.MarkType,
          MarkId: r.MarkId,
          Track: true
        };
        if (!ModelManager_1.ModelManager.MapModel.IsEqualToCurTrack(e)) {
          ModelManager_1.ModelManager.MapModel.SetCurTrackMark(e);
        }
        this.sUi.add(r);
      }
      if (r.IsInConsistentDistrict()) {
        MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.AddMarkItem, 被添加到跨地图列表，将不会显示在地图上", ["markType", t], ["markId", r.MarkId], ["MapType", r.MapType], ["InstanceDungeonId", r.InstanceDungeonId], ["MapId", r.MapId]);
        this.Slh(t, r);
      } else {
        let e = this.GetMarkItemsByType(t, false);
        if (!e) {
          e = new Map();
          this.rUi.set(t, e);
        }
        if (e.has(r.MarkId)) {
          if (ModelManager_1.ModelManager.WorldMapModel.EnableDebug) {
            MapLogger_1.MapLogger.ErrorOnce(r.MarkId, 63, "重复添加标记_MarkMgr", ["MarkId", r.MarkId]);
          }
        } else {
          e.set(r.MarkId, r);
          this.TUi(r);
          MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.AddMarkItem", ["markType", t], ["markId", r.MarkId], ["MapType", r.MapType]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddMapMark, r);
        }
      }
    }
  }
  Slh(t, r) {
    if (r) {
      let e = this.GetDifferMapMarkItemsByType(t);
      if (!e) {
        e = new Map();
        this.Mlh.set(t, e);
      }
      e.set(r.MarkId, r);
    }
  }
  RemoveMarkItem(e, t) {
    this.vlh.CancelMapTask(e, t);
    var r = this.GetMarkItemsByType(e);
    if (r && r.size !== 0) {
      var a = r.get(t);
      r.delete(t);
      this.hUi.delete(t);
      if (a) {
        this.LUi(a);
        MapLogger_1.MapLogger.Debug(63, "标记系统->MapMarkContainer.RemoveMarkItem", ["markType", e], ["markId", t]);
        return a;
      }
    }
  }
  nIl(e, t) {
    for (var [, r] of e) {
      for (var [, a] of r) {
        this.hUi.delete(a.MarkId);
        a.Destroy(t);
      }
    }
  }
  TUi(e) {
    var t;
    var r = e.WorldPosition;
    if (r) {
      r = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(r);
      if (t = this.nUi.get(r)) {
        this.DO_(t, e);
      } else {
        t = new Set().add(e);
        this.nUi.set(r, t);
      }
      e.GridId = r;
    }
  }
  DO_(e, t) {
    if (e.has(t)) {
      MapLogger_1.MapLogger.ErrorOnce(t.MarkId, 63, "重复添加标记到格子集合中_MarkMarkContainer", ["MarkId", t.MarkId]);
    } else {
      e.add(t);
    }
  }
  LUi(e) {
    var t = e.GridId;
    var t = this.nUi.get(t);
    if (t) {
      t.delete(e);
    }
  }
  ExistMarkItem(e, t) {
    return this.GetMarkItemPurely(e, t) !== undefined;
  }
  ExistMarkItemTask(e, t) {
    return this.vlh.HasTask(e, t);
  }
  GetMarkItem(e, t) {
    this.vlh.ForceExecuteTask(e, t);
    return this.GetMarkItemPurely(e, t);
  }
  GetMarkItemPurely(e, t) {
    if (e === 0) {
      const a = this.GetMarkItemById(t);
      return a;
    }
    var r = this.GetMarkItemsByType(e);
    if (r) {
      const a = r.get(t);
      return a || this.GetDifferMapMarkItem(e, t);
    }
  }
  GetMarkItemById(a, e = false) {
    var t = e => {
      let t = undefined;
      for (var [, r] of e) {
        if (t = r.get(a)) {
          break;
        }
      }
      return t;
    };
    let r = t(this.GetAllMarkItems());
    if (r === undefined && e) {
      e = this.GetAllDiffMapMarkItems();
      r = t(e);
    }
    return r;
  }
  GetDifferMapMarkItem(e, t) {
    e = this.GetDifferMapMarkItemsByType(e);
    if (e) {
      return e.get(t) || undefined;
    }
  }
  GetMarkItemsByType(e, t = true) {
    var r = this.rUi.get(e);
    if ((!r || r.size <= 0) && t) {
      return this.GetDifferMapMarkItemsByType(e);
    } else {
      return r;
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
    var t = [];
    for (const a of MapUtil_1.MapUtil.GetAroundIndex(e)) {
      var r = this.nUi.get(a);
      if (r) {
        t.push(...r);
      }
    }
    return t;
  }
  UpdateNearbyMarkItem(e, t, r) {
    this.vlh.Flush();
    var a;
    var e = MapUtil_1.MapUtil.ConvertWorldPositionToIndex(e);
    var i = MapUtil_1.MapUtil.GetUpdateAroundIndex(e);
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
      t(a);
      var n = a.GridId;
      if (!this.qDl.has(a.MarkId) && (!a.IsCanShowView || !i.has(n))) {
        this.aUi.add(a);
        this.hUi.delete(a.MarkId);
      }
    }
    for (const k of this.sUi) {
      t(k);
    }
    if (this.aUi.size !== 0) {
      for (const f of this.aUi) {
        if (!f.IsDestroy) {
          r(f);
        }
      }
      this.aUi.clear();
    }
    for (const _ of i) {
      var M = this.nUi.get(_);
      if (M) {
        for (const p of M) {
          t(p);
        }
      }
    }
  }
  GDl() {
    this.qDl.clear();
    for (const r of MarkDefine_1.permanentUpdateTypeSet) {
      var e = this.GetMarkItemsByType(r);
      if (e) {
        for (var [, t] of e) {
          this.hUi.set(t.MarkId, t);
          this.qDl.add(t.MarkId);
        }
      }
    }
  }
  FindNearbyMarkItems(r, e, a) {
    this.vlh.Flush();
    var t = MapUtil_1.MapUtil.GetQueryNearestIndexSet(r.WorldPosition, e);
    const i = [];
    const s = e * e;
    for (const n of t) {
      this.nUi.get(n)?.forEach(e => {
        var t;
        if ((a?.(e) ?? true) && (t = r.MarkType !== 9 && r.MarkType !== 22 || !MathUtils_1.MathUtils.IsNearlyZero(r.WorldPosition.Z) ? Vector_1.Vector.DistSquared(e.WorldPosition, r.WorldPosition) : Vector2D_1.Vector2D.DistSquared(Vector2D_1.Vector2D.Create(e.WorldPosition.X, e.WorldPosition.Y), Vector2D_1.Vector2D.Create(r.WorldPosition.X, r.WorldPosition.Y))) <= s) {
          i.push([e, t]);
        }
      });
    }
    if (i.length > 0) {
      i.sort((e, t) => e[1] - t[1]);
    }
    return i;
  }
  RemoveDynamicMark(e, t) {
    var r = this.GetMarkItem(e, t);
    if (r && (this.TrackMapMark(e, r.MarkId, false), this.hUi.has(t) && this.hUi.delete(t), (r = this.RemoveMarkItem(e, t)) !== undefined)) {
      r.Destroy();
    }
  }
  TrackMapMark(t, r, a, i = false) {
    var s = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, r);
    var n = this.GetMarkItem(t, r);
    if (n || s) {
      let e = 0;
      if (s) {
        e = s.TrackSource;
        s.IconPath = n?.IconPath ?? s.IconPath;
      }
      if (n) {
        e = n.TrackSource;
      }
      s = ModelManager_1.ModelManager.TrackModel.IsTracking(e, r);
      if (i || s !== a) {
        if (a) {
          if (n) {
            let e = n.MarkItemEntity.GetComponent(15)?.Config;
            if (n.MarkType === 40) {
              i = n;
              e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i.ConfigId);
            }
            TrackController_1.TrackController.StartTrack({
              TrackSource: n.TrackSource,
              Id: r,
              MarkType: t,
              IconPath: n.IconPath,
              TrackTarget: n.TrackTarget,
              TrackInstanceId: n.RelativeInstanceDungeonId,
              TrackHudEnable: e?.TrackHudEnable === 1,
              TrackAutoCancelDistance: e?.TrackAutoCancelDistance
            });
            this.sUi.add(n);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, n);
          }
        } else {
          TrackController_1.TrackController.EndTrack(e, r);
          if (n) {
            this.aUi.add(n);
            this.sUi.delete(n);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, n);
          }
        }
      } else if (n) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMarkItemTrackStateChange, n);
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
    const t = [];
    this.GetMarkItemsByType(11, false)?.forEach(e => {
      t.push(e);
    });
    this.GetMarkItemsByType(12, false)?.forEach(e => {
      if (e.IsTracked) {
        t.push(e);
      }
    });
    this.sUi.forEach(e => {
      if (e.IsTracked && !e.IsInConsistentDistrict()) {
        t.push(e);
      }
    });
    return t;
  }
  GetNavigateMarkList() {
    const r = [];
    const a = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    this.GetMarkItemsByType(11, false)?.forEach(e => {
      var t = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(e.InstanceDungeonOrMapConfigId);
      if (a === t) {
        r.push(e);
      }
    });
    this.GetDifferMapMarkItemsByType(11)?.forEach(e => {
      var t = ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(e.InstanceDungeonOrMapConfigId);
      if (ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(t ?? e.MapId)) {
        r.push(e);
      }
    });
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    var t = e?.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
    var e = e?.GetDefaultMark(t) ?? 0;
    var t = this.GetMarkItem(12, e);
    if (t && t.IsBtTypeQuest()) {
      r.push(t);
    }
    return r;
  }
  RemoveNeedUpdateMark(e) {
    if (this.hUi.has(e)) {
      this.hUi.delete(e);
    }
  }
  AddCreateMarkTask(e, t, r, a) {
    this.vlh.AddTask({
      Priority: e ? 0 : 1,
      MarkType: t,
      MarkId: r,
      Execute: a
    });
  }
}
exports.MapMarkContainer = MapMarkContainer;
//# sourceMappingURL=MapMarkContainer.js.map