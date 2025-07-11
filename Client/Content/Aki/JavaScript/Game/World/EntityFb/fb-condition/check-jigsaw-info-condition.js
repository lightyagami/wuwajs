"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckJigsawInfoCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_check_jigsaw_info_js_1 = require("../fb-condition/union-check-jigsaw-info.js");
class CheckJigsawInfoCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckJigsawInfoCondition(i, t) {
    return (t || new CheckJigsawInfoCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckJigsawInfoCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckJigsawInfoCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  jigsawConditionType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_check_jigsaw_info_js_1.UnionCheckJigsawInfo.NONE;
    }
  }
  jigsawCondition(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCheckJigsawInfoCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addJigsawConditionType(i, t) {
    i.addFieldInt8(1, t, union_check_jigsaw_info_js_1.UnionCheckJigsawInfo.NONE);
  }
  static addJigsawCondition(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckJigsawInfoCondition(i) {
    return i.endObject();
  }
  static createCheckJigsawInfoCondition(i, t, n, o) {
    CheckJigsawInfoCondition.startCheckJigsawInfoCondition(i);
    CheckJigsawInfoCondition.addType(i, t);
    CheckJigsawInfoCondition.addJigsawConditionType(i, n);
    CheckJigsawInfoCondition.addJigsawCondition(i, o);
    return CheckJigsawInfoCondition.endCheckJigsawInfoCondition(i);
  }
}
exports.CheckJigsawInfoCondition = CheckJigsawInfoCondition;
//# sourceMappingURL=check-jigsaw-info-condition.js.map