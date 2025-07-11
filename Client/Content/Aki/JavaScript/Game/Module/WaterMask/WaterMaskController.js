"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterMaskView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
class WaterMaskView extends UiControllerBase_1.UiControllerBase {
  static CanOpenView() {
    return false;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.vOo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetResolution, this.MOo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.EOo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.vOo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetResolution, this.MOo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.EOo);
  }
}
exports.WaterMaskView = WaterMaskView;
(_a = WaterMaskView).SOo = undefined;
WaterMaskView.yOo = 300;
WaterMaskView.IOo = 300;
WaterMaskView.TOo = 30;
WaterMaskView.LOo = 0.09;
WaterMaskView.vFt = 40;
WaterMaskView.vOo = () => {
  if (_a.SOo !== undefined) {
    _a.EOo();
  }
  var e = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.WaterMask);
  _a.SOo = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, UE.UIContainerActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
  var t = _a.SOo.RootComponent;
  t.SetDisplayName("WaterMaskContainer");
  UE.KuroStaticLibrary.SetActorPermanent(_a.SOo, true, true);
  _a.SOo.K2_AttachRootComponentTo(e);
  var e = t.GetRootCanvas().GetOwner().RootComponent;
  var i = e.widget.width % _a.yOo / 2;
  var r = e.widget.height % _a.IOo / 2;
  var n = e.widget.width / 2;
  var _ = e.widget.height / 2;
  var s = Math.ceil(e.widget.width / _a.yOo);
  var o = Math.ceil(e.widget.height / _a.IOo);
  var v = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
  for (let a = 0; a < s; a++) {
    for (let e = 0; e < o; e++) {
      var E = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, UE.UITextActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      var U = E.RootComponent;
      E.K2_AttachRootComponentTo(t);
      U.SetDisplayName("WaterMaskText");
      var U = E.GetComponentByClass(UE.UIText.StaticClass());
      U.SetFontSize(_a.vFt);
      U.SetOverflowType(0);
      U.SetAlpha(_a.LOo);
      U.SetFont(UE.LGUIFontData.GetDefaultFont());
      U.SetText(v);
      U.SetUIRelativeLocation(new UE.Vector(a * _a.yOo - n + i, e * _a.IOo - _ + r, 0));
      U.SetUIRelativeRotation(new UE.Rotator(0, _a.TOo, 0));
      UE.KuroStaticLibrary.SetActorPermanent(E, true, true);
    }
  }
};
WaterMaskView.EOo = () => {
  if (_a.SOo !== undefined) {
    _a.SOo.K2_DestroyActor();
    _a.SOo = undefined;
  }
};
WaterMaskView.MOo = () => {
  _a.EOo();
  _a.vOo();
}; //# sourceMappingURL=WaterMaskController.js.map