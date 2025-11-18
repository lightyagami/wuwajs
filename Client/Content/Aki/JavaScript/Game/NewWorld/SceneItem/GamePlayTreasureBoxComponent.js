"use strict";

var SceneItemTreasureBoxComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, r) {
  var o;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTreasureBoxComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
let SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent_1 = class SceneItemTreasureBoxComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Qsn = undefined;
    this._cn = undefined;
    this.ucn = undefined;
    this.m1n = () => {
      this.ccn();
      if (this.Entity.CheckGetComponent(137).IsInState(2)) {
        this.mcn();
      }
    };
    this.dcn = e => {
      this.ccn();
    };
    this.Ccn = e => {
      this.ccn();
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemTreasureBoxComponent_1)[0];
    this._cn = e?.TypeId;
    return true;
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    var t = e?.GetBaseInfo();
    if (t) {
      this.Qsn = t.OnlineInteractType ?? 2;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 7, "[SceneItemTreasureBoxComponent.OnStart] 宝箱组件初始化失败,没有基础信息配置(baseInfo)", ["CreatureGenID:", e.GetOwnerId()], ["PbDataId:", e.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 31, "SceneItemTreasureBoxComponent.OnActivate: 重复添加事件", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
      }
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
    if (this._cn === 2) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.Ccn);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.dcn);
    }
    this.ucn = undefined;
    if (!this.Entity.CheckGetComponent(137).IsInState(0)) {
      this.m1n();
    }
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    if (this._cn === 2) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.Ccn);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.dcn);
    }
    return true;
  }
  ccn() {
    var e = this.Entity.CheckGetComponent(137);
    var t = this.Entity.CheckGetComponent(200);
    let n = undefined;
    let r = undefined;
    switch (e.State) {
      case 1:
        n = this.Entity.CheckGetComponent(134).IsLocked ? (r = -1107341031, -1491083225) : (r = -1491083225, -1107341031);
        break;
      case 2:
        r = -1107341031;
        n = -1526657280;
    }
    if (n !== undefined && this.ucn !== n) {
      t.NotifyLock++;
      if (r !== undefined && this.ucn === r) {
        t.RemoveTag(r);
      }
      this.ucn = n;
      t.AddTag(n);
      t.NotifyLock--;
    }
  }
  mcn() {
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() && LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.Qsn)) {
      LevelGamePlayController_1.LevelGamePlayController.GetRewardTreasureBoxRequest(this.Entity.Id);
    }
  }
  CloseAllCollisions() {
    var e = this.Entity.GetComponent(206);
    SceneItemTreasureBoxComponent_1.gcn(e.Owner);
    var n = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(e.GetSceneInteractionLevelHandleId());
    if (n) {
      for (let e = 0, t = n.Num(); e < t; e++) {
        var r = n.Get(e);
        SceneItemTreasureBoxComponent_1.gcn(r);
      }
    }
  }
  static gcn(e) {
    var n = e.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
    if (n) {
      for (let e = 0, t = n.Num(); e < t; e++) {
        var r = n.Get(e);
        r.CanCharacterStepUpOn = 0;
        r.SetCollisionResponseToAllChannels(0);
        r.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Pawn, 2);
        r.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 2);
        r.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnMonster, 2);
      }
    }
  }
};
SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(145)], SceneItemTreasureBoxComponent);
exports.SceneItemTreasureBoxComponent = SceneItemTreasureBoxComponent; //# sourceMappingURL=GamePlayTreasureBoxComponent.js.map