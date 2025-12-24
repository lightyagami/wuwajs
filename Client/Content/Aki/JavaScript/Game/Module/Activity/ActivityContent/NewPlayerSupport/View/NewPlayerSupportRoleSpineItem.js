"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportRoleSpineItem = undefined;
const UE = require("ue");
const NewPlayerSupportRoleBaseItem_1 = require("./NewPlayerSupportRoleBaseItem");
class NewPlayerSupportRoleSpineItem extends NewPlayerSupportRoleBaseItem_1.NewPlayerSupportRoleBaseItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.SpineSkeletonAnimationComponent]];
  }
  OnStart() {
    this.GetItem(0).SetUIActive(false);
    this.GetTexture(1).SetUIActive(false);
  }
  Refresh() {
    this.GetSpine(2).SetAnimation(0, "idle", true);
  }
}
exports.NewPlayerSupportRoleSpineItem = NewPlayerSupportRoleSpineItem;
//# sourceMappingURL=NewPlayerSupportRoleSpineItem.js.map