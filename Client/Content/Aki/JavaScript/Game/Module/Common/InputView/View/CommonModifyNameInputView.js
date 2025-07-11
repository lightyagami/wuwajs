"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonModifyNameInputView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
const CommonInputViewBase_1 = require("./CommonInputViewBase");
class CommonModifyNameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  constructor() {
    super(...arguments);
    this.Pha = () => {
      this.Hqe();
    };
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnModifyNameStateChange, this.Pha);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnModifyNameStateChange, this.Pha);
  }
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_SINGLE_LENGTH;
  }
  IsAllowMultiLine() {
    return false;
  }
  InitExtraParam() {
    this.Hqe();
  }
  RefreshDuplicateName(e) {
    this.Hqe();
  }
  Hqe() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetPersonalModifyNameState();
    this.SetBottomTipsShowState(true);
    if (e === 0 || e === 2) {
      this.SetBottomTipsTextAndColor("PersonalProfile_ChangeNameLimit", UE.Color.FromHex("6E6A62FF"));
    } else if (e === 1) {
      this.SetBottomTipsTextAndColor("PersonalProfile_ChangeNameProcess", UE.Color.FromHex("C25757FF"));
    }
    var e = e === 0;
    var t = this.InputText.Text !== this.InputData.InputText;
    var i = StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) > this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && t && !i);
  }
  ExecuteInputConfirm(e) {
    this.InputData.ConfirmFunc?.(e).then(e => {
      if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord) {
        this.RefreshTips(4);
      }
    }, () => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 10, "通用输入框执行出现未知错误");
      }
    });
  }
}
exports.CommonModifyNameInputView = CommonModifyNameInputView;
//# sourceMappingURL=CommonModifyNameInputView.js.map