"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSoaringChallengeResultWithReturn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenSoaringChallengeResultWithReturn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOpenSoaringChallengeResultWithReturn(t, e) {
    return (e || new OpenSoaringChallengeResultWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSoaringChallengeResultWithReturn(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OpenSoaringChallengeResultWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  scoreType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  score(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  rankS() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rankA() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rankB() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  returnVarType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  returnVar(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startOpenSoaringChallengeResultWithReturn(t) {
    t.startObject(8);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addScoreType(t, e) {
    t.addFieldInt8(1, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addScore(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRankS(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addRankA(t, e) {
    t.addFieldInt32(4, e, 0);
  }
  static addRankB(t, e) {
    t.addFieldInt32(5, e, 0);
  }
  static addReturnVarType(t, e) {
    t.addFieldInt8(6, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static endOpenSoaringChallengeResultWithReturn(t) {
    return t.endObject();
  }
  static createOpenSoaringChallengeResultWithReturn(t, e, r, n, i, s, a, h, u) {
    OpenSoaringChallengeResultWithReturn.startOpenSoaringChallengeResultWithReturn(t);
    OpenSoaringChallengeResultWithReturn.addType(t, e);
    OpenSoaringChallengeResultWithReturn.addScoreType(t, r);
    OpenSoaringChallengeResultWithReturn.addScore(t, n);
    OpenSoaringChallengeResultWithReturn.addRankS(t, i);
    OpenSoaringChallengeResultWithReturn.addRankA(t, s);
    OpenSoaringChallengeResultWithReturn.addRankB(t, a);
    OpenSoaringChallengeResultWithReturn.addReturnVarType(t, h);
    OpenSoaringChallengeResultWithReturn.addReturnVar(t, u);
    return OpenSoaringChallengeResultWithReturn.endOpenSoaringChallengeResultWithReturn(t);
  }
}
exports.OpenSoaringChallengeResultWithReturn = OpenSoaringChallengeResultWithReturn;
//# sourceMappingURL=open-soaring-challenge-result-with-return.js.map