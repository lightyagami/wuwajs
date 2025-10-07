"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleSkillDefine_1 = require("./RoleSkillDefine");
const RoleSkillTreeItem_1 = require("./RoleSkillTreeItem");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const LogReportController_1 = require("../../LogReport/LogReportController");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.jVd = undefined;
    this.dFe = 0;
    this.Sdo = undefined;
    this.Kco = e => {
      this.jVd?.OnRoleChange(e);
      this.wdo(e);
    };
    this.Ido = e => {
      if (e === this.Sdo) {
        this.Sdo.SetToggleState(1);
      } else {
        this.Sdo?.SetToggleState(0);
        this.Sdo = e;
        this.Sdo.SetToggleState(1);
        this.Tdo();
      }
    };
    this.Qco = () => {
      this.jVd.UiLevelSequence.StopSequenceByKey("MoveLeft");
      this.jVd.UiLevelSequence.PlaySequence("MoveLeft");
      this.$co();
      this.Ado(true);
    };
    this.Pdo = () => {
      this.jVd.UiLevelSequence.StopSequenceByKey("MoveLeft");
      this.jVd.UiLevelSequence.PlaySequence("MoveLeft");
      this.$co();
      this.Ado(true);
    };
    this.Ldo = e => {
      this.jVd?.OnAttributeNodeActive(e);
    };
    this.Udo = e => {
      this.jVd?.OnSkillNodeLevelUp(e);
    };
    this.TTt = () => {
      this.jVd?.OnAddCommonItemList();
    };
    this.wdo = e => {
      this.dFe = e;
      this.jVd?.InitByData(e);
      this.Refresh();
    };
    this.Rdo = () => {
      var e;
      if (this.Sdo && this.d1o.RoleViewState !== 0) {
        e = this.Sdo.GetSkillNodeId();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateSkillTreeInfoView, this.dFe, e);
      }
    };
    this.xdo = () => {
      var e;
      var t;
      if (this.Sdo && this.d1o.RoleViewState !== 1) {
        e = this.Sdo.GetSkillNodeId();
        (t = new RoleSkillDefine_1.RoleSkillTreeInfoViewData()).RoleId = this.dFe;
        t.SkillNodeId = e;
        t.RoleViewAgent = this.d1o;
        UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", t);
        this.Ado(false);
        this.jVd.UiLevelSequence.StopSequenceByKey("MoveRight");
        this.jVd.UiLevelSequence.PlaySequence("MoveRight");
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
      await this.jVd.CreateByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false);
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
    this.jVd?.OnRoleChange(e);
    this.wdo(e);
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(false);
    this.jVd?.SetUiActive(true);
  }
  OnBeforeHide() {
    if (UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor()) {
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(true);
    }
    this.jVd?.SetUiActive(false);
  }
  OnAfterShow() {
    var e = new LogReportDefine_1.RoleSkillTreeLogEvent();
    LogReportController_1.LogReportController.LogReport(e);
  }
  $co() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  RefreshRole(e) {
    this.jVd?.RefreshRole(e);
  }
  Tdo() {
    if (this.Sdo) {
      var t = this.Sdo.GetRoleId();
      var i = this.d1o.RoleViewState;
      var s = this.Sdo.GetType();
      let e = undefined;
      e = i === 1 ? this.Rdo : this.xdo;
      if (s === 4 || s === 3) {
        e();
      } else {
        s = (i = this.Sdo.GetUpgradeSkillId()) > 0 ? i : this.Sdo.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(t, s, e);
      }
    }
  }
  Ado(e) {
    this.jVd?.SetSkillInputButtonVisible(e);
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
//# sourceMappingURL=RoleSkillTreeView.js.map