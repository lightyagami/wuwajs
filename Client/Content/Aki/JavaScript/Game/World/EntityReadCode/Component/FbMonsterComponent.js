"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterComponent = undefined;
const FbBossStateViewConfig_1 = require("./FbBossStateViewConfig");
const FbMonsterPerformConfig_1 = require("./FbMonsterPerformConfig");
class FbMonsterComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.$5h = false;
    this.X5h = 0;
    this.Y5h = false;
    this.z5h = undefined;
    this.J5h = false;
    this.Z5h = undefined;
    this.e8h = false;
    this.t8h = 0;
    this.i8h = false;
    this.r8h = undefined;
    this.tB1 = false;
    this.iB1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMonsterComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get FightConfigId() {
    if (!this.$5h) {
      this.$5h = true;
      this.X5h = this.FbDataInternal.fightConfigId();
    }
    return this.X5h;
  }
  get BossViewConfig() {
    if (!this.Y5h) {
      this.Y5h = true;
      this.z5h = FbBossStateViewConfig_1.FbBossStateViewConfig.Create(this.FbDataInternal.bossViewConfig());
    }
    return this.z5h;
  }
  get InitGasTag() {
    if (!this.J5h) {
      this.J5h = true;
      this.Z5h = new Array();
      var i = this.FbDataInternal.initGasTagLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Z5h.push(this.FbDataInternal.initGasTag(t));
        }
      }
    }
    return this.Z5h;
  }
  get SpecialHateAndSenseConfig() {
    if (!this.e8h) {
      this.e8h = true;
      this.t8h = this.FbDataInternal.specialHateAndSenseConfig();
    }
    return this.t8h;
  }
  get PerformConfig() {
    if (!this.i8h) {
      this.i8h = true;
      this.r8h = FbMonsterPerformConfig_1.FbMonsterPerformConfig.Create(this.FbDataInternal.performConfig());
    }
    return this.r8h;
  }
  get ShareLifeSubMonsterIds() {
    if (!this.tB1) {
      this.tB1 = true;
      this.iB1 = new Array();
      var i = this.FbDataInternal.shareLifeSubMonsterIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.iB1.push(this.FbDataInternal.shareLifeSubMonsterIds(t));
        }
      }
    }
    return this.iB1;
  }
}
exports.FbMonsterComponent = FbMonsterComponent;
//# sourceMappingURL=FbMonsterComponent.js.map