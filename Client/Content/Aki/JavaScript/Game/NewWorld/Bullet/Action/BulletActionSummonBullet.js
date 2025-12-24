"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionSummonBullet = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonBullet extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.ChildInfo = undefined;
    this.L5o = undefined;
  }
  OnExecute() {
    var t;
    this.ChildInfo = this.BulletInfo.ChildInfo;
    if (this.ChildInfo) {
      this.L5o = this.BulletInfo.BulletDataMain.Children;
      if ((t = this.ActionInfo).IsStayInCharacter) {
        this.GVo(t);
      } else {
        this.NVo(t);
      }
    }
  }
  Clear() {
    super.Clear();
    this.ChildInfo = undefined;
    this.L5o = undefined;
  }
  NVo(e) {
    var i = this.L5o;
    var l = i.length;
    let s = undefined;
    for (let t = 0; t < l; ++t) {
      if (i[t].Condition === e.ChildrenType) {
        var r = i[t];
        if ((!(r.Num > 0) || this.ChildInfo.HaveSummonedBulletNumber[t] < r.Num) && Number(r.RowName) !== 0) {
          if (!s && e.ParentImpactPoint && e.ParentLastPosition) {
            o = BulletPool_1.BulletPool.CreateVector();
            h = BulletPool_1.BulletPool.CreateVector();
            o.FromUeVector(e.ParentImpactPoint);
            o.SubtractionEqual(e.ParentLastPosition);
            h.FromUeVector(this.BulletInfo.MoveInfo.BulletSpeedDir);
            h.Normalize();
            u = o.DotProduct(h);
            h.Multiply(u, o);
            e.ParentLastPosition.Addition(o, h);
            (s = this.BulletInfo.ActorComponent.ActorTransform).SetLocation(h.ToUeVector());
            BulletPool_1.BulletPool.RecycleVector(h);
            BulletPool_1.BulletPool.RecycleVector(o);
          }
          this.ChildInfo.HaveSummonedBulletNumber[t]++;
          var o;
          var h;
          var u = BulletController_1.BulletController.CreateBulletCustomTarget(this.BulletInfo.Attacker, r.RowName.toString(), s ?? this.BulletInfo.ActorComponent.ActorTransform, {
            SkillId: this.BulletInfo.BulletInitParams.SkillId,
            SkillContextId: this.BulletInfo.BulletInitParams.SkillContextId,
            ParentVictimId: e.Victim?.Id,
            ParentTargetId: this.BulletInfo.Target?.Id,
            ParentId: this.BulletInfo.Entity.Id,
            DtType: this.BulletInfo.BulletInitParams.DtType,
            CreateOnAuthority: e.CreateOnAuthority,
            BattleFlags: this.BulletInfo.BulletInitParams.BattleFlags,
            ParentIds: undefined
          }, this.BulletInfo.ContextId);
          if (u) {
            BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(this.BulletInfo, u);
          } else if (r.BreakOnFail) {
            return;
          }
        }
      }
    }
  }
  GVo(e) {
    var i = this.L5o.length;
    for (let t = 0; t < i; ++t) {
      var l = this.L5o[t];
      var s = t;
      if (l.Condition === 5 && (!(l.Num > 0) || !!(this.ChildInfo.HaveSummonedBulletNumber[s] < l.Num)) && !(this.BulletInfo.LiveTime < this.ChildInfo.HaveSummonedBulletNumber[s] * l.Interval * TimeUtil_1.TimeUtil.InverseMillisecond)) {
        this.ChildInfo.HaveSummonedBulletNumber[s]++;
        s = BulletController_1.BulletController.CreateBulletCustomTarget(this.BulletInfo.Attacker, l.RowName.toString(), this.BulletInfo.ActorComponent.ActorTransform, {
          SkillId: this.BulletInfo.BulletInitParams.SkillId,
          SkillContextId: this.BulletInfo.BulletInitParams.SkillContextId,
          ParentVictimId: e.Victim?.Id,
          ParentTargetId: this.BulletInfo.Target?.Id,
          ParentId: this.BulletInfo.Entity.Id,
          DtType: this.BulletInfo.BulletInitParams.DtType,
          CreateOnAuthority: e.CreateOnAuthority,
          BattleFlags: this.BulletInfo.BulletInitParams.BattleFlags,
          ParentIds: undefined
        }, this.BulletInfo.ContextId);
        if (s) {
          BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(this.BulletInfo, s);
        } else if (l.BreakOnFail) {
          return;
        }
      }
    }
  }
}
exports.BulletActionSummonBullet = BulletActionSummonBullet;
//# sourceMappingURL=BulletActionSummonBullet.js.map