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
    this.WYd = 0;
    this.Rdt = undefined;
    this.QYd = undefined;
    this.KYd = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.XYd = false;
    this.YYd = (t, i) => {
      this.zYd(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
  }
  OnInitData() {
    super.OnInitData();
    this.ListenForTagAddOrRemoveChanged(countDownTag, this.YYd);
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
    this.QYd = this.GetTexture(1);
    this.RefreshBarPercent(true);
    this.zYd(this.TagComponent.HasTag(countDownTag), true);
    this.JYd(0, true);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var i = Math.floor(i * 3);
    this.ZYd(i, t);
  }
  ZYd(t, i = false) {
    if (t !== this.WYd || i) {
      var s = this.WYd;
      this.WYd = t;
      if (s > this.WYd) {
        for (let t = this.WYd; t < s; t++) {
          this.StopTweenAnim(5 + t * 2);
          this.PlayTweenAnim(6 + t * 2);
        }
      } else {
        for (let t = s; t < this.WYd; t++) {
          this.StopTweenAnim(6 + t * 2);
          this.PlayTweenAnim(5 + t * 2);
        }
      }
    }
  }
  zYd(t, i = false) {
    if (this.XYd !== t || !!i) {
      this.XYd = t;
    }
  }
  JYd(t = 0, i = false) {
    if (i) {
      this.KYd = t;
      this.QYd.SetFillAmount(t);
    } else if (this.KYd !== t) {
      this.QYd.SetFillAmount(t);
      if (t <= 0 && this.KYd > 0) {
        this.StopTweenAnim(11);
        this.PlayTweenAnim(12);
      } else if (t > 0 && this.KYd <= 0) {
        this.StopTweenAnim(12);
        this.PlayTweenAnim(11);
      }
      this.KYd = t;
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
    if (this.XYd) {
      if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
        this.tst();
      }
      if (this.bst) {
        this.JYd(this.bst.GetRemainDuration() / this.bst.Duration);
      }
    } else {
      this.JYd(0);
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