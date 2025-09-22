"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatTeamTipsContent = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ChatTeamTipsContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vBd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText]];
  }
  Refresh(e) {
    this.vBd = e;
    switch (this.vBd.NoticeType) {
      case Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam:
        var i = this.GetItem(1);
        var t = this.GetItem(3);
        var r = this.GetText(4);
        var s = this.vBd.SenderPlayerName;
        i.SetUIActive(false);
        t.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(r, "PlayerEnterTeam", s);
        break;
      case Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam:
        i = this.GetItem(1);
        t = this.GetItem(3);
        r = this.GetText(2);
        s = this.vBd.SenderPlayerName;
        i.SetUIActive(true);
        t.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalText(r, "PlayerLeaveTeam", s);
    }
    this.sSt();
  }
  sSt() {
    var e = this.GetText(0);
    var i = this.vBd.TimeStamp;
    var t = this.vBd.LastTimeStamp;
    var r = TimeUtil_1.TimeUtil.GetServerTime();
    if (i - t < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && t !== 0) {
      e.SetUIActive(false);
    } else {
      t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(i);
      i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(r);
      if (t.Day === i.Day) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", t.Hour, t.Minute);
        e.SetUIActive(true);
      } else if (t.Day !== i.Day && t.Year === i.Year) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "DayText", t.Month, t.Day, t.Hour, t.Minute);
        e.SetUIActive(true);
      } else if (t.Year !== i.Year) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "YearText", t.Year, t.Month, t.Day, t.Hour, t.Minute);
        e.SetUIActive(true);
      } else {
        e.SetUIActive(false);
      }
    }
  }
}
exports.ChatTeamTipsContent = ChatTeamTipsContent;
//# sourceMappingURL=ChatTeamTipsContent.js.map