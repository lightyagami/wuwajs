"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarZanni = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarZanniSlot_1 = require("./SpecialEnergyBarZanniSlot"),
  MORPH_CONFIG_ID = 150701;
class SpecialEnergyBarZanni extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.Yn1 = void 0, this.pMc = void 0, this.zn1 = void 0, this._ii = 0, this.bst = void 0, this.p2a = 0, this.Nml = !1, this.Jn1 = !1, this.Zn1 = (i, t) => {
      this.Owt(t ? 1 : 0, !1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [5, UE.UIItem],
      [6, UE.UIItem],
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem]
    ]
  }
  OnInitData() {
    this.Yn1 = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(MORPH_CONFIG_ID), this.AttributeId = this.Yn1.AttributeId, this.MaxAttributeId = this.Yn1.MaxAttributeId
  }
  AddEvents() {
    super.AddEvents(), this.ListenForTagAddOrRemoveChanged(157472352, this.Zn1)
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem()), await Promise.all(i)
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarZanniSlot_1.SpecialEnergyBarZanniSlot, this.pMc.InitData(this.RoleData, this.Config), this.pMc.ForceHideBottomLine = !0, this.pMc.BottomLineLight = this.GetItem(2), this.pMc.DarkItemList.push(this.GetItem(12)), this.pMc.DarkItemList.push(this.GetItem(13)), await this.pMc.InitByActorAsync(this.GetItem(0).GetOwner()), this.zn1 = new SpecialEnergyBarZanniSlot_1.SpecialEnergyBarZanniSlot, this.zn1.InitData(this.RoleData, this.Yn1), this.zn1.ForceHideBottomLine = !0, this.zn1.FullEffectWhenEnable = !0, await this.zn1.InitByActorAsync(this.GetItem(3).GetOwner())
  }
  OnStart() {
    this.InitTweenAnim(7), this.InitTweenAnim(8), this.InitTweenAnim(9), this.InitTweenAnim(10), this.InitTweenAnim(11), this.GetItem(6)?.SetAlpha(1), this._Oe(!0), this.OnBarPercentChanged()
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(11), super.ClearAllTweenAnim()
  }
  OnBarPercentChanged() {
    var i = this.PercentMachine.GetCurPercent(),
      i = (this.GetSprite(1)?.SetFillAmount(i), i >= this.Yn1.ExtraFloatParams[1]);
    this.Jn1 !== i && (this.Jn1 = i, this.PlayTweenAnim(i ? 9 : 10))
  }
  _Oe(i = !1) {
    this.TagComponent?.HasTag(157472352) ? this.Owt(1, i) : this.Owt(0, i)
  }
  Owt(i, t = !1) {
    if (i !== this._ii || t) switch (this._ii = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "赞妮能量条改变状态", ["强化", i]), this._ii) {
      case 0:
        t ? (this.GetItem(5)?.SetUIActive(!0), this.GetItem(6)?.SetUIActive(!1)) : this.PlayTweenAnim(8);
        break;
      case 1:
        t ? (this.GetItem(5)?.SetUIActive(!1), this.GetItem(6)?.SetUIActive(!0)) : this.PlayTweenAnim(7)
    }
  }
  Tick(i) {
    super.Tick(i), this.pMc?.Tick(i), this.zn1?.Tick(i), 0 === this._ii ? this.bMc(!1) : (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a) || this.tst(), this.bst && this.bMc(this.bst.GetRemainDuration() < this.Yn1.ExtraFloatParams[0]))
  }
  tst() {
    this.Yn1?.BuffId ? (this.bst = this.BuffComponent?.GetBuffById(this.Yn1.BuffId), this.p2a = this.bst?.Handle ?? 0) : (this.bst = void 0, this.p2a = 0)
  }
  bMc(i) {
    this.Nml !== i && ((this.Nml = i) ? this.PlayTweenAnim(11) : (this.StopTweenAnim(11), this.GetItem(6)?.SetAlpha(1)))
  }
}
exports.SpecialEnergyBarZanni = SpecialEnergyBarZanni;
//# sourceMappingURL=SpecialEnergyBarZanni.js.map