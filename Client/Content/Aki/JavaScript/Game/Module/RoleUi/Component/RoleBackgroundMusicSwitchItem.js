"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBackgroundMusicSwitchItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleBackgroundMusicSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleData = undefined;
    this.jWc = e => {
      if (this.RoleData !== undefined && !this.RoleData.IsTrialRole()) {
        if (e === 1) {
          ControllerHolder_1.ControllerHolder.RoleController.RoleOperateSelfBgmRequest(this.RoleData.GetDataId(), false);
        } else if (e === 0) {
          ControllerHolder_1.ControllerHolder.RoleController.RoleOperateSelfBgmRequest(this.RoleData.GetDataId(), true);
        }
      }
    };
    this.HWc = e => {
      if (this.RoleData !== undefined && this.RoleData.GetDataId() === e) {
        this.Refresh();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.SetSelfInteractive(false);
    e.SetCanClickWhenDisable(true);
    e.OnPointUpCallBack.Bind(this.jWc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleBackgroundMusicEnabledChanged, this.HWc);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleBackgroundMusicEnabledChanged, this.HWc);
  }
  RefreshByRoleData(e) {
    this.RoleData = e;
    this.Refresh();
  }
  Refresh() {
    var e;
    var t;
    if (this.RoleData !== undefined) {
      this.SetRoleIcon("", this.GetTexture(2), this.RoleData.GetRoleId());
      e = this.GetExtendToggle(0);
      t = this.RoleData.GetBackgroundMusicEnabled();
      e.SetToggleState(t ? 1 : 0);
    }
  }
}
exports.RoleBackgroundMusicSwitchItem = RoleBackgroundMusicSwitchItem;
//# sourceMappingURL=RoleBackgroundMusicSwitchItem.js.map