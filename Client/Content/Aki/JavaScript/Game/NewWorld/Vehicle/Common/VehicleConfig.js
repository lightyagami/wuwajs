"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleConfig = exports.PARAGLIDING_DELAY_MILISECONDS = exports.DEFAULT_BOUNCE_CURVE = exports.DEFAULT_BOUNCE_TIME = exports.DEFAULT_BOUNCE_HEIGHT = undefined;
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
exports.DEFAULT_BOUNCE_HEIGHT = 800;
exports.DEFAULT_BOUNCE_TIME = 1000;
exports.DEFAULT_BOUNCE_CURVE = "/Game/Aki/Data/Fight/Curves/CV_Bounce_Motion.CV_Bounce_Motion";
exports.PARAGLIDING_DELAY_MILISECONDS = 500;
class VehicleConfig {
  constructor(t, s) {
    this.Asset = s;
    this.VehicleEntity = undefined;
    this.BornTagList = new Array();
    this.VehicleEnterTags = new Array();
    this.PassengerEnterTags = new Array();
    this.VehicleToDriverTagMap = new Map();
    this.VehicleToDriverBuffMap = new Map();
    this.DriverToVehicleTagMap = new Map();
    this.BounceTime = exports.DEFAULT_BOUNCE_TIME;
    this.BounceHeight = exports.DEFAULT_BOUNCE_HEIGHT;
    this.BounceCurve = exports.DEFAULT_BOUNCE_CURVE;
    this.ParaglidingDelayTime = exports.PARAGLIDING_DELAY_MILISECONDS;
    this.PreEnterEffect = "";
    this.PreEnterMatEffect = "";
    this.PostEnterEffect = "";
    this.PostEnterMatEffect = "";
    this.VehicleEntity = t;
    t = this.VehicleEntity.GetComponent(0)?.GetPbEntityInitData();
    if (t?.ComponentsData) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (t) {
        if (s?.IsValid()) {
          var e = s.载具出生Tag.GameplayTags;
          var i = e.Num();
          for (let t = 0; t < i; t++) {
            this.BornTagList.push(e.Get(t).TagId);
          }
          var r = s.载具乘坐期间Tag.GameplayTags;
          var o = r.Num();
          for (let t = 0; t < o; t++) {
            this.VehicleEnterTags.push(r.Get(t).TagId);
          }
          var h = s.角色乘坐期间Tag.GameplayTags;
          var n = h.Num();
          for (let t = 0; t < n; t++) {
            this.PassengerEnterTags.push(h.Get(t).TagId);
          }
          var a = s.驾驶员同步Tag;
          var p = a.Num();
          for (let t = 0; t < p; ++t) {
            var f = a.GetKey(t);
            var l = new Array();
            this.VehicleToDriverTagMap.set(f.TagId, l);
            var v = a.Get(f).Value;
            var c = v.Num();
            for (let t = 0; t < c; ++t) {
              l.push(v.Get(t).TagId);
            }
          }
          var x = s.驾驶员同步Buff;
          var C = x.Num();
          for (let t = 0; t < C; ++t) {
            var u = x.GetKey(t);
            var w = new Array();
            this.VehicleToDriverBuffMap.set(u.TagId, w);
            var y = x.Get(u).Value;
            var A = y.Num();
            for (let t = 0; t < A; ++t) {
              w.push(Number(y.Get(t)));
            }
          }
          var _ = s.载具同步驾驶员Tag;
          var d = _.Num();
          for (let t = 0; t < d; ++t) {
            var m = _.GetKey(t);
            var V = new Array();
            this.DriverToVehicleTagMap.set(m.TagId, V);
            var g = _.Get(m).Value;
            var I = g.Num();
            for (let t = 0; t < I; ++t) {
              V.push(g.Get(t).TagId);
            }
          }
          this.BounceHeight = s.弹射高度;
          this.BounceTime = s.弹射时间;
          this.BounceCurve = s.弹射时间路径曲线.ToAssetPathName();
          if (this.BounceCurve === "" || this.BounceCurve === "None") {
            this.BounceCurve = exports.DEFAULT_BOUNCE_CURVE;
          }
          this.ParaglidingDelayTime = s.打开滑翔伞延迟时间;
          this.PreEnterEffect = s.PreEnterEffect.ToAssetPathName();
          this.PreEnterMatEffect = s.PreEnterMatEffect.ToAssetPathName();
          this.PostEnterEffect = s.PostEnterEffect.ToAssetPathName();
          this.PostEnterMatEffect = s.PostEnterMatEffect.ToAssetPathName();
        }
        if (t.VehicleBornTag) {
          this.BornTagList.length = 0;
          this.BornTagList.push(...t.VehicleBornTag);
        }
        if (t.VehicleRiddenTag) {
          this.VehicleEnterTags.length = 0;
          this.VehicleEnterTags.push(...t.VehicleRiddenTag);
        }
        if (t.RoleRiddingTag) {
          this.PassengerEnterTags.length = 0;
          this.PassengerEnterTags.push(...t.RoleRiddingTag);
        }
      }
    }
  }
  DeepCopy() {
    var t = new VehicleConfig(this.VehicleEntity, undefined);
    this.DeepCopyInternal(t);
    return t;
  }
  DeepCopyInternal(t) {
    Object.assign(t, this);
    t.BornTagList = this.BornTagList.slice(0);
    t.VehicleEnterTags = this.VehicleEnterTags.slice(0);
    t.PassengerEnterTags = this.PassengerEnterTags.slice(0);
  }
  Init() {
    return !!this.VehicleEntity && (this.SetVehicleBornTags(this.VehicleEntity, true), true);
  }
  SetVehicleBornTags(t, s) {
    this.AddOrRemoveTags(t, this.BornTagList, s);
  }
  AddOrRemoveTags(t, s, e) {
    var i = t.GetComponent(217);
    if (i) {
      if (e) {
        for (const r of s) {
          i.AddTag(r);
        }
      } else {
        for (const o of s) {
          i.RemoveTag(o);
        }
      }
    }
  }
}
exports.VehicleConfig = VehicleConfig;
//# sourceMappingURL=VehicleConfig.js.map