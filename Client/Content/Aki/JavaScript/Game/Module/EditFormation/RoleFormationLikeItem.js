"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFormationLikeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleFormationLikeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eTt = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UIButtonComponent], [2, UE.UISprite]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Refresh(e) {
    var r = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
    let s = 0;
    if (r) {
      for (const t of r.TRs) {
        if (t.W5n === e) {
          s = t.yPc;
          break;
        }
      }
    }
    this.GetText(1).SetText(s.toString());
  }
}
exports.RoleFormationLikeItem = RoleFormationLikeItem;
//# sourceMappingURL=RoleFormationLikeItem.js.map