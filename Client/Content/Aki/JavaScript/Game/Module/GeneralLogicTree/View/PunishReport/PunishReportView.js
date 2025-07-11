"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportView = undefined;
const UE = require("ue");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class PunishReportView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cZt = () => {
      this.UiViewSequence.RemoveSequenceFinishEvent(this.UiViewSequence.StartSequenceName, this.cZt);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent(this.UiViewSequence.StartSequenceName, this.cZt);
    var i;
    var e = this.OpenParam;
    if (e && (e.MainText && (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MainText), this.GetText(0)?.SetText(i)), e.SubText)) {
      i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.SubText);
      this.GetText(1)?.SetText(i);
    }
  }
}
exports.PunishReportView = PunishReportView;
//# sourceMappingURL=PunishReportView.js.map