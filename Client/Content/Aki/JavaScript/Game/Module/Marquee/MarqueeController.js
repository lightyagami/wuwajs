"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarqueeController = undefined;
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Http_1 = require("../../../Core/Http/Http");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const CdnServerDebugConfig_1 = require("../Debug/CdnServerDebugConfig");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const MarqueeModel_1 = require("./MarqueeModel");
const INTERVAL_OFFSET = 5;
class MarqueeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LocalStorageInitPlayerId, MarqueeController.VAi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, MarqueeController.HAi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, MarqueeController.jAi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LocalStorageInitPlayerId, MarqueeController.VAi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, MarqueeController.HAi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, MarqueeController.jAi);
  }
  static TestMarquee(e) {
    e = "[{\"contents\":[{\"language\":\"zh-Hans\",\"content\":\"10047跑马灯已上架\"},{\"language\":\"en\",\"content\":\"10047跑马灯已上架\"},{\"language\":\"ja\",\"content\":\"\"},{\"language\":\"ko\",\"content\":\"\"},{\"language\":\"ru\",\"content\":\"\"},{\"language\":\"zh-Hant\",\"content\":\"\"},{\"language\":\"de\",\"content\":\"\"},{\"language\":\"es\",\"content\":\"\"},{\"language\":\"pt\",\"content\":\"\"},{\"language\":\"id\",\"content\":\"\"},{\"language\":\"fr\",\"content\":\"\"},{\"language\":\"vi\",\"content\":\"\"},{\"language\":\"th\",\"content\":\"\"}],\"id\":10048,\"startTimeMs\":1698313421000,\"endTimeMs\":1703148916000,\"timeInterval\":0,\"times\":999,\"platform\":[1,2,3],\"channel\":[\"0\",\"18\"]},{\"contents\":[{\"language\":\"zh-Hans\",\"content\":\"第二条跑马灯5444545454545445454545454\"},{\"language\":\"en\",\"content\":\"en 第二条跑马灯\"},{\"language\":\"ja\",\"content\":\"\"},{\"language\":\"ko\",\"content\":\"\"},{\"language\":\"ru\",\"content\":\"\"},{\"language\":\"zh-Hant\",\"content\":\"\"},{\"language\":\"de\",\"content\":\"\"},{\"language\":\"es\",\"content\":\"\"},{\"language\":\"pt\",\"content\":\"\"},{\"language\":\"id\",\"content\":\"\"},{\"language\":\"fr\",\"content\":\"\"},{\"language\":\"vi\",\"content\":\"\"},{\"language\":\"th\",\"content\":\"\"}],\"id\":{0},\"startTimeMs\":1701846026000,\"endTimeMs\":1708142026000,\"timeInterval\":10,\"times\":2,\"platform\":[1,3],\"channel\":[]}]".replace("{0}", e);
    this.WAi(200, e);
    MarqueeController.CloseMarqueeView(true);
  }
  static WAi(e, n) {
    const a = ModelManager_1.ModelManager.MarqueeModel;
    if (e !== 200 && e === 404) {
      MarqueeController.nhh();
    } else if (n?.includes("contents")) {
      if (e = Json_1.Json.Parse(n)) {
        e.forEach(e => {
          var n = new MarqueeModel_1.MarqueeData();
          n.Phrase(e);
          a.AddOrUpdateMarqueeDate(n);
        });
        if (a.CurMarquee && !PublicUtil_1.PublicUtil.IsInIpWhiteList(a.CurMarquee.WhiteLists)) {
          MarqueeController.CloseMarqueeView(false);
        }
      } else {
        MarqueeController.nhh();
      }
    }
  }
  static AddClientMarqueeData(e) {
    if (e.IsClientMarquee) {
      ModelManager_1.ModelManager.MarqueeModel.AddOrUpdateMarqueeDate(e);
      MarqueeController.QAi();
    }
  }
  static nhh() {
    if (UiManager_1.UiManager.IsViewShow("MarqueeView")) {
      UiManager_1.UiManager.CloseView("MarqueeView");
    }
    ModelManager_1.ModelManager.MarqueeModel.RemoveServerMarqueeData();
  }
  static CloseMarqueeView(e = true) {
    var n = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
    if (!ModelManager_1.ModelManager.MarqueeModel.RemoveMarqueeData(n?.Id)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Marquee", 27, "跑马灯数据异常, 数据重复删除", ["incId", n?.Id]);
      }
    }
    ModelManager_1.ModelManager.MarqueeModel.CurMarquee = undefined;
    if (UiManager_1.UiManager.IsViewShow("MarqueeView")) {
      UiManager_1.UiManager.CloseView("MarqueeView", () => {
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Marquee", 27, "关闭跑马灯检查下一个跑马灯");
          }
          MarqueeController.QAi();
        }
      });
    } else if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Marquee", 27, "检查下一个跑马灯");
      }
      MarqueeController.QAi();
    }
  }
  static QAi() {
    var e;
    if (UiManager_1.UiManager.IsViewShow("MarqueeView") || UiManager_1.UiManager.IsViewOpen("MarqueeView")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Marquee", 27, "CheckMarquee", ["IsViewShow", UiManager_1.UiManager.IsViewShow("MarqueeView")], ["IsViewOpen", UiManager_1.UiManager.IsViewOpen("MarqueeView")]);
      }
    } else {
      ModelManager_1.ModelManager.MarqueeModel.SortMarqueeQueue();
      if (e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData()) {
        if (this.CheckCurMarqueeValid(e) && PublicUtil_1.PublicUtil.IsInIpWhiteList(e.WhiteLists)) {
          UiManager_1.UiManager.OpenView("MarqueeView");
        } else {
          ModelManager_1.ModelManager.MarqueeModel.RemoveMarqueeData(e.Id);
          MarqueeController.QAi();
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Marquee", 27, "获取队列的第一个跑马灯数据空");
      }
    }
  }
  static CheckCurMarqueeValid(e) {
    var n;
    var a;
    return !!e && !(n = TimeUtil_1.TimeUtil.GetServerTime(), a = ModelManager_1.ModelManager.MarqueeModel.GetScrollingTime(e), n > e.EndTime) && !(n < e.BeginTime) && !(a >= e.ScrollTimes);
  }
}
(exports.MarqueeController = MarqueeController).VAi = () => {
  ModelManager_1.ModelManager.MarqueeModel.InitMarqueeStorageDataMap();
};
MarqueeController.jAi = () => {
  if (MarqueeModel_1.MarqueeModel.TimerId !== undefined) {
    TimerSystem_1.GameplayTimerSystem.Remove(MarqueeModel_1.MarqueeModel.TimerId);
    MarqueeModel_1.MarqueeModel.TimerId = undefined;
  }
};
MarqueeController.HAi = () => {
  if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.EnterGameRet) && MarqueeModel_1.MarqueeModel.TimerId === undefined) {
    MarqueeModel_1.MarqueeModel.TimerId = TimerSystem_1.GameplayTimerSystem.Forever(MarqueeController.XAi, TimeUtil_1.TimeUtil.Minute * TimeUtil_1.TimeUtil.InverseMillisecond - Math.random() * INTERVAL_OFFSET * TimeUtil_1.TimeUtil.InverseMillisecond);
  }
};
MarqueeController.XAi = () => {
  var e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
  if (!StringUtils_1.StringUtils.IsEmpty(e) && (e = PublicUtil_1.PublicUtil.GetMarqueeUrl2(PublicUtil_1.PublicUtil.GetGameId(), e), e = CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetMarqueeDebugUrl(e))) {
    Http_1.Http.Get(e, undefined, (e, n, a) => {
      MarqueeController.WAi(n, a);
      MarqueeController.QAi();
    });
  }
}; //# sourceMappingURL=MarqueeController.js.map