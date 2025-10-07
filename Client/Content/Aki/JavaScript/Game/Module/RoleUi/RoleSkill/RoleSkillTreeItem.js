"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
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
    this.$pt = undefined;
    this.ydo = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
      UiManager_1.UiManager.OpenView("RoleSkillInputView", e);
    };
    this.UpdateRole = e => {
      this.dFe = e;
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.ydo]];
  }
  async OnBeforeStartAsync() {
    await this.i5d();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async i5d() {
    this.vdo = new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem();
    this.Edo = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
    await Promise.all([this.vdo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Edo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.Bdo()]);
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
  }
  async Bdo() {
    var i = [1, 2, 3, 4];
    this.Mdo = new Array(i.length);
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = i[e];
      var l = new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      var s = l.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      this.Mdo[e] = l;
      t.push(s);
    }
    await Promise.all(t);
  }
  SelectSkillItem(e, i = false) {
    if (e === this.Sdo) {
      this.Sdo.SetToggleState(1);
    } else {
      this.Sdo?.SetToggleState(0);
      this.Sdo = e;
      this.Sdo.SetToggleState(1, i);
    }
  }
  CancelToggleSelect() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  OnSkillNodeLevelUp(e) {
    this.Ddo(e);
  }
  OnAddCommonItemList() {
    this.Refresh();
  }
  Ddo(e) {
    this.vdo.OnNodeLevelChange(e);
    for (const i of this.Mdo) {
      i.OnNodeLevelChange(e);
    }
    this.Edo.OnNodeLevelChange(e);
  }
  OnAttributeNodeActive(e) {
    this.Ddo(e);
  }
  SetSkillInputButtonVisible(e) {
    this.GetButton(6).GetRootComponent().SetUIActive(e);
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
  PlayItemSequence(e) {
    this.$pt.PlayOrReplaySequenceByName(e);
  }
  async PlayItemSequenceAsync(e) {
    await this.$pt.PlaySequenceAsync(e, new CustomPromise_1.CustomPromise());
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
  GetCurrentSelectedSkillItem() {
    return this.Sdo;
  }
}
exports.RoleSkillTreeItem = RoleSkillTreeItem;
//# sourceMappingURL=RoleSkillTreeItem.js.map