"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillChainItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleSkillTreeSkillItemBase_1 = require("./RoleSkillTreeSkillItemBase");
class RoleSkillChainItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SkillNodeItemList = [];
    this.LineItemList = [];
    this.IsSkillBranchEnable = false;
  }
  Update(i, e) {
    this.SkillNodeItemList[0].Update(i, e);
    let r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeIndex;
    let t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    var a = (t = t || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i)).GetRoleSkillTreeConfig();
    for (let e = 1; e < this.SkillNodeItemList.length; e++) {
      for (const l of a) {
        if (l.ParentNodes.length === 1 && l.ParentNodes[0] === r) {
          this.SkillNodeItemList[e].Update(i, l.Id);
          r = l.NodeIndex;
          break;
        }
      }
    }
    this.RefreshLine();
  }
  RefreshLine() {
    for (let e = 0; e < this.LineItemList.length; e++) {
      var i = e + 1;
      if (i >= this.SkillNodeItemList.length) {
        return;
      }
      var i = this.SkillNodeItemList[i];
      var r = i.GetSkillNodeId();
      var i = i.GetRoleId();
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(i, r);
      var r = this.LineItemList[e];
      r.SetChangeColor(i === 0, r.changeColor);
    }
  }
  OnNodeLevelChange(e) {
    for (const i of this.SkillNodeItemList) {
      i.OnNodeLevelChange(e);
    }
    this.RefreshLine();
  }
  GetSkillNodeItems() {
    return this.SkillNodeItemList;
  }
  SetSkillBranchEnable(e) {
    this.IsSkillBranchEnable = e;
  }
  OnSkillBranchChanged() {
    for (const e of this.SkillNodeItemList) {
      e.OnSkillBranchChanged();
    }
  }
  FindDoubleTagSkillTog() {
    for (const e of this.SkillNodeItemList) {
      if (e instanceof RoleSkillTreeSkillItemBase_1.RoleSkillTreeSkillItemBase && e.HasActiveBranchItem()) {
        return e.GetRootItem();
      }
    }
  }
}
exports.RoleSkillChainItem = RoleSkillChainItem;
//# sourceMappingURL=RoleSkillChainItem.js.map