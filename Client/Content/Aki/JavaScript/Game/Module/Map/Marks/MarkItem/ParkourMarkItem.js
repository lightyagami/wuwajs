"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourMarkItem = undefined;
const ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class ParkourMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    var e = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(this.MarkId);
    return e !== undefined && (ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(e.Id)?.GetIsShow() ?? false);
  }
}
exports.ParkourMarkItem = ParkourMarkItem;
//# sourceMappingURL=ParkourMarkItem.js.map