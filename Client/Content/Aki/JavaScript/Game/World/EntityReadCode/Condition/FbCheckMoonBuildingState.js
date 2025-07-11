"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckMoonBuildingState = undefined;
class FbCheckMoonBuildingState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.CJh = false;
    this.gJh = 0;
    this.fJh = false;
    this.pJh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckMoonBuildingState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BuildingId() {
    if (!this.CJh) {
      this.CJh = true;
      this.gJh = this.FbDataInternal.buildingId();
    }
    return this.gJh;
  }
  get IsBuilt() {
    if (!this.fJh) {
      this.fJh = true;
      this.pJh = this.FbDataInternal.isBuilt();
    }
    return this.pJh;
  }
}
exports.FbCheckMoonBuildingState = FbCheckMoonBuildingState;
//# sourceMappingURL=FbCheckMoonBuildingState.js.map