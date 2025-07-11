"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInstanceEntranceView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const HelpController_1 = require("../../../Help/HelpController");
const InstanceDungeonDefine_1 = require("../../../InstanceDungeon/Define/InstanceDungeonDefine");
const DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView");
const ActivityInstanceEntranceDynItem_1 = require("./ActivityInstanceEntranceDynItem");
const ActivityInstanceEntranceInfoItem_1 = require("./ActivityInstanceEntranceInfoItem");
const ActivityInstanceEntranceScoreItem_1 = require("./ActivityInstanceEntranceScoreItem");
const ActivityInstanceEntranceScrollItem_1 = require("./ActivityInstanceEntranceScrollItem");
class ActivityInstanceEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.OBl = undefined;
    this.wth = undefined;
    this.NBl = undefined;
    this.FBl = 0;
    this.mli = undefined;
    this.Cli = undefined;
    this.Lli = (t, e, i) => {
      return new ActivityInstanceEntranceScrollItem_1.ActivityInstanceEntranceScrollItem();
    };
    this.yli = () => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.vMl = () => {
      this.OBl?.RefreshDropDownItem(this.C0t);
      this.OBl?.RefreshRecommendLevelItem(this.C0t);
    };
    this.VBl = t => {
      this.FBl = t;
      this.HBl();
      this.BUc();
      this.OBl?.RefreshView(this.C0t);
      this.UiViewSequence.PlaySequence("Xz");
    };
    this.jBl = t => {
      this.FBl = t;
      this.Esi();
      this.OBl?.RefreshView(this.C0t);
      this.Fth(this.C0t);
      this.UiViewSequence.PlaySequence("Xz");
    };
    this.kUc = () => {
      HelpController_1.HelpController.OpenHelpById(InstanceDungeonDefine_1.DUNGEON_ARCHIVE_HELP_ID);
    };
    this.xli = () => {
      this.UiViewSequence.PlaySequencePurely("Close01", true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem], [3, UE.UITexture], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.C0t = this.OpenParam;
    this.wth = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6));
    await this.wth.CreateCaptionStateItem(this.kUc);
    this.OUc(this.C0t.GetActivityEntranceSelectItemData()?.GetCurrentSelectData());
    this.WBl(this.C0t.GetActivityEntranceCaptionItemData());
    var t = [];
    this.OBl = new ActivityInstanceEntranceInfoItem_1.ActivityInstanceEntranceInfoItem();
    t.push(this.OBl.CreateThenShowByResourceIdAsync("UiItem_InstanceDungeon_RightInfo", this.GetItem(5)));
    this.mli = new ActivityInstanceEntranceDynItem_1.ActivityInstanceEntranceDynItem();
    this.Cli = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), this.mli, this.Lli);
    t.push(this.Cli.Init());
    if (this.C0t.GetActivityEntrancePointData()) {
      this.NBl = new ActivityInstanceEntranceScoreItem_1.ActivityInstanceEntranceScoreItem();
      t.push(this.NBl.CreateThenShowByResourceIdAsync("UiItem_CheckpointsLScoreB", this.GetItem(8)));
    }
    await Promise.all(t);
    this.OBl.RefreshView(this.C0t);
    this.QBl(this.C0t.GetActivityEntrancePointData());
    this.Fth(this.C0t);
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yli);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshActivityEntranceScroller, this.jBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshActivityEntranceItemContent, this.VBl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel, this.vMl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshActivityEntranceScroller, this.jBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshActivityEntranceItemContent, this.VBl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel, this.vMl);
  }
  OnBeforeShow() {
    this.Esi();
  }
  OnAfterShow() {
    this.BUc();
  }
  BUc() {
    var t = this.C0t.GetActivityEntranceSelectItemData()?.GetCurrentSelectData()?.GetInstanceDungeonId() ?? 0;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.CheckAndShowDungeonArchiveExpireTips(t);
  }
  WBl(t) {
    var e;
    this.wth.SetCloseCallBack(this.xli);
    if (t) {
      this.wth?.SetUiActive(true);
      this.wth?.SetTitleByTextIdAndArgNew(t.GetName());
      if ((e = t.GetTitleSpritePath()) && e !== "") {
        this.wth.SetTitleIconVisible(true);
        this.wth.SetTitleIcon(e);
      } else {
        this.wth.SetTitleIconVisible(false);
      }
      e = t.GetHelpId();
      this.wth.SetHelpBtnActive(e !== 0);
      this.wth.SetHelpCallBack(() => {
        var t = this.C0t.GetActivityEntranceCaptionItemData().GetHelpId();
        HelpController_1.HelpController.OpenHelpById(t);
      });
    } else {
      this.wth?.SetUiActive(false);
    }
  }
  OUc(t) {
    var e = t?.GetInstanceDungeonId() ?? 0;
    var i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(e);
    this.wth.SetCaptionStateActive(i && t !== undefined);
    this.wth.SetCaptionChangeColor(false);
    if (i) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(e)) {
        this.wth.SetCaptionStateTip("instance_HaveRecord");
        this.wth.SetCaptionChangeColor(true);
      } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportAndWithoutArchive(e)) {
        this.wth.SetCaptionStateTip("instance_Record_leave");
      }
    }
  }
  Fth(t) {
    if (t && t.GetActivityEntranceSelectItemData() && (t = t.GetActivityEntranceSelectItemData().GetCurrentSelectData()?.GetBgPath()) && t !== "") {
      this.SetTextureByPath(t, this.GetTexture(3));
    } else {
      this.GetTexture(3)?.SetUIActive(false);
    }
  }
  QBl(t) {
    if (t) {
      this.NBl?.SetActive(true);
      this.NBl?.RefreshView(t);
    }
  }
  Esi() {
    var t = this.C0t.GetActivityEntranceSelectItemData().GetShowDataBySelectElement(this.FBl, 0);
    for (const e of t) {
      if (e.GetSelectState()) {
        e.GetSelectCallBack()?.(e.GetSelectDataIndex());
      }
    }
    this.Cli.RefreshByData(t);
  }
  HBl() {
    var e = this.C0t.GetActivityEntranceSelectItemData().GetShowDataBySelectElement(this.FBl, 0);
    for (let t = 0; t < this.Cli.GetScrollItemCount(); t++) {
      this.Cli?.GetScrollItemFromIndex(t)?.Update(e[t], t);
    }
  }
  OnBeforeDestroy() {
    if (this.Cli) {
      this.Cli.ClearChildren();
      this.Cli = undefined;
    }
  }
}
exports.ActivityInstanceEntranceView = ActivityInstanceEntranceView;
//# sourceMappingURL=ActivityInstanceEntranceView.js.map