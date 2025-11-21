"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicManipulatableCreateBullet = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicManipulatableCreateBullet extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.h7o = t;
  }
  BulletLogicActionOnHitObstacles(t = undefined) {
    if (t && t instanceof BulletHitActorData_1.BulletHitActorData && t.Entity && t.Entity.GetComponent(0).IsSceneItem()) {
      var e = t.Entity;
      if (e?.GetComponent(160) && this.CheckCondition(e)) {
        var l = this.Bullet.GetBulletInfo();
        var r = l.AttackerActorComp.Actor;
        var i = e.GetComponent(1)?.ActorTransform ?? MathUtils_1.MathUtils.DefaultTransformDouble;
        var o = this.h7o.CreateBulletRowName.Num();
        var a = l.ContextId;
        for (let t = 0; t < o; t++) {
          var u = this.h7o.CreateBulletRowName.Get(t);
          BulletController_1.BulletController.CreateBulletCustomTarget(r, u, i, {
            SkillId: l.BulletInitParams.SkillId,
            SkillContextId: l.BulletInitParams.SkillContextId,
            ParentVictimId: e?.Id,
            ParentTargetId: l.Target?.Id,
            ParentId: this.Bullet.Id,
            DtType: l.BulletInitParams.DtType,
            BattleFlags: l.BulletInitParams.BattleFlags,
            ParentIds: undefined
          }, a);
        }
      }
    }
  }
  CheckCondition(t) {
    var e = this.h7o;
    var l = t?.GetComponent(200);
    if (!l) {
      return false;
    }
    var r = e.ExistTagsCondition.GameplayTags;
    var i = r.Num();
    for (let t = 0; t < i; t++) {
      var o = r.Get(t).TagId;
      if (!l.HasTag(o)) {
        return false;
      }
    }
    var a = e.UnExistTagsCondition.GameplayTags;
    var u = a.Num();
    for (let t = 0; t < u; t++) {
      var s = a.Get(t).TagId;
      if (l.HasTag(s)) {
        return false;
      }
    }
    return true;
  }
}
exports.BulletLogicManipulatableCreateBullet = BulletLogicManipulatableCreateBullet;
//# sourceMappingURL=BulletLogicManipulatableCreateBullet.js.map