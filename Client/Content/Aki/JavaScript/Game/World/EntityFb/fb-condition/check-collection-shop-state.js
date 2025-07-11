"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckCollectionShopState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCollectionShopState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckCollectionShopState(t, e) {
    return (e || new CheckCollectionShopState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckCollectionShopState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckCollectionShopState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  shopType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCheckCollectionShopState(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addShopType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckCollectionShopState(t) {
    return t.endObject();
  }
  static createCheckCollectionShopState(t, e, o) {
    CheckCollectionShopState.startCheckCollectionShopState(t);
    CheckCollectionShopState.addType(t, e);
    CheckCollectionShopState.addShopType(t, o);
    return CheckCollectionShopState.endCheckCollectionShopState(t);
  }
}
exports.CheckCollectionShopState = CheckCollectionShopState;
//# sourceMappingURL=check-collection-shop-state.js.map