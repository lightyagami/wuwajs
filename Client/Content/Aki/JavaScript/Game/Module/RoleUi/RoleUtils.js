"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleUtils = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const RoleDefine_1 = require("./RoleDefine");
class RoleUtils {
  static IsTrialRole(e) {
    return e > RoleDefine_1.ROBOT_DATA_MIN_ID;
  }
  static GetTrialRoleType(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e);
    if (e) {
      return e.Type;
    } else {
      return 0;
    }
  }
  static IsSpecialTrialRole(e) {
    return !!RoleUtils.IsTrialRole(e) && (e = RoleUtils.GetTrialRoleType(e)) !== 0 && e !== 1;
  }
  static GetTrailRoleRealRoleId(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e).ParentId;
  }
  static GetTrailRoleLabelIconById(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(e);
    if (e) {
      return RoleUtils.GetTrialRoleLabelIconByType(e.Type);
    } else {
      return "";
    }
  }
  static GetTrialRoleLabelIconByType(e) {
    switch (e) {
      case 1:
        return "SP_TagRoleTrial00";
      case 2:
        return "SP_TagRoleTrial02";
      case 3:
        return "SP_TagRoleTrial01";
      default:
        return "SP_TagRoleTrial00";
    }
  }
  static GetRoleRealId(e) {
    if (RoleUtils.IsTrialRole(e)) {
      return RoleUtils.GetTrailRoleRealRoleId(e);
    } else {
      return e;
    }
  }
  static HasMultiTrialRole(t, e, l = undefined) {
    var i = e.findIndex(e => e === t);
    if (i === -1) {
      i = RoleUtils.u9f(t, e, l);
      if (RoleUtils.IsSpecialTrialRole(t)) {
        for (const r of i) {
          if (r !== t && RoleUtils.IsSpecialTrialRole(r)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static HasSameRole(t, e, l = undefined) {
    var i = e.findIndex(e => e === t);
    if (i === -1) {
      for (const r of RoleUtils.u9f(t, e, l)) {
        if (t !== r && RoleUtils.GetRoleRealId(t) === RoleUtils.GetRoleRealId(r)) {
          return true;
        }
      }
    }
    return false;
  }
  static u9f(e, t, l) {
    if (l !== undefined && !(l < 0) && !(l >= t.length)) {
      (t = [...t])[l] = e;
    }
    return t;
  }
}
exports.RoleUtils = RoleUtils;
//# sourceMappingURL=RoleUtils.js.map