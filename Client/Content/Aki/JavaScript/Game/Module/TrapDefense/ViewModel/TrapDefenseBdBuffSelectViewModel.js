"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffSelectViewModel = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TrapDefenseBdBuffSelectViewModel {
  constructor() {
    this.Model = undefined;
    this.BdBuffDataList = [];
    this.CurSelectBdBuffData = undefined;
    this.MaxRefreshCount = 1;
    this.RemainRefreshCount = 0;
    this.RefreshBuffCostNum = 0;
    this.ShowingViewProcess = false;
    this.BackupIdList = [];
  }
  static Create(e) {
    var t = new TrapDefenseBdBuffSelectViewModel();
    t.Model = e;
    return t;
  }
  SetBuffList(e, t) {
    this.BdBuffDataList.length = 0;
    e.forEach(e => {
      e = this.Model.RougeModeData.BdBuffDataMap.get(e);
      if (e) {
        this.BdBuffDataList.push(e);
      }
    });
    this.SetSelectBuffId(t);
    return true;
  }
  SetSelectBuffId(t) {
    var e = this.BdBuffDataList.find(e => e.Id === t);
    this.SetSelectBuff(e);
  }
  SetSelectBuff(e) {
    this.CurSelectBdBuffData?.GetBelongBdData().SetPreAddedBuff(undefined);
    (this.CurSelectBdBuffData = e)?.GetBelongBdData().SetPreAddedBuff(e);
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBdBuffSelectChange, e, e.GetBelongBdData());
    }
  }
  GetShowBdDataList() {
    return this.Model.GetCurInstToLevelData()?.GetShowBdList() ?? this.Model.RougeModeData.BdDataListIgnoreZero;
  }
  GetRefreshBuffCostId() {
    return ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBattleGoldToItemId();
  }
  GetRefreshBuffCostRemainNum() {
    return this.Model.BattleData.GetGoldNum();
  }
  SetRefreshBuffCostNum(e) {
    this.RefreshBuffCostNum = e;
  }
  SetMaxRefreshCount(e) {
    this.MaxRefreshCount = e;
  }
  SetRemainRefreshCount(e) {
    this.RemainRefreshCount = e;
  }
  GetRefreshBuffCostIconPath(e) {
    e = e ?? this.GetRefreshBuffCostId();
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e)?.IconSmall ?? e.toString();
  }
  RefreshBuffIsEnoughCost(e) {
    var t = this.GetRefreshBuffCostRemainNum();
    return (e ?? this.RefreshBuffCostNum) <= t;
  }
  OnOpenView() {
    this.ShowingViewProcess = true;
  }
  OnViewClose() {
    if (this.BdBuffDataList.length <= 0) {
      this.Model.BdBuffSelectProcessFinish();
    } else if (this.CurSelectBdBuffData) {
      this.CurSelectBdBuffData.GetBelongBdData().SetPreAddedBuff(undefined);
      if (!this.CurSelectBdBuffData.IsStrengthenFinish()) {
        this.Model.BdBuffSelectProcessFinish();
      }
    }
  }
  ViewProcessFinish() {
    this.ShowingViewProcess = false;
  }
  async RequestSureBuffSelect() {
    return !!this.CurSelectBdBuffData && (await this.Model.RequestBdBuffSelect(this.CurSelectBdBuffData.Id), true);
  }
  async RequestUpdateBdBuffList() {
    return ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestBdBuffRefresh();
  }
}
exports.TrapDefenseBdBuffSelectViewModel = TrapDefenseBdBuffSelectViewModel;
//# sourceMappingURL=TrapDefenseBdBuffSelectViewModel.js.map