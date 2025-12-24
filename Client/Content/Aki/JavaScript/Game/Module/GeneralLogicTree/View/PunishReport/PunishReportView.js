"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportView = undefined;
const UE = require("ue");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
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
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture]];
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent(this.UiViewSequence.StartSequenceName, this.cZt);
    var i;
    var e = this.OpenParam;
    if (e && (e.MainText && (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MainText), this.GetText(0)?.SetText(i)), e.SubText && (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.SubText), this.GetText(1)?.SetText(i)), e.ShowType) && e.ShowType === 1) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TipsIconXuZhiCiBao1");
      this.SetTextureByPath(i, this.GetTexture(2));
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TipsIconXuZhiCiBao2");
      this.SetTextureByPath(e, this.GetTexture(3));
    }
  }
}
exports.PunishReportView = PunishReportView;
//# sourceMappingURL=PunishReportView.js.map