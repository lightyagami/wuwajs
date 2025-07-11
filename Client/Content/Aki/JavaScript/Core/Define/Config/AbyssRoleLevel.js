"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssRoleLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const DicIntInt_1 = require("./SubType/DicIntInt");
class AbyssRoleLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get GroupId() {
    return this.groupid();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get Prop() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propLength(), this.prop, this);
  }
  get PluginNum() {
    return this.pluginnum();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAbyssRoleLevel(t, s) {
    return (s || new AbyssRoleLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeAt(t, s) {
    return this.consume(t);
  }
  consume(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPropAt(t, s) {
    return this.prop(t);
  }
  prop(t, s) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (s || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  propLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  pluginnum() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AbyssRoleLevel = AbyssRoleLevel;
//# sourceMappingURL=AbyssRoleLevel.js.map