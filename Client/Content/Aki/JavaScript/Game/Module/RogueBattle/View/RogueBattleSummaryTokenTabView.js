"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleSummaryTokenTabView = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RogueBattleTokenGrid_1 = require("../Component/RogueBattleTokenGrid"),
  RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem");
class RogueBattleSummaryTokenTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.OG1 = void 0, this.qG1 = void 0, this.Bqe = () => {
      var e = new RogueBattleTokenGrid_1.RogueBattleTokenGrid;
      return e.SelectCallback = this.UIi, e
    }, this.UIi = (e, t) => {
      this.qG1?.Refresh(t, !1, 0), this.qG1?.SetUiActive(!0), this.OG1?.SelectGridProxy(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.OG1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.Bqe), this.qG1 = new RogueBattleTokenItem_1.RogueBattleTokenItem;
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetTokenData();
    await Promise.all([this.qG1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.OG1.RefreshByDataAsync(e, !0)]), 0 < e.length ? (this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(!0), this.OG1.SelectGridProxy(0), this.qG1.Refresh(e[0], !1, 0), this.qG1.SetUiActive(!0)) : (this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(!1), this.qG1.SetUiActive(!1))
  }
}
exports.RogueBattleSummaryTokenTabView = RogueBattleSummaryTokenTabView;
//# sourceMappingURL=RogueBattleSummaryTokenTabView.js.map