"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformState = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbInitNpcPerformState_1 = require("../Common/FbInitNpcPerformState");
const FbNpcPerformStateConfig_1 = require("./FbNpcPerformStateConfig");
class FbNpcPerformState {
  constructor(t) {
    this.FbDataInternal = t;
    this.wAh = false;
    this.PAh = undefined;
    this.Gvh = false;
    this.Ovh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformState(t);
    }
  }
  get InitState() {
    if (!this.wAh) {
      this.wAh = true;
      this.PAh = FbInitNpcPerformState_1.FbInitNpcPerformState.Create(this.FbDataInternal.initState());
    }
    return this.PAh;
  }
  get Configs() {
    if (!this.Gvh) {
      this.Gvh = true;
      this.Ovh = new Array();
      var e = this.FbDataInternal.configsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.configs(t, new fb_component_1.NpcPerformStateConfig());
          this.Ovh.push(FbNpcPerformStateConfig_1.FbNpcPerformStateConfig.Create(r));
        }
      }
    }
    return this.Ovh;
  }
}
exports.FbNpcPerformState = FbNpcPerformState;
//# sourceMappingURL=FbNpcPerformState.js.map