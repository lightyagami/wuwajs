"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryProfitPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class HonamiStoryProfitPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.$An = e => {
      if (e === "Change") {
        e = ModelManager_1.ModelManager.HonamiStoryModel.TotalRevenue;
        this.GetArtText(0)?.SetText(e.toString());
        ModelManager_1.ModelManager.HonamiStoryModel.LastRecordRevenue = e;
      }
    };
    this.Nwn = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryPermanentTaskView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Nwn]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  Refresh(e = true) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.LastRecordRevenue;
    this.GetArtText(0)?.SetText(t.toString());
    this.Kwn(e);
  }
  RefreshNormal(e = true) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.TotalRevenue;
    this.GetArtText(0)?.SetText(t.toString());
    this.Kwn(e);
  }
  Kwn(e = true) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData()?.IsPermanentTaskHasRedDot() ?? false;
    this.GetButton(1)?.RootUIComp.SetUIActive(t && e);
  }
  PlayChangeSequence() {
    this.SPe?.PlayLevelSequenceByName("Start");
  }
}
exports.HonamiStoryProfitPanel = HonamiStoryProfitPanel;
//# sourceMappingURL=HonamiStoryProfitPanel.js.map