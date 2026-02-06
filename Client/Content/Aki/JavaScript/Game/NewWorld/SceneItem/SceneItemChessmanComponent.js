"use strict";

var SceneItemChessmanComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var h = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (s = e[r]) {
        h = (o < 3 ? s(h) : o > 3 ? s(t, i, h) : s(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemChessmanComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent");
const SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent");
const CHESSMAN_SETLOCATION_PERFORMANCE_TIME = 1000;
let SceneItemChessmanComponent = SceneItemChessmanComponent_1 = class SceneItemChessmanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.DGa = undefined;
    this.o4o = undefined;
    this.n$t = undefined;
    this.Xte = undefined;
    this.Lo = undefined;
    this.bed = undefined;
    this.Rnn = () => {
      if (this.bed) {
        this.bed();
      }
    };
    this.AGa = undefined;
    this.RGa = () => {
      var e;
      if (this.AGa) {
        if (e = this.n$t?.GetInteractionMainActor()) {
          this.AGa(e, this.DGa, this.rwl);
          this.rwl = undefined;
        }
        this.AGa = undefined;
      }
      if (this.Lo?.EndMovingActions) {
        e = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(this.Lo.EndMovingActions, e);
      }
      this.Xte?.RemoveTag(743620444);
    };
    this.rwl = undefined;
    this.Due = undefined;
    this.GEl = undefined;
    this.oGa = undefined;
    this.kEl = () => {
      this.Xte?.RemoveTag(-410700595);
      this.Xte?.AddTag(-1482451496);
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Xte?.RemoveTag(-1482451496);
      }, CHESSMAN_SETLOCATION_PERFORMANCE_TIME);
      this.n$t?.SetActorLocation(this.Due.ToUeVector());
      var e = this.n$t?.GetInteractionMainActor();
      if (e && this.oGa) {
        this.oGa(e);
      }
      this.GEl = undefined;
      this.Due = undefined;
      this.oGa = undefined;
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemChessmanComponent_1)[0];
    this.Lo = e;
    return true;
  }
  OnStart() {
    this.DGa = this.Entity.GetComponent(149);
    this.o4o = this.Entity.GetComponent(139);
    this.n$t = this.Entity.GetComponent(214);
    this.Xte = this.Entity.GetComponent(208);
    this.o4o?.AddStopMoveCallback(this.RGa);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    this.o4o?.RemoveStopMoveCallback(this.RGa);
    return true;
  }
  RegisterOnSceneInteractionLoadCompleted(e) {
    return !this.n$t?.GetIsSceneInteractionLoadCompleted() && (this.bed = e, true);
  }
  UGa() {
    var e;
    this.Xte?.AddTag(743620444);
    if (this.Lo?.StartMovingActions) {
      e = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(this.Lo.StartMovingActions, e);
    }
  }
  OnTicTacToePieceMove(e, t, i = undefined, n = undefined, s = undefined) {
    var o = this.DGa?.PutDownBase?.GetBlockLocationByIndex(e);
    if (o) {
      this.UGa();
      if (i && n && s) {
        this.o4o?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(i, 0.25));
        this.o4o?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(n, 0.25));
        this.o4o?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(s, 0.25));
        this.o4o?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(o, 0.25));
      } else {
        this.o4o?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(o, 1));
      }
      this.AGa = t;
      this.rwl = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.Row, e.Col);
    }
  }
  SetTicTacToePieceLocation(e, t) {
    e = this.DGa?.PutDownBase?.GetBlockLocationByIndex(e);
    if (e) {
      this.o4o?.StopMove();
      this.o4o?.AddStopMoveCallback(this.RGa);
      this.Xte?.RemoveTag(-1482451496);
      this.Xte?.AddTag(-410700595);
      this.Due = e;
      this.oGa = t;
      this.GEl ||= TimerSystem_1.TimerSystem.Delay(this.kEl, CHESSMAN_SETLOCATION_PERFORMANCE_TIME);
    }
  }
  OnTicTacToePieceMovingChange(e) {
    if (e) {
      this.Xte?.RemoveTag(1462419867);
      this.Xte?.RemoveTag(1683487425);
    } else {
      this.Xte?.AddTag(1462419867);
    }
  }
  OnTicTacToePieceSelect(e, t) {
    if (e) {
      this.Xte?.AddTag(1683487425);
    } else {
      this.Xte?.RemoveTag(1683487425);
    }
    if (t) {
      this.Xte?.AddTag(1462419867);
    } else {
      this.Xte?.RemoveTag(1462419867);
    }
  }
};
SceneItemChessmanComponent = SceneItemChessmanComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(283)], SceneItemChessmanComponent);
exports.SceneItemChessmanComponent = SceneItemChessmanComponent; //# sourceMappingURL=SceneItemChessmanComponent.js.map