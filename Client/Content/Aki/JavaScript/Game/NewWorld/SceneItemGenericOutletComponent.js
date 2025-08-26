"use strict";

var SceneItemGenericOutletComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        s = (n < 3 ? r(s) : n > 3 ? r(t, i, s) : r(t, i)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemGenericOutletComponent = undefined;
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const Net_1 = require("../../Core/Net/Net");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
const IUtil_1 = require("../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
let SceneItemGenericOutletComponent = SceneItemGenericOutletComponent_1 = class SceneItemGenericOutletComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.Oln = undefined;
    this.Lie = undefined;
    this.Wal = new Map();
    this.EntityInSocket = undefined;
    this.Qal = undefined;
    this.GUe = (e, t, i) => {
      if (t.PbDataId === this.Qal) {
        this.InitMatch(t.PbDataId);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemGenericOutletComponent_1)[0];
    this.Lo = e;
    this.Wal.clear();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    this.Oln = this.Entity.GetComponent(131);
    this.Lie = this.Entity.GetComponent(197);
    var e = this.Hte?.CreatureData.PbPullingFoundationEntityId;
    if (e !== undefined && e !== 0) {
      this.InitMatch(e);
    }
    return true;
  }
  OnClear() {
    this.Lo = undefined;
    this.Hte = undefined;
    this.Wal.clear();
    this.EntityInSocket = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
    return true;
  }
  InitMatch(e) {
    this.Qal = e;
    var t;
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (i === undefined || i.Entity === undefined) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    } else {
      this.EntityInSocket = i.Entity;
      if ((i = this.EntityInSocket.GetComponent(203)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "雕像交互点的雕像没有ActorComponent", ["relationId", e]);
        }
      } else {
        this.$al(this.EntityInSocket);
        if ((t = this.GetMatchLocation(this.EntityInSocket)) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 31, "雕像交互点的雕像没有匹配位置", ["relationId", e]);
          }
        } else {
          i.SetActorLocation(t.ToUeVector(), "[SceneItemGenericOutletComponent.InitMatch]", false);
        }
      }
    }
  }
  TryMatch(e) {
    return this.Lo !== undefined && !this.Oln?.IsLocked && !this.Lie?.HasTag(-709838471) && this.Lo.Config.Type === IComponent_1.EPullingFoundation.CategoryMatching && this.$al(e);
  }
  $al(t) {
    var i = t.GetComponent(0)?.GetBaseInfo();
    var o = t.GetComponent(206);
    if (i !== undefined && o !== undefined) {
      for (let e = 0; e < this.Lo.Config.MatchingConfigs.length; e++) {
        var r = this.Lo.Config.MatchingConfigs[e];
        if (r.Condition.EntityMatch === undefined || (0, IUtil_1.isEntitiyMatch)(r.Condition.EntityMatch, i.Category)) {
          if (r.Condition.SelfState !== undefined) {
            r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r.Condition.SelfState);
            if (r === undefined) {
              continue;
            }
            if (!o.HasTag(r)) {
              continue;
            }
          }
          this.Wal.set(t, e);
          return true;
        }
      }
    }
    return false;
  }
  GetMatchLocation(e) {
    var t;
    var e = this.Wal.get(e);
    if (e !== undefined) {
      e = this.Lo.Config.MatchingConfigs[e];
      (t = Vector_1.Vector.Create()).FromConfigVector(e.Animation.MatchPos);
      e = (e = FNameUtil_1.FNameUtil.GetDynamicFName(e.Animation.MatchReferenceKey)) ? this.Hte.GetSocketTransform(e) : this.Hte.ActorTransform;
      t.FromUeVector(e.TransformPosition(t.ToUeVector()));
      return t;
    }
  }
  GetMatchRotation(e) {
    var t;
    var e = this.Wal.get(e);
    if (e !== undefined) {
      t = (e = this.Lo.Config.MatchingConfigs[e]).Animation.MatchRot;
      t = Rotator_1.Rotator.Create(t.Y ?? 0, t.Z ?? 0, t.X ?? 0);
      e = (e = FNameUtil_1.FNameUtil.GetDynamicFName(e.Animation.MatchReferenceKey)) ? this.Hte.GetSocketTransform(e) : this.Hte.ActorTransform;
      t.FromUeRotator(e.TransformRotation(t.Quaternion().ToUeQuat()).Rotator());
      return t;
    }
  }
  RequestMatchOutlet(e, t, i) {
    var o = this.Hte?.CreatureData.GetCreatureDataId();
    var e = e.GetComponent(0)?.GetCreatureDataId();
    if (o === undefined || e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "拉取雕像请求匹配雕像交互点时出错", ["outletCreatureId", o], ["selfCreatureId", e]);
      }
    }
    var r = Protocol_1.Aki.Protocol.NC_.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(o);
    r._Kn = MathUtils_1.MathUtils.NumberToLong(e);
    var o = Protocol_1.Aki.Protocol.Gks.create();
    o.X = t.X;
    o.Y = t.Y;
    o.Z = t.Z;
    var e = Protocol_1.Aki.Protocol.D2s.create();
    e.Pitch = i.Pitch;
    e.Yaw = i.Yaw;
    e.Roll = i.Roll;
    r.l8n = o;
    r._8n = e;
    Net_1.Net.Call(23957, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20341);
      }
    });
  }
};
SceneItemGenericOutletComponent = SceneItemGenericOutletComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], SceneItemGenericOutletComponent);
exports.SceneItemGenericOutletComponent = SceneItemGenericOutletComponent; //# sourceMappingURL=SceneItemGenericOutletComponent.js.map