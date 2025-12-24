"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var m = e.length - 1; m >= 0; m--) {
      if (s = e[m]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, n, r) : s(t, n)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbItemComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const RbBreakableObstacleItemLogic_1 = require("./ItemLogic/RbBreakableObstacleItemLogic");
const RbBaseComponent_1 = require("./RbBaseComponent");
let RbItemComponent = class RbItemComponent extends RbBaseComponent_1.RbBaseComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.rPm = undefined;
    this.OnStateChange = e => {
      if (this.rPm) {
        this.rPm.OnStateChange(e);
      }
    };
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    if (!this.EIe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbItemComp] CreatureDataComp is null");
      }
      return false;
    }
    this.Hte = this.Entity.GetComponent(212);
    if (!this.Hte) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbItemComp] ActorComp is null");
      }
      return false;
    }
    var e = this.EIe?.RbItemInfo?.idf;
    if (e) {
      for (const t of e) {
        this.OccupiedCellIndex.push(new SceneItemJigsawBaseComponent_1.JigsawIndex(t.iPs, t.rPs));
      }
    }
    return true;
  }
  OnActualShow() {
    this.oPm();
  }
  oPm() {
    var e = this.EIe.RbItemInfo;
    if (e) {
      if (e.sPm !== undefined) {
        this.rPm = new RbBreakableObstacleItemLogic_1.RbBreakableObstacleItemLogic(this);
        this.rPm.Start(e.sPm);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "[RbItemComp] rbItemInfo is null", ["CreatureDataId", this.EIe.GetCreatureDataId()]);
    }
  }
  OnEnable() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnStateChange)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnStateChange);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.OnStateChange)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.OnStateChange);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.OnStateChange)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.OnStateChange);
    }
  }
  OnDisable() {
    if (this.rPm) {
      this.rPm.End();
      this.rPm = undefined;
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnStateChange)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnStateChange);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.OnStateChange)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.OnStateChange);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.OnStateChange)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.OnStateChange);
    }
    return true;
  }
  get ActorTransform() {
    return this.Hte.ActorTransform;
  }
  get CreatureDataId() {
    return this.EIe.GetCreatureDataId();
  }
};
RbItemComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(331)], RbItemComponent);
exports.RbItemComponent = RbItemComponent; //# sourceMappingURL=RbItemComponent.js.map