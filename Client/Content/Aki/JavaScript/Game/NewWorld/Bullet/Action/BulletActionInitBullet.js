"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInitBullet = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletActionBase_1 = require("./BulletActionBase");
const BULLET_TAG_PREFIX = "子弹.";
class BulletActionInitBullet extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e = this.BulletInfo;
    var l = e.BulletInitParams;
    var t = e.BulletDataMain;
    e.GenerateTime = Time_1.Time.WorldTime;
    e.PreContextId = l.FromRemote ? 0n : l.ContextId;
    e.ContextId = l.FromRemote ? l.ContextId : ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    ModelManager_1.ModelManager.CombatMessageModel?.OnBulletAdded(l.SkillContextId, e.ContextId, e.BulletRowName);
    var o = l.TargetId;
    e.TargetId = o;
    e.SetTargetById(o);
    var o = e.AttackerCreatureDataComp;
    if (o) {
      if (o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
        e.AttackerCamp = o.GetEntityCamp();
      } else {
        e.AttackerCamp = 0;
      }
      e.IsAutonomousProxy = e.AttackerActorComp.IsAutonomousProxy;
      e.AttackerPlayerId = o.GetPlayerId();
      e.SkillLevel = e.AttackerSkillComp?.GetSkillLevelBySkillInfoId(l.SkillId) ?? 0;
      o = t.Move;
      if (o.UpDownAngleLimit > 0) {
        var r = BulletUtil_1.BulletUtil.GetTargetLocation(e.TargetActorComp, FNameUtil_1.FNameUtil.GetDynamicFName(o.InitVelocityDirParam), e);
        if (r) {
          var _ = BulletPool_1.BulletPool.CreateVector();
          _.FromUeVector(r);
          var r = e.AttackerActorComp;
          var a = BulletPool_1.BulletPool.CreateVector();
          a.FromUeVector(r.ActorLocationProxy);
          a.SubtractionEqual(_);
          var r = a.Size();
          if (r > 0) {
            let l = false;
            if (e.AttackerMoveComp?.IsStandardGravity ?? true) {
              u = (u = a.Z) > 0 ? u : u * -1;
              if (o.UpDownAngleLimit < Math.asin(u / r) * MathCommon_1.MathCommon.RadToDeg) {
                l = true;
              }
            } else {
              u = a.DotProduct(e.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy);
              if (o.UpDownAngleLimit < Math.asin(u / r) * MathCommon_1.MathCommon.RadToDeg) {
                l = true;
              }
            }
            if (l) {
              e.SetTargetById(0);
            }
          }
          BulletPool_1.BulletPool.RecycleVector(a);
          BulletPool_1.BulletPool.RecycleVector(_);
        }
      }
      const i = t.Base.TagId;
      if (i > 0) {
        e.AddTagId(i);
      }
      o = t.Logic.PresentTagIds;
      for (const i of o) {
        e.AddTagId(i);
      }
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        if (i > 0) {
          this.O5o(i, l.BulletRowName, "子弹的'基础设置.子弹标签'中的值必须是以[子弹.]开头的");
        }
        for (const i of o) {
          if (i > 0) {
            this.O5o(i, l.BulletRowName, "子弹的'逻辑设置.预设.预设标签'中的值必须是以[子弹.]开头的");
          }
        }
      }
      var u = t.Base.Shape;
      var r = e.Size;
      var a = l.Size;
      if (a) {
        if (u === 3) {
          r.Set(a.X, 0, a.Z);
        } else {
          r.FromUeVector(a);
        }
      } else {
        r.FromUeVector(t.Base.Size);
      }
      e.Duration = t.Base.Duration;
      var _ = e.AdditionInfo;
      if (_?.Valid) {
        if (!(o = _.SizeScale).IsZero()) {
          r.MultiplyEqual(o);
        }
        e.Duration += _.DurationAddition;
      }
      e.BaseSize.FromUeVector(r);
      if (t.Children.length > 0) {
        BulletController_1.BulletController.AddSimpleAction(e, 10);
      }
      BulletController_1.BulletController.AddSimpleAction(e, 2);
      BulletController_1.BulletController.AddSimpleAction(e, 3);
      BulletController_1.BulletController.AddSimpleAction(e, 6);
      if (t.Summon.EntityId > 0) {
        BulletController_1.BulletController.AddSimpleAction(e, 12);
      }
      BulletController_1.BulletController.AddSimpleAction(e, 4);
      if (t.Logic.DestroyOnFrozen) {
        BulletController_1.BulletController.AddSimpleAction(e, 15);
      }
      BulletController_1.BulletController.AddSimpleAction(e, 7);
      if (t.Interact.IsSceneInteract) {
        BulletController_1.BulletController.AddSimpleAction(e, 18);
      }
      BulletController_1.BulletController.AddSimpleAction(e, 8);
      BulletController_1.BulletController.AddSimpleAction(e, 5);
      BulletController_1.BulletController.AddSimpleAction(e, 9);
    } else {
      BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, false);
    }
  }
  O5o(l, e, t) {
    l = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(l);
    if (!l?.startsWith(BULLET_TAG_PREFIX)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, t, ["BulletId", e], ["Tag", l]);
      }
    }
  }
}
exports.BulletActionInitBullet = BulletActionInitBullet;
//# sourceMappingURL=BulletActionInitBullet.js.map