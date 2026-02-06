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
const ResponsibilityChain_1 = require("../../../../../../Utils/ResponsibilityChain/ResponsibilityChain");
const VehicleController_1 = require("../../../../../Vehicle/Controller/VehicleController");
const CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes");
const FollowUtils_1 = require("../../Abilities/Follow/FollowUtils");
const SpecialSkillAimisi_1 = require("../../Skill/SpecialSkill/SpecialSkillAimisi");
const InputDefine_1 = require("./InputDefine");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
class InputFunctionContext {
  constructor(e, n) {
    this.Entity = e;
    this.SkillId = n;
  }
  IsValid() {
    return this.Entity.Valid;
  }
}
class DisableHandler extends ResponsibilityChain_1.AbstractHandler {
  CanHandle(e) {
    return true;
  }
  ExecuteProcessing(e) {}
  ExecuteStopping(e) {}
}
class MotorFunctionDisableHandler extends DisableHandler {
  ShouldStop(e) {
    return !VehicleController_1.VehicleController.CheckMotorAllowed();
  }
}
class CharacterResponseInputDisableHandler extends DisableHandler {
  ShouldStop(e) {
    return !(0, InputFunctionCommon_1.canCharacterResponseInput)();
  }
}
class PositionStateDisableHandler extends DisableHandler {
  ShouldStop(e) {
    var n = e.Entity.GetComponent(111)?.PositionState;
    switch (e.SkillId) {
      case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE:
      case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE_AUTOPILOT:
        return n !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground && n !== CharacterUnifiedStateTypes_1.ECharPositionState.Air;
      case InputDefine_1.SKILL_ID_SUMMON_PARK_MOTOCYCLE:
        return n !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      default:
        return false;
    }
  }
}
class TagDisableHandler extends DisableHandler {
  ShouldStop(e) {
    var n = e.Entity.GetComponent(217);
    if (n) {
      switch (e.SkillId) {
        case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE:
          return n.HasAnyTag(TagDisableHandler.Upg);
        case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE_AUTOPILOT:
          return n.HasTag(1996802261);
        case InputDefine_1.SKILL_ID_SUMMON_PARK_MOTOCYCLE:
          return n.HasAnyTag(TagDisableHandler.Akg);
      }
    }
    return false;
  }
}
TagDisableHandler.Upg = [1996802261, 229891237];
TagDisableHandler.Akg = [...TagDisableHandler.Upg, -1178928415, 283451623, -2112257652, 1950824539, 1949638808];
class EntityDisableHandler extends DisableHandler {
  ShouldStop(e) {
    var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var i = FollowUtils_1.FollowUtils.GetPlayerFollowVehicle(n, "Motorcycle")?.Entity?.GetComponent(265);
    switch (e.SkillId) {
      case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE:
      case InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE_AUTOPILOT:
        return !e.Entity.Id || !i || i.GetMotorcycleSummonTrans(e.Entity.Id) === undefined;
      case InputDefine_1.SKILL_ID_SUMMON_PARK_MOTOCYCLE:
        return !e.Entity.Id || !i;
      default:
        return false;
    }
  }
}
class OnlineDisableHandler extends DisableHandler {
  ShouldStop(e) {
    return e.SkillId === InputDefine_1.SKILL_ID_SUMMON_PARK_MOTOCYCLE && ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }
}
const motorcycleDisableChain = new MotorFunctionDisableHandler();
motorcycleDisableChain.SetNext(new CharacterResponseInputDisableHandler()).SetNext(new PositionStateDisableHandler()).SetNext(new TagDisableHandler()).SetNext(new EntityDisableHandler()).SetNext(new OnlineDisableHandler());
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
  var n = Global_1.Global.BaseCharacter;
  if (n) {
    var i = n.CharacterActorComponent?.Entity;
    if (i) {
      var r = i.GetComponent(217);
      if (r && r.Valid && i.GetComponent(48)?.CanResponseInput() && !r.HasTag(-2100129479)) {
        var t = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(i.Id, 7, 1);
        if (t) {
          return t;
        }
        if (r.HasTag(-376090703)) {
          if (i.GetComponent(189)?.IsOnGroundOrOnWater()) {
            return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_YUANNIAOZE_TORNADO);
          }
        } else {
          if (r.HasTag(-1652473093)) {
            if (r.HasTag(2081853303)) {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION_STOP);
            } else {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_CHENGXIAOSHAN_TIMEDILATION);
            }
          }
          if (r.HasTag(-648597304)) {
            if (isFollowerDisable(r)) {
              return undefined;
            } else {
              return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START);
            }
          }
        }
        t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        if (t) {
          let e = 0;
          var l = PhantomUtil_1.PhantomUtil.GetVisionData(t);
          if ((e = l && l.类型 === 2 ? l.技能ID : e) === InputDefine_1.SKILL_ID_HOOK) {
            var l = n.CharacterActorComponent.CreatureData.GetPbDataId();
            if (ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(l) === ROLE_ID_CALBRENA && r.HasTag(-869438579)) {
              e = InputDefine_1.SKILL_ID_FLYING_FEATHER;
            } else if (r.HasTag(-1526637662)) {
              e = InputDefine_1.SKILL_ID_XA_KITE;
            } else if (r.HasTag(-1771378495)) {
              e = InputDefine_1.SKILL_ID_XA_MOVABLE;
            } else if (i.GetComponent(107)?.CanActivateFixHook()) {
              e = r.HasTag(-1958756056) ? InputDefine_1.SKILL_ID_FIX_HOOK_2 : InputDefine_1.SKILL_ID_FIX_HOOK_1;
            } else {
              if (r.HasTag(-1009010563)) {
                return;
              }
              if (r.HasTag(-1002623896)) {
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreToolsDisable011007");
                return;
              }
              if (r.HasTag(-833935142)) {
                return;
              }
            }
          } else if (e === InputDefine_1.SKILL_ID_SHOW_VISION_ENTRY) {
            if (r.HasAnyTag([40422668, 855966206, 504239013, 761126017, -1281364710])) {
              return;
            }
          } else if (e === InputDefine_1.SKILL_ID_MANIPULATE) {
            if (r.HasTag(-611134292)) {
              e = InputDefine_1.SKILL_ID_MANIPULATE_EX;
            } else if (r.HasTag(-2047045017)) {
              e = InputDefine_1.SKILL_ID_STATUE_INTERACT;
            } else if (r.HasTag(504239013) || !r.HasTag(1193763416)) {
              return;
            }
          } else if (e === InputDefine_1.SKILL_ID_FOLLOWSHOOTER_AIM_START) {
            if (!r.HasTag(-405107291)) {
              if (r.HasTag(-1488322179) || r.HasTag(-1036349300)) {
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreToolsShooterDisable");
                return;
              }
              if (isFollowerDisable(r)) {
                return;
              }
            }
          } else if (e === InputDefine_1.SKILL_ID_XA) {
            if (r.HasTag(-143158229)) {
              return;
            }
            if (r.HasTag(-2027866845)) {
              n.KuroSetMovementMode({
                Mode: 3,
                Context: "[visionSkill1Function]"
              });
              return;
            }
            l = i.GetComponent(64)?.CheckSoarAllowed();
            if (!l?.[0]) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Input", 39, "Soar not allowed", ["Reason", l?.[1]]);
              }
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
              return;
            }
            if (r.HasTag(1996802261)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
              return;
            }
            n = i.GetComponent(111)?.PositionState;
            if (n === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
              l = i.GetComponent(48)?.GetHeightAboveGround(SOAR_HEIGHT_LIMIT);
              if ((!l || l < SOAR_HEIGHT_LIMIT) && visionSkill1TraceDetectHasGround(i)) {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip");
                return;
              }
            } else {
              if (n !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
                return;
              }
              e = InputDefine_1.SKILL_ID_XA_GROUND;
            }
          } else if (e === InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE || e === InputDefine_1.SKILL_ID_SUMMON_PARK_MOTOCYCLE || e === InputDefine_1.SKILL_ID_SUMMON_MOTOCYCLE_AUTOPILOT) {
            if (motorcycleDisableChain.Stop(new InputFunctionContext(i, e))) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
              return;
            }
          } else if (t === SpecialSkillAimisi_1.AIMISI_MORPH_EXPLORE_SKILL_ID && (!r.HasTag(225676701) || r.HasTag(1175208527))) {
            return;
          }
          if (e !== 0) {
            if (ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(e)) {
              l = i?.GetComponent(58);
              ModelManager_1.ModelManager.RouletteModel.TrySendExploreToolGeneralUseLogData(t, e, l?.FocusTarget?.EntityConfigId);
              return (0, InputFunctionCommon_1.createSkillCommand)(i, e);
            }
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ExploreTeleporterBan");
          }
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