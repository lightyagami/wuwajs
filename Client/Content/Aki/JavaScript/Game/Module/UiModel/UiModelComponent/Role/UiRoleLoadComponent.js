"use strict";
var __decorate = this && this.__decorate || function(e, o, t, i) {
  var n, r = arguments.length,
    a = r < 3 ? o : null === i ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, o, t, i);
  else
    for (var s = e.length - 1; 0 <= s; s--)(n = e[s]) && (a = (r < 3 ? n(a) : 3 < r ? n(o, t, a) : n(o, t)) || a);
  return 3 < r && a && Object.defineProperty(o, t, a), a
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiRoleLoadComponent = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiRoleLoadComponent = class UiRoleLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments), this.pBr = void 0, this.R61 = void 0
  }
  OnInit() {
    super.OnInit(), this.pBr = this.Owner.CheckGetComponent(13), this.R61 = this.Owner.GetComponent(15)
  }
  OnEnd() {
    super.OnEnd()
  }
  LoadModelByRoleDataId(e, o, t = !1, i) {
    e === this.pBr.RoleDataId && o === this.pBr?.RoleSkinId ? Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "重复加载角色", ["RoleDataId", e], ["RoleSkinId", o]) : (this.pBr.SetRoleDataId(e, o), this.LoadFinishCallBack = i, this.LoadModel(t))
  }
  LoadModelByRoleConfigId(e, o, t = !1, i) {
    e === this.pBr.RoleConfigId ? Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "重复加载角色", ["RoleConfigId", e]) : (this.pBr.SetRoleConfigId(e, o), this.LoadFinishCallBack = i, this.LoadModel(t))
  }
  GetAnimClassPath() {
    return (this.pBr.RoleSkinId <= 0 ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.pBr.RoleConfigId) : ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.pBr.RoleSkinId).GetRoleSkinConfig()).UiScenePerformanceABP
  }
  GetAllMorphPathList() {
    return this.R61?.GetAllMorphPathList()
  }
  FinishLoad() {
    super.FinishLoad(), this.R61?.PreloadMorphData()
  }
};
UiRoleLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(14)], UiRoleLoadComponent), exports.UiRoleLoadComponent = UiRoleLoadComponent;
//# sourceMappingURL=UiRoleLoadComponent.js.map