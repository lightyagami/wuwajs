"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        s = (r < 3 ? o(s) : r > 3 ? o(t, i, s) : o(t, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiWeaponBreachDaComponent = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
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
  RefreshWeaponBreachDa(i, e) {
    ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponBreachLevel = i;
    ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponEquippedRoleId = e;
    const n = this.ywr.ModelConfigId;
    e = ModelUtil_1.ModelUtil.GetModelConfig(n)?.DA?.AssetPathName.toString();
    if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Object, e => {
        var t;
        if (e && n === this.ywr.ModelConfigId && (t = this.n$t?.MainMeshComponent, e instanceof UE.PD_WeaponLevelMaterialDatas_C)) {
          UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(t, e, i, t);
        }
      });
    }
  }
};
UiWeaponBreachDaComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(23)], UiWeaponBreachDaComponent);
exports.UiWeaponBreachDaComponent = UiWeaponBreachDaComponent; //# sourceMappingURL=UiWeaponBreachDaComponent.js.map