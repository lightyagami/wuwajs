"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMarkExpressController = exports.TrackVision = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapController_1 = require("../../../Map/Controller/MapController");
const MapDefine_1 = require("../../../Map/MapDefine");
const MapUtil_1 = require("../../../Map/MapUtil");
const TrackController_1 = require("../../../Track/TrackController");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil");
const INVALID_MARKID = 0;
class TrackVision {
  constructor() {
    this.VisionOwnerId = 0;
    this.DungeonId = 0;
    this.ConfigIndex = 0;
    this.EntityId = 0;
  }
}
exports.TrackVision = TrackVision;
class TrackMarkExpressController {
  constructor(e) {
    this.Yre = e;
    this.JQt = new Map();
  }
  Clear() {
    for (var [, e] of this.JQt) {
      e.Destroy();
    }
    this.JQt.clear();
  }
  GetNodeTrackMarkCreator(e) {
    return this.JQt.get(e);
  }
  GetAllTrackMarkCreator() {
    return this.JQt;
  }
  EnableTrack(e) {
    for (var [, t] of this.JQt) {
      t.EnableTrack(e);
    }
  }
  CreateMapMarks() {
    for (var [, e] of this.JQt) {
      e.CreateMapMarks();
    }
  }
  UpdateOnNodeStatusChange(e, t, i) {
    var r = t.TrackTarget;
    if (r) {
      switch (i) {
        case Protocol_1.Aki.Protocol.BNs._5n:
          if (t.NodeType !== "ChildQuest" && t.ContainTag(0)) {
            this.pY1(t.NodeId, e, r, e.IsOccupied);
          }
          break;
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
          this.vY1(t.NodeId);
          break;
        case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
          this.yY1(t.NodeId);
      }
    }
  }
  UpdateOnChildQuestNodeStatusChange(e, t, i) {
    var r = e.TrackTarget;
    if (r && (t && (t = this.Yre.IsOccupied, this.pY1(e.NodeId, this.Yre, r, t)), i)) {
      this.vY1(e.NodeId);
    }
  }
  OnBtApplyExpressionOccupation(e) {
    if (!e) {
      for (var [, t] of this.JQt) {
        t.OnExpressOccupied();
      }
    }
  }
  OnBtReleaseExpressionOccupation(e) {
    if (!e) {
      for (var [, t] of this.JQt) {
        t.OnExpressOccupationRelease();
      }
    }
  }
  OnSuspend(e) {
    this.OnBtApplyExpressionOccupation(false);
  }
  OnCancelSuspend() {
    if (!this.Yre.IsOccupied) {
      this.OnBtReleaseExpressionOccupation(false);
    }
  }
  pY1(e, t, i, r) {
    this.SY1(e, t, i).OnNodeStart(r);
  }
  vY1(e) {
    this.GetNodeTrackMarkCreator(e)?.OnNodeEnd();
    this.yY1(e);
  }
  SY1(e, t, i) {
    var r = this.GetNodeTrackMarkCreator(e);
    return r || (r = new NodeTrackMark(t, t.TreeIncId, t.TreeConfigId, e, i), this.JQt.set(e, r), r);
  }
  yY1(e) {
    this.GetNodeTrackMarkCreator(e)?.Destroy();
    this.JQt.delete(e);
  }
}
exports.TrackMarkExpressController = TrackMarkExpressController;
class NodeTrackMark {
  constructor(e, t, i, r, s) {
    this.eXt = e;
    this.$mt = t;
    this.Yut = i;
    this.Jut = r;
    this.MarkRange = 0;
    this.RangeMarkShowDis = 0;
    this.zQt = [];
    this.RDc = undefined;
    this.ZQt = new Map();
    this.tXt = new Map();
    this.iXt = new Map();
    this.oXt = new Map();
    this.rXt = false;
    this.nXt = false;
    this.sXt = (e, t) => {
      if (this.ZQt.size && (e = this.ZQt.get(e))) {
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
        }
        if (!this.eXt?.IsOccupied) {
          if (this.eXt?.IsTracking) {
            e.EntityId = t;
            t = this.hXt(e.DungeonId, e, "CaptureVisions", e.ConfigIndex);
            ModelManager_1.ModelManager.MapModel.SetTrackMark(this.MarkType, t, true);
          }
        }
      }
    };
    this.aXt = e => {
      var t;
      if (this.ZQt.size && (t = this.ZQt.get(e)) && (this.ZQt.delete(e), this.ZQt.size || (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt) || EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt)) || EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt), e = this.oXt.get(t.ConfigIndex), this.iXt.set(t.ConfigIndex, true), e)) {
        this.lXt(e, t.ConfigIndex);
      }
    };
    this.egt = (e, t, i, r, s) => {
      if (t === this.$mt && i === this.Jut) {
        this.tXt.set(r, s);
        if (this.DefaultMapMarkId) {
          if ((i = this.tXt.get(this.DefaultMapMarkId)) !== this.eXt.ContainTag(13)) {
            if (i) {
              this.eXt.AddTag(13);
            } else {
              this.eXt.RemoveTag(13);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RangeTrackStateChanged, t);
          }
        } else {
          this.eXt.RemoveTag(13);
        }
      }
    };
    switch (s.TrackType.Type) {
      case "Locations":
        for (const o of s.TrackType.Locations) {
          this.zQt.push(Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0));
        }
        this.RDc = s.TrackType.GravityDirection;
        break;
      case "Entities":
        for (const n of s.TrackType.EntityIds) {
          this.zQt.push(n);
        }
        break;
      case "CaptureVisions":
        for (const h of s.TrackType.VisionDropEntities) {
          var a = new TrackVision();
          a.VisionOwnerId = h;
          this.zQt.push(a);
        }
    }
    this.MarkRange = s.Range ?? 0;
    this.RangeMarkShowDis = s.ViewRange || s.Range * 1.3;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt);
  }
  get MarkType() {
    return this.eXt.MarkType;
  }
  get TrackSource() {
    return this.eXt.TrackSource;
  }
  get DungeonId() {
    return this.eXt.DungeonId;
  }
  get DefaultMapMarkId() {
    return this.oXt.get(0);
  }
  Destroy() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt);
    }
    this._Xt();
    this.ZQt.clear();
    this.zQt.length = 0;
  }
  OnNodeStart(e) {
    if (!e) {
      this.rXt = true;
      if (this.eXt.MapMarkResident) {
        this.CreateMapMarks();
      }
      if (this.eXt.IsTracking) {
        this.EnableTrack(true);
      }
    }
  }
  OnNodeEnd() {
    this._Xt();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt);
    this.rXt = false;
  }
  OnNodeProgressChanged(i) {
    if (this.zQt.length !== 0 && i) {
      for (let t = 0; t < this.zQt.length; t++) {
        const s = this.zQt[t];
        var r = i.findIndex(e => e === s);
        let e = this.oXt.get(t);
        if (r < 0) {
          this.iXt.delete(t);
          if (this.nXt && !e && (e = this.uXt(s, t), this.eXt.IsTracking)) {
            ModelManager_1.ModelManager.MapModel.SetTrackMark(this.MarkType, e, true);
          }
        } else {
          this.iXt.set(t, true);
          if (e) {
            this.lXt(e, t);
          }
        }
      }
    }
  }
  CreateMapMarks() {
    this.zQt.forEach((e, t) => {
      this.uXt(e, t);
    });
    this.nXt = true;
  }
  EnableTrack(e) {
    if (this.rXt) {
      if (e) {
        this.CreateMapMarks();
        this.CXt(true);
        if (this.eXt?.IsOccupied) {
          this.OnExpressOccupied();
        }
      } else if (this.eXt.MapMarkResident) {
        this.CXt(false);
      } else {
        this._Xt();
      }
    }
  }
  GetWorldMapTrackPositions() {
    if (this.oXt.size !== 0) {
      var e;
      var t = new Map();
      for ([, e] of this.oXt) {
        var i = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e);
        if (i &&= this.vW1(i.InstanceDungeonId ?? 0, i.TrackTarget)) {
          t.set(e, i);
        }
      }
      return t;
    }
  }
  GetDefaultTrackPosition() {
    var e;
    var t = this.Uec();
    if (t) {
      e = t[0];
      t = t[1];
      return this.vW1(e, t);
    }
  }
  GetTrackAreaInfo() {
    var e;
    var t;
    if (this.DefaultMapMarkId !== undefined) {
      return ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(this.DefaultMapMarkId)?.AreaId;
    } else if ((e = this.zQt.findIndex((e, t) => !this.iXt.get(t))) < 0) {
      return undefined;
    } else if (typeof (t = this.zQt[e]) == "number") {
      return this.ynh("Entities", this.DungeonId, e, t);
    } else if (t instanceof Vector_1.Vector) {
      return this.ynh("Locations", this.DungeonId, e, t);
    } else if (t instanceof TrackVision) {
      return this.ynh("CaptureVisions", this.DungeonId, e, t);
    } else {
      return undefined;
    }
  }
  ynh(e, t, i, r) {
    let s = 0;
    switch (e) {
      case "Locations":
        if (i !== undefined && this.eXt?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)) && a.InstSubType === 13 && (a = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestNodeAreaInfo(this.Yut, this.Jut)) && a.length > i) {
          s = a[i];
        }
        break;
      case "Entities":
        var a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
        if (a) {
          s = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r, a.MapConfigId)?.AreaId ?? 0;
        }
        break;
      case "CaptureVisions":
        var o;
        var a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
        if (a) {
          o = r;
          s = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o.EntityId, a.MapConfigId)?.AreaId ?? 0;
        }
    }
    return s;
  }
  OnExpressOccupied() {
    if (this.oXt.size !== 0) {
      for (var [, e] of this.oXt) {
        TrackController_1.TrackController.SetTrackMarkOccupied(this.TrackSource, e, true);
        MapController_1.MapController.ForceSetMarkVisible(this.MarkType, e, false);
      }
    }
  }
  OnExpressOccupationRelease() {
    if (this.rXt) {
      if (this.oXt.size !== 0) {
        for (var [, e] of this.oXt) {
          if (ModelManager_1.ModelManager.TrackModel.IsTracking(this.TrackSource, e)) {
            TrackController_1.TrackController.SetTrackMarkOccupied(this.TrackSource, e, false);
          }
          MapController_1.MapController.ForceSetMarkVisible(this.MarkType, e, true);
        }
      }
    } else {
      this.OnNodeStart(false);
    }
  }
  uXt(e, t) {
    if (!this.iXt.get(t)) {
      e = this.cXt(0, e);
      if (e) {
        var i = e[0];
        var e = e[1];
        var r = this.oXt.get(t);
        if (r) {
          var s = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, r);
          if (this.mXt(s, i, e)) {
            return r;
          }
          this.lXt(s.MarkId, t);
        }
        if (e instanceof Vector_1.Vector) {
          return this.hXt(i, e, "Locations", t);
        }
        if (e instanceof TrackVision) {
          if (r = ModelManager_1.ModelManager.VisionCaptureModel?.GetVisionCapture(e.VisionOwnerId)) {
            e.EntityId = r;
            s = this.hXt(i, e, "CaptureVisions", t);
            this.ZQt.set(e.VisionOwnerId, e);
            if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt)) {
              EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
            }
            return s;
          } else {
            e.DungeonId = i;
            e.ConfigIndex = t;
            this.ZQt.set(e.VisionOwnerId, e);
            if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt)) {
              EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.sXt);
            }
            return;
          }
        }
        r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i);
        if (r) {
          s = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, r.MapConfigId);
          if (s && !s.IsZero()) {
            return this.hXt(i, e, "Entities", t);
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GeneralLogicTree", 18, "追踪实体数据为空，请检查本地配置", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["实体Id", e], ["副本Id", i]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到副本的配置", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["副本Id", i]);
        }
      }
    }
  }
  hXt(e, t, i, r) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "添加追踪标记时，追踪坐标为空，请检查配置", ["行为树Id", this.Yut], ["节点Id", this.Jut]);
      }
      return INVALID_MARKID;
    }
    let s = this.eXt.TaskMarkTableId;
    var a = this.eXt.GetNode(this.Jut);
    if (a?.NodeType === "ChildQuest" && a.CustomTrackIconId) {
      s = a.CustomTrackIconId;
    }
    var a = this.ynh(i, e, r, t);
    var i = this.dXt(t);
    let o = undefined;
    if (typeof i == "number") {
      o = i;
    }
    i = new MapDefine_1.QuestMarkCreateInfo({
      TrackTarget: i,
      MarkConfigId: s,
      MarkType: this.MarkType,
      MarkId: 0,
      TrackSource: this.TrackSource,
      TreeId: this.$mt,
      NodeId: this.Jut,
      AreaId: a,
      EntityConfigId: o,
      Gravity: this.ADc(e),
      MapAndDungeonInfo: {
        DungeonId: e
      }
    });
    a = ModelManager_1.ModelManager.MapModel.CreateMapMark(i);
    this.oXt.set(r, a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "行为树添加追踪标记", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["追踪目标副本Id", e], ["追踪目标", t], ["标记Id", a]);
    }
    return a;
  }
  dXt(e) {
    if (e instanceof TrackVision) {
      return e.EntityId;
    } else {
      return e;
    }
  }
  ADc(e) {
    var t = this.RDc?.Type;
    if (t === "VectorInfo") {
      if (MapUtil_1.MapUtil.IsStandardGravity(this.RDc.Direction.Z ?? 0)) {
        return 1;
      } else {
        return 2;
      }
    } else if (t === "WorldAxis") {
      if (this.RDc.WorldAxis === "NegativeZ") {
        return 1;
      } else {
        return 2;
      }
    } else if (t === "EntityGravity") {
      t = ModelManager_1.ModelManager.MapModel.GetDungeonWorldMapConfigId(e);
      return ConfigManager_1.ConfigManager.WorldMapConfig.GetEntityGravityDirection(t, this.RDc.EntityId);
    } else {
      return undefined;
    }
  }
  _Xt() {
    this.CXt(false);
    for (var [, e] of this.oXt) {
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e);
    }
    this.oXt.clear();
    this.nXt = false;
    this.tXt.clear();
    this.eXt.RemoveTag(13);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RangeTrackStateChanged, this.$mt);
  }
  lXt(e, t) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, e);
    TrackController_1.TrackController.EndTrack(this.TrackSource, e);
    this.oXt.delete(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Quest", 18, "行为树删除追踪标记", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["markId", e]);
    }
  }
  CXt(e) {
    if (e && this.eXt.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst) {
      switch (this.eXt.OnlineType) {
        case "Hang":
        case "Local":
          if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
            return;
          }
      }
    }
    for (var [i, r] of this.oXt) {
      var s = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, r);
      if (s) {
        if (e) {
          i = this.zQt[i];
          i = this.cXt(1, i);
          if (i) {
            let e = undefined;
            let t = false;
            if (this.eXt.TrackViewModel === "Nearest") {
              e = this.Yut;
            }
            var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Yut);
            if (a) {
              t = a.AutoHideTrackMark;
            }
            var a = {
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
            };
            TrackController_1.TrackController.StartTrack(a);
          }
        } else {
          TrackController_1.TrackController.EndTrack(this.TrackSource, r);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "BehaviorTree:创建追踪标记时找不到地图标记数据", ["行为树Id", this.Yut], ["节点Id", this.Jut], ["markId", r]);
      }
    }
  }
  cXt(i, r) {
    if (this.eXt.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
      return [this.DungeonId, r];
    }
    var s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(s);
    if (a) {
      var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.DungeonId);
      if (o) {
        if (s === this.DungeonId) {
          if (a.InstSubType !== 13 && i === 0) {
            if ((n = a.EntranceEntities)?.length) {
              return [n[0].DungeonId, n[0].EntranceEntityId];
            } else {
              return undefined;
            }
          } else {
            return [s, r];
          }
        }
        var n = a.InstSubType;
        var h = o.InstSubType;
        let e = undefined;
        let t = 0;
        switch (n) {
          case 13:
            if (h === 13) {
              e = r;
              t = this.DungeonId;
            } else if ((_ = o.EntranceEntities)?.length) {
              e = _[0].EntranceEntityId;
              t = _[0].DungeonId;
            }
            break;
          case 12:
            if (i === 0) {
              if (h !== 13) {
                var _ = o.EntranceEntities;
                if (!_?.length) {
                  break;
                }
                e = _[0].EntranceEntityId;
                t = _[0].DungeonId;
                break;
              }
              e = r;
              t = this.DungeonId;
            } else if (i === 1) {
              if (!a.ExitEntities?.length) {
                break;
              }
              e = a.ExitEntities[0];
              t = s;
            }
            break;
          default:
            if (i !== 1) {
              if (h === 13) {
                t = this.DungeonId;
                e = r;
              } else {
                _ = o.EntranceEntities;
                if (!_?.length) {
                  break;
                }
                t = _[0].DungeonId;
                e = _[0].EntranceEntityId;
              }
            }
        }
        if (e && t) {
          return [t, e];
        } else {
          return undefined;
        }
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到追踪目标副本的配置", ["行为树Id", this.Yut], ["副本Id", this.DungeonId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到当前副本的配置", ["行为树Id", this.Yut], ["副本Id", s]);
    }
  }
  vW1(t, i) {
    if (i && t) {
      if (i instanceof Vector_1.Vector) {
        return i;
      }
      let e = undefined;
      var r;
      if (i instanceof TrackVision) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i.EntityId);
      } else if (!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))) {
        if (ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(i)) {
          if (r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)) {
            return GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(i, r.MapConfigId);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree：找不到副本的配置", ["行为树Id", this.Yut], ["副本Id", t]);
            }
            return;
          }
        } else {
          return undefined;
        }
      }
      if (e) {
        return ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetEntityPos(e, true);
      } else {
        return undefined;
      }
    }
  }
  Uec() {
    if (this.DefaultMapMarkId !== undefined) {
      var e = ModelManager_1.ModelManager.TrackModel.GetTrackData(this.TrackSource, this.DefaultMapMarkId);
      var t = e?.TrackTarget;
      if (t) {
        return [e?.TrackInstanceId ?? 0, t];
      }
    }
    e = this.zQt.find((e, t) => !this.iXt.get(t));
    if (e) {
      return this.cXt(1, e);
    }
  }
  mXt(e, t, i) {
    return e.MapId === t && (e.TrackTarget instanceof Vector_1.Vector && i instanceof Vector_1.Vector ? e.TrackTarget.Equality(i) : e.TrackTarget === i);
  }
}
//# sourceMappingURL=TrackMarkExpressController.js.map