"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseHeadStateData = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const HP_BUFFER_SPEED = 0.001;
class TowerDefenseHeadStateData {
  constructor() {
    this.EntityId = 0;
    this.Position = Vector_1.Vector.Create(0, 0, 0);
    this.MaxHp = 0;
    this.Hp = 0;
    this.Shield = 0;
    this.DistanceSquared = 0;
    this.ScaleCurve = undefined;
    this.Visible = false;
    this.HpPercent = 0;
    this.HpBufferPercent = 0;
    this.ShieldPercent = 0;
    this.ActorScale = Vector_1.Vector.Create();
  }
  UpdateHp(t, s, i) {
    return (this.Hp !== t || this.MaxHp !== s || this.Shield !== i) && (this.Hp = t, this.MaxHp = s, this.Shield = i, true);
  }
  UpdatePosition(t) {
    this.Position.FromUeVector(t);
  }
  RefreshDistance(t) {
    this.DistanceSquared = Vector_1.Vector.DistSquared(this.Position, t);
  }
  Destroy() {}
  SetVisible(t) {
    this.Visible = t;
  }
  RefreshHpAndShield() {
    if (this.MaxHp <= 0) {
      this.HpPercent = 0;
      this.ShieldPercent = 0;
    } else {
      this.HpPercent = this.Hp / this.MaxHp;
      this.ShieldPercent = this.Shield / this.MaxHp;
    }
  }
  Tick(t) {
    this.r9c(t);
    this.Wzi();
  }
  Wzi() {
    var t = this.ScaleCurve.GetFloatValue(this.DistanceSquared);
    this.ActorScale.X = t;
    this.ActorScale.Y = t;
    this.ActorScale.Z = t;
  }
  r9c(t) {
    if (this.HpBufferPercent !== this.HpPercent && (this.HpBufferPercent < this.HpPercent || (this.HpBufferPercent -= HP_BUFFER_SPEED * t, this.HpBufferPercent < this.HpPercent))) {
      this.HpBufferPercent = this.HpPercent;
    }
  }
}
exports.TowerDefenseHeadStateData = TowerDefenseHeadStateData;
//# sourceMappingURL=TowerDefenseHeadStateData.js.map