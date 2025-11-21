"use strict";

var __decorate = this && this.__decorate || function (t, o, e, n) {
  var r;
  var i = arguments.length;
  var _ = i < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, e) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    _ = Reflect.decorate(t, o, e, n);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (r = t[s]) {
        _ = (i < 3 ? r(_) : i > 3 ? r(o, e, _) : r(o, e)) || _;
      }
    }
  }
  if (i > 3 && _) {
    Object.defineProperty(o, e, _);
  }
  return _;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAudioComponent = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ENTITY_TYPE_VOLUME_CONTROLS = [[Protocol_1.Aki.Protocol.kks.Proto_Animal, "entity_type_volume_control_animal"], [Protocol_1.Aki.Protocol.kks.Proto_Custom, "entity_type_volume_control_custom_other"], [Protocol_1.Aki.Protocol.kks.Proto_Monster, "entity_type_volume_control_monster"], [Protocol_1.Aki.Protocol.kks.Proto_Npc, "entity_type_volume_control_npc"], [Protocol_1.Aki.Protocol.kks.Proto_Player, "entity_type_volume_control_player_role"], [Protocol_1.Aki.Protocol.kks.Proto_SceneItem, "entity_type_volume_control_scene_item"], [Protocol_1.Aki.Protocol.kks.Proto_Vision, "entity_type_volume_control_vision"], [Protocol_1.Aki.Protocol.kks.HI_, "entity_type_volume_control_vehicle"]];
let BaseAudioComponent = class BaseAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.AkComponentMap = new Map();
    this.CreatureData = undefined;
    this.ActorComp = undefined;
  }
  static get Dependencies() {
    return [0, 1];
  }
  OnInit() {
    this.CreatureData = this.Entity.CheckGetComponent(0);
    this.ActorComp = this.Entity.CheckGetComponent(1);
    return true;
  }
  OnEnd() {
    this.AkComponentMap.clear();
    return true;
  }
  OnStart() {
    return !!this.ActorComp?.Valid && !!this.ActorComp.Owner;
  }
  GetAkComponent(o) {
    var e = this.ActorComp?.Owner;
    if (e?.IsValid()) {
      let t = "None";
      t = typeof o == "string" ? o.length > 0 ? o : "None" : o && o.toString().length > 0 ? o.toString() : "None";
      var o = this.AkComponentMap.get(t);
      if (o?.IsValid()) {
        return o;
      } else if ((o = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: FNameUtil_1.FNameUtil.GetDynamicFName(t),
        OnCreated: () => {
          this.OnAkComponentCreated();
        }
      }))?.IsValid()) {
        if ((e = this.CreatureData?.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Npc || e === Protocol_1.Aki.Protocol.kks.Proto_Monster || e === Protocol_1.Aki.Protocol.kks.HI_) {
          o.bEnableOcclusion = true;
        }
        this.Z3r();
        this.AkComponentMap.set(t, o);
        return o;
      } else {
        return undefined;
      }
    }
  }
  OnAkComponentCreated() {}
  Z3r() {
    const e = this.ActorComp?.Owner;
    const n = this.CreatureData?.GetEntityType();
    if (e) {
      ENTITY_TYPE_VOLUME_CONTROLS.forEach(([t, o]) => {
        t = n === t ? 1 : 0;
        AudioSystem_1.AudioSystem.SetRtpcValue(o, t, {
          Actor: e
        });
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 55, "实体类型设置音量控制: SOLO此类型, 静音其他类型", ["actor", e.GetName()], ["entityType", n]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 55, "实体类型设置音量控制: 无法获取角色Actor");
    }
  }
};
BaseAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(275)], BaseAudioComponent);
exports.BaseAudioComponent = BaseAudioComponent; //# sourceMappingURL=BaseAudioComponent.js.map