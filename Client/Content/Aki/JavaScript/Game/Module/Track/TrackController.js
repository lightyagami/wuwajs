"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MapDebugger_1 = require("../Map/Mark/Debug/MapDebugger");
class TrackController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.gRo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.fRo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveNearbyTrack, this.fRo);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.gRo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.fRo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveNearbyTrack, this.fRo);
    return true;
  }
  static StartTrack(e, r = true) {
    return !!e && (ModelManager_1.ModelManager.WorldMapModel.EnableDebug ? MapDebugger_1.MapDebugger.PrintTrackDataInfo("追踪控制器.开始追踪:", e) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Track", 63, "开始追踪:", ["追踪类型:", e.TrackSource], ["追踪Id:", e.Id], ["追踪目标:", e.TrackTarget], ["追踪数据:", e]), e.IsSubTrack = r, ModelManager_1.ModelManager.TrackModel.AddTrackData(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, e), true);
  }
  static EndTrack(e, r) {
    var t = ModelManager_1.ModelManager.TrackModel.GetTrackData(e, r);
    return !!t && (ModelManager_1.ModelManager.WorldMapModel.EnableDebug ? MapDebugger_1.MapDebugger.PrintTrackDataInfo("追踪控制器.取消追踪:", t) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Track", 63, "取消追踪:", ["追踪类型:", t.TrackSource], ["追踪Id:", t.Id], ["追踪目标:", t.TrackTarget], ["追踪数据:", t]), ModelManager_1.ModelManager.TrackModel.RemoveTrackData(e, r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnTrackMark, t), true);
  }
  static SetTrackMarkOccupied(e, r, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetTrackMarkOccupied, e, r, t);
  }
  static SetInteractSpotOccupied(e, r, t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetInteractSpotOccupied, e, r, t);
  }
}
(exports.TrackController = TrackController).gRo = r => {
  if (r) {
    var t = r.GetComponent(161);
    if (t?.Valid && t.TrackConfigType !== "Compass") {
      var n = r.GetComponent(1).CreatureData.GetPbEntityInitData();
      var o = (0, IComponent_1.getComponent)(n.ComponentsData, "InteractComponent");
      var e = r.GetComponent(197);
      if (!e || !e.HasTag(1196894179)) {
        let e = 3;
        if (o) {
          e = o.Range / 100;
        }
        TrackController.StartTrack({
          TrackSource: 3,
          Id: r.Id,
          IconPath: t?.IconPath ?? "",
          TrackHideDis: e,
          TrackTarget: ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(r),
          TrackType: t.TrackType,
          Offset: t.IconOffset,
          IsSubTrack: false,
          AreaId: n?.AreaId
        });
      }
    }
  }
};
TrackController.fRo = e => {
  TrackController.EndTrack(3, e.Id);
}; //# sourceMappingURL=TrackController.js.map