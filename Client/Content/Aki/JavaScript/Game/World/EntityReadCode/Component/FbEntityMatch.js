"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityMatch = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityCategory_1 = require("./FbEntityCategory");
const FbEntityState_1 = require("./FbEntityState");
class FbEntityMatch {
  constructor(t) {
    this.FbDataInternal = t;
    this.Wkh = false;
    this.Qkh = false;
    this.Kkh = false;
    this.$kh = false;
    this.Xkh = false;
    this.Ykh = undefined;
    this.Dxh = false;
    this.Bxh = undefined;
    this.zkh = false;
    this.Jkh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityMatch(t);
    }
  }
  get AllCharacter() {
    if (!this.Wkh) {
      this.Wkh = true;
      this.Qkh = this.FbDataInternal.allCharacter();
    }
    return this.Qkh;
  }
  get OnlyPlayer() {
    if (!this.Kkh) {
      this.Kkh = true;
      this.$kh = this.FbDataInternal.onlyPlayer();
    }
    return this.$kh;
  }
  get Categories() {
    if (!this.Xkh) {
      this.Xkh = true;
      this.Ykh = new Array();
      var i = this.FbDataInternal.categoriesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.categories(t, new fb_component_1.EntityCategory());
          this.Ykh.push(FbEntityCategory_1.FbEntityCategory.Create(s));
        }
      }
    }
    return this.Ykh;
  }
  get States() {
    if (!this.Dxh) {
      this.Dxh = true;
      this.Bxh = new Array();
      var i = this.FbDataInternal.statesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.states(t, new fb_component_1.EntityState());
          this.Bxh.push(FbEntityState_1.FbEntityState.Create(s));
        }
      }
    }
    return this.Bxh;
  }
  get PerformanceStates() {
    if (!this.zkh) {
      this.zkh = true;
      this.Jkh = new Array();
      var i = this.FbDataInternal.performanceStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Jkh.push(this.FbDataInternal.performanceStates(t));
        }
      }
    }
    return this.Jkh;
  }
}
exports.FbEntityMatch = FbEntityMatch;
//# sourceMappingURL=FbEntityMatch.js.map