"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingGridItemShape = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class FishingGridItemShape {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FillState() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fillstateLength(), this.fillstate, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFishingGridItemShape(t, i) {
    return (i || new FishingGridItemShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFillstateAt(t, i) {
    return this.fillstate(t);
  }
  fillstate(t, i) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  fillstateLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FishingGridItemShape = FishingGridItemShape;
//# sourceMappingURL=FishingGridItemShape.js.map