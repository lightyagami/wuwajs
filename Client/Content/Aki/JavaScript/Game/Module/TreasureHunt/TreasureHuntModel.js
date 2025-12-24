"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureHuntModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const NEARBY_TRACK_DIST_DEFAULT = 2000;
class TreasureHuntModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.pHl = undefined;
    this.vHl = undefined;
    this.yHl = false;
    this.fHl = 0;
    this.PWl = NEARBY_TRACK_DIST_DEFAULT;
    this.Moc = undefined;
    this.SHl = (e, t) => e.DistSquared - t.DistSquared;
  }
  OnInit() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("TreasureCompassTrackInfo");
    if (e && e.length > 0) {
      this.PWl = e[0];
    }
    return true;
  }
  OnLeaveLevel() {
    this.pHl = undefined;
    this.vHl = undefined;
    this.yHl = false;
    this.fHl = 0;
    return !(this.Moc = undefined);
  }
  IsCompassActive() {
    return this.yHl;
  }
  SetCompassActive(e) {
    var t = e !== this.yHl;
    this.yHl = e;
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateCompassActive, e);
    }
  }
  AddCompassTrack(e) {
    var t;
    var r;
    var s;
    var i;
    var o;
    var a;
    var n;
    this.pHl ||= new Map();
    if (!this.pHl.has(e)) {
      t = (o = EntitySystem_1.EntitySystem.Get(e))?.GetComponent(0)?.GetLocation();
      o = o?.GetComponent(169);
      if (t && o) {
        (n = Vector_1.Vector.Create(0, 0, 0)).FromUeVector(t);
        t = o.ShowRange;
        r = o.CompassNearbyShowRange || this.PWl;
        s = o.CompassNearbyHideRange || this.PWl;
        i = (t + r) * 0.5;
        o = o.CompassDetectVehicleTypes;
        a = !!this.Moc && !!o?.includes(this.Moc);
        n = {
          EntityId: e,
          Location: n,
          Range: t,
          RangeSquared: Math.pow(t, 2),
          NearbyTrackShowRange: r,
          NearbyTrackShowRangeSquared: Math.pow(r, 2),
          NearbyTrackHideRange: s,
          NearbyTrackHideRangeSquared: Math.pow(s, 2),
          HighlightRange: i,
          HighlightRangeSquared: Math.pow(i, 2),
          DetectVehicleTypes: o,
          IsEnableCompassTracking: a
        };
        this.pHl.set(e, n);
        this.vHl = [...this.pHl.values()];
        ControllerHolder_1.ControllerHolder.TreasureHuntController.SetCompassActive(true, 1);
      }
    }
  }
  RemoveCompassTrack(e) {
    if (this.pHl && this.pHl.has(e) && (this.pHl.delete(e), this.vHl = [...this.pHl.values()], this.vHl.length === 0)) {
      ControllerHolder_1.ControllerHolder.TreasureHuntController.SetCompassActive(false, 1);
    }
  }
  IsEnableCompassTrack(e) {
    return e === "Gongduola" || e === "FishingBoat";
  }
  IsInTracking(e) {
    return !!this.pHl?.has(e);
  }
  SetNearbyTrack(e) {
    this.fHl = e;
  }
  ClearNearbyTrack() {
    this.fHl = 0;
  }
  GetTreasureMap() {
    return this.pHl;
  }
  GetTreasureList(e = true) {
    if (this.pHl && this.vHl) {
      var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
      if (t) {
        for (const r of this.vHl) {
          r.DistSquared = Vector_1.Vector.DistSquaredXY(t, r.Location);
          r.IsNearbyTracking = this.fHl === r.EntityId;
        }
        if (e) {
          this.vHl.sort(this.SHl);
        }
        return this.vHl;
      }
    }
  }
  SetDetectVehicleType(e) {
    this.Moc = e;
    if (this.vHl) {
      for (const t of this.vHl) {
        t.IsEnableCompassTracking = !!e && !!t.DetectVehicleTypes?.includes(e);
      }
    }
  }
}
exports.TreasureHuntModel = TreasureHuntModel;
//# sourceMappingURL=TreasureHuntModel.js.map