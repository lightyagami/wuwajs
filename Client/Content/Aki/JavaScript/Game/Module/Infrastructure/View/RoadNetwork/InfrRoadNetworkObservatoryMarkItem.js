"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadNetworkObservatoryMarkItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class InfrRoadNetworkObservatoryMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hea = undefined;
    this.euf = false;
    this.b6m = undefined;
    this.iuf = undefined;
    this.R6m = () => {
      this.b6m?.();
    };
    this.yct = e => {
      if (e === "Finish") {
        this.iuf?.();
        this.iuf = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.R6m]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.yct);
    this.Refresh();
  }
  OnAfterShow() {
    if (!this.euf) {
      this.Hea?.PlayLevelSequenceByName("Start");
    }
  }
  Refresh() {
    this.Kbe();
    this.L6m();
  }
  Kbe() {
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel === ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.GetItem(2).SetUIActive(true);
      this.GetItem(1).SetUIActive(true);
    }
  }
  L6m() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
    if (e) {
      this.GetText(3).ShowTextNew(e.Description);
    } else {
      this.GetText(3).SetUIActive(false);
    }
  }
  SetOnClickToggleCb(e) {
    this.b6m = e;
  }
  SetNeedPlayFinishSeq(e) {
    this.euf = e;
  }
  SetSelected(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
    if (e) {
      this.b6m?.();
    }
  }
  ShowMarkFinish(e) {
    this.Hea?.PlayLevelSequenceByName("Finish");
    this.iuf = e;
  }
  ShowLevelUpSeq() {
    this.Hea?.PlayLevelSequenceByName("LevelUp");
  }
}
exports.InfrRoadNetworkObservatoryMarkItem = InfrRoadNetworkObservatoryMarkItem;
//# sourceMappingURL=InfrRoadNetworkObservatoryMarkItem.js.map