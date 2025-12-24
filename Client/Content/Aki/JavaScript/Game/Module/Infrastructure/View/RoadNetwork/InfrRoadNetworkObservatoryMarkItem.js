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
    this.klf = false;
    this.aVm = undefined;
    this.Olf = undefined;
    this.hVm = () => {
      this.aVm?.();
    };
    this.yct = e => {
      if (e === "Finish") {
        this.Olf?.();
        this.Olf = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.hVm]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.yct);
    this.Refresh();
  }
  OnAfterShow() {
    if (!this.klf) {
      this.Hea?.PlayLevelSequenceByName("Start");
    }
  }
  Refresh() {
    this.Kbe();
    this._Vm();
  }
  Kbe() {
    if (ModelManager_1.ModelManager.InfrastructureModel.FireLevel === ConfigManager_1.ConfigManager.InfrastructureConfig.GetMaxLevel()) {
      this.GetItem(2).SetUIActive(true);
      this.GetItem(1).SetUIActive(true);
    }
  }
  _Vm() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
    if (e) {
      this.GetText(3).ShowTextNew(e.Description);
    } else {
      this.GetText(3).SetUIActive(false);
    }
  }
  SetOnClickToggleCb(e) {
    this.aVm = e;
  }
  SetNeedPlayFinishSeq(e) {
    this.klf = e;
  }
  SetSelected(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
    if (e) {
      this.aVm?.();
    }
  }
  ShowMarkFinish(e) {
    this.Hea?.PlayLevelSequenceByName("Finish");
    this.Olf = e;
  }
  ShowLevelUpSeq() {
    this.Hea?.PlayLevelSequenceByName("LevelUp");
  }
}
exports.InfrRoadNetworkObservatoryMarkItem = InfrRoadNetworkObservatoryMarkItem;
//# sourceMappingURL=InfrRoadNetworkObservatoryMarkItem.js.map