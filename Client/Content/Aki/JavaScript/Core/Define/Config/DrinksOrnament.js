"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksOrnament = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class DrinksOrnament {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get Mesh() {
    return this.mesh();
  }
  get Scale() {
    return GameUtils_1.GameUtils.ConvertToMap(this.scaleLength(), this.scaleKey, this.scaleValue, this);
  }
  scaleKey(t) {
    return this.scale(t)?.key();
  }
  scaleValue(t) {
    return this.scale(t)?.value();
  }
  get Location() {
    return GameUtils_1.GameUtils.ConvertToMap(this.locationLength(), this.locationKey, this.locationValue, this);
  }
  locationKey(t) {
    return this.location(t)?.key();
  }
  locationValue(t) {
    return this.location(t)?.value();
  }
  get Rotation() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rotationLength(), this.rotationKey, this.rotationValue, this);
  }
  rotationKey(t) {
    return this.rotation(t)?.key();
  }
  rotationValue(t) {
    return this.rotation(t)?.value();
  }
  get MeshTagId() {
    return this.meshtagid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDrinksOrnament(t, i) {
    return (i || new DrinksOrnament()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mesh(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetScaleAt(t, i) {
    return this.scale(t);
  }
  scale(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  scaleLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLocationAt(t, i) {
    return this.location(t);
  }
  location(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  locationLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRotationAt(t, i) {
    return this.rotation(t);
  }
  rotation(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rotationLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  meshtagid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DrinksOrnament = DrinksOrnament;
//# sourceMappingURL=DrinksOrnament.js.map