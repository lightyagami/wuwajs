"use strict";

var SceneItemBuffConsumerComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (i = e[h]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, o, s) : i(t, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBuffConsumerComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletController_1 = require("../Bullet/BulletController");
const SceneItemBuffController_1 = require("./Controller/SceneItemBuffController");
const BLACKBOARD_KEY = "HeiShiSuo";
const HIT_CONDITION_TAGID = -1968966883;
const MAX_BULLET_HIT_TIME = 5000;
let SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent_1 = class SceneItemBuffConsumerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.wsn = undefined;
    this.mBe = undefined;
    this.Xln = undefined;
    this.vtn = undefined;
    this.Wpo = 0;
    this.odn = "";
    this.eHr = 0;
    this.rdn = undefined;
    this.JUn = undefined;
    this.ndn = false;
    this.Q1n = e => {
      if (e && this.sdn()) {
        this.ndn = true;
        SceneItemBuffController_1.SceneItemBuffController.BuffOperate(this.Entity.Id, Protocol_1.Aki.Protocol.eFs.Hru, this.adn);
      }
    };
    this.adn = (e, t) => {
      if (e === Protocol_1.Aki.Protocol.eFs.Hru && t) {
        this.hdn();
      } else {
        this.ndn = false;
      }
    };
    this.Zln = e => {
      if (e.ReBulletData.Base.HitConditionTagId === HIT_CONDITION_TAGID) {
        if (EntitySystem_1.EntitySystem.Get(e.BulletEntityId)?.Valid) {
          BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, false);
        }
        if (this.rdn) {
          TimerSystem_1.TimerSystem.Remove(this.rdn);
          this.rdn = undefined;
        }
        EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
        this.ldn();
      }
    };
    this._dn = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
      }
      this.rdn = undefined;
      this.ldn();
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemBuffConsumerComponent_1)[0];
    this.eHr = e.BuffId;
    if (e.BulletId) {
      this.odn = e.BulletId.toString();
    }
    e = this.Entity.GetComponent(0)?.ComponentDataMap.get("Xys");
    this.JUn = MathUtils_1.MathUtils.LongToBigInt(e?.Xys?._Vn);
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    if (this.Hte) {
      this.wsn = this.Entity.GetComponent(197);
      if (this.wsn) {
        this.mBe = this.Entity.GetComponent(134);
        if (this.mBe) {
          this.vtn = this.Entity.GetComponent(86);
          if (this.vtn) {
            if (!ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) {
              this.Wpo = this.Hte.CreatureData.GetCreatureDataId();
              this.wsn.AddTag(HIT_CONDITION_TAGID);
              this.Xln = this.Entity.GetComponent(155);
              this.Xln.RegisterComponent(this);
              this.vtn.AddOnPlayerOverlapCallback(this.Q1n);
            }
            return true;
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneGameplay", 29, "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少RangeComponent", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
            }
            return false;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 29, "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少SceneItemStateComponent", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 29, "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少LevelTagComponent", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[SceneItemBuffConsumerComponent] 组件初始化失败 Actor Component Undefined");
      }
      return false;
    }
  }
  OnEnd() {
    this.vtn?.RemoveOnPlayerOverlapCallback(this.Q1n);
    if (this.rdn && TimerSystem_1.TimerSystem.Remove(this.rdn)) {
      this._dn();
    }
    return true;
  }
  sdn() {
    return (!ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) && !this.ndn && !!this.mBe.IsInState(1) && !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam && !!this.udn();
  }
  udn() {
    var e = Global_1.Global.BaseCharacter;
    if (!e) {
      return false;
    }
    var e = e.CharacterActorComponent.Entity;
    var t = e.CheckGetComponent(175);
    if (!t) {
      return false;
    }
    let o = t.GetBuffTotalStackById(this.eHr) > 0;
    t = e.CheckGetComponent(191);
    if (t) {
      o ||= (t.GetFormationBuffComp()?.GetBuffTotalStackById(this.eHr) ?? 0) > 0;
    }
    return o;
  }
  hdn() {
    if (this.odn) {
      this.oZo();
    } else {
      this.ldn();
    }
  }
  oZo() {
    var e;
    var t = Global_1.Global.BaseCharacter;
    if (t) {
      e = (t = t.CharacterActorComponent).Entity;
      ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(e.Id, BLACKBOARD_KEY, this.Entity.Id);
      BulletController_1.BulletController.CreateBulletCustomTarget(Global_1.Global.BaseCharacter, this.odn, t.ActorTransform, {}, this.JUn);
      EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
      this.rdn = TimerSystem_1.TimerSystem.Delay(this._dn, MAX_BULLET_HIT_TIME);
    }
  }
  ldn() {
    LevelGamePlayController_1.LevelGamePlayController.EntityBuffProducerRequest(this.Wpo, e => {
      this.ndn = false;
    });
  }
};
SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(204)], SceneItemBuffConsumerComponent);
exports.SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent; //# sourceMappingURL=SceneItemBuffConsumerComponent.js.map