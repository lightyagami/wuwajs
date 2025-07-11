"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbAiGetBestDeployData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class BvbAiGetBestDeployData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBvbAiGetBestDeployData(t, e) {
    return (e || new BvbAiGetBestDeployData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbAiGetBestDeployData(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BvbAiGetBestDeployData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  handCardStoredType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  handCardStored(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  boardPosStoredType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  boardPosStored(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startBvbAiGetBestDeployData(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addHandCardStoredType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addHandCardStored(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBoardPosStoredType(t, e) {
    t.addFieldInt8(3, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addBoardPosStored(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endBvbAiGetBestDeployData(t) {
    return t.endObject();
  }
  static createBvbAiGetBestDeployData(t, e, a, s, i, r) {
    BvbAiGetBestDeployData.startBvbAiGetBestDeployData(t);
    BvbAiGetBestDeployData.addType(t, e);
    BvbAiGetBestDeployData.addHandCardStoredType(t, a);
    BvbAiGetBestDeployData.addHandCardStored(t, s);
    BvbAiGetBestDeployData.addBoardPosStoredType(t, i);
    BvbAiGetBestDeployData.addBoardPosStored(t, r);
    return BvbAiGetBestDeployData.endBvbAiGetBestDeployData(t);
  }
}
exports.BvbAiGetBestDeployData = BvbAiGetBestDeployData;
//# sourceMappingURL=bvb-ai-get-best-deploy-data.js.map