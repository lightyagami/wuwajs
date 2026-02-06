"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionChild = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletChildInfo_1 = require("../Model/BulletChildInfo");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionChild extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.ChildInfo = undefined;
    this.L5o = undefined;
  }
  OnExecute() {
    this.ChildInfo = new BulletChildInfo_1.BulletChildInfo();
    this.BulletInfo.ChildInfo = this.ChildInfo;
    this.ChildInfo.HaveSummonedBulletNumber = [];
    this.L5o = this.BulletInfo.BulletDataMain.Children;
    var i = this.L5o.length;
    for (let t = 0; t < i; t++) {
      this.ChildInfo.HaveSummonedBulletNumber.push(0);
    }
    this.D5o();
  }
  Clear() {
    super.Clear();
    this.ChildInfo = undefined;
    this.L5o = undefined;
  }
  D5o() {
    for (const t of this.L5o) {
      if (t.Condition === 2) {
        this.ChildInfo.HaveSpecialChildrenBullet = true;
        return;
      }
    }
  }
  OnTick(t) {
    if (!this.BulletInfo.NeedDestroy) {
      this.R5o();
    }
  }
  R5o() {
    var i = this.L5o.length;
    for (let t = 0; t < i; ++t) {
      var e = this.L5o[t];
      var l = t;
      if (!(e.RowName <= MathCommon_1.MathCommon.KindaSmallNumber) && e.Condition === 0 && (!(e.Num > 0) || !!(this.ChildInfo.HaveSummonedBulletNumber[l] < e.Num)) && !(e.Delay < 0 && Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "子弹Delay为负数！", ["Bullet", this.BulletInfo.BulletRowName]), this.BulletInfo.LiveTime < e.Delay * TimeUtil_1.TimeUtil.InverseMillisecond + this.ChildInfo.HaveSummonedBulletNumber[l] * e.Interval * TimeUtil_1.TimeUtil.InverseMillisecond)) {
        this.ChildInfo.HaveSummonedBulletNumber[l]++;
        l = BulletController_1.BulletController.CreateBulletCustomTarget(this.BulletInfo.Attacker, e.RowName.toString(), this.BulletInfo.ActorComponent.ActorTransform, {
          SkillId: this.BulletInfo.BulletInitParams.SkillId,
          SkillContextId: this.BulletInfo.BulletInitParams.SkillContextId,
          ParentTargetId: this.BulletInfo.Target?.Id,
          ParentId: this.BulletInfo.Entity.Id,
          DtType: this.BulletInfo.BulletInitParams.DtType,
          BattleContext: this.BulletInfo.BulletInitParams.BattleContext,
          ParentIds: undefined
        }, this.BulletInfo.ContextId);
        if (l) {
          BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(this.BulletInfo, l);
        } else if (e.BreakOnFail) {
          return;
        }
      }
    }
  }
}
exports.BulletActionChild = BulletActionChild;
//# sourceMappingURL=BulletActionChild.js.map