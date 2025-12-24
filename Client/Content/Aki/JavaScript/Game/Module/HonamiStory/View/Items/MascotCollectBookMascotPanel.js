"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MascotCollectBookMascotPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const ActivitySmallItemGrid_1 = require("../../../Activity/ActivityContent/UniversalComponents/ActivitySmallItemGrid");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const MascotCollectBookInfoItem_1 = require("./MascotCollectBookInfoItem");
class MascotCollectBookMascotPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.dJd = undefined;
    this.P5d = undefined;
    this.GCm = new Map();
    this.R5d = undefined;
    this.bOe = undefined;
    this.p9t = undefined;
    this.cJd = [];
    this.pvm = undefined;
    this.bId = false;
    this.yvm = undefined;
    this.$An = t => {
      if (t === "Info_Switch_2") {
        this._$c();
      }
      if (t === "PnlHead_Refresh" && this.dJd) {
        this.SetTextureShowUntilLoaded(this.dJd.Config.Picture, this.GetTexture(11));
      }
    };
    this.D5d = () => {
      var t = new MascotCollectBookInfoItem_1.MascotCollectBookInfoItem();
      t.BindMascotToggleClick(this.w5d);
      return t;
    };
    this.JGe = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    this.w5d = t => {
      if (this.P5d !== t) {
        this.P5d?.OnDeselected();
        this.P5d = t;
        this.dJd = t.Data;
        if (this.pvm) {
          this.pvm();
        }
        this.yvm.PlaySequence("Switch_2");
      }
    };
    this.p5t = () => {
      var t;
      if (this.dJd && (t = this.dJd).State === 1) {
        HonamiStoryController_1.HonamiStoryController.SendHonamiStoryMascotRewardRequest(t.Id, () => {
          this.bId = true;
        });
      }
    };
    this.v6e = () => {
      if (this.bId) {
        this.IYm();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture]];
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
    this.R5d = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.D5d);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.JGe);
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(9));
    this.p9t.SetFunction(this.p5t);
  }
  OnBeforeShow() {
    this.yvm.PlaySequence("Start");
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  async InitPanel() {
    this.CNe ||= ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (this.GCm.size === 0) {
      this.U5d();
    }
    if (this.P5d) {
      this.P5d.OnDeselected();
    }
    this.P5d = undefined;
    await this.mJd();
    this.fJd();
    this._$c();
  }
  U5d() {
    this.GCm.clear();
    for (const e of this.CNe.GetHonamiStoryMascotAreaDataList()) {
      var t = this.CNe.GetHonamiStoryMascotDataListByAreaId(e.Id);
      if (t.length !== 0) {
        this.GCm.set(e.Id, t);
      }
    }
  }
  async mJd() {
    var t;
    var e;
    var i = [];
    for ([t, e] of this.GCm) {
      var s = {
        AreaData: this.CNe.GetHonamiStoryAreaData(t),
        MascotDataList: e
      };
      i.push(s);
    }
    await this.R5d.RefreshByDataAsync(i);
    this.dJd = i[0].MascotDataList[0];
  }
  fJd() {
    for (const t of this.R5d.GetLayoutItemList()) {
      for (const e of t.GetMascotToggleList()) {
        this.cJd.push(e);
      }
    }
    if (this.cJd.length > 0) {
      this.P5d = this.cJd[0];
      this.P5d.OnSelected();
    }
  }
  _$c() {
    if (this.dJd) {
      var t = this.dJd;
      var e = this.CNe.GetHonamiStoryAreaData(t.AreaId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HonamiStory_Mascot_Number_Text", t.Id);
      this.GetText(3).ShowTextNew(t.Name);
      this.GetText(4).ShowTextNew(e.Name);
      this.GetText(5).ShowTextNew(t.FeatureDesc);
      this.GetText(6).ShowTextNew(t.ClueDesc);
      var i = [];
      for (const n of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.DropId)) {
        var s = {
          Item: n,
          HasClaimed: t.State === 2
        };
        i.push(s);
      }
      this.bOe.RefreshByData(i);
      var e = t.State;
      this.p9t.SetUiActive(e !== 2);
      this.p9t.SetEnableClick(e === 1);
      this.p9t.SetRedDotVisible(e === 1);
      this.p9t.SetShowText(HonamiStoryDefine_1.honamiCollectStateMap.get(e));
      var o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet) ?? new Set();
      if (o.has(t.Id)) {
        this.yvm?.PlaySequence("PnlHead_Refresh");
        o.delete(t.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet, o);
      } else if (e === 1 || e === 2) {
        this.SetTextureShowUntilLoaded(t.Config.Picture, this.GetTexture(11));
      } else {
        this.SetTextureShowUntilLoaded(HonamiStoryDefine_1.HONAMI_MASCOT_EMPTY_BIG_PATH, this.GetTexture(11));
      }
      this.GetItem(10).SetUIActive(e === 2);
    }
  }
  BindSwitchCallback(t) {
    this.pvm = t;
  }
  CloseWithSequence() {
    this.yvm.PlaySequence("Close");
  }
  IYm() {
    this.bId = false;
    this.P5d.Refresh(this.P5d.Data, true, 0);
    this._$c();
    this.yvm.PlaySequence("Stamp");
  }
}
exports.MascotCollectBookMascotPanel = MascotCollectBookMascotPanel;
//# sourceMappingURL=MascotCollectBookMascotPanel.js.map