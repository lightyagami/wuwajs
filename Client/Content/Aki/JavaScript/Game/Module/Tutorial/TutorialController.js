"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TutorialController = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  TutorialDefine_1 = require("./TutorialDefine");
class TutorialController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e)
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20559, this.PRo)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20559)
  }
  static OpenExclusiveTutorial(e) {
    e = {
      ExclusiveType: e
    };
    UiManager_1.UiManager.OpenView("TutorialPopView", e)
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("TutorialView", TutorialController.iVe, "TutorialController.CanOpenView")
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("TutorialView", TutorialController.iVe)
  }
  static OnTutorialTipExistChanged(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTutorialTipExistChanged, e)
  }
  static GmUnlockOneTutorial(e) {
    var r = Protocol_1.Aki.Protocol.E0s.create();
    r.s5n = e, Net_1.Net.Call(27404, r, e => {
      e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(e.aOs)
    })
  }
  static RemoveRedDotTutorialId(r) {
    ModelManager_1.ModelManager.TutorialModel.RemoveRedDotTutorialId(r), ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(r)?.DefaultUnlock ? TutorialController.TryUnlockAndOpenTutorialTip(r, e => {
      e && this.xRo(r)
    }) : this.xRo(r)
  }
  static xRo(e) {
    var r;
    ConfigManager_1.ConfigManager.TutorialConfig.HasUnlockReward(e) && ((r = Protocol_1.Aki.Protocol.E0s.create()).s5n = e, Net_1.Net.Call(29992, r, e => {
      if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        var r = Number(Object.keys(e._vs)[0]),
          t = e._vs[r],
          o = ModelManager_1.ModelManager.TutorialModel.RewardList;
        if (0 < o.length)
          for (let e = 0; e < o.length; e++) {
            var [a, n] = o[e];
            if (a === r) {
              o[e] = [a, n + t];
              break
            }
          } else o.push([r, t])
      }
    }))
  }
  static TryOpenAwardUiViewPending() {
    0 < ModelManager_1.ModelManager.TutorialModel.RewardList.length && (ItemHintController_1.ItemHintController.AddItemRewardInfoList(ModelManager_1.ModelManager.TutorialModel.RewardList), ModelManager_1.ModelManager.TutorialModel.RewardList = [])
  }
  static TryUnlockAndOpenTutorialTip(e, r = void 0) {
    const t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(e);
    var o = t?.CopiedFrom || e;
    const a = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(o);
    t?.PageId?.length !== a?.PageId?.length || t?.PageId?.some((e, r) => e !== a?.PageId[r]) ? (Log_1.Log.CheckError() && Log_1.Log.Error("Tutorial", 74, "复制图文引导和源图文引导内容不一致", ["Id", e]), r(!1)) : ModelManager_1.ModelManager.TutorialModel.GetSavedDataById(o) && !t?.DefaultUnlock ? r(!0) : ((e = Protocol_1.Aki.Protocol.E0s.create()).s5n = o, Net_1.Net.Call(27404, e, e => {
      !e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? r(!1) : (t?.DefaultUnlock || ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(e.aOs), r(!0))
    }))
  }
}(exports.TutorialController = TutorialController).PRo = e => {
  if (e)
    for (const r of e.sOs) ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(r)
}, TutorialController.Q5e = () => {
  ModelManager_1.ModelManager.TutorialModel.InitDefaultUnlockTutorials();
  var e = Protocol_1.Aki.Protocol.p0s.create();
  Net_1.Net.Call(16696, e, e => {
    e && (ModelManager_1.ModelManager.TutorialModel.InitUnlockTutorials(e.sOs), (e = ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(TutorialDefine_1.ETutorialType.All))?.length && ModelManager_1.ModelManager.TutorialModel.InvokeTutorialRedDot(e[0].SavedData), ModelManager_1.ModelManager.TutorialModel.InitTutorialTotalData())
  })
}, TutorialController.iVe = e => !(!ModelManager_1.ModelManager.FunctionModel.IsOpen(10022) || UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") && !UiManager_1.UiManager.IsViewOpen("FunctionView") && !ModelManager_1.ModelManager.GuideModel.HaveCurrentTutorial()), TutorialController.OpenTutorialView = () => {
  UiManager_1.UiManager.OpenView("TutorialView")
};
//# sourceMappingURL=TutorialController.js.map