"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const state_info_js_1 = require("../fb-action/state-info.js");
const union_var_context_js_1 = require("../fb-action/union-var-context.js");
class FlowInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFlowInfo(t, e) {
    return (e || new FlowInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFlowInfo(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FlowInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  objType(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  children(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, e);
    } else {
      return undefined;
    }
  }
  childrenLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  reference(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, e);
    } else {
      return undefined;
    }
  }
  referenceLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  weakReference(t, e) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, e);
    } else {
      return undefined;
    }
  }
  weakReferenceLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  dungeonId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  varContextType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_context_js_1.UnionVarContext.NONE;
    }
  }
  varContext(t) {
    var e = this.bb.__offset(this.bb_pos, 22);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  states(t, e) {
    var s = this.bb.__offset(this.bb_pos, 24);
    if (s) {
      return (e || new state_info_js_1.StateInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  statesLength() {
    var t = this.bb.__offset(this.bb_pos, 24);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFlowInfo(t) {
    t.startObject(11);
  }
  static addObjType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addChildren(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createChildrenVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startChildrenVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addReference(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createReferenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startReferenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addWeakReference(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static createWeakReferenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startWeakReferenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addId(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addName(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addDungeonId(t, e) {
    t.addFieldInt32(6, e, 0);
  }
  static addFolded(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static addVarContextType(t, e) {
    t.addFieldInt8(8, e, union_var_context_js_1.UnionVarContext.NONE);
  }
  static addVarContext(t, e) {
    t.addFieldOffset(9, e, 0);
  }
  static addStates(t, e) {
    t.addFieldOffset(10, e, 0);
  }
  static createStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endFlowInfo(t) {
    return t.endObject();
  }
  static createFlowInfo(t, e, s, i, r, n, o, a, h, c, f, d) {
    FlowInfo.startFlowInfo(t);
    FlowInfo.addObjType(t, e);
    FlowInfo.addChildren(t, s);
    FlowInfo.addReference(t, i);
    FlowInfo.addWeakReference(t, r);
    FlowInfo.addId(t, n);
    FlowInfo.addName(t, o);
    FlowInfo.addDungeonId(t, a);
    FlowInfo.addFolded(t, h);
    FlowInfo.addVarContextType(t, c);
    FlowInfo.addVarContext(t, f);
    FlowInfo.addStates(t, d);
    return FlowInfo.endFlowInfo(t);
  }
}
exports.FlowInfo = FlowInfo;
//# sourceMappingURL=flow-info.js.map