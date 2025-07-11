"use strict";

var __decorate = this && this.__decorate || function (e, o, t, i) {
  var n;
  var r = arguments.length;
  var a = r < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, o, t, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        a = (r < 3 ? n(a) : r > 3 ? n(o, t, a) : n(o, t)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(o, t, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleLoadComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelLoadComponent_1 = require("../Common/UiModelLoadComponent");
let UiRoleLoadComponent = class UiRoleLoadComponent extends UiModelLoadComponent_1.UiModelLoadComponent {
  constructor() {
    super(...arguments);
    this.pBr = undefined;
    this.h51 = undefined;
  }
  OnInit() {
    super.OnInit();
    this.pBr = this.Owner.CheckGetComponent(13);
    this.h51 = this.Owner.GetComponent(15);
  }
  OnEnd() {
    super.OnEnd();
  }
  LoadModelByRoleDataId(e, o, t = false, i) {
    if (e === this.pBr.RoleDataId && o === this.pBr?.RoleSkinId) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "重复加载角色", ["RoleDataId", e], ["RoleSkinId", o]);
      }
    } else {
      this.pBr.SetRoleDataId(e, o);
      this.LoadFinishCallBack = i;
      this.LoadModel(t);
    }
  }
  LoadModelByRoleConfigId(e, o, t = false, i) {
    if (e === this.pBr.RoleConfigId) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "重复加载角色", ["RoleConfigId", e]);
      }
    } else {
      this.pBr.SetRoleConfigId(e, o);
      this.LoadFinishCallBack = i;
      this.LoadModel(t);
    }
  }
  GetAnimClassPath() {
    return (this.pBr.RoleSkinId <= 0 ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.pBr.RoleConfigId) : ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(this.pBr.RoleSkinId).GetRoleSkinConfig()).UiScenePerformanceABP;
  }
  GetAllMorphPathList() {
    return this.h51?.GetAllMorphPathList();
  }
  FinishLoad() {
    super.FinishLoad();
    this.h51?.PreloadMorphData();
  }
};
UiRoleLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(14)], UiRoleLoadComponent);
exports.UiRoleLoadComponent = UiRoleLoadComponent; //# sourceMappingURL=UiRoleLoadComponent.js.map