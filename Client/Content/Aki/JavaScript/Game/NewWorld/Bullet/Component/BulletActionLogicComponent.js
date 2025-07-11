"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var l;
  var a = arguments.length;
  var r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, o, i);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (l = t[s]) {
        r = (a < 3 ? l(r) : a > 3 ? l(e, o, r) : l(e, o)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionLogicComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators");
const BulletLogicAdditiveAccelerateController_1 = require("../BulletLogicDataAssetController/BulletLogicAdditiveAccelerateController");
const BulletLogicCreateBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicCreateBulletController");
const BulletLogicCurveMovementController_1 = require("../BulletLogicDataAssetController/BulletLogicCurveMovementController");
const BulletLogicDestroyBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyBulletController");
const BulletLogicDestroyOtherBullet_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyOtherBullet");
const BulletLogicForceController_1 = require("../BulletLogicDataAssetController/BulletLogicForceController");
const BulletLogicFreezeController_1 = require("../BulletLogicDataAssetController/BulletLogicFreezeController");
const BulletLogicManipulatableCreateBullet_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableCreateBullet");
const BulletLogicManipulatableTagsChange_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableTagsChange");
const BulletLogicReboundController_1 = require("../BulletLogicDataAssetController/BulletLogicReboundController");
const BulletLogicShakeCameraController_1 = require("../BulletLogicDataAssetController/BulletLogicShakeCameraController");
const BulletLogicShieldController_1 = require("../BulletLogicDataAssetController/BulletLogicShieldController");
const BulletLogicShowMesh_1 = require("../BulletLogicDataAssetController/BulletLogicShowMesh");
const BulletLogicSpawnObstacles_1 = require("../BulletLogicDataAssetController/BulletLogicSpawnObstacles");
const BulletLogicSpeedReduceController_1 = require("../BulletLogicDataAssetController/BulletLogicSpeedReduceController");
const BulletLogicSuiGuang_1 = require("../BulletLogicDataAssetController/BulletLogicSuiGuang");
const BulletLogicSummonRandom_1 = require("../BulletLogicDataAssetController/BulletLogicSummonRandom");
const BulletLogicSupportController_1 = require("../BulletLogicDataAssetController/BulletLogicSupportController");
const BulletLogicWhirlpool_1 = require("../BulletLogicDataAssetController/BulletLogicWhirlpool");
const LogicDataAdditiveAccelerate_1 = require("../LogicDataClass/LogicDataAdditiveAccelerate");
const LogicDataCreateBullet_1 = require("../LogicDataClass/LogicDataCreateBullet");
const LogicDataDestroyBullet_1 = require("../LogicDataClass/LogicDataDestroyBullet");
const LogicDataDestroyOtherBullet_1 = require("../LogicDataClass/LogicDataDestroyOtherBullet");
const LogicDataForce_1 = require("../LogicDataClass/LogicDataForce");
const LogicDataFreeze_1 = require("../LogicDataClass/LogicDataFreeze");
const LogicDataManipulatableCreateBullet_1 = require("../LogicDataClass/LogicDataManipulatableCreateBullet");
const LogicDataManipulatableTagsChange_1 = require("../LogicDataClass/LogicDataManipulatableTagsChange");
const LogicDataRebound_1 = require("../LogicDataClass/LogicDataRebound");
const LogicDataShakeScreen_1 = require("../LogicDataClass/LogicDataShakeScreen");
const LogicDataShield_1 = require("../LogicDataClass/LogicDataShield");
const LogicDataShowMesh_1 = require("../LogicDataClass/LogicDataShowMesh");
const LogicDataSpawnObstacles_1 = require("../LogicDataClass/LogicDataSpawnObstacles");
const LogicDataSpeedReduce_1 = require("../LogicDataClass/LogicDataSpeedReduce");
const LogicDataSplineMovement_1 = require("../LogicDataClass/LogicDataSplineMovement");
const LogicDataSuiGuang_1 = require("../LogicDataClass/LogicDataSuiGuang");
const LogicDataSummonRandom_1 = require("../LogicDataClass/LogicDataSummonRandom");
const LogicDataSupport_1 = require("../LogicDataClass/LogicDataSupport");
const LogicDataWhirlpool_1 = require("../LogicDataClass/LogicDataWhirlpool");
let BulletActionLogicComponent = class BulletActionLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.a7o = undefined;
    this.PBr = undefined;
    this.xBr = undefined;
    this.wBr = undefined;
    this.BBr = undefined;
    this.bBr = undefined;
    this.qBr = undefined;
    this.GBr = undefined;
    this.lhc = undefined;
    this.NBr = undefined;
    this.OBr = false;
    this.kBr = false;
  }
  get ObstaclesDetect() {
    return this.OBr;
  }
  OnStart() {
    this.a7o = this.Entity.GetBulletInfo();
    (this.a7o.ActionLogicComponent = this).PBr = this.a7o.BulletDataMain;
    this.kBr = this.PBr.Base.ContinuesCollision && (this.a7o.CollisionInfo.IntervalMs > 0 || this.PBr.Base.CollisionActiveDelay > 0);
    var t = this.PBr.Execution.GbDataList;
    if (t && t.length > 0) {
      for (const o of t) {
        var e = this.FBr(o);
        if (o.ExecuteStage === 0) {
          this.xBr ||= [];
          this.xBr.push(e);
        } else if (o.ExecuteStage === 2) {
          this.BBr ||= [];
          this.BBr.push(e);
        } else if (o.ExecuteStage === 1) {
          this.wBr ||= [];
          this.wBr.push(e);
        } else if (o.ExecuteStage === 3) {
          this.bBr ||= [];
          this.bBr.push(e);
        } else if (o.ExecuteStage === 4) {
          this.qBr ||= [];
          this.qBr.push(e);
        } else if (o.ExecuteStage === 5) {
          this.GBr ||= [];
          this.GBr.push(e);
        } else if (o.ExecuteStage === 6) {
          this.lhc ||= [];
          this.lhc.push(e);
        }
        if (e.NeedTick) {
          this.NBr ||= [];
          this.NBr.push(e);
        }
      }
    }
    return true;
  }
  OnAfterInit() {
    if (this.xBr) {
      for (const t of this.xBr) {
        t.OnInit();
        t.BulletLogicAction();
      }
    }
    if (this.BBr) {
      for (const e of this.BBr) {
        e.OnInit();
      }
    }
    if (this.wBr) {
      for (const o of this.wBr) {
        o.OnInit();
      }
    }
    if (this.bBr) {
      for (const i of this.bBr) {
        i.OnInit();
      }
    }
    if (this.qBr) {
      for (const l of this.qBr) {
        l.OnInit();
      }
    }
    if (this.GBr) {
      for (const a of this.GBr) {
        a.OnInit();
      }
    }
    if (this.lhc) {
      for (const r of this.lhc) {
        r.OnInit();
      }
    }
  }
  OnTick(t) {
    if (this.a7o.IsInit) {
      if (this.kBr && this.a7o.CollisionInfo.HaveCharacterInBullet && this.wBr) {
        for (const e of this.wBr) {
          e.BulletLogicAction();
        }
      }
      if (!this.a7o.NeedDestroy && this.NBr) {
        for (const o of this.NBr) {
          o.Tick(t);
        }
      }
    }
  }
  OnEnd() {
    if (this.xBr) {
      for (const t of this.xBr) {
        t.OnBulletDestroy();
      }
    }
    if (this.wBr) {
      for (const e of this.wBr) {
        e.OnBulletDestroy();
      }
    }
    if (this.BBr) {
      for (const o of this.BBr) {
        o.OnBulletDestroy();
      }
    }
    if (this.bBr) {
      for (const i of this.bBr) {
        i.OnBulletDestroy();
      }
    }
    if (this.qBr) {
      for (const l of this.qBr) {
        l.OnBulletDestroy();
      }
    }
    if (this.GBr) {
      for (const a of this.GBr) {
        a.OnBulletDestroy();
      }
    }
    if (this.lhc) {
      for (const r of this.lhc) {
        r.OnBulletDestroy();
      }
    }
    return !(this.OBr = false);
  }
  ActionDestroy() {
    if (this.BBr) {
      for (const t of this.BBr) {
        t.BulletLogicAction();
      }
    }
  }
  ActionHit(t) {
    if (this.a7o.IsInit && !this.kBr && this.wBr) {
      for (const e of this.wBr) {
        e.BulletLogicAction(t);
      }
    }
  }
  ActionHitObstacles(t) {
    if (this.a7o.IsInit && this.wBr) {
      for (const e of this.wBr) {
        e.BulletLogicActionOnHitObstacles(t);
      }
    }
  }
  ActionRebound(t) {
    if (this.bBr) {
      for (const e of this.bBr) {
        e.BulletLogicAction(t);
      }
    }
  }
  ActionSupport(t) {
    if ((!this.qBr || this.qBr?.length <= 0) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "与子弹碰撞, 执行Support", ["This.Id", this.a7o.BulletRowName], ["this.OnSupportController.Len", this.qBr?.length]);
    }
    if (this.qBr) {
      for (const e of this.qBr) {
        e.BulletLogicAction(t);
      }
    }
  }
  ActionTickMovement(t) {
    if (this.GBr) {
      for (const e of this.GBr) {
        e.BulletLogicAction(t);
      }
    }
  }
  ActionHitBullet(t) {
    if (this.lhc) {
      for (const e of this.lhc) {
        e.BulletLogicAction(t);
      }
    }
  }
  FBr(t) {
    if (t instanceof LogicDataCreateBullet_1.default) {
      return new BulletLogicCreateBulletController_1.BulletLogicCreateBulletController(t, this.Entity);
    } else if (t instanceof LogicDataDestroyBullet_1.default) {
      return new BulletLogicDestroyBulletController_1.BulletLogicDestroyBulletController(t, this.Entity);
    } else if (t instanceof LogicDataForce_1.default) {
      return new BulletLogicForceController_1.BulletLogicForceController(t, this.Entity);
    } else if (t instanceof LogicDataSpeedReduce_1.default) {
      this.OBr = true;
      return new BulletLogicSpeedReduceController_1.BulletLogicSpeedReduceController(t, this.Entity);
    } else if (t instanceof LogicDataAdditiveAccelerate_1.default) {
      return new BulletLogicAdditiveAccelerateController_1.BulletLogicAdditiveAccelerateController(t, this.Entity);
    } else if (t instanceof LogicDataFreeze_1.default) {
      return new BulletLogicFreezeController_1.BulletLogicFreezeController(t, this.Entity);
    } else if (t instanceof LogicDataRebound_1.default) {
      return new BulletLogicReboundController_1.BulletLogicReboundController(t, this.Entity);
    } else if (t instanceof LogicDataSupport_1.default) {
      return new BulletLogicSupportController_1.BulletLogicSupportController(t, this.Entity);
    } else if (t instanceof LogicDataSplineMovement_1.default) {
      return new BulletLogicCurveMovementController_1.BulletLogicCurveMovementController(t, this.Entity);
    } else if (t instanceof LogicDataShakeScreen_1.default) {
      return new BulletLogicShakeCameraController_1.BulletLogicShakeCameraController(t, this.Entity);
    } else if (t instanceof LogicDataShowMesh_1.default) {
      return new BulletLogicShowMesh_1.BulletLogicShowMesh(t, this.Entity);
    } else if (t instanceof LogicDataSuiGuang_1.default) {
      return new BulletLogicSuiGuang_1.BulletLogicSuiGuang(t, this.Entity);
    } else if (t instanceof LogicDataSpawnObstacles_1.default) {
      return new BulletLogicSpawnObstacles_1.BulletLogicSpawnObstacles(t, this.Entity);
    } else if (t instanceof LogicDataManipulatableCreateBullet_1.default) {
      return new BulletLogicManipulatableCreateBullet_1.BulletLogicManipulatableCreateBullet(t, this.Entity);
    } else if (t instanceof LogicDataManipulatableTagsChange_1.default) {
      return new BulletLogicManipulatableTagsChange_1.BulletLogicManipulatableTagsChange(t, this.Entity);
    } else if (t instanceof LogicDataWhirlpool_1.default) {
      return new BulletLogicWhirlpool_1.BulletLogicWhirlpool(t, this.Entity);
    } else if (t instanceof LogicDataDestroyOtherBullet_1.default) {
      return new BulletLogicDestroyOtherBullet_1.BulletLogicDestroyOtherBullet(t, this.Entity);
    } else if (t instanceof LogicDataShield_1.default) {
      return new BulletLogicShieldController_1.BulletLogicShieldController(t, this.Entity);
    } else if (t instanceof LogicDataSummonRandom_1.default) {
      return new BulletLogicSummonRandom_1.BulletLogicSummonRandom(t, this.Entity);
    } else {
      return undefined;
    }
  }
};
BulletActionLogicComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(13)], BulletActionLogicComponent);
exports.BulletActionLogicComponent = BulletActionLogicComponent; //# sourceMappingURL=BulletActionLogicComponent.js.map