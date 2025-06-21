"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailItem = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  CardDetailAttributeItem_1 = require("./CardDetailAttributeItem"),
  CardDetailAttributeLayoutItem_1 = require("./CardDetailAttributeLayoutItem"),
  CardDetailFactorDescLayoutItem_1 = require("./CardDetailFactorDescLayoutItem"),
  CardDetailTaskDescItem_1 = require("./CardDetailTaskDescItem");
class CardDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.nvt = void 0, this.jw1 = void 0, this.jcu = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIMultiTemplateLayout],
      [2, UE.UIItem],
      [4, UE.UILayoutBase],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [3, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UILayoutBase],
      [12, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.jcu = new CardDetailTaskDescItem_1.CardDetailTaskDescItem, await this.jcu.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())
  }
  OnStart() {
    this.nvt = new CardDetailAttributeLayoutItem_1.CardDetailAttributeLayoutItem(this.GetMultiTemplateLayout(1), this.GetItem(2)), this.jw1 = new CardDetailFactorDescLayoutItem_1.CardDetailFactorDescLayoutItem(this.GetLayoutBase(4), this.GetItem(5))
  }
  Refresh(t) {
    this.Pe = t, this.RefreshName(), this.RefreshAttributeLayout(), this.RefreshCardDesc(), this.RefreshFactorDescLayout(), this.RefreshBgDescription(), this.RefreshTask(t.TaskData)
  }
  RefreshName() {
    this.Pe && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Pe.Name)
  }
  RefreshAttributeLayout() {
    var t, e, i;
    this.Pe && ((t = new CardDetailAttributeItem_1.CardDetailAttributeItemData).AttributeName = PhantomArenaDefine_1.CARD_COST_TEXT_ID, t.AttributeValue = this.Pe.Cost, t.IsHighLight = !0, (e = new CardDetailAttributeItem_1.CardDetailAttributeItemData).AttributeName = PhantomArenaDefine_1.CARD_ATTACK_TEXT_ID, e.AttributeValue = this.Pe.Attack, e.IsHighLight = !1, (i = new CardDetailAttributeItem_1.CardDetailAttributeItemData).AttributeName = PhantomArenaDefine_1.CARD_LIFE_TEXT_ID, i.AttributeValue = this.Pe.Life, i.IsHighLight = !1, this.nvt?.Refresh([t, e, i]))
  }
  RefreshCardDesc() {
    this.Pe && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.CardDescription, ...this.Pe.CardDescriptionParams)
  }
  RefreshFactorDescLayout() {
    var t;
    this.Pe && (t = 0 < this.Pe.FactorDataList.length, this.GetItem(6).SetUIActive(t), this.GetLayoutBase(4).RootUIComp.SetUIActive(t), t) && this.jw1?.Refresh(this.Pe.FactorDataList)
  }
  RefreshBgDescription() {
    var t;
    this.Pe && ((t = this.Pe.BgDescription) && !StringUtils_1.StringUtils.IsBlank(t) ? (this.GetItem(8).SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t)) : this.GetItem(8).SetUIActive(!1))
  }
  RefreshTask(t) {
    t ? (this.GetItem(9).SetUIActive(!0), this.GetLayoutBase(11).RootUIComp.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "PhantomBattle_1081"), this.jcu?.Refresh(t)) : (this.GetItem(9).SetUIActive(!1), this.GetLayoutBase(11).RootUIComp.SetUIActive(!1))
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (t && !(t.length <= 0)) return "CardEffect" === (e = t[0]) ? this.jw1?.GetGuideUiItemAndUiItemForShowEx(t) : "CardAttr" === e ? (t = this.GetMultiTemplateLayout(1)?.GetRootComponent()) ? [t, t] : void 0 : "Task" === e && (t = this.jcu?.GetRootItem()) ? [t, t] : void 0
  }
}
exports.CardDetailItem = CardDetailItem;
//# sourceMappingURL=CardDetailItem.js.map