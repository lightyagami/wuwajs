"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompassTracking = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const icon_near_by_tracking_config_js_1 = require("../fb-component/icon-near-by-tracking-config.js");
class CompassTracking {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsCompassTracking(t, s) {
    return (s || new CompassTracking()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompassTracking(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CompassTracking()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  showRange() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hideRange() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  iconTrackingConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return (t || new icon_near_by_tracking_config_js_1.IconNearByTrackingConfig()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  vehicleTypes(t, s) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + i) + t * 4, s);
    } else {
      return undefined;
    }
  }
  vehicleTypesLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCompassTracking(t) {
    t.startObject(5);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addShowRange(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addHideRange(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addIconTrackingConfig(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static addVehicleTypes(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static createVehicleTypesVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startVehicleTypesVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endCompassTracking(t) {
    return t.endObject();
  }
}
exports.CompassTracking = CompassTracking;
//# sourceMappingURL=compass-tracking.js.map