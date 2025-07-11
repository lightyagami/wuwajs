"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBossStateViewConfig = undefined;
class FbBossStateViewConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.o8h = false;
    this.n8h = undefined;
    this.s8h = false;
    this.a8h = undefined;
    this.h8h = false;
    this.l8h = undefined;
    this._8h = false;
    this.c8h = undefined;
    this.u8h = false;
    this.d8h = false;
    this.m8h = false;
    this.C8h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBossStateViewConfig(t);
    }
  }
  get BossStateViewType() {
    if (!this.o8h) {
      this.o8h = true;
      this.n8h = this.FbDataInternal.bossStateViewType();
    }
    return this.n8h;
  }
  get TidBossSubTitle() {
    if (!this.s8h) {
      this.s8h = true;
      this.a8h = this.FbDataInternal.tidBossSubTitle();
    }
    return this.a8h;
  }
  get BossStateInfoShowType() {
    if (!this.h8h) {
      this.h8h = true;
      this.l8h = this.FbDataInternal.bossStateInfoShowType();
    }
    return this.l8h;
  }
  get TidLevelText() {
    if (!this._8h) {
      this._8h = true;
      this.c8h = this.FbDataInternal.tidLevelText();
    }
    return this.c8h;
  }
  get OnlyShowInBattleState() {
    if (!this.u8h) {
      this.u8h = true;
      this.d8h = this.FbDataInternal.onlyShowInBattleState();
    }
    return this.d8h;
  }
  get ShowDistance() {
    if (!this.m8h) {
      this.m8h = true;
      this.C8h = this.FbDataInternal.showDistance();
    }
    return this.C8h;
  }
}
exports.FbBossStateViewConfig = FbBossStateViewConfig;
//# sourceMappingURL=FbBossStateViewConfig.js.map