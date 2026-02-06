"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonH5SubView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class CommonH5SubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.CommonInfoPanel = undefined;
    this.rcr = undefined;
    this.AOe = () => {
      this.BNe();
    };
    this.Jk_ = () => {
      var e = this.ActivityBaseData;
      ActivityControllerHolder_1.ActivityControllerHolder.CommonH5Controller.HandleOnEnterClick(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    var i = this.ActivityBaseData;
    var i = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(i.GetBgPrefabPath(), e);
    this.rcr = new UiSequencePlayer_1.UiSequencePlayer(i.GetComponentByClass(UE.UIItem.StaticClass()));
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var e = this.GetItem(1).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e);
  }
  OnBeforeShow() {
    this.BNe();
    this.CommonInfoPanel.SetBtnText("Activity_Exploration_Go");
    this.rcr.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonH5ActivityRedDot, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonH5ActivityRedDot, this.AOe);
  }
  BNe() {
    var e = this.ActivityBaseData.RedPointShowState;
    this.CommonInfoPanel.SetFunctionRedDotVisible(e);
  }
}
exports.CommonH5SubView = CommonH5SubView;
//# sourceMappingURL=CommonH5SubView.js.map