"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewFlagModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class NewFlagModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.DGi = new Map();
    this.RGi = new Array();
    this.xta = new Map();
    this.LoadNewFlagConfig = () => {
      for (const t of [LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey, LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey, LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem, LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemUnlock, LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingShopItemChecked, LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingRoleUnlock, LocalStorageDefine_1.ELocalStoragePlayerKey.MoonChasingQuestUnlock, LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem, LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem, LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, LocalStorageDefine_1.ELocalStoragePlayerKey.DockyardListItemRead, LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked, LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord, LocalStorageDefine_1.ELocalStoragePlayerKey.FishingShipSkinRecord]) {
        var e = LocalStorage_1.LocalStorage.GetPlayer(t);
        var e = new Set(e || undefined);
        this.DGi.set(t, e);
        this.xta.set(t, false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLoadedNewFlagConfig);
    };
    this.ClearNewFlag = () => {
      this.DGi.clear();
      this.RGi.length = 0;
      this.xta.clear();
    };
  }
  OnInit() {
    this.OnAddEvents();
    return true;
  }
  OnClear() {
    this.OnRemoveEvents();
    return true;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.LoadNewFlagConfig);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogOut, this.ClearNewFlag);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.LoadNewFlagConfig);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LogOut, this.ClearNewFlag);
  }
  SaveNewFlagConfig(e) {
    var t = this.DGi.get(e);
    if (!t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NewFlag", 37, "该系统当前没有需要保存的New标签", ["System", e]);
      }
      return false;
    }
    if (!this.xta.get(e)) {
      return false;
    }
    this.RGi.length = t.size;
    let o = 0;
    for (const a of t) {
      this.RGi[o++] = a;
    }
    this.xta.set(e, false);
    return LocalStorage_1.LocalStorage.SetPlayer(e, this.RGi);
  }
  AddNewFlag(e, t) {
    var o = this.DGi.get(e);
    if (o) {
      o.add(t);
      this.xta.set(e, true);
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NewFlag", 37, "该系统当前没有Set缓存,无法添加, 请检查是否初始化", ["System", e]);
      }
      return false;
    }
  }
  RemoveNewFlag(e, t) {
    var o = this.DGi.get(e);
    if (o) {
      o = o.delete(t);
      t = this.xta.get(e);
      this.xta.set(e, o || t);
      return o;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NewFlag", 37, "该系统当前没有Set缓存,无法删除, 请检查是否初始化", ["System", e]);
      }
      return false;
    }
  }
  HasNewFlag(e, t) {
    e = this.DGi.get(e);
    return !!e && e.has(t);
  }
  GetNewFlagSet(e) {
    return this.DGi.get(e);
  }
}
exports.NewFlagModel = NewFlagModel;
//# sourceMappingURL=NewFlagModel.js.map