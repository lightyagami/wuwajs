"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardItem = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const CommonGridCardItem_1 = require("./CommonGridCardItem");
class DeckBuilderCardItem extends CommonGridCardItem_1.CommonGridCardItem {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CommonBaseCardComponentData = undefined;
    this.SpineComponentData = undefined;
    this.IsNewPhantomArenaActivity = false;
    this.cV1 = () => {
      this.Data?.OpenCardInfoView(this.Data?.CardId ?? 0);
    };
    this.OnPointerUp = () => {
      this.Data?.AddCardToDeck(this.Data.CardId, 1);
    };
    this.Bpt = () => false;
  }
  OnRegisterCardComponent() {
    if (this.IsNewPhantomArenaActivity) {
      this.ComponentsRegisterInfoByItem = [[1, this.GetRootItem()]];
    } else {
      this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    }
    var t = this.IsNewPhantomArenaActivity ? "UiItem_CardLockNew" : "UiItem_CardLock";
    var e = this.IsNewPhantomArenaActivity ? "UiItem_CardDisableNew" : "UiItem_CardDisable";
    var i = this.IsNewPhantomArenaActivity ? "UiItem_CardUseNew" : "UiItem_CardUse";
    var s = this.IsNewPhantomArenaActivity ? "NewUiItem_CardCheck" : "UiItem_CardCheck";
    this.ComponentsRegisterInfoByResourceId = [[2, t, this.GetContentRootItem()], [10, i, this.GetContentRootItem()], [11, e, this.GetContentRootItem()], [7, s, this.GetContentRootItem()], [9, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  OnStart() {
    this.GetComponent(7).SetActive(true);
  }
  Refresh(t) {
    var e = new UiAsyncTask_1.UiAsyncTask("DeckBuilderCardItem", async () => {
      await this.RefreshAsync(t);
    });
    this.RunAsyncTask(e);
  }
  async RefreshAsync(t) {
    var e = {
      CardSpineData: (this.Data = t).CardSpineData,
      ShowSpine: t.CardFaceType === 1
    };
    await this.GetComponent(9)?.RefreshAsync(e);
    this.SpineComponentData = e;
    var e = this.IsNewPhantomArenaActivity ? this.GetComponent(1) : this.GetComponent(0);
    if (e) {
      t = {
        CardId: t.CardId,
        Attack: t.Attack,
        Life: t.Life,
        Element: t.Element,
        CardFaceTexturePath: t.CardFaceTexturePath,
        ShowCardFaceTexture: t.CardFaceType === 0,
        Cost: t.Cost,
        CanToggleExecuteChange: this.Bpt,
        OnPointerUp: this.OnPointerUp,
        OutlookUnlocked: t.OutlookUnlocked
      };
      e.Refresh(t);
      this.CommonBaseCardComponentData = t;
    }
    this.RefreshLockComponent();
    this.RefreshAllInDeckComponent();
    this.RefreshDisabledComponent();
    this.RefreshLeftCount();
  }
  RefreshLeftCount() {
    var t = {
      LeftCount: this.Data.LeftCount,
      MaxCount: this.Data.MaxCount,
      OnCheckBtnClick: this.cV1
    };
    this.GetComponent(7)?.Refresh(t);
  }
  RefreshAllInDeckComponent() {
    var t = {
      IsAllInDeck: this.Data.IsAllInDeck,
      ShowComponent: this.Data.IsAllInDeck && !this.Data.IsLocked
    };
    this.GetComponent(10)?.Refresh(t);
  }
  RefreshDisabledComponent() {
    var t = {
      Disabled: this.Data.Disabled,
      ShowComponent: this.Data.Disabled && !this.Data.IsLocked && !this.Data.IsAllInDeck
    };
    this.GetComponent(11)?.Refresh(t);
  }
  RefreshLockComponent() {
    this.GetComponent(2)?.Refresh(this.Data.IsLocked);
  }
  RefreshOutlook() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(this.Data.CardId);
    this.Data.CardFaceType = t;
    this.CommonBaseCardComponentData.ShowCardFaceTexture = t === 0;
    this.CommonBaseCardComponentData.OutlookUnlocked = this.Data.OutlookUnlocked;
    this.GetComponent(0)?.RefreshOutlook();
    this.SpineComponentData.ShowSpine = t === 1;
    this.GetComponent(9)?.Refresh(this.SpineComponentData);
  }
  GetKey(t, e) {
    return t.CardId;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0)) {
      var e = t[0];
      if (e === "CardDetail") {
        return this.GetComponent(7)?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      if (e === "New:CardDetail") {
        e = this.GetComponent(7)?.GetGuideUiItemAndUiItemForShowEx(t)[0];
        t = this.GetRootItem();
        if (e && t) {
          return [e, t];
        }
      }
    }
  }
}
exports.DeckBuilderCardItem = DeckBuilderCardItem;
//# sourceMappingURL=DeckBuilderCardItem.js.map