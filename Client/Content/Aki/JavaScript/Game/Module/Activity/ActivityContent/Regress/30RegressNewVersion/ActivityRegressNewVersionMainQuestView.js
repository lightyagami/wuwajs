"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressNewVersionMainQuestView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRegressController_1 = require("../ActivityRegressController");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
class ActivityRegressNewVersionMainQuestView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.o$f = false;
    this.n$f = 0;
    this.s$f = 0;
    this.wqo = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.a$f = () => {
      if (this.n$f) {
        UiManager_1.UiManager.OpenView("QuestView", this.n$f);
      }
    };
    this.h$f = () => {
      if (this.s$f) {
        ActivityRegressController_1.ActivityRegressController.RegressStartJumpToActivity(() => {
          ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(this.s$f);
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIItem], [9, UE.UITexture]];
    this.BtnBindInfo = [[5, this.a$f], [6, this.h$f]];
  }
  OnStart() {
    super.OnStart();
    var e;
    var i;
    var t = ModelManager_1.ModelManager.ActivityRegressModel.GetLatestRegressBase();
    if (t) {
      e = ModelManager_1.ModelManager.ActivityRegressModel.GetCurrentMainLineQuest();
      this.o$f = e === 0;
      this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.wqo);
      i = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(t.RewardPreview);
      this.bOe.RefreshByData(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.SubTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Description);
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      this.SetTextureByPath(i === 1 ? t.BgPath : t.BgPathF, this.GetTexture(9));
      if (this.o$f) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Recall_Main_Task_Finish");
        this.GetButton(5).RootUIComp.SetUIActive(false);
        this.GetButton(6).RootUIComp.SetUIActive(false);
        this.GetItem(8).SetUIActive(true);
      } else {
        this.s$f = t.TargetActivityId;
        i = !!this.s$f && ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(t.TargetActivityId);
        if (ModelManager_1.ModelManager.ActivityRegressModel.GetCurrentMainLineBranch() < ModelManager_1.ModelManager.ActivityRegressModel.LatestBranch && i) {
          this.GetButton(5).RootUIComp.SetUIActive(false);
          this.GetButton(6).RootUIComp.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.JumpBtnDes);
        } else {
          this.GetButton(5).RootUIComp.SetUIActive(true);
          this.GetButton(6).RootUIComp.SetUIActive(false);
        }
        this.n$f = e;
        this.GetItem(8).SetUIActive(false);
        i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        t = ConfigManager_1.ConfigManager.QuestNewConfig.GetChapterConfig(i.ChapterId);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.ChapterNum);
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SectionNum);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "QuestChapterText", e, i);
      }
    }
  }
}
exports.ActivityRegressNewVersionMainQuestView = ActivityRegressNewVersionMainQuestView;
//# sourceMappingURL=ActivityRegressNewVersionMainQuestView.js.map