"use strict";

var BatchBulletCasterComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, s) {
  var i;
  var r = arguments.length;
  var n = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, o) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        n = (r < 3 ? i(n) : r > 3 ? i(e, o, n) : i(e, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BatchBulletCasterComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const BulletCasterBatch_1 = require("../../BulletCaster/BulletCasterBatch");
let BatchBulletCasterComponent = BatchBulletCasterComponent_1 = class BatchBulletCasterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.mBe = undefined;
    this.R0n = undefined;
    this.CCl = 0;
    this.gCl = [];
    this.pCl = false;
    this.oFe = () => {
      if (this.mBe.IsInState(2)) {
        this.fCl();
      } else {
        this.vCl();
      }
    };
  }
  OnInitData(t) {
    var e = t?.GetParam(BatchBulletCasterComponent_1)?.[0];
    if (!e) {
      return false;
    }
    this.R0n = e;
    this.EIe = this.Entity.GetComponent(0);
    t = this.EIe?.ComponentDataMap.get("hI_");
    if (!t) {
      return false;
    }
    var o = MathUtils_1.MathUtils.LongToBigInt(t.hI_._Vn);
    var s = [];
    for (const h of e.BulletList) {
      var i = Transform_1.Transform.Create();
      var r = h.Pos;
      var n = h.Rot;
      MathUtils_1.MathUtils.CommonTempVector.Set(r.X ?? 0, r.Y ?? 0, r.Z ?? 0);
      i.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.CommonTempRotator.Set(n.Y ?? 0, n.Z ?? 0, n.X ?? 0);
      i.SetRotation(MathUtils_1.MathUtils.CommonTempRotator.Quaternion());
      i.SetScale3D(Vector_1.Vector.OneVectorProxy);
      s.push(i);
    }
    this.CCl = 0;
    this.CCl = e.BatchList.reduce((t, e) => e.Time > t ? e.Time : t, -Infinity);
    for (const l of e.BatchList) {
      var a = new BulletCasterBatch_1.BulletCasterBatch(this.Entity, this.CCl, l.Time, l.CasterList, e.WarningEffect, o, s, e.MovementType);
      this.gCl.push(a);
    }
    return true;
  }
  OnStart() {
    this.mBe = this.Entity.GetComponent(142);
    return true;
  }
  OnActivate() {
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe);
    if (!this.mBe.IsInState(0)) {
      this.oFe();
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.vCl();
    return true;
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(131)?.CurrentTimeScale ?? 1;
    for (const o of this.gCl) {
      o.SetTimeDilation(t * e);
    }
  }
  fCl() {
    if (!!this.R0n && !(this.R0n.BatchList.length < 0) && !(this.CCl <= 0) && !this.pCl) {
      this.pCl = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[BatchBulletCasterComponent] StartLoop", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      for (const t of this.gCl) {
        t.Start();
      }
    }
  }
  vCl() {
    if (this.pCl) {
      this.pCl = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[BatchBulletCasterComponent] StopLoop", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      for (const t of this.gCl) {
        t.Stop();
      }
    }
  }
};
BatchBulletCasterComponent = BatchBulletCasterComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(284)], BatchBulletCasterComponent);
exports.BatchBulletCasterComponent = BatchBulletCasterComponent; //# sourceMappingURL=BatchBulletCasterComponent.js.map