"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksRoleSelectItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class DrinksRoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Mne = -1;
    this.ClickCallBack = undefined;
    this.IsSelectOnCb = undefined;
    this.OnToggleStateChangeFunction = undefined;
    this.Yai = e => {
      if (e === 1 && this.OnToggleStateChangeFunction) {
        this.GetItem(2)?.SetUIActive(false);
        this.OnToggleStateChangeFunction(this.Mne);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
  }
  OnSelected(e) {
    if (this.IsSelectOnCb && this.Mne !== -1) {
      this.Oei(this.IsSelectOnCb(this.Mne));
    }
  }
  Refresh(e, t, i) {
    this.Mne = e;
    var r = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(e).RoleId;
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r);
    this.SetRoleIcon(s.RoleHeadIconCircle, this.GetTexture(1), r);
    var s = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap().get(r);
    var r = ModelManager_1.ModelManager.DrinksModel.CheckLevelIsUnlock(e);
    var o = s !== undefined && s.MaxLike;
    var a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DrinksUnlockLevelClicked);
    var a = r && !o && (!a || !a.has(e)) || s !== undefined && s.FirstPass && !s.RewardGet;
    this.GetItem(2)?.SetUIActive(a);
    this.GetTexture(1).SetAlpha(r ? 1 : 0.4);
    this.GetSprite(3)?.SetUIActive(!r);
    this.GetItem(5)?.SetUIActive(!o);
    this.GetItem(6)?.SetUIActive(o);
    this.GetSprite(4)?.SetUIActive(o && !a);
    if (this.IsSelectOnCb) {
      this.Oei(this.IsSelectOnCb(e));
    }
  }
  Oei(e, t = false) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, t);
  }
}
exports.DrinksRoleSelectItem = DrinksRoleSelectItem;
//# sourceMappingURL=DrinksRoleSelectItem.js.map