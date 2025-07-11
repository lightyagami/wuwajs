"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallByCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const conditions_js_1 = require("../fb-action/conditions.js");
class CallByCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCallByCondition(t, i) {
    return (i || new CallByCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCallByCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CallByCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  conditions(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new conditions_js_1.Conditions()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  trueActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  trueActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  falseActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  falseActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCallByCondition(t) {
    t.startObject(3);
  }
  static addConditions(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTrueActions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createTrueActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startTrueActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFalseActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createFalseActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startFalseActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCallByCondition(t) {
    return t.endObject();
  }
  static createCallByCondition(t, i, s, n) {
    CallByCondition.startCallByCondition(t);
    CallByCondition.addConditions(t, i);
    CallByCondition.addTrueActions(t, s);
    CallByCondition.addFalseActions(t, n);
    return CallByCondition.endCallByCondition(t);
  }
}
exports.CallByCondition = CallByCondition;
//# sourceMappingURL=call-by-condition.js.map