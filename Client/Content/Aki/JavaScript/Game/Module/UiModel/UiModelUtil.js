"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const UiLayer_1 = require("../../Ui/UiLayer");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const WorldMapUtil_1 = require("../WorldMap/WorldMapUtil");
class UiModelUtil {
  static PlayEffectOnRoot(e, t) {
    var r = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.MainMeshComponent;
    if (e) {
      r?.PlayEffectOnRoot(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "MainMeshComponent为空");
    }
  }
  static PlayEffectOnRootWithCallback(e, t, r) {
    var a = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.MainMeshComponent;
    if (e) {
      if (a) {
        a = a.PlayEffectByPath(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, true, false, Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVectorDouble, true);
        EffectSystem_1.EffectSystem.AddFinishCallback(a, r);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "MainMeshComponent为空");
    }
  }
  static PlayEffectAtRootComponent(e, t) {
    var r = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.Actor?.RootComponent;
    if (e) {
      r?.PlayEffectOnRoot(t, e, FNameUtil_1.FNameUtil.EMPTY, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Actor为空");
    }
  }
  static SetRenderingMaterial(e, t) {
    return e.CheckGetComponent(5)?.SetRenderingMaterial(t) ?? 0;
  }
  static RemoveRenderingMaterial(e, t) {
    e.CheckGetComponent(5)?.RemoveRenderingMaterial(t);
  }
  static SetVisible(e, t) {
    return e.CheckGetComponent(0)?.SetVisible(t) ?? false;
  }
  static GetActorLguiPos(e, t = Vector_1.Vector.ZeroVectorProxy) {
    var e = e.D_K2_GetActorLocation().op_Addition(t.ToUeVector());
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    var r = (0, puerts_1.$ref)(undefined);
    UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, e, r, true);
    var e = t.ConvertPositionFromViewportToLGUICanvas((0, puerts_1.$unref)(r));
    var t = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
    t.Set(e.X - t.X / 2, e.Y - t.Y / 2);
    return t.ToUeVector2D();
  }
  static SetTransformByTag(e, t) {
    e.CheckGetComponent(1)?.SetTransformByTag("MonsterCase");
  }
  static SelectDangoActor(e, t) {
    e.Model.CheckGetComponent(30)?.ReplaceSelectMaterial(t);
  }
  static DangoFadeIn(e, t = "RoleFadeInCurve", r) {
    const a = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      if (e) {
        t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration");
        a?.Fade(1, 0, t, e, r);
      }
    });
  }
  static DangoFadeOut(e, t = "RoleFadeOutCurve", r) {
    const a = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      if (e) {
        t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration");
        a?.Fade(0, 1, t, e, r);
      }
    });
  }
  static ModelFadeIn(e, t = "RoleFadeInCurve") {
    const r = e.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      if (e) {
        t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration");
        r?.Fade(1, 0, t, e);
      }
    });
  }
  static ModelFadeOut(e, t = "RoleFadeOutCurve") {
    const r = e.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      var t;
      if (e) {
        t = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration");
        r?.Fade(0, 1, t, e);
      }
    });
  }
  static SetDitherEffect(e, t) {
    e.CheckGetComponent(0)?.SetDitherEffect(t);
  }
  static GetRoleMorphConfigMap(e, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleMorphConfigList(e, t);
    if (e && e.length !== 0) {
      var r;
      var a = new Map();
      for (const o of e) {
        if (o.Morph !== 0 && o.UiMeshId !== 0) {
          r = {
            MainMeshPath: ModelUtil_1.ModelUtil.GetModelConfig(o.UiMeshId).网格体.ToAssetPathName(),
            AnimPath: o.UiScenePerformanceABP,
            ChildMeshPathList: this.l51(o.UiMeshId),
            RoleBody: o.RoleBody
          };
          a.set(o.Morph, r);
        }
      }
      if (a.size > 0 && (e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t))) {
        t = e.GetUiMeshId();
        t = {
          MainMeshPath: ModelUtil_1.ModelUtil.GetModelConfig(t).网格体.ToAssetPathName(),
          AnimPath: e.GetRoleSkinConfig().UiScenePerformanceABP,
          ChildMeshPathList: this.l51(t),
          RoleBody: e.GetRoleSkinConfig().RoleBody
        };
        a.set(0, t);
      }
      return a;
    }
  }
  static l51(e) {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(e).子网格体;
    if (t) {
      var r = t.Num();
      if (r > 0) {
        var a = new Array(r);
        for (let e = 0; e < r; e++) {
          a[e] = t.Get(e).ToAssetPathName();
        }
        return a;
      }
    }
  }
  static CheckPathListAndAdd(e, t) {
    if (t && t.length > 0) {
      for (const r of t) {
        if (!StringUtils_1.StringUtils.IsEmpty(r)) {
          e.push(r);
        }
      }
    }
  }
  static PlayRoleMontage(e, t, r = false, a = false, o = false) {
    e.CheckGetComponent(16)?.SetState(t, r, a, o);
  }
}
exports.UiModelUtil = UiModelUtil;
//# sourceMappingURL=UiModelUtil.js.map