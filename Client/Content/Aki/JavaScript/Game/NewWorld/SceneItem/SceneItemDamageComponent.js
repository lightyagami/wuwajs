"use strict";

var SceneItemDamageComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemDamageComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController");
const SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
let SceneItemDamageComponent = SceneItemDamageComponent_1 = class SceneItemDamageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Xln = undefined;
    this.Qdn = -0;
    this.Xdn = -0;
    this.$dn = undefined;
    this.Qlt = undefined;
    this.Lo = undefined;
    this.n$t = undefined;
    this.Ydn = undefined;
  }
  OnInitData(e) {
    var e = e.GetParam(SceneItemDamageComponent_1)[0];
    this.Lo = e;
    this.n$t = this.Entity.GetComponent(1);
    this.Ydn = Vector_1.Vector.Create(this.Lo.HitPoint.X || 0, this.Lo.HitPoint.Y || 0, this.Lo.HitPoint.Z || 0);
    var e = this.Entity.GetComponent(0);
    var t = this.Lo.Durability;
    this.Qdn = t || 100;
    this.Xdn = e.GetDurabilityValue();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 17, "初始化破坏组件完成", ["最大耐久度", this.Qdn], ["当前耐久度", this.Xdn], ["PbDataId", e.GetPbDataId()]);
    }
    return true;
  }
  OnStart() {
    this.Xln = this.Entity.GetComponent(154);
    this.Xln.RegisterComponent(this, this.Lo);
    this.$dn = e => {
      this.Zln(e);
    };
    EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.$dn);
    this.Qlt = e => {
      if (this.Xdn !== e) {
        this.Xdn = e;
      }
    };
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt);
    return true;
  }
  OnEnd() {
    if (this.$dn !== undefined) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.$dn);
      this.$dn = undefined;
    }
    if (this.Qlt !== undefined) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt);
      this.Qlt = undefined;
    }
    return true;
  }
  Zln(e) {
    if (this.Lo.MatchRoleOption && this.Lo.MatchRoleOption.length > 0) {
      if (!SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.Lo.MatchRoleOption)) {
        return;
      }
    } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      return;
    }
    var t = e.Attacker.GetComponent(3);
    var i = SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(e);
    if (t?.Valid && i) {
      if (!(this.Xdn <= 0) && !(e.DamageId <= 0)) {
        if (this.Xdn > 0) {
          if ((t = this.Entity.GetComponent(0).GetBaseInfo()?.Category?.ControlMatchType) && t === "关卡.Common.被控物.爆裂鸣晶" && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneItem", 31, "[爆裂鸣晶] ThrowDamageChangeRequest", ["Entity.Valid", this.Entity.Valid]);
          }
          LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(this.Entity.Id, e.DamageId);
        }
      }
    }
  }
  GetHitPoint() {
    var e = Vector_1.Vector.Create(this.Ydn);
    var t = Vector_1.Vector.Create();
    var i = Vector_1.Vector.Create();
    this.n$t.ActorForwardProxy.Multiply(e.X, i);
    t.AdditionEqual(i);
    this.n$t.ActorRightProxy.Multiply(e.Y, i);
    t.AdditionEqual(i);
    this.n$t.ActorUpProxy.Multiply(e.Z, i);
    t.AdditionEqual(i);
    this.n$t.ActorLocationProxy.Addition(t, t);
    return t;
  }
  GetMaxDurablePoint() {
    return this.Qdn;
  }
};
SceneItemDamageComponent = SceneItemDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(148)], SceneItemDamageComponent);
exports.SceneItemDamageComponent = SceneItemDamageComponent; //# sourceMappingURL=SceneItemDamageComponent.js.map