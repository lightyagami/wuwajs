"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudEntityData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class HudEntityData {
  constructor() {
    this.Jh = undefined;
    this.mPt = new Map();
    this.NYe = [];
    this.eoi = undefined;
    this.toi = (t, e) => {
      if (this.eoi) {
        this.eoi(this, e);
      }
    };
  }
  Initialize(t) {
    this.Jh = t;
  }
  Destroy() {
    this.Jh = undefined;
    this.mPt.clear();
    this.eoi = undefined;
    this.ClearAllTagCountChangedCallback();
  }
  SetComponent(t) {
    var e = this.Jh.GetComponent(t);
    this.mPt.set(t, e);
  }
  GetComponent(t) {
    t = this.mPt.get(t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HudUnit", 17, "获取Hud实体数据时，找不到实体对应组件，请在初始化时调用SetComponent记录对应组件");
      }
    }
    return t;
  }
  IsValid() {
    return !!ObjectSystem_1.ObjectSystem.IsValid(this.Jh) && !!ControllerHolder_1.ControllerHolder.CharacterController.GetCharacter(this.Jh);
  }
  GetId() {
    return this.Jh.Id;
  }
  ListenForTagCountChanged(t, e) {
    var r = this.GetComponent(205);
    if (r) {
      this.eoi = e;
      e = r.ListenForTagAddOrRemove(t, this.toi);
      this.NYe.push(e);
    }
  }
  ClearAllTagCountChangedCallback() {
    if (this.NYe) {
      for (const t of this.NYe) {
        t.EndTask();
      }
      this.NYe.length = 0;
    }
  }
  ContainsTagById(t) {
    return this.GetComponent(205).HasTag(t);
  }
  GetLocationProxy() {
    return this.GetComponent(1).ActorLocationProxy;
  }
  GetLocation() {
    return this.GetComponent(1).ActorLocation;
  }
  GetMonsterMatchType() {
    return this.GetComponent(0).GetMonsterMatchType();
  }
  GetMonsterMatchTypeNumber() {
    var t = this.GetMonsterMatchType();
    return t || 0;
  }
  GetDistanceSquaredTo(t) {
    var e = this.GetLocationProxy();
    return Vector_1.Vector.DistSquared(t, e);
  }
  GetEntity() {
    return this.Jh;
  }
}
exports.HudEntityData = HudEntityData;
//# sourceMappingURL=HudEntityData.js.map