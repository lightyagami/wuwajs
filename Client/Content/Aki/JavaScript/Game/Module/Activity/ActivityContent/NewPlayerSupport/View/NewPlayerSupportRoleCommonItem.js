"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportRoleCommonItem = undefined;
const UE = require("ue");
const NewPlayerSupportRoleBaseItem_1 = require("./NewPlayerSupportRoleBaseItem");
class NewPlayerSupportRoleCommonItem extends NewPlayerSupportRoleBaseItem_1.NewPlayerSupportRoleBaseItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture]];
  }
  Refresh() {
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(false);
    this.SetTextureByPath(this.TrialRoleInfo.ContentTexturePath, this.GetTexture(4));
  }
}
exports.NewPlayerSupportRoleCommonItem = NewPlayerSupportRoleCommonItem;
//# sourceMappingURL=NewPlayerSupportRoleCommonItem.js.map