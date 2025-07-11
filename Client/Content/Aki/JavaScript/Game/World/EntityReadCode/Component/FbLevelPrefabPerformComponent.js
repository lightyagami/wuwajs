"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelPrefabPerformComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLevelPrefabParamsConfig_1 = require("./FbLevelPrefabParamsConfig");
const FbTowardEntityConfig_1 = require("./FbTowardEntityConfig");
class FbLevelPrefabPerformComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.pYh = false;
    this.vYh = undefined;
    this.yYh = false;
    this.SYh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelPrefabPerformComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get TowardEntity() {
    if (!this.pYh) {
      this.pYh = true;
      this.vYh = new Array();
      var e = this.FbDataInternal.towardEntityLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.towardEntity(t, new fb_component_1.TowardEntityConfig());
          this.vYh.push(FbTowardEntityConfig_1.FbTowardEntityConfig.Create(r));
        }
      }
    }
    return this.vYh;
  }
  get PrefabParams() {
    if (!this.yYh) {
      this.yYh = true;
      this.SYh = FbLevelPrefabParamsConfig_1.FbLevelPrefabParamsConfig.Create(this.FbDataInternal.prefabParams());
    }
    return this.SYh;
  }
}
exports.FbLevelPrefabPerformComponent = FbLevelPrefabPerformComponent;
//# sourceMappingURL=FbLevelPrefabPerformComponent.js.map