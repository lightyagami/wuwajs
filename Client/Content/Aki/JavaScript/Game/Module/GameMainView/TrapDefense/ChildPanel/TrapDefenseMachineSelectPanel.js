"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMachineSelectPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TDPlayerController_1 = require("../../../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const TowerDefenseEventController_1 = require("../../../TowerDefenseEvent/TowerDefenseEventController");
const LguiIntTween_1 = require("../../../Util/LguiIntTween");
const TrapDefenseMachineSelectItem_1 = require("../ChildItem/TrapDefenseMachineSelectItem");
const TrapDefenseMachineSelectSlider_1 = require("../ChildItem/TrapDefenseMachineSelectSlider");
const TWEEN_NUM_INTERVAL = 0.01;
const TWEEN_MAX_TIME = 0.5;
class TrapDefenseMachineSelectPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.ItemList = [];
    this.CurrentSelectItem = undefined;
    this.MachineSelectInterface = undefined;
    this.TouchSlider = undefined;
    this.MoneyTween = undefined;
    this.MoneyText = undefined;
    this.LastMoneyNum = 0;
    this.SliderRecordLastSelectItem = undefined;
    this.SliderRecordDragSelectItem = undefined;
    this.Sequence = undefined;
    this.IsInPlotHud = false;
    this.IsInitialized = false;
    this.c9u = () => {
      this.PNd();
    };
    this.RefreshMoneyText = () => {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum();
      var t = Math.abs(e - this.LastMoneyNum);
      if (t > 0) {
        t = Math.min(t * TWEEN_NUM_INTERVAL, TWEEN_MAX_TIME);
        this.MoneyTween.PlayTween(this.LastMoneyNum, e, t);
      } else {
        this.MoneyTween.KillTween();
        this.MoneyText.SetText(e.toString());
      }
      for (const i of this.ItemList) {
        i.RefreshCoin();
      }
    };
    this.RefreshBuildText = () => {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetTrapCount();
      var t = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetMaxTrapCount();
      this.GetText(2)?.SetText(e + "/" + t);
    };
    this.N8e = e => {
      if (!e.Data && ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine) {
        e.SetToggleState(0);
        this.aId(e);
      } else {
        this.NQu(e);
        e = this.ItemList.indexOf(e);
        this.TouchSlider?.SetSliderValue(e, false);
      }
    };
    this.DQc = () => {
      this.SliderRecordLastSelectItem = this.CurrentSelectItem;
      this.SliderRecordDragSelectItem = this.CurrentSelectItem;
      this.MachineSelectInterface?.SliderPointerDown();
    };
    this.CHs = e => {
      e = this.ItemList[e];
      e.SetToggleState(1);
      this.SliderRecordDragSelectItem?.SetToggleState(0);
      this.SliderRecordDragSelectItem = e;
      this.MachineSelectInterface?.SliderValueChange(e.Data);
    };
    this.UQc = () => {
      var e;
      if (this.SliderRecordDragSelectItem) {
        if (this.SliderRecordDragSelectItem.Data) {
          this.SliderRecordLastSelectItem = this.SliderRecordDragSelectItem;
        } else {
          this.SliderRecordDragSelectItem.SetToggleState(0);
          if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine) {
            this.aId(this.SliderRecordDragSelectItem);
          }
        }
      }
      if (this.SliderRecordLastSelectItem) {
        if (this.SliderRecordLastSelectItem !== this.CurrentSelectItem) {
          this.NQu(this.SliderRecordLastSelectItem);
        } else {
          this.SliderRecordLastSelectItem.SetToggleState(1);
          e = this.ItemList.indexOf(this.SliderRecordLastSelectItem);
          this.TouchSlider?.SetSliderValue(e, false);
        }
      }
      this.SliderRecordDragSelectItem = undefined;
      this.SliderRecordLastSelectItem = undefined;
      this.MachineSelectInterface?.SliderDragEnd();
    };
    this.Xed = e => {
      this.MoneyText.SetText(e.toString());
      this.LastMoneyNum = e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem]];
  }
  async T$u(e) {
    var t = new TrapDefenseMachineSelectItem_1.TrapDefenseMachineSelectItem();
    t.ToggleClick = this.N8e;
    t.Index = this.ItemList.length;
    this.ItemList.push(t);
    await t.CreateThenShowByActorAsync(e.GetOwner());
  }
  async b$u() {
    var i = this.GetItem(0).GetAttachUIChildren();
    var s = [];
    for (let e = 0, t = i.Num(); e < t; e++) {
      var r = i.Get(e);
      s.push(this.T$u(r));
    }
    await Promise.all(s);
  }
  async R$u() {
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBattleGoldToItemId();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    await this.SetTextureAsync(e.IconSmall, this.GetTexture(3));
  }
  async jQu() {
    if (Info_1.Info.IsInTouch()) {
      this.TouchSlider = new TrapDefenseMachineSelectSlider_1.TrapDefenseMachineSelectSlider();
      this.TouchSlider.SliderPointerDownNotify = this.DQc;
      this.TouchSlider.SliderValueChangeNotify = this.CHs;
      this.TouchSlider.SliderEndDragNotify = this.UQc;
      await this.TouchSlider.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
      this.PNd();
    } else {
      this.GetItem(4)?.SetUIActive(false);
    }
  }
  InitializeTemp() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.LastMoneyNum = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum();
    this.MoneyText = this.GetText(1);
    this.MoneyTween = new LguiIntTween_1.LguiIntTween();
    this.MoneyTween.UpdateTween = this.Xed;
  }
  async InitializeAsync() {
    await Promise.all([this.b$u(), this.R$u(), this.jQu()]);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnSystemInfoNotify, this.c9u);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnSystemInfoNotify, this.c9u);
  }
  OnShowBattleChildViewPanel(e) {
    this.RefreshMachineState();
    this._Hu();
    this.aAd();
  }
  OnHideBattleChildViewPanel() {
    this.uHu();
  }
  OnTickBattleChildViewPanel(e) {
    for (const t of this.ItemList) {
      t.Tick(e);
    }
  }
  OnBeforeDestroy() {
    this.MoneyTween.Destroy();
    this.Sequence.Clear();
  }
  _Hu() {
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.AddTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Gold, this.RefreshMoneyText);
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.AddTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.TrapCount, this.RefreshBuildText);
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.AddTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.MaxTrapCount, this.RefreshBuildText);
  }
  uHu() {
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RemoveTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.Gold, this.RefreshMoneyText);
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RemoveTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.TrapCount, this.RefreshBuildText);
    ModelManager_1.ModelManager.TrapDefenseModel.BattleData.RemoveTreeVarUpdateDelegate(IQuest_1.ETrapDefenseSystemVarType.MaxTrapCount, this.RefreshBuildText);
  }
  NQu(e) {
    this.xQc(e);
    this.BQc();
  }
  xQc(e) {
    if (e.Data && this.CurrentSelectItem !== e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseBattle", 10, "触发机关键位输入", ["Pos", e.Index]);
      }
      if (this.CurrentSelectItem) {
        this.CurrentSelectItem.SetToggleState(0);
      }
      this.CurrentSelectItem = e;
    }
  }
  BQc() {
    if (this.CurrentSelectItem && this.CurrentSelectItem.Data) {
      if (this.CurrentSelectItem.Data.IsBuilding) {
        TowerDefenseEventController_1.TowerDefenseEventController.HandleTowerDefenseSelect(this.CurrentSelectItem.Index);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, false);
      } else {
        TDPlayerController_1.TowerDefensePlayerController.HandleTowerFollowerSelect(this.CurrentSelectItem.Data.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, true);
      }
      this.MachineSelectInterface?.SelectMachine(this.CurrentSelectItem.Data);
    }
  }
  aId(e) {
    ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenOrganDevelop(true, undefined, e.Index);
  }
  aAd() {
    var e = UiManager_1.UiManager.IsViewShow("PlotViewHUD");
    this.SetMachineSelectCollapse(e);
  }
  PNd() {
    var e;
    if (this.TouchSlider && (e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData()).length > 0) {
      this.TouchSlider.RefreshSliderMaxValue(e.length - 1);
    }
  }
  SetInterface(e) {
    this.MachineSelectInterface = e;
  }
  OnTowerDefenseStepUpdate(e) {
    if (e === 2) {
      this.nVd();
    } else if (e !== 1 || this.IsInitialized) {
      if (this.CurrentSelectItem) {
        this.RefreshSlotState();
      } else {
        this.RefreshMachineState();
      }
    } else {
      this.IsInitialized = true;
      this.nVd();
    }
  }
  RefreshMachineState() {
    this.RefreshSlotState();
    var i = this.CurrentSelectItem?.Data?.Id ?? 0;
    var s = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
    if (s.length > 0) {
      let e = -1;
      let t = -1;
      for (const h of s) {
        var r = h.GetSlotData();
        if (r && (r.IsBuilding || e !== -1 || (e = h.GetIndex()), r.Id === i)) {
          t = h.GetIndex();
          break;
        }
      }
      if (t !== -1) {
        this.ItemList[t].SetToggleState(1, true);
      } else if (e !== -1) {
        this.ItemList[e].SetToggleState(1, true);
      }
    }
    this.RefreshMoneyText();
    this.RefreshBuildText();
  }
  nVd() {
    this.RefreshSlotState();
    var i = this.CurrentSelectItem?.Data?.Id ?? 0;
    var s = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
    if (s.length > 0) {
      let e = -1;
      let t = -1;
      for (const h of s) {
        var r = h.GetSlotData();
        if (r && !r.IsBuilding && (r.IsBuilding || e !== -1 || (e = h.GetIndex()), r.Id === i)) {
          t = h.GetIndex();
          break;
        }
      }
      if (t !== -1) {
        this.ItemList[t].SetToggleState(1, true);
      } else if (e !== -1) {
        this.ItemList[e].SetToggleState(1, true);
      }
    }
  }
  RefreshMachineCdState(e) {
    for (const t of this.ItemList) {
      if (t.Data?.Id === e) {
        t.RefreshCd();
      }
    }
  }
  RefreshSlotState() {
    var i = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
    for (let e = 0, t = this.ItemList.length; e < t; e++) {
      var s;
      var r = this.ItemList[e];
      if (e < i.length) {
        s = i[e];
        r.SetActive(true);
        r.Refresh(s.GetSlotData());
      } else {
        r.SetActive(false);
        r.Refresh(undefined);
      }
    }
  }
  SetMachineSelectCollapse(e) {
    if (this.IsInPlotHud !== e) {
      if (this.IsInPlotHud = e) {
        this.Sequence.StopSequenceByKey("Normal", false, true);
        this.Sequence.PlaySequence("Collapse");
      } else {
        this.Sequence.StopSequenceByKey("Collapse", false, true);
        this.Sequence.PlaySequence("Normal");
      }
    }
  }
}
exports.TrapDefenseMachineSelectPanel = TrapDefenseMachineSelectPanel;
//# sourceMappingURL=TrapDefenseMachineSelectPanel.js.map