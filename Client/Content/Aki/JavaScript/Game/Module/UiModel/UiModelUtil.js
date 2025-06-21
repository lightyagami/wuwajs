"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiModelUtil = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  EffectUtil_1 = require("../../Utils/EffectUtil"),
  WorldMapUtil_1 = require("../WorldMap/WorldMapUtil");
class UiModelUtil {
  static PlayEffectOnRoot(e, t) {
    var r = e.CheckGetComponent(4),
      e = e.CheckGetComponent(1),
      t = EffectUtil_1.EffectUtil.GetEffectPath(t),
      e = e?.MainMeshComponent;
    e ? r?.PlayEffectOnRoot(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, !0) : Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "MainMeshComponent为空")
  }
  static PlayEffectOnRootWithCallback(e, t, r) {
    var a = e.CheckGetComponent(4),
      e = e.CheckGetComponent(1),
      t = EffectUtil_1.EffectUtil.GetEffectPath(t),
      e = e?.MainMeshComponent;
    e ? a && (a = a.PlayEffectByPath(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, !0, !1, Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVectorDouble, !0), EffectSystem_1.EffectSystem.AddFinishCallback(a, r)) : Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "MainMeshComponent为空")
  }
  static PlayEffectAtRootComponent(e, t) {
    var r = e.CheckGetComponent(4),
      e = e.CheckGetComponent(1),
      t = EffectUtil_1.EffectUtil.GetEffectPath(t),
      e = e?.Actor?.RootComponent;
    e ? r?.PlayEffectOnRoot(t, e, FNameUtil_1.FNameUtil.EMPTY, !0) : Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "Actor为空")
  }
  static SetRenderingMaterial(e, t) {
    return e.CheckGetComponent(5)?.SetRenderingMaterial(t) ?? 0
  }
  static RemoveRenderingMaterial(e, t) {
    e.CheckGetComponent(5)?.RemoveRenderingMaterial(t)
  }
  static SetVisible(e, t) {
    return e.CheckGetComponent(0)?.SetVisible(t) ?? !1
  }
  static GetActorLguiPos(e, t = Vector_1.Vector.ZeroVectorProxy) {
    var e = e.D_K2_GetActorLocation().op_Addition(t.ToUeVector()),
      t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      r = (0, puerts_1.$ref)(void 0),
      e = (UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, e, r, !0), t.ConvertPositionFromViewportToLGUICanvas((0, puerts_1.$unref)(r))),
      t = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
    return t.Set(e.X - t.X / 2, e.Y - t.Y / 2), t.ToUeVector2D()
  }
  static SetTransformByTag(e, t) {
    e.CheckGetComponent(1)?.SetTransformByTag("MonsterCase")
  }
  static SelectDangoActor(e, t) {
    e.Model.CheckGetComponent(30)?.ReplaceSelectMaterial(t)
  }
  static DangoFadeIn(e, t = "RoleFadeInCurve", r) {
    const a = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      e && (t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration"), a?.Fade(1, 0, t, e, r))
    })
  }
  static DangoFadeOut(e, t = "RoleFadeOutCurve", r) {
    const a = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      e && (t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration"), a?.Fade(0, 1, t, e, r))
    })
  }
  static ModelFadeIn(e, t = "RoleFadeInCurve") {
    const r = e.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      e && (t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration"), r?.Fade(1, 0, t, e))
    })
  }
  static ModelFadeOut(e, t = "RoleFadeOutCurve") {
    const r = e.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      e && (t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration"), r?.Fade(0, 1, t, e))
    })
  }
  static SetDitherEffect(e, t) {
    e.CheckGetComponent(0)?.SetDitherEffect(t)
  }
  static GetRoleMorphConfigMap(e, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleMorphConfigList(e, t);
    if (e && 0 !== e.length) {
      var r, a = new Map;
      for (const o of e) 0 !== o.Morph && 0 !== o.UiMeshId && (r = {
        MainMeshPath: ModelUtil_1.ModelUtil.GetModelConfig(o.UiMeshId).网格体.ToAssetPathName(),
        AnimPath: o.UiScenePerformanceABP,
        ChildMeshPathList: this.L61(o.UiMeshId),
        RoleBody: o.RoleBody
      }, a.set(o.Morph, r));
      return 0 < a.size && (e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t)) && (t = e.GetUiMeshId(), t = {
        MainMeshPath: ModelUtil_1.ModelUtil.GetModelConfig(t).网格体.ToAssetPathName(),
        AnimPath: e.GetRoleSkinConfig().UiScenePerformanceABP,
        ChildMeshPathList: this.L61(t),
        RoleBody: e.GetRoleSkinConfig().RoleBody
      }, a.set(0, t)), a
    }
  }
  static L61(e) {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(e).子网格体;
    if (t) {
      var r = t.Num();
      if (0 < r) {
        var a = new Array(r);
        for (let e = 0; e < r; e++) a[e] = t.Get(e).ToAssetPathName();
        return a
      }
    }
  }
  static CheckPathListAndAdd(e, t) {
    if (t && 0 < t.length)
      for (const r of t) StringUtils_1.StringUtils.IsEmpty(r) || e.push(r)
  }
  static PlayRoleMontage(e, t, r = !1, a = !1, o = !1) {
    e.CheckGetComponent(16)?.SetState(t, r, a, o)
  }
}
exports.UiModelUtil = UiModelUtil;
//# sourceMappingURL=UiModelUtil.js.map