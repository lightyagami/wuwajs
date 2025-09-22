"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisionSkill1SkillId = exports.visionSkill1OnRelease = exports.visionSkill1OnPress = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../../../../../Global");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiBlueprintFunctionLibrary_1 = require("../../../../../../Module/BpBridge/UiBlueprintFunctionLibrary");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const ScrollingTipsController_1 = require("../../../../../../Module/ScrollingTips/ScrollingTipsController");
const WorldFunctionLibrary_1 = require("../../../../../../World/Bridge/WorldFunctionLibrary");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes");
const InputDefine_1 = require("./InputDefine");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
const SOAR_HEIGHT_LIMIT = 650;
const soarLandDetectOffset = new UE.VectorDouble(1100, 0, -500);
const ROLE_ID_CALBRENA = 1208;
const PROFILE_KEY = "SoarEnterDetect";
const tmpVector = Vector_1.Vector.Create();
function visionSkill1TraceDetectHasGround(e) {
  var n;
  var e = e.GetComponent(3);
  return !!e && ((n = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject = e.Actor, n.Radius = e.ScaledRadius, TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, e.FloorLocation), tmpVector.FromUeVector(e.ActorTransform.TransformVectorNoScale(soarLandDetectOffset)), tmpVector.AdditionEqual(e.FloorLocation), TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, tmpVector), n.ActorsToIgnore.Empty(), TraceElementCommon_1.TraceElementCommon.ShapeTrace(e.Actor.CapsuleComponent, n, PROFILE_KEY, PROFILE_KEY));
}
function isFollowerDisable(e) {
  return e.HasAnyTag([1637209445, 1769145221, 525585922, -307714774, 1996624497, -1503953470]);
}
function visionSkill1Function(e) {
  var r = Global_1.Global.BaseCharacter;
  if (r) {
    var i = r.CharacterActorComponent?.Entity;
    if (i) {
      var o = i.GetComponent(206);
      if (o && o.Valid && i.GetComponent(45)?.CanResponseInput() && !o.HasTag(-2100129479)) {
        var t = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(i.Id, 7, 1);
        if (t) {
          return t;
        }
        if (o.HasTag(-376090703)) {
          if (i.GetComponent(179)?.IsOnGroundOrOnWater()) {
            return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_YUANNIAOZE_TORNADO);
          }
        } else {
          if (o.HasTag(-1652473093)) {
            if (o.HasTag(2081853303)) {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION_STOP);
            } else {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION);
            }
          }
          if (o.HasTag(-648597304)) {
            if (isFollowerDisable(o)) {
              return undefined;
            } else {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START);
            }
          }
        }
        let n = 0;
        var l = i.GetComponent(43)?.GetVisionIdList();
        if (l) {
          for (let e = 0; e < l.Num(); e++) {
            var u = PhantomUtil_1.PhantomUtil.GetVisionData(l.Get(e));
            if (u) {
              if (u.类型 === 2) {
                n = u.技能ID;
              } else {
                BlackboardController_1.BlackboardController.SetIntValueByEntity(i.Id, "VisionID", u.Id);
              }
            }
          }
        }
        if (n === InputDefine_1.SKILL_ID_HOOK) {
          t = r.CharacterActorComponent.CreatureData.GetPbDataId();
          if (ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t) === ROLE_ID_CALBRENA && o.HasTag(-869438579)) {
            n = InputDefine_1.SKILL_ID_FLYING_FEATHER;
          } else if (o.HasTag(-1526637662)) {
            n = InputDefine_1.SKILL_ID_XA_KITE;
          } else if (o.HasTag(-1771378495)) {
            n = InputDefine_1.SKILL_ID_XA_MOVABLE;
          } else if (i.GetComponent(100)?.CanActivateFixHook()) {
            n = o.HasTag(-1958756056) ? InputDefine_1.SKILL_ID_FIX_HOOK_2 : InputDefine_1.SKILL_ID_FIX_HOOK_1;
          } else {
            if (o.HasTag(-1009010563)) {
              return;
            }
            if (o.HasTag(-1002623896)) {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreToolsDisable011007");
              return;
            }
            if (o.HasTag(-833935142)) {
              return;
            }
          }
        } else if (n === InputDefine_1.SKILL_ID_SHOW_VISION) {
          t = WorldFunctionLibrary_1.default.GetVisionEntityId(i.Id);
          if (t === 0 || WorldFunctionLibrary_1.default.GetEntityEnable(t)) {
            return;
          }
          if (o.HasAnyTag([40422668, 855966206, 504239013, 761126017])) {
            return;
          }
        } else if (n === InputDefine_1.SKILL_ID_MANIPULATE) {
          if (o.HasTag(-611134292)) {
            n = InputDefine_1.SKILL_ID_MANIPULATE_EX;
          } else if (o.HasTag(-2047045017)) {
            n = InputDefine_1.SKILL_ID_STATUE_INTERACT;
          } else if (o.HasTag(504239013) || !o.HasTag(1193763416)) {
            return;
          }
        } else if (n === InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START) {
          if (!o.HasTag(-405107291)) {
            if (o.HasTag(-1488322179) || o.HasTag(-1036349300)) {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreToolsShooterDisable");
              return;
            }
            if (isFollowerDisable(o)) {
              return;
            }
          }
        } else if (n === InputDefine_1.SKILL_ID_XA) {
          if (o.HasTag(-143158229)) {
            return;
          }
          if (o.HasTag(-2027866845)) {
            r.KuroSetMovementMode({
              Mode: 3,
              Context: "[visionSkill1Function]"
            });
            return;
          }
          t = i.GetComponent(59)?.CheckSoarAllowed();
          if (!t?.[0]) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Input", 39, "Soar not allowed", ["Reason", t?.[1]]);
            }
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
            return;
          }
          if (o.HasTag(1996802261)) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
            return;
          }
          r = i.GetComponent(102)?.PositionState;
          if (r === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
            t = i.GetComponent(45)?.GetHeightAboveGround(SOAR_HEIGHT_LIMIT);
            if ((!t || t < SOAR_HEIGHT_LIMIT) && visionSkill1TraceDetectHasGround(i)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip");
              return;
            }
          } else {
            if (r !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
              return;
            }
            n = InputDefine_1.SKILL_ID_XA_GROUND;
          }
        }
        if (n !== 0) {
          if (ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(n)) {
            return (0, InputFunctionCommon_1.createSkillCommand)(i, n);
          }
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreTeleporterBan");
        }
      }
    }
  }
}
function visionSkill1OnPress(e) {
  if (!Info_1.Info.IsInTouch()) {
    return visionSkill1Function(e);
  }
}
function visionSkill1OnRelease(e) {
  if (Info_1.Info.IsInTouch() && !UiBlueprintFunctionLibrary_1.default.IsLongPressExploreButton()) {
    return visionSkill1Function(e);
  }
}
function getVisionSkill1SkillId() {
  var e = visionSkill1Function(0);
  if (e) {
    return e.IntValue;
  }
}
exports.visionSkill1OnPress = visionSkill1OnPress;
exports.visionSkill1OnRelease = visionSkill1OnRelease;
exports.getVisionSkill1SkillId = getVisionSkill1SkillId; //# sourceMappingURL=InputFunctionVisionSkill1.js.map