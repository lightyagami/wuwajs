"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelResourcesManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const LOADMODE_REASON_STRING = "UiModelResourcesManager.LoadUiModelResources";
class UiModelResourcesManager {
  static get cxo() {
    return UiModelResourcesManager.mxo++;
  }
  static LoadUiModelResources(o, s) {
    if (!o || o.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiModelResourcesManager", 10, "加载资源内容为空,检查一下传进来的数据");
      }
      s?.(1);
      return 0;
    }
    const a = [];
    const t = [];
    const i = UiModelResourcesManager.cxo;
    const l = new Map();
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
    UiModelResourcesManager.dxo.set(i, []);
    for (const r of o) {
      var e = ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.Object, (e, r) => {
        if (e) {
          a.push(r);
          l.set(r, e);
        }
        t.push(r);
        if (t.length === o.length && (UiModelResourcesManager.dxo.delete(i), a.length !== t.length ? s?.(3) : s?.(2, l), ResourceSystem_1.ResourceSystem.IsLoadingReasonNotEmpty(LOADMODE_REASON_STRING))) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
        }
      });
      if (UiModelResourcesManager.dxo.has(i)) {
        UiModelResourcesManager.dxo.get(i).push(e);
      }
    }
    return i;
  }
  static LoadUiRoleAllResourceByRoleConfigId(e, r) {
    var o = [];
    o.push(...UiModelResourcesManager.GetRoleResourcesPath(e));
    o.push(EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController"));
    return UiModelResourcesManager.LoadUiModelResources(o, r);
  }
  static CancelUiModelResourceLoad(e) {
    if (e !== UiModelResourcesManager.InvalidValue) {
      var r = UiModelResourcesManager.dxo.get(e);
      if (r) {
        for (const e of r) {
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
        }
        if (ResourceSystem_1.ResourceSystem.IsLoadingReasonNotEmpty(LOADMODE_REASON_STRING)) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, LOADMODE_REASON_STRING);
        }
      }
    }
  }
  static GetRoleResourcesPath(e) {
    var r = [];
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var o = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId);
    r.push(o.网格体.ToAssetPathName());
    r.push(e.UiScenePerformanceABP);
    var s = o.子网格体;
    if (s) {
      for (let e = 0; e < s.Num(); e++) {
        r.push(s.Get(e).ToAssetPathName());
      }
    }
    return r;
  }
  static GetWeaponResourcesPath(e) {
    var r = [];
    for (const a of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e).Models) {
      var o = ModelUtil_1.ModelUtil.GetModelConfig(a);
      var s = o.网格体.ToAssetPathName();
      if (s) {
        r.push(s);
      }
      var s = o.动画蓝图.ToAssetPathName();
      if (s) {
        r.push(s);
      }
    }
    return r;
  }
  static GetHuluResourcesPath(e) {
    var r = [];
    var e = ModelUtil_1.ModelUtil.GetModelConfig(e);
    var o = e.网格体.ToAssetPathName();
    if (o) {
      r.push(o);
    }
    var o = e.动画蓝图.ToAssetPathName();
    if (o) {
      r.push(o);
    }
    return r;
  }
  static LoadMeshesComponentsBundleStreaming(e, r, s) {
    var o = (e, r) => {
      const o = () => {
        try {
          s(e, r);
          UiModelResourcesManager.StreamingCallBackCatchSet.delete(o);
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("UiModelResourcesManager", 43, "[UiModelResourcesManager FinishCallBack] 模型加载回调执行异常", e, ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiModelResourcesManager", 43, "[UiModelResourcesManager FinishCallBack] 模型加载回调执行异常", ["error", e]);
          }
        }
      };
      UiModelResourcesManager.StreamingCallBackCatchSet.add(o);
      TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(0, true, o);
    };
    var e = UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(e, r, (0, puerts_1.toManualReleaseDelegate)(o));
    this.Sv1.set(e, o);
    return e;
  }
  static ReleaseMeshesComponentsBundleStreaming(e) {
    UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e);
    var r = this.Sv1.get(e);
    if (r) {
      (0, puerts_1.releaseManualReleaseDelegate)(r);
      this.Sv1.delete(e);
    }
  }
}
(exports.UiModelResourcesManager = UiModelResourcesManager).dxo = new Map();
UiModelResourcesManager.mxo = 0;
UiModelResourcesManager.InvalidValue = 0;
UiModelResourcesManager.StreamingInvalidValue = -1;
UiModelResourcesManager.StreamingCallBackCatchSet = new Set();
UiModelResourcesManager.Sv1 = new Map(); //# sourceMappingURL=UiModelResourcesManager.js.map