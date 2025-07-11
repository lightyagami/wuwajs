"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportDungeon = undefined;
const UnionTeleportTransitionOptionHelper_1 = require("./UnionTeleportTransitionOptionHelper");
class FbTeleportDungeon {
  constructor(t) {
    this.FbDataInternal = t;
    this.MMh = false;
    this.EMh = 0;
    this.IMh = false;
    this.TMh = false;
    this.bMh = false;
    this.LMh = 0;
    this.L0h = false;
    this.khi = undefined;
    this.AMh = false;
    this.xMh = false;
    this.aF_ = false;
    this.hF_ = false;
    this.EBc = false;
    this.IBc = false;
    this.FO1 = false;
    this.NO1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportDungeon(t);
    }
  }
  get DungeonId() {
    if (!this.MMh) {
      this.MMh = true;
      this.EMh = this.FbDataInternal.dungeonId();
    }
    return this.EMh;
  }
  get IsRegroup() {
    if (!this.IMh) {
      this.IMh = true;
      this.TMh = this.FbDataInternal.isRegroup();
    }
    return this.TMh;
  }
  get LocationEntityId() {
    if (!this.bMh) {
      this.bMh = true;
      this.LMh = this.FbDataInternal.locationEntityId();
    }
    return this.LMh;
  }
  get TransitionOption() {
    var t;
    var i;
    if (!this.L0h && (this.L0h = true, t = this.FbDataInternal.transitionOptionType(), i = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(t))) {
      this.khi = UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(t, this.FbDataInternal.transitionOption(i));
    }
    return this.khi;
  }
  get IsNeedSecondaryConfirmation() {
    if (!this.AMh) {
      this.AMh = true;
      this.xMh = this.FbDataInternal.isNeedSecondaryConfirmation();
    }
    return this.xMh;
  }
  get UseLocationEntityGravity() {
    if (!this.aF_) {
      this.aF_ = true;
      this.hF_ = this.FbDataInternal.useLocationEntityGravity();
    }
    return this.hF_;
  }
  get ContinueSave() {
    if (!this.EBc) {
      this.EBc = true;
      this.IBc = this.FbDataInternal.continueSave();
    }
    return this.IBc;
  }
  get KeepMovementStates() {
    if (!this.FO1) {
      this.FO1 = true;
      this.NO1 = new Array();
      var i = this.FbDataInternal.keepMovementStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.NO1.push(this.FbDataInternal.keepMovementStates(t));
        }
      }
    }
    return this.NO1;
  }
}
exports.FbTeleportDungeon = FbTeleportDungeon;
//# sourceMappingURL=FbTeleportDungeon.js.map