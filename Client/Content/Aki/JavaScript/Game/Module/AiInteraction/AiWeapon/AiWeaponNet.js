"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWeaponNet = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MAX_SPEED_SIZE = 600;
class AiWeaponNet {
  RegisterNet() {
    Net_1.Net.Register(23654, e => {
      this.yje(e);
    });
  }
  UnRegisterNet() {
    Net_1.Net.UnRegister(23654);
  }
  yje(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t &&= t.Entity.GetComponent(84)) {
      if (e.nRs !== 0) {
        t.RegisterCharacterDropWeaponEvent(e.nRs);
        t.ChangeWeaponByWeaponByConfigId(e.nRs);
      } else {
        t.ClearWeaponForAi();
      }
    }
  }
  SendHoldWeaponPushOnSafe(e, t) {
    var r = EntitySystem_1.EntitySystem.Get(t);
    return !!r && !!r.GetComponent(153).CanBeUsed() && this.SendHoldWeaponPush(e, t);
  }
  SendHoldWeaponPush(e, t) {
    var r = new Protocol_1.Aki.Protocol.Jcs();
    r.F4n = this.Ije(e);
    r.d8n = this.Ije(t);
    Net_1.Net.Send(24977, r);
    return true;
  }
  SendDiscardWeaponPush(e) {
    if (e.AiWeaponConfigId === 0) {
      return false;
    }
    var t = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(e.AiWeaponConfigId, e.Entity);
    if (!t) {
      return false;
    }
    var r = new Protocol_1.Aki.Protocol.Zcs();
    var o = new Protocol_1.Aki.Protocol.C8n();
    r.F4n = this.Ije(e.Entity.Id);
    var a = e.Entity.GetComponent(3);
    var e = e.Entity.GetComponent(64);
    let i = undefined;
    if (e.GetHitData()) {
      i = Vector_1.Vector.Create(e.GetHitData().HitPosition);
    } else {
      (i = Vector_1.Vector.Create(a.ActorLocation)).Z -= 50;
    }
    e = Vector_1.Vector.Create(a.ActorLocation);
    e.SubtractionEqual(i);
    e.X *= 100;
    e.Y *= 100;
    e.Z *= 5;
    e.X = this.CalculateWeight(e.X);
    e.Y = this.CalculateWeight(e.Y);
    e.Z = Math.abs(this.CalculateWeight(e.Z));
    a = a.Actor.Mesh.D_GetSocketLocation(t.DropSocket);
    t = Rotator_1.Rotator.Create();
    e.Rotation(t);
    o.P5n = a;
    o.g8n = new Protocol_1.Aki.Protocol.D2s();
    o.g8n.Roll = t.Roll;
    o.g8n.Pitch = t.Pitch;
    o.g8n.Yaw = t.Yaw;
    o.f8n = new Protocol_1.Aki.Protocol.Gks();
    o.f8n.X = e.X;
    o.f8n.Y = e.Y;
    o.f8n.Z = e.Z;
    r.C8n = o;
    Net_1.Net.Call(16491, r, e => {});
    return true;
  }
  Ije(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    return MathUtils_1.MathUtils.NumberToLong(e);
  }
  CalculateWeight(e) {
    var t = Math.abs(e);
    var e = e > 0 ? 1 : -1;
    var r = MAX_SPEED_SIZE;
    return (r - MathUtils_1.MathUtils.Clamp(t, 0, r)) * e;
  }
}
exports.AiWeaponNet = AiWeaponNet;
//# sourceMappingURL=AiWeaponNet.js.map