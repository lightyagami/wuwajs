"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerSettlementView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const BabelTowerActivityByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerActivityByActivityId");
const BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerLevelById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerLevelById");
const ShareRewardById_1 = require("../../../../../../Core/Define/ConfigQuery/ShareRewardById");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiBehaviorGachaSequence_1 = require("../../../../../Ui/Base/UiBehaviorGachaSequence");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScreenShotManager_1 = require("../../../../ScreenShot/ScreenShotManager");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const BabelTowerController_1 = require("../BabelTowerController");
const BabelTowerDefine_1 = require("../BabelTowerDefine");
const BabelTowerSettlementDeTermLayoutItem_1 = require("./BabelTowerSettlementDeTermLayoutItem");
const BabelTowerSettlementRoleItem_1 = require("./BabelTowerSettlementRoleItem");
class BabelTowerSettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Roc = undefined;
    this.tFe = undefined;
    this.FQc = undefined;
    this.Qma = undefined;
    this.Hha = undefined;
    this.M_c = false;
    this.gCc = undefined;
    this.CCc = undefined;
    this.avc = 0;
    this.Sai = 0;
    this.PRc = () => {
      var e = new BabelTowerSettlementDeTermLayoutItem_1.BabelTowerSettlementDeTermLayoutItem();
      e.TemplateActor = this.GetItem(12).GetOwner();
      return e;
    };
    this.uyi = () => new BabelTowerSettlementRoleItem_1.BabelTowerSettlementRoleItem();
    this.T_c = () => {
      this.b_c();
    };
    this.xco = () => {
      this.CloseMe(() => {
        UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView", {
          IfReturnToBabelTowerMainView: true,
          IfLeaveInstanceDungeonWhenMainViewClose: true
        });
      });
    };
    this.HQ1 = () => {
      var e = {
        IsDeTerm: false,
        ConfigId: this.Pe?.BuffIdList?.[0] ?? 0,
        ShowWays: false
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e);
    };
    this.$Q1 = () => {
      var e = {
        IsDeTerm: false,
        ConfigId: this.Pe?.BuffIdList?.[1] ?? 0,
        ShowWays: false
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e);
    };
    this.tv1 = () => {
      this.iv1();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIArtText], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UIVerticalLayout], [10, UE.UIHorizontalLayout], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIVerticalLayout], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIButtonComponent]];
    this.BtnBindInfo = [[14, this.T_c], [17, this.xco], [19, this.HQ1], [20, this.$Q1]];
  }
  OnBeforeCreate() {
    this.FQc = new UiBehaviorGachaSequence_1.UiBehaviorGachaSequence();
    this.AddUiBehavior(this.FQc);
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    this.Roc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.PRc);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(16), this.uyi);
    this.Pe = this.OpenParam;
    if (this.Pe) {
      e = this.GetHorizontalLayout(10);
      i = this.GetHorizontalLayout(11);
      this.gCc = e.GetPadding();
      this.CCc = i.GetPadding();
      e.RootUIComp.SetUIActive(false);
      i.RootUIComp.SetUIActive(false);
      this.GetItem(12).SetUIActive(false);
      this.avc = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(this.Pe.TeamRoleIdList[0]);
      await this.FQc.PreLoadLevelSequence(this.avc);
      await this.RefreshAsync();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 43, "Data为空");
    }
  }
  OnHandleLoadScene() {
    this.Qma = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0);
    this.FQc.BindSceneSequenceCamera(this.Qma);
    this.Hha = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
    this.Hha.SetTickableWhenPaused(true);
    this.FQc.BindUpdateInteractBp(this.Hha);
  }
  OnBeforeShow() {
    this.TryPlayRoleSequence();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFirstShare, this.tv1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFirstShare, this.tv1);
  }
  b_c() {
    var e = new UiAsyncTask_1.UiAsyncTask("OpenShareView", async () => {
      await this.L_c();
    });
    this.RunAsyncTask(e);
  }
  async c2a() {
    return new Promise(e => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        e();
      });
    });
  }
  async L_c() {
    this.SetShareState(false);
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
        ExternalTexture: await ScreenShotManager_1.ScreenShotManager.TakeFullScreenShotToTextureAsync(),
        DateText: TimeUtil_1.TimeUtil.DateFormat2(new Date(this.Pe.PassDate)),
        ShareId: this.Sai,
        LogoConfigName: "BabelTowerLogo"
      };
      await UiManager_1.UiManager.OpenViewAsync("PhotoSaveView", e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 43, "打开分享界面异常", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 43, "打开分享界面异常", ["error", e]);
      }
    } finally {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, true);
      this.SetShareState(true);
    }
  }
  async RefreshAsync() {
    var e;
    var i = this.Pe;
    var t = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(i.LevelId);
    var r = t.ActivityId;
    var a = i.StarNum;
    this.GetArtText(0).SetText(a.toString());
    var a = ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(r, a);
    var o = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(o, a.DifficultyTextKey);
    var o = UE.Color.FromHex(a.TextBgColor);
    this.GetSprite(1).SetColor(o);
    var a = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), a.LocalConfig.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.NameText);
    this.GetArtText(5).SetText(TimeUtil_1.TimeUtil.GetTimeString(i.PassTime));
    var o = ControllerHolder_1.ControllerHolder.ChannelController.CouldShare();
    this.GetItem(13).SetUIActive(o);
    if (o) {
      a = BabelTowerActivityByActivityId_1.configBabelTowerActivityByActivityId.GetConfig(r).ShareId;
      this.Sai = a;
      this.iv1();
    }
    var t = i.BuffIdList;
    var o = t?.length ?? 0;
    this.GetItem(6).SetUIActive(o === 0);
    var r = this.GetTexture(7);
    var a = this.GetTexture(8);
    r.SetUIActive(o >= 1);
    a.SetUIActive(o >= 2);
    if (o >= 1) {
      e = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(t[0]);
      this.SetTextureByPath(e.Texture, r);
    }
    if (o >= 2) {
      e = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(t[1]);
      this.SetTextureByPath(e.Texture, a);
    }
    var s = i.DeTermIdList;
    var n = s?.length ?? 0;
    if (s && n !== 0) {
      this.GetVerticalLayout(9).RootUIComp.SetUIActive(true);
      let e = Math.floor(n / BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT);
      if (n % BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT > 0) {
        e++;
      }
      var h = new Array(e);
      for (let i = 0; i < h.length; i++) {
        var l = [];
        for (let e = 0; e < BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT; e++) {
          var _ = i * BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT + e;
          if (n <= _) {
            break;
          }
          l.push(s[_]);
        }
        h[i] = l;
      }
      await this.Roc.RefreshByDataAsync(h);
      var w = this.Roc.GetLayoutItemList();
      for (let e = 0; e < w.length; e++) {
        var B = e % 2 == 0 ? this.gCc : this.CCc;
        w[e].SetLayoutPadding(B);
      }
    } else {
      this.GetVerticalLayout(9).RootUIComp.SetUIActive(false);
    }
    await this.tFe.RefreshByDataAsync(i.TeamRoleIdList);
  }
  iv1() {
    var e;
    var i;
    if (!(this.Sai <= 0)) {
      e = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(this.Sai);
      this.GetItem(18).SetUIActive(e);
      if (e) {
        i = (e = [...ShareRewardById_1.configShareRewardById.GetConfig(this.Sai).Reward][0])[0];
        e = e[1];
        i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i).IconSmall;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "BabelTowerResultShare_Text", i, e);
      }
    }
  }
  SetShareState(e) {
    this.GetButton(17)?.RootUIComp.SetUIActive(e);
    this.GetItem(13)?.SetUIActive(e);
  }
  TryPlayRoleSequence() {
    if (!this.M_c) {
      this.M_c = true;
      this.FQc.PlayRoleSequence(this.avc);
    }
  }
}
exports.BabelTowerSettlementView = BabelTowerSettlementView;
//# sourceMappingURL=BabelTowerSettlementView.js.map