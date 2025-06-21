"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarKaTiXiYa = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarKaTiXiYaAdultSlot_1 = require("./SpecialEnergyBarKaTiXiYaAdultSlot"),
  SpecialEnergyBarKaTiXiYaSlot_1 = require("./SpecialEnergyBarKaTiXiYaSlot"),
  SpecialEnergyBarKaTiXiYaStar_1 = require("./SpecialEnergyBarKaTiXiYaStar"),
  ULTRA_CONFIG_ID = 140901,
  ANIM_DURATION = 500;
class SpecialEnergyBarKaTiXiYa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.Huu = void 0, this.$uu = void 0, this.Wuu = void 0, this.FA_ = [], this.Quu = !1, this.Kuu = !1, this.amu = !1, this.ac = 0, this.Gtr = 0, this.Xuu = 0, this.bst = void 0, this.p2a = 0, this.Nml = !1, this.Yuu = !1, this.Zyn = (i, t) => {
      this.zuu(t)
    }, this.Juu = (i, t) => {
      this.Zuu(t)
    }, this.hmu = (i, t) => {
      this.lmu(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem]
    ]
  }
  OnInitData() {
    this.Huu = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(ULTRA_CONFIG_ID), this.AttributeId = this.Huu.AttributeId, this.MaxAttributeId = this.Huu.MaxAttributeId
  }
  AddEvents() {
    super.AddEvents(), this.ListenForTagAddOrRemoveChanged(1907158625, this.Zyn), this.ListenForTagAddOrRemoveChanged(328684835, this.Juu), this.ListenForTagAddOrRemoveChanged(1623495273, this.hmu)
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()), await Promise.all(i)
  }
  async InitBarItem() {
    this.$uu = new SpecialEnergyBarKaTiXiYaSlot_1.SpecialEnergyBarKaTiXiYaSlot, this.$uu.InitData(this.RoleData, this.Config), this.$uu.UiKeyItem = this.GetItem(6), await this.$uu.InitByActorAsync(this.GetItem(0).GetOwner()), this.Wuu = new SpecialEnergyBarKaTiXiYaAdultSlot_1.SpecialEnergyBarKaTiXiYaAdultSlot, this.Wuu.InitData(this.RoleData, this.Huu), this.Wuu.ForceHideBottomLine = !0, await this.Wuu.InitByActorAsync(this.GetItem(3).GetOwner());
    var i = new SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar,
      i = (await i.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.FA_.push(i), new SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar);
    await i.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.FA_.push(i)
  }
  OnStart() {
    this.InitTweenAnim(7), this.InitTweenAnim(8), this.InitTweenAnim(9), this.InitTweenAnim(10), this.InitTweenAnim(11), this.InitTweenAnim(12), this.InitTweenAnim(13), this.InitTweenAnim(14), this.InitTweenAnim(15), this.InitTweenAnim(16), this.GetItem(0)?.SetAlpha(1), this.GetItem(1)?.SetAlpha(1), this.GetItem(17)?.SetAlpha(1), this.GetItem(2)?.SetAlpha(1), this.zuu(this.TagComponent?.HasTag(1907158625) ?? !1, !0), this.Zuu(this.TagComponent?.HasTag(328684835) ?? !1, !0), this.lmu(this.TagComponent?.HasTag(1623495273) ?? !1, !0), this._Oe(!0)
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(15), super.ClearAllTweenAnim()
  }
  zuu(i, t = !1) {
    i === this.Quu && !t || (this.Quu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅凭依状态", ["状态", i]), t) || this._Oe()
  }
  Zuu(i, t = !1) {
    i === this.Kuu && !t || (this.Kuu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅大小形态", ["大形态", i]), t) || this._Oe()
  }
  lmu(i, t = !1) {
    i === this.amu && !t || (this.amu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅大招变身技能期间", ["状态", i]), t) || this._Oe()
  }
  _Oe(i = !1) {
    let t = 0;
    if (this.Kuu || this.amu && this.Quu ? t = 1 : this.Quu && (t = 2), this.ac !== t || i) {
      if (this.ac = t, i) {
        switch (this.ac) {
          case 0:
            this.PlayTweenAnim(12);
            break;
          case 1:
            this.PlayTweenAnim(13);
            break;
          case 2:
            this.PlayTweenAnim(14)
        }
        this.Gtr = this.ac
      }
      this.GetItem(6)?.SetUIActive(1 !== this.ac), this.GetItem(0)?.SetUIActive(1 !== this.ac)
    }
  }
  ecu() {
    if (!(this.Gtr === this.ac || Time_1.Time.WorldTime < this.Xuu)) {
      switch (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅播放状态切换动画", ["当前状态", this.ac], ["旧状态", this.Gtr]), this.ac) {
        case 0:
          1 === this.Gtr ? this.PlayTweenAnim(8) : this.PlayTweenAnim(11);
          break;
        case 1:
          0 === this.Gtr ? this.PlayTweenAnim(7) : this.PlayTweenAnim(10);
          break;
        case 2:
          0 === this.Gtr ? this.PlayTweenAnim(14) : this.PlayTweenAnim(9)
      }
      this.Gtr = this.ac, this.Xuu = Time_1.Time.WorldTime + ANIM_DURATION
    }
  }
  Tick(i) {
    if (super.Tick(i), this.$uu?.Tick(i), this.Wuu?.Tick(i), this.ecu(), this.Quu)
      if (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a) || this.tst(), this.bst) {
        var t = this.bst.GetRemainDuration(),
          s = Math.ceil(t / this.bst.Duration * SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar.StarTotalNum);
        this.bMc(this.Kuu && t < this.Huu.ExtraFloatParams[0] && s <= 1);
        for (const h of this.FA_) h.SetStarNum(s)
      } else {
        this.bMc(!1);
        for (const a of this.FA_) a.SetStarNum(0)
      }
    else {
      this.bMc(!1);
      for (const e of this.FA_) e.SetStarNum(0)
    }
    for (const r of this.FA_) r.Tick(i)
  }
  tst() {
    this.Huu?.BuffId ? (this.bst = this.BuffComponent?.GetBuffById(this.Huu.BuffId), this.p2a = this.bst?.Handle ?? 0) : (this.bst = void 0, this.p2a = 0)
  }
  bMc(i) {
    this.Nml !== i && ((this.Nml = i) ? this.PlayTweenAnim(15) : (this.StopTweenAnim(15), this.GetItem(17)?.SetAlpha(1), this.GetItem(2)?.SetAlpha(1)))
  }
  OnBarPercentChanged() {
    var i = this.PercentMachine.GetCurPercent();
    this.tcu(1 <= i)
  }
  tcu(i) {
    this.Yuu !== i && (this.Yuu = i) && 1 === this.ac && this.PlayTweenAnim(16)
  }
}
exports.SpecialEnergyBarKaTiXiYa = SpecialEnergyBarKaTiXiYa;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYa.js.map