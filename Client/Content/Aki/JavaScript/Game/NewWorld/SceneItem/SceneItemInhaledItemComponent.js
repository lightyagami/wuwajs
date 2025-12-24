"use strict";

var SceneItemInhaledItemComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var h = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (n = t[r]) {
        h = (o < 3 ? n(h) : o > 3 ? n(e, i, h) : n(e, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemInhaledItemComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SENSORY_RANGE = 3000;
const performanceStateTag = new Map([[0, 1854980392], [1, -600747586], [2, 213628921], [3, 1534204131]]);
let SceneItemInhaledItemComponent = SceneItemInhaledItemComponent_1 = class SceneItemInhaledItemComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.etl = -1;
    this.ttl = -1;
    this.Rne = -1;
    this.ac = 0;
    this.kTl = 5;
    this.e_l = -1;
    this.wmo = -1;
    this.t_l = -1;
    this.cAl = undefined;
    this.mAl = -1;
    this.IsInCooldown = false;
    this.g_n = (t, e) => {
      this.OTl();
    };
  }
  get IsHaling() {
    return this.ac !== 0;
  }
  get InhaledStrength() {
    return this.Lo?.InhaledStrength;
  }
  get NTl() {
    return this.kTl;
  }
  set NTl(t) {
    var e;
    if (this.kTl !== t && ((e = performanceStateTag.get(this.kTl)) !== undefined && this.Lie?.RemoveTag(e), this.kTl = t, (e = performanceStateTag.get(this.kTl)) !== undefined)) {
      this.Lie?.AddTag(e);
    }
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemInhaledItemComponent_1)[0];
    this.Lo = t;
    this.etl = this.Lo.InhaledPerformance.InhaledTime * TimeUtil_1.TimeUtil.InverseMillisecond;
    if (this.Lo.InhaledInterruptionRecoveryTime) {
      this.mAl = this.Lo.InhaledInterruptionRecoveryTime * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    return true;
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(215);
    this.Hte = this.Entity.GetComponent(212);
    this.Rne = this.Disable("SceneItemInhaledItemComponent 默认关闭Tick");
    this.Entity.GetComponent(130).SetLogicRange(SENSORY_RANGE);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    var t = this.Hte.CreatureData.GetBaseInfo();
    switch (t.Category.InhaledItemType) {
      case "LonelyDollPollutant":
        this.Lie.AddTag(36602954);
        break;
      case "LonelyDollPinkPollutant":
        this.Lie.AddTag(-422907888);
        break;
      case "LonelyDollRedPollutant":
        this.Lie.AddTag(-368786161);
    }
    this.OTl();
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    return true;
  }
  OnTick(t) {
    switch (this.ac) {
      case 0:
        break;
      case 1:
        this.itl(t);
    }
  }
  itl(t) {
    if (this.ttl === -1) {
      this.ttl = t;
    } else {
      this.ttl += t;
    }
    if (this.ttl >= this.etl) {
      this.StopInhalation(false);
      this.rtl();
    }
  }
  StartInhalation(t) {
    if (this.ac === 0) {
      this.ac = 1;
      this.Enable(this.Rne, "SceneItemInhaledItemComponent 开始吸入");
      this.Rne = -1;
      this.Lie?.AddTag(-729639866);
      this.OTl();
      var e = t.GetComponent(0);
      if (e !== undefined) {
        switch (e.GetEntityType()) {
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
            this.e_l = e.GetCreatureDataId();
            this.wmo = 0;
            this.t_l = 0;
            break;
          case Protocol_1.Aki.Protocol.kks.Proto_Player:
            this.e_l = 0;
            this.wmo = t.GetComponent(41)?.CurrentSkill?.SkillId ?? -1;
            this.t_l = 1;
        }
      }
    }
  }
  StopInhalation(t = true) {
    if (this.ac !== 0) {
      this.ac = 0;
      this.Rne = this.Disable("sceneItemInhaledItemComponent 停止吸入");
      this.Lie?.RemoveTag(-729639866);
      if (t) {
        this.OTl();
        this.dAl();
      }
      this.ttl = -1;
    }
  }
  dAl() {
    if (this.cAl !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.cAl);
    }
    if (!(this.mAl <= 0)) {
      this.IsInCooldown = true;
      this.cAl = TimerSystem_1.TimerSystem.Delay(() => {
        this.IsInCooldown = false;
        this.cAl = undefined;
      }, this.mAl);
    }
  }
  rtl() {
    var t;
    if (!(this.e_l < 0) && !(this.wmo < 0) && !(this.t_l < 0)) {
      (t = Protocol_1.Aki.Protocol.CC_.create()).uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      t.h5n = this.t_l;
      t.i_l = MathUtils_1.MathUtils.NumberToLong(this.e_l);
      t.r5n = this.wmo;
      t.r_l = [MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId())];
      Net_1.Net.Call(29183, t, t => {
        if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 20666);
        }
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "成功吸取污染物");
      }
    }
  }
  OTl() {
    var t = this.IsHaling;
    if (this.Lie?.HasTag(-1152559349)) {
      this.NTl = t ? 2 : 0;
    } else if (this.Lie?.HasTag(-3775711)) {
      this.NTl = t ? 3 : 1;
    } else if (this.Lie?.HasTag(-1278190765)) {
      this.NTl = 4;
    }
  }
};
SceneItemInhaledItemComponent = SceneItemInhaledItemComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(287)], SceneItemInhaledItemComponent);
exports.SceneItemInhaledItemComponent = SceneItemInhaledItemComponent; //# sourceMappingURL=SceneItemInhaledItemComponent.js.map