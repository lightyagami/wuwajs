"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelResourcesManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const LOADMODE_REASON_STRING = "UiModelResourcesManager.LoadUiModelResources";
class UiModelResourcesManager {
  static get cxo() {
    return UiModelResourcesManager.mxo++;
  }
  static LoadUiModelResources(r, a) {
    if (!r || r.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiModelResourcesManager", 10, "加载资源内容为空,检查一下传进来的数据");
      }
      a?.(1);
      return 0;
    }
    const s = [];
    const t = [];
    const l = UiModelResourcesManager.cxo;
    const i = new Map();
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
    UiModelResourcesManager.dxo.set(l, []);
    for (const o of r) {
      var e = ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.Object, (e, o) => {
        if (e) {
          s.push(o);
          i.set(o, e);
        }
        t.push(o);
        if (t.length === r.length && (UiModelResourcesManager.dxo.delete(l), s.length !== t.length ? a?.(3) : a?.(2, i), ResourceSystem_1.ResourceSystem.IsLoadingReasonNotEmpty(LOADMODE_REASON_STRING))) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
        }
      });
      if (UiModelResourcesManager.dxo.has(l)) {
        UiModelResourcesManager.dxo.get(l).push(e);
      }
    }
    return l;
  }
  static LoadUiRoleAllResourceByRoleConfigId(e, o) {
    var r = [];
    r.push(...UiModelResourcesManager.GetRoleResourcesPath(e));
    r.push(EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController"));
    return UiModelResourcesManager.LoadUiModelResources(r, o);
  }
  static CancelUiModelResourceLoad(e) {
    if (e !== UiModelResourcesManager.InvalidValue) {
      var o = UiModelResourcesManager.dxo.get(e);
      if (o) {
        for (const e of o) {
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
        }
        if (ResourceSystem_1.ResourceSystem.IsLoadingReasonNotEmpty(LOADMODE_REASON_STRING)) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
        }
      }
    }
  }
  static GetRoleResourcesPath(e) {
    var o = [];
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var r = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId);
    o.push(r.网格体.ToAssetPathName());
    o.push(e.UiScenePerformanceABP);
    var a = r.子网格体;
    if (a) {
      for (let e = 0; e < a.Num(); e++) {
        o.push(a.Get(e).ToAssetPathName());
      }
    }
    return o;
  }
  static GetWeaponResourcesPath(e) {
    var o = [];
    for (const s of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e).Models) {
      var r = ModelUtil_1.ModelUtil.GetModelConfig(s);
      var a = r.网格体.ToAssetPathName();
      if (a) {
        o.push(a);
      }
      var a = r.动画蓝图.ToAssetPathName();
      if (a) {
        o.push(a);
      }
    }
    return o;
  }
  static GetHuluResourcesPath(e) {
    var o = [];
    var e = ModelUtil_1.ModelUtil.GetModelConfig(e);
    var r = e.网格体.ToAssetPathName();
    if (r) {
      o.push(r);
    }
    var r = e.动画蓝图.ToAssetPathName();
    if (r) {
      o.push(r);
    }
    return o;
  }
}
(exports.UiModelResourcesManager = UiModelResourcesManager).dxo = new Map();
UiModelResourcesManager.mxo = 0;
UiModelResourcesManager.InvalidValue = 0; //# sourceMappingURL=UiModelResourcesManager.js.map