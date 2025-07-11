"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectRuntimeGhostEffectContext = undefined;
const cpp_1 = require("cpp");
const SkeletalMeshEffectContext_1 = require("./SkeletalMeshEffectContext");
class EffectRuntimeGhostEffectContext extends SkeletalMeshEffectContext_1.SkeletalMeshEffectContext {
  constructor() {
    super(...arguments);
    this.SpawnRate = -0;
    this.UseSpawnRate = false;
    this.SpawnInterval = 0;
    this.GhostLifeTime = -0;
  }
  ToKuroEffectContext(t) {
    super.ToKuroEffectContext(t);
    if (t instanceof cpp_1.FEffectRuntimeGhostEffectContext) {
      t.SpawnRate = this.SpawnRate;
      t.UseSpawnRate = this.UseSpawnRate;
      t.SpawnInterval = this.SpawnInterval;
      t.GhostLifeTime = this.GhostLifeTime;
    }
  }
}
exports.EffectRuntimeGhostEffectContext = EffectRuntimeGhostEffectContext;
//# sourceMappingURL=EffectRuntimeGhostEffectContext.js.map