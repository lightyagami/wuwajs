"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueHitEffect = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHitEffect extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.hJ = 0;
    this.Qgl = false;
  }
  OnCreate() {
    if (this.CueConfig.Path) {
      this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(this.CueConfig.Path, UE.BP_ReplaceHitEffect_C, e => {
        this.hJ = 0;
        if (this.Uoa(e)) {
          this.Qgl = true;
        }
      });
    }
  }
  OnDestroy() {
    if (this.hJ !== 0) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = 0;
    }
    if (this.Qgl) {
      this.Qgl = false;
      this.Kgl();
    }
  }
  Uoa(e) {
    var t;
    return !!e && !!this.EntityHandle.Valid && !!(t = this.EntityHandle.Entity.GetComponent(64)) && t.ReplaceHitEffect(e);
  }
  Kgl() {
    var e;
    if (this.EntityHandle.Valid && (e = this.EntityHandle.Entity.GetComponent(64))) {
      e.RemoveHitEffectReplaced();
    }
  }
}
exports.GameplayCueHitEffect = GameplayCueHitEffect;
//# sourceMappingURL=GameplayCueHitEffect.js.map