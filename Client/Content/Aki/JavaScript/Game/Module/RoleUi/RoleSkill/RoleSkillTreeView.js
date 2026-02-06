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
    this.kWd = undefined;
    this.dFe = 0;
    this.Z0m = new RoleSkillDefine_1.RoleSkillTreeInfoViewData();
    this.eCm = -1;
    this.Kco = e => {
      this.kWd.PlayItemSequence("ChangeRole");
      this.wdo(e);
    };
    this.Qco = () => {
      this.kWd.PlayItemSequence("MoveLeft");
      this.kWd.CancelToggleSelect();
      this.Ado(true);
      this.eCm = -1;
    };
    this.Pdo = () => {
      this.kWd.PlayItemSequence("MoveLeft");
      this.kWd.CancelToggleSelect();
      this.Ado(true);
    };
    this.Ldo = e => {
      this.kWd?.OnAttributeNodeActive(e);
      if (this.d1o.RoleViewState === 1) {
        this.Rdo();
      }
    };
    this.Udo = e => {
      var t;
      this.kWd?.OnSkillNodeLevelUp(e);
      if (this.d1o.RoleViewState === 1) {
        e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).SkillId;
        t = (t = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(e, this.dFe)) > 0 ? t : e;
        RoleController_1.RoleController.SendRoleSkillViewRequest(this.dFe, t, this.Rdo);
      }
    };
    this.Ido = e => {
      this.kWd?.SelectSkillItem(e);
      this.Tdo();
    };
    this.TTt = () => {
      this.kWd?.OnAddCommonItemList();
    };
    this.wdo = e => {
      this.dFe = e;
      this.Refresh();
    };
    this.Rdo = () => {
      this.tCm();
      if (this.d1o.RoleViewState !== 0 && this.eCm !== -1) {
        UiManager_1.UiManager.GetView(this.eCm)?.Refresh();
      }
    };
    this.xdo = () => {
      if (this.kWd?.GetCurrentSelectedSkillItem()) {
        this.tCm();
        UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", this.Z0m, (e, t) => {
          this.eCm = t;
        });
        this.Ado(false);
        this.kWd.PlayItemSequence("MoveRight");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewEnter);
      }
    };
    this.m9f = () => {
      this.kWd?.OnRoleSkillBranchChanged();
    };
    this._8g = e => {
      this.kWd?.SetSkillBranchVisible(1, !e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.d1o = this.ExtraParams;
    if (this.d1o !== undefined) {
      this.kWd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
      this.kWd.SetEnableSwitchBranch(this.d1o.GetRoleSystemMode() !== 2);
      await this.kWd.CreateThenShowByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.m9f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkillInputPanelVisible, this._8g);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTabOutside, this.Pdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeActive, this.Ldo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkillBranchChanged, this.m9f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkillInputPanelVisible, this._8g);
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
    if (this.d1o.GetPreSelectTabName() === this.GetViewName()) {
      this.kWd?.PlayItemSequence("ChangeRole");
    } else {
      this.kWd?.PlayItemSequence("Sle");
    }
  }
  OnShowUiTabViewFromView() {
    this.kWd?.PlayItemSequence("Start");
  }
  Refresh() {
    this.kWd?.UpdateRole(this.dFe);
  }
  Tdo() {
    var t = this.kWd?.GetCurrentSelectedSkillItem();
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
  tCm() {
    var e = this.kWd?.GetCurrentSelectedSkillItem();
    if (e) {
      e = e.GetSkillNodeId();
      this.Z0m.RoleId = this.dFe;
      this.Z0m.SkillNodeId = e;
      this.Z0m.RoleViewAgent = this.d1o;
    }
  }
  Ado(e) {
    this.kWd?.SetSkillInputButtonVisible(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "FirstDoubleTag") {
      return this.kWd?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
//# sourceMappingURL=RoleSkillTreeView.js.map