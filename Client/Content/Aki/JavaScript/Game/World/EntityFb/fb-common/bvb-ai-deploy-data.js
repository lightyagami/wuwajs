"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiDeployData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiDeployData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbAiDeployData(t, a) {
    return (a || new BvbAiDeployData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiDeployData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbAiDeployData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  handCardType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  handCard(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  boardPosType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardPos(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  static startBvbAiDeployData(t) {
    t.startObject(5);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addHandCardType(t, a) {
    t.addFieldInt8(1, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addHandCard(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addBoardPosType(t, a) {
    t.addFieldInt8(3, a, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardPos(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static endBvbAiDeployData(t) {
    return t.endObject();
  }
  static createBvbAiDeployData(t, a, i, e, r, s) {
    BvbAiDeployData.startBvbAiDeployData(t);
    BvbAiDeployData.addType(t, a);
    BvbAiDeployData.addHandCardType(t, i);
    BvbAiDeployData.addHandCard(t, e);
    BvbAiDeployData.addBoardPosType(t, r);
    BvbAiDeployData.addBoardPos(t, s);
    return BvbAiDeployData.endBvbAiDeployData(t);
  }
}
exports.BvbAiDeployData = BvbAiDeployData;
//# sourceMappingURL=bvb-ai-deploy-data.js.map