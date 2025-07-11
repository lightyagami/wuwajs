"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCatapult = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const catapult_param_js_1 = require("../fb-action/catapult-param.js");
class SuperCatapult {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsSuperCatapult(t, a) {
    return (a || new SuperCatapult()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSuperCatapult(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new SuperCatapult()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  param(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return (t || new catapult_param_js_1.CatapultParam()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  static startSuperCatapult(t) {
    t.startObject(2);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addParam(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static endSuperCatapult(t) {
    return t.endObject();
  }
}
exports.SuperCatapult = SuperCatapult;
//# sourceMappingURL=super-catapult.js.map