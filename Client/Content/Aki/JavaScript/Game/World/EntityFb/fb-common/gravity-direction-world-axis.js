"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityDirectionWorldAxis = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionWorldAxis {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsGravityDirectionWorldAxis(i, t) {
    return (t || new GravityDirectionWorldAxis()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsGravityDirectionWorldAxis(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new GravityDirectionWorldAxis()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  worldAxis(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startGravityDirectionWorldAxis(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addWorldAxis(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endGravityDirectionWorldAxis(i) {
    return i.endObject();
  }
  static createGravityDirectionWorldAxis(i, t, r) {
    GravityDirectionWorldAxis.startGravityDirectionWorldAxis(i);
    GravityDirectionWorldAxis.addType(i, t);
    GravityDirectionWorldAxis.addWorldAxis(i, r);
    return GravityDirectionWorldAxis.endGravityDirectionWorldAxis(i);
  }
}
exports.GravityDirectionWorldAxis = GravityDirectionWorldAxis;
//# sourceMappingURL=gravity-direction-world-axis.js.map