"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataMain = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
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
const RADIUS_MAX = 2000;
const SIZE_MAX = 4000;
const TRACE_RADIUS_MAX = 300;
const TRACE_SIZE_MAX = 600;
class BulletDataMain {
  constructor(t, e) {
    this.Data = t;
    this.BulletRowName = e;
    this.BulletFName = t.子弹名称;
    this.BulletName = t.子弹名称?.toString();
    this.Base = new BulletDataBase_1.BulletDataBase(t.基础设置);
    this.Logic = new BulletDataLogic_1.BulletDataLogic(t.逻辑设置.预设);
    this.Aimed = new BulletDataAimed_1.BulletDataAimed(t.瞄准设置);
    this.Move = new BulletDataMove_1.BulletDataMove(t.移动设置);
    this.Render = new BulletDataRender_1.BulletDataRender(t.表现效果设置);
    this.TimeScale = new BulletDataTimeScale_1.BulletDataTimeScale(t.时间膨胀);
    this.Execution = new BulletDataExecution_1.BulletDataExecution(t.执行逻辑);
    this.Scale = new BulletDataScale_1.BulletDataScale(t.缩放设置);
    this.Summon = new BulletDataSummon_1.BulletDataSummon(t.召唤实体);
    this.Children = new Array();
    var a = t.子子弹设置.Num();
    for (let e = 0; e < a; e++) {
      var l = t.子子弹设置.Get(e);
      this.Children.push(new BulletDataChild_1.BulletDataChild(l));
    }
    this.Obstacle = new BulletDataObstacle_1.BulletDataObstacle(t.障碍检测);
    this.Interact = new BulletDataInteract_1.BulletDataInteract(t.环境交互);
    this.SimpleBullet = BulletDataMain.U8o(this);
  }
  static U8o(e) {
    var t = e.Base;
    return !(t.SpecialParams.size > 0) && t.BornPositionStandard === 0 && t.BlackboardKey === BulletDataMain.A8o && !!t.CenterOffset.IsZero() && !!t.BornPositionRandom.IsZero() && !!t.Rotator.IsNearlyZero() && !!t.BornDistLimit.IsZero() && !(t.CollisionActiveDuration > 0) && !(t.CollisionActiveDelay > 0) && t.HitType === 2 && t.DaHitTypePreset === BulletDataMain.A8o && !t.HitConditionTagId && !t.BanHitTagId && t.VictimCount === -1 && t.HitCountPerVictim === -1 && t.HitCountMax === -1 && !(t.Interval > 0) && !t.ShareCounter && t.HitEffectWeakness !== FNameUtil_1.FNameUtil.EMPTY && !!t.AttackDirection.IsNearlyZero() && !t.DestroyOnSkillEnd && !t.BornRequireTagIds && !t.BornForbidTagIds && !t.ContinuesCollision && !t.StickGround && !t.IgnoreGradient && t.SyncType === 0 && !t.TagId && !e.Aimed.AimedCtrlDir && !(e.Move.Speed > 0) && e.Move.FollowType === 1 && (t = e.Execution).SendGameplayEventTagToAttackerOnStart.TagName.length === 0 && t.SendGameplayEventTagToAttacker.TagName.length === 0 && t.SendGameplayEventTagToVictim.TagName.length === 0 && t.SendGameplayEventTagToAttackerOnEnd.TagName.length === 0 && !(t.SendGeIdToAttacker.length > 0) && !(t.SendGeIdToVictim.length > 0) && !(t.EnergyRecoverGeIds.length > 0) && !(t.SendGeIdToRoleInGame.length > 0) && !(t.GeIdApplyToVictim.length > 0) && (!t.GbDataList || !(t.GbDataList.length > 0)) && (t = e.Scale).SizeScale === Vector_1.Vector.OneVectorProxy && !t.ScaleCurve && !t.ShapeSwitch && !(e.Summon.EntityId > 0) && !(e.Children.length > 0) && !!e.Obstacle.Center.IsZero() && !(e.Obstacle.Radius > 0) && e.Interact.SceneInteract === BulletDataMain.A8o;
  }
  CheckValid() {
    return !!this.Logic?.Data && (this.P8o(), this.Yz(), this.x8o(), true);
  }
  P8o() {
    switch (this.Base.Shape) {
      case 0:
        this.Base.IsOversizeForTrace = this.Base.Size.GetMax() > TRACE_SIZE_MAX;
        break;
      case 1:
        this.Base.IsOversizeForTrace = this.Base.Size.X > TRACE_RADIUS_MAX;
        break;
      case 2:
      case 3:
        this.Base.IsOversizeForTrace = this.Base.Size.X > TRACE_RADIUS_MAX || this.Base.Size.Z > TRACE_SIZE_MAX;
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 4:
        break;
      default:
        this.Base.IsOversizeForTrace = this.Base.Size.GetMax() > TRACE_SIZE_MAX;
    }
    return this.Base.IsOversizeForTrace;
  }
  Yz() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      switch (this.Base.Shape) {
        case 0:
          if (this.Base.Size.GetMax() > SIZE_MAX) {
            this.w8o("子弹大小超过20米，会引起性能问题");
          }
          break;
        case 1:
          if (this.Base.Size.X > RADIUS_MAX) {
            this.w8o("子弹半径超过10米，会引起性能问题");
          }
          break;
        case 2:
        case 3:
          if (this.Base.Size.X > RADIUS_MAX) {
            this.w8o("子弹半径超过10米，会引起性能问题");
          }
          if (this.Base.Size.Z > SIZE_MAX) {
            this.w8o("子弹大小超过20米，会引起性能问题");
          }
          break;
        case 4:
          if (this.Base.Size.Z > RADIUS_MAX) {
            this.w8o("子弹半径超过10米，会引起性能问题");
          }
          break;
        case 6:
        case 7:
        case 8:
        case 9:
          break;
        default:
          if (this.Base.Size.GetMax() > SIZE_MAX) {
            this.w8o("子弹大小超过20米，会引起性能问题");
          }
      }
    }
  }
  x8o() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && this.Obstacle.Radius > TRACE_RADIUS_MAX) {
      this.w8o("障碍检测配置的检测距离超过3米，会引起性能问题");
    }
  }
  w8o(e) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Bullet", 17, "子弹配置非法", ["", e], ["", this.BulletRowName], ["", this.BulletName]);
    }
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