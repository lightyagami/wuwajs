"use strict";

var __decorate = this && this.__decorate || function (t, i, e, o) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        s = (n < 3 ? r(s) : n > 3 ? r(i, e, s) : r(i, e)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(i, e, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleInhalationComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
let RoleInhalationComponent = class RoleInhalationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Rne = undefined;
    this.Hte = undefined;
    this.Kel = -1;
    this.$el = false;
    this.Xel = 0;
    this.jgl = undefined;
    this.DKo = [];
    this.Yel = new Set();
    this.Wgl = -1;
    this.r7r = Vector_1.Vector.Create();
  }
  OnActivate() {
    this.Hte = this.Entity.GetComponent(3);
    this.Rne = this.Disable("RoleInhalationComponent 默认关闭Tick");
  }
  OnTick(t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(this.Xel, 7, this.DKo);
    for (const r of this.DKo) {
      var i;
      var e = r.Entity;
      if (e?.Valid && this.zel(e, false) && ((i = e.GetComponent(265)).StartInhalation(this.Entity), this.Yel.add(i), i = e.GetComponent(0))) {
        GlobalData_1.GlobalData.BpEventManager.开始吸取污染物.Broadcast(i.GetPbDataId());
      }
    }
    for (const n of this.Yel) {
      var o;
      if (n?.Valid && n.Entity?.Valid) {
        if (!this.zel(n.Entity, true) && (n.StopInhalation(), this.Yel.delete(n), o = n.Entity.GetComponent(0))) {
          GlobalData_1.GlobalData.BpEventManager.停止吸取污染物.Broadcast(o.GetPbDataId());
        }
      } else {
        this.Yel.delete(n);
      }
    }
  }
  zel(t, i) {
    var e = t.GetComponent(265);
    var o = t.GetComponent(203);
    var r = t.GetComponent(197);
    if (e === undefined || o === undefined || r === undefined) {
      return false;
    }
    if (r.HasTag(-991879492)) {
      return false;
    }
    if (this.Yel.has(e) && !i) {
      return false;
    }
    if (e.IsInCooldown) {
      return false;
    }
    t = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy);
    o = Vector_1.Vector.Create(o.ActorLocation);
    if (Vector_1.Vector.Dist(t, o) > this.Xel) {
      return false;
    }
    if (e.IsHaling && !i) {
      return false;
    }
    if (this.Wgl !== -1 && !this.$el) {
      CameraController_1.CameraController.CameraRotator.Vector(this.r7r);
      this.r7r.Normalize();
      t = Vector_1.Vector.Create(0, 0, 0);
      o.Subtraction(CameraController_1.CameraController.CameraLocation, t);
      t.Normalize();
      i = MathUtils_1.MathUtils.DotProduct(t, this.r7r);
      if (i < Math.cos(this.Wgl * Math.PI / 180)) {
        return false;
      }
    }
    if (this.jgl && this.jgl.length > 0) {
      for (const n of this.jgl) {
        if (!r.HasTag(n)) {
          return false;
        }
      }
    }
    return !(e.InhaledStrength > this.Kel);
  }
  StartInhalation(t, i, e, o, r) {
    if (this.Rne !== undefined && (this.Enable(this.Rne, "RoleInhalationComponent 开始吸取"), this.Rne = undefined, this.Kel = t, this.Xel = i, this.$el = e, this.Wgl = o, this.jgl = [], r !== undefined)) {
      for (const n of r) {
        this.jgl.push(n.TagId);
      }
    }
  }
  StopInhalation() {
    if (this.Rne === undefined) {
      this.Wgl = -1;
      this.Rne = this.Disable("RoleInhalationComponent 停止吸取");
      for (const t of this.Yel) {
        t.StopInhalation();
      }
      this.Yel.clear();
    }
  }
};
RoleInhalationComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], RoleInhalationComponent);
exports.RoleInhalationComponent = RoleInhalationComponent; //# sourceMappingURL=RoleInhalationComponent.js.map