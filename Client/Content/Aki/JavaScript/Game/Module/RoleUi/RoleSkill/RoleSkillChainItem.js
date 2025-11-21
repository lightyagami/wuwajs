"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillChainItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillChainItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SkillNodeItemList = [];
    this.LineItemList = [];
  }
  Update(a, e) {
    this.SkillNodeItemList[0].Update(a, e);
    let r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeIndex;
    let t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a);
    var i = (t = t || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a)).GetRoleSkillTreeConfig();
    for (let e = 1; e < this.SkillNodeItemList.length; e++) {
      for (const s of i) {
        if (s.ParentNodes.length === 1 && s.ParentNodes[0] === r) {
          this.SkillNodeItemList[e].Update(a, s.Id);
          r = s.NodeIndex;
          break;
        }
      }
    }
    this.RefreshLine();
  }
  RefreshLine() {
    for (let e = 0; e < this.LineItemList.length; e++) {
      var a = e + 1;
      if (a >= this.SkillNodeItemList.length) {
        return;
      }
      var a = this.SkillNodeItemList[a];
      var r = a.GetSkillNodeId();
      var a = a.GetRoleId();
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(a, r);
      var r = this.LineItemList[e];
      r.SetChangeColor(a === 0, r.changeColor);
    }
  }
  OnNodeLevelChange(e) {
    for (const a of this.SkillNodeItemList) {
      a.OnNodeLevelChange(e);
    }
    this.RefreshLine();
  }
  GetSkillNodeItems() {
    return this.SkillNodeItemList;
  }
}
exports.RoleSkillChainItem = RoleSkillChainItem;
//# sourceMappingURL=RoleSkillChainItem.js.map