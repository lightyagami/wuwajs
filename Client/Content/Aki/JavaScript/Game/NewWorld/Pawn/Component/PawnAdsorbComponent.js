"use strict";

var PawnAdsorbComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
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
exports.PawnAdsorbComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const SENSORY_RANGE = 1500;
const MAX_SPEED = 1500;
const NORMALIZE = 0.01;
const CONDITION_CHECK_TIME = 2000;
let PawnAdsorbComponent = PawnAdsorbComponent_1 = class PawnAdsorbComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.xsn = undefined;
    this.wsn = undefined;
    this.Bsn = -0;
    this.bsn = -0;
    this.qsn = -0;
    this.Gsn = undefined;
    this.fgt = undefined;
    this.Nsn = false;
    this.Osn = false;
    this.ksn = false;
    this.Fsn = undefined;
    this.LHo = undefined;
    this.Vsn = undefined;
    this.Hsn = -0;
    this.jsn = -0;
    this.Wsn = false;
    this.Ksn = -0;
    this.rzr = undefined;
    this.IsInSensoryRange = false;
    this.Rjt = false;
    this.Mne = 0;
    this.Qsn = undefined;
    this.Xsn = 0;
    this.$sn = false;
    this.Ysn = false;
    this.Jsn = () => {
      this.IsInSensoryRange = true;
    };
    this.vzr = () => {
      this.IsInSensoryRange = false;
    };
    this.gIe = (t, i) => {
      if (!this.Nsn && this.wsn) {
        this.Rjt = !!i;
        this.xk();
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(PawnAdsorbComponent_1)[0];
    this.Bsn = t.Range;
    this.bsn = t.StartVelocity;
    this.qsn = t.Acceleration;
    this.rzr = this.Entity.GetComponent(125);
    this.rzr.SetLogicRange(SENSORY_RANGE);
    this.Ore();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1);
    if (!this.Hte) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 29, "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Actor Component Undefined");
      }
      return false;
    }
    this.xsn = this.Entity.GetComponent(122);
    if (!this.xsn) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 29, "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Pawn Interact Component Undefined");
      }
      return false;
    }
    var t = this.Hte.CreatureData;
    var i = t.GetPbEntityInitData();
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 29, "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Config Invalid", ["CreatureGenID:", t.GetOwnerId()], ["PbDataId:", t.GetPbDataId()]);
      }
      return false;
    }
    this.Mne = t.GetPbDataId();
    t = t.GetBaseInfo();
    this.Qsn = t.OnlineInteractType ?? 0;
    this.wsn = this.Entity.GetComponent(200);
    if (!this.wsn) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 29, "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 LevelTagComponent Undefined", ["EntityConfigID:", this.Mne]);
      }
      return false;
    }
    if (this.wsn.HasTag(-662723379)) {
      this.Rjt = true;
    }
    t = (this.Ksn = 0, IComponent_1.getComponent)(i.ComponentsData, "InteractComponent");
    if (t) {
      this.Ksn = t.Range * t.Range;
    }
    this.fgt = Vector_1.Vector.Create();
    this.Fsn = Vector_1.Vector.Create();
    this.LHo = Vector_1.Vector.Create();
    this.Vsn = Vector_1.Vector.Create();
    this.Hsn = 0;
    return !(this.jsn = 0);
  }
  OnTick(t) {
    if (!this.Rjt && !this.ksn) {
      if (this.zsn() && this.Zsn() && (this.Nsn || this.ean(), this.ian(t), Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, this.Gsn.ActorLocationProxy) < this.Ksn)) {
        this.oan();
        this.ran();
        this.nan();
        this.xsn.ForceUpdate();
      }
    }
  }
  nan() {
    var t = Protocol_1.Aki.Protocol.tcs.create();
    t.iVn = new Array();
    var i = Protocol_1.Aki.Protocol.o4s.create();
    i.P5n = Protocol_1.Aki.Protocol.Gks.create();
    i.g8n = Protocol_1.Aki.Protocol.D2s.create();
    var e = this.Hte.ActorLocationProxy;
    var s = this.Hte.ActorRotationProxy;
    i.P5n.X = e.X;
    i.P5n.Y = e.Y;
    i.P5n.Z = e.Z;
    i.g8n.Pitch = s.Pitch;
    i.g8n.Roll = s.Roll;
    i.g8n.Yaw = s.Yaw;
    i.J8n = Time_1.Time.NowSeconds;
    t.iVn.push(i);
    CombatMessage_1.CombatNet.Send(16076, this.Entity, t);
  }
  OnEnd() {
    this.kre();
    return true;
  }
  zsn() {
    var t;
    var i;
    return !!this.Nsn || !!this.$sn || !!this.Hte && !!Global_1.Global.BaseCharacter && !!(t = Global_1.Global.BaseCharacter.CharacterActorComponent) && (i = this.Hte.ActorLocationProxy, t = t.ActorLocationProxy, i = Vector_1.Vector.DistSquared(i, t), this.Wsn = i <= this.Bsn * this.Bsn, this.Wsn);
  }
  san() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
  }
  Zsn() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return true;
    }
    switch (this.Qsn) {
      case 2:
        return false;
      case 0:
        return this.san();
      case 1:
        this.aan();
        return this.Ysn;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Interaction", 29, "[PawnAdsorbComponent] 不支持的联机模式配置");
        }
        return false;
    }
  }
  aan() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (t - this.Xsn > CONDITION_CHECK_TIME) {
      this.$sn = true;
      LevelGamePlayController_1.LevelGamePlayController.EntityAdsorbRequest(this.Mne, t => {
        if (t) {
          if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            this.Ysn = true;
          }
          this.$sn = false;
        }
      });
      this.Xsn = t;
    }
  }
  ean() {
    if (!this.Nsn && !this.ksn) {
      if (!Global_1.Global.BaseCharacter) {
        return false;
      }
      this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent;
      if (!this.Hte.Owner.IsValid() || !this.Gsn.Owner.IsValid()) {
        return false;
      }
      var t = this.Hte.ActorLocationProxy;
      this.Gsn.ActorLocationProxy.Subtraction(t, this.fgt);
      this.fgt.Normalize(NORMALIZE);
      this.Vsn = this.fgt.MultiplyEqual(this.bsn);
      this.Hsn = this.bsn;
      this.jsn = 0;
      this.Nsn = true;
    }
    return true;
  }
  ian(t) {
    var i;
    if (this.Nsn && !this.ksn && Global_1.Global.BaseCharacter && (this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent, this.Hte.Owner.IsValid()) && this.Gsn.Owner.IsValid()) {
      i = this.Hte.ActorLocationProxy;
      this.Gsn.ActorLocationProxy.Subtraction(i, this.fgt);
      this.fgt.Normalize(NORMALIZE);
      i = t * MathUtils_1.MathUtils.MillisecondToSecond;
      this.jsn = this.qsn * i;
      this.Hsn += this.jsn;
      this.Vsn.DeepCopy(this.fgt);
      if (this.Hsn > MAX_SPEED) {
        this.Hsn = MAX_SPEED;
        this.Vsn.MultiplyEqual(MAX_SPEED);
      } else {
        this.Vsn.MultiplyEqual(this.Hsn);
      }
      this.Vsn.Multiply(i, this.Fsn);
      if (t = this.Entity.GetComponent(45)) {
        t.MoveCharacter(this.Fsn, i, "Pawn吸附更新");
      } else {
        this.Hte.AddActorWorldOffset(this.Fsn.ToUeVector(), "Pawn吸附更新", true);
      }
    }
  }
  ran() {
    if (!this.Osn) {
      this.wsn?.AddTag(1286772724);
      this.Osn = true;
    }
  }
  oan() {
    if (Global_1.Global.BaseCharacter && (this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent, this.Hte.Owner.IsValid()) && this.Gsn.Owner.IsValid()) {
      this.Hte.Owner.K2_AttachToActor(this.Gsn.Owner, undefined, 2, 1, 1, false);
      this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      this.Vsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      this.Hsn = 0;
      this.jsn = 0;
      this.ksn = true;
    }
  }
  Ore() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    this.wsn?.AddTagAddOrRemoveListener(-662723379, this.gIe);
  }
  kre() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    this.wsn?.RemoveTagAddOrRemoveListener(-662723379, this.gIe);
  }
  xk() {
    this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.Fsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.LHo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.Vsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.Hsn = 0;
    this.jsn = 0;
  }
};
PawnAdsorbComponent = PawnAdsorbComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(119)], PawnAdsorbComponent);
exports.PawnAdsorbComponent = PawnAdsorbComponent; //# sourceMappingURL=PawnAdsorbComponent.js.map