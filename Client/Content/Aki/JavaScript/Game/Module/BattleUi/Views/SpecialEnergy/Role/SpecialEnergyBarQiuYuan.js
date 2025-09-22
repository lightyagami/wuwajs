"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarQiuYuan = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const countDownTag = 868371950;
class SpecialEnergyBarQiuYuan extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.n7d = 0;
    this.Rdt = undefined;
    this.s7d = undefined;
    this.a7d = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.h7d = false;
    this.l7d = (t, i) => {
      this._7d(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
  }
  OnInitData() {
    super.OnInitData();
    this.ListenForTagAddOrRemoveChanged(countDownTag, this.l7d);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot();
    this.Rdt.InitData(this.RoleData, this.Config);
    this.Rdt.ForceHideBottomLine = true;
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(5);
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.InitTweenAnim(12);
    this.s7d = this.GetTexture(1);
    this.RefreshBarPercent(true);
    this._7d(this.TagComponent.HasTag(countDownTag), true);
    this.u7d(0, true);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var i = Math.floor(i * 3);
    this.c7d(i, t);
  }
  c7d(t, i = false) {
    if (t !== this.n7d || i) {
      var s = this.n7d;
      this.n7d = t;
      if (s > this.n7d) {
        for (let t = this.n7d; t < s; t++) {
          this.StopTweenAnim(5 + t * 2);
          this.PlayTweenAnim(6 + t * 2);
        }
      } else {
        for (let t = s; t < this.n7d; t++) {
          this.StopTweenAnim(6 + t * 2);
          this.PlayTweenAnim(5 + t * 2);
        }
      }
    }
  }
  _7d(t, i = false) {
    if (this.h7d !== t || !!i) {
      this.h7d = t;
    }
  }
  u7d(t = 0, i = false) {
    if (i) {
      this.a7d = t;
      this.s7d.SetFillAmount(t);
    } else if (this.a7d !== t) {
      this.s7d.SetFillAmount(t);
      if (t <= 0 && this.a7d > 0) {
        this.StopTweenAnim(11);
        this.PlayTweenAnim(12);
      } else if (t > 0 && this.a7d <= 0) {
        this.StopTweenAnim(12);
        this.PlayTweenAnim(11);
      }
      this.a7d = t;
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
    if (this.h7d) {
      if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
        this.tst();
      }
      if (this.bst) {
        this.u7d(this.bst.GetRemainDuration() / this.bst.Duration);
      }
    } else {
      this.u7d(0);
    }
  }
  tst() {
    if (this.Config?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
}
exports.SpecialEnergyBarQiuYuan = SpecialEnergyBarQiuYuan;
//# sourceMappingURL=SpecialEnergyBarQiuYuan.js.map