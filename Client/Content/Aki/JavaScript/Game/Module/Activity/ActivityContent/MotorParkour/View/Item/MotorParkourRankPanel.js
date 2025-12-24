"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourRankPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const MotorParkourGameRankItem_1 = require("./MotorParkourGameRankItem");
class MotorParkourRankPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.qMf = undefined;
    this.Zed = 0;
    this.Nn1 = () => {
      return new MotorParkourGameRankItem_1.MotorParkourGameRankItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.qMf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Nn1);
    this.Zed = CommonParamById_1.configCommonParamById.GetIntConfig("MotorRacingRoundTime") ?? 3000;
  }
  RefreshRankList(e) {
    this.qMf.RefreshByData(e, () => {
      this.SetActive(true);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.SetActive(false);
      }, this.Zed);
    }, true);
  }
}
exports.MotorParkourRankPanel = MotorParkourRankPanel;
//# sourceMappingURL=MotorParkourRankPanel.js.map