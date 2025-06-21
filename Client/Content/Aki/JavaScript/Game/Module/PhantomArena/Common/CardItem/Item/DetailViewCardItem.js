"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DetailViewCardItem = void 0;
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class DetailViewCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments), this.Data = void 0, this.Bpt = () => !1
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [1, "UiItem_CardLock", this.GetContentRootItem()],
      [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]
    ]
  }
  Refresh(e) {
    var t = {
        CardId: (this.Data = e).CardId,
        Cost: e.Cost,
        Attack: e.Attack,
        Life: e.Life,
        Element: e.Element,
        CardFaceTexturePath: e.CardFaceTexturePath,
        ShowCardFaceTexture: 0 === e.CardFaceType,
        CanToggleExecuteChange: this.Bpt,
        OutlookUnlocked: e.OutlookUnlocked
      },
      t = (this.GetComponent(0)?.Refresh(t), {
        CardSpineData: e.CardSpineData,
        ShowSpine: 1 === e.CardFaceType
      });
    this.GetComponent(7)?.Refresh(t), this.RefreshIsLocked()
  }
  RefreshIsLocked() {
    this.GetComponent(1)?.Refresh(this.Data.IsLock)
  }
}
exports.DetailViewCardItem = DetailViewCardItem;
//# sourceMappingURL=DetailViewCardItem.js.map