"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderUtil = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const CharBodyEffect_1 = require("../Character/Components/Components/CharBodyEffect");
const CharDecalShadow_1 = require("../Character/Components/Components/CharDecalShadow");
const CharDitherEffect_1 = require("../Character/Components/Components/CharDitherEffect");
const CharEnviInteractionEffect_1 = require("../Character/Components/Components/CharEnviInteractionEffect");
const CharGrassInteraction_1 = require("../Character/Components/Components/CharGrassInteraction");
const CharMaterialContainerV2_1 = require("../Character/Components/Components/CharMaterialContainerV2");
const CharMaterialControllerV2_1 = require("../Character/Components/Components/CharMaterialControllerV2");
const CharPropertyModifier_1 = require("../Character/Components/Components/CharPropertyModifier");
const CharSceneInteraction_1 = require("../Character/Components/Components/CharSceneInteraction");
const CharMaterialContainer_1 = require("../Character/Components/MaterialContainer/CharMaterialContainer");
const CharMaterialController_1 = require("../Character/Components/MaterialController/CharMaterialController");
class RenderUtil {
  static GetRenderComps(e, r, a) {
    var t = new Array();
    if (r) {
      t.push(new CharMaterialControllerV2_1.CharMaterialControllerV2());
      t.push(new CharMaterialContainerV2_1.CharMaterialContainerV2());
    } else {
      t.push(new CharMaterialController_1.CharMaterialController());
      t.push(new CharMaterialContainer_1.CharMaterialContainer());
    }
    switch (e) {
      case 0:
      case 1:
        t.push(new CharDitherEffect_1.CharDitherEffect());
        t.push(new CharSceneInteraction_1.CharSceneInteraction());
        t.push(new CharPropertyModifier_1.CharPropertyModifier());
        t.push(new CharBodyEffect_1.CharBodyEffect());
        t.push(new CharDecalShadow_1.CharDecalShadow());
        t.push(new CharGrassInteraction_1.CharGrassInteraction());
        t.push(new CharEnviInteractionEffect_1.CharEnviInteractionEffect());
        break;
      case 3:
        t.push(new CharDitherEffect_1.CharDitherEffect());
        t.push(new CharDecalShadow_1.CharDecalShadow());
        t.push(new CharGrassInteraction_1.CharGrassInteraction());
        break;
      case 2:
        t.push(new CharDitherEffect_1.CharDitherEffect());
        t.push(new CharSceneInteraction_1.CharSceneInteraction());
        t.push(new CharPropertyModifier_1.CharPropertyModifier());
        t.push(new CharDecalShadow_1.CharDecalShadow());
        t.push(new CharGrassInteraction_1.CharGrassInteraction());
        if (a) {
          t.push(new CharBodyEffect_1.CharBodyEffect());
        }
        break;
      case 4:
        t.push(new CharDitherEffect_1.CharDitherEffect());
        t.push(new CharSceneInteraction_1.CharSceneInteraction());
        t.push(new CharDecalShadow_1.CharDecalShadow());
        break;
      case 5:
        t.push(new CharDitherEffect_1.CharDitherEffect());
        break;
      case 6:
        break;
      case 8:
      case 7:
        t.push(new CharDitherEffect_1.CharDitherEffect());
    }
    return t;
  }
  static GetFloat(e, r) {
    return UE.KuroCurveLibrary.GetValue_Float(e, r);
  }
  static GetColor(e, r) {
    return UE.KuroCurveLibrary.GetValue_LinearColor(e, r);
  }
  static GetFloatFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        if (e.StartConstant !== undefined) {
          return e.StartConstant;
        } else {
          return UE.KuroCurveLibrary.GetValue_Float(e.Start, r.Factor);
        }
      case 1:
        if (e.LoopConstant !== undefined) {
          return e.LoopConstant;
        } else {
          return UE.KuroCurveLibrary.GetValue_Float(e.Loop, r.Factor);
        }
      case 2:
        if (e.EndConstant !== undefined) {
          return e.EndConstant;
        } else {
          return UE.KuroCurveLibrary.GetValue_Float(e.End, r.Factor);
        }
      default:
        return e.Loop.Constant;
    }
  }
  static GetColorFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        var a = e.StartConstant;
        if (a !== undefined) {
          return a;
        } else {
          return UE.KuroCurveLibrary.GetValue_LinearColor(e.Start, r.Factor);
        }
      case 1:
        a = e.LoopConstant;
        if (a !== undefined) {
          return a;
        } else {
          return UE.KuroCurveLibrary.GetValue_LinearColor(e.Loop, r.Factor);
        }
      case 2:
        a = e.EndConstant;
        if (a !== undefined) {
          return a;
        } else {
          return UE.KuroCurveLibrary.GetValue_LinearColor(e.End, r.Factor);
        }
      default:
        return e.Loop.Constant;
    }
  }
  static GetTextureFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        return e.Start;
      case 1:
        return e.Loop;
      case 2:
        return e.End;
      default:
        return;
    }
  }
  static Lerp(e, r, a) {
    return e + a * (r - e);
  }
  static Max(e, r) {
    if (r < e) {
      return e;
    } else {
      return r;
    }
  }
  static Min(e, r) {
    if (e < r) {
      return e;
    } else {
      return r;
    }
  }
  static Clamp(e, r, a) {
    let t = a <= e ? a : e <= r ? r : e;
    return t;
  }
  static LerpVector(e, r, a, t) {
    a = this.Clamp(a, 0, 1);
    t[0] = this.Lerp(e.X, r.X, a);
    t[1] = this.Lerp(e.Y, r.Y, a);
    t[2] = this.Lerp(e.Z, r.Z, a);
  }
  static StringIsNullOrEmpty(e) {
    return e.length === 0;
  }
  static GetSelectedChannel(e) {
    switch (e) {
      case 0:
        return new UE.LinearColor(-1, 0, 0, 0);
      case 1:
        return new UE.LinearColor(1, 0, 0, 0);
      case 2:
        return new UE.LinearColor(0, 1, 0, 0);
      case 3:
        return new UE.LinearColor(0, 0, 1, 0);
      case 4:
        return new UE.LinearColor(0, 0, 0, 1);
      default:
        return new UE.LinearColor(0, 0, 0, 0);
    }
  }
  static OpenToonSceneShadow() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.ToonSceneShadowIntensity 1");
    }
  }
  static CloseToonSceneShadow() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.ToonSceneShadowIntensity 0");
    }
  }
  static OpenMobileSpotLightShadow() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.EnableKuroSpotlightsShadow 1");
    }
  }
  static CloseMobileSpotLightShadow() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.EnableKuroSpotlightsShadow 0");
    }
  }
  static CloseVelocityScreenSizeCull() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.VelocityScreenSizeCull 0");
    }
  }
  static EnableVelocityScreenSizeCull() {
    if (GlobalData_1.GlobalData.World) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.VelocityScreenSizeCull 0.01");
    }
  }
  static BeginPSOSyncMode() {
    if (GlobalData_1.GlobalData.World) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderUtil", 46, "Begin pso sync mode");
      }
      RenderUtil.Sel = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.PSO.CompilationMode");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.PSO.CompilationMode 1");
      if (Info_1.Info.PlatformType === 2) {
        RenderUtil.d6c = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.OpenGL.ProgramBinarySyncCreate");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.OpenGL.ProgramBinarySyncCreate 1");
      } else if (Info_1.Info.PlatformType === 3) {
        RenderUtil.yh_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.DX11AsyncCompileShader");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DX11AsyncCompileShader 1");
      }
    }
  }
  static EndPSOSyncMode() {
    if (GlobalData_1.GlobalData.World) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderUtil", 46, "End pso sync mode");
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.PSO.CompilationMode " + RenderUtil.Sel);
      if (Info_1.Info.PlatformType === 2) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.OpenGL.ProgramBinarySyncCreate " + RenderUtil.d6c);
      } else if (Info_1.Info.PlatformType === 3) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DX11AsyncCompileShader " + RenderUtil.yh_);
      }
    }
  }
  static SetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 1");
  }
  static UnsetNeedRenderKuroToonDepth() {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.NeedRenderKuroToonDepth 0");
  }
}
(exports.RenderUtil = RenderUtil).Sel = 0;
RenderUtil.d6c = 0;
RenderUtil.yh_ = 0; //# sourceMappingURL=RenderUtil.js.map