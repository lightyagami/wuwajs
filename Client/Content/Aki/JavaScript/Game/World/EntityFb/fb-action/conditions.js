"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Conditions = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_js_1 = require("../fb-action/condition.js");
class Conditions {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsConditions(t, i) {
    return (i || new Conditions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditions(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new Conditions()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  logicOpType(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  conditions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (i || new condition_js_1.Condition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startConditions(t) {
    t.startObject(2);
  }
  static addLogicOpType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addConditions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endConditions(t) {
    return t.endObject();
  }
  static createConditions(t, i, s) {
    Conditions.startConditions(t);
    Conditions.addLogicOpType(t, i);
    Conditions.addConditions(t, s);
    return Conditions.endConditions(t);
  }
}
exports.Conditions = Conditions;
//# sourceMappingURL=conditions.js.map