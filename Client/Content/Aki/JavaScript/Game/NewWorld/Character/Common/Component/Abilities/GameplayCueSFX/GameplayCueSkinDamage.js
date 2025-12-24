"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueSkinDamage = undefined;
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueSkinDamage extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    var e;
    var a = this.EntityHandle.Entity?.GetComponent(221);
    if (a) {
      a.CuePath = this.GetPath();
      e = this.IsIgnoreEnableSetting();
      a.IsCueIgnoreEnableSetting = e;
      a.ApplySkinDamage(a.CuePath, e, "GameplayCueSkinDamage生成");
    }
  }
  OnDestroy() {
    var e = this.EntityHandle.Entity?.GetComponent(221);
    if (e) {
      e.ResetCueSkinDamage();
    }
  }
  IsIgnoreEnableSetting() {
    var e = this.CueConfig.Parameters;
    return e.length > 0 && e[0] === "1";
  }
}
exports.GameplayCueSkinDamage = GameplayCueSkinDamage;
//# sourceMappingURL=GameplayCueSkinDamage.js.map