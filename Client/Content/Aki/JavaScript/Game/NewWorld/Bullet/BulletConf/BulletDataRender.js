"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataRender = undefined;
const BulletHitEffectConf_1 = require("./BulletHitEffectConf");
class BulletDataRender {
  constructor(t) {
    this.Pe = undefined;
    this.a9o = undefined;
    this.h9o = undefined;
    this.l9o = undefined;
    this.iVs = undefined;
    this._9o = undefined;
    this.u9o = undefined;
    this.c9o = undefined;
    this.m9o = undefined;
    this.d9o = undefined;
    this.C9o = undefined;
    this.g9o = undefined;
    this.f9o = undefined;
    this.p9o = undefined;
    this.v9o = undefined;
    this.X$s = undefined;
    this.Pe = t;
  }
  get VictimCameraShakeOnHit() {
    if (this.a9o === undefined) {
      this.a9o = this.Pe.命中时受击者震屏.ToAssetPathName();
    }
    return this.a9o;
  }
  get AttackerCameraShakeOnHit() {
    if (this.h9o === undefined) {
      this.h9o = this.Pe.命中时攻击者震屏.ToAssetPathName();
    }
    return this.h9o;
  }
  get EffectOnHit() {
    if (this.l9o === undefined) {
      this.l9o = new Map();
      var i = this.Pe.命中特效DA;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.l9o.set(s, i.Get(s).ToAssetPathName());
      }
    }
    return this.l9o;
  }
  get AudioOnHit() {
    if (this.iVs === undefined) {
      this.iVs = this.Pe.命中音效;
    }
    return this.iVs;
  }
  get EffectOnHitConf() {
    if (this._9o === undefined) {
      this._9o = new Map();
      var i = this.Pe.命中特效配置;
      var s = i.Num();
      for (let t = 0; t < s; t++) {
        var e = i.Get(t);
        var h = new BulletHitEffectConf_1.BulletHitEffectConf(e);
        this._9o.set(e.类型, h);
      }
    }
    return this._9o;
  }
  get EffectBullet() {
    if (this.u9o === undefined) {
      this.u9o = this.Pe.子弹特效DA.ToAssetPathName();
    }
    return this.u9o;
  }
  get EffectBulletParams() {
    if (this.c9o === undefined) {
      this.c9o = new Map();
      var i = this.Pe.子弹特效DA参数;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.c9o.set(s, i.Get(s));
      }
    }
    return this.c9o;
  }
  get EffectStopInsteadDestroy() {
    if (this.m9o === undefined) {
      this.m9o = this.Pe.子弹销毁调用子弹停止特效;
    }
    return this.m9o;
  }
  get HandOverParentEffect() {
    if (this.d9o === undefined) {
      this.d9o = this.Pe.接手父子弹的特效;
    }
    return this.d9o;
  }
  get CameraShakeCountMax() {
    if (this.C9o === undefined) {
      this.C9o = this.Pe.最大震动次数;
    }
    return this.C9o;
  }
  get SpecialEffect() {
    if (this.g9o === undefined) {
      this.g9o = new Map();
      var i = this.Pe.特殊特效DA;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.g9o.set(s, i.Get(s).ToAssetPathName());
      }
    }
    return this.g9o;
  }
  get AttackerCameraShakeOnStart() {
    if (this.f9o === undefined) {
      this.f9o = this.Pe.生成时攻击者震屏.ToAssetPathName();
    }
    return this.f9o;
  }
  get CameraShakeToSummonOwner() {
    if (this.p9o === undefined) {
      this.p9o = this.Pe.震屏关联到召唤兽主人;
    }
    return this.p9o;
  }
  get AttackerCameraShakeOnHitWeakPoint() {
    if (this.v9o === undefined) {
      this.v9o = this.Pe.命中弱点时攻击者震屏.ToAssetPathName();
    }
    return this.v9o;
  }
  get OnHitMaterialEffect() {
    if (this.X$s === undefined) {
      this.X$s = this.Pe.受击闪白.ToAssetPathName();
    }
    return this.X$s;
  }
  Preload() {
    this.EffectBullet;
    this.HandOverParentEffect;
    this.CameraShakeCountMax;
    this.SpecialEffect;
    this.AttackerCameraShakeOnStart;
    this.AudioOnHit;
    return true;
  }
}
exports.BulletDataRender = BulletDataRender;
//# sourceMappingURL=BulletDataRender.js.map