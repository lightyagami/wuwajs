"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeMemoryPlaceView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeMemoryRewardItemData {
  constructor() {
    this.SeasonReward = undefined;
    this.Config = undefined;
  }
}
class RoguelikeMemoryRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GridItem = undefined;
    this.Data = undefined;
    this.OnBtnRewardClick = () => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(RoguelikeDefine_1.COLLECT_SCORE_ID) >= this.Data.Config.Point) {
        RoguelikeController_1.RoguelikeController.RoguelikeSeasonRewardReceiveRequest([this.Data?.Config?.Index ?? 0]).then(e => {});
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.OnBtnRewardClick]];
  }
  OnStart() {
    if (this.GridItem === undefined) {
      this.GridItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      this.GridItem.Initialize(this.GetItem(0).GetOwner());
    }
    this.GridItem.SetActive(false);
  }
  Refresh(e, i, t) {
    this.Data = e;
    var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(RoguelikeDefine_1.COLLECT_SCORE_ID) >= e.Config.Point;
    if (r && !e.SeasonReward?.ovs) {
      this.GetButton(4).SetActive(true);
    } else {
      this.GetButton(4).SetActive(false);
    }
    this.GridItem.SetActive(true);
    var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(e.Config.DropId);
    var o = Array.from(o);
    var o = [{
      IncId: 0,
      ItemId: o[0][0]
    }, o[0][1]];
    this.GridItem.Refresh(o);
    this.GetText(1).SetText(e.Config.Index.toString());
    this.GetSprite(2).useChangeColor = r;
    this.GetSprite(3).useChangeColor = r;
    this.GetSprite(3).SetUIActive(t !== 0);
  }
}
class RoguelikeMemoryPlaceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.LoopScrollView = undefined;
    this.SeasonData = undefined;
    this.CreateLoopScrollItem = () => new RoguelikeMemoryRewardItem();
    this.OnBtnTokenOverViewClick = () => {
      UiManager_1.UiManager.OpenView("RoguelikeTokenOverView", this.SeasonData);
    };
    this.OnBtnAchievementViewClick = () => {
      UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [6, UE.UIText], [5, UE.UIText], [7, UE.UILoopScrollViewComponent], [8, UE.UIItem]];
    this.BtnBindInfo = [[1, this.OnBtnTokenOverViewClick], [2, this.OnBtnAchievementViewClick]];
  }
  OnStart() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    });
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(7), this.GetItem(8).GetOwner(), this.CreateLoopScrollItem);
    this.GetLoopScrollViewComponent(7).RootUIComp.GetParentAsUIItem().SetUIActive(false);
    this.CaptionItem.SetHelpBtnActive(false);
    this.SeasonData = this.OpenParam;
    var i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonReward(this.SeasonData.UHn);
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var r = i[e];
      var o = new RoguelikeMemoryRewardItemData();
      o.SeasonReward = this.SeasonData.Eqs[e];
      o.Config = r;
      t.push(o);
    }
    this.LoopScrollView.ReloadData(t);
    this.UpdateView();
  }
  UpdateView() {
    var e = this.SeasonData.Eqs.length;
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(RoguelikeDefine_1.COLLECT_SCORE_ID);
    var t = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Roguelike_MemoryPlace_Level", e.toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Roguelike_MemoryPlace_Exp", i, t.PointItemMaxCount);
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(this.SeasonData.UHn);
    let r = 0;
    let o = 0;
    for (const s of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(e.Achievement)) {
      o += s.GetMaxProgress();
      r += s.GetCurrentProgress();
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Rogue_MemoryPlace_Progress", r, o);
    i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTokenBySeasonId(this.SeasonData.UHn).length;
    t = this.SeasonData.Sqs.length;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Rogue_MemoryPlace_Progress", t, i);
  }
}
exports.RoguelikeMemoryPlaceView = RoguelikeMemoryPlaceView;
//# sourceMappingURL=RoguelikeMemoryPlaceView.js.map