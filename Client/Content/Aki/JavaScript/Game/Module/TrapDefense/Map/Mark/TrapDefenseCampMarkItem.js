"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseCampMarkItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TrapDefenseMarkItem_1 = require("./TrapDefenseMarkItem");
class TrapDefenseCampMarkItem extends TrapDefenseMarkItem_1.TrapDefenseMarkItem {
  OnInitialize() {
    this.EnableCachePosition = true;
  }
  get MarkType() {
    return 4;
  }
  get WorldPosition() {
    return ModelManager_1.ModelManager.TrapDefenseModel.MapData.CampPosition;
  }
}
exports.TrapDefenseCampMarkItem = TrapDefenseCampMarkItem;
//# sourceMappingURL=TrapDefenseCampMarkItem.js.map