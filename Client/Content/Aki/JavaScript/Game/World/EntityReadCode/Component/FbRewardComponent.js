"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRewardComponent = undefined;
const FbRewardRefreshConfig_1 = require("./FbRewardRefreshConfig");
class FbRewardComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.UBh = false;
    this.DBh = 0;
    this.BBh = false;
    this.qBh = undefined;
    this.kBh = false;
    this.GBh = undefined;
    this.lxc = false;
    this._xc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRewardComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get RewardId() {
    if (!this.UBh) {
      this.UBh = true;
      this.DBh = this.FbDataInternal.rewardId();
    }
    return this.DBh;
  }
  get RewardType() {
    if (!this.BBh) {
      this.BBh = true;
      this.qBh = this.FbDataInternal.rewardType();
    }
    return this.qBh;
  }
  get DropOnEvent() {
    if (!this.kBh) {
      this.kBh = true;
      this.GBh = this.FbDataInternal.dropOnEvent();
    }
    return this.GBh;
  }
  get RefreshConfig() {
    if (!this.lxc) {
      this.lxc = true;
      this._xc = FbRewardRefreshConfig_1.FbRewardRefreshConfig.Create(this.FbDataInternal.refreshConfig());
    }
    return this._xc;
  }
}
exports.FbRewardComponent = FbRewardComponent;
//# sourceMappingURL=FbRewardComponent.js.map