"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TrackMarkExpressController = exports.TrackVision = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MapDefine_1 = require("../../../Map/MapDefine"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  TrackController_1 = require("../../../Track/TrackController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  INVALID_MARKID = 0;
class TrackVision {
  constructor() {
    this.VisionOwnerId = 0, this.DungeonId = 0, this.ConfigIndex = 0, this.EntityId = 0
  }
}
exports.TrackVision = TrackVision;
class TrackMarkExpressController {
  constructor(e) {
    this.Yre = e, this.JQt = new Map
  }
  Clear() {
    for (var [, e] of this.JQt) e.Destroy();
    this.JQt.clear()
  }
  GetNodeTrackMarkCreator(e) {
    return this.JQt.get(e)
  }
  GetAllTrackMarkCreator() {
    return this.JQt
  }
  EnableTrack(e) {
    for (var [, t] of this.JQt) t.EnableTrack(e)
  }
  CreateMapMarks() {
    for (var [, e] of this.JQt) e.CreateMapMarks()
  }
  UpdateOnNodeStatusChange(e, t, i) {
    var r = t.TrackTarget;
    if (r) switch (i) {
      case Protocol_1.Aki.Protocol.BNs._5n:
        "ChildQuest" !== t.NodeType && t.ContainTag(0) && this.uX1(t.NodeId, e, r, e.IsOccupied);
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
      case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
        this.cX1(t.NodeId);
        break;
      case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
        this.dX1(t.NodeId)
    }
  }
  UpdateOnChildQuestNodeStatusChange(e, t, i) {
    var r = e.TrackTarget;
    r && (t && (t = this.Yre.IsOccupied, this.uX1(e.NodeId, this.Yre, r, t)), i) && this.cX1(e.NodeId)
  }
  OnBtApplyExpressionOccupation(e) {
    if (!e)
      for (var [, t] of this.JQt) t.OnExpressOccupied()
  }
  OnBtReleaseExpressionOccupation(e) {
    if (!e)
      for (var [, t] of this.JQt) t.OnExpressOccupationRelease()
  }
  OnSuspend(e) {
    this.OnBtApplyExpressionOccupation(!1)
  }
  OnCancelSuspend() {
    this.Yre.IsOccupied || this.OnBtReleaseExpressionOccupation(!1)
  }
  uX1(e, t, i, r) {
    this.mX1(e, t, i).OnNodeStart(r)
  }
  cX1(e) {
    this.GetNodeTrackMarkCreator(e)?.OnNodeEnd(), this.dX1(e)
  }
  mX1(e, t, i) {
    var r = this.GetNodeTrackMarkCreator(e);
    return r || (r = new NodeTrackMark(t, t.TreeIncId, t.TreeConfigId, e, i), this.JQt.set(e, r), r)
  }
  dX1(e) {
    this.GetNodeTrackMarkCreator(e)?.Destroy(), this.JQt.delete(e)
  }
}
exports.TrackMarkExpressController = TrackMarkExpressController;
class NodeTrackMark {
  constructor(e, t, i, r, s) {
    switch (this.eXt = e, this.$mt = t, this.Yut = i, this.Jut = r, this.MarkRange = 0, this.RangeMarkShowDis = 0, this.zQt = [], this.RDc = void 0, this.ZQt = new Map, this.tXt = new Map, this.iXt = new Map, this.oXt = new Map, this.rXt = !1, this.nXt = !1, this.sXt = (e, t) => {
        this.ZQt.size && (e = this.ZQt.get(e)) && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt), this.eXt?.IsOccupied || this.eXt?.IsTracking && (e.EntityId = t, t = this.hXt(e.DungeonId, e, "CaptureVisions", e.ConfigIndex), ModelManager_1.ModelManager.MapModel.SetTrackMark(this.MarkType, t, !0)))
      }, this.aXt = e => {
        var t;
        this.ZQt.size && (t = this.ZQt.get(e)) && (this.ZQt.delete(e), this.ZQt.size || (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt) || EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt)) || EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt), e = this.oXt.get(t.ConfigIndex), this.iXt.set(t.ConfigIndex, !0), e) && this.lXt(e, t.ConfigIndex)
      }, this.egt = (e, t, i, r, s) => {
        t === this.$mt && i === this.Jut && (this.tXt.set(r, s), this.DefaultMapMarkId ? (i = this.tXt.get(this.DefaultMapMarkId)) !== this.eXt.ContainTag(13) && (i ? this.eXt.AddTag(13) : this.eXt.RemoveTag(13), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RangeTrackStateChanged, t)) : this.eXt.RemoveTag(13))
      }, s.TrackType.Type) {
      case "Locations":
        for (const n of s.TrackType.Locations) this.zQt.push(Vector_1.Vector.Create(n.X ?? 0, n.Y ?? 0, n.Z ?? 0));
        this.RDc = s.TrackType.GravityDirection;
        break;
      case "Entities":
        for (const o of s.TrackType.EntityIds) this.zQt.push(o);
        break;
      case "CaptureVisions":
        for (const h of s.TrackType.VisionDropEntities) {
          var a = new TrackVision;
          a.VisionOwnerId = h, this.zQt.push(a)
        }
    }
    this.MarkRange = s.Range ?? 0, this.RangeMarkShowDis = s.ViewRange || 1.3 * s.Range, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt)
  }
  get MarkType() {
    return this.eXt.MarkType
  }
  get TrackSource() {
    return this.eXt.TrackSource
  }
  get DungeonId() {
    return this.eXt.DungeonId
  }
  get DefaultMapMarkId() {
    return this.oXt.get(0)
  }
  Destroy() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt), this._Xt(), this.ZQt.clear(), this.zQt.length = 0
  }
  OnNodeStart(e) {
    e || (this.rXt = !0, this.eXt.MapMarkResident && this.CreateMapMarks(), this.eXt.IsTracking && this.EnableTrack(!0))
  }
  OnNodeEnd() {
    this._Xt(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt), this.rXt = !1
  }
  OnNodeProgressChanged(i) {
    if (0 !== this.zQt.length && i)
      for (let t = 0; t < this.zQt.length; t++) {
        const s = this.zQt[t];
        var r = i.findIndex(e => e === s);
        let e = this.oXt.get(t);
        r < 0 ? (this.iXt.delete(t), this.nXt && !e && (e = this.uXt(s, t), this.eXt.IsTracking) && ModelManager_1.ModelManager.MapModel.SetTrackMark(this.MarkType, e, !0)) : (this.iXt.set(t, !0), e && this.lXt(e, t))
      }
  }
  CreateMapMarks() {
    this.zQt.forEach((e, t) => {
      this.uXt(e, t)
    }), this.nXt = !0
  }
  EnableTrack(e) {
    this.rXt && (e ? (this.CreateMapMarks(), this.CXt(!0), this.eXt?.IsOccupied && this.OnExpressOccupied()) : this.eXt.MapMarkResident ? this.CXt(!1) : this._Xt())
  }
  GetWorldMapTrackPositions() {
    if (0 !== this.oXt.size) {
      var e, t = new Map;
      for ([, e] of this.oXt) {
        var i = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
        i && (i = this.k$1(i.InstanceDungeonId ?? 0, i.TrackTarget)) && t.set(e, i)
      }
      return t
    }
  }
  GetDefaultTrackPosition() {
    var e, t = this.Uec();
    if (t) return e = t[0], t = t[1], this.k$1(e, t)
  }
  GetTrackAreaInfo() {
    var e = this.Uec();
    if (e) {
      var t = e[0],
        e = e[1];
      if ("number" == typeof e) return ModelManager_1.ModelManager.CreatureModel.GetEntityData(e, t ?? this.DungeonId)?.AreaId;
      if (e instanceof Vector_1.Vector) {
        t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeAreaInfo(this.Yut, this.Jut);
        if (t && 0 !== t.length) return t[0]
      }
    }
  }
  OnExpressOccupied() {
    if (0 !== this.oXt.size)
      for (var [, e] of this.oXt) TrackController_1.TrackController.SetTrackMarkOccupied(this.TrackSource, e, !0), MapController_1.MapController.ForceSetMarkVisible(this.MarkType, e, !1)
  }
  OnExpressOccupationRelease() {
    if (this.rXt) {
      if (0 !== this.oXt.size)
        for (var [, e] of this.oXt) ModelManager_1.ModelManager.TrackModel.IsTracking(this.TrackSource, e) && TrackController_1.TrackController.SetTrackMarkOccupied(this.TrackSource, e, !1), MapController_1.MapController.ForceSetMarkVisible(this.MarkType, e, !0)
    } else this.OnNodeStart(!1)
  }
  uXt(e, t) {
    if (!this.iXt.get(t)) {
      e = this.cXt(0, e);
      if (e) {
        var i = e[0],
          e = e[1],
          r = this.oXt.get(t);
        if (r) {
          var s = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, r);
          if (this.mXt(s, i, e)) return r;
          this.lXt(s.MarkId, t)
        }
        if (e instanceof Vector_1.Vector) return this.hXt(i, e, "Locations", t);
        if (e instanceof TrackVision) return (r = ModelManager_1.ModelManager.VisionCaptureModel?.GetVisionCapture(e.VisionOwnerId)) ? (e.EntityId = r, s = this.hXt(i, e, "CaptureVisions", t), this.ZQt.set(e.VisionOwnerId, e), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt), s) : (e.DungeonId = i, e.ConfigIndex = t, this.ZQt.set(e.VisionOwnerId, e), void(EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt)));
        r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i);
        if (r) {
          s = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId);
          if (s && !s.IsZero()) return this.hXt(i, e, "Entities", t);
          Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "追踪实体数据为空，请检查本地配置", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["实体Id", e], ["副本Id", i])
        } else Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到副本的配置", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["副本Id", i])
      }
    }
  }
  hXt(e, t, i, r) {
    if (!t) return Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "添加追踪标记时，追踪坐标为空，请检查配置", ["行为树Id", this.Yut], ["节点Id", this.Jut]), INVALID_MARKID;
    let s = this.eXt.TaskMarkTableId;
    var a = this.eXt.GetNode(this.Jut);
    "ChildQuest" === a?.NodeType && a.CustomTrackIconId && (s = a.CustomTrackIconId);
    let n = 0;
    switch (i) {
      case "Locations":
        void 0 !== r && this.eXt?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && 13 === o.InstSubType && (o = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeAreaInfo(this.Yut, this.Jut)) && o.length > r && (n = o[r]);
        break;
      case "Entities":
        var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
        o && (n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t, o.MapConfigId)?.AreaId ?? 0);
        break;
      case "CaptureVisions":
        var h, o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
        o && (h = t, n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(h.EntityId, o.MapConfigId)?.AreaId ?? 0)
    }
    a = this.dXt(t);
    let _ = void 0;
    "number" == typeof a && (_ = a);
    i = new MapDefine_1.QuestMarkCreateInfo({
      TrackTarget: a,
      MarkConfigId: s,
      MarkType: this.MarkType,
      MarkId: 0,
      TrackSource: this.TrackSource,
      TreeId: this.$mt,
      NodeId: this.Jut,
      AreaId: n,
      EntityConfigId: _,
      Gravity: this.ADc(e),
      MapAndDungeonInfo: {
        DungeonId: e
      }
    }), a = ModelManager_1.ModelManager.MapModel.CreateMapMark(i);
    return this.oXt.set(r, a), Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "行为树添加追踪标记", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["追踪目标副本Id", e], ["追踪目标", t], ["标记Id", a]), a
  }
  dXt(e) {
    return e instanceof TrackVision ? e.EntityId : e
  }
  ADc(e) {
    var t = this.RDc?.Type;
    return "VectorInfo" === t ? MapUtil_1.MapUtil.IsStandardGravity(this.RDc.Direction.Z ?? 0) ? 1 : 2 : "WorldAxis" === t ? "NegativeZ" === this.RDc.WorldAxis ? 1 : 2 : "EntityGravity" === t ? (t = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(e), ConfigManager_1.ConfigManager.WorldMapConfig.GetEntityGravityDirection(t, this.RDc.EntityId)) : void 0
  }
  _Xt() {
    this.CXt(!1);
    for (var [, e] of this.oXt) ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e);
    this.oXt.clear(), this.nXt = !1, this.tXt.clear(), this.eXt.RemoveTag(13), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RangeTrackStateChanged, this.$mt)
  }
  lXt(e, t) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e), TrackController_1.TrackController.EndTrack(this.TrackSource, e), this.oXt.delete(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "行为树删除追踪标记", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["markId", e])
  }
  CXt(e) {
    if (e && this.eXt.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst) switch (this.eXt.OnlineType) {
      case "Hang":
      case "Local":
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) return
    }
    for (var [i, r] of this.oXt) {
      var s = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, r);
      if (s)
        if (e) {
          i = this.zQt[i], i = this.cXt(1, i);
          if (i) {
            let e = void 0,
              t = !1;
            "Nearest" === this.eXt.TrackViewModel && (e = this.Yut);
            var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Yut),
              a = (a && (t = a.AutoHideTrackMark), {
                TrackSource: this.TrackSource,
                Id: r,
                MarkType: this.MarkType,
                IconPath: ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(s.MarkConfigId).MarkPic,
                TrackTarget: this.dXt(i[1]),
                TrackInstanceId: i[0],
                ShowGroupId: e,
                AutoHideTrack: t,
                IsInTrackRange: this.eXt.ContainTag(13),
                IsSubTrack: this.eXt.IsNeedScaledTrackMark(this.Jut)
              });
            TrackController_1.TrackController.StartTrack(a)
          }
        } else TrackController_1.TrackController.EndTrack(this.TrackSource, r);
      else Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "BehaviorTree:创建追踪标记时找不到地图标记数据", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["markId", r])
    }
  }
  cXt(i, r) {
    if (this.eXt.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) return [this.DungeonId, r];
    var s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(s);
    if (a) {
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.DungeonId);
      if (n) {
        if (s === this.DungeonId) return 13 !== a.InstSubType && 0 === i ? (o = a.EntranceEntities)?.length ? [o[0].DungeonId, o[0].EntranceEntityId] : void 0 : [s, r];
        var o = a.InstSubType,
          h = n.InstSubType;
        let e = void 0,
          t = 0;
        switch (o) {
          case 13:
            13 === h ? (e = r, t = this.DungeonId) : (_ = n.EntranceEntities)?.length && (e = _[0].EntranceEntityId, t = _[0].DungeonId);
            break;
          case 12:
            if (0 === i) {
              if (13 !== h) {
                var _ = n.EntranceEntities;
                if (!_?.length) break;
                e = _[0].EntranceEntityId, t = _[0].DungeonId;
                break
              }
              e = r, t = this.DungeonId
            } else if (1 === i) {
              if (!a.ExitEntities?.length) break;
              e = a.ExitEntities[0], t = s
            }
            break;
          default:
            if (1 !== i)
              if (13 === h) t = this.DungeonId, e = r;
              else {
                _ = n.EntranceEntities;
                if (!_?.length) break;
                t = _[0].DungeonId, e = _[0].EntranceEntityId
              }
        }
        return e && t ? [t, e] : void 0
      }
      Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到追踪目标副本的配置", ["行为树Id", this.Yut], ["副本Id", this.DungeonId])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到当前副本的配置", ["行为树Id", this.Yut], ["副本Id", s])
  }
  k$1(t, i) {
    if (i && t) {
      if (i instanceof Vector_1.Vector) return i;
      let e = void 0;
      if (i instanceof TrackVision) e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i.EntityId);
      else if (!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))) return ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(i) ? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(i, t) : void 0;
      return e ? ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetEntityPos(e, !0) : void 0
    }
  }
  Uec() {
    if (void 0 !== this.DefaultMapMarkId) {
      var e = ModelManager_1.ModelManager.TrackModel.GetTrackData(this.TrackSource, this.DefaultMapMarkId),
        t = e?.TrackTarget;
      if (t) return [e?.TrackInstanceId ?? 0, t]
    }
    e = this.zQt.find((e, t) => !this.iXt.get(t));
    if (e) return this.cXt(1, e)
  }
  mXt(e, t, i) {
    return e.MapId === t && (e.TrackTarget instanceof Vector_1.Vector && i instanceof Vector_1.Vector ? e.TrackTarget.Equality(i) : e.TrackTarget === i)
  }
}
//# sourceMappingURL=TrackMarkExpressController.js.map