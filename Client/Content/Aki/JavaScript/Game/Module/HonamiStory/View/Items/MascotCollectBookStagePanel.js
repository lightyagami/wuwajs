"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MascotCollectBookStagePanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const MascotCollectBookStageToggle_1 = require("./MascotCollectBookStageToggle");
class MascotCollectBookStagePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.k5d = undefined;
    this.gJd = undefined;
    this.zOl = [];
    this.MKi = undefined;
    this.Svm = [];
    this.bOe = undefined;
    this.p9t = undefined;
    this.yvm = undefined;
    this.pvm = undefined;
    this.$An = t => {
      if (t === "Stadtage_Switch_2") {
        this._$c();
      }
    };
    this.qxt = () => {
      var t = new MascotCollectBookStageToggle_1.MascotCollectBookStageToggle();
      t.BindStageToggleClick(this.O5d);
      this.Svm.push(t);
      return t;
    };
    this.JGe = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    this.O5d = t => {
      if (this.gJd !== t) {
        this.gJd?.OnDeselected();
        this.gJd = t;
        this.k5d = t.Data;
        if (this.pvm) {
          this.pvm();
        }
        this.yvm.PlaySequence("Switch_2");
      }
    };
    this.p5t = () => {
      if (this.k5d) {
        HonamiStoryController_1.HonamiStoryController.SendHonamiStoryAreaSecretRewardRequest(this.k5d.Id, () => {
          this.gJd.Refresh(this.gJd.Data, true, 0);
          this._$c();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
  }
  OnStart() {
    this.MKi = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.qxt);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.p9t.SetFunction(this.p5t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  async InitPanel() {
    this.CNe ||= ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (this.zOl.length === 0) {
      this.q5d();
    }
    if (this.gJd) {
      this.gJd.OnDeselected();
    }
    this.gJd = undefined;
    await this.mJd();
    this._$c();
    this.yvm.PlaySequence("Start");
  }
  q5d() {
    this.zOl = this.CNe.GetHonamiStoryMascotAreaDataList();
  }
  async mJd() {
    await this.MKi.RefreshByDataAsync(this.zOl);
    this.gJd = this.Svm[0];
    this.k5d = this.gJd.Data;
    this.gJd.OnSelected();
  }
  _$c() {
    if (this.k5d) {
      this.GetText(2).ShowTextNew(this.k5d.Name);
      var t = this.k5d.CollectMascotState;
      this.GetItem(5).SetUIActive(t === 0);
      this.GetText(4).SetUIActive(t !== 0);
      this.GetText(4).ShowTextNew(this.k5d.Desc);
      var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.k5d.DropId);
      var i = [];
      for (const o of e) {
        var s = {
          Item: o,
          HasClaimed: t === 2
        };
        i.push(s);
      }
      this.bOe.RefreshByData(i);
      this.p9t.SetUiActive(t !== 2);
      this.p9t.SetEnableClick(t === 1);
      this.p9t.SetRedDotVisible(t === 1);
      this.p9t.SetShowText(HonamiStoryDefine_1.honamiCollectStateMap.get(t));
    }
  }
  BindSwitchCallback(t) {
    this.pvm = t;
  }
  CloseWithSequence() {
    this.yvm.PlaySequence("Close");
  }
}
exports.MascotCollectBookStagePanel = MascotCollectBookStagePanel;
//# sourceMappingURL=MascotCollectBookStagePanel.js.map