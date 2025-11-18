"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNiagaraSettingModule = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiNiagaraSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  SetNiagaraByPath(e, o, i = undefined, a = "js_undefined") {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
        this.DeleteResourceHandle(o);
        if (o.IsValid()) {
          if (e && e.IsValid()) {
            o.SetNiagaraSystem(e);
            i?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`);
            }
            i?.(false);
          }
        }
      }, 100, a);
      this.SetResourceId(o, e);
    }
  }
  async SetNiagaraByPathAsync(e, o, a = "js_undefined") {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      const i = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
        i.SetResult();
        this.DeleteResourceHandle(o);
        if (o.IsValid()) {
          if (e && e.IsValid()) {
            o.SetNiagaraSystem(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`);
          }
        }
      }, 100, a);
      this.SetResourceId(o, e);
      await i.Promise;
    }
  }
}
exports.UiNiagaraSettingModule = UiNiagaraSettingModule;
//# sourceMappingURL=UiNiagaraSettingModule.js.map