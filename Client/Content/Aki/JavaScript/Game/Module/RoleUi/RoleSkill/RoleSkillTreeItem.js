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
const RoleSkillBranchItem_1 = require("./RoleSkillBranchItem");
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
    this.aIm = undefined;
    this.B$f = undefined;
    this.v9f = false;
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.ydo]];
  }
  async OnBeforeStartAsync() {
    await this.XWd();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async XWd() {
    this.vdo = new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem();
    this.vdo.SetSkillBranchEnable(this.v9f);
    var e = this.vdo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Edo = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
    this.Edo.SetSkillBranchEnable(this.v9f);
    var i = this.Edo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.aIm = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
    this.aIm.SetSkillBranchEnable(this.v9f);
    var t = this.aIm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    var s = this.Bdo();
    var l = this.k$f();
    await Promise.all([e, i, t, s, l]);
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
    this.g9f();
  }
  async Bdo() {
    var i = [1, 2, 3, 4];
    this.Mdo = new Array(i.length);
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = i[e];
      var l = new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      l.SetSkillBranchEnable(this.v9f);
      var s = l.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      this.Mdo[e] = l;
      t.push(s);
    }
    await Promise.all(t);
  }
  async k$f() {
    this.B$f = new RoleSkillBranchItem_1.RoleSkillBranchItem();
    await this.B$f.CreateByActorAsync(this.GetItem(8).GetOwner());
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
    this.aIm?.OnNodeLevelChange(e);
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
          if (i.NodeIndex === 8) {
            this.Edo?.Update(this.dFe, i.Id);
          } else if (i.NodeIndex === 17) {
            this.aIm?.Update(this.dFe, i.Id);
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
    if (this.aIm) {
      var i = this.aIm.GetSkillTreeNodeConfig();
      if (i && e === i.NodeIndex) {
        return this.aIm;
      }
    }
    if (this.Edo) {
      i = this.Edo.GetSkillTreeNodeConfig();
      if (i && e === i.NodeIndex) {
        return this.Edo;
      }
    }
    for (const l of this.Mdo) {
      for (const r of l.GetSkillNodeItems()) {
        if (r) {
          var t = r.GetSkillTreeNodeConfig();
          if (t && e === t.NodeIndex) {
            return r;
          }
        }
      }
    }
    for (const h of this.vdo.GetSkillNodeItems()) {
      if (h) {
        var s = h.GetSkillTreeNodeConfig();
        if (s && e === s.NodeIndex) {
          return h;
        }
      }
    }
  }
  GetCurrentSelectedSkillItem() {
    return this.Sdo;
  }
  g9f() {
    this.B$f.Refresh(this.dFe, this.v9f);
  }
  OnRoleSkillBranchChanged() {
    this.g9f();
    this.vdo?.OnSkillBranchChanged();
    this.Edo?.OnSkillBranchChanged();
    this.aIm?.OnSkillBranchChanged();
    if (this.Mdo) {
      for (const e of this.Mdo) {
        e.OnSkillBranchChanged();
      }
    }
  }
  SetEnableSwitchBranch(e) {
    this.v9f = e;
  }
  SetSkillBranchVisible(e, i) {
    this.B$f?.SetSkillBranchVisible(e, i);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "FirstDoubleTag") {
      let e = undefined;
      do {
        if (e = this.vdo?.FindDoubleTagSkillTog()) {
          break;
        }
        for (const i of this.Mdo) {
          if (e = i.FindDoubleTagSkillTog()) {
            break;
          }
        }
      } while (0);
      if (e) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.RoleSkillTreeItem = RoleSkillTreeItem;
//# sourceMappingURL=RoleSkillTreeItem.js.map