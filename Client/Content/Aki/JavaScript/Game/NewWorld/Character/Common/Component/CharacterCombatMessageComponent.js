"use strict";

var __decorate = this && this.__decorate || function (e, t, o, s) {
  var r;
  var a = arguments.length;
  var i = a < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, o) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (r = e[n]) {
        i = (a < 3 ? r(i) : a > 3 ? r(t, o, i) : r(t, o)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCombatMessageComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Queue_1 = require("../../../../../Core/Container/Queue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const MESSAGE_BUFFER_MAX_SIZE = 50;
let CharacterCombatMessageComponent = class CharacterCombatMessageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.B4r = new Queue_1.Queue(MESSAGE_BUFFER_MAX_SIZE);
    this.b4r = () => {
      while (this.B4r.Size > 0) {
        var e = this.B4r.Front;
        if (Time_1.Time.NowSeconds < e[3]) {
          if (this.B4r.Size < MESSAGE_BUFFER_MAX_SIZE) {
            break;
          }
          CombatLog_1.CombatLog.Warn("Message", this.Entity, "战斗缓冲满，立即执行", ["id", e[1]]);
        }
        this.B4r.Pop();
        this.q4r(e);
      }
    };
  }
  AddToQueue(e, t, o, s) {
    this.B4r.Push([t, e, o, s]);
    if (this.B4r.Size >= MESSAGE_BUFFER_MAX_SIZE) {
      CombatLog_1.CombatLog.Warn("Message", this.Entity, "战斗消息缓冲满了", ["IsInit", this.Entity.IsInit], ["Active", this.Entity.Active]);
      t = this.B4r.Pop();
      this.q4r(t);
    }
  }
  OnActivate() {
    while (this.B4r.Size > 0) {
      var e = this.B4r.Pop();
      CombatLog_1.CombatLog.Info("Notify", this.Entity, "协议OnActivate执行", ["Message", e[1].toString()], ["CombatCommon", e[0]]);
      this.q4r(e);
    }
    CombatMessageController_1.CombatMessageController.RegisterPreTick(this, this.b4r);
  }
  OnEnd() {
    while (this.B4r.Size > 0) {
      var e = this.B4r.Pop();
      CombatLog_1.CombatLog.Info("Notify", this.Entity, "OnEnd未执行的协议，已抛弃", ["Message", e[1]], ["CombatCommon", e[0]]);
    }
    CombatMessageController_1.CombatMessageController.UnregisterPreTick(this);
    return true;
  }
  q4r(t) {
    try {
      CombatMessageController_1.CombatMessageController.Process(t[1], this.Entity, t[2], t[0]);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("CombatInfo", 14, "战斗协议执行回调方法异常", e, ["messageId", t[1]], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CombatInfo", 14, "战斗协议执行回调方法异常", ["messageId", t[1]], ["stack", e]);
      }
    }
  }
};
CharacterCombatMessageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(54)], CharacterCombatMessageComponent);
exports.CharacterCombatMessageComponent = CharacterCombatMessageComponent; //# sourceMappingURL=CharacterCombatMessageComponent.js.map