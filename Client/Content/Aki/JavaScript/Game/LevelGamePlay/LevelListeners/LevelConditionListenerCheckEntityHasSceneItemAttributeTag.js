"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckEntityHasSceneItemAttributeTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckEntityHasSceneItemAttributeTag extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Dgm = undefined;
    this.kHa = undefined;
    this.Ugm = () => {
      this.Callback?.();
    };
  }
  OnListen(t, e, i) {
    this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCheckEntityHasSceneItemAttributeTag", t.EntityId, e => {
      this.kHa = undefined;
      this.Dgm = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId)?.Entity;
      this.xgm();
    }, undefined, false, true);
  }
  xgm() {
    if (this.Dgm?.Valid) {
      var e = this.Dgm.GetComponent(209);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.AddTagAddOrRemoveListener(t, this.Ugm);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 39, "实体状态条件监听失败: 实体无Tag组件");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 39, "实体状态条件监听失败: 实体无效");
    }
  }
  OnUnListen() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (this.kHa) {
      this.kHa.Cancel();
    }
    this.kHa = undefined;
    if (this.Dgm?.Valid) {
      var e = this.Dgm.GetComponent(209);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.RemoveTagAddOrRemoveListener(t, this.Ugm);
        }
      }
    }
  }
}
exports.LevelConditionListenerCheckEntityHasSceneItemAttributeTag = LevelConditionListenerCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=LevelConditionListenerCheckEntityHasSceneItemAttributeTag.js.map