"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformOnMonsterCloseby = undefined;
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex");
const FbMontageId_1 = require("../Action/FbMontageId");
class FbNpcPerformOnMonsterCloseby {
  constructor(t) {
    this.FbDataInternal = t;
    this.M_h = false;
    this.E_h = 0;
    this.mgh = false;
    this.Cgh = undefined;
    this.G4h = false;
    this.O4h = undefined;
    this.D4h = false;
    this.B4h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformOnMonsterCloseby(t);
    }
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montage());
    }
    return this.Cgh;
  }
  get Bubble() {
    if (!this.G4h) {
      this.G4h = true;
      this.O4h = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.bubble());
    }
    return this.O4h;
  }
  get BubbleRate() {
    if (!this.D4h) {
      this.D4h = true;
      this.B4h = this.FbDataInternal.bubbleRate();
    }
    return this.B4h;
  }
}
exports.FbNpcPerformOnMonsterCloseby = FbNpcPerformOnMonsterCloseby;
//# sourceMappingURL=FbNpcPerformOnMonsterCloseby.js.map