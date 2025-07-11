"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardModel = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const DockyardBackpackOriginalData_1 = require("./Bag/DockyardBackpackOriginalData");
const DockyardItemBlockOriginalData_1 = require("./Base/DockyardItemBlockOriginalData");
class DockyardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.xXl = new Map();
    this.AXl = new Map();
    this.RXl = new DockyardBackpackOriginalData_1.DockyardBackpackOriginalData();
    this.IsPrintLog = true;
    this.IsNeedShowExitConfirmBox = true;
    this.FishingCabinShape = 0;
  }
  get IsTrawlOpen() {
    return ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlockByEffectType(12);
  }
  get TrawlSize() {
    var e = ModelManager_1.ModelManager.FishingModel.GetFishingCurrentLevelTechEffectByEffectType(12);
    if (e > 0) {
      return ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(e).Params[0];
    } else {
      return 0;
    }
  }
  SetTrawlDataListFromServer(e) {
    this.xXl.clear();
    for (const t of e) {
      var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(t);
      this.xXl.set(t.b9n, a);
    }
  }
  GetDataByTrawl(e) {
    return this.xXl.get(e);
  }
  GetTrawlDataList() {
    return Array.from(this.xXl.values());
  }
  SetTrawlData(e) {
    var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(e);
    this.xXl.set(e.b9n, a);
  }
  wXl(e) {
    this.AXl.clear();
    for (const t of e) {
      var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(t);
      this.AXl.set(t.b9n, a);
    }
  }
  GetDataByWareHouse(e) {
    return this.AXl.get(e);
  }
  GetWareHouseDataList() {
    return Array.from(this.AXl.values());
  }
  GetWareHouseDataSize() {
    return this.AXl.size;
  }
  SetWareHouseData(e) {
    var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(e);
    this.AXl.set(e.b9n, a);
  }
  GetQuicklySellId() {
    return this.RXl.QuicklySellDataId;
  }
  GetQuicklySellRatio() {
    return this.RXl.QuicklySellRatio;
  }
  GetBackpackItemList() {
    return this.RXl.GetBackpackItemList();
  }
  AddListItemReadFlag(e) {
    ModelManager_1.ModelManager.NewFlagModel?.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.DockyardListItemRead, e);
    ModelManager_1.ModelManager.NewFlagModel?.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.DockyardListItemRead);
  }
  CheckListItemReadFlag(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.DockyardListItemRead, e);
  }
  get IsQuicklySellOpen() {
    return this.RXl.QuicklySellDataId !== 0;
  }
  UXl(e) {
    this.FishingCabinShape = e;
  }
  SetFishingShipData(e) {
    this.SetDockyardData(e.OT_);
  }
  SetDockyardData(e) {
    this.UXl(e.$T_);
    this.RXl.SetBackpackDataListFromServer(e.HT_);
    this.RXl.SetQuicklySellData(e.WT_, e.XT_);
    this.SetTrawlDataListFromServer(e.QT_);
    this.wXl(e.KT_);
    this.RXl.RefreshPosData();
  }
  UpdateDockyardData(e) {
    this.SetDockyardData(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Dockyard", 10, "船舱数据刷新");
    }
  }
  GetItemBlockData(e) {
    var a = this.RXl.GetBackpackItemData(e);
    return a || this.AXl.get(e);
  }
  GetShopDataList() {
    return ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(this.ShopId);
  }
  get BackpackUseSize() {
    return this.RXl.BackpackUseSize;
  }
  get BackpackSize() {
    return this.RXl.BackpackSize;
  }
  get BackpackPosDataDoublyList() {
    return this.RXl.PosDataDoublyList;
  }
  GetItemCountByItemId(e) {
    return this.RXl.GetItemCountByItemId(e);
  }
  GetItemListByItemId(e) {
    return this.RXl.GetItemListByItemId(e);
  }
  get ShopId() {
    var e = ModelManager_1.ModelManager.FishingModel.DockId;
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e).ShopId;
  }
}
exports.DockyardModel = DockyardModel;
//# sourceMappingURL=DockyardModel.js.map