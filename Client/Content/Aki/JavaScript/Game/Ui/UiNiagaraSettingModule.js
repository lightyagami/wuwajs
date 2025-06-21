"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiNiagaraSettingModule = void 0;
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../GlobalData"),
  UiResourceLoadModule_1 = require("./UiResourceLoadModule"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise");
class UiNiagaraSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  SetNiagaraByPath(e, o, t = void 0) {
    GlobalData_1.GlobalData.World && o && o.IsValid() && (this.CancelResource(o), e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
      this.DeleteResourceHandle(o), o.IsValid() && (e && e.IsValid() ? (o.SetNiagaraSystem(e), t?.(!0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`), t?.(!1)))
    }), this.SetResourceId(o, e))
  }
  async SetNiagaraByPathAsync(e, o) {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      const t = new CustomPromise_1.CustomPromise;
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e, a) => {
        t.SetResult(), this.DeleteResourceHandle(o), o.IsValid() && (e && e.IsValid() ? o.SetNiagaraSystem(e) : Log_1.Log.CheckError() && Log_1.Log.Error("UiImageSetting", 37, `设置NiagaraSystem失败，Niagara资源加载失败，资源路径：${a}}`))
      });
      this.SetResourceId(o, e), await t.Promise
    }
  }
}
exports.UiNiagaraSettingModule = UiNiagaraSettingModule;
//# sourceMappingURL=UiNiagaraSettingModule.js.map