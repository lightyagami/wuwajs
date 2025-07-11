"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestFailRangeTipsView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class QuestFailRangeTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.AYt = undefined;
    this.SPe = undefined;
    this.mNe = -0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.AYt = this.GetText(0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = this.OpenParam;
    this.mNe = e - TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
    this.PYt();
  }
  OnTick(e) {
    if (Time_1.Time.FlowTimeDilation !== 0 && (this.mNe = Math.max(this.mNe - e * Time_1.Time.TimeDilation, 0), this.PYt(), this.SPe.GetCurrentSequence() !== "Loop")) {
      this.SPe.PlayLevelSequenceByName("Loop", false);
    }
  }
  PYt() {
    var e = this.mNe / 1000;
    var e = Math.floor(e);
    this.AYt.SetText(e.toString());
  }
}
exports.QuestFailRangeTipsView = QuestFailRangeTipsView;
//# sourceMappingURL=QuestFailRangeTipsView.js.map