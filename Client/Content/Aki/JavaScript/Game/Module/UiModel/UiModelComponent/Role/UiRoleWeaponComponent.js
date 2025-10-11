"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var o = arguments.length;
  var h = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        h = (o < 3 ? n(h) : o > 3 ? n(t, i, h) : n(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleWeaponComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager");
const WeaponSkinDefine_1 = require("../../../Skin/Tab/Weapon/WeaponSkinDefine");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleWeaponComponent = class UiRoleWeaponComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.mBr = undefined;
    this.n$t = undefined;
    this.Jwr = undefined;
    this.yBr = undefined;
    this.nxl = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
    this.IBr = new Array();
    this.TBr = 0;
    this.LBr = new Array();
    this.DBr = new Array();
    this.Czd = new Array();
    this.Dwr = e => {
      this.SetDitherEffect(e);
    };
    this.Twr = t => {
      for (let e = 0; e < this.Czd.length; e++) {
        if (this.Czd[e] && t) {
          this.ShowWeaponByIndex(e);
        } else {
          this.HideWeaponByIndex(e);
        }
      }
    };
    this.OnRoleIdChange = () => {
      this.RefreshWeaponCase();
      this.HideAllWeapon();
      this.ResetWeaponStatesOnRole();
      var e = this.mBr.RoleDataId;
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      var i = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e);
      if (t) {
        if (t.IsTrialRole()) {
          t = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(e).GetWeaponData();
          this.SetWeaponByWeaponData(t, i);
        } else {
          t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
          this.SetWeaponByWeaponData(t, i);
        }
      }
    };
    this.OnRoleMeshLoadComplete = () => {
      this.AttachWeaponToRole();
    };
    this.OnAnsBegin = e => {
      var t = e.Index;
      if (t >= 0 && t < this.Czd.length) {
        this.Czd[t] = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "武器Ans索引错误", ["index", t]);
      }
      this.ShowWeaponByIndex(t, e.ShowMaterialController);
      if (!FNameUtil_1.FNameUtil.IsEmpty(e.HangSocketName)) {
        this.fMl(t, e.HangSocketName);
      }
      if (e.Transform) {
        this.SetWeaponTransformByIndex(t, e.Transform);
      }
    };
    this.OnAnsEnd = e => {
      var t = e.Index;
      if (t >= 0 && t < this.Czd.length) {
        this.Czd[t] = false;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "武器Ans索引错误", ["index", t]);
      }
      this.HideWeaponByIndex(e.Index, e.HideEffect);
      if (!FNameUtil_1.FNameUtil.IsEmpty(e.HangSocketName)) {
        this.fMl(e.Index, undefined);
      }
    };
  }
  OnInit() {
    this.mBr = this.Owner.CheckGetComponent(13);
    this.ywr = this.Owner.CheckGetComponent(0);
    this.n$t = this.Owner.CheckGetComponent(1);
    this.Jwr = this.Owner.CheckGetComponent(6);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetMorphTypeComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelRoleDataIdChange, this.OnRoleIdChange);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    this.Jwr?.RegisterAnsTrigger("UiWeaponAnsContext", this.OnAnsBegin, this.OnAnsEnd);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetMorphTypeComplete, this.OnRoleMeshLoadComplete);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelRoleDataIdChange, this.OnRoleIdChange);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    for (const e of this.IBr) {
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(e);
    }
  }
  Refresh() {
    var t = this.yBr.GetModels(this.nxl);
    this.TBr = t.length;
    for (let e = this.IBr.length; e < this.TBr; e++) {
      var i = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(2);
      this.IBr.push(i);
      this.DBr.push(0);
      this.Czd.push(false);
      this.HideWeaponByIndex(e);
    }
    for (let e = 0; e < this.TBr; e++) {
      var s = this.IBr[e].Model;
      s.CheckGetComponent(22)?.SetWeaponData(this.yBr);
      s.CheckGetComponent(2)?.LoadModelByModelId(t[e], false, () => {
        this.lKd(e);
      });
    }
  }
  lKd(e) {
    var t;
    if (e < 0 || e >= this.IBr.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "显示武器索引错误", ["weaponIndex", e]);
      }
    } else {
      t = this.DBr[e];
      e = this.IBr[e].Model;
      UiModelUtil_1.UiModelUtil.SetVisible(e, t === 2);
    }
  }
  ShowAllWeapon(t = false) {
    for (let e = 0; e < this.IBr.length; e++) {
      this.ShowWeaponByIndex(e, t);
    }
  }
  HideAllWeapon(t = false) {
    for (let e = 0; e < this.IBr.length; e++) {
      this.HideWeaponByIndex(e, t);
    }
  }
  ResetWeaponStatesOnRole() {
    for (let e = 0; e < this.Czd.length; e++) {
      this.Czd[e] = false;
    }
  }
  ShowWeaponByIndex(e, t = false) {
    var i;
    var s;
    if (e < 0 || e >= this.IBr.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "显示武器索引错误", ["index", e]);
      }
    } else {
      s = (i = this.IBr[e].Model).CheckGetComponent(0);
      this.DBr[e] = 2;
      if (!s?.GetVisible()) {
        s?.SetVisible(true);
        if (t) {
          UiModelUtil_1.UiModelUtil.SetRenderingMaterial(i, "ChangeWeaponMaterialController");
        }
      }
    }
  }
  HideWeaponByIndex(e, t = false) {
    var i;
    var s;
    if (e < 0 || e >= this.IBr.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "隐藏武器索引错误", ["index", e]);
      }
    } else {
      s = (i = this.IBr[e].Model).CheckGetComponent(0);
      this.DBr[e] = 1;
      if (s?.GetVisible() && (s?.SetVisible(false), t)) {
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "ShowHideWeaponEffect");
      }
    }
  }
  RefreshWeaponCase() {
    var e = this.mBr.RoleConfigId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var e = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId);
    if (e) {
      var t = e.BattleSockets;
      for (let e = this.LBr.length = 0; e < t.Num(); e++) {
        var i = t.Get(e);
        this.LBr.push(i);
      }
    }
  }
  RefreshWeaponDa() {
    var e = this.yBr.GetBreachLevel();
    for (const t of this.IBr) {
      t.Model?.CheckGetComponent(23)?.RefreshWeaponBreachDa(e, this.yBr.GetRoleId());
    }
  }
  AttachWeaponToRole() {
    if (this.ywr.GetModelLoadState() === 2) {
      var t = this.n$t.MainMeshComponent;
      for (let e = 0; e < this.TBr; e++) {
        var i = this.IBr[e];
        var s = FNameUtil_1.FNameUtil.GetDynamicFName(this.LBr[e]);
        var i = i.Model?.CheckGetComponent(1);
        i?.Actor?.K2_AttachToComponent(t, s, 0, 0, 0, false);
        i?.Actor?.D_K2_SetActorRelativeTransform(MathUtils_1.MathUtils.DefaultTransformDouble, false, undefined, false);
      }
    }
  }
  fMl(e, t) {
    this.IBr[e].Model?.CheckGetComponent(1)?.Actor?.K2_AttachToComponent(this.n$t.MainMeshComponent, t ?? FNameUtil_1.FNameUtil.GetDynamicFName(this.LBr[e]), 0, 0, 0, false);
  }
  SetWeaponByWeaponData(e, t) {
    if (e) {
      this.yBr = e;
      this.nxl = t;
      this.Refresh();
    }
  }
  ReplaceWeaponModel(t, e) {
    this.TBr = t.length;
    for (let e = this.IBr.length; e < this.TBr; e++) {
      var i = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(2);
      this.IBr.push(i);
      this.DBr.push(0);
      this.Czd.push(false);
      this.HideWeaponByIndex(e);
    }
    let s = 0;
    var n = () => {
      if (++s >= this.TBr) {
        e?.();
      }
    };
    for (let e = 0; e < this.TBr; e++) {
      var o = this.IBr[e].Model;
      if (o.CheckGetComponent(0)?.ModelConfigId !== t[e]) {
        o.CheckGetComponent(2)?.LoadModelByModelId(t[e], false, n);
      }
    }
  }
  HasWeapon() {
    return this.yBr !== undefined;
  }
  SetWeaponTransformByIndex(e, t) {
    if (e < 0 || e >= this.IBr.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weapon", 43, "设置武器偏移索引错误", ["index", e]);
      }
    } else {
      this.IBr[e].Model?.CheckGetComponent(1)?.MainMeshComponent?.K2_SetRelativeTransform(t, false, undefined, false);
    }
  }
  SetDitherEffect(e) {
    for (const t of this.IBr) {
      t.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
    }
  }
  GetWeaponCount() {
    return this.TBr;
  }
};
UiRoleWeaponComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(17)], UiRoleWeaponComponent);
exports.UiRoleWeaponComponent = UiRoleWeaponComponent; //# sourceMappingURL=UiRoleWeaponComponent.js.map