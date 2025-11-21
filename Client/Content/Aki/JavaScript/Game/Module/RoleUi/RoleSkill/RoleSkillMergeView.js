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
    this.DWd = undefined;
    this.UWd = undefined;
    this.xWd = new RoleSkillTreeItemData_1.RoleSkillTreeItemData();
    this.BWd = new RoleSkillTreeInfoItemData_1.RoleSkillTreeInfoItemData();
    this.tgm = -1;
    this.xpt = () => {
      this.CloseMe();
    };
    this.Ido = e => {
      this.DWd?.SelectSkillItem(e);
      this.Rcm();
    };
    this.wcm = () => {
      var e = this.DWd?.GetCurrentSelectedSkillItem();
      if (e) {
        e = e.GetSkillNodeId();
        this.BWd.SkillNodeId = e;
        this.UWd.Update(this.BWd);
        this.UWd.ShowLeftPanelByTabType(this.UWd.GetCurSkillTabShowType());
      }
    };
    this.Udo = e => {
      this.DWd?.OnSkillNodeLevelUp(e);
      this.Rcm();
    };
    this.TTt = () => {
      this.DWd?.OnAddCommonItemList();
    };
    this.qdi = () => {
      this.UWd?.OnCommonItemCountAnyChange();
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
    await this.NWd();
    this.AU();
  }
  OnBeforeShow() {
    this.bl();
    if (this.tgm >= 0) {
      this.igm(this.tgm);
      this.tgm = -1;
    }
    this.DWd?.PlayItemSequence("ChangeRole");
    this.DWd?.PlayItemSequence("MoveRight");
    this.UWd?.PlayItemSequence("Start");
  }
  async NWd() {
    this.DWd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
    this.UWd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    await Promise.all([this.DWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false), this.UWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(1), false)]);
    this.UWd.OnBackBtnCallBack = this.xpt;
  }
  async OnPlayingStartSequenceAsync() {
    await Promise.all([this.UWd?.PlayItemSequenceAsync("Start"), this.DWd?.PlayItemSequenceAsync("Start")]);
  }
  async OnPlayingCloseSequenceAsync() {
    await Promise.all([this.UWd?.PlayItemSequenceAsync("Close"), this.DWd?.PlayItemSequenceAsync("Close")]);
  }
  AU() {
    var e = this.OpenParam;
    this.xWd.RoleId = e.RoleId;
    this.BWd.RoleId = e.RoleId;
    this.tgm = e.SkillNodeIndex;
  }
  igm(e) {
    e = this.DWd.GetSkillItemByIndex(e);
    if (e) {
      this.DWd.SelectSkillItem(e, true);
      this.Rcm();
    }
  }
  bl() {
    this.DWd?.UpdateRole(this.xWd.RoleId);
    this.DWd?.SetSkillInputButtonVisible(false);
    this.Rcm();
  }
  Rcm() {
    var e;
    var t;
    var i = this.DWd?.GetCurrentSelectedSkillItem();
    if (i) {
      if ((e = i.GetType()) === 4 || e === 3) {
        this.wcm();
      } else {
        e = i.GetRoleId();
        t = (t = i.GetUpgradeSkillId()) > 0 ? t : i.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(e, t, this.wcm);
      }
    }
  }
}
exports.RoleSkillMergeView = RoleSkillMergeView;
//# sourceMappingURL=RoleSkillMergeView.js.map