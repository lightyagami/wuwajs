"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchHandBookSmallSlotItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const FloroRanchCardData_1 = require("../../Data/FloroRanchCardData");
class FloroRanchHandBookSmallSlotItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Zqe = t => {};
    this.N8e = () => {
      if (this.Data instanceof FloroRanchCardData_1.FloroRanchCardData) {
        AudioSystem_1.AudioSystem.PostEvent(this.Data.Video);
      }
      this.Zqe?.(this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetItem(3)?.SetUIActive(false);
    this.GetItem(5)?.SetUIActive(false);
    this.GetSprite(7)?.SetUIActive(false);
    this.GetSprite(9)?.SetUIActive(false);
  }
  async RefreshAsync(t, e, a) {
    this.Data = t;
    var i;
    var o = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(t.GetCardRarity());
    this.GetTexture(2)?.SetUIActive(t.IsUnLock);
    this.GetItem(11)?.SetUIActive(!t.IsUnLock);
    let s = new Set();
    if (t instanceof FloroRanchCardData_1.FloroRanchCardData) {
      s = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardRedDot) ?? new Set();
      this.GetItem(12)?.SetUIActive(t.IsSpecialPhantom);
      this.GetItem(13)?.SetUIActive(!t.IsDefaultUnlock && t.IsUnLock && !s.has(t.Id));
      this.GetItem(14)?.SetUIActive(false);
    } else {
      s = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchToyRedDot) ?? new Set();
      this.GetItem(12)?.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(t.ConditionId !== 0 && t.IsUnLock && !s.has(t.Id));
      if (i = t.GetToyRaceData()) {
        this.GetItem(14)?.SetUIActive(true);
        this.SetTextureShowUntilLoaded(i.SmallIcon, this.GetTexture(15));
      }
    }
    this.GetRootItem().SetAlpha(0);
    await this.SetSpriteAsync(o.GetRaritySmallBg(), this.GetSprite(1), false);
    await this.SetTextureAsync(t.GetIcon(), this.GetTexture(2));
    await this.SetTextureAsync(t.GetIcon(), this.GetTexture(10));
  }
  BindClickCallback(t) {
    this.Zqe = t;
  }
  OnSelected() {
    var t;
    var e;
    this.GetItem(13)?.SetUIActive(false);
    this.GetExtendToggle(0).SetToggleStateForce(1);
    if (this.Data.IsUnLock) {
      t = this.Data instanceof FloroRanchCardData_1.FloroRanchCardData ? LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardRedDot : LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchToyRedDot;
      if (!(e = LocalStorage_1.LocalStorage.GetPlayer(t) ?? new Set()).has(this.Data.Id)) {
        e.add(this.Data.Id);
        LocalStorage_1.LocalStorage.SetPlayer(t, e);
      }
    }
  }
  OnDeselected() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.FloroRanchHandBookSmallSlotItem = FloroRanchHandBookSmallSlotItem;
//# sourceMappingURL=FloroRanchHandBookSmallSlotItem.js.map