"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var f = t.length - 1; f >= 0; f--) {
      if (o = t[f]) {
        r = (h < 3 ? o(r) : h > 3 ? o(i, s, r) : o(i, s)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTagComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let VehicleTagComponent = class VehicleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments);
    this.BaseActorComp = undefined;
    this.VehicleActorComp = undefined;
    this.PerformComp = undefined;
    this.VehicleBuffComp = undefined;
    this.PassengerTagMap = new Map();
    this.ListenedTags = new Set();
    this.DriverListenTags = new Set();
    this.DriverListenLoopLock = -1;
    this.VehicleTagChanged = (t, i) => {
      if (this.PerformComp?.Driver) {
        var s = this.VehicleToDriverTagIdMap.get(t);
        if (s) {
          if (i) {
            for (const e of s) {
              this.PerformComp.Driver.GetComponent(217)?.AddTag(e);
            }
          } else {
            for (const o of s) {
              this.PerformComp.Driver.GetComponent(217)?.RemoveTag(o);
            }
          }
        }
        s = this.VehicleToDriverBuffIdMap.get(t);
        if (s) {
          if (i) {
            for (const h of s) {
              this.PerformComp.Driver.GetComponent(222)?.AddBuff(h, {
                InstigatorId: this.BaseActorComp.CreatureData.GetCreatureDataId(),
                PreMessageId: this.VehicleBuffComp?.MotorContextId,
                Reason: "MotorTag.Buff"
              });
            }
          } else {
            for (const r of s) {
              this.PerformComp.Driver.GetComponent(222)?.RemoveBuff(r, -1, "MotorTag.Buff");
            }
          }
        }
      }
    };
    this.OnEnterVehicle = t => {
      var i;
      if (t.PassengerEntity) {
        this.ListenDriverTagChange(t);
        if (this.PassengerTagMap.has(t.PassengerEntity)) {
          i = t.PassengerEntity.GetComponent(0)?.GetPbDataId();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 50, "上次离开载具时Tag未清理", ["VehiclePbDataId", this.BaseActorComp?.CreatureData.GetPbDataId()], ["PassengerId", i], ["Tags", this.PassengerTagMap.get(t.PassengerEntity)]);
          }
          this.RemoveAllTagsForPassenger(t.PassengerEntity);
        } else {
          if (!this.PassengerTagMap.size) {
            this.AddEnterVehicleTagsForVehicle();
          }
          this.PassengerTagMap.set(t.PassengerEntity, new Set());
          this.AddEnterVehicleTagsForPassenger(t.PassengerEntity);
          if (t.Seat === this.PerformComp?.DriverSeat) {
            var s = t.PassengerEntity.GetComponent(217);
            if (s) {
              for (var [e, o] of this.VehicleToDriverTagIdMap) {
                if (this.HasTag(e)) {
                  for (const n of o) {
                    s.AddTag(n);
                  }
                } else {
                  for (const a of o) {
                    s.RemoveTag(a);
                  }
                }
              }
            }
            var h = t.PassengerEntity.GetComponent(222);
            if (h) {
              for (var [r, f] of this.VehicleToDriverBuffIdMap) {
                if (this.HasTag(r)) {
                  for (const c of f) {
                    h.AddBuff(c, {
                      InstigatorId: this.BaseActorComp.CreatureData.GetCreatureDataId(),
                      PreMessageId: this.VehicleBuffComp?.MotorContextId,
                      Reason: "MotorTag.Buff"
                    });
                  }
                } else {
                  for (const v of f) {
                    h.RemoveBuff(v, -1, "MotorTag.Buff");
                  }
                }
              }
            }
          }
        }
      }
    };
    this.OnLeaveVehicle = t => {
      if (t.PassengerEntity) {
        this.RemoveListenDriverTagChange(t);
        if (t.Seat === this.PerformComp?.DriverSeat) {
          var i = t.PassengerEntity.GetComponent(217);
          if (i) {
            for (var [s, e] of this.VehicleToDriverTagIdMap) {
              if (this.HasTag(s)) {
                for (const f of e) {
                  i.RemoveTag(f);
                }
              }
            }
          }
          var o = t.PassengerEntity.GetComponent(222);
          if (o) {
            for (var [h, r] of this.VehicleToDriverBuffIdMap) {
              if (this.HasTag(h)) {
                for (const n of r) {
                  o.RemoveBuff(n, -1, "MotorTag.Buff");
                }
              }
            }
          }
        }
        this.RemoveAllTagsForPassenger(t.PassengerEntity);
        if (!this.PassengerTagMap.size) {
          this.RemoveEnterVehicleTagsForVehicle();
        }
      }
    };
    this.DriverTagChanged = (t, i) => {
      if (this.PerformComp?.Driver) {
        if (this.DriverListenLoopLock === Time_1.Time.Frame) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 85, "在驾驶员传递Tag到载具tag循环", ["tagId", t], ["tagExist", i]);
          }
        } else {
          this.DriverListenLoopLock = Time_1.Time.Frame;
          t = this.DriverToVehicleTagIdMap.get(t);
          if (t) {
            if (i) {
              for (const s of t) {
                this.AddTag(s);
              }
            } else {
              for (const e of t) {
                this.RemoveTag(e);
              }
            }
          }
          this.DriverListenLoopLock = -1;
        }
      }
    };
  }
  get VehicleToDriverTagIdMap() {
    return this.PerformComp.Config.VehicleToDriverTagMap;
  }
  get DriverToVehicleTagIdMap() {
    return this.PerformComp.Config.DriverToVehicleTagMap;
  }
  get VehicleToDriverBuffIdMap() {
    return this.PerformComp.Config.VehicleToDriverBuffMap;
  }
  OnStart() {
    super.OnStart();
    this.BaseActorComp = this.Entity.GetComponent(1);
    this.VehicleActorComp = this.Entity.GetComponent(247);
    this.PerformComp = this.Entity.GetComponent(246);
    this.VehicleBuffComp = this.Entity.GetComponent(257);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  OnActivate() {
    super.OnActivate();
    var t = this.PerformComp?.Config?.VehicleToDriverTagMap;
    if (t) {
      for (var [i] of t) {
        if (!this.ListenedTags.has(i)) {
          this.AddTagAddOrRemoveListener(i, this.VehicleTagChanged);
          this.ListenedTags.add(i);
        }
      }
    }
    t = this.PerformComp?.Config?.VehicleToDriverBuffMap;
    if (t) {
      for (var [s] of t) {
        if (!this.ListenedTags.has(s)) {
          this.AddTagAddOrRemoveListener(s, this.VehicleTagChanged);
          this.ListenedTags.add(s);
        }
      }
    }
    for (const e of this.ListenedTags) {
      if (this.HasTag(e)) {
        this.VehicleTagChanged(e, true);
      }
    }
  }
  OnEnd() {
    for (const i of this.ListenedTags) {
      this.RemoveTagAddOrRemoveListener(i, this.VehicleTagChanged);
    }
    this.ListenedTags.clear();
    var t = this.PerformComp?.Driver?.GetComponent(217);
    if (t) {
      for (const s of this.DriverListenTags) {
        t.RemoveTagAddOrRemoveListener(s, this.DriverTagChanged);
      }
    }
    this.DriverListenTags.clear();
    for (const e of this.PassengerTagMap.keys()) {
      this.RemoveAllTagsForPassenger(e);
    }
    super.OnEnd();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  OnClear() {
    super.OnClear();
    return true;
  }
  AddEnterVehicleTagsForPassenger(t) {
    if (this.PerformComp?.Config) {
      for (const i of this.PerformComp.Config.PassengerEnterTags) {
        this.AddTagForPassenger(t, 1, i);
      }
    }
  }
  AddEnterVehicleTagsForVehicle() {
    if (this.PerformComp?.Config && this.PerformComp.PassengerInfoMap.size === 1) {
      for (const t of this.PerformComp.Config.VehicleEnterTags) {
        this.AddTag(t);
      }
    }
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (this.PerformComp?.Config && this.PerformComp.PassengerInfoMap.size === 1) {
      for (const t of this.PerformComp.Config.VehicleEnterTags) {
        this.RemoveTag(t);
      }
    }
  }
  AddTagForPassenger(t, i, s) {
    if (t && this.PassengerTagMap.has(t)) {
      t.GetComponent(217)?.TagContainer.AddExactTag(i, s);
      this.PassengerTagMap.get(t).add(s);
    }
  }
  RemoveTagForPassenger(t, i, s) {
    if (t && this.PassengerTagMap.get(t)?.has(s)) {
      t.GetComponent(217)?.TagContainer.RemoveExactTag(i, s);
      this.PassengerTagMap.get(t).delete(s);
    }
  }
  RemoveAllTagsForPassenger(t) {
    if (t) {
      const s = t.GetComponent(217);
      var i = this.PassengerTagMap.get(t);
      if (i && s) {
        i.forEach(t => {
          s.RemoveTag(t);
        });
        this.PassengerTagMap.delete(t);
      }
    }
  }
  ListenDriverTagChange(t) {
    if (t.IsDriver && t.PassengerEntity) {
      var i = t.PassengerEntity.GetComponent(217);
      if (i) {
        t = this.PerformComp?.Config?.DriverToVehicleTagMap;
        if (t) {
          for (var [s, e] of t) {
            if (!this.DriverListenTags.has(s)) {
              i.AddTagAddOrRemoveListener(s, this.DriverTagChanged);
              this.DriverListenTags.add(s);
            }
            if (i.HasTag(s)) {
              for (const o of e) {
                this.AddTag(o);
              }
            }
          }
        }
      }
    }
  }
  RemoveListenDriverTagChange(t) {
    if (t.IsDriver && t.PassengerEntity) {
      var i = t.PassengerEntity.GetComponent(217);
      if (i) {
        t = this.PerformComp?.Config?.DriverToVehicleTagMap;
        if (t) {
          for (var [s, e] of t) {
            if (this.DriverListenTags.has(s)) {
              i.RemoveTagAddOrRemoveListener(s, this.DriverTagChanged);
              this.DriverListenTags.delete(s);
            }
            for (const o of e) {
              this.RemoveTag(o);
            }
          }
        }
      }
    }
  }
};
VehicleTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(254)], VehicleTagComponent);
exports.VehicleTagComponent = VehicleTagComponent; //# sourceMappingURL=VehicleTagComponent.js.map