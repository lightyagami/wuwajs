"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BirthDayByYear_1 = require("../../../Core/Define/ConfigQuery/BirthDayByYear");
const RoleBirthdayAll_1 = require("../../../Core/Define/ConfigQuery/RoleBirthdayAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const BirthdayController_1 = require("./BirthdayController");
const DEFAULT_YEAR = 2025;
const TWO_THOUSAND = 2000;
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
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncBirthdayResetState, this.PI1);
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
      var n = this.IsRoleSelected(a);
      var h = this.IsRoleSelected(o);
      if (n || h) {
        if (n) {
          return 1;
        } else {
          return -1;
        }
      } else {
        h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a);
        n = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o);
        r = !h && e.Priority !== 0;
        i = !n && t.Priority !== 0;
        if (r && i) {
          return t.Priority - e.Priority;
        } else if (r || i) {
          if (i) {
            return 1;
          } else {
            return -1;
          }
        } else if (h && n) {
          if ((t = h.GetFavorData().GetFavorLevel()) !== (e = n.GetFavorData().GetFavorLevel())) {
            return e - t;
          } else if ((r = h.GetFavorData().GetFavorExp()) !== (i = n.GetFavorData().GetFavorExp())) {
            return i - r;
          } else {
            e = h.GetRoleCreateTime();
            return n.GetRoleCreateTime() - e;
          }
        } else if (h || n) {
          if (n) {
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
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncBirthdayResetState, this.PI1);
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
  GetLetterViewResource(e) {
    if (e === DEFAULT_YEAR) {
      return "";
    } else {
      return "UiView_BirthdayLetter" + e % TWO_THOUSAND;
    }
  }
  GetRoleSelectViewResource(e) {
    if (e === DEFAULT_YEAR) {
      return "";
    } else {
      return "UiView_BirthdayRole" + e % TWO_THOUSAND;
    }
  }
  GetSelectConfirmViewResource(e) {
    if (e === DEFAULT_YEAR) {
      return "";
    } else {
      return "UiView_BirthdayConfirm" + e % TWO_THOUSAND;
    }
  }
  GetLetterViewBgm(e) {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BirthdayLetterBGM20" + e % TWO_THOUSAND) ?? "";
  }
  GetLetterExitConfirmId(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BirthdayLetterExitConfirmId20" + e % TWO_THOUSAND) ?? 302;
  }
  GetPlayTimeOffset() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("BirthdayTextPlayTimeOffset") ?? 0;
  }
}
exports.BirthdayModel = BirthdayModel;
//# sourceMappingURL=BirthdayModel.js.map