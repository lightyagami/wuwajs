"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectGridCardItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CollectGridCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.eVi = undefined;
    this.CallbackOnClick = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Refresh(t) {
    this.Data = t;
    if (this.eVi) {
      this.eVi.Refresh(t);
    } else {
      this.eVi = new CollectCardItem();
      this.eVi.CallbackOnClick = this.CallbackOnClick;
      this.eVi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), t);
    }
  }
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return t.CardId;
  }
}
exports.CollectGridCardItem = CollectGridCardItem;
class CollectCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackOnClick = undefined;
    this.Bpt = () => false;
    this.ZW1 = () => {
      if (this.Pe && this.CallbackOnClick) {
        this.CallbackOnClick(this.Pe.CardId);
      }
    };
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [[0, this.GetCardRootItem()]];
    this.ComponentsRegisterInfoByResourceId = [[1, "UiItem_CardLockSmall", this.GetContentRootItem()], [7, "UiItem_SoundRemnantItemSpine", this.GetSpineRootItem()]];
  }
  OnStart() {
    var t = this.OpenParam;
    if (t) {
      this.Refresh(t);
    }
  }
  Refresh(t) {
    this.Pe = t;
    var e;
    var s = this.GetComponent(0);
    if (s) {
      e = {
        CardId: t.CardId,
        Attack: t.Attack,
        Life: t.Life,
        Element: t.Element,
        Cost: t.Cost,
        CanToggleExecuteChange: this.Bpt,
        OnPointerUp: this.ZW1,
        OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t.CardId),
        CardFaceTexturePath: t.CardFaceTexturePath,
        ShowCardFaceTexture: t.CardFaceType === 0
      };
      s.Refresh(e);
    }
    this.GetComponent(1)?.Refresh(t.IsLocked);
    var s = {
      CardSpineData: t.CardSpineData,
      ShowSpine: t.CardFaceType === 1
    };
    this.GetComponent(7)?.Refresh(s);
  }
}
//# sourceMappingURL=CollectGridCardItem.js.map