"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CdKeyInputView = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const CommonInputViewBase_1 = require("../Common/InputView/View/CommonInputViewBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const CdKeyInputController_1 = require("./CdKeyInputController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class CdKeyInputView extends CommonInputViewBase_1.CommonInputViewBase {
  constructor() {
    super(...arguments);
    this._Et = 0;
    this.uEt = 0;
  }
  InitExtraParam() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("CdKeyLengthLimit");
    this.uEt = e[0];
    this._Et = e[1];
  }
  GetMaxLimit() {
    return this._Et;
  }
  GetMinLimit() {
    return this.uEt;
  }
  IsAllowMultiLine() {
    return false;
  }
  ExecuteInputConfirm(e) {
    this.InputData.ConfirmFunc?.(e).then(e => {
      var r;
      if (e === Protocol_1.Aki.Protocol.Q4n.KRs) {
        r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(148);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
        this.CloseMe();
      } else {
        r = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e);
        this.CdKeyErrorText = r ?? this.CdKeyErrorText;
        this.RefreshTips(6);
      }
    }, () => {});
  }
  ExtraConfirmCheck(e, r) {
    return !this.cEt() && !this.mEt(r);
  }
  cEt() {
    var e = CdKeyInputController_1.CdKeyInputController.CheckInCdKeyUseCd();
    if (e) {
      this.RefreshTips(7);
    }
    return e;
  }
  mEt(e) {
    e = StringUtils_1.StringUtils.CheckIsOnlyLettersAndNumbers(e);
    if (!e) {
      this.RefreshTips(4);
    }
    return !e;
  }
}
exports.CdKeyInputView = CdKeyInputView;
//# sourceMappingURL=CdKeyInputView.js.map