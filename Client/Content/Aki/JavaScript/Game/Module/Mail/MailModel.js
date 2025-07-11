"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MailInstance_1 = require("./MailInstance");
const MailAttachmentData_1 = require("./Views/MailAttachmentData");
const ID_SHOW_LENGTH = 3;
class MailModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.kQ = new Map();
    this.wyi = [];
    this.Byi = "";
    this.byi = new Set();
    this.qyi = new Map();
    this.LastTimeShowNewMailTipsTime = 0;
    this.Gyi = [];
    this.Nyi = undefined;
    this.MailSort = (e, t) => {
      if (e.GetWasScanned() !== t.GetWasScanned()) {
        if (e.GetWasScanned()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.GetAttachmentStatus() !== t.GetAttachmentStatus()) {
        if (e.GetAttachmentStatus() < t.GetAttachmentStatus()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.GetMailLevel() !== t.GetMailLevel()) {
        if (e.GetMailLevel() < t.GetMailLevel()) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.GetReceiveTime() === t.GetReceiveTime() || e.GetReceiveTime() < t.GetReceiveTime()) {
        return 1;
      } else {
        return -1;
      }
    };
  }
  Oyi(e) {
    if (e.GetWasScanned() && e.GetAttachmentStatus() !== 2) {
      if (!this.byi.has(e.Id)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
        return;
      }
      this.byi.delete(e.Id);
    } else {
      if (this.byi.has(e.Id)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
        return;
      }
      this.byi.add(e.Id);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
  }
  GetRedDotCouldLightOn() {
    return this.byi.size > 0 && ModelManager_1.ModelManager.MailModel.CheckOpenCondition();
  }
  UnScannedRedPoint() {
    if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) {
      return false;
    }
    let e = false;
    if (this.kQ.size > 0) {
      for (const t of this.kQ.values()) {
        if (!t.GetWasScanned()) {
          e = true;
          break;
        }
      }
    }
    return e;
  }
  GetRedDotImportant() {
    if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) {
      return false;
    }
    let e = false;
    if (this.byi.size > 0) {
      for (const t of this.byi.values()) {
        if (this.GetMailInstanceById(t).GetMailLevel() === 2) {
          e = true;
          break;
        }
      }
    }
    return e;
  }
  GetLastPickedAttachments() {
    var e = [];
    for (const i of this.Gyi) {
      var t = [{
        IncId: 0,
        ItemId: i.GetItemId()
      }, i.GetCount()];
      e.push(t);
    }
    return e;
  }
  SetLastPickedAttachments(e, t) {
    this.ClearLastPickedAttachments();
    const i = new Map();
    for (const r of Object.keys(e)) {
      var a = this.GetMailInstanceById(r);
      a.GetAttachmentInfo().forEach(e => {
        var t = i.get(e.s5n);
        var t = e.m9n + (t ?? 0);
        i.set(e.s5n, t);
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件数据：领取邮件奖励", ["key", r]);
      }
      this.SetMailStatusByStatusCode(e[r], a);
    }
    i.forEach((e, t) => {
      this.Gyi.push(new MailAttachmentData_1.MailAttachmentData(t, e, true));
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PickingAttachment, t);
  }
  ClearLastPickedAttachments() {
    this.Gyi = [];
  }
  GetCurrentSelectMailId() {
    return this.Byi;
  }
  SetCurrentSelectMailId(e) {
    this.Byi = e;
  }
  OpenWebBrowser(e) {
    if (e && e !== "") {
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
    }
  }
  ReloadMailList() {
    this.wyi.length = 0;
    this.kQ.forEach(e => {
      this.wyi.push(e);
    });
    this.wyi.sort(this.MailSort);
  }
  GetMailList() {
    return this.wyi;
  }
  kyi(e) {
    this.kQ.set(e.Id, e);
  }
  DeleteMail(e) {
    if (this.GetMailInstanceById(e)) {
      if (this.byi.has(e)) {
        this.byi.delete(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
      }
      this.kQ.delete(e);
      this.ReloadMailList();
    }
  }
  GetMailListLength() {
    return this.kQ.size;
  }
  GetMailInstanceById(e) {
    return this.kQ.get(e);
  }
  AddMail(e, t = true) {
    if (this.kQ.size >= this.GetMailCapacity() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Mail", 27, "后端新增邮件时超出容量！");
    }
    this.Fyi(e);
    if (t) {
      this.ReloadMailList();
    }
  }
  OnMailInfoSynced(e) {
    for (const i of e.sbs) {
      if (ModelManager_1.ModelManager.MailModel.GetMailListLength() >= ModelManager_1.ModelManager.MailModel.GetMailCapacity() && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Mail", 27, "[MailError]MailBox is fulfilled");
      }
      var t = new Protocol_1.Aki.Protocol.L5s(i);
      this.AddMail(t, false);
    }
    this.ReloadMailList();
  }
  GetMailCapacity() {
    var e;
    return this.Nyi || ((e = ConfigManager_1.ConfigManager.MailConfig.GetMailSize()) ? (this.Nyi = e, this.Nyi) : 0);
  }
  Vyi(e) {
    e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond);
    e = TimeUtil_1.TimeUtil.DateFormat4(e);
    let t = 1;
    if (this.qyi.has(e)) {
      t = this.qyi.get(e);
      t++;
    }
    this.qyi.set(e, t);
    return " " + e + " " + this.Hyi(t, ID_SHOW_LENGTH);
  }
  Hyi(e, t) {
    return (Array(t).join("0") + e % Math.pow(10, t)).slice(-t);
  }
  Fyi(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件数据：创建邮件 ", ["mailInformation.Proto_Id", e.s5n]);
    }
    var t = e.Y4n;
    var i = new MailInstance_1.MailData();
    ObjectUtils_1.ObjectUtils.CopyValue(e, i);
    i.Id = e.s5n;
    i.ConfigId = e.v9n;
    var a = e.Zxs;
    i.Time = a.low;
    i.Level = e.F6n;
    i.Title = e.tbs;
    i.SetText(e.P8n);
    i.Sender = e.ibs;
    i.ExpiryTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.jb_));
    i.AttachmentInfos = e.nbs;
    i.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.ebs);
    this.jyi(i);
    this.kyi(i);
    this.SetMailStatusByStatusCode(t, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件数据：创建邮件成功： ", ["newMail.Id", i.Id], ["title", i.Title]);
    }
  }
  IfNeedShowNewMail() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap) ?? new Map();
    for (const t of this.kQ) {
      if (t[1].GetIfShowNewMail() && !e.get(t[0])) {
        return true;
      }
    }
    return false;
  }
  SaveShowNewMailMap() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap) ?? new Map();
    for (const t of this.kQ) {
      e.set(t[0], true);
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap, e);
  }
  RefreshLocalNewMailMap() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap) ?? new Map();
    for (const t of e) {
      if (!this.kQ.has(t[0])) {
        e.delete(t[0]);
      }
    }
    for (const i of this.kQ) {
      if (i[1].GetIfShowNewMail() && !e.get(i[0])) {
        e.set(i[0], false);
      }
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap, e);
  }
  jyi(e) {
    var t;
    if (e.ConfigId === 4 || e.ConfigId === 6) {
      t = this.Vyi(e.Time);
      e.Title = e.Title + t;
    }
  }
  SetMailStatusByStatusCode(e, t) {
    var i = e & 1;
    var e = e & 2;
    let a = 0;
    if (t.AttachmentInfos.length === 0) {
      a = 0;
    } else if (t.AttachmentInfos.length > 0) {
      a = e ? 1 : 2;
    }
    t.SetWasScanned(i);
    t.SetAttachmentStatus(a);
    this.Oyi(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件数据：邮件状态改变", ["SetMailStatusByStatusCode:", a], ["id:", t.Id], ["scanned:", i], ["taken:", e], ["this.UnFinishedMailSet.length", this.byi?.size]);
    }
  }
  CheckOpenCondition() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10020);
  }
  GetMailFilterConfigData(e) {
    return ConfigManager_1.ConfigManager.MailConfig.GetMailFilterConfigById(e);
  }
  GetImportantMails(e) {
    return (e ?? this.GetMailList()).filter(e => e.GetMailLevel() === 2);
  }
  GetUnScanMails(e) {
    return (e ?? this.GetMailList()).filter(e => !e.GetWasScanned());
  }
}
exports.MailModel = MailModel;
//# sourceMappingURL=MailModel.js.map