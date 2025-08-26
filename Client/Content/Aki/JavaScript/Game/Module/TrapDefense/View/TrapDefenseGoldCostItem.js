"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseGoldCostItem = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
class TrapDefenseGoldCostItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments);
    this.OnCurrentGoldUpdate = (e, t) => {
      t = MathUtils_1.MathUtils.LongToNumber(t.oTs);
      this.SetCount(t);
    };
  }
  async Init(e) {
    await this.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", e);
    this.SetButtonActive(false);
    this.UpdateGoldCostNum();
  }
  AddEventListener() {
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.AddTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Gold, this.OnCurrentGoldUpdate);
  }
  RemoveEventListener() {
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RemoveTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Gold, this.OnCurrentGoldUpdate);
  }
  UpdateGoldCostNum() {
    this.SetCount(ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum());
  }
}
exports.TrapDefenseGoldCostItem = TrapDefenseGoldCostItem;
//# sourceMappingURL=TrapDefenseGoldCostItem.js.map