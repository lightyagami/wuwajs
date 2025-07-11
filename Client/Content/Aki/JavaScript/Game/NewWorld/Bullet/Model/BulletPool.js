"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletPool = exports.SimplePool = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Pool_1 = require("../../../../Core/Container/Pool");
const ProxyLru_1 = require("../../../../Core/Container/ProxyLru");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const BulletConstant_1 = require("../BulletConstant");
const BulletEntity_1 = require("../Entity/BulletEntity");
const BulletCollisionInfo_1 = require("./BulletCollisionInfo");
const BulletHitActorData_1 = require("./BulletHitActorData");
const KEY_BULLET_ENTITY = "bulletEntity";
const PRE_ADD_COUNT = 10;
const CAPACITY = 20;
class SimplePool {
  constructor() {
    this.p7 = new Array();
  }
  Get() {
    if (!(this.p7.length <= 0)) {
      return this.p7.pop();
    }
  }
  PreloadAdd(t) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 17, "无效对象", ["target", t]);
      }
    }
    this.p7.push(t);
  }
  Release(t) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pool", 17, "无效对象", ["target", t]);
      }
    }
    this.p7.push(t);
  }
  Clear() {
    this.p7.length = 0;
  }
}
exports.SimplePool = SimplePool;
class BulletPool {
  static Init() {
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var l = BulletPool.BulletEntityPool.Create(KEY_BULLET_ENTITY);
      EntitySystem_1.EntitySystem.Init(l);
      EntitySystem_1.EntitySystem.DeSpawn(l);
      BulletPool.BulletEntityPool.Put(l);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var e = this.BulletHitActorDataPool.Create();
      this.BulletHitActorDataPool.Put(e);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var o = this.BulletConditionResultPool.Create();
      this.BulletConditionResultPool.Put(o);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      this.VectorPool.PreloadAdd(Vector_1.Vector.Create());
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      this.RotatorPool.PreloadAdd(Rotator_1.Rotator.Create());
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      this.BulletHitTempResultPool.PreloadAdd(new BulletHitActorData_1.BulletHitTempResult());
    }
  }
  static Clear() {
    this.BulletEntityPool.Clear();
    this.BulletHitActorDataPool.Clear();
    this.BulletConditionResultPool.Clear();
    this.VectorPool.Clear();
    this.RotatorPool.Clear();
  }
  static CreateBulletEntity() {
    let t = BulletPool.BulletEntityPool.Get(KEY_BULLET_ENTITY);
    if (t) {
      EntitySystem_1.EntitySystem.Respawn(t);
    } else {
      t = BulletPool.BulletEntityPool.Create(KEY_BULLET_ENTITY);
      EntitySystem_1.EntitySystem.Init(t);
    }
    return t;
  }
  static RecycleBulletEntity(t) {
    EntitySystem_1.EntitySystem.DeSpawn(t);
    BulletPool.BulletEntityPool.Put(t);
  }
  static CreateBulletHitActorData() {
    let t = BulletPool.BulletHitActorDataPool.Get();
    return t = t || BulletPool.BulletHitActorDataPool.Create();
  }
  static RecycleBulletHitActorData(t) {
    t.Clear();
    BulletPool.BulletHitActorDataPool.Put(t);
  }
  static CreateBulletConditionResult() {
    let t = BulletPool.BulletConditionResultPool.Get();
    return t = t || BulletPool.BulletConditionResultPool.Create();
  }
  static RecycleBulletConditionResult(t) {
    t.Clear();
    BulletPool.BulletConditionResultPool.Put(t);
  }
  static CreateVector(t = false) {
    let l = BulletPool.VectorPool.Get();
    if (l) {
      if (t) {
        l.Reset();
      }
    } else {
      l = Vector_1.Vector.Create();
    }
    this.yjo++;
    return l;
  }
  static RecycleVector(t) {
    this.yjo--;
    if (BulletConstant_1.BulletConstant.OpenPoolCheck) {
      t.Set(NaN, NaN, NaN);
    } else {
      BulletPool.VectorPool.Release(t);
    }
  }
  static CreateRotator(t = false) {
    let l = BulletPool.RotatorPool.Get();
    if (l) {
      if (t) {
        l.Reset();
      }
    } else {
      l = Rotator_1.Rotator.Create();
    }
    this.Ijo++;
    return l;
  }
  static RecycleRotator(t) {
    this.Ijo--;
    if (BulletConstant_1.BulletConstant.OpenPoolCheck) {
      t.Set(NaN, NaN, NaN);
    } else {
      BulletPool.RotatorPool.Release(t);
    }
  }
  static CreateBulletHitTempResult() {
    let t = BulletPool.BulletHitTempResultPool.Get();
    t = t || new BulletHitActorData_1.BulletHitTempResult();
    this.Tjo++;
    return t;
  }
  static RecycleBulletHitTempResult(t) {
    this.Tjo--;
    BulletPool.BulletHitTempResultPool.Release(t);
  }
  static CheckAtFrameEnd() {
    if (this.yjo !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "当前帧子弹申请的Vector没有回收", ["VectorCount", this.yjo]);
      }
      this.yjo = 0;
    }
    if (this.Ijo !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "当前帧子弹申请的Rotator没有回收", ["RotatorCount", this.Ijo]);
      }
      this.Ijo = 0;
    }
    if (this.Tjo !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "当前帧子弹申请的BulletHitTempResultCount没有回收", ["BulletHitTempResultCount", this.Tjo]);
      }
      this.Tjo = 0;
    }
  }
}
(exports.BulletPool = BulletPool).BulletEntityPool = new ProxyLru_1.ProxyLru(PRE_ADD_COUNT, t => EntitySystem_1.EntitySystem.Create(BulletEntity_1.BulletEntity));
BulletPool.BulletHitActorDataPool = new Pool_1.Pool(CAPACITY, () => new BulletHitActorData_1.BulletHitActorData());
BulletPool.BulletConditionResultPool = new Pool_1.Pool(CAPACITY, () => new BulletCollisionInfo_1.BulletConditionResult());
BulletPool.VectorPool = new SimplePool();
BulletPool.yjo = 0;
BulletPool.RotatorPool = new SimplePool();
BulletPool.Ijo = 0;
BulletPool.BulletHitTempResultPool = new SimplePool();
BulletPool.Tjo = 0; //# sourceMappingURL=BulletPool.js.map