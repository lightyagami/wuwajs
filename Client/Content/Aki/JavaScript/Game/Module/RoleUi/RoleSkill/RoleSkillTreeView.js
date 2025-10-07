"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogReportController_1 = require("../../LogReport/LogReportController");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleSkillDefine_1 = require("./RoleSkillDefine");
const RoleSkillTreeItem_1 = require("./RoleSkillTreeItem");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.jVd = undefined;
    this.dFe = 0;
    this.jQd = new RoleSkillDefine_1.RoleSkillTreeInfoViewData();
    this.HQd = -1;
    this.Kco = e => {
      this.jVd.PlayItemSequence("ChangeRole");
      this.wdo(e);
    };
    this.Qco = () => {
      this.jVd.PlayItemSequence("MoveLeft");
      this.jVd.CancelToggleSelect();
      this.Ado(true);
      this.HQd = -1;
    };
    this.Pdo = () => {
      this.jVd.PlayItemSequence("MoveLeft");
      this.jVd.CancelToggleSelect();
      this.Ado(true);
    };
    this.Ldo = e => {
      this.jVd?.OnAttributeNodeActive(e);
      if (this.d1o.RoleViewState === 1) {
        this.Rdo();
      }
    };
    this.Udo = e => {
      var t;
      this.jVd?.OnSkillNodeLevelUp(e);
      if (this.d1o.RoleViewState === 1) {
        e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).SkillId;
        t = (t = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(e, this.dFe)) > 0 ? t : e;
        RoleController_1.RoleController.SendRoleSkillViewRequest(this.dFe, t, this.Rdo);
      }
    };
    this.Ido = e => {
      this.jVd?.SelectSkillItem(e);
      this.Tdo();
    };
    this.TTt = () => {
      this.jVd?.OnAddCommonItemList();
    };
    this.wdo = e => {
      this.dFe = e;
      this.Refresh();
    };
    this.Rdo = () => {
      this.$Qd();
      if (this.d1o.RoleViewState !== 0 && this.HQd !== -1) {
        UiManager_1.UiManager.GetView(this.HQd)?.Refresh();
      }
    };
    this.xdo = () => {
      if (this.jVd?.GetCurrentSelectedSkillItem()) {
        this.$Qd();
        UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", this.jQd, (e, t) => {
          this.HQd = t;
        });
        this.Ado(false);
        this.jVd.PlayItemSequence("MoveRight");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewEnter);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.d1o = this.ExtraParams;
    if (this.d1o !== undefined) {
      this.jVd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
      await this.jVd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectRoleTabOutside, this.Pdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeActive, this.Ldo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTabOutside, this.Pdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeActive, this.Ldo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  OnBeforeShow() {
    RoleController_1.RoleController.PlayRoleMontage(5);
    var e = this.d1o.GetCurSelectRoleId();
    this.wdo(e);
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(false);
  }
  OnBeforeHide() {
    if (UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor()) {
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(true);
    }
  }
  OnAfterShow() {
    var e = new LogReportDefine_1.RoleSkillTreeLogEvent();
    LogReportController_1.LogReportController.LogReport(e);
  }
  OnShowUiTabViewFromToggle() {
    this.jVd?.PlayItemSequence("Sle");
  }
  OnShowUiTabViewFromView() {
    this.jVd?.PlayItemSequence("Start");
  }
  Refresh() {
    this.jVd?.UpdateRole(this.dFe);
  }
  Tdo() {
    var t = this.jVd?.GetCurrentSelectedSkillItem();
    if (t) {
      var i = t.GetRoleId();
      var s = this.d1o.RoleViewState;
      var n = t.GetType();
      let e = undefined;
      e = s === 1 ? this.Rdo : this.xdo;
      if (n === 4 || n === 3) {
        e();
      } else {
        n = (s = t.GetUpgradeSkillId()) > 0 ? s : t.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(i, n, e);
      }
    }
  }
  $Qd() {
    var e = this.jVd?.GetCurrentSelectedSkillItem();
    if (e) {
      e = e.GetSkillNodeId();
      this.jQd.RoleId = this.dFe;
      this.jQd.SkillNodeId = e;
      this.jQd.RoleViewAgent = this.d1o;
    }
  }
  Ado(e) {
    this.jVd?.SetSkillInputButtonVisible(e);
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
//# sourceMappingURL=RoleSkillTreeView.js.map