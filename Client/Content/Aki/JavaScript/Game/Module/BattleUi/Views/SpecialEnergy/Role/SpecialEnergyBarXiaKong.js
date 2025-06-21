"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarXiaKong = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  SUMMON_NUM = 3,
  MAX_NUM = 2;
class SpecialEnergyBarXiaKong extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.pMc = void 0, this._ii = 0, this.wca = [], this.Bca = 0, this.tN1 = !1, this.iN1 = !1, this.rN1 = !1, this.hP1 = () => {
      this.qca()
    }, this.oN1 = (t, i) => {
      this.tN1 = i, this.qca()
    }, this.nN1 = (t, i) => {
      this.iN1 = i, this.qca()
    }, this.Zyn = (t, i) => {
      this.rN1 = i, this.qca()
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
      [13, UE.UIItem]
    ]
  }
  OnInitData() {
    super.OnInitData();
    var t = this.RoleData?.CreatureDataComponent;
    if (t) {
      var i = t.CustomServerEntityIds;
      for (let t = 0; t < SUMMON_NUM && !(t > i.length - 1); t++) {
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntity(i[t]);
        s?.IsInit ? this.wca.push(s) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 17, "夏空能量条读取幻影实体时异常", ["creatureDataId", i[t]])
      }
    }
  }
  AddEvents() {
    super.AddEvents();
    for (const t of this.wca) EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnSetActorHidden, this.hP1);
    this.ListenForTagAddOrRemoveChanged(420927313, this.oN1), this.ListenForTagAddOrRemoveChanged(791426644, this.nN1), this.ListenForTagAddOrRemoveChanged(-1572058059, this.Zyn)
  }
  RemoveEvents() {
    super.RemoveEvents();
    for (const t of this.wca) EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnSetActorHidden, this.hP1)
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem()), await Promise.all(t)
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot, this.pMc.InitData(this.RoleData, this.Config), this.pMc.ForceHideBottomLine = !0, await this.pMc.InitByActorAsync(this.GetItem(0).GetOwner())
  }
  OnStart() {
    this.InitTweenAnim(8), this.InitTweenAnim(9), this.InitTweenAnim(10), this.InitTweenAnim(11), this.InitTweenAnim(12), this.InitTweenAnim(13), this.OnBarPercentChanged(), this.tN1 = this.TagComponent?.HasTag(420927313) ?? !1, this.iN1 = this.TagComponent?.HasTag(791426644) ?? !1, this.rN1 = this.TagComponent?.HasTag(-1572058059) ?? !1, this.qca(!0)
  }
  OnBarPercentChanged() {
    this.Owt(this.GetKeyEnable() ? 1 : 0)
  }
  Owt(t, i = !1) {
    if (t !== this._ii || i) switch (this._ii = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "夏空能量条改变状态", ["满能量", t]), this._ii) {
      case 0:
        this.StopTweenAnim(8), this.PlayTweenAnim(9);
        break;
      case 1:
        this.StopTweenAnim(9), this.PlayTweenAnim(8)
    }
  }
  Tick(t) {
    super.Tick(t), this.pMc?.Tick(t)
  }
  qca(t = !1) {
    let i = 0;
    if (this.rN1) this.tN1 && i++, this.iN1 && i++;
    else {
      for (const s of this.wca)(s.Entity?.GetComponent(1))?.DisableActorHandle.Empty && i++;
      i = Math.min(i, MAX_NUM)
    }
    if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "【能量条】夏空幻影数量更新", ["", i]), this.Bca !== i || t) {
      if (i > this.Bca)
        for (let t = this.Bca; t < i; t++) 0 === t ? (this.StopTweenAnim(11), this.PlayTweenAnim(10)) : 1 === t && (this.StopTweenAnim(13), this.PlayTweenAnim(12));
      else
        for (let t = this.Bca - 1; t >= i; t--) 0 === t ? (this.StopTweenAnim(10), this.PlayTweenAnim(11)) : 1 === t && (this.StopTweenAnim(12), this.PlayTweenAnim(13));
      this.Bca = i
    }
  }
}
exports.SpecialEnergyBarXiaKong = SpecialEnergyBarXiaKong;
//# sourceMappingURL=SpecialEnergyBarXiaKong.js.map