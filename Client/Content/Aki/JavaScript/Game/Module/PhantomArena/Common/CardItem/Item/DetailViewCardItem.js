"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailViewCardItem = undefined;
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class DetailViewCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.IsNewPhantomArenaActivity = false;
    this.Bpt = () => false;
  }
  OnRegisterCardComponent() {
    var e = this.IsNewPhantomArenaActivity ? "UiItem_CardLockNew" : "UiItem_CardLock";
    if (this.IsNewPhantomArenaActivity) {
      this.ComponentsRegisterInfoByItem = [[1, this.GetRootItem()]];
    } else {
      this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    }
    this.ComponentsRegisterInfoByResourceId = [[2, e, this.GetContentRootItem()], [9, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  Refresh(e) {
    var t = {
      CardId: (this.Data = e).CardId,
      Cost: e.Cost,
      Attack: e.Attack,
      Life: e.Life,
      Element: e.Element,
      CardFaceTexturePath: e.CardFaceTexturePath,
      ShowCardFaceTexture: e.CardFaceType === 0,
      CanToggleExecuteChange: this.Bpt,
      OutlookUnlocked: e.OutlookUnlocked
    };
    this.GetComponent(0)?.Refresh(t);
    this.GetComponent(1)?.Refresh(t);
    var t = {
      CardSpineData: e.CardSpineData,
      ShowSpine: e.CardFaceType === 1
    };
    this.GetComponent(9)?.Refresh(t);
    this.RefreshIsLocked();
  }
  RefreshIsLocked() {
    this.GetComponent(2)?.Refresh(this.Data.IsLock);
  }
}
exports.DetailViewCardItem = DetailViewCardItem;
//# sourceMappingURL=DetailViewCardItem.js.map