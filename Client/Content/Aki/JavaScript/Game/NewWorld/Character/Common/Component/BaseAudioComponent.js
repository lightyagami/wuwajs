"use strict";
var __decorate = this && this.__decorate || function(t, o, e, n) {
  var r, i = arguments.length,
    _ = i < 3 ? o : null === n ? n = Object.getOwnPropertyDescriptor(o, e) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) _ = Reflect.decorate(t, o, e, n);
  else
    for (var s = t.length - 1; 0 <= s; s--)(r = t[s]) && (_ = (i < 3 ? r(_) : 3 < i ? r(o, e, _) : r(o, e)) || _);
  return 3 < i && _ && Object.defineProperty(o, e, _), _
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseAudioComponent = void 0;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  ENTITY_TYPE_VOLUME_CONTROLS = [
    [Protocol_1.Aki.Protocol.kks.Proto_Animal, "entity_type_volume_control_animal"],
    [Protocol_1.Aki.Protocol.kks.Proto_Custom, "entity_type_volume_control_custom_other"],
    [Protocol_1.Aki.Protocol.kks.Proto_Monster, "entity_type_volume_control_monster"],
    [Protocol_1.Aki.Protocol.kks.Proto_Npc, "entity_type_volume_control_npc"],
    [Protocol_1.Aki.Protocol.kks.Proto_Player, "entity_type_volume_control_player_role"],
    [Protocol_1.Aki.Protocol.kks.Proto_SceneItem, "entity_type_volume_control_scene_item"],
    [Protocol_1.Aki.Protocol.kks.Proto_Vision, "entity_type_volume_control_vision"],
    [Protocol_1.Aki.Protocol.kks.HI_, "entity_type_volume_control_vehicle"]
  ];
let BaseAudioComponent = class BaseAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.AkComponentMap = new Map, this.CreatureData = void 0, this.ActorComp = void 0
  }
  static get Dependencies() {
    return [0, 1]
  }
  OnInit() {
    return this.CreatureData = this.Entity.CheckGetComponent(0), this.ActorComp = this.Entity.CheckGetComponent(1), !0
  }
  OnEnd() {
    return this.AkComponentMap.clear(), !0
  }
  OnStart() {
    return !(!this.ActorComp?.Valid || !this.ActorComp.Owner)
  }
  GetAkComponent(o) {
    var e = this.ActorComp?.Owner;
    if (e?.IsValid()) {
      let t = "None";
      t = "string" == typeof o ? 0 < o.length ? o : "None" : o && 0 < o.toString().length ? o.toString() : "None";
      var o = this.AkComponentMap.get(t);
      return o?.IsValid() ? o : (o = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: FNameUtil_1.FNameUtil.GetDynamicFName(t),
        OnCreated: () => {
          this.OnAkComponentCreated()
        }
      }))?.IsValid() ? ((e = this.CreatureData?.GetEntityType()) !== Protocol_1.Aki.Protocol.kks.Proto_Npc && e !== Protocol_1.Aki.Protocol.kks.Proto_Monster && e !== Protocol_1.Aki.Protocol.kks.HI_ || (o.bEnableOcclusion = !0), this.Z3r(), this.AkComponentMap.set(t, o), o) : void 0
    }
  }
  OnAkComponentCreated() {}
  Z3r() {
    const e = this.ActorComp?.Owner,
      n = this.CreatureData?.GetEntityType();
    e ? (ENTITY_TYPE_VOLUME_CONTROLS.forEach(([t, o]) => {
      t = n === t ? 1 : 0;
      AudioSystem_1.AudioSystem.SetRtpcValue(o, t, {
        Actor: e
      })
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 55, "实体类型设置音量控制: SOLO此类型, 静音其他类型", ["actor", e.GetName()], ["entityType", n])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Audio", 55, "实体类型设置音量控制: 无法获取角色Actor")
  }
};
BaseAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], BaseAudioComponent), exports.BaseAudioComponent = BaseAudioComponent;
//# sourceMappingURL=BaseAudioComponent.js.map