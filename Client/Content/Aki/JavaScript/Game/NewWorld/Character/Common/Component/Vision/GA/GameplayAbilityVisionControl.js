"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionControl = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const SceneTeamData_1 = require("../../../../../../Module/SceneTeam/SceneTeamData");
const CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionControl extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments);
    this.wZo = undefined;
    this.BZo = undefined;
    this.kQo = 0;
    this.ota = undefined;
    this._yo = (i, t, e) => {
      if (t < Number.EPSILON) {
        this.TeamComponent?.SetTeamTag(1);
        if (this.GameplayTagComponent.HasTag(GameplayAbilityVisionMisc_1.skillTag)) {
          this.wZo ||= this.GameplayTagComponent.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.skillTag, (i, t) => {
            if (!t) {
              this.wZo?.EndTask();
              this.wZo = undefined;
              this.bZo();
            }
          });
        } else {
          this.bZo();
        }
      }
    };
  }
  OnCreate() {
    var i;
    var t;
    var e;
    var o;
    if (this.CreatureDataComponent.SummonType === Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionControl.OnCreate");
      }
      this.qZo(this.CreatureDataComponent.GetCreatureDataId());
      this.AttributeComponent.AddListener(GameplayAbilityVisionMisc_1.controlVisionEnergy, this._yo);
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
      e = (t = this.EntityHandle.Entity.GetComponent(0)).GetRoleId();
      (o = new SceneTeamData_1.SceneTeamRole()).CreatureDataId = t.GetCreatureDataId();
      o.RoleId = e;
      ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupData(i, {
        GroupType: -1,
        GroupRoleList: [o],
        CurrentRoleId: e
      });
    }
  }
  OnDestroy() {
    var i;
    if (this.CreatureDataComponent.SummonType === Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionControl.OnDestroy");
      }
      this.qZo(undefined);
      this.AttributeComponent.RemoveListener(GameplayAbilityVisionMisc_1.controlVisionEnergy, this._yo);
      this.bZo();
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
      ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupData(i, {
        GroupType: -1,
        GroupRoleList: [],
        CurrentRoleId: 0
      });
    }
    if (this.wZo) {
      this.wZo.EndTask();
      this.wZo = undefined;
    }
  }
  OnActivateAbility() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionControl.OnActivateAbility");
    }
    if (GameplayAbilityVisionControl.VisionControlHandle) {
      return false;
    }
    var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole);
    if (!i) {
      return false;
    }
    i.Entity.CheckGetComponent(93)?.SetTeamTag(2);
    GameplayAbilityVisionControl.VisionControlHandle = i;
    this.GZo(i);
    this.BZo = ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType;
    i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(i, -1, true);
    return true;
  }
  OnEndAbility() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionControl.OnEndAbility");
    }
    return !!GameplayAbilityVisionControl.VisionControlHandle && (this.NZo(), true);
  }
  qZo(i) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.CreatureDataComponent.GetSummonerId());
    if (t) {
      t.Entity.GetComponent(0).VisionControlCreatureDataId = i;
    }
  }
  bZo() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.CreatureDataComponent.GetSummonerId());
    if (i?.Valid) {
      i.Entity.GetComponent(43).EndAbilityVision(3);
    } else {
      GameplayAbilityVisionControl.VisionControlHandle = undefined;
    }
  }
  GZo(i) {
    if (i.Valid) {
      (i = i.Entity.GetComponent(174)).AddBuff(CharacterBuffIds_1.buffId.VisionControl, {
        InstigatorId: i.CreatureDataId,
        Reason: "操控幻象回满能量"
      });
    }
  }
  NZo() {
    this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 28, "幻象消失材质没有正常结束，被保底");
      }
      this.Cga();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY);
    var i = GameplayAbilityVisionControl.VisionControlHandle.Entity.GetComponent(21);
    i?.AddCue(GameplayAbilityVisionMisc_1.MORPH_PARTICLE_CUE_ID, {
      Sync: true,
      Instant: true
    });
    this.kQo = i.AddCue(GameplayAbilityVisionMisc_1.MATERIAL_CUE_ID, {
      EndCallback: () => {
        if (TimerSystem_1.TimerSystem.Has(this.ota)) {
          TimerSystem_1.TimerSystem.Remove(this.ota);
          this.Cga();
        }
      },
      Sync: true
    });
  }
  Cga() {
    this.ota = undefined;
    this.CueComponent.AddCue(GameplayAbilityVisionMisc_1.ROLE_APPEAR_CUE_ID, {
      Sync: true,
      Instant: true
    });
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(i, this.BZo ?? 1);
    this.BZo = undefined;
    GameplayAbilityVisionControl.VisionControlHandle?.Entity?.GetComponent(21)?.RemoveCueByHandle(this.kQo);
    GameplayAbilityVisionControl.VisionControlHandle = undefined;
  }
}
(exports.GameplayAbilityVisionControl = GameplayAbilityVisionControl).VisionControlHandle = undefined;
//# sourceMappingURL=GameplayAbilityVisionControl.js.map