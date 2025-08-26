"use strict";

var __decorate = this && this.__decorate || function (t, e, s, n) {
  var o;
  var i = arguments.length;
  var r = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, s) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, s, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        r = (i < 3 ? o(r) : i > 3 ? o(e, s, r) : o(e, s)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(e, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnSensoryComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PawnSensoryInfoController_1 = require("../Controllers/PawnSensoryInfoController");
const TICK_INTERVAL_TIME = 1000;
let PawnSensoryComponent = class PawnSensoryComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Uhn = 0;
    this.Ahn = undefined;
    this.Phn = -0;
    this.Ioe = [];
    this.Hte = undefined;
    this.Wnr = Vector_1.Vector.Create();
  }
  OnInit() {
    this.Uhn = 0;
    this.Phn = 0;
    this.Hte = this.Entity.GetComponent(1);
    this.Wnr.DeepCopy(this.Hte.ActorLocationProxy);
    this.Ahn = new PawnSensoryInfoController_1.SensoryInfoController();
    return true;
  }
  AddSensoryInfo(t) {
    this.Hte ||= this.Entity.GetComponent(1);
    t = this.Ahn.AddSensoryInfo(t);
    this.xhn();
    return t;
  }
  RemoveSensoryInfo(t) {
    this.Ahn.RemoveSensoryInfo(t);
    this.xhn();
  }
  xhn() {
    var t = this.Ahn.MaxSensoryRange;
    if (this.Uhn !== t) {
      this.Uhn = t;
    }
  }
  OnTick(t) {
    if (this.Hte && this.Ahn && this.Ahn.SensoryInfoType !== 0) {
      this.Ahn.Tick(t);
      this.Phn += t;
      if (!(this.Phn < TICK_INTERVAL_TIME)) {
        this.Phn = 0;
        if (this.Ioe) {
          if (!this.Wnr.Equals(this.Hte.ActorLocationProxy)) {
            this.Wnr.DeepCopy(this.Hte.ActorLocationProxy);
          }
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.Hte.ActorLocationProxy, this.Uhn, 255, this.Ioe);
          this.Ahn.HandleEntities(this.Ioe, this.Hte.ActorLocationProxy, this.Entity.Id);
        }
      }
    }
  }
  OnClear() {
    this.Ioe.length = 0;
    this.Ahn?.Clear();
    return true;
  }
};
PawnSensoryComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(121)], PawnSensoryComponent);
exports.PawnSensoryComponent = PawnSensoryComponent; //# sourceMappingURL=PawnSensoryComponent.js.map