"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayMontage = undefined;
const FbActionMontage_1 = require("./FbActionMontage");
class FbPlayMontage {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.gdh = false;
    this.fdh = undefined;
    this.Xdh = false;
    this.Ydh = undefined;
    this.zdh = false;
    this.Jdh = undefined;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPlayMontage(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get ActionMontage() {
    if (!this.gdh) {
      this.gdh = true;
      this.fdh = FbActionMontage_1.FbActionMontage.Create(this.FbDataInternal.actionMontage());
    }
    return this.fdh;
  }
  get ExpressionMontage() {
    if (!this.Xdh) {
      this.Xdh = true;
      this.Ydh = this.FbDataInternal.expressionMontage();
    }
    return this.Ydh;
  }
  get MouthSequence() {
    if (!this.zdh) {
      this.zdh = true;
      this.Jdh = this.FbDataInternal.mouthSequence();
    }
    return this.Jdh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbPlayMontage = FbPlayMontage;
//# sourceMappingURL=FbPlayMontage.js.map