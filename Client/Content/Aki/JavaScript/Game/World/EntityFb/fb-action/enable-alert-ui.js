"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableAlertUi = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableAlertUi {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnableAlertUi(t, e) {
    return (e || new EnableAlertUi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableAlertUi(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnableAlertUi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEnableAlertUi(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAreaId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsEnable(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endEnableAlertUi(t) {
    return t.endObject();
  }
  static createEnableAlertUi(t, e, i, r) {
    EnableAlertUi.startEnableAlertUi(t);
    EnableAlertUi.addType(t, e);
    EnableAlertUi.addAreaId(t, i);
    EnableAlertUi.addIsEnable(t, r);
    return EnableAlertUi.endEnableAlertUi(t);
  }
}
exports.EnableAlertUi = EnableAlertUi;
//# sourceMappingURL=enable-alert-ui.js.map