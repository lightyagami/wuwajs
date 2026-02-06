"use strict";

var GamePlayWalkingPatternComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        n = (h < 3 ? o(n) : h > 3 ? o(i, e, n) : o(i, e)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayWalkingPatternComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils");
const TsGameSplineActor_1 = require("../../LevelGamePlay/Common/TsGameSplineActor");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
let GamePlayWalkingPatternComponent = GamePlayWalkingPatternComponent_1 = class GamePlayWalkingPatternComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.HFl = undefined;
    this.Hnr = undefined;
    this.zie = undefined;
    this.WFl = undefined;
    this.QFl = undefined;
    this.KFl = undefined;
    this.$Fl = undefined;
    this.qsh = undefined;
    this.Fsh = 0;
    this.Hln = 0;
    this.Wlh = 0;
    this.XFl = 0;
    this.YFl = 0;
    this.zFl = undefined;
    this.JFl = new Queue_1.Queue();
    this.ZFl = undefined;
    this.e3l = undefined;
    this.Vsh = 0;
    this.r$t = false;
    this.ksh = 0;
    this.Nsh = 0;
    this.wdt = -1;
    this.Qlh = -1;
    this.Nme = Vector_1.Vector.Create();
    this.Hsh = Vector_1.Vector.Create();
    this.GCu = -1;
    this.FCu = -1;
    this.NCu = 0;
    this.VCu = 0;
    this.g_n = (t, i) => {
      this.t3l(t);
    };
    this.Etn = t => {
      var i;
      if (t && !this.r$t && (this.r$t = true, i = this.Nsh / this.ksh, this.Vsh = 0, i >= this.Fsh && i <= this.Hln ? this.Vsh = 100 - (i - this.Fsh) / (this.Hln - this.Fsh) * 100 : i < this.Fsh ? this.Vsh = 100 : this.Vsh = 0, this.Vsh = Math.min(this.Vsh, this.Qlh / this.wdt * 100), t)) {
        this.EDe();
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(GamePlayWalkingPatternComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(214);
    this.mBe = this.Entity.GetComponent(144);
    this.HFl = this.Disable("GamePlayWalkingPatternComponent 默认关闭Tick");
    this.i3l();
    this.r3l();
    this.mSe();
    this.t3l(this.mBe.StateTagId);
    if (this.Lo?.StayAwayFailConfig) {
      this.GCu = this.Lo.StayAwayFailConfig.SplineDistance;
      this.FCu = this.Lo.StayAwayFailConfig.StayAwayTime ?? -1;
    }
    return true;
  }
  i3l() {
    this.Hnr = ActorSystem_1.ActorSystem.Get(TsGameSplineActor_1.default.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.zie = GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(this.Lo.SplineEntityId, this.Hnr);
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.Lo.SplineEntityId);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[GamePlayWalkingPatternComponent]找不到entityData", ["SplineEntityId", this.Lo.SplineEntityId]);
      }
    } else if ((t = (0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent")) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[GamePlayWalkingPatternComponent]找不到SplineComponent", ["SplineEntityId", this.Lo.SplineEntityId]);
      }
    } else if (t.Option.Type !== IComponent_1.ESplineType.Effect) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[GamePlayWalkingPatternComponent]引用的样条不是Effect类型", ["SplineEntityId", this.Lo.SplineEntityId]);
      }
    } else {
      this.WFl = t.Option.Effect;
      this.QFl = this.Lo.SpineEffectExistDuration;
      this.ZFl = this.Lo.ReplaySpineEffect;
    }
  }
  o3l() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.EndEntityId);
    if (t?.Valid && t.Entity?.Valid) {
      this.qsh = t.Entity;
      EventSystem_1.EventSystem.AddWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 31, "[WalkingPatternBehaviorNode]找不到EndEntity", ["EndEntityId", this.Lo.EndEntityId]);
    }
  }
  r3l() {
    var t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.MinDist");
    if (t) {
      this.Fsh = parseInt(t.Value);
    }
    if (t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.MaxDist")) {
      this.Hln = parseInt(t.Value);
    }
    if (t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.CheckPointDist")) {
      this.Wlh = parseInt(t.Value);
    }
    if (t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.StepNum")) {
      this.XFl = parseInt(t.Value);
    }
    if (t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.RecordMinDist")) {
      this.YFl = parseInt(t.Value);
    }
  }
  mSe() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
  }
  OnTick(t) {
    var i = Global_1.Global.BaseCharacter;
    if (i) {
      this.Nme.FromUeVector(i.D_K2_GetActorLocation());
      if (this.zFl === undefined || !(Vector_1.Vector.Dist2D(this.zFl, this.Nme) < this.YFl)) {
        this.zFl = Vector_1.Vector.Create(this.Nme);
        this.Klh();
        this.Wsh();
        this.n3l();
        this.jCu(t);
      }
    }
  }
  Klh() {
    var t;
    var i;
    if (this.zie !== undefined && !(this.Qlh >= this.wdt)) {
      t = MathUtils_1.MathUtils.Clamp(this.Qlh, 0, this.wdt - 1);
      i = Vector_1.Vector.Create(this.zie?.D_GetLocationAtSplinePoint(t, 1));
      if (Vector_1.Vector.Dist2D(this.Nme, i) < this.Wlh) {
        this.Qlh = t + 1;
      }
    }
  }
  Wsh() {
    if (this.zie !== undefined) {
      this.Hsh.FromUeVector(this.zie.D_FindLocationClosestToWorldLocation(this.Nme.ToUeVector(), 1));
      this.VCu = Vector_1.Vector.Dist2D(this.Nme, this.Hsh);
      this.Nsh += this.VCu;
      this.ksh++;
    }
  }
  n3l() {
    var t;
    var i;
    if (Global_1.Global.BaseCharacter !== undefined && this.Hte !== undefined) {
      (t = Vector_1.Vector.Create(this.Nme)).SubtractionEqual(this.Hte.ActorLocationProxy);
      if (this.JFl.Size >= this.XFl) {
        this.JFl.Pop();
      }
      if ((i = Global_1.Global.BaseCharacter.CharacterActorComponent?.HalfHeight) !== undefined) {
        t.Z -= i;
      }
      this.JFl.Push(t);
    }
  }
  jCu(t) {
    if (!(this.GCu < 0)) {
      if (this.VCu > this.GCu) {
        this.NCu += t;
        if (this.NCu >= this.FCu) {
          this.EDe(-1);
          this.NCu = 0;
        }
      } else {
        this.NCu = 0;
      }
    }
  }
  OnEnd() {
    this.s3l();
    this.a3l();
    this.dSe();
    return true;
  }
  dSe() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
  }
  t3l(t) {
    if (t === 951335035) {
      if (this.HFl) {
        this.Enable(this.HFl, "GamePlayWalkingPatternComponent 激活态开启Tick");
        this.HFl = undefined;
      }
    } else {
      if (this.HFl === undefined) {
        this.HFl = this.Disable("GamePlayWalkingPatternComponent 非激活态关闭Tick");
      }
      if (this.qsh !== undefined && EventSystem_1.EventSystem.HasWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
      }
    }
    if (t !== 1052000749) {
      this.a3l();
    }
    switch (t) {
      case 984890273:
        this.s3l();
        this.a3l();
        break;
      case 934557416:
        this.l3l();
        this.h3l();
        break;
      case 951335035:
        this.o3l();
        this.h3l(false, this.QFl);
        break;
      case 1035223130:
        this.h3l();
        break;
      case 1052000749:
        this.h3l(false);
        this._3l();
    }
  }
  l3l() {
    this.ksh = 0;
    this.Nsh = 0;
    this.r$t = false;
    this.wdt = this.zie?.GetNumberOfSplinePoints() ?? -1;
    this.Qlh = 0;
  }
  h3l(t = true, i = undefined) {
    if (this.KFl) {
      TimerSystem_1.TimerSystem.Remove(this.KFl);
      this.KFl = undefined;
    }
    if (t) {
      if (this.$Fl) {
        this.s3l();
      }
    } else if (this.$Fl) {
      if (i !== undefined && i > 0) {
        this.KFl = TimerSystem_1.TimerSystem.Delay(() => {
          this.s3l();
        }, i * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
      return;
    }
    this.$Fl = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.WFl, "WalkingPattern");
    EffectSystem_1.EffectSystem.GetEffectActor(this.$Fl).K2_AttachToActor(this.Hnr, undefined, 2, 2, 2, false);
    if (i !== undefined && i > 0) {
      this.KFl = TimerSystem_1.TimerSystem.Delay(() => {
        this.s3l();
      }, i * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  s3l() {
    if (this.$Fl) {
      EffectSystem_1.EffectSystem.StopEffectById(this.$Fl, "WalkingPattern.StopPreviewEffect", false);
      this.$Fl = undefined;
    }
  }
  _3l() {
    if (this.ZFl !== undefined) {
      if (this.e3l) {
        this.a3l();
      }
      var t = UE.NewArray(UE.VectorDouble);
      for (; !this.JFl.Empty;) {
        var i = this.JFl.Pop();
        t.Add(i.ToUeVector());
      }
      var e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(this.Hte.ActorLocationProxy, t, this.ZFl);
      this.e3l = e?.EffectHandle;
    }
  }
  a3l() {
    if (this.e3l) {
      EffectSystem_1.EffectSystem.StopEffectById(this.e3l, "WalkingPattern.StopPlaybackEffect", false);
      this.e3l = undefined;
    }
  }
  EDe(t = undefined) {
    var i = Protocol_1.Aki.Protocol.L0_.create();
    i.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
    i.F4n = this.Hte.CreatureData.GetCreatureDataId();
    i.Eps = t ?? this.Vsh;
    Net_1.Net.Call(28374, i, t => {
      if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 26531);
      }
    });
    if (this.HFl === undefined) {
      this.HFl = this.Disable("GamePlayWalkingPatternComponent 请求完成后关闭Tick");
    }
  }
};
GamePlayWalkingPatternComponent = GamePlayWalkingPatternComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(296)], GamePlayWalkingPatternComponent);
exports.GamePlayWalkingPatternComponent = GamePlayWalkingPatternComponent; //# sourceMappingURL=GamePlayWalkingPatternComponent.js.map