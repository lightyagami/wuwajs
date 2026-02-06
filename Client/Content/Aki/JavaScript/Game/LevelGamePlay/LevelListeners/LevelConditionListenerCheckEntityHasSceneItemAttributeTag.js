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
    this.fMm = undefined;
    this.kHa = undefined;
    this.gMm = () => {
      this.Callback?.();
    };
  }
  OnListen(t, e, i) {
    this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCheckEntityHasSceneItemAttributeTag", t.EntityId, e => {
      this.kHa = undefined;
      this.fMm = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId)?.Entity;
      this.CMm();
    }, undefined, false, true);
  }
  CMm() {
    if (this.fMm?.Valid) {
      var e = this.fMm.GetComponent(217);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.AddTagAddOrRemoveListener(t, this.gMm);
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
    if (this.fMm?.Valid) {
      var e = this.fMm.GetComponent(217);
      if (e) {
        for (const t of this.ListeningInfo.Tags) {
          e.RemoveTagAddOrRemoveListener(t, this.gMm);
        }
      }
    }
  }
}
exports.LevelConditionListenerCheckEntityHasSceneItemAttributeTag = LevelConditionListenerCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=LevelConditionListenerCheckEntityHasSceneItemAttributeTag.js.map