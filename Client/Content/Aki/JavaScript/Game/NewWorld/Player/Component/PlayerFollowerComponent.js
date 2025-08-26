"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, o, i);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (r = e[l]) {
        n = (s < 3 ? r(n) : s > 3 ? r(t, o, n) : r(t, o)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerFollowerComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const followerPriorityMap = new Map([[0, 100], [1, 102], [2, 101]]);
let PlayerFollowerComponent = class PlayerFollowerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.j8 = 0;
    this.qHa = new Map();
    this.qeh = 0;
    this.OHa = undefined;
    this.GHa = undefined;
    this.kHa = undefined;
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0);
    this.j8 = e?.GetPlayerId() ?? 0;
    var e = e?.ComponentDataMap.get("nI_")?.nI_?.OI_;
    if (e) {
      this.UpdateFollowers(e);
    }
    return true;
  }
  OnClear() {
    this.j8 = 0;
    this.NHa();
    this.qHa.clear();
    return true;
  }
  UpdateFollowers(e) {
    for (const s of e) {
      let e = undefined;
      switch (s.h5n) {
        case Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerExploreSkill:
          e = 0;
          break;
        case Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerAuxiliary:
          e = 1;
          break;
        case Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerSpecialItem:
          e = 2;
      }
      var t;
      if (e === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 48, "Follower类型异常", ["Type", s.h5n]);
        }
      } else if ((t = MathUtils_1.MathUtils.LongToNumber(s.F4n)) <= 0) {
        this.qHa.delete(e);
      } else {
        this.qHa.set(e, t);
      }
    }
    var o;
    var i;
    var r = [-1, 0];
    for ([o, i] of this.qHa) {
      if (this.Fh_(o) > this.Fh_(r[0])) {
        r[0] = o;
        r[1] = i;
      }
    }
    if (r[0] < 0) {
      this.NHa();
    } else if ((e = r[1]) !== this.qeh) {
      this.NHa();
      this.qeh = e;
      this.FHa();
    }
  }
  Fh_(e) {
    return followerPriorityMap.get(e) ?? -1;
  }
  OnFollowerAdd(e) {
    if (e === this.qeh) {
      this.FHa();
    }
  }
  FHa() {
    const t = this.qeh;
    const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (o?.Valid && o.Id !== this.OHa?.Id) {
      this.kHa?.Cancel();
      this.kHa = undefined;
      if (o.IsInit) {
        this.vGl(t, o);
      } else {
        this.kHa = WaitEntityTask_1.WaitEntityTask.Create("PlayerFollowerComponent.PossessFollower", t, e => {
          if (e) {
            this.vGl(t, o);
          }
        }, -1);
      }
    }
  }
  async vGl(e, t) {
    var o = t.Entity?.GetComponent(223);
    if (o && (await o.LoadConfigPromise?.Promise, t.Valid) && e === this.qeh && (this.OHa = t, this.GHa = o, this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) {
      o.Possess();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerCreate, t);
    }
  }
  NHa() {
    this.kHa?.Cancel();
    this.kHa = undefined;
    if (this.GHa && this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      this.GHa.UnPossess();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerDestroy);
    }
    this.qeh = 0;
    this.OHa = undefined;
    this.GHa = undefined;
  }
  SetFollowerEnable(e) {
    this.GHa?.SetEnable(e);
  }
  GetFollower() {
    return this.OHa;
  }
  IsFollowerEnable() {
    return this.GHa?.IsEnable ?? false;
  }
  get AllFollowers() {
    return this.qHa;
  }
};
PlayerFollowerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(225)], PlayerFollowerComponent);
exports.PlayerFollowerComponent = PlayerFollowerComponent; //# sourceMappingURL=PlayerFollowerComponent.js.map