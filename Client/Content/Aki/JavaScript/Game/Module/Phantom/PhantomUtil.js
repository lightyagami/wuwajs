"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomUtil = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CombatLog_1 = require("../../Utils/CombatLog");
var ESummonType = Protocol_1.Aki.Protocol.Summon.x3s;
const PHANTOMSKILLIDSTART = 200000;
const VISION_MORPH_SKILL_ID = 200001;
const VISION_MORPH_MULTI_SKILL_ID = 200003;
class PhantomUtil {
  static GetEntityVisionSkillId(e, t) {
    t = this.GetSkillGroupId(t);
    if (t === VISION_MORPH_SKILL_ID) {
      e = this.GetSummonedEntityByOwnerId(e, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
      if (e?.Valid) {
        e = e.Entity.GetComponent(43);
        if (e?.IsInMultiSkill()) {
          if (e?.CanSummonerStartNextMultiSkill()) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "幻象可以使用下一段技能,SkillId返回200003");
            }
            return VISION_MORPH_MULTI_SKILL_ID;
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "幻象还不能使用下一段技能,但是已经进入多段技能状态,SkillId返回0");
            }
            return 0;
          }
        }
      }
    }
    return t;
  }
  static GetSkillGroupId(e) {
    if (e >= PHANTOMSKILLIDSTART) {
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e).SkillGroupId;
    } else if (e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e)) {
      return e.SkillGroupId;
    } else {
      return 0;
    }
  }
  static GetSkillCd(e) {
    if (!(e < PHANTOMSKILLIDSTART) && (e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e))) {
      return e.SkillCD;
    } else {
      return -1;
    }
  }
  static GetSkillBuffIds(e) {
    if (!(e < PHANTOMSKILLIDSTART) && (e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e))) {
      return e.BuffIds;
    } else {
      return [];
    }
  }
  static GetSkillSettleIds(e) {
    if (!(e < PHANTOMSKILLIDSTART) && (e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e))) {
      return e.SettleIds;
    } else {
      return [];
    }
  }
  static GetVisionData(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(18, e.toString());
  }
  static GetSummonedEntity(e, t, i = 1) {
    var r = e.GetComponent(0);
    let n = 0;
    switch (t) {
      case ESummonType.Proto_ESummonTypeConcomitantCustom:
        var a = r.CustomServerEntityIds;
        if (a.length === 0) {
          return;
        }
        if (i < 1 || i > a.length) {
          CombatLog_1.CombatLog.Error("Skill", e, "获取伴生物实体失败，位置参数错误", ["position", i], ["serverEntityIds", a]);
          return;
        }
        n = a[i - 1];
        break;
      case ESummonType.Proto_ESummonTypeConcomitantVision:
        a = e.GetComponent(44)?.GetCurrentPosition() ?? 0;
        n = r.VisionServerEntityIds[a];
        break;
      case ESummonType.Proto_ESummonTypeConcomitantPhantomRole:
        n = r.VisionControlCreatureDataId ?? 0;
        break;
      case ESummonType.Proto_ESummonTypeConcomitantWeakVision:
        n = r.BossRushCreatureDataId;
        break;
      case ESummonType.Proto_ESummonTypeConcomitantMotorcycle:
        n = MathUtils_1.MathUtils.LongToNumber(r.FollowerInfo?.F4n ?? 0);
    }
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
  }
  static GetSummonedEntityByOwnerId(e, t, i = 1) {
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    if (e?.Valid) {
      e = PhantomUtil.GetSummonedEntity(e.Entity, t, i);
      if (e?.Valid) {
        return e;
      }
    }
  }
  static SetVisionEnable(e, t, i, r = true) {
    var n = e.GetComponent(0);
    var e = e.GetComponent(44);
    if (n && e && (e = e.GetCurrentPosition(), n = n.VisionServerEntityIds[e]) && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(n))) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, t, i, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomEnableStateChange, t);
    }
  }
  static OpenVisionEquipmentView(e, t = -1) {
    e = {
      RoleId: e,
      SelectIndex: t
    };
    UiManager_1.UiManager.OpenView("VisionEquipmentView", e);
  }
  static CloseAndOpenVisionEquipmentView(e, t, i = -1) {
    t = {
      RoleId: t,
      SelectIndex: i
    };
    UiManager_1.UiManager.CloseAndOpenView(e, "VisionEquipmentView", t);
  }
}
exports.PhantomUtil = PhantomUtil;
//# sourceMappingURL=PhantomUtil.js.map