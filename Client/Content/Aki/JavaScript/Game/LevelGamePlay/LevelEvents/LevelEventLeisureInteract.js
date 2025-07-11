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
const hardCodePoseId = new Map([[IAction_1.ELeisureInteract.FailurePose, 300002], [IAction_1.ELeisureInteract.GameplayPose1, 300003], [IAction_1.ELeisureInteract.GameplayPose2, 300004], [IAction_1.ELeisureInteract.GameplayPose3, 300005], [IAction_1.ELeisureInteract.WindProtagonistParkour1, 300601], [IAction_1.ELeisureInteract.WindProtagonistParkour2, 300602], [IAction_1.ELeisureInteract.WindProtagonistParkour3, 300603], [IAction_1.ELeisureInteract.WindProtagonistParkour4, 300604], [IAction_1.ELeisureInteract.WindProtagonistParkour5, 300605]]);
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
        var r = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
        var s = r.GetComponent(29);
        var _ = r.GetComponent(193);
        var a = r.GetComponent(59);
        switch (o.Option.Type) {
          case IAction_1.ELeisureInteract.SitDown:
          case IAction_1.ELeisureInteract.SitOnGround:
            var n = this.aic(t, o.SceneEntity);
            if (!n) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 36, " LevelEventLeisureInteract, 尝试坐下时交互实体不存在");
              }
              this.FinishExecute(false);
              return;
            }
            var c = this.Kul(o.Option.Type);
            s.EnterSitDownAction(n, c);
            this.FinishExecute(true);
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
              n = EntitySystem_1.EntitySystem.Get(e);
              s.StartCatapult(n, o.Option);
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
            _.AddTag(1334991742);
            s.PlayCustomCommonSkill(400202);
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.Soar:
            var c = r.GetComponent(40);
            if (this.BaseContext?.Type === 9) {
              _.TagContainer.UpdateExactTag(2, 283451623, -1);
            }
            ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(1015);
            RouletteController_1.RouletteController.ExploreSkillSetRequest(1015);
            c.BeginSkill(SKILL_ID_XA_CHARACTER_DIR, {
              Reason: "LeisureInteract行为触发翱翔"
            });
            if (this.BaseContext?.Type === 9) {
              _.TagContainer.UpdateExactTag(2, 283451623, 1);
            }
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.Soar2:
            n = r.GetComponent(40);
            if (this.BaseContext?.Type === 9) {
              _.TagContainer.UpdateExactTag(2, 283451623, -1);
            }
            RouletteController_1.RouletteController.ExploreSkillSetRequest(1015);
            a?.SwitchCurrentSoarType(1);
            n.BeginSkill(SKILL_ID_XA_CHARACTER_DIR, {
              Reason: "LeisureInteract行为触发遨游"
            });
            if (this.BaseContext?.Type === 9) {
              _.TagContainer.UpdateExactTag(2, 283451623, 1);
            }
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.Glide:
            r.GetComponent(178).TrySetGlide();
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.HookLock:
            if (r.GetComponent(99)?.CanActivateFixHook()) {
              c = _.HasTag(-1958756056) ? SKILL_ID_FIX_HOOK_2 : SKILL_ID_FIX_HOOK_1;
              r.GetComponent(40).BeginSkill(c, {
                Reason: "LeisureInteract行为触发定点钩锁"
              });
              this.FinishExecute(true);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, " LevelEventLeisureInteract, 没有可用定点钩锁");
              }
              this.FinishExecute(false);
            }
            break;
          case IAction_1.ELeisureInteract.KiteHook:
            if (_.HasTag(-1526637662)) {
              r.GetComponent(40).BeginSkill(SKILL_ID_XA_KITE, {
                Reason: "LeisureInteract行为触发风筝钩锁"
              });
              this.FinishExecute(true);
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
            n = r.GetComponent(3);
            tmpRotator.Set(o.Option.Rot.Y ?? 0, o.Option.Rot.Z ?? 0, o.Option.Rot.X ?? 0);
            n.SetActorRotation(tmpRotator.ToUeRotator(), "LeisureInteract行为触发失败姿势", false);
            n.ClearInput();
            r.GetComponent(40).BeginSkill(hardCodePoseId.get(o.Option.Type), {
              Reason: "LeisureInteract行为触发失败姿势"
            });
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.GameplayPose1:
          case IAction_1.ELeisureInteract.GameplayPose2:
          case IAction_1.ELeisureInteract.GameplayPose3:
          case IAction_1.ELeisureInteract.WindProtagonistParkour1:
          case IAction_1.ELeisureInteract.WindProtagonistParkour2:
          case IAction_1.ELeisureInteract.WindProtagonistParkour3:
          case IAction_1.ELeisureInteract.WindProtagonistParkour4:
          case IAction_1.ELeisureInteract.WindProtagonistParkour5:
            s.PlayCustomCommonSkill(hardCodePoseId.get(o.Option.Type));
            this.FinishExecute(true);
            break;
          case IAction_1.ELeisureInteract.FaithJump:
            s.PlayFaithJumpSkill();
            this.FinishExecute(true);
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