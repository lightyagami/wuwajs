"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetBattleTagConfig = undefined;
class FbSetBattleTagConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Fvh = false;
    this.Nvh = 0;
    this.Gfh = false;
    this.Ofh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetBattleTagConfig(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get TagConfigId() {
    if (!this.Fvh) {
      this.Fvh = true;
      this.Nvh = this.FbDataInternal.tagConfigId();
    }
    return this.Nvh;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
}
exports.FbSetBattleTagConfig = FbSetBattleTagConfig;
//# sourceMappingURL=FbSetBattleTagConfig.js.map