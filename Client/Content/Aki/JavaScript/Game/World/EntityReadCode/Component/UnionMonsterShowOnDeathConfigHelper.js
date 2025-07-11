"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionMonsterShowOnDeathConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbMonsterShowOnDeathEffect_1 = require("./FbMonsterShowOnDeathEffect");
class UnionMonsterShowOnDeathConfigHelper {
  static GetUnionMonsterShowOnDeathConfigObject(e) {
    if (e === fb_component_1.UnionMonsterShowOnDeathConfig.MonsterShowOnDeathEffect) {
      return new fb_component_1.MonsterShowOnDeathEffect();
    }
  }
  static ReadUnionMonsterShowOnDeathConfig(e, n) {
    if (n !== undefined && e === fb_component_1.UnionMonsterShowOnDeathConfig.MonsterShowOnDeathEffect) {
      return FbMonsterShowOnDeathEffect_1.FbMonsterShowOnDeathEffect.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionMonsterShowOnDeathConfigHelper = UnionMonsterShowOnDeathConfigHelper;
//# sourceMappingURL=UnionMonsterShowOnDeathConfigHelper.js.map