"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetAlertUiVisible = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetAlertUiVisible {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSetAlertUiVisible(t, i) {
    return (i || new SetAlertUiVisible()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetAlertUiVisible(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SetAlertUiVisible()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isVisible() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetAlertUiVisible(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addAreaId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsVisible(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endSetAlertUiVisible(t) {
    return t.endObject();
  }
  static createSetAlertUiVisible(t, i, e, s) {
    SetAlertUiVisible.startSetAlertUiVisible(t);
    SetAlertUiVisible.addType(t, i);
    SetAlertUiVisible.addAreaId(t, e);
    SetAlertUiVisible.addIsVisible(t, s);
    return SetAlertUiVisible.endSetAlertUiVisible(t);
  }
}
exports.SetAlertUiVisible = SetAlertUiVisible;
//# sourceMappingURL=set-alert-ui-visible.js.map