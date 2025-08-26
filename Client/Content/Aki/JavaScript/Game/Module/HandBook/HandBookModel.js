"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.kei = new Map();
    this.Fei = [];
    this.Hei = new Map();
    this.CurrentSelectMonsterHandBookId = 0;
    this.CurrentSelectWeaponHandBookId = 0;
    this.RoleOpenTimeLockMap = new Map();
    this.WeaponOpenTimeLockMap = new Map();
  }
  UpdateHandBookActiveStateMap(e, t) {
    var e = this.GetClientHandBookType(e, t.hws);
    var o = t.s5n;
    var r = TimeUtil_1.TimeUtil.DateFormat4(new Date(t.aws * TimeUtil_1.TimeUtil.InverseMillisecond));
    var a = t.qSs;
    var n = t.D8n;
    var i = new HandBookDefine_1.HandBookEntry(o, r, n, a);
    var s = this.kei.get(e);
    if (s) {
      var l = s.length;
      let o = false;
      for (let e = 0; e < l; e++) {
        const t = s[e];
        if (t.Id === i.Id) {
          t.CreateTime = i.CreateTime;
          t.IsRead = i.IsRead;
          t.Num = i.Num;
          o = true;
          break;
        }
      }
      if (!o) {
        s.push(i);
      }
    } else {
      o = [];
      o.push(i);
      this.kei.set(e, o);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataUpdate, e, t.s5n);
  }
  ClearHandBookActiveStateMap() {
    this.kei.clear();
  }
  InitHandBookActiveStateMap(o, t) {
    var r = this.GetClientHandBookEntryList(t);
    var a = [];
    var n = r.length;
    if (o !== Protocol_1.Aki.Protocol.N6s.Proto_Photograph) {
      var e = this.GetClientHandBookType(o);
      for (let e = 0; e < n; e++) {
        var i = r[e];
        a.push(i);
      }
      this.kei.set(e, a);
    } else {
      this.zGn();
      for (let e = 0; e < n; e++) {
        var s = r[e];
        var l = this.GetClientHandBookType(o, t[e].hws);
        this.kei.get(l).push(s);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
  }
  zGn() {
    this.kei.set(9, []);
    this.kei.set(8, []);
    this.kei.set(7, []);
  }
  InitHandBookRedDotList(o) {
    this.Fei = [];
    var t = o.length;
    for (let e = 0; e < t; e++) {
      var r = this.GetClientHandBookType(o[e]);
      if (r === 5) {
        var a = ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList();
        var n = a.length;
        for (let e = 0; e < n; e++) {
          var i = a[e];
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemReadRedDotUpdate, i.Id);
        }
      }
      this.Fei.push(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookRedDotUpdate);
  }
  UpdateRedDot(o, t) {
    var r = this.kei.get(o);
    if (r) {
      var a = r.length;
      for (let e = 0; e < a; e++) {
        var n = r[e];
        if (n.Id === t) {
          n.IsRead = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookRead, o, n.Id);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomReadRedDotUpdate);
          if (o === 5) {
            n = ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(t);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnItemReadRedDotUpdate, n.Type);
          }
          break;
        }
      }
    }
  }
  IsShowRedDot(o) {
    var t = this.Fei.length;
    for (let e = 0; e < t; e++) {
      if (o === this.Fei[e]) {
        return true;
      }
    }
    return false;
  }
  GetCollectCount(e) {
    e = this.kei.get(e);
    if (e) {
      return e.length;
    } else {
      return 0;
    }
  }
  GetClientHandBookEntryList(o) {
    var t = [];
    var r = o.length;
    for (let e = 0; e < r; e++) {
      var a = o[e];
      var n = a.s5n;
      var i = TimeUtil_1.TimeUtil.DateFormat4(new Date(a.aws * TimeUtil_1.TimeUtil.InverseMillisecond));
      var s = a.qSs;
      var a = a.D8n;
      var n = new HandBookDefine_1.HandBookEntry(n, i, a, s);
      t.push(n);
    }
    return t;
  }
  GetHandBookInfo(e, o) {
    var t = this.kei.get(e);
    if (t) {
      var r = t.length;
      for (let e = 0; e < r; e++) {
        var a = t[e];
        if (a.Id === o) {
          return a;
        }
      }
    }
  }
  GetHandBookInfoList(e) {
    e = this.kei.get(e);
    if (e) {
      return e;
    }
  }
  GetClientHandBookType(e, o) {
    let t = undefined;
    switch (e) {
      case Protocol_1.Aki.Protocol.N6s.Proto_Monster:
        t = 0;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse:
        t = 1;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint:
        t = 2;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Weapon:
        t = 3;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Animal:
        t = 4;
        break;
      case Protocol_1.Aki.Protocol.N6s.mOs:
        t = 5;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Chip:
        t = 6;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Photograph:
        if (o) {
          switch (o) {
            case Protocol_1.Aki.Protocol.hws.Proto_PhotographSub:
              t = 7;
              break;
            case Protocol_1.Aki.Protocol.hws.aTs:
              t = 9;
              break;
            case Protocol_1.Aki.Protocol.hws.RUs:
              t = 8;
              break;
            default:
              t = 7;
          }
        } else {
          t = 7;
        }
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Noun:
        t = 11;
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HandBook", 5, "GetClientHandBookType 错误，不在目标类型内", ["type", e]);
        }
        t = 0;
    }
    return t;
  }
  GetServerHandBookType(e) {
    let o = undefined;
    switch (e) {
      case 0:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Monster;
        break;
      case 1:
        o = Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse;
        break;
      case 2:
        o = Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint;
        break;
      case 3:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Weapon;
        break;
      case 4:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Animal;
        break;
      case 5:
        o = Protocol_1.Aki.Protocol.N6s.mOs;
        break;
      case 6:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Chip;
        break;
      case 7:
      case 9:
      case 8:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
        break;
      case 11:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Noun;
        break;
      default:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
    }
    return o;
  }
  GetServerHandBookTypeList(o) {
    var t = o.length;
    var r = [];
    for (let e = 0; e < t; e++) {
      var a = this.GetServerHandBookType(o[e]);
      r.push(a);
    }
    return r;
  }
  GetAnimalConfigByMeshId(e) {
    if (this.Hei.size === 0) {
      var o = ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
      var t = o.length;
      for (let e = 0; e < t; e++) {
        var r = o[e];
        this.Hei.set(r.MeshId, r);
      }
    }
    return this.Hei.get(e);
  }
  GetRoleHandBookCount() {
    let e = 0;
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleList().filter(e => e.RoleType === 1 && !ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id) && this.GetRoleCanShowInHandBook(e.Id));
    for (const t of o) {
      if (ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id)) {
        e++;
      }
    }
    return [e + 1, o.length + 1];
  }
  GetQuestCount() {
    let e = 0;
    var o = ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
    for (const r of o) {
      var t = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(r.Type).Type;
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(t, r.Id)) {
        e++;
      }
    }
    return [e, o.length];
  }
  GetAllHandBookMonsterIdList() {
    var e = [];
    for (const o of ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList() ?? []) {
      if (!o.IsSkin) {
        e.push(o.Id);
      }
    }
    return e;
  }
  GetAllHandBookWeaponIdList() {
    var e = [];
    for (const o of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponForHandBook() ?? []) {
      if (!this.WeaponOpenTimeLockMap.get(o.ItemId)) {
        e.push(o.ItemId);
      }
    }
    return e;
  }
  GetAllHandBookWeaponSkinIdList() {
    var e = [];
    for (const o of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinForHandBook() ?? []) {
      if (!this.WeaponOpenTimeLockMap.get(o.Id)) {
        e.push(o.Id);
      }
    }
    return e;
  }
  RefreshRoleHandBookOpenTime(e) {
    for (const o of e) {
      this.RoleOpenTimeLockMap.set(o.Q6n, MathUtils_1.MathUtils.LongToNumber(o.yzs) > TimeUtil_1.TimeUtil.GetServerTime());
    }
  }
  GetRoleCanShowInHandBook(e) {
    return !this.RoleOpenTimeLockMap.get(e);
  }
  RefreshWeaponHandBookOpenTime(e) {
    for (const o of e) {
      this.WeaponOpenTimeLockMap.set(o.zys, MathUtils_1.MathUtils.LongToNumber(o.yzs) > TimeUtil_1.TimeUtil.GetServerTime());
    }
  }
}
exports.HandBookModel = HandBookModel;
//# sourceMappingURL=HandBookModel.js.map