"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLifePointColorBoard = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbColorPiece_1 = require("./FbColorPiece");
class FbLifePointColorBoard {
  constructor(t) {
    this.FbDataInternal = t;
    this.bSh = false;
    this.TAe = undefined;
    this.TIh = false;
    this.bIh = undefined;
    this.LIh = false;
    this.AIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLifePointColorBoard(t);
    }
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var i = this.FbDataInternal.configLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.config(t, new fb_action_1.ColorPiece());
          this.TAe.push(FbColorPiece_1.FbColorPiece.Create(r));
        }
      }
    }
    return this.TAe;
  }
  get Colors() {
    if (!this.TIh) {
      this.TIh = true;
      this.bIh = new Array();
      var i = this.FbDataInternal.colorsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.bIh.push(this.FbDataInternal.colors(t));
        }
      }
    }
    return this.bIh;
  }
  get TargetColor() {
    if (!this.LIh) {
      this.LIh = true;
      this.AIh = this.FbDataInternal.targetColor();
    }
    return this.AIh;
  }
}
exports.FbLifePointColorBoard = FbLifePointColorBoard;
//# sourceMappingURL=FbLifePointColorBoard.js.map