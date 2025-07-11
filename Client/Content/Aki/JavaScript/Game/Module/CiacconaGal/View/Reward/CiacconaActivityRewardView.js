"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaActivityRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig");
const CiacconaActivityRewardItem_1 = require("./CiacconaActivityRewardItem");
class CiacconaActivityRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.dqc = undefined;
    this.xqe = undefined;
    this.CNe = undefined;
    this.Bqe = () => new CiacconaActivityRewardItem_1.CiacconaActivityRewardItem();
    this.AOe = () => {
      this.bl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.CNe = this.OpenParam;
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.dqc.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_PROGRESS_TITLE);
    this.dqc.SetTitleByTextIdAndArgNew(e);
    this.mVc();
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.Bqe);
    this.bl();
    this.xqe?.PlayTurnAnimation();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaRewardDataUpdate, this.AOe);
  }
  OnTick() {
    this.mVc();
  }
  bl() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetAllRewardDataByActivityId(this.CNe.Id);
    this.xqe?.RefreshByData(e);
    var [e, i] = ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress();
    this.GetText(1).SetText(e + "/" + i);
    this.GetSprite(2).fillAmount = e / (i ?? 1);
  }
  mVc() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Xkjsx_Rewards_Timeless") + " " + this.CNe.RewardRemainTimeStr;
    this.GetText(5)?.SetText(e);
  }
}
exports.CiacconaActivityRewardView = CiacconaActivityRewardView;
//# sourceMappingURL=CiacconaActivityRewardView.js.map