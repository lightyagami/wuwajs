"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportSettlementSuccessItem = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class PunishReportSettlementSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Lqi = new CustomPromise_1.CustomPromise();
    this.yct = e => {
      if (e === "Start") {
        this.Lqi.SetResult(true);
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  async ShowTip() {
    await this.ShowAsync();
    this.SPe.PlayLevelSequenceByName("Start");
    await this.Lqi.Promise;
  }
}
exports.PunishReportSettlementSuccessItem = PunishReportSettlementSuccessItem;
//# sourceMappingURL=PunishReportSettlementSuccessItem.js.map