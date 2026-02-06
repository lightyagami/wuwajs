"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPreviewSubViewBase = undefined;
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
class TotalTopUpPreviewSubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnStart() {
    var e = this.RootItem;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    this.SPe?.PlayLevelSequenceByName("Start");
  }
}
exports.TotalTopUpPreviewSubViewBase = TotalTopUpPreviewSubViewBase;
//# sourceMappingURL=TotalTopUpPreviewSubViewBase.js.map