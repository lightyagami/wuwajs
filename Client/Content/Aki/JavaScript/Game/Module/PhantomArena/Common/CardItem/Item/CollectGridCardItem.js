"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectGridCardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
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
    var e;
    this.Data = t;
    if (this.eVi) {
      this.eVi.Refresh(t);
    } else {
      this.eVi = new CollectCardItem();
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.CardId).ActivityId;
      this.eVi.IsNewPhantomArenaActivity = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(e);
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
    this.IsNewPhantomArenaActivity = false;
    this.Bpt = () => false;
    this.ZW1 = () => {
      if (this.Pe && this.CallbackOnClick) {
        this.CallbackOnClick(this.Pe.CardId);
      }
    };
  }
  OnRegisterCardComponent() {
    var t = this.IsNewPhantomArenaActivity ? "UiItem_CardLock256New" : "UiItem_CardLockSmall";
    if (this.IsNewPhantomArenaActivity) {
      this.ComponentsRegisterInfoByItem = [[1, this.GetCardRootItem()]];
    } else {
      this.ComponentsRegisterInfoByItem = [[0, this.GetCardRootItem()]];
    }
    this.ComponentsRegisterInfoByResourceId = [[2, t, this.GetContentRootItem()], [9, "UiItem_SoundRemnantItemSpine", this.GetSpineRootItem()]];
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
    var i = this.IsNewPhantomArenaActivity ? this.GetComponent(1) : this.GetComponent(0);
    if (i) {
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
      i.Refresh(e);
    }
    this.GetComponent(2)?.Refresh(t.IsLocked);
    var i = {
      CardSpineData: t.CardSpineData,
      ShowSpine: t.CardFaceType === 1
    };
    this.GetComponent(9)?.Refresh(i);
  }
}
//# sourceMappingURL=CollectGridCardItem.js.map