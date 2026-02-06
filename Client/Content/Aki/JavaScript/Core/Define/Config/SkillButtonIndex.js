"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonIndex = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
const GameplayTagArray_1 = require("./SubType/GameplayTagArray");
const IntArray_1 = require("./SubType/IntArray");
class SkillButtonIndex {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DesktopButtonTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.desktopbuttontypelistLength(), this.desktopbuttontypelist, this);
  }
  get PadButtonTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.padbuttontypelistLength(), this.padbuttontypelist, this);
  }
  get TagList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taglistLength(), this.taglist, this);
  }
  get TagDesktopButtonTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagdesktopbuttontypelistLength(), this.tagdesktopbuttontypelist, this);
  }
  get TagPadButtonTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tagpadbuttontypelistLength(), this.tagpadbuttontypelist, this);
  }
  get DesktopButtonTypeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.desktopbuttontypemapLength(), this.desktopbuttontypemapKey, this.desktopbuttontypemapValue, this);
  }
  desktopbuttontypemapKey(t) {
    return this.desktopbuttontypemap(t)?.key();
  }
  desktopbuttontypemapValue(t) {
    return this.desktopbuttontypemap(t)?.value();
  }
  get PadButtonTypeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.padbuttontypemapLength(), this.padbuttontypemapKey, this.padbuttontypemapValue, this);
  }
  padbuttontypemapKey(t) {
    return this.padbuttontypemap(t)?.key();
  }
  padbuttontypemapValue(t) {
    return this.padbuttontypemap(t)?.value();
  }
  get GamepadButtonTypeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.gamepadbuttontypemapLength(), this.gamepadbuttontypemapKey, this.gamepadbuttontypemapValue, this);
  }
  gamepadbuttontypemapKey(t) {
    return this.gamepadbuttontypemap(t)?.key();
  }
  gamepadbuttontypemapValue(t) {
    return this.gamepadbuttontypemap(t)?.value();
  }
  get MotorPadButtonTypeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.motorpadbuttontypemapLength(), this.motorpadbuttontypemapKey, this.motorpadbuttontypemapValue, this);
  }
  motorpadbuttontypemapKey(t) {
    return this.motorpadbuttontypemap(t)?.key();
  }
  motorpadbuttontypemapValue(t) {
    return this.motorpadbuttontypemap(t)?.value();
  }
  get MotorJoystickPadButtonTypeMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.motorjoystickpadbuttontypemapLength(), this.motorjoystickpadbuttontypemapKey, this.motorjoystickpadbuttontypemapValue, this);
  }
  motorjoystickpadbuttontypemapKey(t) {
    return this.motorjoystickpadbuttontypemap(t)?.key();
  }
  motorjoystickpadbuttontypemapValue(t) {
    return this.motorjoystickpadbuttontypemap(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSkillButtonIndex(t, s) {
    return (s || new SkillButtonIndex()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDesktopbuttontypelistAt(t) {
    return this.desktopbuttontypelist(t);
  }
  desktopbuttontypelist(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  desktopbuttontypelistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  desktopbuttontypelistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPadbuttontypelistAt(t) {
    return this.padbuttontypelist(t);
  }
  padbuttontypelist(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  padbuttontypelistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  padbuttontypelistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTaglistAt(t, s) {
    return this.taglist(t);
  }
  taglist(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (s || new GameplayTagArray_1.GameplayTagArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  taglistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTagdesktopbuttontypelistAt(t, s) {
    return this.tagdesktopbuttontypelist(t);
  }
  tagdesktopbuttontypelist(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tagdesktopbuttontypelistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTagpadbuttontypelistAt(t, s) {
    return this.tagpadbuttontypelist(t);
  }
  tagpadbuttontypelist(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tagpadbuttontypelistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDesktopbuttontypemapAt(t, s) {
    return this.desktopbuttontypemap(t);
  }
  desktopbuttontypemap(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  desktopbuttontypemapLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPadbuttontypemapAt(t, s) {
    return this.padbuttontypemap(t);
  }
  padbuttontypemap(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  padbuttontypemapLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGamepadbuttontypemapAt(t, s) {
    return this.gamepadbuttontypemap(t);
  }
  gamepadbuttontypemap(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  gamepadbuttontypemapLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMotorpadbuttontypemapAt(t, s) {
    return this.motorpadbuttontypemap(t);
  }
  motorpadbuttontypemap(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  motorpadbuttontypemapLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMotorjoystickpadbuttontypemapAt(t, s) {
    return this.motorjoystickpadbuttontypemap(t);
  }
  motorjoystickpadbuttontypemap(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  motorjoystickpadbuttontypemapLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkillButtonIndex = SkillButtonIndex;
//# sourceMappingURL=SkillButtonIndex.js.map