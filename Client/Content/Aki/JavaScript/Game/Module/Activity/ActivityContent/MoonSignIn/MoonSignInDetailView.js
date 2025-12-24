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
    this.zid = 0;
    this.Jid = undefined;
    this.Zid = undefined;
    this.erd = undefined;
    this.ird = 0;
    this.SPe = undefined;
    this.rrd = () => {
      if (this.ird) {
        this.srd();
      }
    };
    this.ard = () => {
      if (this.ird) {
        this.srd();
      } else {
        this.zid--;
        if (this.zid <= 0) {
          this.zid = 10;
        }
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.hrd = () => {
      if (this.ird) {
        this.srd();
      } else {
        this.zid++;
        if (this.zid > 10) {
          this.zid = 1;
        }
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.$An = t => {
      if (t === "Enter") {
        this.nrd();
      }
    };
    this.ZZd = t => {
      this.GetItem(10).SetUIActive(t);
      this.GetItem(11).SetUIActive(t);
      this.GetButton(6).RootUIComp.SetUIActive(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rrd], [1, this.ard], [2, this.hrd], [6, this.Awe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.Jid = new IllustratedUnLockItem();
    t.push(this.Jid.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.Zid = new IllustratedLockItem();
    t.push(this.Zid.CreateByActorAsync(this.GetItem(4).GetOwner()));
    this.erd = new WishingItem();
    t.push(this.erd.CreateByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(t);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(t => {
      if (t === "Start01") {
        this.GetButton(0).RootUIComp.SetUIActive(true);
      }
    });
    this.Jid.SetNextAndBackBtnUiActive = this.ZZd;
  }
  OnStart() {
    var t = this.OpenParam;
    this.zid = t.MoonId;
    this.GetButton(0).RootUIComp.SetUIActive(false);
    if (t.Wishing) {
      this.lrd();
    } else {
      this.nrd();
      this.SPe?.PlayLevelSequenceByName("Start02");
    }
  }
  lrd() {
    this.Jid?.SetUiActive(true);
    this.Zid?.SetUiActive(false);
    this.Jid?.RefreshItem(this.zid);
    this.ird = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(this.zid)?.Reward ?? 0;
    this.erd?.RefreshItem(this.zid);
    this.erd?.SetUiActive(true);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetButton(6).RootUIComp.SetUIActive(false);
    this.SPe?.PlayLevelSequenceByName("Start01");
  }
  urd() {
    this.erd?.SetUiActive(false);
  }
  nrd() {
    this.urd();
    var t = MoonSignInController_1.MoonSignInController.GetData();
    if (t) {
      t = t.CheckPhaseLock(this.zid);
      this.Jid?.SetUiActive(!t);
      this.Zid?.SetUiActive(t);
      (t ? this.Zid : this.Jid)?.RefreshItem(this.zid);
      this.GetItem(10).SetUIActive(true);
      this.GetItem(11).SetUIActive(true);
    }
  }
  srd() {
    this.urd();
    var t;
    var e;
    var i = [];
    for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.ird)) {
      var s = new RewardItemData_1.RewardItemData(t.ItemId, e);
      i.push(s);
    }
    ControllerHolder_1.ControllerHolder.ItemRewardController.OpenCommonRewardView(1009, i);
    this.ird = 0;
    this.GetButton(0).RootUIComp.SetUIActive(false);
    this.GetItem(10).SetUIActive(true);
    this.GetItem(11).SetUIActive(true);
    this.GetButton(6).RootUIComp.SetUIActive(true);
    this.SPe?.PlayLevelSequenceByName("Next");
    this.Jid?.RefreshShareBtn();
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
    this.SetNextAndBackBtnUiActive = undefined;
    this.JWi = () => {
      this.b_c();
    };
    this.BSd = () => {
      this.GetItem(13).SetUIActive(true);
      this.GetButton(15)?.RootUIComp.SetUIActive(true);
    };
    this.kSd = () => {
      this.GetItem(13).SetUIActive(false);
      this.GetButton(15)?.RootUIComp.SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.JWi], [12, this.BSd], [15, this.kSd]];
  }
  OnStart() {
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetItem(13)?.SetUIActive(false);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
  }
  RefreshItem(t) {
    var e;
    var i = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(t);
    if (i && (t = MoonSignInController_1.MoonSignInController.GetData()?.GetMoonPhaseSelect(t))) {
      this.SetTextureByPath(i.Texture, this.GetTexture(0));
      this.SetTextureByPath(i.BuffTexture, this.GetTexture(9));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.MoonName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.BuffName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.MoonDes);
      e = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonLabelById(t.sid);
      t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetMoonLabelById(t.aid);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e?.MoonLabelName ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t?.MoonLabelName ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e?.MoonText1 ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t?.MoonText2 ?? "");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), i.BuffDes);
    }
  }
  b_c() {
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.SetNextAndBackBtnUiActive?.(false);
    var t = new UiAsyncTask_1.UiAsyncTask("OpenShareView", async () => {
      await this.L_c();
      this.GetButton(2).RootUIComp.SetUIActive(true);
      this.SetNextAndBackBtnUiActive?.(true);
    });
    this.RunAsyncTask(t);
  }
  async L_c() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, false);
    try {
      await this.c2a();
      var t = {
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
      await UiManager_1.UiManager.OpenViewAsync("PhotoSaveView", t);
    } catch (t) {
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 5, "打开分享界面异常", t, ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 5, "打开分享界面异常", ["error", t]);
      }
    } finally {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, true);
    }
  }
  async c2a() {
    return new Promise(t => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        t();
      });
    });
  }
  RefreshShareBtn() {
    var t = ControllerHolder_1.ControllerHolder.ChannelController.CouldShare();
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
}
class IllustratedLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  RefreshItem(t) {
    t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(t);
    if (t) {
      this.SetTextureByPath(t.Texture, this.GetTexture(0));
      this.SetTextureByPath(t.Texture, this.GetTexture(1));
    }
  }
}
class WishingItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [5, UE.UITexture]];
  }
  RefreshItem(t) {
    t = ConfigManager_1.ConfigManager.MoonSignInConfig.GetPhaseOfMoonById(t);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Talk[0]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Talk[1]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Talk[2]);
      this.SetTextureByPath(t.Texture, this.GetTexture(0));
    }
  }
}
//# sourceMappingURL=MoonSignInDetailView.js.map