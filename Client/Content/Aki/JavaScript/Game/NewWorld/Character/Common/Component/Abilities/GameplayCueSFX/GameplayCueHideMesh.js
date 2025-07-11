"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueHideMesh = undefined;
const UE = require("ue");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideMesh extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    this.X$o(true);
  }
  OnDestroy() {
    this.X$o(false);
  }
  X$o(s) {
    var a = this.ActorInternal.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
    for (let e = 0; e < a.Num(); e++) {
      var t = a.Get(e);
      if (t instanceof UE.MeshComponent && t.GetName() === this.CueConfig.Parameters[0]) {
        let e = (this.CueConfig.Parameters[1] ?? "1") === "1";
        if (!s) {
          e = !e;
        }
        var i = (this.CueConfig.Parameters[2] ?? "1") === "1";
        t.SetHiddenInGame(e, i);
      }
    }
  }
}
exports.GameplayCueHideMesh = GameplayCueHideMesh;
//# sourceMappingURL=GameplayCueHideMesh.js.map