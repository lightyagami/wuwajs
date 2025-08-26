"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsTips = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const DynamicMaskButton_1 = require("../../../../DynamicMask/DynamicMaskButton");
const CardDetailEntryDescLayoutItem_1 = require("../../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailFactorDescItem_1 = require("../../../Common/CardDetail/CardDetailFactorDescItem");
const CardDetailItem_1 = require("../../../Common/CardDetail/CardDetailItem");
class PhantomArenaBattleDetailsTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DetailItem = undefined;
    this.EntryDescLayoutItem = undefined;
    this.Sequence = undefined;
    this.MaskButton = undefined;
    this.MaskAttach = undefined;
    this.IsEntryShow = false;
    this.IsInActive = false;
    this.ShowType = 0;
    this.BtnBottomCb = undefined;
    this.Nno = t => {
      if (t === "Close") {
        this.SetActive(false);
      }
    };
    this.cgu = () => {
      this.ShowEntry();
      this.MLt();
    };
    this.XTt = () => {
      this.HideEntry();
      this.TLt();
    };
    this.dNu = () => {
      if (this.BtnBottomCb) {
        this.BtnBottomCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UILayoutBase], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.cgu], [6, this.dNu]];
  }
  async InitDetailsItem() {
    this.DetailItem = new CardDetailItem_1.CardDetailItem();
    await this.DetailItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  async InitMaskButton() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton();
    this.MaskButton.SetButtonFunction(this.XTt);
    await this.MaskButton.Init(this.MaskAttach);
    this.MaskButton.GetRootItem().SetAsFirstHierarchy();
  }
  async OnBeforeStartAsync() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton();
    this.MaskButton.SetButtonFunction(this.XTt);
    await Promise.all([this.InitDetailsItem(), this.InitMaskButton()]);
    this.IsEntryShow = false;
    this.RefreshEntryShowState();
  }
  OnStart() {
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
    this.EntryDescLayoutItem = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(3), this.GetItem(4));
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.MaskButton?.Destroy();
  }
  RefreshByTaskData(t) {
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.TaskCardConfigId);
    var s = i.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
    var e = i.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
    var a = [];
    for (const h of i.CardFactorId) {
      var r = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      r.FactorConfigId = h;
      r.IsActive = false;
      a.push(r);
    }
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaFourTask(t.TaskCardConfigId);
    var t = t.GetConditionDescCurrentProgress(o.TaskDescConditionId);
    var o = {
      Desc: o.TaskDesc,
      CurrentProgress: t
    };
    var t = {
      Name: i.Name,
      Cost: i.Cost,
      Attack: s,
      Life: e,
      CardDescription: i.CardEffectDescription,
      CardDescriptionParams: i.CardEffectDescriptionParams,
      FactorDataList: a,
      TaskData: o
    };
    this.DetailItem.Refresh(t);
    this.EntryDescLayoutItem.RefreshByCardConfig(i);
  }
  RefreshByCardData(t) {
    var i = [];
    for (const h of t.ExtraFactors) {
      var s = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      s.FactorConfigId = h;
      s.IsActive = true;
      i.push(s);
    }
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    var a = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
    var r = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
    var t = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility);
    for (const n of e.CardFactorId) {
      var o = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      o.FactorConfigId = n;
      o.IsActive = false;
      i.push(o);
    }
    t = {
      Name: e.Name,
      Cost: t,
      Attack: a,
      Life: r,
      CardDescription: e.CardEffectDescription,
      CardDescriptionParams: e.CardEffectDescriptionParams,
      FactorDataList: i
    };
    this.DetailItem.Refresh(t);
    this.EntryDescLayoutItem.RefreshByCardConfig(e);
  }
  SetTipsPosition(t) {
    this.GetOriginalItem()?.SetUIParent(t.AttachItem);
    this.ShowType = t.ShowType;
    if (t.ShowType === 1) {
      this.GetItem(1).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(1, 0);
    } else if (t.ShowType === 2) {
      this.GetItem(0).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(0, 1);
    }
  }
  SetTipsActive(t) {
    if (this.IsInActive !== t) {
      if (this.IsInActive = t) {
        this.SetActive(true);
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequence("Start");
      } else {
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequence("Close");
        this.ShowType = 0;
      }
    }
  }
  SetPivotAndResetOffset(t, i) {
    this.GetOriginalItem()?.SetPivot(new UE.Vector2D(t, i));
    this.GetOriginalItem()?.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  MLt() {
    this.MaskButton.SetActive(true);
  }
  TLt() {
    this.MaskButton.SetActive(false);
  }
  SetMaskAttach(t) {
    this.MaskAttach = t;
  }
  ShowEntry() {
    if (!this.IsEntryShow) {
      this.IsEntryShow = true;
      this.RefreshEntryShowState();
    }
  }
  HideEntry() {
    if (this.IsEntryShow) {
      this.IsEntryShow = false;
      this.RefreshEntryShowState();
    }
  }
  RefreshEntryShowState() {
    this.GetItem(1).SetUIActive(this.IsEntryShow);
  }
  SetBtnMaskCallback(t) {
    this.BtnBottomCb = t;
    this.GetButton(6)?.RootUIComp.SetUIActive(true);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t && !(t.length <= 0) && ((i = t[0]) === "CardEffect" || i === "CardAttr" || i === "Task")) {
      return this.DetailItem?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaBattleDetailsTips = PhantomArenaBattleDetailsTips;
//# sourceMappingURL=PhantomArenaBattleDetailsTips.js.map