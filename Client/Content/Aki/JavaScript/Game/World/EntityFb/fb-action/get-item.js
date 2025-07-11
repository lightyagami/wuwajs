"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const item_data_js_1 = require("../fb-action/item-data.js");
const union_item_get_ui_config_js_1 = require("../fb-action/union-item-get-ui-config.js");
class GetItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsGetItem(t, e) {
    return (e || new GetItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGetItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new GetItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  items(t, e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (e || new item_data_js_1.ItemData()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  itemsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  uiType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  uiConfigType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_item_get_ui_config_js_1.UnionItemGetUiConfig.NONE;
    }
  }
  uiConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startGetItem(t) {
    t.startObject(4);
  }
  static addItems(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createItemsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startItemsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addUiType(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static addUiConfigType(t, e) {
    t.addFieldInt8(2, e, union_item_get_ui_config_js_1.UnionItemGetUiConfig.NONE);
  }
  static addUiConfig(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endGetItem(t) {
    return t.endObject();
  }
  static createGetItem(t, e, i, s, r) {
    GetItem.startGetItem(t);
    GetItem.addItems(t, e);
    GetItem.addUiType(t, i);
    GetItem.addUiConfigType(t, s);
    GetItem.addUiConfig(t, r);
    return GetItem.endGetItem(t);
  }
}
exports.GetItem = GetItem;
//# sourceMappingURL=get-item.js.map