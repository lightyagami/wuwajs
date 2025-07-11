"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopPanelWavePlateTip = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const InventoryDefine_1 = require("../../../Inventory/InventoryDefine");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
class TopPanelWavePlateTip extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.kgl = undefined;
    this.Ogl = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnBeforeCreate() {
    this.kgl = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.kgl);
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(0, true);
  }
  OnShowBattleChildView() {
    var e;
    var i;
    if (this.Ogl) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-OnShow Return");
      }
    } else if (ModelManager_1.ModelManager.PowerModel.GetCanShowPowerTip()) {
      this.Ogl = true;
      this.SetVisible(0, true);
      i = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(InventoryDefine_1.WAVEPLATE_COIN);
      e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(InventoryDefine_1.WAVEPLATE_CRYSTAL_COIN);
      this.GetText(1).SetText(i.GetCurrentPower() + "/" + i.GetPowerLimit());
      this.GetText(0).SetText(e.GetCurrentPower().toString());
      i = CommonParamById_1.configCommonParamById.GetIntConfig("PowerTipShowTime");
      ModelManager_1.ModelManager.PowerModel.SetCanShowPowerTip(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-PlaySequence Show");
      }
      this.kgl.PlaySequence("Show");
      TimerSystem_1.TimerSystem.Delay(() => {
        this.kgl?.PlaySequence("Hide");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-PlaySequence Hide");
        }
      }, i);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-Hide");
      }
      this.SetVisible(0, false);
    }
  }
  OnHideBattleChildView() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PowerModule", 58, "TopPanelWavePlateTip-OnHide");
    }
    this.Ogl = false;
  }
}
exports.TopPanelWavePlateTip = TopPanelWavePlateTip;
//# sourceMappingURL=TopPanelWavePlateTip.js.map