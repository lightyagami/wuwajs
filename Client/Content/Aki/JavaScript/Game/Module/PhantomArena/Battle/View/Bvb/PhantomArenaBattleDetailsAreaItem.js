"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDetailsAreaItem = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  PhantomArenaBattleDetailsTips_1 = require("../Panel/PhantomArenaBattleDetailsTips"),
  PhantomArenaBattleDetailsIconItem_1 = require("./PhantomArenaBattleDetailsIconItem");
class PhantomArenaBattleDetailsAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Layout = void 0, this.RoleItem = void 0, this.SkillItem = void 0, this.Proxy = void 0, this.IsOwn = !1, this.EntityIdList = [], this.IsBattleEnd = !1, this.DetailsTipsItem = void 0, this.n8i = () => {
      var t = new PhantomArenaBattleDetailsIconItem_1.PhantomArenaBattleDetailsMonsterItem;
      return t.IsOwn = this.IsOwn, t.OnClickCb = this.Cfu, t.RegisterProxy(this.Proxy), t
    }, this.Cfu = t => {
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(t);
      this.DetailsTipsItem.SetUiActive(!0), this.DetailsTipsItem.RefreshByCardData(t)
    }, this.pfu = () => {
      this.DetailsTipsItem.SetUiActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async bD1() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.n8i, this.GetItem(2).GetOwner()), await this.Layout.RefreshByDataAsync(this.EntityIdList)
  }
  async RD1() {
    this.RoleItem = new PhantomArenaBattleDetailsIconItem_1.PhantomArenaBattleDetailsRoleItem, this.RoleItem.RegisterViewProxy(this.Proxy), await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  async t1o() {
    this.SkillItem = new PhantomArenaBattleDetailsIconItem_1.PhantomArenaBattleDetailsSkillItem, await this.SkillItem.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())
  }
  async OnBeforeStartAsync() {
    await this.t1o(), await Promise.all([this.bD1(), this.RD1()]), this.SetSettlePoint(0), this.DetailsTipsItem = new PhantomArenaBattleDetailsTips_1.PhantomArenaBattleDetailsTips, await this.DetailsTipsItem.CreateThenShowByResourceIdAsync("PnlCardTips", this.GetItem(4)), this.DetailsTipsItem.SetTipsActive(!1), this.DetailsTipsItem.SetUiActive(!1);
    var t = this.IsOwn ? 1 : 2,
      t = {
        AttachItem: this.GetItem(4),
        ShowType: t
      };
    this.DetailsTipsItem.SetTipsPosition(t), this.DetailsTipsItem.SetBtnMaskCallback(this.pfu)
  }
  RegisterProxy(t) {
    this.Proxy = t
  }
  SetSettlePoint(t) {
    this.SkillItem.RefreshSettlePointText(t)
  }
  TickMonster(t) {
    if (!this.IsBattleEnd)
      for (const e of this.Layout.GetLayoutItemList()) e.Tick(t)
  }
  GetBeforeDamage() {
    let t = 0;
    t += this.SkillItem.GetDamage();
    for (const e of this.Layout.GetLayoutItemList()) t += e.GetDamage();
    return t
  }
  GetPhantomAlive() {
    let t = 0;
    for (const e of this.Layout.GetLayoutItemList()) t += e.GetDamage();
    return 0 < t
  }
  StartShowWinAnim() {
    this.IsBattleEnd = !0;
    var t = this.Layout.GetLayoutItemList();
    this.SkillItem.ShowWinAnim();
    for (const e of t) e.ShowWinAnim()
  }
  StartAccumulate(t, e, i) {
    var s = this.Layout.GetLayoutItemList(),
      a = this.RoleItem.GetHeadLocation();
    this.SkillItem?.OnAccumulateEvent(a.X, a.Z, i);
    for (const h of s) h.OnAccumulateEvent(a.X, a.Z, t, e);
    TimerSystem_1.TimerSystem.Delay(() => {
      this.RoleItem?.OnAccumulateAfterEvent()
    }, 200)
  }
  GetHeadLocation() {
    return this.RoleItem.GetHeadLocation()
  }
  SetDamageTween(t, e) {
    this.RoleItem?.RefreshLifeAfterDamage(t, e)
  }
  SetHitNum(t) {
    this.RoleItem?.SetHitNum(t)
  }
}
exports.PhantomArenaBattleDetailsAreaItem = PhantomArenaBattleDetailsAreaItem;
//# sourceMappingURL=PhantomArenaBattleDetailsAreaItem.js.map