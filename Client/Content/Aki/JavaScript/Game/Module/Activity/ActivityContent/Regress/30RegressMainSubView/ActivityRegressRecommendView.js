"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressRecommendView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityRegressController_1 = require("../ActivityRegressController");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const MAIN_QUEST_ITEM_ID = 1;
class ActivityRegressRecommendView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.$jf = undefined;
    this.Wjf = undefined;
    this.sGe = () => {
      return new ActivityRegressRecommendItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    this.$jf = new ActivityRegressRecommendItem();
    await this.$jf?.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.$jf.Refresh(MAIN_QUEST_ITEM_ID, false, 0);
  }
  OnStart() {
    super.OnStart();
    this.Wjf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.sGe);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetRecommendDataList();
    this.Wjf.RefreshByData(i, undefined, true);
  }
}
exports.ActivityRegressRecommendView = ActivityRegressRecommendView;
class ActivityRegressRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.Qjf = 0;
    this.aNe = 0;
    this.Kjf = 0;
    this.Xjf = 4;
    this.Ftl = "";
    this.jWt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Wpa = () => {
      switch (this.Xjf) {
        case 1:
          UiManager_1.UiManager.OpenView("QuestView", this.Kjf);
          break;
        case 4:
          ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController?.ExploreJump();
          break;
        case 2:
        case 3:
          this.d7t();
      }
    };
    this.Yjf = () => {
      this.d7t();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[11, this.Wpa], [12, this.Yjf]];
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.jWt);
  }
  Refresh(i, e, t) {
    var s = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(i);
    if (s) {
      this.Qjf = i;
      this.Xjf = s.Type;
      this.aNe = s.JumpParam;
      switch (this.Xjf) {
        case 1:
          this.zjf();
          break;
        case 4:
          this.Jjf();
          break;
        case 2:
          this.Zjf();
          break;
        case 3:
          this.e$f();
      }
    }
  }
  zjf() {
    var i;
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(this.Qjf);
    if (t) {
      this.GetTexture(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Regress_MainQuest");
      this.SetSpriteByPath(e, this.GetSprite(1), false, undefined, () => {
        this.GetSprite(1).SetUIActive(true);
      });
      e = ModelManager_1.ModelManager.ActivityRegressModel.GetCurrentMainLineQuest();
      if ((this.Kjf = e) === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Recall_Main_Task_Finish");
        this.GetText(4).SetUIActive(false);
        this.H3e?.GetRootUiItem()?.SetUIActive(false);
        this.GetButton(11).RootUIComp.SetUIActive(false);
        this.GetButton(12).RootUIComp.SetUIActive(false);
        this.GetItem(13).SetUIActive(false);
        this.GetItem(14).SetUIActive(false);
      } else {
        this.GetItem(14).SetUIActive(true);
        e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        i = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(e.RewardId);
        this.H3e?.RefreshByData(i);
        i = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(e.ChapterId);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.ChapterName) ?? "";
        this.GetText(3).SetText(e);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.ChapterNum);
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.SectionNum);
        this.GetText(4).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "QuestChapterText", e, i);
        e = this.Xjf === 1 && !!t.JumpParam && ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(t.JumpParam);
        if (ModelManager_1.ModelManager.ActivityRegressModel.GetCurrentMainLineBranch() < ModelManager_1.ModelManager.ActivityRegressModel.LatestBranch && e) {
          this.GetButton(11).RootUIComp.SetUIActive(false);
          this.GetButton(12).RootUIComp.SetUIActive(true);
        } else {
          this.GetButton(11).RootUIComp.SetUIActive(true);
          this.GetButton(12).RootUIComp.SetUIActive(false);
        }
      }
    }
  }
  Zjf() {
    var i;
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(this.Qjf);
    if (t) {
      i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.aNe);
      this.GetSprite(1).SetUIActive(false);
      this.t$f(i);
      this.GetItem(5).SetUIActive(true);
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i.EndShowTime, this.Ftl);
      this.GetText(8).SetColor(ActivityRegressDefine_1.regressYellowColor);
      this.GetText(8).SetText(e);
      this.i$f(i);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_OverViewBgA");
      this.SetSpriteByPath(e, this.GetSprite(6), false);
      this.GetItem(13).SetUIActive(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
      this.GetButton(11).RootUIComp.SetUIActive(true);
      this.r$f(i);
      this.GetText(4).SetUIActive(false);
      e = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(t.ShowReward);
      this.H3e?.RefreshByData(e);
    }
  }
  t$f(e) {
    var t;
    var e = e.LocalConfig.TabTexture;
    const s = this.GetTexture(2);
    s.SetUIActive(false);
    if (e && e.length !== 0) {
      let i = 0;
      if (e.length >= 2) {
        t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        i = t === 0 ? 0 : 1;
      }
      this.SetTextureByPath(e[i], s, undefined, () => {
        s.SetUIActive(true);
      });
    }
  }
  i$f(i) {
    var e;
    var i = i.LocalConfig;
    if (i) {
      e = this.GetSprite(7);
      if (i.ShowActTypeIds.length >= 1) {
        e.SetUIActive(true);
        if (i = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(i.ShowActTypeIds[0])) {
          i = i.TogIcon;
          this.SetSpriteByPath(i, e, false);
          e.SetColor(ActivityRegressDefine_1.regressYellowColor);
        }
      } else {
        e.SetUIActive(false);
      }
    }
  }
  r$f(i) {
    i = i.LocalConfig;
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Title);
    }
  }
  e$f() {
    var i;
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(this.Qjf);
    if (t) {
      i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.aNe);
      this.GetSprite(1).SetUIActive(false);
      this.t$f(i);
      this.GetItem(5).SetUIActive(true);
      this.i$f(i);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_OverViewBgA");
      this.SetSpriteByPath(e, this.GetSprite(6), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Regress_Recommend_Tag_NormalActivity");
      this.GetButton(12).RootUIComp.SetUIActive(false);
      e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.aNe)?.FinishShowState;
      this.GetItem(13).SetUIActive(e);
      this.GetButton(11).RootUIComp.SetUIActive(!e);
      this.r$f(i);
      this.GetText(4).SetUIActive(false);
      e = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(t.ShowReward);
      this.H3e?.RefreshByData(e);
    }
  }
  Jjf() {
    var i;
    var e;
    var t;
    var s = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(this.Qjf);
    if (s && (i = ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController?.GetFirstUnlockArea())) {
      this.GetTexture(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Regress_Area");
      this.SetSpriteByPath(t, this.GetSprite(1), false, undefined, () => {
        this.GetSprite(1).SetUIActive(true);
      });
      this.GetItem(5).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Regress_Tag_Area");
      e = this.GetSprite(7);
      this.SetSpriteByPath(t, e, false);
      e.SetColor(ActivityRegressDefine_1.regressBlueColor);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_OverViewBgB");
      this.SetSpriteByPath(t, this.GetSprite(6), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Regress_Recommend_Tag_Area", (i.GetProgress() ?? 0) + "%");
      this.GetText(8).SetColor(ActivityRegressDefine_1.regressBlueColor);
      this.GetButton(12).RootUIComp.SetUIActive(false);
      e = i.IsReachMaxProgress;
      this.GetItem(13).SetUIActive(e);
      this.GetButton(11).RootUIComp.SetUIActive(!e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.GetNameId());
      this.GetText(4).SetUIActive(false);
      t = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(s.ShowReward);
      this.H3e?.RefreshByData(t, () => {
        for (const i of this.H3e.GetLayoutItemList()) {
          i.SetBottomTextVisible(false);
        }
      });
    }
  }
  d7t() {
    ActivityRegressController_1.ActivityRegressController.RegressStartJumpToActivity(() => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(this.aNe);
    });
  }
}
//# sourceMappingURL=ActivityRegressRecommendView.js.map