"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadInfoChangeData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class HeadInfoChangeData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsHeadInfoChangeData(t, a) {
    return (a || new HeadInfoChangeData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHeadInfoChangeData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new HeadInfoChangeData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  conditions(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  tidName(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  icon(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  tidSecondaryName(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startHeadInfoChangeData(t) {
    t.startObject(4);
  }
  static addConditions(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addTidName(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addIcon(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addTidSecondaryName(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static endHeadInfoChangeData(t) {
    return t.endObject();
  }
  static createHeadInfoChangeData(t, a, e, i, n) {
    HeadInfoChangeData.startHeadInfoChangeData(t);
    HeadInfoChangeData.addConditions(t, a);
    HeadInfoChangeData.addTidName(t, e);
    HeadInfoChangeData.addIcon(t, i);
    HeadInfoChangeData.addTidSecondaryName(t, n);
    return HeadInfoChangeData.endHeadInfoChangeData(t);
  }
}
exports.HeadInfoChangeData = HeadInfoChangeData;
//# sourceMappingURL=head-info-change-data.js.map