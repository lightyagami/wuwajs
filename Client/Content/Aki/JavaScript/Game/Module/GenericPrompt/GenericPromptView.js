"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPromptView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PromptForFloatLineView_1 = require("./GenericPromptSubViews/PromptForFloatLineView");
class GenericPromptView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.E7 = (e, t) => {
      var i = ConfigManager_1.ConfigManager.GenericPromptConfig;
      var e = i.GetPriority(e);
      return i.GetPriority(t) - e;
    };
    this.CanCancelPromptMap = new Map();
    this.eJt = new PriorityQueue_1.PriorityQueue(this.E7);
    this.tJt = undefined;
    this.iJt = e => {
      if (e.PromptKey) {
        this.CanCancelPromptMap.set(e.PromptKey, e);
      }
      this.eJt.Push(e);
      this.oJt();
    };
    this.nbu = e => {
      var t = this.CanCancelPromptMap.get(e);
      if (t) {
        this.eJt.Remove(t);
        this.CanCancelPromptMap.delete(e);
      } else if (this.tJt?.ParamHub?.PromptKey && this.tJt?.ParamHub?.PromptKey === e) {
        this.tJt.HideView();
      }
    };
    this.rJt = e => {
      if (!this.eJt.Empty) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GenericPrompt", 10, "获取下一个显示数据");
        }
        this.oJt();
      }
    };
    this.OnPreparePhotoScreenShot = () => {
      if (this.tJt?.IsShowOrShowing) {
        this.tJt?.GetRootItem()?.SetUIActive(false);
        this.tJt?.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.tJt = new PromptForFloatLineView_1.PromptForFloatLineView();
    this.tJt.SetHideCallback(this.rJt);
    await this.tJt.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.nJt();
  }
  OnTick(e) {
    this.tJt.Tick(e);
  }
  OnBeforeDestroy() {
    this.tJt.SetHideCallback(undefined);
    this.eJt.Clear();
    this.CanCancelPromptMap.clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InsertFloatTips, this.iJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveFloatTips, this.nbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.OnPreparePhotoScreenShot);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InsertFloatTips, this.iJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveFloatTips, this.nbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.OnPreparePhotoScreenShot);
  }
  nJt() {
    var e;
    var t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(9);
    if (t.OffsetY !== 0) {
      (e = this.GetItem(0)).SetAnchorOffsetY(e.GetAnchorOffsetY() + t.OffsetY);
    }
  }
  sJt(e) {
    this.tJt.SetPromptHub(e);
    this.tJt.ShowView();
  }
  oJt() {
    var e = this.eJt.Pop();
    if (e.PromptKey) {
      this.CanCancelPromptMap.delete(e.PromptKey);
    }
    this.sJt(e);
  }
}
exports.GenericPromptView = GenericPromptView;
//# sourceMappingURL=GenericPromptView.js.map