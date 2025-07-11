"use strict";

var __decorate = this && this.__decorate || function (t, o, i, e) {
  var a;
  var n = arguments.length;
  var s = n < 3 ? o : e === null ? e = Object.getOwnPropertyDescriptor(o, i) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, o, i, e);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (a = t[h]) {
        s = (n < 3 ? a(s) : n > 3 ? a(o, i, s) : a(o, i)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(o, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const FloroRanchBuffData_1 = require("../../Data/FloroRanchBuffData");
const FloroRanchCurrencyData_1 = require("../../Data/FloroRanchCurrencyData");
const FloroRanchTagData_1 = require("../../Data/FloroRanchTagData");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityDataBaseComponent_1 = require("./FloroRanchEntityDataBaseComponent");
let FloroRanchEntityDataComponent = class FloroRanchEntityDataComponent extends FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.EntityType = 1;
    this.ConfigId = 0;
    this.Point = 0;
    this.LastPoint = 0;
    this.StartStage = 0;
    this.StartDay = 0;
    this.TagId = 0;
    this.Count = 1;
    this.IsRemove = false;
    this.Income = 0;
    this.DailySaleData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(3);
    this.TipShowBuffList = [];
    this.x9c = [];
    this.BuffMap = new Map();
    this.TagData = new FloroRanchTagData_1.FloroRanchTagData();
  }
  RefreshEntityData(t) {
    this.EntityId = t.Ziu;
    this.EntityType = t.h5n;
    this.LastPoint = this.Point;
    this.Point = t.Eps;
    this.ConfigId = t.s5n;
    this.StartStage = t.eru;
    this.StartDay = t.tru;
    this.TagId = t.m5n;
    this.TagData.SetTagId(this.TagId);
    this.lJ1(t.sru);
    this.Count = t.D8n;
    this.DailySaleData.SetAmount(Number(MathUtils_1.MathUtils.LongToBigInt(t.Sjc)));
  }
  lJ1(t) {
    this.BuffMap.clear();
    this.TipShowBuffList.length = 0;
    this.x9c.length = 0;
    for (const i of t) {
      var o = new FloroRanchBuffData_1.FloroRanchBuffData();
      o.RefreshBuffData(i);
      this.BuffMap.set(o.GetInstanceId(), o);
      this.AddBuffDataToShowList(o);
    }
  }
  UpdateBuff(t) {
    if (t.h5n === Protocol_1.Aki.Protocol.jyu.Proto_BuffOpAdd) {
      this.AddBuff(t.gSu);
    } else if (t.h5n === Protocol_1.Aki.Protocol.jyu.Proto_BuffOpRemove) {
      this.RemoveBuff(t.gSu);
    } else {
      this.RefreshBuff(t.gSu);
    }
  }
  AddBuff(t) {
    var o = this.BuffMap.get(t.Ziu);
    if (o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "Buff is already exist!", ["Entity", this.Info()], ["BuffId", o.GetConfigId()], ["BuffInstanceId", o.GetInstanceId()], ["AddBuffInstanceId", t.Ziu]);
      }
    } else {
      (o = new FloroRanchBuffData_1.FloroRanchBuffData()).RefreshBuffData(t);
      this.BuffMap.set(o.GetInstanceId(), o);
      this.AddBuffDataToShowList(o);
    }
  }
  RemoveBuff(t) {
    var o = this.BuffMap.get(t.Ziu);
    if (o) {
      this.BuffMap.delete(o.GetInstanceId());
      if (o.IsShowOnTip) {
        this.TipShowBuffList.splice(this.TipShowBuffList.indexOf(o), 1);
      }
      if (o.IsShowEffect) {
        this.x9c.splice(this.x9c.indexOf(o), 1);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "Buff is not exist!", ["Entity", this.Info()], ["BuffId", t.s5n], ["BuffInstanceId", t.Ziu]);
    }
  }
  RefreshBuff(t) {
    var o = this.BuffMap.get(t.Ziu);
    if (o) {
      o.RefreshBuffData(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "Buff is not exist!", ["Entity", this.Info()], ["BuffId", t.s5n], ["BuffInstanceId", t.Ziu]);
    }
  }
  AddBuffDataToShowList(t) {
    if (t.IsShowOnTip) {
      this.TipShowBuffList.push(t);
    }
    if (t.IsShowEffect) {
      this.x9c.push(t);
    }
  }
  GetMinRemindDayBuff() {
    if (this.x9c.length !== 0) {
      return this.x9c.reduce((t, o) => o.RemindDay < t.RemindDay ? o : t, this.x9c[0]);
    }
  }
  Info() {
    return `EntityId: ${this.EntityId}, EntityType: ${this.EntityType}, Point: ${this.Point}, TagId: ${this.TagId}`;
  }
  DebugInfo() {
    return "EntityId: " + this.EntityId;
  }
  get IsValid() {
    return !this.IsRemove;
  }
};
FloroRanchEntityDataComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(0)], FloroRanchEntityDataComponent);
exports.FloroRanchEntityDataComponent = FloroRanchEntityDataComponent; //# sourceMappingURL=FloroRanchEntityDataComponent.js.map