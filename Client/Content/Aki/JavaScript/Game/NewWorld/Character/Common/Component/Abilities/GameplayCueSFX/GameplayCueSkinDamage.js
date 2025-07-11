"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueSkinDamage = undefined;
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueSkinDamage extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    var e = this.EntityHandle.Entity?.GetComponent(210);
    if (e) {
      e.CuePath = this.GetPath();
      e.ApplySkinDamage(e.CuePath, false, "GameplayCueSkinDamage生成");
    }
  }
  OnDestroy() {
    var e = this.EntityHandle.Entity?.GetComponent(210);
    if (e) {
      e.CuePath = "";
      e.ApplySkinDamageByType(e.SkinDamageType, false, "GameplayCueSkinDamage销毁");
    }
  }
}
exports.GameplayCueSkinDamage = GameplayCueSkinDamage;
//# sourceMappingURL=GameplayCueSkinDamage.js.map