"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureHuntController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
const TrackController_1 = require("../Track/TrackController");
class TreasureHuntController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.av();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.JD_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.ZD_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveNearbyTrack, this.ZD_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    return true;
  }
  static OnClear() {
    this.av();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.JD_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.ZD_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveNearbyTrack, this.ZD_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    return true;
  }
  static OnLeaveLevel() {
    this.av();
    return true;
  }
  static av() {
    this.gHl = 0;
    this.fHl = 0;
    this.SetCompassActive(false, 1, false);
  }
  static AddCompassTrack(e) {
    if (!ModelManager_1.ModelManager.TreasureHuntModel?.IsInTracking(e)) {
      ModelManager_1.ModelManager.TreasureHuntModel?.AddCompassTrack(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Track", 67, "[TreasureHuntModel]添加追踪信息", ["entityId", e]);
      }
    }
  }
  static RemoveCompassTrack(e) {
    if (ModelManager_1.ModelManager.TreasureHuntModel?.IsInTracking(e) && (ModelManager_1.ModelManager.TreasureHuntModel?.RemoveCompassTrack(e), this.fHl === e && this.ClearNearbyTrack(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Track", 67, "[TreasureHuntModel]移除追踪信息", ["entityId", e]);
    }
  }
  static SetCompassActive(e, t, r = true) {
    var n = this.gHl;
    var a = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.gHl, e, t);
    if ((this.gHl = a) !== n) {
      n = a === 0;
      ModelManager_1.ModelManager.TreasureHuntModel?.SetCompassActive(n);
    }
    if (r && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Track", 67, "[TreasureHuntController]设置指南针显示", ["isVisible", e], ["reason", t], ["state", a]);
    }
  }
  static SetNearbyTrack(e) {
    this.ClearNearbyTrack();
    var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e)?.Entity;
    var r = t?.GetComponent(164);
    if (t && r) {
      t = {
        TrackSource: 3,
        Id: e,
        IconPath: r.IconPath ?? "",
        TrackTarget: ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(t),
        TrackType: r.TrackType,
        Offset: r.IconOffset,
        IsSubTrack: false
      };
      TrackController_1.TrackController.StartTrack(t);
      this.fHl = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Track", 67, "[TreasureHuntController]设置附近追踪", ["entityId", e]);
      }
      ModelManager_1.ModelManager.TreasureHuntModel?.SetNearbyTrack(e);
    }
  }
  static ClearNearbyTrack() {
    if (this.fHl !== 0) {
      TrackController_1.TrackController.EndTrack(3, this.fHl);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Track", 67, "[TreasureHuntController]清理附近追踪", ["entityId", this.fHl]);
      }
      this.fHl = 0;
    }
    ModelManager_1.ModelManager.TreasureHuntModel?.ClearNearbyTrack();
  }
}
exports.TreasureHuntController = TreasureHuntController;
(_a = TreasureHuntController).gHl = 0;
TreasureHuntController.fHl = 0;
TreasureHuntController.JD_ = e => {
  var t;
  if (e && e.Valid && (t = e.GetComponent(164))?.Valid && t.TrackConfigType === "Compass") {
    _a.AddCompassTrack(e.Id);
  }
};
TreasureHuntController.ZD_ = e => {
  var t;
  if (e && e.Valid && (t = e.GetComponent(164))?.Valid && t.TrackConfigType === "Compass") {
    _a.RemoveCompassTrack(e.Id);
  }
};
TreasureHuntController.M6l = e => {
  if (e.IsRolePassenger(true)) {
    ModelManager_1.ModelManager.TreasureHuntModel?.SetDetectVehicleType(e.VehicleType);
  }
};
TreasureHuntController.E6l = e => {
  if (e.IsRolePassenger(true)) {
    ModelManager_1.ModelManager.TreasureHuntModel?.SetDetectVehicleType(undefined);
  }
}; //# sourceMappingURL=TreasureHuntController.js.map