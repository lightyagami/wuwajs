"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerSettlementView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  BabelTowerActivityByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerActivityByActivityId"),
  BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerLevelById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerLevelById"),
  ShareRewardById_1 = require("../../../../../../Core/Define/ConfigQuery/ShareRewardById"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  PersonalDefine_1 = require("../../../../Personal/Model/PersonalDefine"),
  PersonalUtil_1 = require("../../../../Personal/Model/PersonalUtil"),
  ScreenShotManager_1 = require("../../../../ScreenShot/ScreenShotManager"),
  UiModelResourcesManager_1 = require("../../../../UiComponent/UiModelResourcesManager"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  BabelTowerController_1 = require("../BabelTowerController"),
  BabelTowerDefine_1 = require("../BabelTowerDefine"),
  BabelTowerSettlementDeTermLayoutItem_1 = require("./BabelTowerSettlementDeTermLayoutItem"),
  BabelTowerSettlementRoleItem_1 = require("./BabelTowerSettlementRoleItem");
class BabelTowerSettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.Roc = void 0, this.tFe = void 0, this.cVi = new Map, this.Vha = new Map, this.Qma = void 0, this.Hha = void 0, this.M_c = !1, this.E_c = void 0, this.C4_ = !1, this.gCc = void 0, this.CCc = void 0, this.avc = 0, this.Sai = 0, this.PRc = () => {
      var e = new BabelTowerSettlementDeTermLayoutItem_1.BabelTowerSettlementDeTermLayoutItem;
      return e.TemplateActor = this.GetItem(12).GetOwner(), e
    }, this.uyi = () => new BabelTowerSettlementRoleItem_1.BabelTowerSettlementRoleItem, this.T_c = () => {
      this.b_c()
    }, this.xco = () => {
      this.CloseMe(() => {
        UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView", {
          IfReturnToBabelTowerMainView: !0,
          IfLeaveInstanceDungeonWhenMainViewClose: !0
        })
      })
    }, this.rQ1 = () => {
      var e = {
        IsDeTerm: !1,
        ConfigId: this.Pe?.BuffIdList?.[0] ?? 0,
        ShowWays: !1
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e)
    }, this.oQ1 = () => {
      var e = {
        IsDeTerm: !1,
        ConfigId: this.Pe?.BuffIdList?.[1] ?? 0,
        ShowWays: !1
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e)
    }, this.xp1 = () => {
      this.Up1()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIArtText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UITexture],
      [9, UE.UIVerticalLayout],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIHorizontalLayout],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
      [16, UE.UIVerticalLayout],
      [17, UE.UIButtonComponent],
      [18, UE.UIItem],
      [19, UE.UIButtonComponent],
      [20, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [14, this.T_c],
      [17, this.xco],
      [19, this.rQ1],
      [20, this.oQ1]
    ]
  }
  async OnBeforeStartAsync() {
    var e, i;
    this.C4_ = 0 === UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.SkyBlending.AllowSettingLerpPerFrame"), this.C4_ && UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 1"), this.Roc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.PRc), this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(16), this.uyi), this.Pe = this.OpenParam, this.Pe ? (e = this.GetHorizontalLayout(10), i = this.GetHorizontalLayout(11), this.gCc = e.GetPadding(), this.CCc = i.GetPadding(), e.RootUIComp.SetUIActive(!1), i.RootUIComp.SetUIActive(!1), this.GetItem(12).SetUIActive(!1), this.avc = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(this.Pe.TeamRoleIdList[0]), await PersonalUtil_1.PersonalUtil.PreloadRoleSequence(this.avc, this.cVi, this.Vha), await this.RefreshAsync()) : Log_1.Log.CheckError() && Log_1.Log.Error("UiCommon", 43, "Data为空")
  }
  OnHandleLoadScene() {
    this.Qma = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0), this.Hha = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0), this.Hha.SetTickableWhenPaused(!0)
  }
  OnBeforeShow() {
    this.TryPlayRoleSequence()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFirstShare, this.xp1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFirstShare, this.xp1)
  }
  b_c() {
    var e = new UiAsyncTask_1.UiAsyncTask("OpenShareView", async () => {
      await this.L_c()
    });
    this.RunAsyncTask(e)
  }
  async c2a() {
    return new Promise(e => {
      TimerSystem_1.TimerSystem.Next(() => {
        e()
      })
    })
  }
  async L_c() {
    this.SetShareState(!1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, !1);
    try {
      await this.c2a();
      var e = {
        ScreenShot: !1,
        IsHiddenBattleView: !1,
        HandBookPhotoData: void 0,
        BabelTowerSettlementViewData: void 0,
        PrepareFullScreenShot: !0,
        GachaData: void 0,
        FragmentMemory: void 0,
        RoleSkinData: void 0,
        ExternalTexture: await ScreenShotManager_1.ScreenShotManager.TakeFullScreenShotToTextureAsync(),
        DateText: TimeUtil_1.TimeUtil.DateFormat2(new Date(this.Pe.PassDate)),
        ShareId: this.Sai,
        LogoConfigName: "BabelTowerLogo"
      };
      await UiManager_1.UiManager.OpenViewAsync("PhotoSaveView", e)
    } catch (e) {
      e instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("UiCore", 43, "打开分享界面异常", e, ["error", e.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 43, "打开分享界面异常", ["error", e])
    } finally {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, !0), this.SetShareState(!0)
    }
  }
  async RefreshAsync() {
    var e, i = this.Pe,
      t = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(i.LevelId),
      r = t.ActivityId,
      a = i.StarNum,
      a = (this.GetArtText(0).SetText(a.toString()), ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(r, a)),
      o = this.GetText(2),
      o = (LguiUtil_1.LguiUtil.SetLocalTextNew(o, a.DifficultyTextKey), UE.Color.FromHex(a.TextBgColor)),
      a = (this.GetSprite(1).SetColor(o), BabelTowerController_1.BabelTowerController.GetBabelTowerData()),
      o = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), a.LocalConfig.Name), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.NameText), this.GetArtText(5).SetText(TimeUtil_1.TimeUtil.GetTimeString(i.PassTime)), ControllerHolder_1.ControllerHolder.ChannelController.CouldShare()),
      t = (this.GetItem(13).SetUIActive(o), o && (a = BabelTowerActivityByActivityId_1.configBabelTowerActivityByActivityId.GetConfig(r).ShareId, this.Sai = a, this.Up1()), i.BuffIdList),
      o = t?.length ?? 0,
      r = (this.GetItem(6).SetUIActive(0 === o), this.GetTexture(7)),
      a = this.GetTexture(8),
      s = (r.SetUIActive(1 <= o), a.SetUIActive(2 <= o), 1 <= o && (e = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(t[0]), this.SetTextureByPath(e.Texture, r)), 2 <= o && (e = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(t[1]), this.SetTextureByPath(e.Texture, a)), i.DeTermIdList),
      n = s?.length ?? 0;
    if (s && 0 !== n) {
      this.GetVerticalLayout(9).RootUIComp.SetUIActive(!0);
      let e = Math.floor(n / BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT);
      0 < n % BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT && e++;
      var h = new Array(e);
      for (let i = 0; i < h.length; i++) {
        var l = [];
        for (let e = 0; e < BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT; e++) {
          var _ = i * BabelTowerDefine_1.BABEL_TOWER_SETTLEMENT_DETERM_LINE_COUNT + e;
          if (n <= _) break;
          l.push(s[_])
        }
        h[i] = l
      }
      await this.Roc.RefreshByDataAsync(h);
      var w = this.Roc.GetLayoutItemList();
      for (let e = 0; e < w.length; e++) {
        var U = e % 2 == 0 ? this.gCc : this.CCc;
        w[e].SetLayoutPadding(U)
      }
    } else this.GetVerticalLayout(9).RootUIComp.SetUIActive(!1);
    await this.tFe.RefreshByDataAsync(i.TeamRoleIdList)
  }
  Up1() {
    var e, i;
    this.Sai <= 0 || (e = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(this.Sai), this.GetItem(18).SetUIActive(e), e && (i = (e = [...ShareRewardById_1.configShareRewardById.GetConfig(this.Sai).ShareReward][0])[0], e = e[1], i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i).IconSmall, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "BabelTowerResultShare_Text", i, e)))
  }
  SetShareState(e) {
    this.GetButton(17)?.RootUIComp.SetUIActive(e), this.GetItem(13)?.SetUIActive(e)
  }
  TryPlayRoleSequence() {
    this.M_c || (this.M_c = !0, this.E_c = {
      RoleConfigId: this.avc,
      SequenceActor: this.cVi.get(this.avc),
      SceneSequenceCamera: this.Qma,
      UpdateInteractBp: this.Hha
    }, PersonalUtil_1.PersonalUtil.PlayRoleGachaSequence(this.E_c))
  }
  OnBeforeDestroy() {
    var e = this.E_c?.SequenceActor.SequencePlayer;
    e && (e.Pause(), e.GoToEndAndStop(0), AudioSystem_1.AudioSystem.PostEvent(PersonalDefine_1.STOP_AUDIO_EVENT_NAME)), this.Hha?.EndGachaScene();
    for (const i of this.cVi.values()) UE.KuroActorManager.DestroyActor(i);
    this.cVi.clear();
    for (const t of this.Vha.values()) UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(t);
    this.Vha.clear(), UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode(), this.C4_ && UE.KuroSequencePerformanceManager.SimpleExecuteCommand("r.SkyBlending.AllowSettingLerpPerFrame 0")
  }
}
exports.BabelTowerSettlementView = BabelTowerSettlementView;
//# sourceMappingURL=BabelTowerSettlementView.js.map