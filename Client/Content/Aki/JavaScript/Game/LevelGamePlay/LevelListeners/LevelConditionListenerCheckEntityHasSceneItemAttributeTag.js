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
    this.cMm = undefined;
    this.kHa = undefined;
    this.dMm = () => {
      this.Callback?.();
    };
  }
  OnListen(t, e, i) {
    this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCheckEntityHasSceneItemAttributeTag", t.EntityId, e => {
      this.kHa = undefined;
      this.cMm = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId)?.Entity;
      this.mMm();
    }, undefined, false, true);
  }
  mMm() {
    if (this.cMm?.Valid) {
      var e = this.cMm.GetComponent(215);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.AddTagAddOrRemoveListener(t, this.dMm);
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
    if (this.cMm?.Valid) {
      var e = this.cMm.GetComponent(215);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.RemoveTagAddOrRemoveListener(t, this.dMm);
        }
      }
    }
  }
}
exports.LevelConditionListenerCheckEntityHasSceneItemAttributeTag = LevelConditionListenerCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=LevelConditionListenerCheckEntityHasSceneItemAttributeTag.js.map