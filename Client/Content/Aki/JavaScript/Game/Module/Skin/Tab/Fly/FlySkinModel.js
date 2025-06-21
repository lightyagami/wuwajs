"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlySkinModel = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FlySkinData_1 = require("../../Data/FlySkinData"),
  FlySkinDefine_1 = require("./FlySkinDefine");
class FlySkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.fGc = new Set, this.Okc = new Map, this.qkc = new Map, this.KN1 = new Map
  }
  OnClear() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot), !0
  }
  UpdateFlySkinEquipDataList(e) {
    this.Okc.clear(), this.qkc.clear(), this.fGc.clear();
    for (const a of e) {
      var n = a.Z7n,
        i = a.C5n,
        t = (this.l3c(n), ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n)),
        r = t.SkinType;
      for (const o of i) this.Gkc(o, n, r)
    }
  }
  AddUnlockSkinId(e) {
    0 < e && (this.l3c(e), this._3c(e))
  }
  l3c(e) {
    0 < e && this.fGc.add(e)
  }
  CheckSkinIsUnlock(e) {
    return 0 === e || this.fGc.has(e)
  }
  GetFlySkinItemCount(e) {
    return this.CheckSkinIsUnlock(e) ? 1 : 0
  }
  EquipFlySkin(e, n) {
    var i, t;
    n <= 0 || (i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType, (t = this.GetRoleEquipFlySkinId(e, i)) !== n && (this.Fkc(e, t, i), this.Gkc(e, n, i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, i, t, n)))
  }
  UnLoadRoleFlySkinBySkinId(e, n) {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType;
    this.Fkc(e, n, i) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, i, n, 0)
  }
  UnLoadRoleFlySkinBySkinType(e, n) {
    var i = this.qkc.get(e);
    i && (i = i.SkinEquipMap.get(n)) && this.Fkc(e, i, n) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlySkinChange, e, n, i, 0)
  }
  Gkc(e, n, i) {
    let t = this.Okc.get(n),
      r = (t ? t.push(e) : (t = [e], this.Okc.set(n, t)), this.qkc.get(e));
    r || ((r = new FlySkinDefine_1.RoleFlySkinEquipData).RoleDataId = e, this.qkc.set(e, r)), r.SkinEquipMap.set(i, n), r.SkinEquipSet.add(n)
  }
  Fkc(n, e, i) {
    var t, r, a = this.Okc.get(e);
    return !!a && -1 !== (t = a.findIndex(e => e === n)) && !!(r = this.qkc.get(n)) && (a.splice(t, 1), r.SkinEquipMap.delete(i), r.SkinEquipSet.delete(e), !0)
  }
  GetRoleEquipFlySkinId(e, n) {
    e = this.qkc.get(e);
    return e ? e.SkinEquipMap.get(n) ?? 0 : 0
  }
  CheckAllRoleEquipFlySkin(e, n) {
    for (const i of ModelManager_1.ModelManager.RoleModel.GetOfficialRoleList())
      if (e !== this.GetRoleEquipFlySkinId(i.GetDataId(), n)) return !1;
    return !0
  }
  CheckRoleEquipFlySkin(e, n, i) {
    return this.GetRoleEquipFlySkinId(e, i) === n
  }
  GetRoleEquipParaglidingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 1)
  }
  GetRoleEquipSoarWingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 0)
  }
  _3c(e) {
    return 0 !== e && !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, e) && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, e), !0)
  }
  CheckFlySkinHasRedDotBySkinType(e) {
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(e))
      if (this.CheckSkinIsUnlock(n.Id) && ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, n.Id)) return !0;
    return !1
  }
  CheckFlySkinHasRedDot() {
    return this.CheckFlySkinHasRedDotBySkinType(1) || this.CheckFlySkinHasRedDotBySkinType(0)
  }
  GetFlySkinData(e) {
    var n = this.KN1.get(e);
    return n || (14 === ConfigManager_1.ConfigManager.InventoryConfig?.GetItemDataTypeByConfigId(e) ? (n = new FlySkinData_1.FlySkinData(e), this.KN1.set(e, n), n) : void(Log_1.Log.CheckError() && Log_1.Log.Error("FlySkin,", 71, "无效的飞行皮肤道具id", ["itemId", e])))
  }
}
exports.FlySkinModel = FlySkinModel;
//# sourceMappingURL=FlySkinModel.js.map