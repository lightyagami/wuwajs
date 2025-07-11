"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportSettlementConditionItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PunishReportSettlementConditionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Lqi = new CustomPromise_1.CustomPromise();
    this.IGl = false;
    this.yct = e => {
      if (e === "Finish") {
        this.Lqi.SetResult(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
  }
  Init(e, i, t) {
    var s = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, e);
    this.GetSprite(0)?.SetUIActive(i === 1);
    this.IGl = i !== t && t === 1;
  }
  async PlaySequence() {
    if (this.IGl) {
      this.GetSprite(0)?.SetUIActive(true);
      this.SPe?.PlayLevelSequenceByName("Finish");
      await this.Lqi.Promise;
    }
  }
}
exports.PunishReportSettlementConditionItem = PunishReportSettlementConditionItem;
//# sourceMappingURL=PunishReportSettlementConditionItem.js.map