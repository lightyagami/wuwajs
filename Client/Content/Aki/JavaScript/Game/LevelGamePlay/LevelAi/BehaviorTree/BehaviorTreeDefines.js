"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeDefines = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const PATROL_STATE_PREFIX = "IN_PATROL";
const PATROL_ACTIONS_STATE_PREFIX = "PATROL_ACTIONS";
const ACTIONS_STATE_PREFIX = "IN_ACTIONS";
class BehaviorTreeDefines {
  static get UseLevelAiBehaviorTree() {
    if (!this.hIe) {
      this.hIe = true;
      this.lIe = this._Ie();
    }
    return this.lIe;
  }
  static set UseLevelAiBehaviorTree(e) {
    if (!this.hIe) {
      this.hIe = true;
      this.lIe = this._Ie();
    }
    if (this.lIe !== e) {
      this.lIe = e;
    }
  }
  static CanUseLevelAiBehaviorTree(e) {
    e = e.GetComponent(0)?.GetPbEntityInitData();
    return !!e?.ComponentsData && !!(0, IComponent_1.getComponent)(e.ComponentsData, "LevelAiComponent")?.BtTreeAsset;
  }
  static GetLevelAiBehaviorTreeAssetPath(t) {
    t = t.GetComponent(0)?.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "LevelAiComponent")?.BtTreeAsset;
      if (t && t !== "") {
        let e = t.lastIndexOf(".");
        if (e === -1) {
          e = t.length;
        }
        var r = t.lastIndexOf("/", e - 1);
        var i = t.substring(r + 1, e);
        return t.substring(0, r + 1) + (i + ".") + i;
      }
    }
  }
  static _Ie() {
    var e = "" + UE.BlueprintPathsLibrary.ProjectDir() + this.uIe;
    var t = (0, puerts_1.$ref)(undefined);
    return UE.KuroStaticLibrary.LoadFileToString(t, e) && (0, puerts_1.$unref)(t) === "true";
  }
  static GetPatrolActionStateName(e, t) {
    return `${PATROL_ACTIONS_STATE_PREFIX}_${t.toString()}_${e.toString()}`;
  }
  static GetPatrolStateName(e) {
    return PATROL_STATE_PREFIX + "_" + e.toString();
  }
  static GetActionStateName(e) {
    return ACTIONS_STATE_PREFIX + "_" + e.toString();
  }
  static GetBehaviorTreePath(e, t, r = false) {
    e = "BT_" + e.toString();
    t = `${this.cIe}/${t.toString()}/${e}`;
    if (r) {
      return t + "." + e;
    } else {
      return t;
    }
  }
  static GetDoOnceBlackBoardKey(e) {
    return this.DoOnceCheckName + "_" + e;
  }
}
(exports.BehaviorTreeDefines = BehaviorTreeDefines).cIe = "/Game/Aki/AI/AINPC/LevelAiBT";
BehaviorTreeDefines.uIe = "IsUseLevelAiBehaviorTree";
BehaviorTreeDefines.BehaviorTreePatrolStateName = "PATROL_STATE";
BehaviorTreeDefines.LevelAiSwitchName = "LEVEL_AI_STOP";
BehaviorTreeDefines.PatrolFinishName = "PATROL_COMPLETE";
BehaviorTreeDefines.DoOnceCheckName = "DO_ONCE_CHECK";
BehaviorTreeDefines.lIe = false;
BehaviorTreeDefines.hIe = false; //# sourceMappingURL=BehaviorTreeDefines.js.map