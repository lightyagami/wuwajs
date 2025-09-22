"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopDragDataItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonDragLogicDataItem_1 = require("../../../../Ui/Common/CommonDragLogicDataItem");
class TrapDefenseBuildingDevelopDragDataItem extends CommonDragLogicDataItem_1.CommonDragLogicDataItem {
  constructor() {
    super(...arguments);
    this.Smd = -1;
  }
  CheckIfCanDrag() {
    return ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckIfCanDrag();
  }
  CheckIfCurrentDragIndex(e) {
    return ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckIfCurrentDragIndex(e);
  }
  SetCurrentDragIndex(e) {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.SetCurrentDragIndex(e);
  }
  ClearCurrentDragIndex() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.ClearCurrentDragIndex();
  }
  GetClickTime() {
    if (this.Smd === -1) {
      this.Smd = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetDragItemClickTime();
    }
    return this.Smd;
  }
}
exports.TrapDefenseBuildingDevelopDragDataItem = TrapDefenseBuildingDevelopDragDataItem;
//# sourceMappingURL=TrapDefenseBuildingDevelopDragDataItem.js.map