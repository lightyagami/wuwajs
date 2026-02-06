"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var _ = e.length - 1; _ >= 0; _--) {
      if (n = e[_]) {
        r = (s < 3 ? n(r) : s > 3 ? n(t, i, r) : n(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemQuantumDoorComponent = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FollowUtils_1 = require("../Character/Common/Component/Abilities/Follow/FollowUtils");
const IFollow_1 = require("../Character/Common/Component/Abilities/Follow/IFollow");
const HIT_CD = 1600;
const FOLLOW_SHOOTER_ID = 24000039;
const DOOR_HIT_AK_EVENT_NAME = "play_interact_space_station_role_dead";
let SceneItemQuantumDoorComponent = class SceneItemQuantumDoorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vtn = undefined;
    this.Hte = undefined;
    this.CFg = undefined;
    this.pFg = undefined;
    this.vFg = undefined;
    this.xXt = 0;
    this.yFg = undefined;
    this.SFg = undefined;
    this.MFg = undefined;
    this.Nmn = (e, t) => {
      if (t === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTrigger() && (this.pFg || (this.EFg(), this.pFg))) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 93, "[SceneItemQuantumDoorComponent.OnActorOverlapCallback] 玩家Overlap触发");
        }
        if (e) {
          if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
          }
          t = this.IFg();
          this.pFg.SetScalarParameterValueOnMaterials(this.yFg, t ? 1 : 0);
        } else {
          if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
          }
          this.pFg.SetScalarParameterValueOnMaterials(this.yFg, 0);
        }
      }
    };
    this.TFg = (e, t) => {
      if (t === Global_1.Global.BaseCharacter.CharacterActorComponent.Owner && this.vFg === undefined && (this.pFg || (this.EFg(), this.pFg))) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 93, "[SceneItemQuantumDoorComponent.OnActorHitCallback] 玩家Hit触发");
        }
        this.xXt = 0;
        t = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocation.op_ToVector();
        this.pFg.SetVectorParameterValueOnMaterials(this.SFg, t);
        AudioSystem_1.AudioSystem.PostEvent(DOOR_HIT_AK_EVENT_NAME, this.CFg);
        this.vFg = TimerSystem_1.TimerSystem.Forever(e => {
          if (this.xXt >= 1) {
            TimerSystem_1.TimerSystem.Remove(this.vFg);
            this.vFg = undefined;
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 93, "[SceneItemQuantumDoorComponent.Progress] 涟漪进度", ["Progress", this.xXt]);
            }
            this.xXt += e / HIT_CD;
            this.xXt = Math.min(this.xXt, 1);
            this.pFg.SetScalarParameterValueOnMaterials(this.MFg, this.xXt);
          }
        }, TimerSystem_1.MIN_TIME);
      }
    };
    this.xrh = e => {
      var t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 93, "[SceneItemQuantumDoorComponent.OnConditionListenCallback] 范围内辅助机状态改变", ["isEnable", e]);
      }
      if ((this.pFg || (this.EFg(), this.pFg)) && (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t = FollowUtils_1.FollowUtils.GetPlayerFollowShooter(t))) {
        t = t.Entity?.GetComponent(0)?.SummonCfgId === FOLLOW_SHOOTER_ID;
        this.pFg.SetScalarParameterValueOnMaterials(this.yFg, t && e ? 1 : 0);
      }
    };
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(91);
    this.Hte = this.Entity.GetComponent(214);
    if (this.vtn && this.Hte) {
      this.yFg = FNameUtil_1.FNameUtil.GetDynamicFName("Passable");
      this.SFg = FNameUtil_1.FNameUtil.GetDynamicFName("HitPositionWS");
      this.MFg = FNameUtil_1.FNameUtil.GetDynamicFName("DiffusionProgress");
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 93, "[QuantumDoorComp] 组件缺失");
      }
      return false;
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, this.Nmn);
    }
    if (this.CFg) {
      this.CFg.OnActorHit.Clear();
      this.CFg = undefined;
    }
    if (this.vFg) {
      TimerSystem_1.TimerSystem.Remove(this.vFg);
      this.vFg = undefined;
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    }
    return true;
  }
  EFg() {
    if (!this.CFg || !this.CFg.IsValid()) {
      var e = this.Hte.GetMainCollisionActor();
      if (e && (this.CFg = e, this.CFg.OnActorHit.Add(this.TFg), !this.pFg)) {
        e = this.CFg?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
        if (e instanceof UE.StaticMeshComponent) {
          this.pFg = e;
          return;
        }
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 93, "[QuantumDoorComp] 静态网格体组件缺失");
    }
  }
  IFg() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var e = FollowUtils_1.FollowUtils.GetPlayerFollowHandler(e, IFollow_1.EPlayerFollowerHandlerType.FollowShooter);
    return !!e && !!e.IsFollowShooterEnable() && e.GetFollowShooter()?.Entity?.GetComponent(0)?.SummonCfgId === FOLLOW_SHOOTER_ID;
  }
};
SceneItemQuantumDoorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(345)], SceneItemQuantumDoorComponent);
exports.SceneItemQuantumDoorComponent = SceneItemQuantumDoorComponent; //# sourceMappingURL=SceneItemQuantumDoorComponent.js.map