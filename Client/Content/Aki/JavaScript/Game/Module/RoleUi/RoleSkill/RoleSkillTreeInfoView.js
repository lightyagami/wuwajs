"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const RoleSkillTreeInfoItem_1 = require("./RoleSkillTreeInfoItem");
class RoleSkillTreeInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UWd = undefined;
    this.qdi = () => {
      this.UWd?.OnCommonItemCountAnyChange();
    };
    this.Qco = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.UWd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    await this.UWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(0), false);
    this.UWd.OnBackBtnCallBack = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewQuit);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  async OnPlayingStartSequenceAsync() {
    await this.UWd?.PlayItemSequenceAsync("Start");
  }
  async OnPlayingCloseSequenceAsync() {
    await this.UWd?.PlayItemSequenceAsync("Close");
  }
  Refresh() {
    var e = this.OpenParam;
    this.UWd?.Update(e);
    this.UWd?.ShowLeftPanelByTabType(this.UWd.GetCurSkillTabShowType());
  }
}
exports.RoleSkillTreeInfoView = RoleSkillTreeInfoView;
//# sourceMappingURL=RoleSkillTreeInfoView.js.map