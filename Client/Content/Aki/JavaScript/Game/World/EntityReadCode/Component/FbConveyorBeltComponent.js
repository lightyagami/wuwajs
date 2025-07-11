"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConveyorBeltComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConveyorBeltState_1 = require("./FbConveyorBeltState");
class FbConveyorBeltComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.RWh = false;
    this.wWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConveyorBeltComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get StateGroups() {
    if (!this.RWh) {
      this.RWh = true;
      this.wWh = new Array();
      var e = this.FbDataInternal.stateGroupsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.stateGroups(t, new fb_component_1.ConveyorBeltState());
          this.wWh.push(FbConveyorBeltState_1.FbConveyorBeltState.Create(o));
        }
      }
    }
    return this.wWh;
  }
}
exports.FbConveyorBeltComponent = FbConveyorBeltComponent;
//# sourceMappingURL=FbConveyorBeltComponent.js.map