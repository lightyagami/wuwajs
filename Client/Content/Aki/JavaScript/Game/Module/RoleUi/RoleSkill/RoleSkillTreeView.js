"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleSkillDefine_1 = require("./RoleSkillDefine");
const RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem");
const RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem");
const RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.d1o = undefined;
    this.dFe = 0;
    this.vdo = undefined;
    this.Mdo = undefined;
    this.Edo = undefined;
    this.Sdo = undefined;
    this.ydo = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
      UiManager_1.UiManager.OpenView("RoleSkillInputView", e);
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
    this.Ldo = e => {
      this.Ddo(e);
      if (this.d1o.RoleViewState === 1) {
        this.Rdo();
      }
    };
    this.Udo = e => {
      var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
      this.Ddo(e);
      if (this.d1o.RoleViewState === 1) {
        e = t.SkillId;
        t = (t = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(e, this.dFe)) > 0 ? t : e;
        RoleController_1.RoleController.SendRoleSkillViewRequest(this.dFe, t, this.Rdo);
      }
    };
    this.TTt = () => {
      this.Refresh();
    };
    this.Qco = () => {
      this.UiViewSequence.StopSequenceByKey("MoveLeft");
      this.UiViewSequence.PlaySequence("MoveLeft");
      this.$co();
      this.Ado(true);
    };
    this.Pdo = () => {
      this.UiViewSequence.StopSequenceByKey("MoveLeft");
      this.UiViewSequence.PlaySequence("MoveLeft");
      this.$co();
      this.Ado(true);
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
        this.UiViewSequence.StopSequenceByKey("MoveRight");
        this.UiViewSequence.PlaySequence("MoveRight");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleInternalViewEnter);
      }
    };
    this.Kco = e => {
      this.UiViewSequence.StopSequenceByKey("ChangeRole");
      this.UiViewSequence.PlaySequence("ChangeRole");
      this.wdo(e);
    };
    this.wdo = e => {
      this.dFe = e;
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.ydo]];
  }
  OnStart() {
    this.d1o = this.ExtraParams;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleSkillTreeView"]);
      }
    } else {
      this.vdo = new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem();
      this.vdo.CreateThenShowByActor(this.GetItem(0).GetOwner());
      this.Edo = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
      this.Edo.CreateThenShowByActor(this.GetItem(5).GetOwner());
      this.Bdo();
    }
  }
  Bdo() {
    var t = [1, 2, 3, 4];
    this.Mdo = new Array(t.length);
    for (let e = 0; e < t.length; e++) {
      var i = t[e];
      var s = new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      s.CreateThenShowByActor(this.GetItem(i).GetOwner());
      this.Mdo[e] = s;
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
  $co() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  Ddo(e) {
    this.vdo.OnNodeLevelChange(e);
    for (const t of this.Mdo) {
      t.OnNodeLevelChange(e);
    }
    this.Edo.OnNodeLevelChange(e);
  }
  Ado(e) {
    this.GetButton(6).GetRootComponent().SetUIActive(e);
  }
  Tdo() {
    if (this.Sdo) {
      var t = this.Sdo.GetRoleId();
      let e = undefined;
      e = this.d1o.RoleViewState === 1 ? this.Rdo : this.xdo;
      var i = this.Sdo.GetType();
      if (i === 4 || i === 3) {
        e();
      } else {
        i = (i = this.Sdo.GetUpgradeSkillId()) > 0 ? i : this.Sdo.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(t, i, e);
      }
    }
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.Ado(true);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  RefreshRole(e) {
    for (const t of e) {
      switch (t.NodeType) {
        case 1:
          this.vdo.Update(this.dFe, t.Id);
          break;
        case 2:
          if (t.Coordinate <= this.Mdo.length) {
            this.Mdo[t.Coordinate - 1]?.Update(this.dFe, t.Id);
          }
          break;
        case 4:
          break;
        case 3:
          if (t.ParentNodes === undefined || t.ParentNodes.length === 0) {
            this.Edo?.Update(this.dFe, t.Id);
          }
      }
    }
  }
}
exports.RoleSkillTreeView = RoleSkillTreeView;
//# sourceMappingURL=RoleSkillTreeView.js.map