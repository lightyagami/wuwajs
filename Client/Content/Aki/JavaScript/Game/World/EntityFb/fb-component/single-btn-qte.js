"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleBtnQte = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const qte_callback_js_1 = require("../fb-component/qte-callback.js");
class SingleBtnQte {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSingleBtnQte(t, e) {
    return (e || new SingleBtnQte()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSingleBtnQte(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SingleBtnQte()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  qteId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  successCallback(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new qte_callback_js_1.QteCallback()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  failureCallback(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new qte_callback_js_1.QteCallback()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startSingleBtnQte(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addQteId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addSuccessCallback(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addFailureCallback(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endSingleBtnQte(t) {
    return t.endObject();
  }
}
exports.SingleBtnQte = SingleBtnQte;
//# sourceMappingURL=single-btn-qte.js.map