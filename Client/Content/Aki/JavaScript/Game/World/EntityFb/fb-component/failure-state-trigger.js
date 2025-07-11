"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailureStateTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const operations_after_entity_group_failure_js_1 = require("../fb-component/operations-after-entity-group-failure.js");
class FailureStateTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFailureStateTrigger(t, i) {
    return (i || new FailureStateTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFailureStateTrigger(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FailureStateTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  failureConditionsType(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  failureConditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  failureConditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  failureConditions(t, i) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + t * 4);
    } else {
      return undefined;
    }
  }
  failureConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  failureOperations(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new operations_after_entity_group_failure_js_1.OperationsAfterEntityGroupFailure()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startFailureStateTrigger(t) {
    t.startObject(3);
  }
  static addFailureConditionsType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createFailureConditionsTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addInt8(r[t]);
    }
    return i.endVector();
  }
  static startFailureConditionsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addFailureConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createFailureConditionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startFailureConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFailureOperations(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endFailureStateTrigger(t) {
    return t.endObject();
  }
}
exports.FailureStateTrigger = FailureStateTrigger;
//# sourceMappingURL=failure-state-trigger.js.map