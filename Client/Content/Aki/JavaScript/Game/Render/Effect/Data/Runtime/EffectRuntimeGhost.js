"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const EffectRuntimeDataBase_1 = require("./EffectRuntimeDataBase");
class EffectRuntimeGhost extends EffectRuntimeDataBase_1.default {
  constructor() {
    super(...arguments);
    this.OverrideSpawnRate = false;
    this.SpawnRate = -0;
    this.OverrideGhostLifeTime = false;
    this.GhostLifeTime = -0;
  }
}
exports.default = EffectRuntimeGhost;
//# sourceMappingURL=EffectRuntimeGhost.js.map