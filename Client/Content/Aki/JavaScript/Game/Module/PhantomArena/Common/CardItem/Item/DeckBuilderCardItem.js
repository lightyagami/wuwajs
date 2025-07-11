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
    this.cV1 = () => {
      this.Data?.OpenCardInfoView(this.Data?.CardId ?? 0);
    };
    this.OnPointerUp = () => {
      this.Data?.AddCardToDeck(this.Data, 1);
    };
    this.Bpt = () => false;
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    this.ComponentsRegisterInfoByResourceId = [[1, "UiItem_CardLock", this.GetContentRootItem()], [8, "UiItem_CardUse", this.GetContentRootItem()], [9, "UiItem_CardDisable", this.GetContentRootItem()], [5, "UiItem_CardCheck", this.GetContentRootItem()], [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  OnStart() {
    this.GetComponent(5).SetActive(true);
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
    await this.GetComponent(7)?.RefreshAsync(e);
    this.SpineComponentData = e;
    var e = {
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
    this.GetComponent(0)?.Refresh(e);
    this.CommonBaseCardComponentData = e;
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
    this.GetComponent(5)?.Refresh(t);
  }
  RefreshAllInDeckComponent() {
    var t = {
      IsAllInDeck: this.Data.IsAllInDeck,
      ShowComponent: this.Data.IsAllInDeck && !this.Data.IsLocked
    };
    this.GetComponent(8)?.Refresh(t);
  }
  RefreshDisabledComponent() {
    var t = {
      Disabled: this.Data.Disabled,
      ShowComponent: this.Data.Disabled && !this.Data.IsLocked && !this.Data.IsAllInDeck
    };
    this.GetComponent(9)?.Refresh(t);
  }
  RefreshLockComponent() {
    this.GetComponent(1)?.Refresh(this.Data.IsLocked);
  }
  RefreshOutlook() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(this.Data.CardId);
    this.Data.CardFaceType = t;
    this.CommonBaseCardComponentData.ShowCardFaceTexture = t === 0;
    this.CommonBaseCardComponentData.OutlookUnlocked = this.Data.OutlookUnlocked;
    this.GetComponent(0)?.RefreshOutlook();
    this.SpineComponentData.ShowSpine = t === 1;
    this.GetComponent(7)?.Refresh(this.SpineComponentData);
  }
  GetKey(t, e) {
    return t.CardId;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0)) {
      var e = t[0];
      if (e === "CardDetail") {
        return this.GetComponent(5)?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      if (e === "New:CardDetail") {
        e = this.GetComponent(5)?.GetGuideUiItemAndUiItemForShowEx(t)[0];
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