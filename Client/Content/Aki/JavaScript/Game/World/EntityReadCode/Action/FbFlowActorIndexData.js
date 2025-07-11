"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowActorIndexData = undefined;
const FbPosAndRot_1 = require("./FbPosAndRot");
class FbFlowActorIndexData {
  constructor(t) {
    this.FbDataInternal = t;
    this.Afh = false;
    this.V_i = 0;
    this.Kdh = false;
    this.$dh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFlowActorIndexData(t);
    }
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = this.FbDataInternal.index();
    }
    return this.V_i;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbPosAndRot_1.FbPosAndRot.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
}
exports.FbFlowActorIndexData = FbFlowActorIndexData;
//# sourceMappingURL=FbFlowActorIndexData.js.map