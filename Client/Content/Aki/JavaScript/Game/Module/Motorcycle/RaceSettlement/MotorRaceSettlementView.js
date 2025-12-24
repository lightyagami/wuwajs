"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorRaceSettlementView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
class MotorRaceSettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Nvr = 0;
    this._Xe = -1;
    this.HMf = () => {
      this.Nvr = 1;
      this.CloseMe();
    };
    this.jMf = () => {
      this.Nvr = 0;
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UIText]];
    this.BtnBindInfo = [[3, this.HMf], [4, this.jMf]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this._Xe = e.IncId;
    let t = 2;
    if (e.Score >= e.RankS) {
      t = 0;
    } else if (e.Score >= e.RankB) {
      t = 1;
    }
    this.GetItem(0).SetUIActive(t === 0);
    this.GetItem(1).SetUIActive(t === 1);
    this.GetItem(2).SetUIActive(t === 2);
    this.GetItem(5).SetUIActive(t === 0);
    this.GetItem(6).SetUIActive(t === 1);
    this.GetItem(7).SetUIActive(t === 2);
    this.GetText(11).SetText(e.RankS.toString());
    this.GetText(12).SetText(e.RankA.toString());
    this.GetText(13).SetText(e.RankB.toString());
    this.GetText(8)?.SetText(e.Score.toString());
  }
  OnAfterDestroy() {
    this.$Ge(this.Nvr, this._Xe);
  }
  $Ge(e, t) {
    GeneralLogicTreeController_1.GeneralLogicTreeController.OpenSystemBoardResultRequest(e, t);
  }
}
exports.MotorRaceSettlementView = MotorRaceSettlementView;
//# sourceMappingURL=MotorRaceSettlementView.js.map