"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCurrencyItem = undefined;
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonCurrencyItem_1 = require("../../../../Common/CommonCurrencyItem");
class SurvivorsRogueCurrencyItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments);
    this.OnSurvivorsCurrencyUpdate = (e, r) => {
      r = MathUtils_1.MathUtils.LongToNumber(r.oTs);
      this.SetCount(r);
    };
  }
  async Init(e) {
    await this.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", e);
    this.SetButtonActive(false);
    this.SetCount(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetCurrencyCount());
  }
  AddEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.OnSurvivorsCurrencyUpdate);
  }
  RemoveEventListener() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.OnSurvivorsCurrencyUpdate);
  }
}
exports.SurvivorsRogueCurrencyItem = SurvivorsRogueCurrencyItem;
//# sourceMappingURL=SurvivorsRogueCurrencyItem.js.map