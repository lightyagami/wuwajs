"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayModel = undefined;
const BirthDayByYear_1 = require("../../../Core/Define/ConfigQuery/BirthDayByYear");
const RoleBirthdayAll_1 = require("../../../Core/Define/ConfigQuery/RoleBirthdayAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const BirthdayController_1 = require("./BirthdayController");
class BirthdayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PI1 = false;
    this.ResetYear = 0;
    this.xI1 = new Map();
    this.ThisBirthdayYear = 0;
    this.IsReceiveBirthdayReward = false;
  }
  IsDuringBirthday() {
    if (!this.PI1) {
      return false;
    }
    var e = new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()).getFullYear();
    this.ThisBirthdayYear = e;
    var t = BirthDayByYear_1.configBirthDayByYear.GetConfig(e).ValidDay + 1;
    let r = 0;
    if (e - 1 >= this.ResetYear) {
      var i = this.GetBirthdayDate(e - 1);
      if ((r = this.CalculateDayGapBetweenNow(i)) >= 0 && r <= t) {
        this.ThisBirthdayYear = e - 1;
        return true;
      }
    }
    i = this.GetBirthdayDate(e);
    return (r = this.CalculateDayGapBetweenNow(i)) >= 0 && r <= t;
  }
  GetBirthdayDate(e) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    var r = Math.floor(t / 100);
    let i = t % 100;
    if ((e % 4 != 0 || e % 100 == 0) && e % 400 != 0) {
      if (r === 2 && i === 29) {
        i -= 1;
      }
    }
    return new Date(e, r - 1, i);
  }
  CalculateDayGapBetweenNow(e) {
    return (TimeUtil_1.TimeUtil.GetServerTimeStamp() - e.getTime()) / TimeUtil_1.TimeUtil.InverseMillisecond / 86400;
  }
  UpdateBirthdayInfo(e) {
    this.PI1 = e.WS1;
    if (e.WS1) {
      for (const r of e.fUs) {
        this.xI1.set(r.$S1, r.RUs);
      }
      var t = this.IsDuringBirthday();
      if (e.QS1 === this.ThisBirthdayYear) {
        this.IsReceiveBirthdayReward = true;
      }
      if (!this.IsReceiveBirthdayReward && t) {
        BirthdayController_1.BirthdayController.TryOpenBirthdayView();
      }
    }
  }
  GetRoleIdList() {
    var e = [];
    var t = Array.from(RoleBirthdayAll_1.configRoleBirthdayAll.GetConfigList() ?? []);
    t.sort((e, t) => {
      var r;
      var i;
      var a = e.RoleId;
      var o = t.RoleId;
      var s = this.IsRoleSelected(a);
      var h = this.IsRoleSelected(o);
      if (s || h) {
        if (s) {
          return 1;
        } else {
          return -1;
        }
      } else {
        h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a);
        s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o);
        r = !h && e.Priority !== 0;
        i = !s && t.Priority !== 0;
        if (r && i) {
          return t.Priority - e.Priority;
        } else if (r || i) {
          if (i) {
            return 1;
          } else {
            return -1;
          }
        } else if (h && s) {
          if ((t = h.GetFavorData().GetFavorLevel()) !== (e = s.GetFavorData().GetFavorLevel())) {
            return e - t;
          } else if ((r = h.GetFavorData().GetFavorExp()) !== (i = s.GetFavorData().GetFavorExp())) {
            return i - r;
          } else {
            e = h.GetRoleCreateTime();
            return s.GetRoleCreateTime() - e;
          }
        } else if (h || s) {
          if (s) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return o - a;
        }
      }
    });
    for (const r of t) {
      if (r) {
        e.push(r.RoleId);
      }
    }
    return e;
  }
  ResetBirthday() {
    this.PI1 = true;
    if (this.IsDuringBirthday()) {
      BirthdayController_1.BirthdayController.TryOpenBirthdayView();
    }
  }
  IsRoleSelected(e) {
    for (var [, t] of this.xI1) {
      if (e === t) {
        return true;
      }
    }
    return false;
  }
  GetBirthdayCount() {
    let e = 0;
    for (var [, t] of this.xI1) {
      if (t) {
        e++;
      }
    }
    return e;
  }
  GetSelectedRoleId(e) {
    return this.xI1.get(e);
  }
  GetBirthdayRedDotState() {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10084) && !this.PI1;
  }
  GetBirthdayIsReset() {
    return this.PI1;
  }
  SetIsReceiveBirthdayReward(e) {
    this.IsReceiveBirthdayReward = e;
  }
  SetSelectedRole(e, t) {
    this.xI1.set(t, e);
  }
}
exports.BirthdayModel = BirthdayModel;
//# sourceMappingURL=BirthdayModel.js.map