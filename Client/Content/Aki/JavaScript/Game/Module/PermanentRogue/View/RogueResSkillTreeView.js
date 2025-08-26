"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResSkillView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const RogueResSortById_1 = require("../../../../Core/Define/ConfigQuery/RogueResSortById");
const RogueResTalentTreeAll_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeAll");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueResSkillDetail_1 = require("./RogueResSkillDetail");
const RogueResSkillGridPanel_1 = require("./RogueResSkillGridPanel");
const ANIM_ENDCOUNT = 15;
class RogueResSkillView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SkillTreeConfigList = new Array();
    this.SkillGridList = [];
    this.CaptionItem = undefined;
    this.CurSelectNode = undefined;
    this.SkillDetailPanel = undefined;
    this.ScrollView = undefined;
    this.SelectColumn = 0;
    this.giu = -1;
    this.ExecuteCount = 1;
    this.CreateGridPanel = () => {
      return new RogueResSkillGridPanel_1.RogueResSkillGridPanel();
    };
    this.OnSkillLevelUp = e => {
      var i = this.OpenParam;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, i);
      this.ScrollView?.GetScrollItemList().forEach(e => {
        e.NodeMap.forEach(e => {
          e.Refresh();
          e = this.OpenParam;
          e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
          this.CaptionItem.SetCurrencyItemList([e.SkillItem]);
        });
      });
    };
    this.OnBtnMaskClick = () => {
      this.GetButton(6).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(false);
      this.SkillDetailPanel.SetActive(false);
      this.CurSelectNode.SetToggleState(0);
    };
    this.OnBtnSkillOverViewClick = () => {
      UiManager_1.UiManager.OpenView("RogueResSkillOverView", this.OpenParam);
    };
    this.OnSelectSkill = e => {
      if (this.CurSelectNode) {
        this.CurSelectNode.SetToggleState(0);
      }
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.SelectSkillId = e.Data.Id;
      this.CurSelectNode = e;
      this.CurSelectNode.SetToggleState(1);
      if (this.SelectColumn === -1) {
        this.ScrollView?.ScrollTo(e.GridPanelItem);
      }
      this.SkillDetailPanel.Refresh(e.Data);
      this.SkillDetailPanel.SetActive(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.OnBtnSkillOverViewClick], [6, this.OnBtnMaskClick]];
  }
  async OnBeforeStartAsync() {
    this.SkillDetailPanel = new RogueResSkillDetail_1.RogueResSkillDetail();
    await this.SkillDetailPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.CreateGridPanel, this.GetItem(5).GetOwner());
    this.BuildSkillTreeConfig();
    await this.ScrollView.RefreshByDataAsync(this.SkillTreeConfigList);
  }
  OnStart() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    });
    var e = this.OpenParam;
    var i = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    this.CaptionItem?.SetCurrencyItemList([i.SkillItem]);
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheSkillTreeOpen(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, e);
  }
  OnBeforeShow() {
    if (this.SelectColumn > 0 && this.giu > 0) {
      this.ScrollView.BindLateUpdate(e => {
        if (this.ExecuteCount === ANIM_ENDCOUNT) {
          this.GetScrollViewWithScrollbar(3).SetScrollProgress(1 - (this.SelectColumn + 1) / (this.giu + 1));
          this.SelectColumn = -1;
          this.giu = -1;
          this.ScrollView.UnBindLateUpdate();
        }
        this.ExecuteCount++;
      });
    }
  }
  OnBeforeDestroy() {
    this.ScrollView?.UnBindLateUpdate();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResSelectSkill, this.OnSelectSkill);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResTalentLevelUp, this.OnSkillLevelUp);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResSelectSkill, this.OnSelectSkill);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResTalentLevelUp, this.OnSkillLevelUp);
  }
  BuildSkillTreeConfig() {
    const i = this.OpenParam;
    let e = ConfigCommon_1.ConfigCommon.ToList(RogueResTalentTreeAll_1.configRogueResTalentTreeAll.GetConfigList());
    (e = e?.filter(e => e.SeasonId === i))?.sort((e, i) => {
      e = RogueResSortById_1.configRogueResSortById.GetConfig(e.Id);
      i = RogueResSortById_1.configRogueResSortById.GetConfig(i.Id);
      return e.Column - i.Column;
    });
    for (const r of e) {
      var t = RogueResSortById_1.configRogueResSortById.GetConfig(r.Id);
      this.SkillTreeConfigList[t.Column] ||= new Array();
      var s = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(r.Id);
      if (s === 0 && t.Column > this.SelectColumn) {
        this.SelectColumn = t.Column;
      }
      if (t.Column > this.giu) {
        this.giu = t.Column;
      }
      this.SkillTreeConfigList[t.Column].push(r);
    }
    for (const o of this.SkillTreeConfigList) {
      o?.sort((e, i) => {
        e = RogueResSortById_1.configRogueResSortById.GetConfig(e.Id);
        i = RogueResSortById_1.configRogueResSortById.GetConfig(i.Id);
        return e.Row - i.Row;
      });
    }
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.SelectSkillId = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNextCanUnlockSkillId(i);
  }
}
exports.RogueResSkillView = RogueResSkillView;
//# sourceMappingURL=RogueResSkillTreeView.js.map