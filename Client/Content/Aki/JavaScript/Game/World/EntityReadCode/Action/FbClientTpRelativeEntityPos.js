"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientTpRelativeEntityPos = undefined;
class FbClientTpRelativeEntityPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.svh = false;
    this.avh = 0;
    this.hvh = false;
    this.lvh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbClientTpRelativeEntityPos(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SourcePosEntityId() {
    if (!this.svh) {
      this.svh = true;
      this.avh = this.FbDataInternal.sourcePosEntityId();
    }
    return this.avh;
  }
  get TargetPosEntityId() {
    if (!this.hvh) {
      this.hvh = true;
      this.lvh = this.FbDataInternal.targetPosEntityId();
    }
    return this.lvh;
  }
}
exports.FbClientTpRelativeEntityPos = FbClientTpRelativeEntityPos;
//# sourceMappingURL=FbClientTpRelativeEntityPos.js.map