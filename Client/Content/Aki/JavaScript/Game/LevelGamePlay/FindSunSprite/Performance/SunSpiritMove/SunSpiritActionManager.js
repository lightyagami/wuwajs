"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritActionManager = undefined;
const EntitiyRunAction_1 = require("../../../Common/GameplayAction/ActionImplement/EntitiyRunAction");
const EntityJumpFixTimeAction_1 = require("../../../Common/GameplayAction/ActionImplement/EntityJumpFixTimeAction");
const NpcPlayMontageAction_1 = require("../../../Common/GameplayAction/ActionImplement/NpcPlayMontageAction");
const NpcStopMontageAction_1 = require("../../../Common/GameplayAction/ActionImplement/NpcStopMontageAction");
const WaitAction_1 = require("../../../Common/GameplayAction/ActionImplement/WaitAction");
const GameplayActionGroup_1 = require("../../../Common/GameplayAction/GameplayActionGroup");
const GameplayActionManager_1 = require("../../../Common/GameplayAction/GameplayActionManager");
const SunSpiritActionTicker_1 = require("./SunSpiritActionTicker");
class SunSpiritActionManager extends GameplayActionManager_1.GameplayActionManager {
  constructor() {
    super(...arguments);
    this.H4f = undefined;
    this.j4f = undefined;
    this.$4f = undefined;
    this.W4f = undefined;
    this.Q4f = 0;
    this.fMg = undefined;
    this.gMg = undefined;
    this.CMg = undefined;
  }
  InitByConfig(i) {
    this.H4f = i.跳跃蒙太奇;
    this.j4f = {
      RotateSpeed: i.跳跃旋转速度,
      JumpTime: i.跳跃时间,
      MoveBaseHeightOffset: i.跳跃高度偏移基准,
      MaxRiseHeightEdge: Math.abs(i.跳跃上升偏移曲线高度范围),
      MaxFallHeightEdge: Math.abs(i.跳跃下降偏移曲线高度范围),
      MoveRiseCurve: i.跳跃上升偏移曲线,
      MoveFallCurve: i.跳跃下降偏移曲线
    };
    this.$4f = i.奔跑蒙太奇;
    this.W4f = {
      RotateSpeed: i.奔跑旋转速度,
      MoveSpeed: i.奔跑移动速度
    };
    this.Q4f = i.奔跑结束停顿时间;
    this.fMg = i.寻路失败蒙太奇;
    this.gMg = i.到达终点蒙太奇;
    this.CMg = i.终点待机蒙太奇;
    this.Init(new SunSpiritActionTicker_1.SunSpiritActionTicker());
  }
  Clear() {
    super.Clear();
    this.H4f = undefined;
    this.j4f = undefined;
    this.$4f = undefined;
    this.W4f = undefined;
    this.fMg = undefined;
    this.gMg = undefined;
    this.CMg = undefined;
  }
  ExecuteSunSpiritMove(i, t) {
    if (i.length <= 0) {
      t();
    } else {
      var e = [];
      for (const o of i) {
        for (const n of this.pMg(o)) {
          e.push(n);
        }
      }
      this.ExecuteActionGroups(e, t);
    }
  }
  ExecuteSunSpiritFail(i, t) {
    var e = [];
    var o = new GameplayActionGroup_1.GameplayActionGroup();
    var n = new NpcPlayMontageAction_1.NpcPlayMontageAction();
    n.Init(i, this.fMg, false);
    o.PushAction(n);
    e.push(o);
    this.ExecuteActionGroups(e, t);
  }
  ExecuteSunSpiritStopEndMontage(i) {
    var t = [];
    var e = new GameplayActionGroup_1.GameplayActionGroup();
    var o = new NpcStopMontageAction_1.NpcStopMontageAction();
    o.Init(i, this.CMg);
    e.PushAction(o);
    t.push(e);
    this.ExecuteActionGroups(t);
  }
  pMg(i) {
    var t;
    var e;
    var o;
    var n = i.MoveTarget;
    var a = i.PerformType;
    var c = [];
    if (a === 1) {
      e = new GameplayActionGroup_1.GameplayActionGroup();
      (o = new EntitiyRunAction_1.EntityRunAction()).Init(n, this.W4f, i.TargetLocation, i.TargetRotator);
      e.PushAction(o);
      (o = new NpcPlayMontageAction_1.NpcPlayMontageAction()).Init(n, this.$4f, true);
      e.PushAction(o);
      c.push(e);
      if ((o = this.Q4f) > 0) {
        e = new GameplayActionGroup_1.GameplayActionGroup();
        (t = new WaitAction_1.WaitAction()).Init(o);
        e.PushAction(t);
        c.push(e);
      }
    } else if (a === 0) {
      o = new GameplayActionGroup_1.GameplayActionGroup();
      (t = new EntityJumpFixTimeAction_1.EntityJumpFixTimeAction()).Init(n, this.j4f, i.TargetLocation, i.TargetRotator);
      o.PushAction(t);
      (e = new NpcPlayMontageAction_1.NpcPlayMontageAction()).Init(n, this.H4f, false);
      o.PushAction(e);
      c.push(o);
    }
    if (i.SuccessPerform) {
      a = new GameplayActionGroup_1.GameplayActionGroup();
      (t = new NpcPlayMontageAction_1.NpcPlayMontageAction()).Init(n, this.gMg, false);
      a.PushAction(t);
      c.push(a);
      e = new GameplayActionGroup_1.GameplayActionGroup();
      (o = new NpcPlayMontageAction_1.NpcPlayMontageAction()).Init(n, this.CMg, true, false);
      e.PushAction(o);
      c.push(e);
    }
    return c;
  }
}
exports.SunSpiritActionManager = SunSpiritActionManager;
//# sourceMappingURL=SunSpiritActionManager.js.map