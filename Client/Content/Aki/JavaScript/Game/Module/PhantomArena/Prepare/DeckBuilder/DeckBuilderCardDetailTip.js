"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardDetailTip = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const CardDetailEntryDescLayoutItem_1 = require("../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailItem_1 = require("../../Common/CardDetail/CardDetailItem");
class DeckBuilderCardDetailTip extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DetailItem = undefined;
    this.EntryDescLayoutItem = undefined;
    this.TDe = undefined;
    this.IsEntryShow = false;
    this.IsMouseInSlotItem = false;
    this.tmf = () => {
      if (!this.RootItem || this.IsMouseInSlotItem) {
        this.RemoveTimer();
      } else if (!LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0, true).enterComponentStack.Contains(this.RootItem)) {
        this.SetUiActive(false);
        this.RemoveTimer();
      }
    };
    this.cgu = () => {
      this.IsEntryShow = !this.IsEntryShow;
      this.RefreshEntryShowState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UILayoutBase], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.cgu]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitDetailsItem()]);
    this.IsEntryShow = false;
    this.RefreshEntryShowState();
  }
  async InitDetailsItem() {
    this.DetailItem = new CardDetailItem_1.CardDetailItem();
    await this.DetailItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.EntryDescLayoutItem = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(3), this.GetItem(4));
    this.GetItem(1).SetHierarchyIndex(0);
    this.RootItem?.SetRaycastTarget(true);
  }
  OnBeforeHide() {
    this.RemoveTimer();
  }
  AddTimer() {
    this.RemoveTimer();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.tmf();
    }, 100);
  }
  RemoveTimer() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  RefreshCard(e, t) {
    t = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(e, t);
    this.DetailItem.Refresh(t);
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    this.EntryDescLayoutItem.RefreshByCardConfig(t);
    this.IsEntryShow = false;
    this.RefreshEntryShowState();
  }
  RefreshEntryShowState() {
    this.GetItem(1).SetUIActive(this.IsEntryShow);
  }
}
exports.DeckBuilderCardDetailTip = DeckBuilderCardDetailTip;
//# sourceMappingURL=DeckBuilderCardDetailTip.js.map