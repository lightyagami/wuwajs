"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData");
const ScreenShotManager_1 = require("../../../ScreenShot/ScreenShotManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MoonSignInController_1 = require("./MoonSignInController");
class MoonSignInDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Fed = 0;
    this.Ned = undefined;
    this.Ved = undefined;
    this.jed = undefined;
    this.$ed = 0;
    this.SPe = undefined;
    this.Wed = () => {
      if (this.$ed) {
        this.Ked();
      }
    };
    this.Xed = () => {
      if (this.$ed) {
        this.Ked();
      } else {
        this.Fed--;
        if (this.Fed <= 0) {
          this.Fed = 10;
        }
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.Yed = () => {
      if (this.$ed) {
        this.Ked();
      } else {
        this.Fed++;
        if (this.Fed > 10) {
          this.Fed = 1;
        }
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.$An = e => {
      if (e === "Enter") {
        this.Qed();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Wed], [1, this.Xed], [2, this.Yed], [6, this.Awe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Ned = new IllustratedUnLockItem();
    e.push(this.Ned.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.Ved = new IllustratedLockItem();
    e.push(this.Ved.CreateByActorAsync(this.GetItem(4).GetOwner()));
    this.jed = new WishingItem();
    e.push(this.jed.CreateByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(e => {
      if (e === "Start01") {
        this.GetButton(0).RootUIComp.SetUIActive(true);
      }
    });
  }
  OnStart() {
    var e = this.OpenParam;
    this.Fed = e.MoonId;
    this.GetButton(0).RootUIComp.SetUIActive(false);
    if (e.Wishing) {
      this.zed();
    } else {
      this.Qed();
      this.SPe?.PlayLevelSequenceByName("Start02");
    }
  }
  zed() {
    this.Ned?.SetUiActive(true);
    this.Ved?.SetUiActive(false);
    this.Ned?.RefreshItem(this.Fed);
    this.$ed = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(this.Fed)?.Reward ?? 0;
    this.jed?.RefreshItem(this.Fed);
    this.jed?.SetUiActive(true);
    this.GetButton(1).RootUIComp.SetUIActive(false);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetButton(6).RootUIComp.SetUIActive(false);
    this.SPe?.PlayLevelSequenceByName("Start01");
  }
  Zed() {
    this.jed?.SetUiActive(false);
  }
  Qed() {
    this.Zed();
    var e = MoonSignInController_1.MoonSignInController.GetData();
    if (e) {
      e = e.CheckPhaseLock(this.Fed);
      this.Ned?.SetUiActive(!e);
      this.Ved?.SetUiActive(e);
      (e ? this.Ved : this.Ned)?.RefreshItem(this.Fed);
      this.GetButton(1).RootUIComp.SetUIActive(true);
      this.GetButton(2).RootUIComp.SetUIActive(true);
    }
  }
  Ked() {
    this.Zed();
    var e;
    var t;
    var i = [];
    for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.$ed)) {
      var s = new RewardItemData_1.RewardItemData(e.ItemId, t);
      i.push(s);
    }
    ControllerHolder_1.ControllerHolder.ItemRewardController.OpenCommonRewardView(1009, i);
    this.$ed = 0;
    this.GetButton(0).RootUIComp.SetUIActive(false);
    this.GetButton(1).RootUIComp.SetUIActive(true);
    this.GetButton(2).RootUIComp.SetUIActive(true);
    this.GetButton(6).RootUIComp.SetUIActive(true);
    this.SPe?.PlayLevelSequenceByName("Next");
    this.Ned?.RefreshShareBtn();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
}
exports.MoonSignInDetailView = MoonSignInDetailView;
class IllustratedUnLockItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JWi = () => {
      this.b_c();
    };
    this.hud = () => {
      this.GetItem(13).SetUIActive(true);
      this.GetButton(15)?.RootUIComp.SetUIActive(true);
    };
    this.lud = () => {
      this.GetItem(13).SetUIActive(false);
      this.GetButton(15)?.RootUIComp.SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.JWi], [12, this.hud], [15, this.lud]];
  }
  OnStart() {
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetItem(13)?.SetUIActive(false);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
  }
  RefreshItem(e) {
    var t;
    var i = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(e);
    if (i && (e = MoonSignInController_1.MoonSignInController.GetData()?.GetMoonPhaseSelect(e))) {
      this.SetTextureByPath(i.Texture, this.GetTexture(0));
      this.SetTextureByPath(i.BuffTexture, this.GetTexture(9));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.MoonName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.BuffName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.MoonDes);
      t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonLabelById(e.ted);
      e = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonLabelById(e.ied);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t?.MoonLabelName ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e?.MoonLabelName ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t?.MoonText1 ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e?.MoonText2 ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), i.BuffDes);
    }
  }
  b_c() {
    var e = new UiAsyncTask_1.UiAsyncTask("OpenShareView", async () => {
      await this.L_c();
    });
    this.RunAsyncTask(e);
  }
  async L_c() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, false);
    try {
      await this.c2a();
      var e = {
        ScreenShot: false,
        IsHiddenBattleView: false,
        HandBookPhotoData: undefined,
        BabelTowerSettlementViewData: undefined,
        PrepareFullScreenShot: true,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined,
        ExternalTexture: await ScreenShotManager_1.ScreenShotManager.TakeFullScreenShotToTextureAsync()
      };
      await UiManager_1.UiManager.OpenViewAsync("PhotoSaveView", e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 5, "打开分享界面异常", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 5, "打开分享界面异常", ["error", e]);
      }
    } finally {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, true);
    }
  }
  async c2a() {
    return new Promise(e => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        e();
      });
    });
  }
  RefreshShareBtn() {
    var e = ControllerHolder_1.ControllerHolder.ChannelController.CouldShare();
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
}
class IllustratedLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  RefreshItem(e) {
    e = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(e);
    if (e) {
      this.SetTextureByPath(e.Texture, this.GetTexture(0));
      this.SetTextureByPath(e.Texture, this.GetTexture(1));
    }
  }
}
class WishingItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [5, UE.UITexture]];
  }
  RefreshItem(e) {
    e = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Talk[0]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Talk[1]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Talk[2]);
      this.SetTextureByPath(e.Texture, this.GetTexture(0));
    }
  }
}
//# sourceMappingURL=MoonSignInDetailView.js.map