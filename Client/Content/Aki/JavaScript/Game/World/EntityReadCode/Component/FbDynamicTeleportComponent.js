"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicTeleportComponent = undefined;
const FbPosA_1 = require("../Action/FbPosA");
class FbDynamicTeleportComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Kdh = false;
    this.$dh = undefined;
    this.DWh = false;
    this.BWh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicTeleportComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbPosA_1.FbPosA.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
  get PhantomSkillId() {
    if (!this.DWh) {
      this.DWh = true;
      this.BWh = this.FbDataInternal.phantomSkillId();
    }
    return this.BWh;
  }
}
exports.FbDynamicTeleportComponent = FbDynamicTeleportComponent;
//# sourceMappingURL=FbDynamicTeleportComponent.js.map