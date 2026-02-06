"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicManipulatableTagsChange = undefined;
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableTagsChange extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.Parameter = t;
  }
  BulletLogicActionOnHitObstacles(t = undefined) {
    if (t && t instanceof BulletHitActorData_1.BulletHitActorData && t.Entity && t.Entity.GetComponent(0).IsSceneItem()) {
      var t = t.Entity;
      var e = t?.GetComponent(167);
      var r = this.Parameter;
      var l = t?.GetComponent(208);
      if (e && this.CheckCondition(t) && l) {
        var o = r.AddTags.GameplayTags;
        var a = o.Num();
        for (let t = 0; t < a; t++) {
          var i = o.Get(t).TagId;
          l.AddServerTagByIdLocal(i, "特定子弹命中可控物添加标签");
        }
        var u = r.RemoveTags.GameplayTags;
        var s = u.Num();
        for (let t = 0; t < s; t++) {
          var n = u.Get(t).TagId;
          l.RemoveServerTagByIdLocal(n, "特定子弹命中可控物移除标签");
        }
      }
    }
  }
  CheckCondition(t) {
    var e = this.Parameter;
    var r = t?.GetComponent(208);
    if (!r) {
      return false;
    }
    var l = e.ExistTagsCondition.GameplayTags;
    var o = l.Num();
    for (let t = 0; t < o; t++) {
      var a = l.Get(t).TagId;
      if (!r.HasTag(a)) {
        return false;
      }
    }
    var i = e.UnExistTagsCondition.GameplayTags;
    var u = i.Num();
    for (let t = 0; t < u; t++) {
      var s = i.Get(t).TagId;
      if (r.HasTag(s)) {
        return false;
      }
    }
    return true;
  }
}
exports.BulletLogicManipulatableTagsChange = BulletLogicManipulatableTagsChange;
//# sourceMappingURL=BulletLogicManipulatableTagsChange.js.map