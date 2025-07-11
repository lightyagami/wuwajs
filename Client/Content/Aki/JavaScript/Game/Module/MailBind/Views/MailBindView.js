"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailBindView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const KuroSdkController_1 = require("../../../KuroSdk/KuroSdkController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const HelpController_1 = require("../../Help/HelpController");
const MailBindController_1 = require("../MailBindController");
class MailBindView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.lqe = undefined;
    this.KZs = false;
    this.ail = () => {
      MailBindController_1.MailBindController.MailBindRequest();
      if (this.KZs) {
        KuroSdkController_1.KuroSdkController.PostKuroSdkEvent(13);
      } else {
        ControllerHolder_1.ControllerHolder.ChannelController.OpenKuroStreet();
      }
      MailBindController_1.MailBindController.RecordMailBindJumpToWebView();
    };
    this.B6e = () => {
      this.CloseMe();
    };
    this.Nwn = () => {
      MailBindController_1.MailBindController.MailBindRewardRequest();
    };
    this.lil = () => {
      var i = this.KZs ? "Mail_Activity_HelpId02" : "Mail_Activity_HelpId01";
      var i = CommonParamById_1.configCommonParamById.GetIntConfig(i);
      HelpController_1.HelpController.OpenHelpById(i);
    };
    this.oil = () => {
      this.Refresh();
    };
  }
  async OnCreateAsync() {
    await MailBindController_1.MailBindController.MailBindInfoRequestAsync();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.Nwn]];
  }
  async OnBeforeStartAsync() {
    if (this.OpenParam === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 43, "邮箱绑定界面必须传入参数");
    }
    this.KZs = this.OpenParam;
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var n = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4));
    await Promise.all([this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(n.GetOwner())]);
  }
  OnStart() {
    var i = this.KZs ? "Mail_Activity_Function_Entry02" : "Mail_Activity_Function_Entry01";
    this.lqe.SetTitleByTextIdAndArgNew(i);
    this.lqe.SetCloseCallBack(this.B6e);
    this.lqe?.SetHelpCallBack(this.lil);
    var i = this.KZs ? "SP_MailBindIcon" : "SP_KuroStreetIcon";
    this.lqe.SetTitleIconByResourceId(i);
    var i = this.KZs ? "Mail_Activity_Title02" : "Mail_Activity_Title";
    this.LNe.SetTitleByTextId(i);
    this.LNe.SetSubTitleVisible(false);
    var i = this.KZs ? "Mail_Activity_Desc02" : "Mail_Activity_Desc01";
    this.DNe.SetContentByTextId(i);
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("MailBindReward");
    var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(i);
    var i = this.KZs ? "Mail_Activity_Binding" : "Mail_Activity_Login";
    this.ANe.FunctionButton.SetFunction(this.ail);
    this.ANe.FunctionButton.SetLocalTextNew(i);
    var i = this.KZs ? "Mail_Activity_Finish02" : "Mail_Activity_Finish01";
    this.ANe.SetActivateTextByTextId(i);
    MailBindController_1.MailBindController.RecordMailBindNextShowRedDotTime();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMailBindInfoNotify, this.oil);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMailBindInfoNotify, this.oil);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.FNe();
    this._Oe();
  }
  FNe() {
    var i = ModelManager_1.ModelManager.MailBindModel;
    var t = this.KZs && i.GetIsReward();
    this.LNe.SetTimeTextVisible(t);
    if (t) {
      t = i.GetRemainTimeText(i.GetCloseTime()) ?? "";
      this.LNe.SetTimeTextByText(t);
    }
  }
  _Oe() {
    var i = ModelManager_1.ModelManager.MailBindModel.GetState();
    this.GetItem(6)?.SetUIActive(i === 0);
    this.GetButton(7)?.RootUIComp.SetUIActive(i === 1);
    this.GetItem(5)?.SetUIActive(i === 2);
    this.ANe.SetLockConditionButtonVisible(false);
    this.ANe.SetActivatePanelConditionVisible(i !== 0);
    this.ANe.FunctionButton?.SetUiActive(i === 0);
  }
}
exports.MailBindView = MailBindView;
//# sourceMappingURL=MailBindView.js.map