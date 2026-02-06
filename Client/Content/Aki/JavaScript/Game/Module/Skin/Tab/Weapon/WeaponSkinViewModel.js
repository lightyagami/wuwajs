"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinViewModel = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkinViewModelBase_1 = require("../../SkinViewModelBase");
const WeaponSkinDefine_1 = require("../../Tab/Weapon/WeaponSkinDefine");
const WeaponSkinGridData_1 = require("./WeaponSkinGridData");
class WeaponSkinViewModel extends SkinViewModelBase_1.ViewModelBase {
  constructor() {
    super();
    this.C0t = undefined;
    this.K9m = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
    this.Ail = (e, i) => {
      if (this.C0t.RoleId === e) {
        this.K9m = this.GetEquipSkinId();
        this.SetEquipSkinId(i);
      }
    };
    this.xil = e => {
      if (this.C0t.RoleId === e) {
        this.K9m = this.GetEquipSkinId();
        this.SetEquipSkinId(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID);
      }
    };
    this.GridItemCanExecuteChange = e => {
      e = e.SkinId;
      return this.GetSelectedSkinId() !== e;
    };
    this.DataMap.set(1, []);
    this.DataMap.set(0, false);
    this.DataMap.set(2, undefined);
    this.DataMap.set(3, undefined);
    this.DataMap.set(4, true);
  }
  get PrevEquipSkinId() {
    return this.K9m;
  }
  Init(e) {
    this.C0t = e;
    this.sTl();
    this.InitSelectedWeaponSkinId();
  }
  SetIsInShowWeapon(e, i) {
    this.SetData(0, e, i);
  }
  GetIsInShowWeapon() {
    return this.GetData(0);
  }
  SetEquipSkinId(e, i) {
    this.SetData(2, e, i);
  }
  GetEquipSkinId() {
    return this.GetData(2);
  }
  SetSelectedSkinId(e, i) {
    this.SetData(3, e, i);
  }
  GetSelectedSkinId() {
    return this.GetData(3);
  }
  GetSkinDataList() {
    return this.GetData(1);
  }
  SetWeaponUiVisible(e, i) {
    this.SetData(4, e, i);
  }
  GetWeaponUiVisible() {
    return this.GetData(4);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EquipWeaponSkin, this.Ail);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UninstallWeaponSkin, this.xil);
  }
  sTl() {
    var e = (ModelManager_1.ModelManager.WeaponModel?.GetWeaponDataByIncId(this.C0t.WeaponId)).GetWeaponConfig().WeaponType;
    var e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfigListByType(e);
    var i = this.C0t.RoleId;
    const t = this.wil(WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, i);
    var n = this.GetSkinDataList();
    n.push(t);
    for (const s of e) {
      if (!s.HideInSkinView) {
        const t = this.wil(s.Id, i);
        n.push(t);
      }
    }
  }
  wil(e, i) {
    return new WeaponSkinGridData_1.WeaponSkinData(e, i);
  }
  InitSelectedWeaponSkinId() {
    var e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.C0t.RoleId);
    this.SetEquipSkinId(e);
    var e = this.GetDataIndexBySkinId(e);
    var i = this.GetSkinDataList();
    this.SetSelectedSkinId(i[e].SkinId);
  }
  GetDataIndexBySkinId(i) {
    var e = this.GetSkinDataList().findIndex(e => e.SkinId === i);
    if (e < 0) {
      return 0;
    } else {
      return e;
    }
  }
}
exports.WeaponSkinViewModel = WeaponSkinViewModel;
//# sourceMappingURL=WeaponSkinViewModel.js.map