"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCharacterMove = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const MAX_EXCUTE_TIME_SEC = 10;
class LevelEventCharacterMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.$Le = undefined;
    this.YLe = false;
    this.JLe = undefined;
    this.zLe = undefined;
    this.ZLe = e => {
      LevelEventCharacterMove.eDe(e, this.$Le, this.YLe, this.zLe, () => {
        this.FinishExecute(true);
      });
    };
  }
  ExecuteNew(e, t, r) {
    if (e) {
      var i = e;
      this.zLe = Vector_1.Vector.Create(i.Pos.X ?? 0, i.Pos.Y ?? 0, i.Pos.Z ?? 0);
      var e = {
        Index: 0,
        Position: this.zLe
      };
      this.JLe = {
        Points: [e],
        Navigation: i.MoveType === IAction_1.ECharacterMoveToPointType.Walk,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Callback: this.IsAsync ? undefined : this.ZLe,
        ReturnFalseWhenNavigationFailed: false,
        ReturnTimeoutFailed: MAX_EXCUTE_TIME_SEC
      };
      switch (i.Target.Type) {
        case "Player":
          if (this.tDe()) {
            break;
          }
          this.FinishExecute(false);
          return;
        case "Target":
          this.$Le = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i.Target.EntityId);
          if (this.iDe()) {
            break;
          }
          this.FinishExecute(false);
          return;
        case "Triggered":
          if (this.oDe(t)) {
            break;
          }
          this.FinishExecute(false);
          return;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 不支持的目标类型");
          }
          this.FinishExecute(false);
          return;
      }
      if (this.IsAsync) {
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 参数不合法");
      }
      this.FinishExecute(false);
    }
  }
  tDe() {
    this.YLe = true;
    this.$Le = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(Global_1.Global.BaseCharacter?.GetEntityNoBlueprint());
    if (!this.$Le?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 找不到玩家目标");
      }
      return false;
    }
    var e = this.$Le.Entity.GetComponent(178);
    if (e.IsMovingToLocation()) {
      e.MoveToLocationEnd(1);
    }
    LevelEventCharacterMove.rDe(false);
    if (this.IsAsync) {
      const t = this.$Le;
      const r = this.zLe;
      this.JLe.Callback = e => {
        LevelEventCharacterMove.eDe(e, t, true, r);
      };
    }
    e.MoveAlongPath(this.JLe);
    return true;
  }
  iDe() {
    if (!this.$Le?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 找不到有效目标实体");
      }
      return false;
    }
    var e = this.$Le.Entity.GetComponent(178);
    if (!this.$Le.Entity.GetComponent(0)?.IsCharacter() || !e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 目标实体非可移动角色");
      }
      return false;
    }
    if (this.$Le.Entity.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
      return this.tDe();
    }
    if (e.IsMovingToLocation()) {
      e.MoveToLocationEnd(1);
    }
    if (this.IsAsync) {
      const t = this.$Le;
      const r = this.zLe;
      this.JLe.Callback = e => {
        LevelEventCharacterMove.eDe(e, t, false, r);
      };
    }
    e.MoveAlongPath(this.JLe);
    return true;
  }
  oDe(e) {
    if (e instanceof LevelGeneralContextDefine_1.TriggerContext && e.OtherEntityId) {
      this.$Le = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.OtherEntityId);
      return this.iDe();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] context数据异常");
      }
      return false;
    }
  }
  static rDe(e) {
    var t;
    var r;
    var i;
    var o;
    var a;
    var n = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (n?.Valid) {
      t = n.GetComponent(175);
      r = n.GetComponent(40);
      i = n.GetComponent(3);
      o = n.GetComponent(62);
      a = n.GetComponent(205);
      n = n.GetComponent(178);
      if (e) {
        n?.StopMove(false);
        n?.ResetMaxSpeed(t?.MoveState);
        i?.ClearInput();
        o?.ClearMoveVectorCache();
        o?.SetActive(true);
        a?.RemoveTag(-1697149502);
        a?.RemoveTag(-541178966);
        a?.RemoveTag(-542518289);
        a?.RemoveTag(-2140742267);
        a?.RemoveTag(-1013832153);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "LevelEventCharacterMove");
        if (t?.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
          t?.ExitAimStatus();
        }
        if (r?.CurrentSkill) {
          r.EndOwnerAndFollowSkills();
        }
        i?.ClearInput();
        o?.ClearMoveVectorCache();
        o?.SetActive(false);
        a?.AddTag(-1697149502);
        a?.AddTag(-541178966);
        a?.AddTag(-542518289);
        a?.AddTag(-2140742267);
        a?.AddTag(-1013832153);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
  }
}
(exports.LevelEventCharacterMove = LevelEventCharacterMove).eDe = (e, t, r, i, o) => {
  if (e !== 1) {
    e = t?.Entity?.GetComponent(3);
    if (r) {
      ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionNoLoading(i.ToUeVector(), e?.ActorRotation, "[LevelEventCharacterMove] 移动失败或超时，传送到目标位置").finally(() => {
        LevelEventCharacterMove.rDe(true);
        o?.();
      });
    } else {
      e?.TeleportAndFindStandLocation(i);
      o?.();
    }
  } else {
    if (r) {
      LevelEventCharacterMove.rDe(true);
    }
    o?.();
  }
};
//# sourceMappingURL=LevelEventCharacterMove.js.map