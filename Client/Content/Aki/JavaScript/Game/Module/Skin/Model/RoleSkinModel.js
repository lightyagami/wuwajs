"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleSkinData_1 = require("../Data/RoleSkinData");
class RoleSkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.tMl = new Map();
  }
  UpdateUnlockRoleSkin(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      if (o !== undefined) {
        o.UnlockSkin();
      }
    }
  }
  UpdateWeaponSkinFirstWearRecord(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      if (o !== undefined && (o = o.GetRoleSkinConfig().SuitWeaponSkinId) > 0) {
        this.RecordSuitWeaponFirstWear(o, true);
      }
    }
  }
  AddRoleSkinNewFlag(e) {
    for (const r of e) {
      var o = this.GetRoleSkinData(r);
      if (o !== undefined && !o.IsOriginalSkin()) {
        ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, r);
        ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkinRedDotRefresh, o.GetRoleId());
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MainViewRoleButtonRefreshByRoleSkin);
      }
    }
  }
  GetRoleSkinData(e) {
    var o = this.tMl.get(e);
    return o || (ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e) === 11 ? (o = new RoleSkinData_1.RoleSkinData(e), this.tMl.set(e, o), o) : void (Log_1.Log.CheckError() && Log_1.Log.Error("RoleSkin", 58, "无效的皮肤道具id", ["itemId", e])));
  }
  GetRoleSkinDataByRoleId(e) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (e !== undefined) {
      e = e.GetRoleSkinId();
      return this.GetRoleSkinData(e);
    }
  }
  GetRoleOriginalSkinData(e, o = true) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e, o);
    if (e !== undefined) {
      o = e.GetRoleConfig().SkinId;
      return this.GetRoleSkinData(o);
    }
  }
  GetRoleSkinIdByRoleId(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (e === undefined) {
      return -1;
    } else {
      return e.GetRoleSkinId();
    }
  }
  CheckHasRoleSkin(e) {
    e = this.GetRoleSkinData(e);
    return e !== undefined && e.IsLocked();
  }
  UnlockSkin(e) {
    e = this.GetRoleSkinData(e);
    if (e !== undefined) {
      e.UnlockSkin();
    }
  }
  GetSkinCountById(e) {
    e = this.GetRoleSkinData(e);
    if (e === undefined) {
      return -1;
    } else {
      return e.GetItemCount();
    }
  }
  GetSkinTabList() {
    var o = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("SkinRootView");
    var r = o.length;
    var a = [];
    for (let e = 0; e < r; e++) {
      var n = o[e];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(n.FunctionId)) {
        a.push(n);
      }
    }
    return a;
  }
  GetRoleSkinDataList(e) {
    e = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfigList(e);
    if (e === undefined) {
      return [];
    }
    var o = [];
    for (const a of e) {
      var r = this.GetRoleSkinData(a.Id);
      if (r !== undefined) {
        o.push(r);
      }
    }
    o.sort((e, o) => {
      return e.GetRoleSkinConfig().SortIndex - o.GetRoleSkinConfig().SortIndex;
    });
    return o;
  }
  CheckSuitWeaponFirstWear(e) {
    var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord);
    return !!o && !!o.has(e) && o.get(e);
  }
  HasRoleSkinRedDotByRoleId(e) {
    for (const r of this.GetRoleSkinDataList(e)) {
      var o = this.GetRoleSkinData(r.GetItemId());
      if (o !== undefined && !o.IsLocked() && ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleSkinRedDot, r.GetItemId())) {
        return true;
      }
    }
    return false;
  }
  RecordSuitWeaponFirstWear(e, o) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord) ?? new Map();
    r.set(e, o);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SuitWeaponFirstWearRecord, r);
  }
}
exports.RoleSkinModel = RoleSkinModel;
//# sourceMappingURL=RoleSkinModel.js.map