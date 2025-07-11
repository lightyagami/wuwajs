"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGetUiConfigSpecialQuest = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemGetUiConfigSpecialQuest {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsItemGetUiConfigSpecialQuest(t, e) {
    return (e || new ItemGetUiConfigSpecialQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsItemGetUiConfigSpecialQuest(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ItemGetUiConfigSpecialQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  showDetail() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startItemGetUiConfigSpecialQuest(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addTitle(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addShowDetail(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endItemGetUiConfigSpecialQuest(t) {
    return t.endObject();
  }
  static createItemGetUiConfigSpecialQuest(t, e, i, s) {
    ItemGetUiConfigSpecialQuest.startItemGetUiConfigSpecialQuest(t);
    ItemGetUiConfigSpecialQuest.addType(t, e);
    ItemGetUiConfigSpecialQuest.addTitle(t, i);
    ItemGetUiConfigSpecialQuest.addShowDetail(t, s);
    return ItemGetUiConfigSpecialQuest.endItemGetUiConfigSpecialQuest(t);
  }
}
exports.ItemGetUiConfigSpecialQuest = ItemGetUiConfigSpecialQuest;
//# sourceMappingURL=item-get-ui-config-special-quest.js.map