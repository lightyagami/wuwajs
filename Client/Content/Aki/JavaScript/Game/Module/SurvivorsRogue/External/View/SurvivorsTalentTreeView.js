"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentTreeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const SurvivorsTalentTreeAreaItem_1 = require("./SurvivorsTalentTreeAreaItem");
const SurvivorsTalentTreeSkillInfoPanel_1 = require("./SurvivorsTalentTreeSkillInfoPanel");
const SurvivorsTalentTreeSkillNodeItem_1 = require("./SurvivorsTalentTreeSkillNodeItem");
const TALENT_TREE_COST_ITEM_ID = 80400003;
class SurvivorsTalentTreeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cGd = undefined;
    this.ja_ = undefined;
    this.d4d = undefined;
    this.lqe = undefined;
    this.dGd = undefined;
    this.ebl = undefined;
    this.Hea = undefined;
    this.uGd = e => {
      new UiAsyncTask_1.UiAsyncTask("TalentNodeUpdate", async () => {
        await this.m4d(e);
      }).Run();
    };
    this.mGd = e => {
      var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (i && e && e.Node) {
        e.OnClickToggleBack = this.f4d;
        if (i.CurrentSelectNode.NodeId !== this.ja_.Node.NodeId || this.cGd) {
          if (i.CurrentSelectNode.NodeId === e.Node.NodeId) {
            if (i = this.d4d.GetItemByIndex(e.Node.AreaId - 1)) {
              this.d4d.LateScrollTo(i);
            }
            this.cGd = e;
            this.cGd.SelectNode();
          }
        } else {
          this.cGd = this.ja_;
          this.cGd.SelectNode();
        }
      }
    };
    this.f4d = (e, i) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = i;
      this.ebl.SetToggleState(1);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.ebl.RootUIComp);
      this.Hea.StopSequenceByKey("Switch");
      this.Hea.PlayLevelSequenceByName("Switch");
      new UiAsyncTask_1.UiAsyncTask("RefreshSkillInfo", async () => {
        await this.dGd.RefreshAsync(e);
      }).Run();
    };
    this.fGd = () => {
      var e = new SurvivorsTalentTreeAreaItem_1.SurvivorsTalentTreeAreaItem();
      e.OnAfterRefreshOneNode = this.mGd;
      return e;
    };
    this.pcr = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig().HelpId;
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (i) {
      i.CheckCurrentTalentTreeNode();
      this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      this.dGd = new SurvivorsTalentTreeSkillInfoPanel_1.SurvivorsTalentTreeSkillInfoPanel();
      this.ja_ = new SurvivorsTalentTreeSkillNodeItem_1.SurvivorsTalentTreeSkillNodeItem();
      this.d4d = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.fGd, this.GetItem(2).GetOwner());
      e = [this.lqe.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.dGd.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.ja_.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())];
      await Promise.all(e);
      await this.ja_.RefreshNodeAsyncByData(i.GetFirstTalentNode());
      this.ja_.OnClickToggleBack = this.f4d;
      e = [this.lqe.SetCurrencyItemList([TALENT_TREE_COST_ITEM_ID]), this.d4d.RefreshByDataAsync(i.AreaDataList)];
      await Promise.all(e);
      this.lqe.SetHelpCallBack(this.pcr);
      this.lqe.SetCloseCallBack(this.Jvt);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.uGd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.uGd);
  }
  async m4d(e) {
    var i = [];
    let t = undefined;
    if (this.ja_ && (i.push(this.ja_.RefreshNodeAsync()), e === this.ja_.Node.NodeId)) {
      t = this.ja_;
    }
    for (const r of this.d4d.GetScrollItemList()) {
      for (const s of r.NodeItemMap.values()) {
        i.push(s.RefreshNodeAsync());
        if (e === s.Node.NodeId) {
          t = s;
        }
      }
    }
    await Promise.all(i);
    if (t) {
      t.SelectNode();
    }
  }
  OnBeforeShow() {
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
}
exports.SurvivorsTalentTreeView = SurvivorsTalentTreeView;
//# sourceMappingURL=SurvivorsTalentTreeView.js.map