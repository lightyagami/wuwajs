"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleController_1 = require("../RoleController");
const RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem");
const RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem");
const RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillTreeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.vdo = undefined;
    this.Mdo = undefined;
    this.Edo = undefined;
    this.Sdo = undefined;
    this.UiLevelSequence = undefined;
    this.ydo = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
      UiManager_1.UiManager.OpenView("RoleSkillInputView", e);
    };
    this.wdo = e => {
      this.dFe = e;
      this.bl(e);
    };
    this.Rdo = () => {
      var e;
      if (this.Sdo) {
        e = this.Sdo.GetSkillNodeId();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateSkillTreeInfoView, this.dFe, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.ydo]];
  }
  OnBeforeCreate() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  async OnBeforeStartAsync() {
    await this.i5d();
    return Promise.resolve();
  }
  async i5d() {
    this.vdo = new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem();
    await this.vdo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Edo = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
    await this.Edo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    await this.Bdo();
  }
  bl(e) {
    this.dFe = e;
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.SetSkillInputButtonVisible(true);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  async Bdo() {
    var i = [1, 2, 3, 4];
    this.Mdo = new Array(i.length);
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = i[e];
      var r = new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      var s = r.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      this.Mdo[e] = r;
      t.push(s);
    }
    await Promise.all(t);
  }
  OnBeforeShow() {
    RoleController_1.RoleController.PlayRoleMontage(5);
  }
  InitByData(e) {
    this.dFe = e;
    this.bl(e);
  }
  OnNodeToggleClick(e) {
    if (e === this.Sdo) {
      this.Sdo.SetToggleState(1);
    } else {
      this.Sdo?.SetToggleState(0);
      this.Sdo = e;
      this.Sdo.SetToggleState(1);
      this.Tdo();
    }
  }
  $co() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  OnSkillNodeLevelUp(e) {
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
    this.Ddo(e);
    var e = i.SkillId;
    var i = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(e, this.dFe);
    var i = i > 0 ? i : e;
    RoleController_1.RoleController.SendRoleSkillViewRequest(this.dFe, i, this.Rdo);
  }
  OnAddCommonItemList() {
    this.bl(this.dFe);
  }
  Ddo(e) {
    this.vdo.OnNodeLevelChange(e);
    for (const i of this.Mdo) {
      i.OnNodeLevelChange(e);
    }
    this.Edo.OnNodeLevelChange(e);
  }
  OnRoleInternalViewQuit() {
    this.UiLevelSequence.StopSequenceByKey("MoveLeft");
    this.UiLevelSequence.PlaySequence("MoveLeft");
    this.$co();
    this.SetSkillInputButtonVisible(true);
  }
  OnSelectRoleTabOutside() {
    this.UiLevelSequence.StopSequenceByKey("MoveLeft");
    this.UiLevelSequence.PlaySequence("MoveLeft");
    this.$co();
    this.SetSkillInputButtonVisible(true);
  }
  OnRoleChange(e) {
    this.UiLevelSequence.StopSequenceByKey("ChangeRole");
    this.UiLevelSequence.PlaySequence("ChangeRole");
    this.wdo(e);
  }
  OnAttributeNodeActive(e) {
    this.Ddo(e);
    this.Rdo();
  }
  SetSkillInputButtonVisible(e) {
    this.GetButton(6).GetRootComponent().SetUIActive(e);
  }
  Tdo() {
    var e;
    var i;
    var t;
    if (this.Sdo) {
      e = this.Sdo.GetRoleId();
      i = this.Rdo;
      t = (t = this.Sdo.GetUpgradeSkillId()) > 0 ? t : this.Sdo.GetSkillId();
      RoleController_1.RoleController.SendRoleSkillViewRequest(e, t, i);
    }
  }
  RefreshRole(e) {
    for (const i of e) {
      switch (i.NodeType) {
        case 1:
          this.vdo.Update(this.dFe, i.Id);
          break;
        case 2:
          if (i.Coordinate <= this.Mdo.length) {
            this.Mdo[i.Coordinate - 1]?.Update(this.dFe, i.Id);
          }
          break;
        case 4:
          break;
        case 3:
          if (i.ParentNodes === undefined || i.ParentNodes.length === 0) {
            this.Edo?.Update(this.dFe, i.Id);
          }
      }
    }
  }
  GetSkillItemByIndex(e) {
    var i;
    if (e >= 0 && e <= 3) {
      if (this.Mdo && e < this.Mdo.length) {
        if ((i = this.Mdo[e].GetSkillNodeItems()).length > 0) {
          return i[0];
        } else {
          return undefined;
        }
      }
    } else if (e === 4 && this.Edo) {
      return this.Edo;
    }
  }
}
exports.RoleSkillTreeItem = RoleSkillTreeItem;
//# sourceMappingURL=RoleSkillTreeItem.js.map