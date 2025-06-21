"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarKanTeLeiLa = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarKanTeLeiLaSlot_1 = require("./SpecialEnergyBarKanTeLeiLaSlot"),
  NORMAL_CONFIG_ID = 160701,
  PINK_CONFIG_ID = 160702,
  COLORFUL_CONFIG_ID = 160703,
  POINT_NUM = 3;
class SpecialEnergyBarKanTeLeiLa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.fMc = void 0, this.gMc = void 0, this.CMc = void 0, this.pMc = void 0, this.vMc = void 0, this.yMc = void 0, this.SMc = [], this.MMc = [], this.HMc = 0, this._ii = 0, this.bst = void 0, this.p2a = 0, this.Nml = !1, this.eEc = !1, this.YN1 = !1, this.EMc = (i, t) => {
      this.YN1 = !0
    }, this.IMc = (i, t) => {
      this.YN1 = !0
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
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem]
    ]
  }
  OnInitData() {
    this.fMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(NORMAL_CONFIG_ID), this.gMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(PINK_CONFIG_ID), this.CMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(COLORFUL_CONFIG_ID)
  }
  AddEvents() {
    super.AddEvents(), this.ListenForTagAddOrRemoveChanged(-1737183401, this.EMc), this.ListenForTagAddOrRemoveChanged(-8248787, this.IMc)
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()), await Promise.all(i)
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot, this.pMc.InitData(this.RoleData, this.fMc), this.pMc.FullEffectForceDisable = !0, this.pMc.ForceHideBottomLine = !0, await this.pMc.InitByActorAsync(this.GetItem(10).GetOwner()), this.vMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot, this.vMc.InitData(this.RoleData, this.gMc), this.vMc.ForceHideBottomLine = !0, await this.vMc.InitByActorAsync(this.GetItem(11).GetOwner()), this.yMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot, this.yMc.InitData(this.RoleData, this.CMc), this.yMc.ForceHideBottomLine = !0, await this.yMc.InitByActorAsync(this.GetItem(12).GetOwner())
  }
  OnStart() {
    this.InitTweenAnim(13), this.InitTweenAnim(14), this.InitTweenAnim(15), this.InitTweenAnim(16), this.InitTweenAnim(17), this.InitTweenAnim(18), this.InitTweenAnim(19), this.InitTweenAnim(20), this.InitTweenAnim(21), this.InitTweenAnim(22), this.InitTweenAnim(24), this.SMc.push(this.GetItem(0)), this.SMc.push(this.GetItem(1)), this.SMc.push(this.GetItem(2)), this.MMc.push(this.GetItem(3)), this.MMc.push(this.GetItem(4)), this.MMc.push(this.GetItem(5)), this.GetItem(7)?.SetAlpha(1), this._Oe(!0), this.TMc(!0)
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(18), super.ClearAllTweenAnim()
  }
  OnAttributeChanged() {
    this.TMc()
  }
  OnMaxAttributeChanged() {}
  _Oe(i = !1) {
    var t = this.TagComponent?.HasTag(-8248787) ?? !1;
    this.TagComponent?.HasTag(-1737183401) ? t ? this.Owt(1, i) : this.Owt(2, i) : this.Owt(0, i), this.eEc === t && !i || (this.eEc = t, this.JRc(i))
  }
  JRc(i = !1) {
    var t = !this.eEc;
    i || 0 !== this._ii ? (this.GetItem(23)?.SetUIActive(t), this.GetItem(23)?.SetAlpha(t ? 1 : 0)) : t && this.PlayTweenAnim(24)
  }
  Owt(i, t = !1) {
    if (i !== this._ii || t) {
      var s = this._ii;
      switch (this._ii = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "坎特雷拉能量条改变状态", ["强化", i]), this._ii) {
        case 0:
          t ? (this.GetItem(6)?.SetUIActive(!0), this.GetItem(7)?.SetUIActive(!1)) : (this.StopTweenAnim(13), this.PlayTweenAnim(14), 2 === s && (this.StopTweenAnim(15), this.PlayTweenAnim(16)));
          break;
        case 1:
          this.GetItem(9)?.SetUIActive(!1), this.GetItem(8)?.SetUIActive(!0), this.GetItem(8)?.SetAlpha(1), t ? (this.GetItem(6)?.SetUIActive(!1), this.GetItem(7)?.SetUIActive(!0)) : 0 === s ? (this.StopTweenAnim(14), this.PlayTweenAnim(13), this.GetItem(9)?.SetUIActive(!1), this.GetItem(8)?.SetUIActive(!0)) : (this.StopTweenAnim(15), this.PlayTweenAnim(16));
          break;
        case 2:
          t ? (this.GetItem(6)?.SetUIActive(!1), this.GetItem(7)?.SetUIActive(!0), this.GetItem(9)?.SetUIActive(!0), this.GetItem(8)?.SetUIActive(!1)) : (0 === s && (this.StopTweenAnim(14), this.PlayTweenAnim(13), this.GetItem(9)?.SetUIActive(!0), this.GetItem(8)?.SetUIActive(!1)), this.StopTweenAnim(16), this.PlayTweenAnim(15))
      }
      t || 2 !== s && 2 !== this._ii || (this.TMc(!0), 2 === this._ii && this.PlayTweenAnim(19))
    }
  }
  TMc(i = !1) {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    if (i || this.HMc !== t) {
      for (let i = 0; i < POINT_NUM; i++) {
        var s = t > i,
          h = 2 === this._ii && t === POINT_NUM;
        this.SMc[i].SetUIActive(s && !h), this.MMc[i].SetUIActive(s && h), s && this.HMc <= i && this.PlayTweenAnim(20 + i)
      }
      t < this.HMc && this.PlayTweenAnim(17), this.HMc = t
    }
  }
  Tick(i) {
    super.Tick(i), this.pMc?.Tick(i), this.vMc?.Tick(i), this.yMc?.Tick(i), this.YN1 && (this._Oe(), this.YN1 = !1), 0 === this._ii ? this.bMc(!1) : (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a) || this.tst(), this.bst && this.bMc(this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0]))
  }
  tst() {
    this.Config?.BuffId ? (this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId), this.p2a = this.bst?.Handle ?? 0) : (this.bst = void 0, this.p2a = 0)
  }
  bMc(i) {
    this.Nml !== i && ((this.Nml = i) ? this.PlayTweenAnim(18) : (this.StopTweenAnim(18), this.GetItem(7)?.SetAlpha(1)))
  }
}
exports.SpecialEnergyBarKanTeLeiLa = SpecialEnergyBarKanTeLeiLa;
//# sourceMappingURL=SpecialEnergyBarKanTeLeiLa.js.map