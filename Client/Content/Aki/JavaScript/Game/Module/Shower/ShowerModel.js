"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class ShowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$Cu = new Map();
    this.WCu = new Map();
    this.TW1 = 0;
    this.$J1 = [];
    this.WJ1 = [];
    this.IsInShower = false;
  }
  get CurSelectPosIndex() {
    return this.TW1;
  }
  get PosCount() {
    return this.WJ1.length;
  }
  GetInviteNumString() {
    return this.$Cu.size + "/" + this.PosCount;
  }
  GetRoleInstanceByPos(e) {
    return this.$Cu?.get(e);
  }
  SetShowerSeatConfigIds(e) {
    if (e && !this.IsInShower) {
      var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(242)?.Seat ?? -1;
      if (t === -1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 78, "共浴 玩家座位id undefined");
        }
      } else {
        this.$J1 = e;
        for (let e = this.WJ1.length = 0; e < this.$J1.length; ++e) {
          if (e !== t) {
            this.WJ1.push(e);
          }
        }
      }
    }
  }
  GetShowerSeatEntityByPos(e) {
    if (!(e >= this.PosCount)) {
      e = this.$J1[this.WJ1[e]];
      if (e !== 0) {
        var t = new Array();
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(e, t);
        var e = t[0]?.Entity;
        if (e) {
          return e;
        }
      }
    }
  }
  RightPos() {
    if (this.TW1 >= this.PosCount - 1) {
      this.TW1 = 0;
    } else {
      this.TW1 = this.TW1 + 1;
    }
  }
  LeftPos() {
    if (this.TW1 <= 0) {
      this.TW1 = this.PosCount - 1;
    } else {
      this.TW1 = this.TW1 - 1;
    }
  }
  ChangePos(e) {
    if (!(e >= this.PosCount) && !(e < 0)) {
      this.TW1 = e;
    }
  }
  InviteRole(e) {
    var t;
    var i;
    var s;
    var r = this.TW1;
    let h = -1;
    for ([t, i] of this.$Cu.entries()) {
      if (i.GetRoleId() === e.GetRoleId()) {
        h = t;
        break;
      }
    }
    if (r === h) {
      this.$Cu?.delete(r);
    } else if (s = this.$Cu.get(r)) {
      this.$Cu.set(r, e);
      if (h !== -1) {
        this.$Cu.set(h, s);
      }
    } else {
      this.$Cu.delete(h);
      this.$Cu.set(r, e);
    }
  }
  GetRolePos(e) {
    for (var [t, i] of this.$Cu.entries()) {
      if (i.GetRoleId() === e.GetRoleId()) {
        return t;
      }
    }
    return -1;
  }
  CheckRoleInCurPos(e) {
    return this.$Cu.get(this.TW1)?.GetRoleId() === e.GetRoleId();
  }
  ExitAndClear() {
    this.$J1.length = 0;
    this.WJ1.length = 0;
    this.$Cu.clear();
    this.WCu.clear();
    this.IsInShower = false;
    this.TW1 = 0;
    if (UiManager_1.UiManager.IsViewOpen("ShowerMainView")) {
      UiManager_1.UiManager.CloseView("ShowerMainView");
    }
    if (UiManager_1.UiManager.IsViewOpen("ShowerInviteView")) {
      UiManager_1.UiManager.CloseView("ShowerInviteView");
    }
  }
  ClearCurInviteRoles() {
    this.$Cu.clear();
    this.TW1 = 0;
  }
  ResetCurInviteRoles() {
    this.$Cu.clear();
    for (var [e, t] of this.WCu.entries()) {
      this.$Cu.set(e, t);
    }
  }
  SendAndSave() {
    this.IsInShower = true;
    for (var [e, t] of this.WCu.entries()) {
      if (!this.$Cu.has(e)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, t.GetRoleId(), this.WJ1[e]);
      }
    }
    for (var [i, s] of this.$Cu.entries()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRideSharingPassenger, s.GetRoleId(), this.WJ1[i]);
    }
    this.WCu.clear();
    for (var [r, h] of this.$Cu.entries()) {
      this.WCu.set(r, h);
    }
  }
}
exports.ShowerModel = ShowerModel;
//# sourceMappingURL=ShowerModel.js.map