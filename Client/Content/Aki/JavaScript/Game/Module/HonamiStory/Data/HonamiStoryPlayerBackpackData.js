"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPlayerBackpackData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryRoleEquipData_1 = require("./HonamiStoryRoleEquipData");
class HonamiStoryPlayerBackpackData {
  constructor() {
    this.Tfd = [];
    this.bfd = new Map();
    this.Config = undefined;
  }
  Init(t) {
    if (t.Wmd) {
      this.Config = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBackPack(t.Wmd.Vmd);
      this.wfd();
      this.RefreshEquipInfo(t.O$d);
      this.RefreshGridItemInfo(t.Wmd.k$d);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "Proto_EquipRack is undefined");
    }
  }
  wfd() {
    for (let t = this.Tfd.length = 0; t < HonamiStoryDefine_1.HONAMI_ROLE_TEAM_COUNT; t++) {
      this.Tfd.push(new HonamiStoryRoleEquipData_1.HonamiStoryRoleEquipData(t));
    }
  }
  RefreshEquipInfo(e) {
    for (let t = 0; t < e.length; t++) {
      this.Tfd[t].SetEquipData(e[t]);
    }
    if (e.length < this.Tfd.length) {
      for (let t = e.length; t < this.Tfd.length; t++) {
        this.Tfd[t].SetEquipData(undefined);
      }
    }
    this.UpdateAllRoleSlots();
  }
  RefreshRoleInfo(e) {
    for (let t = 0; t < e.length; t++) {
      this.RefreshRoleInfoByPosition(e[t], t);
    }
    if (e.length < this.Tfd.length) {
      for (let t = e.length; t < this.Tfd.length; t++) {
        this.RefreshRoleInfoByPosition(0, t);
      }
    }
    this.UpdateAllRoleSlots();
  }
  RefreshRoleInfoByPosition(t, e) {
    if (e < 0 || e >= this.Tfd.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "RefreshRoleInfoByPosition 无效position", ["position", e]);
      }
    } else {
      this.Tfd[e].SetRoleInfo(t);
      this.UpdateAllRoleSlots();
    }
  }
  RefreshWeaponInfoByPosition(t, e) {
    var o = this.GetRoleEquipDataByPosition(e);
    if (o) {
      o.SetWeaponInfo(t);
      this.UpdateAllRoleSlots();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "RefreshWeaponInfoByPosition 无效position", ["position", e]);
    }
  }
  RefreshGridItemInfo(t) {
    var e;
    var o = new Set();
    for (const n of t) {
      var i;
      var r = ModelManager_1.ModelManager.HonamiStoryModel.CreateHonamiStoryItemData(n.x$d, n.B$d);
      if (r.GetItemType() === 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 58, "Invalid EquipItemType", ["itemId", r.GetItemId()], ["itemType", r.GetItemType()]);
        }
      } else {
        o.add(r.GetPosition());
        if (!(i = this.bfd.get(r.GetPosition())) || i.GetIncId() !== r.GetIncId()) {
          this.SetRoleItemData(r);
          this.bfd.set(r.GetPosition(), r);
        }
      }
    }
    for ([e] of this.bfd) {
      if (!o.has(e)) {
        this.bfd.delete(e);
        this.RemoveRoleItemData(e);
      }
    }
    this.UpdateAllRoleSlots();
  }
  UpdateByContext(t) {
    for (const e of t) {
      if (e.h5n !== 0) {
        this.Mfd(e);
      }
    }
    for (const o of t) {
      if (o.h5n !== 2) {
        this.Efd(o);
      }
    }
    this.UpdateAllRoleSlots();
  }
  Efd(t) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(t.Xmd);
    e.UpdatePositionInfo(t.B$d);
    this.bfd.set(e.GetPosition(), e);
    this.SetRoleItemData(e);
  }
  Mfd(t) {
    t = t.F$d.l9_;
    this.bfd.delete(t);
    this.RemoveRoleItemData(t);
  }
  SetRoleItemData(t) {
    var e = t.GetPosition();
    this.GetRoleItemDataByPosition(e).SetItemData(e, t);
  }
  RemoveRoleItemData(t) {
    this.GetRoleItemDataByPosition(t).RemoveItemData(t);
  }
  get BackpackId() {
    return this.Config.Id;
  }
  GetBackpackType() {
    return this.Config.Type;
  }
  GetRoleEquipDataList(t = true) {
    var e = [];
    var o = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(o);
    var o = ModelManager_1.ModelManager.FunctionModel.IsOpen(o.EquipRoleFuncId);
    if (!t || o) {
      return this.Tfd;
    }
    for (const i of this.Tfd) {
      if (i.GetRoleId() !== 0) {
        e.push(i);
      }
    }
    return e;
  }
  GetRoleItemDataByPosition(t) {
    var e = Math.floor(t / HonamiStoryDefine_1.HONAMI_ROLE_SLOT_OFFSET) - 1;
    if (!(e < 0) && !(e >= this.Tfd.length)) {
      return this.Tfd[e];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryPlayerBackpackData Invalid position", ["position", t]);
    }
  }
  GetRoleEquipDataByPosition(t) {
    for (const e of this.Tfd) {
      if (e.GetPosition() === t) {
        return e;
      }
    }
  }
  GetRoleEquipDataByRoleId(t) {
    for (const e of this.Tfd) {
      if (e.GetRoleId() === t) {
        return e;
      }
    }
  }
  GetPowerLevel(t) {
    let e = 0;
    for (const o of this.Tfd) {
      e += o.GetCurPowerLevel(t);
    }
    return e;
  }
  UpdateAllRoleSlots() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData();
    var e = t.PowerLevel;
    t.UpdatePowerLevel();
    if (e !== t.PowerLevel) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, e, t.PowerLevel);
    }
  }
  GetCellWidth() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH;
    }
  }
  GetCellHeight() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT_MOBILE;
    } else {
      return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT;
    }
  }
  GetCellHorizontalInterval() {
    return HonamiStoryDefine_1.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL;
  }
  GetCellVerticalInterval() {
    return HonamiStoryDefine_1.HONAMI_GRID_ITEM_VERTICAL_INTERVAL;
  }
  CheckItemByIncId(t) {
    for (const e of this.Tfd) {
      for (const o of e.GetEquipItemDataList()) {
        if (t === o.GetIncId()) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.HonamiStoryPlayerBackpackData = HonamiStoryPlayerBackpackData;
//# sourceMappingURL=HonamiStoryPlayerBackpackData.js.map