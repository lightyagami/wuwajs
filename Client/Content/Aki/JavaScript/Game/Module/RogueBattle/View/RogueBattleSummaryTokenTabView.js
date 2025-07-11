"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSummaryTokenTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RogueBattleTokenGrid_1 = require("../Component/RogueBattleTokenGrid");
const RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem");
class RogueBattleSummaryTokenTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.mF1 = undefined;
    this.fF1 = undefined;
    this.Bqe = () => {
      var e = new RogueBattleTokenGrid_1.RogueBattleTokenGrid();
      e.SelectCallback = this.UIi;
      return e;
    };
    this.UIi = (e, t) => {
      this.fF1?.Refresh(t, false, 0);
      this.fF1?.SetUiActive(true);
      this.mF1?.SelectGridProxy(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.mF1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.Bqe);
    this.fF1 = new RogueBattleTokenItem_1.RogueBattleTokenItem();
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetTokenData();
    await Promise.all([this.fF1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.mF1.RefreshByDataAsync(e, true)]);
    if (e.length > 0) {
      this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(true);
      this.mF1.SelectGridProxy(0);
      this.fF1.Refresh(e[0], false, 0);
      this.fF1.SetUiActive(true);
    } else {
      this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(false);
      this.fF1.SetUiActive(false);
    }
  }
}
exports.RogueBattleSummaryTokenTabView = RogueBattleSummaryTokenTabView;
//# sourceMappingURL=RogueBattleSummaryTokenTabView.js.map