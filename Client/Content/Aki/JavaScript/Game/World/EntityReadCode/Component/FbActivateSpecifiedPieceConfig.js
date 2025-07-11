"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActivateSpecifiedPieceConfig = undefined;
const FbJigsawConfig_1 = require("../Action/FbJigsawConfig");
class FbActivateSpecifiedPieceConfig {
  constructor(i) {
    this.FbDataInternal = i;
    this.MNh = false;
    this.ENh = undefined;
    this.pFh = false;
    this.vFh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbActivateSpecifiedPieceConfig(i);
    }
  }
  get Jigsaw() {
    if (!this.MNh) {
      this.MNh = true;
      this.ENh = FbJigsawConfig_1.FbJigsawConfig.Create(this.FbDataInternal.jigsaw());
    }
    return this.ENh;
  }
  get SelfState() {
    if (!this.pFh) {
      this.pFh = true;
      this.vFh = this.FbDataInternal.selfState();
    }
    return this.vFh;
  }
}
exports.FbActivateSpecifiedPieceConfig = FbActivateSpecifiedPieceConfig;
//# sourceMappingURL=FbActivateSpecifiedPieceConfig.js.map