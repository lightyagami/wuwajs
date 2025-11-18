"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiGlobalMaterialParam = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Application_1 = require("../../Core/Application/Application");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const UiLayer_1 = require("./UiLayer");
class UiGlobalMaterialParam {
  static async InitAsync() {
    const a = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CharacterRenderingFunctionLibrary_C", () => {
      a.SetResult();
    }, "Ui");
    await a.Promise;
    UiGlobalMaterialParam.Kdr();
    Application_1.Application.AddApplicationHandler(1, UiGlobalMaterialParam.Qdr);
  }
  static Refresh() {
    UiGlobalMaterialParam.Kdr();
  }
  static Clear() {
    Application_1.Application.RemoveApplicationHandler(1, UiGlobalMaterialParam.Qdr);
  }
  static Kdr() {
    var a = (0, puerts_1.$ref)(undefined);
    UE.BP_CharacterRenderingFunctionLibrary_C.GetLGUIMPC(UiLayer_1.UiLayer.UiRoot, a);
    var a = (0, puerts_1.$unref)(a);
    UE.KismetMaterialLibrary.SetScalarParameterValue(UiLayer_1.UiLayer.UiRoot.GetWorld(), a, UiGlobalMaterialParam.LguiWidth, UiLayer_1.UiLayer.UiRootItem.GetWidth());
    UE.KismetMaterialLibrary.SetScalarParameterValue(UiLayer_1.UiLayer.UiRoot.GetWorld(), a, UiGlobalMaterialParam.LguiRenderOnScreen, 1);
  }
}
(exports.UiGlobalMaterialParam = UiGlobalMaterialParam).LguiWidth = new UE.FName("LGUIWidth");
UiGlobalMaterialParam.LguiRenderOnScreen = new UE.FName("RenderOnScreenWPO");
UiGlobalMaterialParam.Qdr = () => {
  UiGlobalMaterialParam.Kdr();
}; //# sourceMappingURL=UIGlobalMaterialParam.js.map