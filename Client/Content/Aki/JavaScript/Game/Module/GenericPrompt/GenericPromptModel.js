"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPromptModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class GenericPromptModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.obu = new Array();
    this.WYt = () => {
      for (let e = 0, t = this.obu.length; e < t; ++e) {
        this.ApplyPromptParamHub(this.obu.shift());
      }
      if (this.obu.length > 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("GenericPrompt", 10, "播放队列飘字异常,存在从队列中取出又被放回队列的情况");
      }
    };
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFinishLoadingState, this.WYt);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFinishLoadingState, this.WYt);
    return !(this.obu.length = 0);
  }
  KYt() {
    return ModelManager_1.ModelManager.LoadingModel.IsLoading || ModelManager_1.ModelManager.LoginModel.HasLoginPromise();
  }
  ApplyPromptParamHub(e) {
    if (this.KYt()) {
      this.obu.push(e);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InsertFloatTips, e);
    }
  }
  RemovePromptParamHubByKey(r) {
    for (let e = 0, t = this.obu.length; e < t; ++e) {
      var n = this.obu[e];
      if (n?.PromptKey && n?.PromptKey === r) {
        this.obu.splice(e, 1);
        return;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveFloatTips, r);
  }
}
exports.GenericPromptModel = GenericPromptModel;
//# sourceMappingURL=GenericPromptModel.js.map