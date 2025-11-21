"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicSuiGuang = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletEntity_1 = require("../Entity/BulletEntity");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSuiGuang extends BulletLogicController_1.BulletLogicController {
  constructor(t, l) {
    super(t, l);
    this.a7o = this.Bullet.GetBulletInfo();
    this.h7o = t;
  }
  BulletLogicAction(t = undefined) {
    if (t instanceof BulletHitActorData_1.BulletHitActorData) {
      if (this.h7o.IncludeBullet) {
        if (t.Entity instanceof BulletEntity_1.BulletEntity && t.Entity.GetBulletInfo().HasTag(this.h7o.NeedTag)) {
          this.K7o(this.h7o.NewBulletId, t.Entity.Id);
        }
      } else if (t.Entity?.GetComponent(0)?.IsRole() && t.Entity.GetComponent(209)?.HasTag(this.h7o.NeedTag.TagId)) {
        this.K7o(this.h7o.NewBulletId, t.Entity.Id);
      }
    }
  }
  K7o(t, l) {
    var e = this.Bullet.GetComponent(173).ActorTransform;
    BulletController_1.BulletController.CreateBulletCustomTarget(this.Bullet.GetBulletInfo().BulletInitParams.Owner, t, e ?? MathUtils_1.MathUtils.DefaultTransform, {
      SkillId: this.a7o.BulletInitParams.SkillId,
      SkillContextId: this.a7o.BulletInitParams.SkillContextId,
      ParentVictimId: l,
      ParentTargetId: this.a7o.Target?.Id,
      ParentId: this.Bullet.Id,
      DtType: this.a7o.BulletInitParams.DtType,
      BattleFlags: this.a7o.BulletInitParams.BattleFlags,
      ParentIds: undefined
    }, this.a7o.ContextId);
    BulletController_1.BulletController.DestroyBullet(this.Bullet.Id, false);
  }
}
exports.BulletLogicSuiGuang = BulletLogicSuiGuang;
//# sourceMappingURL=BulletLogicSuiGuang.js.map