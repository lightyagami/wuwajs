"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapSummaryGridEffectTabView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleMapGridEffectItem_1 = require("../Component/RogueBattleMapGridEffectItem");
const MORE_HELPID = 260;
class RogueBattleMapSummaryGridEffectTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.VR1 = () => {
      this.GetItem(0)?.SetUIActive(true);
      this.GetItem(3)?.SetUIActive(false);
      var e = ModelManager_1.ModelManager.RogueBattleModel.GetEffectList();
      this.eGe?.RefreshByData(e, undefined, true);
      var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv;
      var e = e > 10 ? e.toString() : "0" + e;
      this.GetArtText(1).SetText(e);
    };
    this.sGe = () => new RogueBattleMapGridEffectItem_1.RogueBattleMapGridEffectTabItem();
    this.jR1 = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MORE_HELPID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIArtText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIArtText], [5, UE.UIVerticalLayout], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.jR1]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.sGe);
  }
  OnBeforeShow() {
    this.VR1();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  OnBeforeDestroy() {
    this.eGe = undefined;
  }
}
exports.RogueBattleMapSummaryGridEffectTabView = RogueBattleMapSummaryGridEffectTabView;
//# sourceMappingURL=RogueBattleMapSummaryGridEffectTabView.js.map