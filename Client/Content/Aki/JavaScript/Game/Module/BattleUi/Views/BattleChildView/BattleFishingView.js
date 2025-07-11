"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleFishingView = undefined;
const UE = require("ue");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const FishingButton_1 = require("../FishingButton");
const BattleVisibleChildView_1 = require("./BattleVisibleChildView");
class BattleFishingView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Het = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Initialize(i) {
    super.Initialize(i);
    this.InitChildType(3);
  }
  async InitializeAsync(i) {
    await Promise.all([this.EW_(0, InputMappingsDefine_1.actionMappings.切换角色1), this.EW_(1, InputMappingsDefine_1.actionMappings.切换角色2), this.EW_(2, InputMappingsDefine_1.actionMappings.切换角色3), this.EW_(3, InputMappingsDefine_1.actionMappings.切换角色4)]);
  }
  Reset() {
    this.Het.length = 0;
    super.Reset();
  }
  async EW_(i, e) {
    var e = {
      ActionName: e
    };
    var t = new FishingButton_1.FishingButton();
    await t.CreateThenShowByActorAsync(this.GetItem(i).GetOwner(), e);
    this.Het.push(t);
  }
  SetDriveFishingShipVisible(i) {
    this.SetVisible(7, i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length === 2) {
      i = Number(i[1]);
      if (!Number.isNaN(i) && !(i < 0) && !(i >= this.BtnBindInfo.length) && (i = this.GetButton(i)?.GetRootComponent())) {
        return [i, i];
      } else {
        return undefined;
      }
    }
  }
}
exports.BattleFishingView = BattleFishingView;
//# sourceMappingURL=BattleFishingView.js.map