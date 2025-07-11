"use strict";

var SceneItemOutletComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var r;
  var o = arguments.length;
  var s = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemOutletComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IUtil_1 = require("../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const SceneItemManipulableCastState_1 = require("./Manipulate/SceneItemManipulableCastState");
const SceneItemManipulableDropState_1 = require("./Manipulate/SceneItemManipulableDropState");
const SceneItemManipulableResetState_1 = require("./Manipulate/SceneItemManipulableResetState");
const SCENE_ITEM_OUTLET_TAG = new UE.FName("SceneItemOutlet");
let SceneItemOutletComponent = SceneItemOutletComponent_1 = class SceneItemOutletComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.n$t = undefined;
    this.Lie = undefined;
    this.xvn = undefined;
    this.wvn = -1;
    this.Bvn = new Map();
    this.bvn = undefined;
    this.qvn = undefined;
    this.IVs = undefined;
    this.qVs = undefined;
    this.GVs = Vector_1.Vector.Create();
    this.OVs = Vector_1.Vector.Create();
    this.NVs = Rotator_1.Rotator.Create();
    this.kVs = Rotator_1.Rotator.Create();
    this.BJa = () => {
      this.Lie.RemoveTag(-171146886);
      if (this.EntityInSocket !== undefined) {
        this.Lie.AddTag(-1603486396);
      } else {
        this.Lie.AddTag(-1381638598);
      }
    };
    this.oFe = t => {
      if (t === -3775711) {
        this.Lie.AddTag(-171146886);
      } else {
        this.Lie.RemoveTag(-171146886);
      }
    };
    this.H0n = (t, e) => {
      e = e.Entity;
      if (e && !this.Lie?.HasTag(-662723379) && !this.Lie?.HasTag(-709838471)) {
        if (t) {
          if (!this.qVs && e.GetComponent(0)?.GetBaseInfo()) {
            t = this.Config?.Config;
            if (t.Condition.EntityMatch === undefined || this.YCa(t.Condition.EntityMatch, e)) {
              if (t.Condition.SelfState !== undefined) {
                var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.Condition.SelfState);
                if (!this.Lie || !this.Lie.HasTag(i)) {
                  return;
                }
              }
              if (e.GetComponent(1) && (i = e.GetComponent(156))) {
                if (i.CurrentState instanceof SceneItemManipulableCastState_1.SceneItemManipulableCastState || i.CurrentState instanceof SceneItemManipulableDropState_1.SceneItemManipulableDropState || i.CurrentState instanceof SceneItemManipulableResetState_1.SceneItemManipulableResetState) {
                  this.NSa(e, t);
                } else {
                  EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.FSa);
                }
              }
            }
          }
        } else if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.FSa)) {
          EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.FSa);
        }
      }
    };
    this.FSa = (t, e, i) => {
      var n = this.Config?.Config;
      if (e === 11) {
        this.NSa(i, n);
        EventSystem_1.EventSystem.RemoveWithTarget(i, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.FSa);
      }
    };
  }
  GetSocketLocation(t) {
    var e = Vector_1.Vector.Create(this.GetSocketLocationOffset(t));
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t));
    var t = t ? this.n$t.GetSocketTransform(t) : this.n$t.ActorTransform;
    e.FromUeVector(t.TransformPosition(e.ToUeVector()));
    return e;
  }
  GetFinalLocation(t) {
    var e = Vector_1.Vector.Create(this.GetSocketLocationOffset(t));
    e.AdditionEqual(this.GetMatchSequenceOffset(t));
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t));
    var t = t ? this.n$t.GetSocketTransform(t) : this.n$t.ActorTransform;
    e.FromUeVector(t.TransformPosition(e.ToUeVector()));
    return e;
  }
  GetSocketLocationOffset(t) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        var e = this.Gvn(t)?.Animation?.MatchPos;
        return Vector_1.Vector.Create(e?.X ?? 0, e?.Y ?? 0, e?.Z ?? 0);
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        var [e, i] = this.bvn.CalcJigsawSocketLocation();
        if (this.Config.Config.Type === IComponent_1.EItemFoundation.PulseDevice && e) {
          e.Z += 20;
        }
        this.qvn = i;
        return e ?? Vector_1.Vector.ZeroVectorProxy;
      case IComponent_1.EItemFoundation.RangeAdsorption:
        i = this.Config.Config.CategoryAnimation.MatchPos;
        return Vector_1.Vector.Create(i?.X ?? 0, i?.Y ?? 0, i?.Z ?? 0);
      default:
        return Vector_1.Vector.ZeroVectorProxy;
    }
  }
  GetSocketName(t) {
    if (this.Config.Config.Type === IComponent_1.EItemFoundation.CategoryMatching) {
      return this.Gvn(t)?.Animation?.MatchReferenceKey;
    } else if (this.Config.Config.Type === IComponent_1.EItemFoundation.RangeAdsorption) {
      return this.Config.Config.Animation.MatchReferenceKey;
    } else {
      return undefined;
    }
  }
  GetLockingEffect(t) {
    if (this.Config.Config.Type === IComponent_1.EItemFoundation.CategoryMatching) {
      return this.Gvn(t)?.ItemLockingConfig?.EffectPath;
    }
  }
  GetLockingItemTag(t) {
    if (this.Config.Config.Type === IComponent_1.EItemFoundation.CategoryMatching) {
      return this.Gvn(t)?.ItemLockingConfig?.TeleControlPerform;
    }
  }
  GetIsNeedAttach() {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
      case IComponent_1.EItemFoundation.RangeAdsorption:
        return true;
      default:
        return false;
    }
  }
  GetCurrentLockLocation() {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        return;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        return Vector_1.Vector.Create(this.bvn.GetBlockLocationByIndex(this.qvn));
      default:
        return;
    }
  }
  ShowAimModel(t) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        break;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        var e = t.GetComponent(138);
        this.bvn.AimBlockByIndex(this.qvn, e);
    }
  }
  GetIsIllegal(t) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        return false;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        var e = t.GetComponent(138);
        return this.bvn.CheckJigsawBlockIllegal(e, this.qvn);
      default:
        return false;
    }
  }
  GetIsCorrect(t, e) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        return true;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        var i = t.GetComponent(138);
        return this.bvn.CheckJigsawBlockCorrect(i, e ?? this.qvn);
      default:
        return true;
    }
  }
  GetMatchSequence(t) {
    t = this.Gvn(t);
    if (t) {
      return t.Animation.MatchSequence;
    }
  }
  GetMismatchSequence(t) {
    t = this.Gvn(t);
    if (t) {
      return t.Callback.DischargeSequence;
    }
  }
  GetMatchSequenceOffset(t) {
    t = this.Gvn(t)?.Animation.MatchSequenceOffset;
    return Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
  }
  GetSocketRotator(t) {
    var e = this.GetSocketRotatorOffset(t);
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.GetSocketName(t));
    var t = t ? this.n$t.GetSocketTransform(t) : this.n$t.ActorTransform;
    return Rotator_1.Rotator.Create(t.TransformRotation(e.Quaternion().ToUeQuat()).Rotator());
  }
  GetSocketRotatorOffset(t) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        var e = this.Gvn(t).Animation.MatchRot;
        return Rotator_1.Rotator.Create(e.Y ?? 0, e.Z ?? 0, e.X ?? 0);
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        e = t.GetComponent(138);
        return Rotator_1.Rotator.Create(0, -e.Rotation, 0);
      default:
        return Rotator_1.Rotator.ZeroRotatorProxy;
    }
  }
  Gvn(e) {
    if (e?.Valid) {
      let t = undefined;
      if (t = this.Nvn(this.wvn)) {
        return t;
      }
      if (e.GetComponent(0).GetBaseInfo()) {
        for (var [i, n] of this.Bvn) {
          if (this.YCa(i, e)) {
            t = n;
            this.wvn = -1;
            break;
          }
        }
        return t;
      }
    }
  }
  Nvn(e) {
    if (e !== undefined && !(e < 0) && !(e >= this.Bvn.size)) {
      var i = this.Bvn.values();
      let t = e;
      while (--t >= 0) {
        i.next();
      }
      return i.next().value;
    }
  }
  get EntityInSocket() {
    return this.xvn;
  }
  set EntityInSocket(t) {
    this.xvn = t;
  }
  set MatchCfgIndex(t) {
    this.wvn = t ?? -1;
  }
  get MatchCfgIndex() {
    return this.wvn;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemOutletComponent_1)[0];
    this.n$t = this.Entity.GetComponent(202);
    this.Lie = this.Entity.GetComponent(205);
    this.Config = t;
    if (this.Config.Config.Type === IComponent_1.EItemFoundation.CategoryMatching) {
      for (const i of this.Config.Config.MatchingConfigs) {
        var e = i.Condition.EntityMatch;
        this.Bvn.set(e, i);
      }
    }
    this.xvn = undefined;
    this.wvn = -1;
    this.Entity.GetComponent(121).SetLogicRange(ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange);
    return true;
  }
  OnStart() {
    this.n$t.Owner.Tags.Add(SCENE_ITEM_OUTLET_TAG);
    this.Lie?.AddTagAddOrRemoveListener(-662723379, this.BJa);
    this.Lie?.AddTagAddOrRemoveListener(-709838471, this.BJa);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe);
    var t = this.Entity.GetComponent(196);
    if (t.HasTag(-662723379) || t.HasTag(-709838471)) {
      t.AddTag(-1381638598);
    } else if (t.HasTag(-3775711)) {
      t.AddTag(-171146886);
    }
    return true;
  }
  OnActivate() {
    if (this.Config.Config.Type === IComponent_1.EItemFoundation.BuildingBlock || this.Config.Config.Type === IComponent_1.EItemFoundation.PulseDevice) {
      this.bvn = this.Entity.GetComponent(137);
      if (!this.bvn) {
        return false;
      }
    } else if (this.Config.Config.Type === IComponent_1.EItemFoundation.RangeAdsorption) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
      if (!StringUtils_1.StringUtils.IsEmpty(this.Config.Config.Animation.MoveCurve)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.Config.Config.Animation.MoveCurve, UE.CurveFloat, t => {
          if (t) {
            this.IVs = t;
          }
        });
      }
    }
    return true;
  }
  OnEnd() {
    this.Lie?.RemoveTagAddOrRemoveListener(-662723379, this.BJa);
    this.Lie?.RemoveTagAddOrRemoveListener(-709838471, this.BJa);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
    }
    return true;
  }
  CheckMatchManipulatable(t) {
    var e = t?.GetComponent(0)?.GetBaseInfo();
    if (!e) {
      return false;
    }
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
        return this.CheckCategoryMatchingMatchManipulatable(t);
      case IComponent_1.EItemFoundation.RangeAdsorption:
        return this.CheckRangeAdsorptionMatchManipulatable(e);
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        return true;
      default:
        return false;
    }
  }
  CheckCategoryMatchingMatchManipulatable(t) {
    var e;
    var i;
    var n = this.Entity.GetComponent(196);
    for ([e, i] of this.Bvn) {
      if (this.YCa(e, t)) {
        if (i.Condition.SelfState) {
          var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.Condition.SelfState);
          if (!n?.HasTag(r)) {
            continue;
          }
        }
        return true;
      }
    }
    return false;
  }
  CheckRangeAdsorptionMatchManipulatable(t) {
    var e = this.Config.Config;
    if (e.Condition.EntityMatch) {
      if (!(0, IUtil_1.isEntitiyMatch)(e.Condition.EntityMatch, t.Category)) {
        return false;
      }
      if (e.Condition.SelfState) {
        t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.Condition.SelfState);
        e = this.Entity.GetComponent(196);
        if (!e) {
          return false;
        }
        if (!e.HasTag(t)) {
          return false;
        }
      }
    }
    return true;
  }
  ChangeSilentTag() {
    var t = this.Entity.GetComponent(196);
    if (t.HasTag(-1381638598)) {
      t.RemoveTag(-1381638598);
      t.AddTag(-1603486396);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 31, "[底座] ChangeSilentTag", ["State", t.GetTagNames()]);
    }
  }
  GetOutletMatchType() {
    return this.Entity.GetComponent(0).GetBaseInfo()?.Category?.ItemFoundation;
  }
  IsLockOrSlient() {
    var t = this.Entity.GetComponent(196);
    return t.HasTag(-662723379) || t.HasTag(-709838471);
  }
  MultiplayerLimitTypeCheck() {
    var t = this.Entity.GetComponent(0).GetEntityOnlineInteractType();
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t, false);
  }
  CanSetNewItem() {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
      case IComponent_1.EItemFoundation.RangeAdsorption:
        return this.xvn === undefined;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        return this.bvn.HasEmptySocket();
      default:
        return false;
    }
  }
  GetCurrentChooseIndex() {
    return this.qvn;
  }
  NSa(t, e) {
    var i = t.GetComponent(1);
    this.GVs.DeepCopy(i.ActorLocationProxy);
    this.NVs.DeepCopy(i.ActorRotationProxy);
    var i = this.n$t.ActorTransform;
    var n = Vector_1.Vector.Create(e.Animation.MatchPos.X ?? 0, e.Animation.MatchPos.Y ?? 0, e.Animation.MatchPos.Z ?? 0);
    this.OVs.DeepCopy(i.TransformPosition(n.ToUeVector()));
    var n = Rotator_1.Rotator.Create(e.Animation.MatchRot.Y ?? 0, e.Animation.MatchRot.Z ?? 0, e.Animation.MatchRot.X ?? 0);
    this.kVs.DeepCopy(i.TransformRotation(n.Quaternion().ToUeQuat()).Rotator());
    var e = t.GetComponent(156);
    e.AdsorbedState?.InitAdsorptionConfig(this.IVs, this.OVs, this.kVs);
    e.SetState(12, "ChangeToAdsorbState");
    e.TargetOutletComponent = this;
  }
  YCa(t, e) {
    var i = e.GetComponent(0).GetBaseInfo();
    if (!i) {
      return false;
    }
    if (!(0, IUtil_1.isEntitiyMatch)(t, i.Category)) {
      return false;
    }
    if (t.State?.State && !e.GetComponent(196)?.ContainsTagByName(t.State.State)) {
      return false;
    }
    if (t.EntityIds?.length) {
      i = e.GetComponent(0).GetPbDataId();
      if (!i || !t.EntityIds.includes(i)) {
        return false;
      }
    }
    return true;
  }
  RequestMatch(t) {
    switch (this.Config.Config.Type) {
      case IComponent_1.EItemFoundation.CategoryMatching:
      case IComponent_1.EItemFoundation.RangeAdsorption:
        this.Kpn(t);
        break;
      case IComponent_1.EItemFoundation.BuildingBlock:
      case IComponent_1.EItemFoundation.PulseDevice:
        this.fza(t);
    }
  }
  Kpn(t) {
    var e = this.Entity.GetComponent(0).GetCreatureDataId();
    var i = t.GetComponent(0).GetCreatureDataId();
    var n = t.GetComponent(202);
    const r = t.GetComponent(156);
    t = Protocol_1.Aki.Protocol.Sds.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    t._Kn = MathUtils_1.MathUtils.NumberToLong(i);
    t.uKn = 1;
    e = Protocol_1.Aki.Protocol.Gks.create();
    i = n.ActorLocationProxy;
    e.X = i.X;
    e.Y = i.Y;
    e.Z = i.Z;
    i = Protocol_1.Aki.Protocol.D2s.create();
    n = n.ActorRotationProxy;
    i.Pitch = n.Pitch;
    i.Roll = n.Roll;
    i.Yaw = n.Yaw;
    t.l8n = e;
    t._8n = i;
    Net_1.Net.Call(19089, t, t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 31, "[Manipulate] Match outlet net response!", ["active", t.uKn]);
      }
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 24533);
      } else {
        r.AfterRequestMatch(t.uKn === 1, this.Entity);
      }
    });
  }
  fza(t) {
    var e = Protocol_1.Aki.Protocol.ZJn.create();
    var i = Protocol_1.Aki.Protocol.TFs.create();
    var n = Protocol_1.Aki.Protocol.LFs.create();
    var r = Protocol_1.Aki.Protocol.Gks.create();
    var o = Protocol_1.Aki.Protocol.D2s.create();
    var s = t.GetComponent(138);
    var a = t.GetComponent(202);
    var h = a.ActorLocationProxy;
    var a = a.ActorRotationProxy;
    i.N5n = this.qvn.Row;
    i.F5n = this.qvn.Col;
    i.V5n = s.Rotation;
    r.X = h.X;
    r.Y = h.Y;
    r.Z = h.Z;
    o.Pitch = a.Pitch;
    o.Roll = a.Roll;
    o.Yaw = a.Yaw;
    n.l8n = r;
    n._8n = o;
    e.G5n = MathUtils_1.MathUtils.NumberToLong(this.Entity.GetComponent(0).GetCreatureDataId());
    e.O5n = MathUtils_1.MathUtils.NumberToLong(t.GetComponent(0).GetCreatureDataId());
    e.H5n = 1;
    e.k5n = i;
    e.sKn = n;
    Net_1.Net.Call(21518, e, t => {
      if (t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 24533);
      }
    });
  }
  GetType() {
    return this.Config.Config.Type;
  }
};
SceneItemOutletComponent = SceneItemOutletComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(161)], SceneItemOutletComponent);
exports.SceneItemOutletComponent = SceneItemOutletComponent; //# sourceMappingURL=SceneItemOutletComponent.js.map