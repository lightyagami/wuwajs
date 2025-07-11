"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleHandBookSelectionComponent = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
class RoleHandBookSelectionComponent {
  constructor() {
    this.RoleScroll = undefined;
    this.RoleHandBookItem = undefined;
    this.PlaySequence = () => {
      if (this.RoleHandBookItem) {
        this.RoleHandBookItem.PlaySequence();
      }
    };
  }
  UpdateRoleHandBookItem(e) {}
  GetCurSelectRoleId() {
    return 0;
  }
  GetAllRoleItemMap() {
    return this.RoleScroll.GetScrollItemMap();
  }
  UpdateComponent(e) {}
  RefreshRoleItem(e) {}
  UpdateItemByRoleId(e) {
    var o = this.GetAllRoleItemMap().get(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    o.UpdateItem(e);
  }
  OnBeforeDestroy() {}
}
exports.RoleHandBookSelectionComponent = RoleHandBookSelectionComponent;
//# sourceMappingURL=RoleHandBookSelectionComponent.js.map