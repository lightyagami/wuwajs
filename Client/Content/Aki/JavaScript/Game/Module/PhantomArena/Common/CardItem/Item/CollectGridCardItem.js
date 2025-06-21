"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectGridCardItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CollectGridCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0, this.eVi = void 0, this.CallbackOnClick = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  Refresh(t) {
    this.Data = t, this.eVi ? this.eVi.Refresh(t) : (this.eVi = new CollectCardItem, this.eVi.CallbackOnClick = this.CallbackOnClick, this.eVi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), t))
  }
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return t.CardId
  }
}
exports.CollectGridCardItem = CollectGridCardItem;
class CollectCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments), this.Pe = void 0, this.CallbackOnClick = void 0, this.Bpt = () => !1, this.gW1 = () => {
      this.Pe && this.CallbackOnClick && this.CallbackOnClick(this.Pe.CardId)
    }
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetCardRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [1, "UiItem_CardLockSmall", this.GetContentRootItem()],
      [7, "UiItem_SoundRemnantItemSpine", this.GetSpineRootItem()]
    ]
  }
  OnStart() {
    var t = this.OpenParam;
    t && this.Refresh(t)
  }
  Refresh(t) {
    this.Pe = t;
    var e, s = this.GetComponent(0),
      s = (s && (e = {
        CardId: t.CardId,
        Attack: t.Attack,
        Life: t.Life,
        Element: t.Element,
        Cost: t.Cost,
        CanToggleExecuteChange: this.Bpt,
        OnPointerUp: this.gW1,
        OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t.CardId),
        CardFaceTexturePath: t.CardFaceTexturePath,
        ShowCardFaceTexture: 0 === t.CardFaceType
      }, s.Refresh(e)), this.GetComponent(1)?.Refresh(t.IsLocked), {
        CardSpineData: t.CardSpineData,
        ShowSpine: 1 === t.CardFaceType
      });
    this.GetComponent(7)?.Refresh(s)
  }
}
//# sourceMappingURL=CollectGridCardItem.js.map