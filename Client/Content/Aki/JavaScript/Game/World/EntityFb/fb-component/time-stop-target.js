"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeStopTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class TimeStopTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTimeStopTarget(t, i) {
    return (i || new TimeStopTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTimeStopTarget(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TimeStopTarget()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  entityMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startTimeStopTarget(t) {
    t.startObject(2);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntityIdsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt32(e[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addEntityMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endTimeStopTarget(t) {
    return t.endObject();
  }
}
exports.TimeStopTarget = TimeStopTarget;
//# sourceMappingURL=time-stop-target.js.map