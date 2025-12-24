"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventLeisureInteract = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const RouletteController_1 = require("../../Module/Roulette/RouletteController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const SKILL_ID_FIX_HOOK_1 = 100020;
const SKILL_ID_FIX_HOOK_2 = 100021;
const SKILL_ID_XA_KITE = 210130;
const SKILL_ID_XA_CHARACTER_DIR = 210330;
const hardCodePoseId = new Map([[IAction_1.ELeisureInteract.FailurePose, 300002], [IAction_1.ELeisureInteract.GameplayPose1, 300003], [IAction_1.ELeisureInteract.GameplayPose2, 300004], [IAction_1.ELeisureInteract.GameplayPose3, 300005], [IAction_1.ELeisureInteract.WindProtagonistParkour1, 300601], [IAction_1.ELeisureInteract.WindProtagonistParkour2, 300602], [IAction_1.ELeisureInteract.WindProtagonistParkour3, 300603], [IAction_1.ELeisureInteract.WindProtagonistParkour4, 300604], [IAction_1.ELeisureInteract.WindProtagonistParkour5, 300605], [IAction_1.ELeisureInteract.PainCoveringHead, 700104], [IAction_1.ELeisureInteract.QiuyuanLongPressQinggong, 1411907], [IAction_1.ELeisureInteract.QiuyuanQinggongEnd, 1411908], [IAction_1.ELeisureInteract.QiuyuanQinggongExploration1, 1411909], [IAction_1.ELeisureInteract.QiuyuanQinggongExploration2, 1411910], [IAction_1.ELeisureInteract.QiuyuanQinggongStraight, 1411911], [IAction_1.ELeisureInteract.QiuyuanQinggongHovering, 1411912], [IAction_1.ELeisureInteract.QiuyuanQinggongExploration3, 1411917], [IAction_1.ELeisureInteract.QiuyuanQinggongExploration4, 1411918], [IAction_1.ELeisureInteract.MoneHackingDoor, 1209501], [IAction_1.ELeisureInteract.SunPalaceInteract, 800004]]);
const tmpRotator = Rotator_1.Rotator.Create();
class LevelEventLeisureInteract extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.QYs = undefined;
    this.IXi = undefined;
    this.KYs = 0;
  }
  ExecuteNew(e, t, i) {
    var o = e;
    if (o) {
      if (Global_1.Global.BaseCharacter) {
        var n = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
        var s = n.GetComponent(29);
        const I = n.GetComponent(203);
        var c = n.GetComponent(62);
        switch (o.Option.Type) {
          case IAction_1.ELeisureInteract.SitDown:
          case IAction_1.ELeisureInteract.SitOnGround:
            {
              let e = false;
              if (o.Option.Type === IAction_1.ELeisureInteract.SitDown && o.Option?.OnlyAllowForwardStandUp) {
                e = true;
              }
              var _ = this.aic(t, o.SceneEntity);
              if (!_) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 36, " LevelEventLeisureInteract, 尝试坐下时交互实体不存在");
                }
                this.FinishExecute(false);
                return;
              }
              var r = this.Kul(o.Option.Type);
              s.EnterSitDownAction(_, r, e);
              this.FinishExecute(true);
            }
            break;
          case IAction_1.ELeisureInteract.Manipulate:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 31, "[LevelEventLeisureInteract]控物动作已废弃");
            }
            break;
          case IAction_1.ELeisureInteract.Catapult:
          case IAction_1.ELeisureInteract.SuperCatapult:
            {
              let e = 0;
              switch (t.Type) {
                case 5:
                  e = t.TriggerEntityId;
                  break;
                case 1:
                  e = t.EntityId;
              }
              _ = EntitySystem_1.EntitySystem.Get(e);
              s.StartCatapult(_, o.Option);
              this.FinishExecute(true);
            }
            break;
          case IAction_1.ELeisureInteract.Bounce:
            s.StartBounce(o.Option);
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.StandControl:
            s.PlayCustomCommonSkill(400202);
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.StandControl2:
            I.AddTag(1334991742);
            s.PlayCustomCommonSkill(400202);
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.Soar:
            var r = n.GetComponent(41);
            if (this.BaseContext?.Type === 9) {
              I.TagContainer.UpdateExactTag(2, 283451623, -1);
            }
            ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1015, 0, "LeisureInteract行为触发翱翔");
            RouletteController_1.RouletteController.ExploreSkillSetRequest(1015);
            r.BeginSkillAsync(SKILL_ID_XA_CHARACTER_DIR, {
              Reason: "LeisureInteract行为触发翱翔"
            }).then(() => {
              if (this.BaseContext?.Type === 9) {
                I.TagContainer.UpdateExactTag(2, 283451623, 1);
              }
              this.FinishExecute(true);
            });
            break;
          case IAction_1.ELeisureInteract.Soar2:
            _ = n.GetComponent(41);
            if (this.BaseContext?.Type === 9) {
              I.TagContainer.UpdateExactTag(2, 283451623, -1);
            }
            RouletteController_1.RouletteController.ExploreSkillSetRequest(1015);
            c?.SwitchCurrentSoarType(1);
            _.BeginSkillAsync(SKILL_ID_XA_CHARACTER_DIR, {
              Reason: "LeisureInteract行为触发遨游"
            }).then(() => {
              if (this.BaseContext?.Type === 9) {
                I.TagContainer.UpdateExactTag(2, 283451623, 1);
              }
              this.FinishExecute(true);
            });
            break;
          case IAction_1.ELeisureInteract.Glide:
            n.GetComponent(187).TrySetGlide();
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.HookLock:
            if (n.GetComponent(105)?.CanActivateFixHook()) {
              r = I.HasTag(-1958756056) ? SKILL_ID_FIX_HOOK_2 : SKILL_ID_FIX_HOOK_1;
              n.GetComponent(41).BeginSkillAsync(r, {
                Reason: "LeisureInteract行为触发定点钩锁"
              }).then(() => {
                this.FinishExecute(true);
              });
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 没有可用定点钩锁");
              }
              this.FinishExecute(false);
            }
            break;
          case IAction_1.ELeisureInteract.KiteHook:
            if (I.HasTag(-1526637662)) {
              n.GetComponent(41).BeginSkillAsync(SKILL_ID_XA_KITE, {
                Reason: "LeisureInteract行为触发风筝钩锁"
              }).then(() => {
                this.FinishExecute(true);
              });
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 没有可用风筝钩索点");
              }
              this.FinishExecute(false);
            }
            break;
          case IAction_1.ELeisureInteract.GetUp:
            if (s.IsSitDown) {
              s.PreLeaveSitDownAction();
            }
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.FailurePose:
            _ = n.GetComponent(3);
            tmpRotator.Set(o.Option.Rot.Y ?? 0, o.Option.Rot.Z ?? 0, o.Option.Rot.X ?? 0);
            _.SetActorRotation(tmpRotator.ToUeRotator(), "LeisureInteract行为触发失败姿势", false);
            _.ClearInput();
            n.GetComponent(41).BeginSkillAsync(hardCodePoseId.get(o.Option.Type), {
              Reason: "LeisureInteract行为触发失败姿势"
            }).then(() => {
              this.FinishExecute(true);
            });
            break;
          case IAction_1.ELeisureInteract.GameplayPose1:
          case IAction_1.ELeisureInteract.GameplayPose2:
          case IAction_1.ELeisureInteract.GameplayPose3:
          case IAction_1.ELeisureInteract.WindProtagonistParkour1:
          case IAction_1.ELeisureInteract.WindProtagonistParkour2:
          case IAction_1.ELeisureInteract.WindProtagonistParkour3:
          case IAction_1.ELeisureInteract.WindProtagonistParkour4:
          case IAction_1.ELeisureInteract.WindProtagonistParkour5:
          case IAction_1.ELeisureInteract.PainCoveringHead:
          case IAction_1.ELeisureInteract.QiuyuanLongPressQinggong:
          case IAction_1.ELeisureInteract.QiuyuanQinggongEnd:
          case IAction_1.ELeisureInteract.QiuyuanQinggongExploration1:
          case IAction_1.ELeisureInteract.QiuyuanQinggongExploration2:
          case IAction_1.ELeisureInteract.QiuyuanQinggongStraight:
          case IAction_1.ELeisureInteract.QiuyuanQinggongHovering:
          case IAction_1.ELeisureInteract.QiuyuanQinggongExploration3:
          case IAction_1.ELeisureInteract.QiuyuanQinggongExploration4:
          case IAction_1.ELeisureInteract.MoneHackingDoor:
          case IAction_1.ELeisureInteract.SunPalaceInteract:
            s.PlayCustomCommonSkill(hardCodePoseId.get(o.Option.Type));
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.FaithJump:
            s.PlayFaithJumpSkill();
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.Swing:
            n.GetComponent(325)?.StartRoleSwing(o.Option.SwingDa, o.Option.EntityId);
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.SwingGetUp:
            n?.GetComponent(325)?.ExitLoopSwing();
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.MotorEnterSlide:
            var a;
            var r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o.Option.EntityId)?.Entity?.GetComponent(337);
            if (r) {
              if ((_ = n.GetComponent(242)) && _.IsOnVehicle && _.IsDriver && _.IsVehicleType("Motorcycle")) {
                if (a = _?.VehicleEntity?.GetComponent(336)) {
                  if (a.IsInNotAllowedSkill()) {
                    _?.VehicleEntity?.GetComponent(42)?.StopGroup1Skill("LeisureInteract上滑轨，停止当前技能");
                  }
                  if (o.Option.EnterMode === IAction_1.EMotorEnterSlideMode.Direct) {
                    a.TryDirectlyEnterSpecifiedRail(r);
                  } else {
                    a.TryJumpToSpecifiedRail(r);
                  }
                  this.FinishExecute(true);
                } else {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 无法进入滑轨，缺少摩托样条移动组件");
                  }
                  this.FinishExecute(false);
                }
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 无法进入滑轨");
                }
                this.FinishExecute(false);
              }
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 没有可用滑轨");
              }
              this.FinishExecute(false);
            }
        }
        this.QYs = undefined;
        this.IXi = undefined;
        this.KYs = 0;
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 36, " LevelEventLeisureInteract, 尝试执行时主角未创建");
        }
        this.QYs = e;
        this.IXi = t;
        this.KYs = i;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 57, " LevelEventLeisureInteract, 坐下参数为空");
    }
  }
  OnTick(e) {
    if (Global_1.Global.BaseCharacter && this.QYs && this.IXi) {
      this.ExecuteNew(this.QYs, this.IXi, this.KYs);
    }
  }
  Kul(e) {
    switch (e) {
      case IAction_1.ELeisureInteract.SitDown:
        return 1;
      case IAction_1.ELeisureInteract.SitOnGround:
        return 2;
    }
    return 0;
  }
  aic(e, t) {
    if (t) {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t)?.Entity;
    } else if (e.Type === 1) {
      return EntitySystem_1.EntitySystem.Get(e.EntityId);
    } else {
      return undefined;
    }
  }
}
exports.LevelEventLeisureInteract = LevelEventLeisureInteract;
//# sourceMappingURL=LevelEventLeisureInteract.js.map