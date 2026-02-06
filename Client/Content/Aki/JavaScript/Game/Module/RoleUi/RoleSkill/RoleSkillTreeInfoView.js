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
    this.OWd = undefined;
    this.qdi = () => {
      this.OWd?.OnCommonItemCountAnyChange();
    };
    this.Qco = () => {
      this.CloseMe();
    };
    this.m9f = () => {
      this.OWd?.OnRoleSkillBranchChanged();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam.RoleViewAgent?.GetRoleSystemMode() !== 2;
    this.OWd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    this.OWd.SetSkillBranchEnable(e);
    this.OWd.SetParentView(this);
    await this.OWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(0), false);
    this.OWd.OnBackBtnCallBack = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewQuit);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.m9f);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.m9f);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  async OnPlayingStartSequenceAsync() {
    await this.OWd?.PlayItemSequenceAsync("Start");
  }
  async OnPlayingCloseSequenceAsync() {
    await this.OWd?.PlayItemSequenceAsync("Close");
  }
  Refresh() {
    var e = this.OpenParam;
    this.OWd?.Update(e);
    this.OWd?.ShowLeftPanelByTabType(this.OWd.GetCurSkillTabShowType());
  }
}
exports.RoleSkillTreeInfoView = RoleSkillTreeInfoView;
//# sourceMappingURL=RoleSkillTreeInfoView.js.map