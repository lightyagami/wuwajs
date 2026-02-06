"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowCollectionSelectViewModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const MotorcycleArrowCollectionItemData_1 = require("./MotorcycleArrowCollectionItemData");
class MotorcycleArrowCollectionSelectViewModel {
  constructor() {
    this.Model = undefined;
    this.CollectionList = [];
    this.CurSelectCollectionItem = undefined;
    this.SubLevelIndex = 0;
    this.WaveGroupIndex = 0;
    this.BossId = 0;
    this.MaxRefreshCount = 0;
    this.RemainRefreshCount = 0;
    this.ShowingViewProcess = false;
    this.PendingData = [];
    this.dgt = new Map();
    this.Zug = new Map();
  }
  static Create(t) {
    var e = new MotorcycleArrowCollectionSelectViewModel();
    e.Model = t;
    return e;
  }
  PushPendingData(t) {
    this.PendingData.push(t);
  }
  SetCollectionList(t) {
    this.SubLevelIndex = t.vjf;
    this.WaveGroupIndex = t.pjf;
    this.BossId = t.CPf;
    this.UpdateDrop(t.UQf);
    this.SetSelectCollectionId(undefined);
    this.RemainRefreshCount = this.MaxRefreshCount;
    return true;
  }
  UpdateDrop(t) {
    this.CollectionList.length = 0;
    for (const o of t) {
      var e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionItemConfigById(o.DQf);
      if (e) {
        e = MotorcycleArrowCollectionItemData_1.MotorcycleArrowCollectionItemData.Create(e, o.l8n);
        this.CollectionList.push(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiModel", 85, "[摩托战斗]不存在的藏品配置", ["Id", o.DQf]);
      }
    }
  }
  SetSelectCollectionId(e) {
    var t = this.CollectionList.find(t => t.Id === e);
    this.SetSelectCollectionItem(t);
  }
  SetSelectCollectionItem(t) {
    this.CurSelectCollectionItem = t;
  }
  SetMaxRefreshCount(t) {
    this.MaxRefreshCount = t;
  }
  SetRemainRefreshCount(t) {
    this.RemainRefreshCount = t;
  }
  OnOpenView() {
    this.ShowingViewProcess = true;
  }
  OnViewClose() {
    this.ShowingViewProcess = false;
    if (this.PendingData.length > 0) {
      this.SetCollectionList(this.PendingData.shift());
      UiManager_1.UiManager.OpenView("MotorcycleArrowCollectionSelectView", this);
    }
  }
  ViewProcessFinish() {
    this.ShowingViewProcess = false;
  }
  get Controller() {
    return ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController;
  }
  async RequestCollectionSelect() {
    return !!this.CurSelectCollectionItem && (await this.Controller.RequestCollectionSelect(this, this.CurSelectCollectionItem));
  }
  async RequestUpdateCollectionList() {
    return !(this.RemainRefreshCount <= 0) && !(await this.Controller.RequestCollectionRefresh(this), 0);
  }
  AddItemData(t) {
    var e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionItemConfigById(t);
    if (e) {
      var o = this.dgt.get(e.Id);
      if (o) {
        this.Zug.get(e.Type).AddItemData(o, false);
      } else {
        o = MotorcycleArrowCollectionItemData_1.MotorcycleArrowCollectionItemData.Create(e, 0);
        this.dgt.set(e.Id, o);
        e = e.Type;
        let t = this.Zug.get(e);
        if (!t) {
          t = new MotorcycleArrowCollectionItemData_1.MotorcycleArrowCollectionTypeItemData(e);
          this.Zug.set(e, t);
        }
        t.AddItemData(o, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiModel", 85, "[摩托战斗]不存在的藏品配置", ["Id", t]);
    }
  }
  GetSortedMotorFightItemTypeList() {
    var t = [...this.Zug.values()];
    t.sort((e, o) => {
      if (e.TotalCount !== o.TotalCount) {
        return o.TotalCount - e.TotalCount;
      }
      for (let t = MotorcycleArrowCollectionItemData_1.MAX_QUALITY; t >= 1; t--) {
        if (e.GetItemNumWithQuality(t) !== o.GetItemNumWithQuality(t)) {
          return o.GetItemNumWithQuality(t) - e.GetItemNumWithQuality(t);
        }
      }
      return 0;
    });
    return t.map(t => t.Type);
  }
  GetMotorFightItemDataListByType(t) {
    t = this.Zug.get(t)?.ItemList;
    if (t) {
      return t.sort((t, e) => t.Config.Quality !== e.Config.Quality ? e.Config.Quality - t.Config.Quality : t.Num !== e.Num ? e.Num - t.Num : e.Id - t.Id);
    }
  }
  GetAllMotorFightItemData() {
    return [...this.dgt.values()];
  }
  IsMotorFightItemEmpty() {
    return this.dgt.size <= 0;
  }
  Clear() {
    this.dgt.clear();
    this.Zug.clear();
    this.PendingData.length = 0;
  }
}
exports.MotorcycleArrowCollectionSelectViewModel = MotorcycleArrowCollectionSelectViewModel;
//# sourceMappingURL=MotorcycleArrowCollectionSelectViewModel.js.map