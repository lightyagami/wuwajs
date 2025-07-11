"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBatchBulletCasterComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPosRot_1 = require("../Action/FbPosRot");
const FbBatchBulletItem_1 = require("./FbBatchBulletItem");
class FbBatchBulletCasterComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.hXh = false;
    this.lXh = undefined;
    this.QY_ = false;
    this.KY_ = undefined;
    this._Xh = false;
    this.cXh = undefined;
    this.uXh = false;
    this.dXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBatchBulletCasterComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get WarningEffect() {
    if (!this.hXh) {
      this.hXh = true;
      this.lXh = this.FbDataInternal.warningEffect();
    }
    return this.lXh;
  }
  get MovementType() {
    if (!this.QY_) {
      this.QY_ = true;
      this.KY_ = this.FbDataInternal.movementType();
    }
    return this.KY_;
  }
  get BulletList() {
    if (!this._Xh) {
      this._Xh = true;
      this.cXh = new Array();
      var i = this.FbDataInternal.bulletListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.bulletList(t, new fb_action_1.PosRot());
          this.cXh.push(FbPosRot_1.FbPosRot.Create(e));
        }
      }
    }
    return this.cXh;
  }
  get BatchList() {
    if (!this.uXh) {
      this.uXh = true;
      this.dXh = new Array();
      var i = this.FbDataInternal.batchListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.batchList(t, new fb_component_1.BatchBulletItem());
          this.dXh.push(FbBatchBulletItem_1.FbBatchBulletItem.Create(e));
        }
      }
    }
    return this.dXh;
  }
}
exports.FbBatchBulletCasterComponent = FbBatchBulletCasterComponent;
//# sourceMappingURL=FbBatchBulletCasterComponent.js.map