"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicCreateBulletController = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletUtil_1 = require("../BulletUtil");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicCreateBulletController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.h7o = undefined;
    this.h7o = t;
  }
  BulletLogicAction(e = undefined) {
    var r = this.h7o;
    var l = r.CreateBulletRowName;
    if (l !== StringUtils_1.NONE_STRING) {
      var i = this.Bullet.GetBulletInfo();
      let t = undefined;
      if (e && e instanceof BulletHitActorData_1.BulletHitActorData) {
        t = e.Entity;
      }
      const n = r.FlashBulletRowName;
      if (n !== StringUtils_1.NONE_STRING) {
        e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(i.Attacker.Id);
        let l = false;
        var o = t.GetComponent(1);
        if (e && (0, RegisterComponent_1.isComponentInstance)(o, 3)) {
          const a = o?.Actor;
          if (a) {
            e.forEach((t, e, r) => {
              if (t.GetBulletInfo().BulletRowName === n && t.GetComponent(1).Owner.GetAttachParentActor() === a) {
                t.GetBulletInfo().GenerateTime = Time_1.Time.WorldTime;
                l = true;
              }
            });
          }
        }
        if (l) {
          return;
        }
      }
      var o = this.Bullet.GetBulletInfo().ContextId;
      var e = this.l7o(r.BulletTransform, t);
      var l = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(this.l7o(r.BulletOwner, t)?.Entity, l, e?.ActorTransform ?? MathUtils_1.MathUtils.DefaultTransformDouble, {
        SkillId: i.BulletInitParams.SkillId,
        SkillContextId: i.BulletInitParams.SkillContextId,
        ParentVictimId: t?.Id,
        ParentTargetId: i.Target?.Id,
        ParentId: this.Bullet.Id,
        DtType: i.BulletInitParams.DtType,
        BattleContext: i.BulletInitParams.BattleContext,
        ParentIds: undefined
      }, o);
      if (l) {
        if ((e = l.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect) {
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(i, e);
        } else {
          o = r.AttachToBoneName;
          if ((i = this.l7o(r.AttachToActor, t)) && o !== StringUtils_1.NONE_STRING) {
            e = FNameUtil_1.FNameUtil.GetDynamicFName(o);
            (r = l.GetComponent(180)).SetActorLocation(i.GetSocketLocation(e));
            r.SetAttachToComponent(i.Owner.Mesh, e, 1, 0, 0, false);
            r.NeedDetach = true;
          }
        }
      }
    }
  }
  l7o(t, e) {
    switch (t) {
      case 1:
        return this.Bullet.GetBulletInfo().AttackerActorComp;
      case 2:
        var r = e.GetComponent(1);
        if (r?.Valid) {
          return r;
        } else {
          return this.Bullet.GetBulletInfo().AttackerActorComp;
        }
      default:
        return this.Bullet.GetBulletInfo().AttackerActorComp;
    }
  }
}
exports.BulletLogicCreateBulletController = BulletLogicCreateBulletController;
//# sourceMappingURL=BulletLogicCreateBulletController.js.map