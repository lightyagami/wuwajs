"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const CardDetailAttributeItem_1 = require("./CardDetailAttributeItem");
const CardDetailAttributeLayoutItem_1 = require("./CardDetailAttributeLayoutItem");
const CardDetailFactorDescLayoutItem_1 = require("./CardDetailFactorDescLayoutItem");
const CardDetailTaskDescItem_1 = require("./CardDetailTaskDescItem");
class CardDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.nvt = undefined;
    this.CA1 = undefined;
    this.fTu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem], [4, UE.UILayoutBase], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [3, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UILayoutBase], [12, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.fTu = new CardDetailTaskDescItem_1.CardDetailTaskDescItem();
    await this.fTu.CreateThenShowByActorAsync(this.GetItem(12).GetOwner());
  }
  OnStart() {
    this.nvt = new CardDetailAttributeLayoutItem_1.CardDetailAttributeLayoutItem(this.GetMultiTemplateLayout(1), this.GetItem(2));
    this.CA1 = new CardDetailFactorDescLayoutItem_1.CardDetailFactorDescLayoutItem(this.GetLayoutBase(4), this.GetItem(5));
  }
  Refresh(t) {
    this.Pe = t;
    this.RefreshName();
    this.RefreshAttributeLayout();
    this.RefreshCardDesc();
    this.RefreshFactorDescLayout();
    this.RefreshBgDescription();
    this.RefreshTask(t.TaskData);
  }
  RefreshName() {
    if (this.Pe) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Pe.Name);
    }
  }
  RefreshAttributeLayout() {
    var t;
    var e;
    var i;
    if (this.Pe) {
      (t = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_COST_TEXT_ID;
      t.AttributeValue = this.Pe.Cost;
      t.IsHighLight = true;
      (e = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_ATTACK_TEXT_ID;
      e.AttributeValue = this.Pe.Attack;
      e.IsHighLight = false;
      (i = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_LIFE_TEXT_ID;
      i.AttributeValue = this.Pe.Life;
      i.IsHighLight = false;
      this.nvt?.Refresh([t, e, i]);
    }
  }
  RefreshCardDesc() {
    if (this.Pe) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.CardDescription, ...this.Pe.CardDescriptionParams);
    }
  }
  RefreshFactorDescLayout() {
    var t;
    if (this.Pe && (t = this.Pe.FactorDataList.length > 0, this.GetItem(6).SetUIActive(t), this.GetLayoutBase(4).RootUIComp.SetUIActive(t), t)) {
      this.CA1?.Refresh(this.Pe.FactorDataList);
    }
  }
  RefreshBgDescription() {
    var t;
    if (this.Pe) {
      if ((t = this.Pe.BgDescription) && !StringUtils_1.StringUtils.IsBlank(t)) {
        this.GetItem(8).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t);
      } else {
        this.GetItem(8).SetUIActive(false);
      }
    }
  }
  RefreshTask(t) {
    if (t) {
      this.GetItem(9).SetUIActive(true);
      this.GetLayoutBase(11).RootUIComp.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "PhantomBattle_1081");
      this.fTu?.Refresh(t);
    } else {
      this.GetItem(9).SetUIActive(false);
      this.GetLayoutBase(11).RootUIComp.SetUIActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (t && !(t.length <= 0)) {
      if ((e = t[0]) === "CardEffect") {
        return this.CA1?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (e === "CardAttr") {
        if (t = this.GetMultiTemplateLayout(1)?.GetRootComponent()) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (e === "Task" && (t = this.fTu?.GetRootItem())) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.CardDetailItem = CardDetailItem;
//# sourceMappingURL=CardDetailItem.js.map