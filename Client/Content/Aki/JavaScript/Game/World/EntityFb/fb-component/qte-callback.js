"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QteCallback = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class QteCallback {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsQteCallback(t, e) {
    return (e || new QteCallback()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsQteCallback(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new QteCallback()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actions(t, e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return (e || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  sendSelfEvent(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startQteCallback(t) {
    t.startObject(2);
  }
  static addActions(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createActionsVector(e, a) {
    e.startVector(4, a.length, 4);
    for (let t = a.length - 1; t >= 0; t--) {
      e.addOffset(a[t]);
    }
    return e.endVector();
  }
  static startActionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSendSelfEvent(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endQteCallback(t) {
    return t.endObject();
  }
  static createQteCallback(t, e, a) {
    QteCallback.startQteCallback(t);
    QteCallback.addActions(t, e);
    QteCallback.addSendSelfEvent(t, a);
    return QteCallback.endQteCallback(t);
  }
}
exports.QteCallback = QteCallback;
//# sourceMappingURL=qte-callback.js.map