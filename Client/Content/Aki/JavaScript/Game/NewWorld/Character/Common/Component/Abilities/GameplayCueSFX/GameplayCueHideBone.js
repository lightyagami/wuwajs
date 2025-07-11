"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueHideBone = undefined;
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideBone extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    this.Q$o(true);
  }
  OnDestroy() {
    this.Q$o(false);
  }
  Q$o(e) {
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Parameters[0]);
    let s = (this.CueConfig.Parameters[1] ?? "1") === "1";
    if (!e) {
      s = !s;
    }
    if (this.ActorInternal.Mesh.IsBoneHiddenByName(t) !== s) {
      if (s) {
        this.ActorInternal.Mesh.HideBoneByName(t, Number(this.CueConfig.Parameters[1]) ?? 0);
      } else {
        this.ActorInternal.Mesh.UnHideBoneByName(t);
      }
    }
  }
}
exports.GameplayCueHideBone = GameplayCueHideBone;
//# sourceMappingURL=GameplayCueHideBone.js.map