"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRankTimeModel = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RankTimeItemModel_1 = require("../../InstanceDungeon/InstanceDungeonComponentModel/RankTimeItemModel");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerDefenseRankViewModel_1 = require("./TowerDefenseRankViewModel");
class TowerDefenseRankTimeModel extends RankTimeItemModel_1.RankTimeItemModelBase {
  OnButtonClick() {
    var e = new TowerDefenseRankViewModel_1.TowerDefenseRankViewModel();
    e.InstanceId = this.InstanceId;
    UiManager_1.UiManager.OpenView("TowerDefenseRankView", e);
  }
  OnGetContent() {
    var e;
    if (ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsPassedInstance(this.InstanceId)) {
      e = ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetBestScoreText(this.InstanceId);
      return new LguiUtil_1.TableTextArgNew("ChallengeOL_Bestrecord", e);
    } else {
      return new LguiUtil_1.TableTextArgNew("ChallengeOL_Norecord");
    }
  }
}
exports.TowerDefenseRankTimeModel = TowerDefenseRankTimeModel;
//# sourceMappingURL=TowerDefenseRankTimeModel.js.map