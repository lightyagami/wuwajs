"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoLevelGroupItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const AutoAttachItem_1 = require("../../../../../AutoAttach/AutoAttachItem");
class FightPhotoLevelGroupItem extends AutoAttachItem_1.AutoAttachItem {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.TDe = undefined;
    this.OnToggleClickCallback = undefined;
    this.OnSelectCallback = undefined;
    this.CheckToggleCanClick = undefined;
    this.Q9d = () => {
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.Q9d);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshFightPhotoLevelRedDot, this.Q9d);
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
    var i = (this.Pe = t) !== undefined;
    this.GetItem(2)?.SetUIActive(i && t.IsFinished);
    this.GetItem(3)?.SetUIActive(i && !t.IsUnLock);
    this.GetTexture(4)?.SetUIActive(i);
    this.GetTexture(5)?.SetUIActive(i);
    this.GetText(6)?.SetUIActive(false);
    this.RefreshRedDot();
    if (i) {
      this.GetExtendToggle(0).SetSelfInteractive(true);
      t = this.Pe.IsUnLock ? this.Pe.RoleTextureLight : this.Pe.RoleTextureDark;
      this.SetTextureByPath(t, this.GetTexture(1));
      this.SetTextureByPath(this.Pe.NumTexture, this.GetTexture(4));
      this.SetTextureByPath(this.Pe.NumTexture2, this.GetTexture(5));
    } else {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_BattlePhotoRoleEmpty");
      this.SetTextureByPath(i, this.GetTexture(1));
      this.GetExtendToggle(0).SetSelfInteractive(false);
    }
    if (this.Pe && !this.Pe.IsUnLock) {
      this.kot();
    } else {
      this.xHe();
    }
  }
  hmd() {
    if (this.Pe && this.Pe.IsUnLock) {
      this.OnRefreshItem(this.Pe);
    }
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.hmd();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
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