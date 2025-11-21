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
    var i = r.CreateBulletRowName;
    if (i !== StringUtils_1.NONE_STRING) {
      var l = this.Bullet.GetBulletInfo();
      let t = undefined;
      if (e && e instanceof BulletHitActorData_1.BulletHitActorData) {
        t = e.Entity;
      }
      const n = r.FlashBulletRowName;
      if (n !== StringUtils_1.NONE_STRING) {
        e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(l.Attacker.Id);
        let i = false;
        var o = t.GetComponent(1);
        if (e && (0, RegisterComponent_1.isComponentInstance)(o, 3)) {
          const a = o?.Actor;
          if (a) {
            e.forEach((t, e, r) => {
              if (t.GetBulletInfo().BulletRowName === n && t.GetComponent(1).Owner.GetAttachParentActor() === a) {
                t.GetBulletInfo().GenerateTime = Time_1.Time.WorldTime;
                i = true;
              }
            });
          }
        }
        if (i) {
          return;
        }
      }
      var o = this.Bullet.GetBulletInfo().ContextId;
      var e = this.l7o(r.BulletTransform, t);
      var i = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(this.l7o(r.BulletOwner, t), i, e?.D_GetTransform() ?? MathUtils_1.MathUtils.DefaultTransform, {
        SkillId: l.BulletInitParams.SkillId,
        SkillContextId: l.BulletInitParams.SkillContextId,
        ParentVictimId: t?.Id,
        ParentTargetId: l.Target?.Id,
        ParentId: this.Bullet.Id,
        DtType: l.BulletInitParams.DtType,
        BattleFlags: l.BulletInitParams.BattleFlags,
        ParentIds: undefined
      }, o);
      if (i) {
        if ((e = i.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect) {
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(l, e);
        } else {
          o = r.AttachToBoneName;
          if ((l = this.l7o(r.AttachToActor, t)) && o !== StringUtils_1.NONE_STRING) {
            e = FNameUtil_1.FNameUtil.GetDynamicFName(o);
            r = i.GetComponent(173);
            o = l.Mesh;
            r.SetActorLocation(o.D_GetSocketLocation(e));
            r.SetAttachToComponent(o, e, 1, 0, 0, false);
            r.NeedDetach = true;
          }
        }
      }
    }
  }
  l7o(t, e) {
    switch (t) {
      case 1:
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
      case 2:
        var r = e.GetComponent(3);
        if (r) {
          r = r?.Actor;
          if (r?.IsValid()) {
            return r;
          }
        }
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
      default:
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
    }
  }
}
exports.BulletLogicCreateBulletController = BulletLogicCreateBulletController;
//# sourceMappingURL=BulletLogicCreateBulletController.js.map