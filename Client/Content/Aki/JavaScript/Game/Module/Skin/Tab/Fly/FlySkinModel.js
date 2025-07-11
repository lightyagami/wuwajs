"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FlySkinData_1 = require("../../Data/FlySkinData");
const FlySkinDefine_1 = require("./FlySkinDefine");
class FlySkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.fGc = new Set();
    this.Okc = new Map();
    this.qkc = new Map();
    this.b31 = new Map();
  }
  OnClear() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot);
    return true;
  }
  UpdateFlySkinEquipDataList(e) {
    this.Okc.clear();
    this.qkc.clear();
    this.fGc.clear();
    for (const a of e) {
      var n = a.Z7n;
      var i = a.C5n;
      this.l3c(n);
      var t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n);
      var r = t.SkinType;
      for (const o of i) {
        this.Gkc(o, n, r);
      }
    }
  }
  AddUnlockSkinId(e) {
    if (e > 0) {
      this.l3c(e);
      this._3c(e);
    }
  }
  l3c(e) {
    if (e > 0) {
      this.fGc.add(e);
    }
  }
  CheckSkinIsUnlock(e) {
    return e === 0 || this.fGc.has(e);
  }
  GetFlySkinItemCount(e) {
    if (this.CheckSkinIsUnlock(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  EquipFlySkin(e, n) {
    var i;
    var t;
    if (!(n <= 0)) {
      i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType;
      if ((t = this.GetRoleEquipFlySkinId(e, i)) !== n) {
        this.Fkc(e, t, i);
        this.Gkc(e, n, i);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, i, t, n);
      }
    }
  }
  UnLoadRoleFlySkinBySkinId(e, n) {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType;
    if (this.Fkc(e, n, i)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, i, n, 0);
    }
  }
  UnLoadRoleFlySkinBySkinType(e, n) {
    var i = this.qkc.get(e);
    if ((i &&= i.SkinEquipMap.get(n)) && this.Fkc(e, i, n)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, n, i, 0);
    }
  }
  Gkc(e, n, i) {
    let t = this.Okc.get(n);
    if (t) {
      t.push(e);
    } else {
      t = [e];
      this.Okc.set(n, t);
    }
    let r = this.qkc.get(e);
    if (!r) {
      (r = new FlySkinDefine_1.RoleFlySkinEquipData()).RoleDataId = e;
      this.qkc.set(e, r);
    }
    r.SkinEquipMap.set(i, n);
    r.SkinEquipSet.add(n);
  }
  Fkc(n, e, i) {
    var t;
    var r;
    var a = this.Okc.get(e);
    return !!a && (t = a.findIndex(e => e === n)) !== -1 && !!(r = this.qkc.get(n)) && (a.splice(t, 1), r.SkinEquipMap.delete(i), r.SkinEquipSet.delete(e), true);
  }
  GetRoleEquipFlySkinId(e, n) {
    e = this.qkc.get(e);
    if (e) {
      return e.SkinEquipMap.get(n) ?? 0;
    } else {
      return 0;
    }
  }
  CheckAllRoleEquipFlySkin(e, n) {
    for (const i of ModelManager_1.ModelManager.RoleModel.GetOfficialRoleList()) {
      if (e !== this.GetRoleEquipFlySkinId(i.GetDataId(), n)) {
        return false;
      }
    }
    return true;
  }
  CheckRoleEquipFlySkin(e, n, i) {
    return this.GetRoleEquipFlySkinId(e, i) === n;
  }
  GetRoleEquipParaglidingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 1);
  }
  GetRoleEquipSoarWingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 0);
  }
  _3c(e) {
    return e !== 0 && !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, e) && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, e), true);
  }
  CheckFlySkinHasRedDotBySkinType(e) {
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(e)) {
      if (this.CheckSkinIsUnlock(n.Id) && ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, n.Id)) {
        return true;
      }
    }
    return false;
  }
  CheckFlySkinHasRedDot() {
    return this.CheckFlySkinHasRedDotBySkinType(1) || this.CheckFlySkinHasRedDotBySkinType(0);
  }
  GetFlySkinData(e) {
    var n = this.b31.get(e);
    return n || (ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e) === 14 ? (n = new FlySkinData_1.FlySkinData(e), this.b31.set(e, n), n) : void (Log_1.Log.CheckError() && Log_1.Log.Error("FlySkin,", 71, "无效的飞行皮肤道具id", ["itemId", e])));
  }
}
exports.FlySkinModel = FlySkinModel;
//# sourceMappingURL=FlySkinModel.js.map