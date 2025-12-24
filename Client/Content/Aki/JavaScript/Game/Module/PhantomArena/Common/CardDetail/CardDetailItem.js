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
const CardDetailActiveSkillItem_1 = require("./CardDetailActiveSkillItem");
const CardDetailAttributeItem_1 = require("./CardDetailAttributeItem");
const CardDetailAttributeLayoutItem_1 = require("./CardDetailAttributeLayoutItem");
const CardDetailDurationItem_1 = require("./CardDetailDurationItem");
const CardDetailFactorDescLayoutItem_1 = require("./CardDetailFactorDescLayoutItem");
const CardDetailLockItem_1 = require("./CardDetailLockItem");
const CardDetailPassiveSkillItem_1 = require("./CardDetailPassiveSkillItem");
const CardDetailRemainRoundItem_1 = require("./CardDetailRemainRoundItem");
const CardDetailTaskDescItem_1 = require("./CardDetailTaskDescItem");
class CardDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.nvt = undefined;
    this.CA1 = undefined;
    this.BTu = undefined;
    this.Wqm = undefined;
    this.Qqm = undefined;
    this.fuo = undefined;
    this.hFm = undefined;
    this.BQm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UILayoutBase], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
  }
  async ou_() {
    this.BTu = new CardDetailTaskDescItem_1.CardDetailTaskDescItem();
    await this.BTu.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
  }
  async Kqm() {
    this.Wqm = new CardDetailActiveSkillItem_1.CardDetailActiveSkillItem();
    await this.Wqm.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  async Xqm() {
    this.Qqm = new CardDetailPassiveSkillItem_1.CardDetailPassiveSkillItem();
    await this.Qqm.CreateThenShowByActorAsync(this.GetItem(16).GetOwner());
  }
  async B1h() {
    this.fuo = new CardDetailLockItem_1.CardDetailLockItem();
    await this.fuo.CreateThenShowByActorAsync(this.GetItem(17).GetOwner());
  }
  async lFm() {
    this.hFm = new CardDetailDurationItem_1.CardDetailDurationItem();
    await this.hFm.CreateThenShowByActorAsync(this.GetItem(18).GetOwner());
  }
  async kQm() {
    this.BQm = new CardDetailRemainRoundItem_1.CardDetailRemainRoundItem();
    await this.BQm.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.ou_(), this.Kqm(), this.Xqm(), this.B1h(), this.lFm(), this.kQm()]);
  }
  OnStart() {
    this.nvt = new CardDetailAttributeLayoutItem_1.CardDetailAttributeLayoutItem(this.GetMultiTemplateLayout(1), this.GetItem(2));
    this.CA1 = new CardDetailFactorDescLayoutItem_1.CardDetailFactorDescLayoutItem(this.GetLayoutBase(6), this.GetItem(7));
    this.GetItem(19).SetUIActive(false);
  }
  Refresh(t) {
    this.Pe = t;
    this.RefreshName();
    this.RefreshAttributeLayout(t.AttributeData);
    this.RefreshCardDesc(t.CardDescriptionData);
    this.RefreshFactorDescLayout(t.FactorDataList);
    this.RefreshBgDescription();
    this.iOe(t.TaskData);
    this.pj1(t.ActiveSkillData);
    this.bwc(t.PassiveSkillData);
    this.Rxt(t.LockData);
    this._Fm(t.DurationData);
    this.qQm(t.RemainRoundData);
  }
  RefreshName() {
    if (this.Pe) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Pe.Name);
    }
  }
  RefreshAttributeLayout(t) {
    var i;
    var e;
    var s;
    if (t) {
      (i = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_COST_TEXT_ID;
      i.AttributeValue = t.Cost;
      i.IsHighLight = true;
      (e = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_ATTACK_TEXT_ID;
      e.AttributeValue = t.Attack;
      e.IsHighLight = false;
      (s = new CardDetailAttributeItem_1.CardDetailAttributeItemData()).AttributeName = PhantomArenaDefine_1.CARD_LIFE_TEXT_ID;
      s.AttributeValue = t.Life;
      s.IsHighLight = false;
      t = [i, e, s];
      this.nvt?.SetLayoutActive(true);
      this.nvt?.Refresh(t);
    } else {
      this.nvt?.SetLayoutActive(false);
    }
  }
  RefreshCardDesc(t) {
    if (t) {
      this.GetItem(3).SetUIActive(true);
      this.GetItem(4).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Description, ...t.DescriptionParams);
    } else {
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
    }
  }
  RefreshFactorDescLayout(t) {
    var i;
    if (t) {
      i = t.length > 0;
      this.GetItem(8).SetUIActive(i);
      this.GetLayoutBase(6).RootUIComp.SetUIActive(i);
      if (i) {
        this.CA1?.SetLayoutActive(true);
        this.CA1?.Refresh(t);
      }
    } else {
      this.CA1?.SetLayoutActive(false);
      this.GetItem(8).SetUIActive(false);
    }
  }
  RefreshBgDescription() {
    var t;
    if (this.Pe) {
      if ((t = this.Pe.BgDescription) && !StringUtils_1.StringUtils.IsBlank(t)) {
        this.GetItem(10).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t);
      } else {
        this.GetItem(10).SetUIActive(false);
      }
    }
  }
  iOe(t) {
    if (t) {
      this.GetItem(11).SetUIActive(true);
      this.GetLayoutBase(13).RootUIComp.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "PhantomBattle_1081");
      this.BTu?.Refresh(t);
    } else {
      this.GetItem(11).SetUIActive(false);
      this.GetLayoutBase(13).RootUIComp.SetUIActive(false);
    }
  }
  pj1(t) {
    if (t) {
      this.GetItem(15).SetUIActive(true);
      this.Wqm?.Refresh(t);
    } else {
      this.GetItem(15).SetUIActive(false);
    }
  }
  bwc(t) {
    if (t) {
      this.GetItem(16).SetUIActive(true);
      this.Qqm?.Refresh(t);
    } else {
      this.GetItem(16).SetUIActive(false);
    }
  }
  Rxt(t) {
    if (t) {
      this.GetItem(17).SetUIActive(true);
      this.fuo?.Refresh(t);
    } else {
      this.GetItem(17).SetUIActive(false);
    }
  }
  _Fm(t) {
    if (t) {
      this.GetItem(18).SetUIActive(true);
      this.hFm?.Refresh(t);
    } else {
      this.GetItem(18).SetUIActive(false);
    }
  }
  qQm(t) {
    if (t) {
      this.GetItem(19).SetUIActive(true);
      this.BQm?.Refresh(t);
    } else {
      this.GetItem(19).SetUIActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t && !(t.length <= 0)) {
      if ((i = t[0]) === "CardEffect") {
        return this.CA1?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (i === "CardAttr") {
        if (t = this.GetMultiTemplateLayout(1)?.GetRootComponent()) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (i === "Task" && (t = this.BTu?.GetRootItem())) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.CardDetailItem = CardDetailItem;
//# sourceMappingURL=CardDetailItem.js.map