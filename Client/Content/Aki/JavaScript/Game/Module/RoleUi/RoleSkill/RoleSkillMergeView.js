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
    this.jVd = undefined;
    this.HVd = undefined;
    this.$Vd = new RoleSkillTreeItemData_1.RoleSkillTreeItemData();
    this.WVd = new RoleSkillTreeInfoItemData_1.RoleSkillTreeInfoItemData();
    this.HKd = -1;
    this.xpt = () => {
      this.CloseMe();
    };
    this.Ido = e => {
      this.jVd?.SelectSkillItem(e);
      this.NQd();
    };
    this.VQd = () => {
      var e = this.jVd?.GetCurrentSelectedSkillItem();
      if (e) {
        e = e.GetSkillNodeId();
        this.WVd.SkillNodeId = e;
        this.HVd.Update(this.WVd);
        this.HVd.ShowLeftPanelByTabType(this.HVd.GetCurSkillTabShowType());
      }
    };
    this.Udo = e => {
      this.jVd?.OnSkillNodeLevelUp(e);
      this.NQd();
    };
    this.TTt = () => {
      this.jVd?.OnAddCommonItemList();
    };
    this.qdi = () => {
      this.HVd?.OnCommonItemCountAnyChange();
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
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeActive, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  async OnBeforeStartAsync() {
    await this.JVd();
    this.AU();
  }
  OnBeforeShow() {
    this.bl();
    if (this.HKd >= 0) {
      this.$Kd(this.HKd);
      this.HKd = -1;
    }
    this.jVd?.PlayItemSequence("ChangeRole");
    this.jVd?.PlayItemSequence("MoveRight");
    this.HVd?.PlayItemSequence("Start");
  }
  async JVd() {
    this.jVd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
    this.HVd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    await Promise.all([this.jVd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false), this.HVd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(1), false)]);
    this.HVd.OnBackBtnCallBack = this.xpt;
  }
  async OnPlayingStartSequenceAsync() {
    await Promise.all([this.HVd?.PlayItemSequenceAsync("Start"), this.jVd?.PlayItemSequenceAsync("Start")]);
  }
  async OnPlayingCloseSequenceAsync() {
    await Promise.all([this.HVd?.PlayItemSequenceAsync("Close"), this.jVd?.PlayItemSequenceAsync("Close")]);
  }
  AU() {
    var e = this.OpenParam;
    this.$Vd.RoleId = e.RoleId;
    this.WVd.RoleId = e.RoleId;
    this.HKd = e.SkillNodeIndex;
  }
  $Kd(e) {
    e = this.jVd.GetSkillItemByIndex(e);
    if (e) {
      this.jVd.SelectSkillItem(e, true);
      this.NQd();
    }
  }
  bl() {
    this.jVd?.UpdateRole(this.$Vd.RoleId);
    this.jVd?.SetSkillInputButtonVisible(false);
    this.NQd();
  }
  NQd() {
    var e;
    var t;
    var i = this.jVd?.GetCurrentSelectedSkillItem();
    if (i) {
      if ((e = i.GetType()) === 4 || e === 3) {
        this.VQd();
      } else {
        e = i.GetRoleId();
        t = (t = i.GetUpgradeSkillId()) > 0 ? t : i.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(e, t, this.VQd);
      }
    }
  }
}
exports.RoleSkillMergeView = RoleSkillMergeView;
//# sourceMappingURL=RoleSkillMergeView.js.map