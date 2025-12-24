"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureMissionItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class InfrastructureMissionItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite]];
  }
  Refresh(t) {
    this.GetText(2).SetUIActive(true);
    this.GetText(2).ShowTextNew(t.DesText);
    this.GetSprite(1).SetUIActive(t.CurrentCount >= t.MaxCount);
    this.GetText(3).SetText(t.CurrentCount + "/" + t.MaxCount);
    if (t.CurrentCount >= t.MaxCount) {
      this.GetText(3).SetColor(UE.Color.FromHex("#d5ec20"));
      this.GetText(2).SetColor(UE.Color.FromHex("#d5ec20"));
    }
  }
}
exports.InfrastructureMissionItem = InfrastructureMissionItem;
//# sourceMappingURL=InfrastructureMissionItem.js.map