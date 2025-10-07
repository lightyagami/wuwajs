"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLevelGroupItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const AutoAttachItem_1 = require("../../../../../AutoAttach/AutoAttachItem");
class FightPhotoLevelGroupItem extends AutoAttachItem_1.AutoAttachItem {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.OnToggleClickCallback = undefined;
    this.OnSelectCallback = undefined;
    this.CheckToggleCanClick = undefined;
    this.U3d = () => {
      this.RefreshRedDot();
    };
    this.N8e = () => {
      this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
      this.OnToggleClickCallback?.(this.GetItemIndex(), this.Pe);
    };
    this.UHl = () => !this.CheckToggleCanClick || this.CheckToggleCanClick();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(this.UHl);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.U3d);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.U3d);
  }
  OnSelect() {
    if (this.Pe && this.OnSelectCallback) {
      this.OnSelectCallback(this.GetItemIndex(), this.Pe);
    }
    this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
  }
  OnUnSelect() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
  OnRefreshItem(t) {
    var e = (this.Pe = t) !== undefined;
    this.GetItem(2)?.SetUIActive(e && t.IsFinished);
    this.GetItem(3)?.SetUIActive(e && !t.IsUnLock);
    this.GetTexture(4)?.SetUIActive(e);
    this.GetTexture(5)?.SetUIActive(e);
    this.GetText(6)?.SetUIActive(false);
    this.RefreshRedDot();
    if (e) {
      this.GetExtendToggle(0).SetSelfInteractive(true);
      t = this.Pe.IsUnLock ? this.Pe.RoleTextureLight : this.Pe.RoleTextureDark;
      this.SetTextureByPath(t, this.GetTexture(1));
      this.SetTextureByPath(this.Pe.NumTexture, this.GetTexture(4));
      this.SetTextureByPath(this.Pe.NumTexture2, this.GetTexture(5));
    } else {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_BattlePhotoRoleEmpty");
      this.SetTextureByPath(e, this.GetTexture(1));
      this.GetExtendToggle(0).SetSelfInteractive(false);
    }
  }
  RefreshRedDot() {
    var t = this.Pe !== undefined && this.Pe.HasRedDot;
    this.GetItem(7)?.SetUIActive(t);
  }
  OnMoveItem() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
}
exports.FightPhotoLevelGroupItem = FightPhotoLevelGroupItem;
//# sourceMappingURL=FightPhotoLevelGroupItem.js.map