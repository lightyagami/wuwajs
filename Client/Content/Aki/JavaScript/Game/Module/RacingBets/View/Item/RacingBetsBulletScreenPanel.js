"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsBulletScreenPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RacingBetsBulletScreenItem_1 = require("./RacingBetsBulletScreenItem");
class RacingBetsBulletScreenPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ue1 = 0;
    this.Be1 = 0;
    this.ke1 = 80;
    this.Oe1 = 200;
    this.qe1 = 0.2;
    this.Ge1 = 5;
    this.Fe1 = 0;
    this.TDe = undefined;
    this.Ne1 = new Map();
    this.Ve1 = 0;
    this.je1 = [];
    this.He1 = [];
    this.$e1 = [];
    this.Q01 = [];
    this.fGo = undefined;
    this.J_ = t => {
      this.We1(t);
      this.Fe1 += t;
      if (!(this.Fe1 < this.Oe1)) {
        if (this.Qe1()) {
          this.Fe1 %= this.Oe1;
          this.Ke1();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    var t;
    this.TDe = TimerSystem_1.FlowTimeTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME, 1, undefined, undefined, false);
    this.fGo = this.GetRootItem().GetAttachUIChild(0)?.GetOwner();
    if (this.fGo) {
      t = this.GetItem(0);
      this.Ue1 = t.GetHeight();
      this.Be1 = t.GetWidth();
      this.Ve1 = Math.floor(this.Ue1 / this.ke1);
      this.fGo.GetUIItem().SetUIActive(false);
    }
  }
  We1(t) {
    for (const e of this.je1) {
      e.MoveLeft(t * this.qe1);
      if (e.GetRootItem().GetAnchorOffsetX() < -e.GetBulletScreenItemWidth()) {
        this.Xe1(e);
      }
    }
  }
  async Ke1() {
    if (!(this.$e1.length <= 0) || !(this.Q01.length <= 0)) {
      let t = 0;
      let e = false;
      if (this.Q01.length > 0) {
        t = this.Q01.shift();
        e = true;
      } else {
        t = this.$e1.shift();
      }
      var i = await this.Ye1();
      i.RefreshUi(t, e);
      this.ze1(t, i);
      i.GetRootItem().SetUIActive(true);
      this.je1.push(i);
    }
  }
  Xe1(t) {
    this.je1.splice(this.je1.indexOf(t), 1);
    t.GetRootItem().SetUIActive(false);
    this.He1.push(t);
    for (var [e, i] of this.Ne1) {
      if (i === t) {
        this.Ne1.delete(e);
        break;
      }
    }
  }
  ze1(t, e) {
    var i = this.K01(t);
    var s = this.Je1(i);
    var t = this.ke1 * i - e.GetBulletScreenItemHeight();
    let r = 0;
    r = t <= 0 ? 0 : Math.random() * t - t / 2;
    e.GetRootItem().SetAnchorOffsetX(this.Be1);
    e.GetRootItem().SetAnchorOffsetY(-s * this.ke1 - r);
    for (let t = 0; t < i; t++) {
      this.Ne1.set(s + t, e);
    }
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Je1(e) {
    let t = 0;
    while (t < this.Ge1) {
      t++;
      var i = Math.floor(Math.random() * (this.Ve1 + 1 - e));
      if (this.X01(i, e)) {
        return i;
      }
    }
    for (let t = 0; t < this.Ve1; t++) {
      if (this.X01(t, e)) {
        return t;
      }
    }
    return 0;
  }
  Qe1() {
    let t = 0;
    if (this.Q01.length > 0) {
      t = this.Q01[0];
    } else {
      if (!(this.$e1.length > 0)) {
        return false;
      }
      t = this.$e1[0];
    }
    var e = this.K01(t);
    for (let t = 0; t < this.Ve1; t++) {
      if (this.X01(t, e)) {
        return true;
      }
    }
    return false;
  }
  X01(e, i) {
    for (let t = 0; t < i; t++) {
      if (!this.Ze1(e + t)) {
        return false;
      }
    }
    return true;
  }
  Ze1(t) {
    t = this.Ne1.get(t);
    return !t || t.GetRootItem().GetAnchorOffsetX() + t.GetBulletScreenItemWidth() < this.Be1;
  }
  async Ye1() {
    var t;
    var e;
    if (this.He1.length > 0) {
      return this.He1.pop();
    } else {
      t = this.et1().GetOwner();
      await (e = new RacingBetsBulletScreenItem_1.RacingBetsBulletScreenItem()).CreateThenShowByActorAsync(t);
      return e;
    }
  }
  K01(t) {
    if (ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreen(t).Type === 1) {
      return 2;
    } else {
      return 1;
    }
  }
  et1() {
    return LguiUtil_1.LguiUtil.CopyItem(this.fGo.GetUIItem(), this.GetRootItem());
  }
  SetBulletScreenShowType(t) {
    this.Ve1 = t === 2 ? Math.floor(this.Ue1 / this.ke1) : Math.floor(this.Ue1 / this.ke1 / 2);
  }
  PushBulletScreen(t, e) {
    if (e) {
      this.Q01.push(...t);
    } else {
      this.$e1 = t;
    }
  }
}
exports.RacingBetsBulletScreenPanel = RacingBetsBulletScreenPanel;
//# sourceMappingURL=RacingBetsBulletScreenPanel.js.map