"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSubDungeonItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchSubDungeonItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite]];
  }
  Refresh(e, t, r) {
    this.GetSprite(3)?.SetUIActive(r !== 0);
    this.GetSprite(0)?.SetUIActive(e.IsFinished);
    this.GetSprite(2)?.SetUIActive(e.IsFinished && r !== 0);
    this.GetSprite(1)?.SetUIActive(!e.IsUnLock);
  }
}
exports.FloroRanchSubDungeonItem = FloroRanchSubDungeonItem;
//# sourceMappingURL=FloroRanchSubDungeonItem.js.map