"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInputDescItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleSkillInputDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, t, r) {
    this.GetText(0).ShowTextNew(e);
  }
}
exports.RoleSkillInputDescItem = RoleSkillInputDescItem;
//# sourceMappingURL=RoleSkillInputDescItem.js.map