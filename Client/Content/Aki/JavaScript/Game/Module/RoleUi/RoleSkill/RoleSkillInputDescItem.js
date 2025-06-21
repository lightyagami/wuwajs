"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleSkillInputDescItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleSkillInputDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  Refresh(e, t, r) {
    this.GetText(0).ShowTextNew(e)
  }
}
exports.RoleSkillInputDescItem = RoleSkillInputDescItem;
//# sourceMappingURL=RoleSkillInputDescItem.js.map