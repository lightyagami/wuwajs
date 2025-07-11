"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniRoleHeadItem = undefined;
const UE = require("ue");
const RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniRoleHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.CreateThenShowByResourceIdAsync("UiItem_MiniRoleHead_Prefab", e, false);
    this.kwt = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    var e;
    var i = this.GetTexture(0);
    if (i && (e = RoleInfoById_1.configRoleInfoById.GetConfig(this.kwt)) && (e = e.RoleHeadIconBig) !== "" && e.length !== 0) {
      this.SetRoleIcon(e, i, this.kwt);
    }
  }
}
exports.MiniRoleHeadItem = MiniRoleHeadItem;
//# sourceMappingURL=MiniRoleHeadItem.js.map