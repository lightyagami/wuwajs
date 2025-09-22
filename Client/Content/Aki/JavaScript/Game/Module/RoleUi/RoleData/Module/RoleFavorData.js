"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FavorItemInfo_1 = require("./DataInfo/FavorItemInfo");
const RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleFavorData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments);
    this.Level = 0;
    this.Exp = 0;
    this.K1o = new Map();
  }
  GetFavorLevel() {
    return this.Level;
  }
  SetFavorLevel(e) {
    this.Level = e;
  }
  GetFavorExp() {
    return this.Exp;
  }
  SetFavorExp(e) {
    this.Exp = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleFavorExpChange);
  }
  UpdateRoleFavorData(e, t) {
    this.K1o.set(e, this.Q1o(t));
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRoleFavorData, this.RoleId);
  }
  UpdateUnlockId(e, t, r) {
    var e = this.GetClientFavorTabType(e);
    var o = this.K1o.get(e);
    var a = o.length;
    for (let e = 0; e < a; e++) {
      var n = o[e];
      if (n.Id === r) {
        n.Status = 2;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRoleFavorData, this.RoleId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockRoleFavorItem, t, r);
  }
  UpdateCanUnlockId(e, r) {
    var t;
    var e = this.GetClientFavorTabType(e);
    var o = this.K1o.get(e);
    if (o) {
      var a = o.length;
      let t = false;
      for (let e = 0; e < a; e++) {
        var n = o[e];
        if (n.Id === r) {
          t = true;
          n.Status = 1;
          break;
        }
      }
      if (!t) {
        o.push(new FavorItemInfo_1.FavorItemInfo(r, 1));
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRoleFavorData, this.RoleId);
    } else {
      (t = []).push(new FavorItemInfo_1.FavorItemInfo(r, 1));
      this.K1o.set(e, t);
    }
  }
  Q1o(t) {
    var r = [];
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var a = t[e];
      r.push(this.X1o(a));
    }
    return r;
  }
  X1o(e) {
    var t = this.GetClientFavorItemStatus(e.H6n);
    return new FavorItemInfo_1.FavorItemInfo(e.s5n, t);
  }
  GetFavorItemState(t, e) {
    var r = this.K1o.get(e);
    if (r) {
      var o = r.length;
      for (let e = 0; e < o; e++) {
        var a = r[e];
        if (a.Id === t) {
          return a.Status;
        }
      }
    }
    return 0;
  }
  GetClientFavorItemStatus(e) {
    let t = undefined;
    if (e === Protocol_1.Aki.Protocol.h6s.Proto_ItemLocked) {
      t = 0;
    } else if (e === Protocol_1.Aki.Protocol.h6s.Proto_ItemCanUnLock) {
      t = 1;
    } else if (e === Protocol_1.Aki.Protocol.h6s.Proto_ItemUnLocked) {
      t = 2;
    }
    return t;
  }
  GetClientFavorTabType(e) {
    if (e === Protocol_1.Aki.Protocol.l6s.m8n) {
      return 0;
    } else if (e === Protocol_1.Aki.Protocol.l6s.Proto_Story) {
      return 2;
    } else if (e === Protocol_1.Aki.Protocol.l6s.Proto_Goods) {
      return 4;
    } else {
      return undefined;
    }
  }
  IsExistCanUnlockFavorItem() {
    for (var [e] of this.K1o) {
      if (this.IsFavorItemCanUnlock(e)) {
        return true;
      }
    }
    return false;
  }
  IsFavorItemCanUnlock(e) {
    if (e === 3) {
      return ModelManager_1.ModelManager.MotionModel.IfRoleMotionCanUnlock(this.RoleId);
    }
    var t = this.K1o.get(e);
    if (t) {
      var r = t.length;
      for (let e = 0; e < r; e++) {
        if (t[e].Status === 1) {
          return true;
        }
      }
    }
    return false;
  }
  GetUnlockActionIndexList() {
    var t = [];
    var r = this.K1o.get(3);
    if (r) {
      var o = r.length;
      for (let e = 0; e < o; e++) {
        var a = r[e];
        if (a.Status === 2) {
          a = ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(a.Id);
          t.push(a.Sort);
        }
      }
    }
    return t;
  }
}
exports.RoleFavorData = RoleFavorData;
//# sourceMappingURL=RoleFavorData.js.map