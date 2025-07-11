"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemChangeAdsorbateState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemChangeAdsorbateState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsItemChangeAdsorbateState(t, e) {
    return (e || new ItemChangeAdsorbateState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsItemChangeAdsorbateState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ItemChangeAdsorbateState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startItemChangeAdsorbateState(t) {
    t.startObject(0);
  }
  static endItemChangeAdsorbateState(t) {
    return t.endObject();
  }
  static createItemChangeAdsorbateState(t) {
    ItemChangeAdsorbateState.startItemChangeAdsorbateState(t);
    return ItemChangeAdsorbateState.endItemChangeAdsorbateState(t);
  }
}
exports.ItemChangeAdsorbateState = ItemChangeAdsorbateState;
//# sourceMappingURL=item-change-adsorbate-state.js.map