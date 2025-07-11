"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawCompletedConfig = undefined;
class FbJigsawCompletedConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.PNh = false;
    this.UNh = false;
    this.DNh = false;
    this.BNh = false;
  }
  static Create(t) {
    if (t) {
      return new FbJigsawCompletedConfig(t);
    }
  }
  get IsSilentPiece() {
    if (!this.PNh) {
      this.PNh = true;
      this.UNh = this.FbDataInternal.isSilentPiece();
    }
    return this.UNh;
  }
  get IsSilentFoundation() {
    if (!this.DNh) {
      this.DNh = true;
      this.BNh = this.FbDataInternal.isSilentFoundation();
    }
    return this.BNh;
  }
}
exports.FbJigsawCompletedConfig = FbJigsawCompletedConfig;
//# sourceMappingURL=FbJigsawCompletedConfig.js.map