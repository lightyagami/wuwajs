"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_action_params0_js_1 = require("../fb-action/union-action-params0.js");
const union_action_params1_js_1 = require("../fb-action/union-action-params1.js");
class ActionInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsActionInfo(t, i) {
    return (i || new ActionInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActionInfo(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ActionInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  async() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  paramsExtActionPage() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  paramsExtType0() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  params0Type() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_action_params0_js_1.UnionActionParams0.NONE;
    }
  }
  params0(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  paramsExtType1() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  params1Type() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_action_params1_js_1.UnionActionParams1.NONE;
    }
  }
  params1(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  actionId() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actionGuid(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  timeout() {
    var t = this.bb.__offset(this.bb_pos, 28);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startActionInfo(t) {
    t.startObject(13);
  }
  static addName(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAsync(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addParamsExtActionPage(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addParamsExtType0(t, i) {
    t.addFieldInt8(3, i, 0);
  }
  static addParams0Type(t, i) {
    t.addFieldInt8(4, i, union_action_params0_js_1.UnionActionParams0.NONE);
  }
  static addParams0(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addParamsExtType1(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static addParams1Type(t, i) {
    t.addFieldInt8(7, i, union_action_params1_js_1.UnionActionParams1.NONE);
  }
  static addParams1(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addActionId(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addActionGuid(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addTimeout(t, i) {
    t.addFieldInt32(12, i, 0);
  }
  static endActionInfo(t) {
    return t.endObject();
  }
  static createActionInfo(t, i, s, a, n, o, r, c, e, h, d, u, f, A) {
    ActionInfo.startActionInfo(t);
    ActionInfo.addName(t, i);
    ActionInfo.addAsync(t, s);
    ActionInfo.addParamsExtActionPage(t, a);
    ActionInfo.addParamsExtType0(t, n);
    ActionInfo.addParams0Type(t, o);
    ActionInfo.addParams0(t, r);
    ActionInfo.addParamsExtType1(t, c);
    ActionInfo.addParams1Type(t, e);
    ActionInfo.addParams1(t, h);
    ActionInfo.addActionId(t, d);
    ActionInfo.addDisabled(t, u);
    ActionInfo.addActionGuid(t, f);
    ActionInfo.addTimeout(t, A);
    return ActionInfo.endActionInfo(t);
  }
}
exports.ActionInfo = ActionInfo;
//# sourceMappingURL=action-info.js.map