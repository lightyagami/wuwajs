"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayRewardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
class ActivityFunPlayRewardView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.r3e = () => {
      this.n3e();
    };
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.s3e = () => {
      var e = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData()?.GetChallengeId();
      if (e) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityFunPlayController?.ChallengeAwardRequest(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "当前趣味玩法关卡数据为空");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.s3e]];
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(1);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () => this.JGe());
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
  }
  Refresh() {
    this.jqe();
    this.n3e();
  }
  jqe() {
    var e = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData()?.GetPreviewReward();
    if (e) {
      this.bOe.RefreshByData(e);
    }
  }
  n3e() {
    var e = ModelManager_1.ModelManager.ActivityFunPlayModel.GetCurrentChallengeData();
    if (e) {
      this.GetText(2).SetUIActive(e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanNoReward));
      this.GetItem(5).SetUIActive(e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanReward));
      this.GetButton(4).RootUIComp.SetUIActive(e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanReward));
      this.GetSprite(3).SetUIActive(e.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayRewarded));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityFunPlay", 87, "趣味玩法关卡数据空");
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityFunPlayRewardView = ActivityFunPlayRewardView;
//# sourceMappingURL=ActivityFunPlayRewardView.js.map