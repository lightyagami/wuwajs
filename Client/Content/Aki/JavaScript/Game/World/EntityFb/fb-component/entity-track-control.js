"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityTrackControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_track_control_point_js_1 = require("../fb-component/entity-track-control-point.js");
class EntityTrackControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsEntityTrackControl(t, r) {
    return (r || new EntityTrackControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityTrackControl(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new EntityTrackControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  controlPoints(t, r) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (r || new entity_track_control_point_js_1.EntityTrackControlPoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  controlPointsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityTrackControl(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addEntityId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addControlPoints(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static createControlPointsVector(r, i) {
    r.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      r.addOffset(i[t]);
    }
    return r.endVector();
  }
  static startControlPointsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endEntityTrackControl(t) {
    return t.endObject();
  }
  static createEntityTrackControl(t, r, i, o) {
    EntityTrackControl.startEntityTrackControl(t);
    EntityTrackControl.addType(t, r);
    EntityTrackControl.addEntityId(t, i);
    EntityTrackControl.addControlPoints(t, o);
    return EntityTrackControl.endEntityTrackControl(t);
  }
}
exports.EntityTrackControl = EntityTrackControl;
//# sourceMappingURL=entity-track-control.js.map