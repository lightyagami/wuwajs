"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefensePreparationPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const TowerDefenseEventController_1 = require("../../../TowerDefenseEvent/TowerDefenseEventController");
class TrapDefensePreparationPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.q6u = () => {
      if (this.idd()) {
        this.rdd();
      } else {
        this.odd();
      }
    };
    this.G6u = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenOrganDevelop(true, undefined);
    };
    this.F6u = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewShop();
    };
    this.FWe = () => {
      this.RefreshShopItemActive();
      this.RefreshWeaponPreparationBtnActive();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.q6u], [1, this.G6u], [2, this.F6u]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.Sequence.PlaySequencePurely("UiIn");
    this.RefreshShopItemActive();
    this.RefreshWeaponPreparationBtnActive();
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("UiOut", e);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  OnCheckBattleChildViewPanelShowCondition() {
    return TowerDefenseEventController_1.TowerDefenseEventController.IsInPreview();
  }
  rdd() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(363);
    e.HasToggle = true;
    e.ToggleTextKey = "ConfirmBox_363_Desc";
    e.SetToggleFunction(e => {
      ModelManager_1.ModelManager.TrapDefenseModel.IsSkipMachineFullCheck = e;
    });
    e.FunctionMap.set(2, () => {
      this.odd();
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  idd() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine;
    var r = ModelManager_1.ModelManager.TrapDefenseModel.IsSkipMachineFullCheck;
    return !!e && !r && !ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.IsSlotFull();
  }
  async odd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TowerDefenseBattle", 10, "开始挑战");
    }
    await TowerDefenseEventController_1.TowerDefenseEventController.ExecuteStartFighting();
  }
  RefreshShopItemActive() {
    this.GetButton(2)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsShopOpen);
  }
  RefreshWeaponPreparationBtnActive() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine;
    this.GetButton(1)?.RootUIComp.SetUIActive(e);
  }
}
exports.TrapDefensePreparationPanel = TrapDefensePreparationPanel;
//# sourceMappingURL=TrapDefensePreparationPanel.js.map