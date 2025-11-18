"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelUtil = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
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
  static PlayEffectOnRootByPath(e, t) {
    var a = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1)?.MainMeshComponent;
    if (e) {
      a?.PlayEffectOnRoot(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "MainMeshComponent为空");
    }
  }
  static PlayEffectOnRoot(e, t) {
    t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    this.PlayEffectOnRootByPath(e, t);
  }
  static PlayEffectOnRootWithCallback(e, t, a) {
    var r = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1);
    var t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    var e = e?.MainMeshComponent;
    if (e) {
      if (r) {
        r = r.PlayEffectByPath(t, e, CharacterNameDefines_1.CharacterNameDefines.ROOT, true, false, Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVectorDouble, true);
        EffectSystem_1.EffectSystem.AddFinishCallback(r, a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "MainMeshComponent为空");
    }
  }
  static PlayEffectAtRootComponentByPath(e, t) {
    var a = e.CheckGetComponent(4);
    var e = e.CheckGetComponent(1)?.Actor?.RootComponent;
    if (e) {
      a?.PlayEffectOnRoot(t, e, FNameUtil_1.FNameUtil.EMPTY, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Actor为空");
    }
  }
  static PlayEffectAtRootComponent(e, t) {
    t = EffectUtil_1.EffectUtil.GetEffectPath(t);
    this.PlayEffectAtRootComponentByPath(e, t);
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
    var a = (0, puerts_1.$ref)(undefined);
    UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, e, a, true);
    var e = t.ConvertPositionFromViewportToLGUICanvas((0, puerts_1.$unref)(a));
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
  static DangoFadeIn(e, t = "RoleFadeInCurve", a) {
    var e = e.Model.CheckGetComponent(8);
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration");
    e?.Fade(1, 0, r, t, a);
  }
  static DangoFadeOut(e, t = "RoleFadeOutCurve", a) {
    var e = e.Model.CheckGetComponent(8);
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration");
    e?.Fade(0, 1, r, t, a);
  }
  static ModelFadeIn(e, t = "RoleFadeInCurve", a) {
    var r;
    if (e) {
      e = e.CheckGetComponent(8);
      r = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeInDuration");
      e?.Fade(1, 0, r, t, a);
    }
  }
  static ModelFadeOut(e, t = "RoleFadeOutCurve", a) {
    var r;
    if (e) {
      e = e.CheckGetComponent(8);
      r = CommonParamById_1.configCommonParamById.GetIntConfig("RoleFadeOutDuration");
      e?.Fade(0, 1, r, t, a);
    }
  }
  static SetDitherEffect(e, t) {
    e.CheckGetComponent(0)?.SetDitherEffect(t);
  }
  static GetRoleMorphConfigMap(e, t) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleMorphConfigList(e, t);
    if (e && e.length !== 0) {
      var a;
      var r;
      var o = new Map();
      for (const i of e) {
        if (i.Morph !== 0 && i.UiMeshId !== 0) {
          a = {
            MainMeshPath: (a = ModelUtil_1.ModelUtil.GetModelConfig(i.UiMeshId)).网格体.ToAssetPathName(),
            AnimPath: i.UiScenePerformanceABP,
            ChildMeshPathList: this.l51(i.UiMeshId),
            DecorationMeshConfigArray: a.UiModelDecorationArray,
            RoleBody: i.RoleBody
          };
          o.set(i.Morph, a);
        }
      }
      if (o.size > 0 && (e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t))) {
        t = e.GetUiMeshId();
        t = {
          MainMeshPath: (r = ModelUtil_1.ModelUtil.GetModelConfig(t)).网格体.ToAssetPathName(),
          AnimPath: e.GetRoleSkinConfig().UiScenePerformanceABP,
          ChildMeshPathList: this.l51(t),
          RoleBody: e.GetRoleSkinConfig().RoleBody,
          DecorationMeshConfigArray: r.UiModelDecorationArray
        };
        o.set(0, t);
      }
      return o;
    }
  }
  static l51(e) {
    var t = ModelUtil_1.ModelUtil.GetModelConfig(e).子网格体;
    if (t) {
      var a = t.Num();
      if (a > 0) {
        var r = new Array(a);
        for (let e = 0; e < a; e++) {
          r[e] = t.Get(e).ToAssetPathName();
        }
        return r;
      }
    }
  }
  static CheckPathListAndAdd(e, t) {
    if (t && t.length > 0) {
      for (const a of t) {
        if (!StringUtils_1.StringUtils.IsEmpty(a)) {
          e.push(a);
        }
      }
    }
  }
  static PlayRoleMontage(e, t, a = false, r = false, o = false) {
    e.CheckGetComponent(16)?.SetState(t, a, r, o);
  }
}
exports.UiModelUtil = UiModelUtil;
//# sourceMappingURL=UiModelUtil.js.map