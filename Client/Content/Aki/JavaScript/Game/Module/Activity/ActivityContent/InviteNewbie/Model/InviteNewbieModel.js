"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieModel = undefined;
const H5CircumUrlById_1 = require("../../../../../../Core/Define/ConfigQuery/H5CircumUrlById");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const InviteNewbieProtocolContext_1 = require("./InviteNewbieProtocolContext");
class InviteNewbieModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GmUrl = undefined;
    this.xVa = undefined;
  }
  OnInit() {
    this.xVa = new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(this);
    return true;
  }
  OnClear() {
    this.xVa?.Dispose();
    return !(this.xVa = undefined);
  }
  get ActivityData() {
    if (this.xVa === undefined) {
      this.xVa = new InviteNewbieProtocolContext_1.InviteNewbieProtocolContext(this);
    }
    return this.xVa;
  }
  get CurrentActivityId() {
    return this.xVa?.Id ?? 0;
  }
  get HasRedDot() {
    return this.xVa?.RedPointShowState ?? false;
  }
  SaveClickState() {
    this.xVa?.SaveClickRedDotState();
  }
  get HelpId() {
    return this.xVa?.GetHelpId() ?? 0;
  }
  get InviteCode() {
    return this.xVa?.InviteCode ?? "";
  }
  get ScoreTextId() {
    var e;
    if (this.xVa === undefined) {
      return "";
    } else {
      e = this.xVa.Id;
      return H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.ScoreText ?? " ";
    }
  }
  get Score() {
    return this.xVa?.Score ?? 0;
  }
  get RootUrl() {
    var e;
    if (this.GmUrl !== undefined && this.GmUrl !== "") {
      return this.GmUrl;
    } else if (this.xVa !== undefined) {
      e = this.xVa.Id;
      e = H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e);
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
        return e?.OverseaRootUrl;
      } else {
        return e?.RootUrl;
      }
    } else {
      return undefined;
    }
  }
  get IsInternalBrowser() {
    var e;
    return this.xVa !== undefined && (e = this.xVa.Id, H5CircumUrlById_1.configH5CircumUrlById.GetConfig(e)?.IsInternalBrowser ?? false);
  }
  SyncActivityNotify(e) {
    e = e.fks;
    if (this.xVa) {
      this.xVa.InviteCode = e?.XRc ?? undefined;
      this.xVa.Score = e?.SMs ?? 0;
      this.xVa.ChangeServerRedDotState(e?.qKc ?? false);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.CurrentActivityId);
  }
}
exports.InviteNewbieModel = InviteNewbieModel;
//# sourceMappingURL=InviteNewbieModel.js.map