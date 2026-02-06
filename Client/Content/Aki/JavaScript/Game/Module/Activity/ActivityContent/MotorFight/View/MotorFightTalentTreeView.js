"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTalentTreeView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const RoleLevelUpSuccessController_1 = require("../../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const MotorFightTalentGridPanel_1 = require("./Item/MotorFightTalentGridPanel");
class MotorFightTalentTreeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.Acg = undefined;
    this.rcg = [];
    this.lqe = undefined;
    this.m8t = undefined;
    this.BZa = undefined;
    this.CurSelectNode = undefined;
    this.ScrollView = undefined;
    this.Dcg = i => {
      if (this.CurSelectNode) {
        this.CurSelectNode.SetToggleState(0);
      }
      this.CurSelectNode = i;
      this.CurSelectNode.SetToggleState(1);
      this.Acg = i.Data;
      this.CNe.SelectedTalentNodeId = this.Acg.Id;
      this._$c();
      this.PlayOrReplaySequence("Switch");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorFightActivity", 71, "摩托战斗天赋树界面选择天赋节点", ["nodeId", this.Acg.Id]);
      }
    };
    this.Ucg = () => {
      var i = new MotorFightTalentGridPanel_1.MotorFightTalentGridPanel();
      i.OnSelectTalentNode = this.Dcg;
      return i;
    };
    this.tWt = () => {
      var i;
      if (this.CNe.GetTalentCoinNum() < this.CurSelectNode.Data.Cost) {
        i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.CNe.TalentTreeItemId);
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ItemConsumption_Talent", i);
      } else {
        ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestUnlockTalentNode(this.CurSelectNode.Data.Id, () => {
          this._$c();
          this.ScrollView?.RefreshByData(this.rcg);
          var i = {
            Title: "MotorFightGame_TechTreeUnlock_01",
            TextList: [{
              TextId: this.Acg.Desc,
              Params: this.Acg.DescParams.map(String)
            }]
          };
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(i);
        });
      }
    };
    this.AMo = () => {
      this.CNe.SelectedTalentNodeId = 0;
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.CNe = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.lqe.SetCurrencyItemList([this.CNe.TalentTreeItemId]);
    this.rcg = this.CNe.GetTalentTreeList();
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Ucg, undefined, true);
    var i = [];
    i.push(this.ScrollView?.RefreshByDataAsync(this.rcg));
    this.BZa = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    i.push(this.BZa.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.m8t = new ButtonItem_1.ButtonItem();
    this.m8t.SetFunction(this.tWt);
    i.push(this.m8t.CreateByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(i);
    const e = this.CNe.GetNextCanUnlockTalentId();
    i = this.rcg.findIndex(i => {
      for (const t of i) {
        if (t.Id === e) {
          return true;
        }
      }
      return false;
    });
    this.ScrollView.LateScrollTo(this.ScrollView.GetItemByIndex(i));
    this.BZa.SetButtonVisible(false);
    this.SetItemIcon(this.GetTexture(7), this.CNe.TalentTreeItemId);
  }
  _$c() {
    this.SetSpriteByPath(this.Acg.Icon, this.GetSprite(3), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), this.Acg.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Acg.Desc, ...this.Acg.DescParams);
    var i = this.CNe.GetTalentCoinNum() >= this.Acg.Cost;
    var t = this.GetText(6);
    t.SetText(this.Acg.Cost.toString());
    t.SetChangeColor(!i, t.changeColor);
    var i = this.CNe.IsPreNodeAllUnlock(this.Acg);
    var t = i && this.Acg.IsFinishPreCondition;
    this.m8t?.SetUiActive(t && !this.Acg.IsUnLock);
    this.BZa?.SetUiActive(!t && !this.Acg.IsUnLock);
    this.GetItem(9)?.SetUIActive(this.Acg.IsUnLock);
    var i = this.Acg.IsFinishPreCondition;
    var t = i ? "MotorFightGame_TechTree_01" : LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.Acg.ConditionId);
    this.BZa?.SetTextByTextId(t);
  }
}
exports.MotorFightTalentTreeView = MotorFightTalentTreeView;
//# sourceMappingURL=MotorFightTalentTreeView.js.map