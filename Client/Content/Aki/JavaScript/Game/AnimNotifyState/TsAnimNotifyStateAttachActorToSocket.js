"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsAnimNotifyStateAttachActorToSocket = undefined;
const UE = require("ue");
class TsAnimNotifyStateAttachActorToSocket extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.SocketName = undefined;
    this.ActorTag = undefined;
    this.LocationAttachRule = 1;
    this.RotationAttachRule = 1;
    this.ScaleAttachRule = 1;
    this.LocationDetachRule = 1;
    this.RotationDetachRule = 1;
    this.ScaleDetachRule = 1;
  }
  Constructor() {}
  K2_NotifyBegin(t, s, i) {
    var o;
    return !!this.ActorTag && !!(o = UE.KuroCollectActorComponent.GetActorWithTag(this.ActorTag, 0)) && (o?.K2_AttachToComponent(t, this.SocketName, this.LocationAttachRule, this.RotationAttachRule, this.ScaleAttachRule, false), true);
  }
  K2_NotifyEnd(t, s) {
    var i;
    return !!this.ActorTag && !!(i = UE.KuroCollectActorComponent.GetActorWithTag(this.ActorTag, 0)) && (i?.K2_DetachFromActor(this.LocationDetachRule, this.RotationDetachRule, this.ScaleDetachRule), true);
  }
  GetNotifyName() {
    return "附加Actor到Socket";
  }
}
exports.TsAnimNotifyStateAttachActorToSocket = TsAnimNotifyStateAttachActorToSocket;
exports.default = TsAnimNotifyStateAttachActorToSocket; //# sourceMappingURL=TsAnimNotifyStateAttachActorToSocket.js.map