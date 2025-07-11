"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResTaskTheme = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class RogueResTaskTheme {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleImage() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roleimageLength(), this.roleimage, this);
  }
  get TabNames() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tabnamesLength(), this.tabnamesKey, this.tabnamesValue, this);
  }
  tabnamesKey(t) {
    return this.tabnames(t)?.key();
  }
  tabnamesValue(t) {
    return this.tabnames(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueResTaskTheme(t, e) {
    return (e || new RogueResTaskTheme()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRoleimageAt(t) {
    return this.roleimage(t);
  }
  roleimage(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  roleimageLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleimageArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTabnamesAt(t, e) {
    return this.tabnames(t);
  }
  tabnames(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (e || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tabnamesLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueResTaskTheme = RogueResTaskTheme;
//# sourceMappingURL=RogueResTaskTheme.js.map