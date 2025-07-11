"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillCombineItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BattleSkillCombineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.Qtt = new CommonKeyItem_1.CommonKeyItem();
    await this.Qtt.CreateThenShowByActorAsync(e.GetOwner());
    this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.组合主键);
  }
  OnStart() {}
  SetVisible(e) {
    if (e) {
      if (!this.IsShowOrShowing) {
        this.Show();
      }
    } else if (this.IsShowOrShowing) {
      this.Hide();
    }
  }
  Refresh() {
    this.Qtt?.RefreshAction(InputMappingsDefine_1.actionMappings.组合主键);
  }
}
exports.BattleSkillCombineItem = BattleSkillCombineItem;
//# sourceMappingURL=BattleSkillCombineItem.js.map