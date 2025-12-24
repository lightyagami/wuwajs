"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisActivityRoleChatView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ArtemisActivityController_1 = require("./ArtemisActivityController");
const ArtemisDaysItem_1 = require("./ArtemisDaysItem");
const ArtemisDialogueBoxPanel_1 = require("./ArtemisDialogueBoxPanel");
class ArtemisActivityRoleChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ArtemisData = undefined;
    this.lqe = undefined;
    this.yzm = undefined;
    this.Szm = undefined;
    this.ISf = false;
    this.Mzm = () => {
      this.Ezm(ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex);
      this.Izm();
    };
    this.LSf = (i, e) => {
      if (e === "Dele_M") {
        UiLayer_1.UiLayer.SetShowMaskLayer("ArtemisActivityRoleChatView", false);
      }
    };
    this.Tzm = () => {
      var i = new ArtemisDaysItem_1.ArtemisDaysItem();
      i.SetClickCallback(this.bzm);
      return i;
    };
    this.Rzm = () => {
      this.Izm();
    };
    this.bzm = i => {
      if (this.vsf(i)) {
        if (ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex !== i) {
          ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex = i;
          this.Ezm(i);
          this.tPf(i + 1);
        }
        this.Izm();
      }
    };
    this.Qqf = () => {
      var i = ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex;
      var i = {
        GamePlayId: (ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisByActivityIdAndDay(this.ArtemisData.GetCacheActivityId, i)).QteId,
        Index: i,
        CallBack: this.TSf
      };
      UiManager_1.UiManager.OpenView("ArtemisQteView", i, () => {
        UiManager_1.UiManager.CloseView("ArtemisActivityCertificationView");
      });
    };
    this.TSf = () => {
      var i = {
        CallBack: this.p5f,
        IsPlayFixedDone: true
      };
      UiManager_1.UiManager.OpenView("ArtemisActivityCertificationView", i);
    };
    this.p5f = () => {
      var i = ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex;
      var e = this.yzm?.GetScrollItemByIndex(i);
      if (e) {
        e?.LoadMaterial(false);
      }
      ArtemisActivityController_1.ArtemisActivityController.RequestArtemisStatus(this.ArtemisData, i + 1, i => {
        this.ISf = false;
        if (i) {
          this.CloseMe();
        }
      });
    };
    this.v6e = () => {
      this.PlaySequence("Fix_Done");
      this.Szm?.PlayFixDoneSequence();
      UiLayer_1.UiLayer.SetShowMaskLayer("ArtemisActivityRoleChatView", true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIArtText], [2, UE.UIArtText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnArtemisStateRefresh, this.Mzm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnArtemisStateRefresh, this.Mzm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
  }
  async OnBeforeStartAsync() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.LSf);
    var i = this.OpenParam;
    ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex = i.DefaultIndex;
    this.ArtemisData = i.Data;
    this.zDn();
    this.wzm();
    this.GetText(7)?.ShowTextNew("Activity_ArtemisChatRewardTips");
    await super.OnBeforeStartAsync();
    this.Szm = new ArtemisDialogueBoxPanel_1.ArtemisDialogueBoxPanel();
    var i = this.GetItem(5).GetOwner();
    await this.Szm.CreateThenShowByActorAsync(i);
  }
  OnBeforeShow() {
    this.Rzm();
    this.Ezm(ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex);
    this.tPf(ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex + 1);
  }
  OnBeforeDestroy() {
    this.RootActor?.OnSequencePlayEvent.Unbind();
  }
  zDn() {
    if (this.GetItem(0)) {
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.lqe.SetTitle(this.ArtemisData.GetTitle());
    }
  }
  wzm() {
    var i;
    if (!this.yzm) {
      if (i = this.GetScrollViewWithScrollbar(3)) {
        this.yzm = new GenericScrollViewNew_1.GenericScrollViewNew(i, this.Tzm);
      }
    }
  }
  Izm() {
    var i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisGroupByActivityId(this.ArtemisData.GetCacheActivityId);
    if (i && i.length && this.yzm) {
      var e = [];
      for (const r of i) {
        var t = {
          Index: r.OpenDay,
          State: this.ArtemisData?.GetArtemisStatus(r.OpenDay)
        };
        e.push(t);
      }
      this.yzm?.RefreshByData(e, () => {
        var i = this.yzm?.GetItemByIndex(ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex);
        if (i) {
          this.yzm?.LateScrollTo(i);
        }
      });
    }
  }
  tPf(i) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_ChatBallBg_" + i);
    this.TrySetTextureByPath(i, this.GetTexture(6));
  }
  vsf(i) {
    if (this.ArtemisData?.GetArtemisStatus(i) !== 0) {
      return true;
    }
    var e = this.ArtemisData?.GetUnlockIndex;
    if (this.ArtemisData?.GetRewardedIndex < i && i < e) {
      const t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_ArtemisChatLockedTips_1");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    } else {
      const t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_ArtemisChatLockedTips_2");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    }
    return false;
  }
  Ezm(i) {
    this.yzm?.SelectGridProxy(i);
    this.Lzm(i);
    this.qbf();
  }
  Lzm(i) {
    if (!(i < 0)) {
      this.mnf();
      switch (this.ArtemisData?.GetArtemisStatus(i)) {
        case 1:
          this.Szm?.SetShowRewardItems(false);
          this.Szm?.ScrollToTop(true);
          this.Pzm(true, true, this.ArtemisData?.GetCacheActivityId, i);
          if (!this.ISf && !(this.ISf = true, e = CommonParamById_1.configCommonParamById.GetIntConfig("ArtemisWaitFixedTime") ?? 1, UiManager_1.UiManager.IsViewOpen("ArtemisActivityCertificationView"))) {
            UiLayer_1.UiLayer.SetShowMaskLayer("ArtemisActivityRoleChatView", true);
            TimerSystem_1.GameplayTimerSystem.Delay(() => {
              UiLayer_1.UiLayer.SetShowMaskLayer("ArtemisActivityRoleChatView", false);
              var i = {
                CallBack: this.Qqf,
                IsPlayFixedDone: false
              };
              UiManager_1.UiManager.OpenView("ArtemisActivityCertificationView", i);
            }, e * 1000);
          }
          break;
        case 2:
          this.Szm?.SetShowRewardItems(true);
          var e = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisByActivityIdAndDay(this.ArtemisData?.GetCacheActivityId, i);
          var e = this.GetRewardItem(e.DropId);
          this.Szm?.SetRewardItems(e, true);
          this.Szm?.ScrollToTop(false);
          this.Pzm(false, false, this.ArtemisData?.GetCacheActivityId, i);
      }
    }
  }
  mnf() {
    this.GetArtText(1)?.SetText("0" + (ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex + 1));
    var i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisGroupByActivityId(this.ArtemisData.GetCacheActivityId);
    this.GetArtText(2)?.SetText("/0" + i?.length);
  }
  GetRewardItem(i) {
    var e = [];
    if (i && i !== 0) {
      i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(i)?.DropPreview;
      if (i) {
        for (var [t, r] of i) {
          t = [{
            IncId: 0,
            ItemId: t
          }, r];
          e.push(t);
        }
      }
    }
    return e;
  }
  Azm(i) {
    this.GetItem(5)?.SetUIActive(i);
  }
  Pzm(i, e, t, r) {
    this.Azm(true);
    t = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisByActivityIdAndDay(t, r);
    this.Szm?.ShowDialogue(t ? t.ChatIds : [], i, e);
  }
  qbf() {
    var i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisByActivityIdAndDay(this.ArtemisData.GetCacheActivityId, ArtemisActivityController_1.ArtemisActivityController.CurrentDayIndex);
    if (i) {
      var e = this.ArtemisData.GetCacheActivityId;
      var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstUnlockArtemisDayMap) ?? new Map();
      if (t.has(e)) {
        if ((t.get(e) ?? 0) >= i.Id) {
          return;
        }
      }
      t.set(e, i.Id);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstUnlockArtemisDayMap, t);
      e = new LogReportDefine_1.ArtemisLevelUnlockLogEvent();
      e.i_id = i.Id;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
}
exports.ArtemisActivityRoleChatView = ArtemisActivityRoleChatView;
//# sourceMappingURL=ArtemisActivityRoleChatView.js.map