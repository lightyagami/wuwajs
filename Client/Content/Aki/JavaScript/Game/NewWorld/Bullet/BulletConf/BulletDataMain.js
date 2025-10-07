"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataMain = undefined;
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const BulletDataAimed_1 = require("./BulletDataAimed");
const BulletDataBase_1 = require("./BulletDataBase");
const BulletDataChild_1 = require("./BulletDataChild");
const BulletDataExecution_1 = require("./BulletDataExecution");
const BulletDataInteract_1 = require("./BulletDataInteract");
const BulletDataLogic_1 = require("./BulletDataLogic");
const BulletDataMove_1 = require("./BulletDataMove");
const BulletDataObstacle_1 = require("./BulletDataObstacle");
const BulletDataRender_1 = require("./BulletDataRender");
const BulletDataScale_1 = require("./BulletDataScale");
const BulletDataSummon_1 = require("./BulletDataSummon");
const BulletDataTimeScale_1 = require("./BulletDataTimeScale");
class BulletDataMain {
  constructor(e, t) {
    this.Data = e;
    this.BulletRowName = t;
    this.BulletFName = e.子弹名称;
    this.BulletName = e.子弹名称?.toString();
    this.Base = new BulletDataBase_1.BulletDataBase(e.基础设置);
    this.Logic = new BulletDataLogic_1.BulletDataLogic(e.逻辑设置.预设);
    this.Aimed = new BulletDataAimed_1.BulletDataAimed(e.瞄准设置);
    this.Move = new BulletDataMove_1.BulletDataMove(e.移动设置);
    this.Render = new BulletDataRender_1.BulletDataRender(e.表现效果设置);
    this.TimeScale = new BulletDataTimeScale_1.BulletDataTimeScale(e.时间膨胀);
    this.Execution = new BulletDataExecution_1.BulletDataExecution(e.执行逻辑);
    this.Scale = new BulletDataScale_1.BulletDataScale(e.缩放设置);
    this.Summon = new BulletDataSummon_1.BulletDataSummon(e.召唤实体);
    this.Children = new Array();
    var a = e.子子弹设置.Num();
    for (let t = 0; t < a; t++) {
      var l = e.子子弹设置.Get(t);
      this.Children.push(new BulletDataChild_1.BulletDataChild(l));
    }
    this.Obstacle = new BulletDataObstacle_1.BulletDataObstacle(e.障碍检测);
    this.Interact = new BulletDataInteract_1.BulletDataInteract(e.环境交互);
    this.SimpleBullet = BulletDataMain.U8o(this);
  }
  static U8o(t) {
    var e = t.Base;
    return !(e.SpecialParams.size > 0) && e.BornPositionStandard === 0 && e.BlackboardKey === BulletDataMain.A8o && !!e.CenterOffset.IsZero() && !!e.BornPositionRandom.IsZero() && !!e.Rotator.IsNearlyZero() && !!e.BornDistLimit.IsZero() && !(e.CollisionActiveDuration > 0) && !(e.CollisionActiveDelay > 0) && e.HitType === 2 && e.DaHitTypePreset === BulletDataMain.A8o && !e.HitConditionTagId && !e.BanHitTagId && e.VictimCount === -1 && e.HitCountPerVictim === -1 && e.HitCountMax === -1 && !(e.Interval > 0) && !e.ShareCounter && e.HitEffectWeakness !== FNameUtil_1.FNameUtil.EMPTY && !!e.AttackDirection.IsNearlyZero() && !e.DestroyOnSkillEnd && !e.BornRequireTagIds && !e.BornForbidTagIds && !e.ContinuesCollision && !e.StickGround && !e.IgnoreGradient && e.SyncType === 0 && !e.TagId && !t.Aimed.AimedCtrlDir && !(t.Move.Speed > 0) && t.Move.FollowType === 1 && (e = t.Execution).SendGameplayEventTagToAttackerOnStart.TagName.length === 0 && e.SendGameplayEventTagToAttacker.TagName.length === 0 && e.SendGameplayEventTagToVictim.TagName.length === 0 && e.SendGameplayEventTagToAttackerOnEnd.TagName.length === 0 && !(e.SendGeIdToAttacker.length > 0) && !(e.SendGeIdToVictim.length > 0) && !(e.EnergyRecoverGeIds.length > 0) && !(e.SendGeIdToRoleInGame.length > 0) && !(e.GeIdApplyToVictim.length > 0) && (!e.GbDataList || !(e.GbDataList.length > 0)) && (e = t.Scale).SizeScale === Vector_1.Vector.OneVectorProxy && !e.ScaleCurve && !e.ShapeSwitch && !(t.Summon.EntityId > 0) && !(t.Children.length > 0) && !!t.Obstacle.Center.IsZero() && !(t.Obstacle.Radius > 0) && t.Interact.SceneInteract === BulletDataMain.A8o;
  }
  CheckValid() {
    return !!this.Logic?.Data;
  }
  Preload() {
    this.Base.Preload();
    this.Logic.Preload();
    this.Move.Preload();
    this.Execution.Preload();
    this.Scale.Preload();
    this.Obstacle.Preload();
  }
}
(exports.BulletDataMain = BulletDataMain).A8o = "None";
//# sourceMappingURL=BulletDataMain.js.map