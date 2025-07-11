"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemLifeCycleComponent = undefined;
const FbCreateStageConfig_1 = require("./FbCreateStageConfig");
const FbDestroyStageConfig_1 = require("./FbDestroyStageConfig");
class FbSceneItemLifeCycleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.J6h = false;
    this.Z6h = undefined;
    this.ejh = false;
    this.tjh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneItemLifeCycleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get CreateStageConfig() {
    if (!this.J6h) {
      this.J6h = true;
      this.Z6h = FbCreateStageConfig_1.FbCreateStageConfig.Create(this.FbDataInternal.createStageConfig());
    }
    return this.Z6h;
  }
  get DestroyStageConfig() {
    if (!this.ejh) {
      this.ejh = true;
      this.tjh = FbDestroyStageConfig_1.FbDestroyStageConfig.Create(this.FbDataInternal.destroyStageConfig());
    }
    return this.tjh;
  }
}
exports.FbSceneItemLifeCycleComponent = FbSceneItemLifeCycleComponent;
//# sourceMappingURL=FbSceneItemLifeCycleComponent.js.map