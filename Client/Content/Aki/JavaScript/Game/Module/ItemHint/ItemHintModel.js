"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemHintModel = exports.ItemRewardData = exports.MainInterfaceData = exports.InsideInterfaceData = exports.InterfaceDataUnit = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ItemHintDefines_1 = require("./Data/ItemHintDefines");
const HIGH_QUALITY = 4;
class InterfaceDataUnit {
  constructor(t) {
    this.Index = 0;
    this.Mode = 0;
    this.WaitList = new Array();
    this.Index = t;
  }
  GetMaxCount() {
    let t = 1;
    if (this.Mode === 0) {
      t = ConfigManager_1.ConfigManager.RewardConfig.GetLowModeCount();
    } else if (this.Mode === 1) {
      t = ConfigManager_1.ConfigManager.RewardConfig.GetFastModeCount();
    }
    return t;
  }
  GetAddItemTime() {
    let t = 0;
    if (this.Mode === 0) {
      t = ConfigManager_1.ConfigManager.RewardConfig.GetLowModeNextAddItemTime();
    } else if (this.Mode === 1) {
      t = ConfigManager_1.ConfigManager.RewardConfig.GetFastModeNextAddItemTime();
    }
    return t;
  }
}
exports.InterfaceDataUnit = InterfaceDataUnit;
class InsideInterfaceData {
  constructor() {
    this.Kei = 0;
    this.Fgi = undefined;
    this.Vgi = new Array();
  }
  Clear() {
    this.Kei = 0;
    this.Vgi = new Array();
  }
  IsEmpty() {
    return !this.Fgi || this.Fgi.WaitList.length <= 0;
  }
  ShiftFirstData() {
    if (this.Fgi) {
      return this.Fgi.WaitList.shift();
    }
  }
  GetMaxCount() {
    if (this.Fgi) {
      return this.Fgi.GetMaxCount();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ItemHint", 8, "里列表当前单元无效!");
      }
      return 0;
    }
  }
  GetAddItemTime() {
    if (this.Fgi) {
      return this.Fgi.GetAddItemTime();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ItemHint", 8, "里列表当前单元无效!");
      }
      return 0;
    }
  }
  PostBattleViewOpen() {
    this.Hgi();
    this.jgi();
  }
  Hgi() {
    this.Kei++;
  }
  jgi() {
    for (const t of this.Vgi) {
      t.Mode = 1;
    }
  }
  ShiftFirstUnit() {
    if (this.Fgi) {
      if (this.Fgi.WaitList.length > 0 && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ItemHint", 8, "里列表关闭时, 还有数据在队列中未开始播放!");
      }
      this.Vgi.shift();
      this.Fgi = undefined;
      this.Wgi();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ItemHint", 10, "里列表关闭时没有数据可以拿");
    }
  }
  InsertItemRewardInfo(t) {
    var e = this.Kgi();
    for (const s of t) {
      var i;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s.s5n);
      if (r && r.ShowInBag) {
        (i = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = s.m9n;
        i.ItemId = s.s5n;
        i.Quality = r.QualityId;
        e.WaitList.push(i);
      }
    }
    this.Wgi();
  }
  Wgi() {
    if (!this.Fgi && this.Vgi.length > 0) {
      this.Fgi = this.Vgi[0];
    }
  }
  Kgi() {
    for (const t of this.Vgi) {
      if (t.Index === this.Kei) {
        return t;
      }
    }
    const t = new InterfaceDataUnit(this.Kei);
    this.Vgi.push(t);
    return t;
  }
}
exports.InsideInterfaceData = InsideInterfaceData;
class MainInterfaceData {
  constructor() {
    this.WaitList = new Array();
  }
  InsertItemRewardInfo(t) {
    for (const r of t) {
      var e;
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.s5n);
      if (i && i.ShowInBag) {
        (e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = r.m9n;
        e.ItemId = r.s5n;
        e.Quality = i.QualityId;
        this.WaitList.push(e);
      }
    }
    this.WaitList.sort((t, e) => e.Quality - t.Quality);
  }
  AddItemRewardInfo(t) {
    this.WaitList.push(t);
  }
  SortWaitList() {
    this.WaitList.sort((t, e) => e.Quality - t.Quality);
  }
  Clear() {}
}
exports.MainInterfaceData = MainInterfaceData;
class ItemRewardData {
  constructor() {
    this.ItemReward = undefined;
  }
}
exports.ItemRewardData = ItemRewardData;
class ItemHintModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Qgi = new MainInterfaceData();
    this.Xgi = new MainInterfaceData();
    this.$gi = new Array();
    this.Ygi = new Array();
    this.Jgi = false;
  }
  get Visibility() {
    return this.Jgi;
  }
  set Visibility(t) {
    this.Jgi = t;
  }
  OnInit() {
    return this.Jgi = true;
  }
  OnClear() {
    this.Qgi.Clear();
    this.Xgi.Clear();
    this.$gi = new Array();
    return true;
  }
  AddItemRewardList(t) {
    var e = new ItemRewardData();
    e.ItemReward = t;
    this.$gi.push(e);
  }
  AddAchievementItemRewardList(t) {
    var e = new ItemRewardData();
    e.ItemReward = t;
    this.Ygi.push(e);
  }
  AddItemRewardTest() {
    var t = Protocol_1.Aki.Protocol.cns.create();
    var e = Protocol_1.Aki.Protocol.X6s.create();
    e.m9n = 1;
    e.L8n = 21010014;
    e.W9n = 3;
    t.gws = {
      0: {
        O9n: [e]
      }
    };
    var e = new ItemRewardData();
    e.ItemReward = t;
    this.$gi.push(e);
  }
  ShiftItemRewardListFirst() {
    return this.$gi.shift();
  }
  ShiftAchievementItemRewardListFirst() {
    return this.Ygi.shift();
  }
  PeekItemRewardListFirst() {
    return this.$gi[0];
  }
  CleanItemRewardList() {
    this.$gi = new Array();
  }
  get IsItemRewardListEmpty() {
    return this.$gi.length <= 0;
  }
  get IsAchievementItemRewardListEmpty() {
    return this.Ygi.length <= 0;
  }
  MainInterfaceInsertItemRewardInfo(t) {
    for (const r of t) {
      var e;
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r.s5n);
      if (i && i.ShowInBag) {
        (e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = r.m9n;
        e.ItemId = r.s5n;
        e.Quality = i.QualityId;
        (i.ItemType === 9 || e.Quality >= HIGH_QUALITY ? this.Xgi : this.Qgi).AddItemRewardInfo(e);
      }
    }
    this.Qgi.SortWaitList();
    this.Xgi.SortWaitList();
  }
  AddItemToPriorInterfaceData(t, e, i) {
    var r = new ItemHintDefines_1.ItemRewardInfo();
    r.ItemId = t;
    r.ItemCount = e;
    r.Quality = i;
    this.Xgi.AddItemRewardInfo(r);
  }
  get IsMainInterfaceDataEmpty() {
    return this.Qgi.WaitList.length <= 0;
  }
  get IsPriorInterfaceDataEmpty() {
    return this.Xgi.WaitList.length <= 0;
  }
  ShiftMainInterfaceData() {
    return this.Qgi.WaitList.shift();
  }
  ShiftPriorInterfaceData() {
    return this.Xgi.WaitList.shift();
  }
  GmClear() {
    this.Qgi.WaitList.length = 0;
    this.Xgi.WaitList.length = 0;
    this.CleanItemRewardList();
    this.Ygi.length = 0;
  }
}
exports.ItemHintModel = ItemHintModel;
//# sourceMappingURL=ItemHintModel.js.map