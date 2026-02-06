"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgPanelViewSmall = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const PhoneMsgTipViewA_1 = require("./PhoneMsgTipViewA");
const PhoneSystemChatPanel_1 = require("./PhoneSystemChatPanel");
class PhoneMsgPanelViewSmall extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dlf = undefined;
    this.alf = undefined;
    this.Jzf = undefined;
    this.Hea = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    this.alf = new PhoneSystemChatPanel_1.PhoneSystemChatPanel();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Jzf = new PhoneMsgTipViewA_1.PhoneMsgTipViewA();
    var e = [this.alf.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Jzf.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())];
    await Promise.all(e);
    this.dlf = this.OpenParam;
    if (this.dlf && (this.GetItem(3).SetUIActive(this.dlf.NeedShowTips), this.dlf.ShortMessage)) {
      if (this.dlf.NeedShowTips) {
        this.Jzf.OnRefreshByData(this.dlf.ShortMessage);
      }
    } else {
      this.CloseMe();
    }
  }
  OnStart() {
    var e;
    var i;
    if (this.dlf.ShortMessage) {
      i = ModelManager_1.ModelManager.PhoneMsgModel;
      e = this.dlf.ShortMessage.Id;
      if (i = i.CreateShortMessageDisplayDataByShortMsgId(e)) {
        this.alf.RefreshByData(i);
        (i = new LogReportDefine_1.OnOpenPhoneViewLogEvent()).i_open_way = 6;
        i.i_reason = 2;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
        this.alf.LogReport(e, 2);
        if (this.dlf.NeedShowTips) {
          this.tbi("Start_Pop_Small");
        } else {
          this.tbi("Start_Small");
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhoneSystem", 43, "PhoneMsgPanelViewSmall打开失败: 没有找到对应的ShortMessageDisplayData");
        }
        this.CloseMe();
      }
    } else {
      this.CloseMe();
    }
  }
  tbi(e) {
    this.Hea?.StopSequenceByKey(e);
    this.Hea?.PlayLevelSequenceByName(e);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
}
exports.PhoneMsgPanelViewSmall = PhoneMsgPanelViewSmall;
//# sourceMappingURL=PhoneMsgPanelViewSmall.js.map