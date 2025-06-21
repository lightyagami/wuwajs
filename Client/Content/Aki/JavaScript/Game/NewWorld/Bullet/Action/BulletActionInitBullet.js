"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletActionInitBullet = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletActionBase_1 = require("./BulletActionBase"),
  BULLET_TAG_PREFIX = "子弹.";
class BulletActionInitBullet extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e = this.BulletInfo,
      l = e.BulletInitParams,
      t = e.BulletDataMain,
      o = (e.GenerateTime = Time_1.Time.WorldTime, e.PreContextId = l.FromRemote ? 0n : l.ContextId, e.ContextId = l.FromRemote ? l.ContextId : ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(), ModelManager_1.ModelManager.CombatMessageModel?.OnBulletAdded(l.SkillContextId, e.ContextId, e.BulletRowName), l.TargetId),
      o = (e.TargetId = o, e.SetTargetById(o), e.AttackerCreatureDataComp);
    if (o) {
      o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player ? e.AttackerCamp = o.GetEntityCamp() : e.AttackerCamp = 0, e.IsAutonomousProxy = e.AttackerActorComp.IsAutonomousProxy, e.AttackerPlayerId = o.GetPlayerId(), e.SkillLevel = e.AttackerSkillComp?.GetSkillLevelBySkillInfoId(l.SkillId) ?? 0;
      o = t.Move;
      if (0 < o.UpDownAngleLimit) {
        var r = BulletUtil_1.BulletUtil.GetTargetLocation(e.TargetActorComp, FNameUtil_1.FNameUtil.GetDynamicFName(o.InitVelocityDirParam), e);
        if (r) {
          var _ = BulletPool_1.BulletPool.CreateVector(),
            r = (_.FromUeVector(r), e.AttackerActorComp),
            a = BulletPool_1.BulletPool.CreateVector(),
            r = (a.FromUeVector(r.ActorLocationProxy), a.SubtractionEqual(_), a.Size());
          if (0 < r) {
            let l = !1;
            e.AttackerMoveComp?.IsStandardGravity ?? !0 ? (u = 0 < (u = a.Z) ? u : -1 * u, o.UpDownAngleLimit < Math.asin(u / r) * MathCommon_1.MathCommon.RadToDeg && (l = !0)) : (u = a.DotProduct(e.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy), o.UpDownAngleLimit < Math.asin(u / r) * MathCommon_1.MathCommon.RadToDeg && (l = !0)), l && e.SetTargetById(0)
          }
          BulletPool_1.BulletPool.RecycleVector(a), BulletPool_1.BulletPool.RecycleVector(_)
        }
      }
      const i = t.Base.TagId;
      0 < i && e.AddTagId(i);
      o = t.Logic.PresentTagIds;
      for (const i of o) e.AddTagId(i);
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        0 < i && this.O5o(i, l.BulletRowName, "子弹的'基础设置.子弹标签'中的值必须是以[子弹.]开头的");
        for (const i of o) 0 < i && this.O5o(i, l.BulletRowName, "子弹的'逻辑设置.预设.预设标签'中的值必须是以[子弹.]开头的")
      }
      var u = t.Base.Shape,
        r = e.Size,
        a = l.Size,
        _ = (a ? 3 === u ? r.Set(a.X, 0, a.Z) : r.FromUeVector(a) : r.FromUeVector(t.Base.Size), e.Duration = t.Base.Duration, e.AdditionInfo);
      _?.Valid && ((o = _.SizeScale).IsZero() || r.MultiplyEqual(o), e.Duration += _.DurationAddition), 0 < t.Children.length && BulletController_1.BulletController.AddSimpleAction(e, 10), BulletController_1.BulletController.AddSimpleAction(e, 2), BulletController_1.BulletController.AddSimpleAction(e, 3), BulletController_1.BulletController.AddSimpleAction(e, 6), 0 < t.Summon.EntityId && BulletController_1.BulletController.AddSimpleAction(e, 12), BulletController_1.BulletController.AddSimpleAction(e, 4), t.Logic.DestroyOnFrozen && BulletController_1.BulletController.AddSimpleAction(e, 15), BulletController_1.BulletController.AddSimpleAction(e, 7), t.Interact.IsSceneInteract && BulletController_1.BulletController.AddSimpleAction(e, 18), BulletController_1.BulletController.AddSimpleAction(e, 8), BulletController_1.BulletController.AddSimpleAction(e, 5), BulletController_1.BulletController.AddSimpleAction(e, 9)
    } else BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, !1)
  }
  O5o(l, e, t) {
    l = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(l);
    l?.startsWith(BULLET_TAG_PREFIX) || Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 17, t, ["BulletId", e], ["Tag", l])
  }
}
exports.BulletActionInitBullet = BulletActionInitBullet;
//# sourceMappingURL=BulletActionInitBullet.js.map