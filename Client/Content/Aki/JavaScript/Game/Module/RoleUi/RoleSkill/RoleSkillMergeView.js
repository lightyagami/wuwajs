"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillMergeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const RoleController_1 = require("../RoleController");
const RoleSkillTreeInfoItem_1 = require("./RoleSkillTreeInfoItem");
const RoleSkillTreeInfoItemData_1 = require("./RoleSkillTreeInfoItemData");
const RoleSkillTreeItem_1 = require("./RoleSkillTreeItem");
const RoleSkillTreeItemData_1 = require("./RoleSkillTreeItemData");
class RoleSkillMergeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kWd = undefined;
    this.OWd = undefined;
    this.qWd = new RoleSkillTreeItemData_1.RoleSkillTreeItemData();
    this.GWd = new RoleSkillTreeInfoItemData_1.RoleSkillTreeInfoItemData();
    this.hSm = -1;
    this.xpt = () => {
      this.CloseMe();
    };
    this.Ido = e => {
      this.kWd?.SelectSkillItem(e);
      this.z0m();
    };
    this.J0m = () => {
      var e = this.kWd?.GetCurrentSelectedSkillItem();
      if (e) {
        e = e.GetSkillNodeId();
        this.GWd.SkillNodeId = e;
        this.OWd.Update(this.GWd);
        this.OWd.ShowLeftPanelByTabType(this.OWd.GetCurSkillTabShowType());
      }
    };
    this.Udo = e => {
      this.kWd?.OnSkillNodeLevelUp(e);
      this.z0m();
    };
    this.TTt = () => {
      this.kWd?.OnAddCommonItemList();
    };
    this.qdi = () => {
      this.OWd?.OnCommonItemCountAnyChange();
    };
    this.FFf = () => {
      this.kWd?.OnRoleSkillBranchChanged();
      this.z0m();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeActive, this.Udo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.FFf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeActive, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.FFf);
  }
  async OnBeforeStartAsync() {
    await this.$Wd();
    this.AU();
  }
  OnBeforeShow() {
    this.bl();
    if (this.hSm >= 0) {
      this.lSm(this.hSm);
      this.hSm = -1;
    }
    this.kWd?.PlayItemSequence("MoveRight");
    this.OWd?.PlayItemSequence("Start");
  }
  async $Wd() {
    this.kWd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
    this.kWd.SetEnableSwitchBranch(true);
    this.OWd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    this.OWd.SetSkillBranchEnable(true);
    await Promise.all([this.kWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false), this.OWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(1), false)]);
    this.OWd.OnBackBtnCallBack = this.xpt;
  }
  async OnPlayingStartSequenceAsync() {
    await this.OWd?.PlayItemSequenceAsync("Start");
  }
  async OnPlayingCloseSequenceAsync() {
    await Promise.all([this.OWd?.PlayItemSequenceAsync("Close"), this.kWd?.PlayItemSequenceAsync("Close")]);
  }
  AU() {
    var e = this.OpenParam;
    this.qWd.RoleId = e.RoleId;
    this.GWd.RoleId = e.RoleId;
    this.hSm = e.SkillNodeIndex;
  }
  lSm(e) {
    e = this.kWd.GetSkillItemByIndex(e);
    if (e) {
      this.kWd.SelectSkillItem(e, true);
      this.z0m();
    }
  }
  bl() {
    this.kWd?.UpdateRole(this.qWd.RoleId);
    this.kWd?.SetSkillInputButtonVisible(false);
    this.z0m();
  }
  z0m() {
    var e;
    var t;
    var i = this.kWd?.GetCurrentSelectedSkillItem();
    if (i) {
      if ((e = i.GetType()) === 4 || e === 3) {
        this.J0m();
      } else {
        e = i.GetRoleId();
        t = (t = i.GetUpgradeSkillId()) > 0 ? t : i.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(e, t, this.J0m);
      }
    }
  }
}
exports.RoleSkillMergeView = RoleSkillMergeView;
//# sourceMappingURL=RoleSkillMergeView.js.map