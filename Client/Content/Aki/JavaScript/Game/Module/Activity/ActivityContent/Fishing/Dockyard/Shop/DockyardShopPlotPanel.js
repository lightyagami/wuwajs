"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardShopPlotPanel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem");
const Time_1 = require("../../../../../../../Core/Common/Time");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const COOLDOWN_TIME = 5000;
class DockyardShopPlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kh_ = "";
    this.EntityId = 0;
    this.$h_ = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Xh_() {
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingNpcPerform(this.Kh_);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Content);
  }
  Yh_(e) {
    var i;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(this.EntityId);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
    if (t) {
      i = t?.Entity?.GetComponent(187);
      t = t?.Entity?.GetComponent(44);
      i?.PlayPerformMontage(2, {
        MontagePath: t?.GetMontageResPathByName(e)
      });
    }
  }
  XZi(e) {
    AudioSystem_1.AudioSystem.PostEvent(e);
  }
  zh_() {
    var e = Time_1.Time.ServerTimeStamp;
    if (!(e - this.$h_ < COOLDOWN_TIME)) {
      this.$h_ = e;
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingNpcPerform(this.Kh_);
      this.Yh_(e.MontagePath);
      this.XZi(e.AudioEvent);
    }
  }
  bl() {
    this.Xh_();
    this.zh_();
  }
  ShowPanel(e) {
    this.Kh_ = e;
    this.bl();
    this.SetActive(true);
  }
  HidePanel() {
    this.SetActive(false);
  }
}
exports.DockyardShopPlotPanel = DockyardShopPlotPanel;
//# sourceMappingURL=DockyardShopPlotPanel.js.map