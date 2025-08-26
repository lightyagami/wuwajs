"use strict";

var SceneItemNearbyTrackingComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var r = arguments.length;
  var o = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        o = (r < 3 ? s(o) : r > 3 ? s(t, i, o) : s(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemNearbyTrackingComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
let SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent_1 = class SceneItemNearbyTrackingComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Tvn = false;
    this.Lvn = undefined;
    this.Xte = undefined;
    this.E9 = undefined;
    this.Dvn = undefined;
    this.Rvn = undefined;
    this.w1n = e => {
      if (this.Xte) {
        this.Uvn(e);
      }
    };
    this.Avn = () => {
      if (this.Lo?.IsEnbaleWhileHoming && this.Lvn?.Type === "Icon" && this.Lvn.Duration) {
        this.EnableTracking = true;
        if (this.Dvn && TimerSystem_1.TimerSystem.Has(this.Dvn)) {
          TimerSystem_1.TimerSystem.Remove(this.Dvn);
          this.Dvn = undefined;
        }
        this.Dvn = TimerSystem_1.TimerSystem.Delay(() => {
          this.EnableTracking = false;
        }, this.Lvn.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
    };
  }
  get ShowRange() {
    if (this.Lvn?.Type === "AudioPoint") {
      return this.Lvn.FarRadius;
    } else {
      return this.Lvn?.ShowRange;
    }
  }
  get HideRange() {
    if (this.Lvn?.Type === "AudioPoint") {
      return this.Lvn.FarRadius;
    } else {
      return this.Lvn?.HideRange;
    }
  }
  get IconOffset() {
    return this.Rvn;
  }
  get EnableTracking() {
    return this.Tvn;
  }
  set EnableTracking(e) {
    this.Tvn = e;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnUpdateNearbyEnable, e);
    if (!e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveNearbyTrack, this.Entity);
    }
  }
  get IconPath() {
    if (this.Lvn?.Type === "Icon") {
      return this.wYi(this.Lvn.TexturePath);
    }
    if (this.Lvn?.Type === "Compass") {
      var e = this.Lvn.IconTrackingConfig?.TexturePath;
      if (e) {
        return this.wYi(e);
      }
    }
  }
  get TrackType() {
    return this.E9;
  }
  get TrackConfigType() {
    return this.Lvn?.Type ?? "Icon";
  }
  get AudioPointNearRadius() {
    if (this.Lvn?.Type === "AudioPoint") {
      return this.Lvn.NearRadius;
    }
  }
  get AudioPointMiddleRadius() {
    if (this.Lvn?.Type === "AudioPoint") {
      return this.Lvn.MiddleRadius;
    }
  }
  get AudioPointFarRadius() {
    if (this.Lvn?.Type === "AudioPoint") {
      return this.Lvn.FarRadius;
    }
  }
  get CompassNearbyShowRange() {
    if (this.Lvn?.Type === "Compass") {
      return this.Lvn?.IconTrackingConfig?.ShowRange;
    }
  }
  get CompassNearbyHideRange() {
    if (this.Lvn?.Type === "Compass") {
      return this.Lvn?.IconTrackingConfig?.HideRange;
    }
  }
  get CompassDetectVehicleTypes() {
    if (this.Lvn?.Type === "Compass") {
      return this.Lvn?.VehicleTypes;
    }
  }
  OnInitData(e) {
    var e = e.GetParam(SceneItemNearbyTrackingComponent_1)[0];
    var t = this.Entity.GetComponent(0);
    this.Tvn = t.GetTrackingIsEnable();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 31, "[NearbyTracking OnCreate]", ["EntityId", t.GetPbDataId()], ["IsEnableValue", this.Tvn]);
    }
    this.Lo = e;
    this.Lvn = e.TrackingType;
    this.E9 = this.Pvn(this.Lvn);
    return this.E9 !== undefined || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "组件OnCreate失败，追踪类型无法确定", ["EntityId", t.GetPbDataId()]), false);
  }
  OnStart() {
    if (this.Lo?.IsEnableWhileUnlock && !this.Lo?.IsEnable) {
      this.Xte = this.Entity?.GetComponent(197);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.w1n);
    }
    if (this.Lo?.IsEnbaleWhileHoming) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatedItemPosReset, this.Avn);
    }
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.w1n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.w1n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatedItemPosReset, this.Avn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatedItemPosReset, this.Avn);
    }
    if (this.Dvn && TimerSystem_1.TimerSystem.Has(this.Dvn)) {
      TimerSystem_1.TimerSystem.Remove(this.Dvn);
      this.Dvn = undefined;
    }
    if (this.Lvn?.Type === "Compass") {
      ControllerHolder_1.ControllerHolder.TreasureHuntController.RemoveCompassTrack(this.Entity.Id);
    }
    return true;
  }
  Pvn(e) {
    if (e?.Type === "Icon") {
      this.Rvn = Vector_1.Vector.Create(0, 0, 0);
      if (e.UiOffset) {
        this.Rvn.FromConfigVector(e.UiOffset);
      }
      return 0;
    } else if (e?.Type === "AudioPoint") {
      return 1;
    } else if (e?.Type === "Compass") {
      this.Rvn = Vector_1.Vector.Create(0, 0, 0);
      if (e.IconTrackingConfig?.UiOffset) {
        this.Rvn.FromConfigVector(e.IconTrackingConfig.UiOffset);
      }
      return 0;
    } else {
      return undefined;
    }
  }
  wYi(e) {
    e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("ENearbyTrackingTexture." + e);
    if (e) {
      return e.Value;
    }
  }
  Uvn(e) {
    this.EnableTracking = !e;
  }
};
SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(161)], SceneItemNearbyTrackingComponent);
exports.SceneItemNearbyTrackingComponent = SceneItemNearbyTrackingComponent; //# sourceMappingURL=SceneItemNearbyTrackingComponent.js.map