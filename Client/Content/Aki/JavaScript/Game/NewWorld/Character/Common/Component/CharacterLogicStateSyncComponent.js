"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        a = (r < 3 ? o(a) : r > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLogicStateSyncComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
let CharacterLogicStateSyncComponent = class CharacterLogicStateSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.I5r = undefined;
    this.T9r = undefined;
    this.L9r = [];
    this.D9r = [];
    this.Xjt = false;
    this.Inited = false;
    this.OnSwitchControl = t => {
      if (t && !this.Inited) {
        this.R9r();
        this.Inited = true;
      }
    };
    this.U9r = () => {
      if (this.Hte.IsMoveAutonomousProxy) {
        var t;
        var i = this.I5r;
        if (i) {
          let e = false;
          this.L9r[0] = i.PositionState;
          this.L9r[1] = i.MoveState;
          this.L9r[2] = i.DirectionState;
          this.L9r[3] = i.PositionSubState;
          for (let t = 0; t < this.L9r.length; ++t) {
            if (this.L9r[t] !== this.D9r[t]) {
              e = true;
              break;
            }
          }
          if (e) {
            (t = Protocol_1.Aki.Protocol.ue_.create()).rWn = Protocol_1.Aki.Protocol.Eys.create();
            if (this.Xjt) {
              t.xx_ = MathUtils_1.MathUtils.NumberToLong(this.utc());
            }
            this.D9r[0] = t.rWn.LWn = i.PositionState;
            this.D9r[1] = t.rWn.DWn = i.MoveState;
            this.D9r[2] = t.rWn.AWn = i.DirectionState;
            this.D9r[3] = t.rWn.UWn = i.PositionSubState;
            CombatMessage_1.CombatNet.Send(21209, this.Entity, t);
          }
        }
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.I5r = this.Entity.CheckGetComponent(186);
    this.Xjt = this.Entity.GetComponent(0).IsRole();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, this.OnSwitchControl);
    return true;
  }
  OnActivate() {
    CombatMessageController_1.CombatMessageController.RegisterAfterTick(this, this.U9r);
    var t = this.Entity.GetComponent(0);
    this.T9r = t.ComponentDataMap.get("Eys")?.Eys;
    if (this.Hte.IsAutonomousProxy) {
      this.R9r();
      this.Inited = true;
    } else if (this.T9r) {
      this.A9r(this.T9r);
    }
    this.L9r[0] = this.I5r.PositionState;
    this.L9r[1] = this.I5r.MoveState;
    this.L9r[2] = this.I5r.DirectionState;
    this.L9r[3] = this.I5r.PositionSubState;
    for (let t = 0; t < this.L9r.length; t++) {
      this.D9r[t] = this.L9r[t];
    }
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, this.OnSwitchControl);
    CombatMessageController_1.CombatMessageController.UnregisterAfterTick(this);
    return true;
  }
  R9r() {
    var t = Protocol_1.Aki.Protocol.ce_.create();
    if (this.Xjt) {
      t.xx_ = MathUtils_1.MathUtils.NumberToLong(this.utc());
    }
    t.RWn = Protocol_1.Aki.Protocol.Eys.create();
    t.RWn.LWn = this.I5r.PositionState;
    t.RWn.DWn = this.I5r.MoveState;
    t.RWn.AWn = this.I5r.DirectionState;
    t.RWn.UWn = this.I5r.PositionSubState;
    CombatMessage_1.CombatNet.Send(20970, this.Entity, t);
  }
  A9r(t) {
    this.P9r(0, t.LWn);
    this.P9r(1, t.DWn);
    this.P9r(2, t.AWn);
    this.P9r(3, t.UWn);
    CombatLog_1.CombatLog.Info("LogicState", this.Entity, "初始化逻辑状态", ["states", [t.LWn, t.DWn, t.AWn, t.UWn]]);
    this.Inited = true;
  }
  P9r(t, e) {
    switch (t) {
      case 0:
        this.I5r.SetPositionStateHandle(e);
        break;
      case 1:
        this.I5r.SetMoveStateHandle(e);
        break;
      case 2:
        this.I5r.SetDirectionStateHandle(e);
        break;
      case 3:
        this.I5r.SetPositionSubStateHandle(e);
    }
  }
  static LogicStateInitNotify(t, e) {
    t?.GetComponent(69)?.A9r(e.RWn);
  }
  utc() {
    var t = this.Hte?.CreatureData?.GetPlayerId() ?? 0;
    return ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(t)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId ?? 0;
  }
  static SwitchLogicStateNotify(t, e) {
    if (!t?.GetComponent(3)?.IsMoveAutonomousProxy) {
      if ((t = t?.GetComponent(69)) && e.rWn) {
        this.TId(t, 0, e.rWn.LWn);
        this.TId(t, 1, e.rWn.DWn);
        this.TId(t, 2, e.rWn.AWn);
        this.TId(t, 3, e.rWn.UWn);
      }
    }
  }
  static TId(t, e, i) {
    if (i !== 0) {
      t.P9r(e, i === 127 ? 0 : i);
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("qFn", true)], CharacterLogicStateSyncComponent, "LogicStateInitNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("GFn", true)], CharacterLogicStateSyncComponent, "SwitchLogicStateNotify", null);
CharacterLogicStateSyncComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(69)], CharacterLogicStateSyncComponent);
exports.CharacterLogicStateSyncComponent = CharacterLogicStateSyncComponent; //# sourceMappingURL=CharacterLogicStateSyncComponent.js.map