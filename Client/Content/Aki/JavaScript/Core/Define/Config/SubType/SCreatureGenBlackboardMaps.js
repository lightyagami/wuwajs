"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCreatureGenBlackboardMaps = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
const DicStringBool_1 = require("./DicStringBool");
const DicStringInt_1 = require("./DicStringInt");
const DicStringString_1 = require("./DicStringString");
class SCreatureGenBlackboardMaps {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapString() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mapstringLength(), this.mapstringKey, this.mapstringValue, this);
  }
  mapstringKey(t) {
    return this.mapstring(t)?.key();
  }
  mapstringValue(t) {
    return this.mapstring(t)?.value();
  }
  get MapInt() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mapintLength(), this.mapintKey, this.mapintValue, this);
  }
  mapintKey(t) {
    return this.mapint(t)?.key();
  }
  mapintValue(t) {
    return this.mapint(t)?.value();
  }
  get MapBool() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mapboolLength(), this.mapboolKey, this.mapboolValue, this);
  }
  mapboolKey(t) {
    return this.mapbool(t)?.key();
  }
  mapboolValue(t) {
    return this.mapbool(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSCreatureGenBlackboardMaps(t, i) {
    return (i || new SCreatureGenBlackboardMaps()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetMapstringAt(t, i) {
    return this.mapstring(t);
  }
  mapstring(t, i) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mapstringLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMapintAt(t, i) {
    return this.mapint(t);
  }
  mapint(t, i) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return (i || new DicStringInt_1.DicStringInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mapintLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMapboolAt(t, i) {
    return this.mapbool(t);
  }
  mapbool(t, i) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (i || new DicStringBool_1.DicStringBool()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mapboolLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SCreatureGenBlackboardMaps = SCreatureGenBlackboardMaps;
//# sourceMappingURL=SCreatureGenBlackboardMaps.js.map