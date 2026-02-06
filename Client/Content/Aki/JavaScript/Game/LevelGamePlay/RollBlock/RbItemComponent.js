"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var m = e.length - 1; m >= 0; m--) {
      if (s = e[m]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
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
const RbLightBeamItemLogic_1 = require("./ItemLogic/RbLightBeamItemLogic");
const RbBaseComponent_1 = require("./RbBaseComponent");
let RbItemComponent = class RbItemComponent extends RbBaseComponent_1.RbBaseComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.psg = undefined;
    this.RPm = undefined;
    this.OnStateChange = e => {
      if (this.RPm) {
        this.RPm.OnStateChange(e);
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
    this.psg = this.Entity.GetComponent(214);
    if (!this.psg) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbItemComp] ActorCompInternal is null");
      }
      return false;
    }
    var e = this.EIe?.RbItemInfo?.Zmf;
    if (e) {
      for (const t of e) {
        this.OccupiedCellIndex.push(new SceneItemJigsawBaseComponent_1.JigsawIndex(t.iPs, t.rPs));
      }
    }
    return true;
  }
  OnActualShow() {
    this.wPm();
  }
  wPm() {
    var e = this.EIe.RbItemInfo;
    if (e) {
      if (e.DPm !== undefined) {
        this.RPm = new RbBreakableObstacleItemLogic_1.RbBreakableObstacleItemLogic(this);
        this.RPm.Start(e.DPm);
      }
      if (e.iYf !== undefined) {
        this.RPm = new RbLightBeamItemLogic_1.RbLightBeamItemLogic(this);
        this.RPm.Start(e.iYf);
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
    if (this.RPm) {
      this.RPm.End();
      this.RPm = undefined;
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
  UpdateRollBlockItem(e) {
    if (e) {
      this.EIe.RbItemInfo = e;
      if (this.RPm && (e.DPm !== undefined && this.RPm.OnRbItemUpdate(e.DPm), e.iYf !== undefined)) {
        this.RPm.OnRbItemUpdate(e.iYf);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 93, "[UpdateRollBlockItem] rbItemInfo is null", ["CreatureDataId", this.EIe.GetCreatureDataId()]);
    }
  }
  get ActorTransform() {
    return this.psg.ActorTransform;
  }
  get CreatureDataId() {
    return this.EIe.GetCreatureDataId();
  }
  get ActorComp() {
    return this.psg;
  }
};
RbItemComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(333)], RbItemComponent);
exports.RbItemComponent = RbItemComponent; //# sourceMappingURL=RbItemComponent.js.map