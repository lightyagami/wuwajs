"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatTeamTipsContent = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatContentBase_1 = require("./ChatContentBase");
class ChatTeamTipsContent extends ChatContentBase_1.ChatContentBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText]];
  }
  OnStart() {
    this.bl();
  }
  bl() {
    switch (this.ChatContentData.NoticeType) {
      case Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam:
        var e = this.GetItem(1);
        var t = this.GetItem(3);
        var i = this.GetText(4);
        var r = this.ChatContentData.SenderPlayerName;
        e.SetUIActive(false);
        t.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerEnterTeam", r);
        break;
      case Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam:
        e = this.GetItem(1);
        t = this.GetItem(3);
        i = this.GetText(2);
        r = this.ChatContentData.SenderPlayerName;
        e.SetUIActive(true);
        t.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalText(i, "PlayerLeaveTeam", r);
    }
    this.sSt();
  }
  sSt() {
    var e = this.GetText(0);
    var t = this.ChatContentData.TimeStamp;
    var i = this.ChatContentData.LastTimeStamp;
    var r = TimeUtil_1.TimeUtil.GetServerTime();
    if (t - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && i !== 0) {
      e.SetUIActive(false);
    } else {
      i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t);
      t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(r);
      if (i.Day === t.Day) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", i.Hour, i.Minute);
        e.SetUIActive(true);
      } else if (i.Day !== t.Day && i.Year === t.Year) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "DayText", i.Month, i.Day, i.Hour, i.Minute);
        e.SetUIActive(true);
      } else if (i.Year !== t.Year) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "YearText", i.Year, i.Month, i.Day, i.Hour, i.Minute);
        e.SetUIActive(true);
      } else {
        e.SetUIActive(false);
      }
    }
  }
}
exports.ChatTeamTipsContent = ChatTeamTipsContent;
//# sourceMappingURL=ChatTeamTipsContent.js.map