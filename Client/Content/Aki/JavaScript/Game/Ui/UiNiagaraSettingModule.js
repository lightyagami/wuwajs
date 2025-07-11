"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNiagaraSettingModule = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const UiResourceLoadModule_1 = require("./UiResourceLoadModule");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
class UiNiagaraSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  SetNiagaraByPath(e, o, t = undefined) {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
        this.DeleteResourceHandle(o);
        if (o.IsValid()) {
          if (e && e.IsValid()) {
            o.SetNiagaraSystem(e);
            t?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`);
            }
            t?.(false);
          }
        }
      });
      this.SetResourceId(o, e);
    }
  }
  async SetNiagaraByPathAsync(e, o) {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      const t = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
        t.SetResult();
        this.DeleteResourceHandle(o);
        if (o.IsValid()) {
          if (e && e.IsValid()) {
            o.SetNiagaraSystem(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`);
          }
        }
      });
      this.SetResourceId(o, e);
      await t.Promise;
    }
  }
}
exports.UiNiagaraSettingModule = UiNiagaraSettingModule;
//# sourceMappingURL=UiNiagaraSettingModule.js.map