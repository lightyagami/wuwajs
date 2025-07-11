"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenFishingItemDeliveryWithReturn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenFishingItemDeliveryWithReturn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsOpenFishingItemDeliveryWithReturn(e, t) {
    return (t || new OpenFishingItemDeliveryWithReturn()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsOpenFishingItemDeliveryWithReturn(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new OpenFishingItemDeliveryWithReturn()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  presetId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  returnVarType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  returnVar(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startOpenFishingItemDeliveryWithReturn(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPresetId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addReturnVarType(e, t) {
    e.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endOpenFishingItemDeliveryWithReturn(e) {
    return e.endObject();
  }
  static createOpenFishingItemDeliveryWithReturn(e, t, i, r, n) {
    OpenFishingItemDeliveryWithReturn.startOpenFishingItemDeliveryWithReturn(e);
    OpenFishingItemDeliveryWithReturn.addType(e, t);
    OpenFishingItemDeliveryWithReturn.addPresetId(e, i);
    OpenFishingItemDeliveryWithReturn.addReturnVarType(e, r);
    OpenFishingItemDeliveryWithReturn.addReturnVar(e, n);
    return OpenFishingItemDeliveryWithReturn.endOpenFishingItemDeliveryWithReturn(e);
  }
}
exports.OpenFishingItemDeliveryWithReturn = OpenFishingItemDeliveryWithReturn;
//# sourceMappingURL=open-fishing-item-delivery-with-return.js.map