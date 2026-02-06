"use strict";

var __decorate = this && this.__decorate || function (t, o, e, i) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, o, e, i);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (r = t[_]) {
        s = (n < 3 ? r(s) : n > 3 ? r(o, e, s) : r(o, e)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(o, e, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAkComponent = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameAudioController_1 = require("../../../../Module/Audio/GameAudioController");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const AkComponentDynamicConditionProxy_1 = require("./Audio/AkComponentDynamicConditionProxy");
const FoleySynthController_1 = require("./Audio/Controller/FoleySynthController");
const DEBUG_RADIUS = 15;
const DEBUG_SEG = 12;
const ROLE_MOVE_GROUP = "role_move";
const ENVIRONMENT_AUDIO_UPDATE_INTERVAL = 500;
const ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED = 4;
const AUDIO_ENTITY_TYPE_VOLUME_CONTROL = new Map([[Protocol_1.Aki.Protocol.kks.Proto_Animal, "entity_type_volume_control_animal"], [Protocol_1.Aki.Protocol.kks.Proto_Custom, "entity_type_volume_control_custom_other"], [Protocol_1.Aki.Protocol.kks.Proto_Monster, "entity_type_volume_control_monster"], [Protocol_1.Aki.Protocol.kks.Proto_Npc, "entity_type_volume_control_npc"], [Protocol_1.Aki.Protocol.kks.Proto_Player, "entity_type_volume_control_player_role"], [Protocol_1.Aki.Protocol.kks.Proto_SceneItem, "entity_type_volume_control_scene_item"], [Protocol_1.Aki.Protocol.kks.Proto_Vision, "entity_type_volume_control_vision"]]);
class AkComponentStatic {
  static Load() {
    if (!AkComponentStatic.Init) {
      AkComponentStatic.AkMoveStateMap.set("fall", -1527053051);
      AkComponentStatic.AkMoveStateMap.set("fly", -1717024120);
      AkComponentStatic.AkMoveStateMap.set("highspeed", -742314429);
      AkComponentStatic.AkMoveStateMap.set("sit", -1446183172);
      AkComponentStatic.AkMoveStateMap.set("slide", 786967831);
      AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, "normal");
      AkComponentStatic.Init = true;
    }
    return true;
  }
}
AkComponentStatic.Init = false;
AkComponentStatic.AkMoveState = "normal";
AkComponentStatic.AkMoveStateMap = new Map();
let CharacterAkComponent = class CharacterAkComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ovr = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.VFr = false;
    this.IsRole = false;
    this.IsP1 = false;
    this.AkComponentConfig = undefined;
    this.HFr = undefined;
    this.jFr = false;
    this.WaterDepth = -0;
    this.WFr = undefined;
    this.FootSwitch = "";
    this.KFr = 0;
    this.QFr = Vector_1.Vector.Create();
  }
  static get Dependencies() {
    return [3, 0];
  }
  OnInitData() {
    this.DynamicConditionProxy = new AkComponentDynamicConditionProxy_1.AkComponentDynamicConditionProxy();
    this.XZt = new AudioController_1.PlayResult();
    return true;
  }
  OnStart() {
    this.Ovr = this.Entity.GetComponent(0);
    return !!this.Ovr && !(this.Hte = this.Entity.GetComponent(3), !this.Hte?.Actor) && !(this.Gce = this.Entity.GetComponent(48), !this.Gce) && !(this.jFr = false, this.VFr = true, AkComponentStatic.Load(), this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig), 0);
  }
  OnTick(t) {
    if (this.jFr) {
      this.Ybt();
    }
    if (this.IsRole && this.IsP1 && (this.XFr(), this.$Fr(), this.WFr)) {
      this.WFr.Tick(t);
    }
  }
  OnActivate() {
    var t;
    this.IsRole = this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.IsP1 = false;
    if (this.IsRole && this.Hte?.IsAutonomousProxy || this.Ovr?.IsConcomitantEntity && (t = this.Ovr.GetSummonerId(), t = ModelManager_1.ModelManager.CreatureModel?.GetEntityId(t)) && EntitySystem_1.EntitySystem.GetComponent(t, 52)?.IsP1) {
      this.IsP1 = true;
    }
    if (this.IsRole && (this.Lie = this.Entity.GetComponent(217), this.IsP1)) {
      this.WFr = new FoleySynthController_1.FoleySynthController(this.Hte, this, this.Lie);
      this.WFr.Init(this.HFr);
    }
    this.YFr();
  }
  YFr() {
    if (this.Hte?.Valid) {
      GameAudioController_1.GameAudioController.SetRolePriority(this.IsP1 ? 0 : 2, this.Hte.Actor);
    }
  }
  XFr() {
    if (AkComponentStatic.AkMoveState === "normal") {
      for (var [t, o] of AkComponentStatic.AkMoveStateMap) {
        if (this.Lie?.HasTag(o)) {
          AkComponentStatic.AkMoveState = t;
          AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, t);
          return;
        }
      }
    } else {
      var e = AkComponentStatic.AkMoveStateMap.get(AkComponentStatic.AkMoveState);
      if (!this.Lie?.HasTag(e)) {
        for (var [i, r] of AkComponentStatic.AkMoveStateMap) {
          if (this.Lie?.HasTag(r)) {
            AkComponentStatic.AkMoveState = i;
            AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, i);
            return;
          }
        }
        AkComponentStatic.AkMoveState = "normal";
        AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, "normal");
      }
    }
  }
  JFr() {
    const e = this.Ovr?.GetEntityType();
    const i = this.Hte?.Actor;
    if (!e || !i) {
      if (e) {
        if (!i) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Audio", 55, "实体类型设置音量控制: 无法获取角色Actor");
          }
        }
        return;
      }
      throw Error("实体类型设置音量控制: 无法获取实体类型");
    }
    AUDIO_ENTITY_TYPE_VOLUME_CONTROL.forEach((t, o) => {
      if (e === o) {
        AudioSystem_1.AudioSystem.SetRtpcValue(t, 1, {
          Actor: i
        });
      } else {
        AudioSystem_1.AudioSystem.SetRtpcValue(t, 0, {
          Actor: i
        });
      }
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 55, "实体类型设置音量控制: SOLO此类型，静音其他类型", ["actor", i.ActorLabel], ["entityType", e], ["rtpc", AUDIO_ENTITY_TYPE_VOLUME_CONTROL.get(e)]);
    }
  }
  OnEnd() {
    this.DynamicConditionProxy.Clear();
    if (this.WFr) {
      this.WFr.Clear();
    }
    return this.VFr = true;
  }
  PostAudioEvent(t) {
    var o = this.Entity.GetComponent(0).GetRoleId();
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o).GetAudioData().GetAudioPathByName(t);
    if (e) {
      if (!this.XZt.EventPath || !!e.CanInterrupt) {
        e = e.AudioPath;
        if (this.XZt.EventPath !== e) {
          AudioController_1.AudioController.StopEvent(this.XZt);
          if (e) {
            AudioController_1.AudioController.PostEvent(e, this.Hte.Actor, this.XZt);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("UiCore", 21, "事件播放指定音效", ["audioEventPath", e]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiCore", 21, "没有事件播放指定音效");
          }
        }
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 21, "没有配置目标角色动作音效,到角色动画音效表中配置", ["角色Id", o.toString()], ["角色动作", t]);
    }
  }
  SetSwitchByData(t, o) {
    for (const i of o) {
      var e = i.split(".");
      if (e.length === 2) {
        t.SetSwitch(undefined, e[0], e[1]);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 57, "[PostAkEvent] switchData配置无效", ["ActorName:", this.Hte.Actor.GetName()], ["switchArray:", e]);
      }
    }
  }
  SetSwitchByUeData(o, e) {
    for (let t = 0; t < e.Num(); ++t) {
      var i = e.Get(t).split(".");
      if (i.length === 2) {
        o.SetSwitch(undefined, i[0], i[1]);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 57, "[PostAkEvent] switchData配置无效", ["ActorName:", this.Hte.Actor.GetName()], ["switchArray:", i]);
      }
    }
  }
  PostAkEvent(t, o, e, i, r) {
    if (o) {
      this.SetSwitchByUeData(t, i);
      this.DynamicConditionProxy.Do(this.Hte);
      if (r) {
        return t.PostAkEvent(o, 0, undefined, o.GetName());
      } else {
        return UE.AkGameplayStatics.D_PostEventAtLocation(o, this.Hte.ActorLocation, Rotator_1.Rotator.ZeroRotator, o.GetName(), this.Hte.Actor);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 57, "[PostAkEvent] eventPtr无效", ["ActorName:", this.Hte.Actor?.GetName()]);
      }
      return -1;
    }
  }
  SetDebug(t) {
    this.jFr = t;
  }
  GetDebug() {
    return this.jFr;
  }
  Ybt() {
    var o = this.Hte.Actor;
    var t = o.GetName();
    var e = o.K2_GetComponentsByClass(UE.AkComponent.StaticClass());
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 57, "---------------------------------------------");
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 57, "CharacterAkComponent Tick Debug;", ["Actor:", t]);
    }
    for (let t = 0; t < e.Num(); ++t) {
      var i;
      var r = e.Get(t);
      if (r instanceof UE.AkComponent && (i = r.D_K2_GetComponentLocation(), UE.KismetSystemLibrary.D_DrawDebugSphere(o, i, DEBUG_RADIUS, DEBUG_SEG, ColorUtils_1.ColorUtils.LinearRed, 0), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Audio", 57, "-----------AkComponent信息:", ["Comp:", r.GetName()], ["AttachSocketName:", r.AttachSocketName]);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 57, "-----------AkStatic信息:", ["State:", AkComponentStatic.AkMoveState]);
    }
  }
  GetAkComponentBySocketName(t) {
    let o = t;
    if (FNameUtil_1.FNameUtil.IsEmpty(o)) {
      o = CharacterNameDefines_1.CharacterNameDefines.HIT_CASE_NAME;
    }
    t = this.Hte.Actor;
    let e = undefined;
    (e = this.VFr && (e = t.GetComponentByClass(UE.AkComponent.StaticClass()), this.VFr = false, e) || t.AddComponentByClass(UE.AkComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).K2_AttachToComponent(this.Hte.Actor.Mesh, o, 2, 2, 1, true);
    t = this.Ovr?.GetEntityType();
    if (t === Protocol_1.Aki.Protocol.kks.Proto_Npc || t === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      e.bEnableOcclusion = true;
    }
    this.YFr();
    this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig);
    this.JFr();
    return e;
  }
  $Fr() {
    if (Time_1.Time.Now - this.KFr > ENVIRONMENT_AUDIO_UPDATE_INTERVAL) {
      if (this.Hte?.Valid) {
        if (Vector_1.Vector.DistSquared(this.QFr, this.Hte.ActorLocationProxy) > ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED) {
          this.QFr.DeepCopy(this.Hte.ActorLocationProxy);
          this.KFr = Time_1.Time.Now;
        }
      } else {
        this.KFr = Time_1.Time.Now;
      }
    }
  }
  SetFoleySynthFileDebug(t, o) {
    if (this.WFr) {
      this.WFr.SetDebug(t, o);
    }
  }
  static SetGlobalCharacterFoleySynthFileDebug(t, o) {
    var e;
    if (Global_1.Global.BaseCharacter && (e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(52))) {
      if (o?.length > 0) {
        e.SetFoleySynthFileDebug(t, o);
      } else {
        e.SetDebug(t);
      }
    }
  }
};
CharacterAkComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(52)], CharacterAkComponent);
exports.CharacterAkComponent = CharacterAkComponent; //# sourceMappingURL=CharacterAkComponent.js.map