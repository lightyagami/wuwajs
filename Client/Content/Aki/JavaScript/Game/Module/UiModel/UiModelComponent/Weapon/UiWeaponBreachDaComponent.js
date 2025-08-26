"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, o, s) : i(t, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiWeaponBreachDaComponent = undefined;
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponBreachDaComponent = class UiWeaponBreachDaComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ywr = undefined;
    this.n$t = undefined;
    this.UBr = undefined;
    this.KY = () => {
      var e = this.UBr?.WeaponData?.GetBreachLevel() ?? 0;
      var t = this.UBr?.WeaponData?.GetRoleId() ?? 0;
      this.RefreshWeaponBreachDa(e, t);
    };
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
    this.n$t = this.Owner.CheckGetComponent(1);
    this.UBr = this.Owner.CheckGetComponent(22);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.KY);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.KY);
  }
  RefreshWeaponBreachDa(o, e) {
    ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponBreachLevel = o;
    ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponEquippedRoleId = e;
    const n = this.ywr.ModelConfigId;
    e = ModelUtil_1.ModelUtil.GetModelConfig(n)?.DA?.AssetPathName.toString();
    if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
      const i = ControllerHolder_1.ControllerHolder.WeaponController;
      Promise.all([i.LoadCharacterRenderingFunctionLibraryAsync(), i.LoadWeaponLevelMaterialDataAsync(e)]).then(([, e]) => {
        var t;
        if (e && n === this.ywr.ModelConfigId && (t = this.n$t?.MainMeshComponent)) {
          i.ApplyWeaponLevelMaterial(t, e, o);
        }
      });
    }
  }
};
UiWeaponBreachDaComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(23)], UiWeaponBreachDaComponent);
exports.UiWeaponBreachDaComponent = UiWeaponBreachDaComponent; //# sourceMappingURL=UiWeaponBreachDaComponent.js.map