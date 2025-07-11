"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySettlementView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeController_1 = require("../GeneralLogicTreeController");
class FlySettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Nvr = 0;
    this._Xe = -1;
    this.owl = () => {
      this.Nvr = 1;
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.p5t = () => {
      this.Nvr = 0;
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.owl], [3, this.p5t]];
  }
  OnStart() {
    var e = this.OpenParam;
    this._Xe = e.IncId;
    this.GetText(2)?.SetText(e.Score.toString());
    let i = "";
    i = e.Score >= e.RankS ? "T_FlyScoreS" : e.Score >= e.RankA ? "T_FlyScoreA" : "T_FlyScoreB";
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    var r = this.GetTexture(1);
    this.SetTextureByPath(t, r);
    var t = e.Score > e.BestRecordScore;
    this.GetTexture(4)?.SetUIActive(t);
    this.GetText(5)?.SetUIActive(t);
  }
  OnAfterDestroy() {
    this.$Ge(this.Nvr, this._Xe);
  }
  $Ge(e, i) {
    GeneralLogicTreeController_1.GeneralLogicTreeController.OpenSystemBoardResultRequest(e, i);
  }
}
exports.FlySettlementView = FlySettlementView;
//# sourceMappingURL=FlySettlementView.js.map