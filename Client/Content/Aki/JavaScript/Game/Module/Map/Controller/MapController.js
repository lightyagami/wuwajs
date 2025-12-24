"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const AreaAssistant_1 = require("./AreaAssistant");
const MarkAssistant_1 = require("./MarkAssistant");
const TeleportAssistant_1 = require("./TeleportAssistant");
const SCALE_XY = 100;
const SCALE_Z = 1000000;
const PROFILE_KEY = "WorldMapView_CreateNewCustomMarkItem";
const assistantMap = {
  [0]: undefined,
  1: undefined,
  2: undefined
};
class LineTraceSaver {
  constructor() {
    this.uoe = undefined;
  }
  InitTrackInfo() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
  }
  GetMarkPosition(e, t) {
    if (!this.uoe) {
      this.InitTrackInfo();
    }
    let r = undefined;
    this.uoe.SetStartLocation(e * SCALE_XY, t * SCALE_XY, SCALE_Z);
    this.uoe.SetEndLocation(e * SCALE_XY, t * SCALE_XY, -SCALE_Z);
    var a = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    var o = this.uoe.HitResult;
    if (a && o.bBlockingHit) {
      a = o.LocationZ_Array.Get(0);
      a /= SCALE_XY;
      r = Vector_1.Vector.Create(e, t, a);
    }
    return r;
  }
  OnClear() {
    this.uoe = undefined;
  }
}
class MapController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var e = super.OnInit();
    this.NLi = new LineTraceSaver();
    return e;
  }
  static OnClear() {
    this.NLi.OnClear();
    return super.OnClear();
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, MapController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOnlineWorld, MapController.pze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, MapController.Mze);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, MapController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOnlineWorld, MapController.pze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, MapController.Mze);
    super.OnRemoveEvents();
  }
  static RegisterAssistant() {
    this.Assistants.set(0, new MarkAssistant_1.MarkAssistant());
    this.Assistants.set(1, new TeleportAssistant_1.TeleportAssistant());
    this.Assistants.set(2, new AreaAssistant_1.AreaAssistant());
  }
  static cYt(e) {
    if (this.Assistants) {
      return this.Assistants.get(e);
    }
  }
  static OLi() {
    ModelManager_1.ModelManager.TrackModel.ClearTrackData();
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(undefined);
  }
  static async kLi() {
    await this.RequestMapData();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ModelReady);
  }
  static async RequestMapData() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 34, "开始请求地图数据");
    }
    await MapController.cYt(0).RequestTrackInfo();
    await MapController.cYt(1).RequestTeleportData();
    await MapController.cYt(2).RequestUnlockedAreaInfo();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 34, "结束请求地图数据");
    }
  }
  static GetMarkPosition(e, t) {
    return this.NLi.GetMarkPosition(e, t);
  }
  static GetNewCustomMarkPosition(e, t) {
    var r;
    var a;
    var o = MapController.GetMarkPosition(e, t);
    if (!o || (a = (r = ConfigManager_1.ConfigManager.WorldMapConfig.GetCommonIntArray("MarkCollisionRange"))[0], r = r[1], a = o.Z >= a && o.Z <= r, o && !a)) {
      return Vector2D_1.Vector2D.Create(e, -t);
    } else {
      if (!a) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Map", 63, "MapController.GetNewCustomMarkPosition()", ["自定义地图标记不在有效范围 Z轴坐标:", o.Z]);
        }
      }
      return o;
    }
  }
  static RequestMapMarkReplace(e, t) {
    MapController.cYt(0).RequestMapMarkReplace(e, t);
  }
  static RequestCreateCustomMark(e, t, r) {
    MapController.cYt(0).RequestCreateCustomMark(e, t, r);
  }
  static RequestRemoveMapMarks(e, t) {
    var r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    for (const a of t) {
      if (r && r.MarkType === e && r.MarkId === a) {
        ModelManager_1.ModelManager.MapModel.SetCurTrackMark(undefined);
      }
    }
    MapController.cYt(0).RequestRemoveMapMarks(e, t);
  }
  static RequestTrackMapMark(e, t) {
    if (e.TrackMode === undefined) {
      if (e.MarkType === 9 || ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.MarkId) !== undefined) {
        e.TrackMode = 1;
      } else {
        e.TrackMode = 0;
      }
    }
    if (e.Track) {
      this.jpc(e);
      if (e.TrackMode === 1) {
        this.Hpc(e, t);
      } else {
        this.$pc(e, t);
      }
    } else if (e.TrackMode === 1) {
      this.Wpc(e, t);
    } else {
      this.Qpc(e, t);
    }
  }
  static jpc(e) {
    var t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
    if (t !== undefined && (t.MarkType !== e.MarkType || t.MarkId !== e.MarkId)) {
      if (t.TrackMode === 1) {
        this.Wpc(t);
      } else {
        this.Qpc(t);
      }
    }
  }
  static Hpc(e, t) {
    MapController.cYt(0).RequestTrackMapMark(e.MarkType, e.MarkId, t);
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(e);
  }
  static $pc(e, t) {
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(e);
    ModelManager_1.ModelManager.MapModel.SetTrackMark(e.MarkType, e.MarkId, e.Track);
    t?.(0, true);
  }
  static Wpc(e, t) {
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(undefined);
    MapController.cYt(0).RequestCancelTrackMapMark(e.MarkType, e.MarkId, t);
  }
  static Qpc(e, t) {
    ModelManager_1.ModelManager.MapModel.SetCurTrackMark(undefined);
    ModelManager_1.ModelManager.MapModel.SetTrackMark(e.MarkType, e.MarkId, false);
    t?.(0, false);
  }
  static UpdateCustomMapMarkPosition(e, t) {
    MapController.cYt(0).UpdateCustomMapMarkPosition(e, t);
  }
  static RequestTrackEnrichmentArea(e) {
    MapController.cYt(0).RequestTrackEnrichmentArea(e);
  }
  static RequestTeleportToTargetByTemporaryTeleport(e, t) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (r?.Valid && (r = r.Entity.GetComponent(3))) {
      MapController.cYt(0).RequestTeleportToTargetByTemporaryTeleport(e, Rotator_1.Rotator.Create(r.ActorRotationProxy), t);
    }
  }
  static ForceSetMarkVisible(e, t, r) {
    ModelManager_1.ModelManager.MapModel.ForceSetMarkVisible(e, t, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MarkForceVisibleChanged, e, t, r);
  }
  static OpenMapViewAndFocusMark(e, t, r, a = true, o = 1) {
    MapController.cYt(0).OpenMapViewAndFocus(e, t, r, a, o);
  }
}
exports.MapController = MapController;
(_a = MapController).NLi = undefined;
MapController.nye = () => {
  MapController.kLi();
};
MapController.pze = () => {
  _a.OLi();
  MapController.cYt(0).RequestTrackInfo();
};
MapController.Mze = () => {
  _a.OLi();
  MapController.cYt(0).RequestTrackInfo();
}; //# sourceMappingURL=MapController.js.map