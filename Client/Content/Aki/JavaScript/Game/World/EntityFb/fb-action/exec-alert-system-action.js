"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecAlertSystemAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_alert_system_option_js_1 = require("../fb-action/union-alert-system-option.js");
class ExecAlertSystemAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsExecAlertSystemAction(t, e) {
    return (e || new ExecAlertSystemAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExecAlertSystemAction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ExecAlertSystemAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_alert_system_option_js_1.UnionAlertSystemOption.NONE;
    }
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startExecAlertSystemAction(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(0, e, union_alert_system_option_js_1.UnionAlertSystemOption.NONE);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endExecAlertSystemAction(t) {
    return t.endObject();
  }
  static createExecAlertSystemAction(t, e, s) {
    ExecAlertSystemAction.startExecAlertSystemAction(t);
    ExecAlertSystemAction.addOptionType(t, e);
    ExecAlertSystemAction.addOption(t, s);
    return ExecAlertSystemAction.endExecAlertSystemAction(t);
  }
}
exports.ExecAlertSystemAction = ExecAlertSystemAction;
//# sourceMappingURL=exec-alert-system-action.js.map