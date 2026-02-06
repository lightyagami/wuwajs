"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuestView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const QuestViewStep_1 = require("../../QuestNew/View/QuestViewStep");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryQuestItem_1 = require("./Items/HonamiStoryQuestItem");
class HonamiStoryQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.zc_ = undefined;
    this.H3e = undefined;
    this.SPe = undefined;
    this.p9t = undefined;
    this.jno = undefined;
    this.s1m = undefined;
    this.a1m = [];
    this.nu_ = t => {
      if (this.s1m !== t) {
        this.s1m?.OnDeselected();
        this.s1m = t;
        this.s1m.OnSelected();
        this.Wjt();
        if (this.SPe?.GetCurrentSequence() !== "Switch") {
          this.SPe?.PlayLevelSequenceByName("Switch");
        } else {
          this.SPe?.ReplaySequenceByKey("Switch");
        }
      }
    };
    this.ou_ = () => {
      var t = new HonamiStoryQuestItem_1.HonamiStoryQuestItem();
      t.BindOnClickTask(this.nu_);
      return t;
    };
    this.jWt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.p5t = () => {
      var t = this.s1m?.Data;
      if (t) {
        ModelManager_1.ModelManager.HonamiStoryModel.SetSubQuestTrack(t);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpBtnActive(false);
    this.zc_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.ou_, this.GetItem(2).GetOwner(), true);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.jWt);
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(13));
    this.p9t.SetFunction(this.p5t);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await this.h1m();
    this.l1m();
  }
  OnBeforeShow() {
    this.GetItem(11).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.Wjt();
  }
  async h1m() {
    var t = [];
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInActivityQuest()) {
      t.push(1);
    }
    var i = ModelManager_1.ModelManager.FunctionModel?.IsOpen(10113);
    if (i && ModelManager_1.ModelManager.HonamiStoryModel.GetQuestDataListByQuestType(2).length > 0) {
      t.push(2);
    }
    await this.zc_.RefreshByDataAsync(t);
  }
  l1m() {
    if (this.s1m) {
      this.s1m.OnDeselected();
      this.s1m = undefined;
    }
    for (const t of this.zc_.GetLayoutItemList()) {
      for (const i of t.GetTaskChildItemList()) {
        this.a1m.push(i);
      }
    }
    if (this.a1m.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryQuestView 没有任务子item");
      }
    } else {
      this.s1m ||= this.a1m[0];
      this.s1m.OnSelected();
    }
  }
  Wjt() {
    var t;
    var i;
    var e;
    var s;
    if (this.s1m) {
      if (t = this.s1m.Data) {
        i = t.IsInDungeon;
        this.bif(t);
        this.GetText(8).SetText(t.GetDesc());
        if ((s = t.GetRewardId()) === 0) {
          this.H3e.SetActive(false);
          this.GetText(14).SetUIActive(false);
        } else {
          e = (s = this.I2e(s)).length > 0;
          this.H3e.RefreshByData(s);
          this.H3e.SetActive(e);
          this.GetText(14).SetUIActive(e);
        }
        this.p9t.SetActive(false);
        if (i && t.TaskType === 2) {
          s = t.IsFinished();
          this.GetItem(11).SetUIActive(s);
          if (!s) {
            this.b8t(t);
            this.p9t.SetEnableClick(true);
            this.p9t.SetActive(true);
          }
        }
        if (!i && t.TaskType === 1) {
          this.p9t.SetLocalTextNew("HonamiStory_MainTask_Tracking");
          this.p9t.SetEnableClick(false);
          this.p9t.SetActive(true);
        }
        this.qfm(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryQuestView 没有任务数据");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryQuestView 没有当前选中任务item");
    }
  }
  bif(t) {
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.GetNameKey());
    var e = this.GetText(3);
    let s = "";
    if (t.TaskType === 1) {
      s = StringUtils_1.StringUtils.Format(HonamiStoryDefine_1.RICHTXT_QUEST, i);
      e?.SetRichText(true);
    } else {
      t = t.Config;
      s = t.TaskType !== 1 ? (e?.SetRichText(false), i) : (e?.SetRichText(true), StringUtils_1.StringUtils.Format(HonamiStoryDefine_1.RICHTXT_QUEST, i));
    }
    e?.SetText(s);
  }
  b8t(t) {
    if (t.Id === ModelManager_1.ModelManager.HonamiStoryModel.CurTrackTaskData?.Id) {
      this.p9t.SetLocalTextNew("HonamiStory_Cancel_Track");
    } else {
      this.p9t.SetLocalTextNew("HonamiStory_Track");
    }
  }
  async qfm(t) {
    var i = this.GetItem(5);
    var t = t.GetTreeShowData();
    if (t) {
      i.SetUIActive(true);
      if (!this.jno) {
        this.jno = new QuestViewStep_1.QuestViewStep(0, -1);
        await this.jno.CreateThenShowByActorAsync(i.GetOwner());
      }
      await this.jno.Update(t);
      this.jno.SetActive(true);
    } else {
      i.SetUIActive(false);
    }
  }
  I2e(t) {
    var i;
    var e;
    var s;
    var r = [];
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t);
    var o = this.s1m?.Data;
    for ([i, e] of t) {
      if (o?.TaskType === 2) {
        s = e * ModelManager_1.ModelManager.HonamiStoryModel.GetSubTaskBonusDataList();
        r.push([{
          ItemId: i,
          IncId: 0
        }, s]);
      } else {
        r.push([{
          ItemId: i,
          IncId: 0
        }, e]);
      }
    }
    return r;
  }
}
exports.HonamiStoryQuestView = HonamiStoryQuestView;
//# sourceMappingURL=HonamiStoryQuestView.js.map