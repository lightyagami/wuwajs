"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleEnterPathMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_spline_move_pattern_js_1 = require("../fb-action/union-spline-move-pattern.js");
const vehicle_cruising_params_js_1 = require("../fb-action/vehicle-cruising-params.js");
class VehicleEnterPathMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsVehicleEnterPathMove(t, e) {
    return (e || new VehicleEnterPathMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVehicleEnterPathMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new VehicleEnterPathMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  controlParams(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vehicle_cruising_params_js_1.VehicleCruisingParams()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  patternType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE;
    }
  }
  pattern(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startVehicleEnterPathMove(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addControlParams(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPatternType(t, e) {
    t.addFieldInt8(2, e, union_spline_move_pattern_js_1.UnionSplineMovePattern.NONE);
  }
  static addPattern(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endVehicleEnterPathMove(t) {
    return t.endObject();
  }
}
exports.VehicleEnterPathMove = VehicleEnterPathMove;
//# sourceMappingURL=vehicle-enter-path-move.js.map