"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardItem = void 0;
const ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  CommonGridCardItem_1 = require("./CommonGridCardItem");
class DeckBuilderCardItem extends CommonGridCardItem_1.CommonGridCardItem {
  constructor() {
    super(...arguments), this.Data = void 0, this.CommonBaseCardComponentData = void 0, this.SpineComponentData = void 0, this.B41 = () => {
      this.Data?.OpenCardInfoView(this.Data?.CardId ?? 0)
    }, this.OnPointerUp = () => {
      this.Data?.AddCardToDeck(this.Data, 1)
    }, this.Bpt = () => !1
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [1, "UiItem_CardLock", this.GetContentRootItem()],
      [8, "UiItem_CardUse", this.GetContentRootItem()],
      [9, "UiItem_CardDisable", this.GetContentRootItem()],
      [5, "UiItem_CardCheck", this.GetContentRootItem()],
      [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]
    ]
  }
  OnStart() {
    this.GetComponent(5).SetActive(!0)
  }
  Refresh(t) {
    var e = new UiAsyncTask_1.UiAsyncTask("DeckBuilderCardItem", async () => {
      await this.RefreshAsync(t)
    });
    this.RunAsyncTask(e)
  }
  async RefreshAsync(t) {
    var e = {
        CardSpineData: (this.Data = t).CardSpineData,
        ShowSpine: 1 === t.CardFaceType
      },
      e = (await this.GetComponent(7)?.RefreshAsync(e), this.SpineComponentData = e, {
        CardId: t.CardId,
        Attack: t.Attack,
        Life: t.Life,
        Element: t.Element,
        CardFaceTexturePath: t.CardFaceTexturePath,
        ShowCardFaceTexture: 0 === t.CardFaceType,
        Cost: t.Cost,
        CanToggleExecuteChange: this.Bpt,
        OnPointerUp: this.OnPointerUp,
        OutlookUnlocked: t.OutlookUnlocked
      });
    this.GetComponent(0)?.Refresh(e), this.CommonBaseCardComponentData = e, this.RefreshLockComponent(), this.RefreshAllInDeckComponent(), this.RefreshDisabledComponent(), this.RefreshLeftCount()
  }
  RefreshLeftCount() {
    var t = {
      LeftCount: this.Data.LeftCount,
      MaxCount: this.Data.MaxCount,
      OnCheckBtnClick: this.B41
    };
    this.GetComponent(5)?.Refresh(t)
  }
  RefreshAllInDeckComponent() {
    var t = {
      IsAllInDeck: this.Data.IsAllInDeck,
      ShowComponent: this.Data.IsAllInDeck && !this.Data.IsLocked
    };
    this.GetComponent(8)?.Refresh(t)
  }
  RefreshDisabledComponent() {
    var t = {
      Disabled: this.Data.Disabled,
      ShowComponent: this.Data.Disabled && !this.Data.IsLocked && !this.Data.IsAllInDeck
    };
    this.GetComponent(9)?.Refresh(t)
  }
  RefreshLockComponent() {
    this.GetComponent(1)?.Refresh(this.Data.IsLocked)
  }
  RefreshOutlook() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(this.Data.CardId);
    this.Data.CardFaceType = t, this.CommonBaseCardComponentData.ShowCardFaceTexture = 0 === t, this.CommonBaseCardComponentData.OutlookUnlocked = this.Data.OutlookUnlocked, this.GetComponent(0)?.RefreshOutlook(), this.SpineComponentData.ShowSpine = 1 === t, this.GetComponent(7)?.Refresh(this.SpineComponentData)
  }
  GetKey(t, e) {
    return t.CardId
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0)) {
      var e = t[0];
      if ("CardDetail" === e) return this.GetComponent(5)?.GetGuideUiItemAndUiItemForShowEx(t);
      if ("New:CardDetail" === e) {
        e = this.GetComponent(5)?.GetGuideUiItemAndUiItemForShowEx(t)[0], t = this.GetRootItem();
        if (e && t) return [e, t]
      }
    }
  }
}
exports.DeckBuilderCardItem = DeckBuilderCardItem;
//# sourceMappingURL=DeckBuilderCardItem.js.map