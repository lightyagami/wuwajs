"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsLevelDetailView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsRogueCardDataFactory_1 = require("../../Card/SurvivorsRogueCardDataFactory");
const bgTexturePath = ["UiTexture_SurvivorsLevelDetailBg1", "UiTexture_SurvivorsLevelDetailBg2", "UiTexture_SurvivorsLevelDetailBg3"];
class SurvivorsLevelDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Sqd = -1;
    this.$Qd = false;
    this.Mqd = undefined;
    this.Eqd = undefined;
    this.SPe = undefined;
    this.Iqd = undefined;
    this.Tqd = undefined;
    this.bqd = undefined;
    this.jqd = undefined;
    this.Jhi = undefined;
    this.eli = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Hqd = () => {
      return new WeaponItemComponent();
    };
    this.Pkc = () => {
      UiManager_1.UiManager.OpenView("SurvivorsTeamEditView");
    };
    this.Lqd = e => {
      if (this.$Qd) {
        if (e === 1) {
          if (this.Pqd()) {
            this.Aqd(true);
          } else {
            const i = this.GetExtendToggle(15);
            i?.SetToggleStateForce(0, false, false, true);
            e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(376);
            e.FunctionMap.set(2, () => {
              i?.SetToggleStateForce(1);
              this.Aqd(true);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          }
        } else {
          this.Aqd(false);
        }
      } else {
        this.GetExtendToggle(15)?.SetToggleStateForce(0, false, false, true);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Survivors_EndlessDisableTips");
      }
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.w_o = e => {
      if (e === "Switch1") {
        this.Mqd?.SetUIActive(false);
      } else if (e === "Switch2") {
        this.GetItem(3)?.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIExtendToggle], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIText], [21, UE.UIItem], [22, UE.UIScrollViewWithScrollbarComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UITexture], [28, UE.UITexture], [29, UE.UIScrollViewWithScrollbarComponent], [30, UE.UIText], [31, UE.UIItem], [32, UE.UIItem]];
    this.BtnBindInfo = [[15, this.Lqd]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.bqd = new RoleItemComponent();
    e.push(this.bqd.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()));
    this.Iqd = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    e.push(this.Iqd.CreateThenShowByActorAsync(this.GetItem(19).GetOwner()));
    this.Tqd = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Tqd.CreateThenShowByActorAsync(this.GetItem(25).GetOwner()));
    this.jqd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(22), this.Hqd);
    this.Jhi = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(29), this.eli);
    await Promise.all(e);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.LevelId);
    this.Sqd = e.LevelId;
    this.Hnd();
    this.Dqd(i.Name);
    this.xqd(i.Diff);
    this._Zd(i.InitRoles, i.InitWeapons);
    this.Iqd?.FunctionButton?.SetFunction(this.Pkc);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.w_o);
    this.vem();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  xqd(r) {
    [[0, 5], [1, 7], [2, 9]].forEach((e, i) => {
      var t = this.GetItem(e[0]);
      var e = this.GetItem(e[1]);
      if (i === r) {
        this.Mqd = t;
        this.Eqd = e;
      }
      t?.SetUIActive(i === r);
      e?.SetUIActive(i === r);
    });
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(bgTexturePath[r]);
    this.SetTextureShowUntilLoaded(e, this.GetTexture(28));
  }
  Hnd() {
    this.Tqd?.SetCloseCallBack(this.I5t);
    this.Tqd?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    });
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.LocalConfig;
    if (e) {
      this.Tqd?.SetTitleLocalText(e.Title);
    }
  }
  Aqd(e) {
    var i;
    var t;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(this.Sqd);
    if (r) {
      ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.SaveCacheState(3, this.Sqd, 0, e ? 1 : 0);
      t = ((i = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo).IsEndless = e) ? 1 : 0;
      this.Bqd(r.InstDesc.get(t));
      this.kqd(r.TargetDesc.get(t), i.LevelId, e);
      this.Oqd(e);
      this.qqd(e);
      this.Gqd(e);
      this.RefreshRewardByDropPackage(r.RewardId[t], ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetCurrentLevelInfoByLevelId(i.LevelId).Info.CM_);
    }
  }
  Gqd(e) {
    (e ? this.GetItem(3) : this.Mqd)?.SetUIActive(true);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName(e ? "Switch1" : "Switch2");
  }
  Dqd(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  WQd(e) {
    this.$Qd = e;
    this.GetTexture(27)?.SetUIActive(!e);
    this.GetItem(32)?.SetUIActive(e);
  }
  _Zd(e, i) {
    e = this.Jat(e);
    this.jqd?.RefreshByData(i);
    e = e || i.length > 0;
    this.GetItem(31)?.SetUIActive(e);
  }
  Jat(e) {
    for (const i of e) {
      if (ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.IsRoleIdCanShow(i)) {
        this.bqd?.SetUiActive(true);
        this.bqd?.Refresh(i);
        return true;
      }
    }
    this.bqd?.SetUiActive(false);
    return false;
  }
  RefreshRewardByDropPackage(e, i) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e);
    this.Jhi.RefreshByData(e, () => {
      this.Jhi?.GetScrollItemList().forEach(e => {
        e.SetReceivedVisible(i);
      });
    });
  }
  vem() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.LevelId);
    if (i.EndlessMode) {
      t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelUnlockState(e.LevelId, true);
      this.WQd(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueLevelDetailViewEndlessToggleRefresh, t);
    } else {
      this.GetExtendToggle(15)?.RootUIComp.SetUIActive(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueLevelDetailViewEndlessToggleRefresh, false);
    }
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.IsEndlessMode(e.LevelId);
    this.GetExtendToggle(15)?.SetToggleStateForce(t ? 1 : 0, false, false, true);
    this.Aqd(t);
    if (i.Diff >= 2 || t) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_xingcunzhe_leveldetail_open_difficult");
    } else {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_xingcunzhe_leveldetail_open_normal");
    }
  }
  Bqd(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), e);
  }
  kqd(e, i, t) {
    var r = [];
    var s = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetCurrentLevelInfoByLevelId(i);
    if (t) {
      r.push(s.Info.vDd.toString());
    } else {
      t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetMaxWaveNumByLevelId(i);
      r.push(s.Info.AEs.toString());
      r.push(t.toString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e, ...r);
  }
  Oqd(e) {
    var i = this.GetText(16);
    if (i) {
      i.SetChangeColor(e, i.changeColor);
    }
  }
  qqd(e) {
    this.Eqd?.SetUIActive(!e);
    this.GetItem(11)?.SetUIActive(e);
  }
  Pqd() {
    return ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.SaveCacheState(4, 0);
  }
}
exports.SurvivorsLevelDetailView = SurvivorsLevelDetailView;
class RoleItemComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fqd = -1;
    this.Nqd = () => {
      var e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralCharacter(this.Fqd);
      UiManager_1.UiManager.OpenView("SurvivorsCardTips", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.Nqd]];
  }
  OnStart() {}
  Refresh(e) {
    this.Fqd = e;
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e).TrialRoleId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var i = e.RoleHeadIconCircle;
    this.SetTextureShowUntilLoaded(i, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Name);
  }
}
class WeaponItemComponent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Vqd = -1;
    this.nqe = () => {
      var e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(this.Vqd);
      UiManager_1.UiManager.OpenView("SurvivorsCardTips", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UISprite]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(e, i, t) {
    this.Vqd = e;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(e);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(e.Quality);
    this.SetTextureByPath(r.Icon, this.GetTexture(2));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r.Name);
    this.GetSprite(3).SetColor(UE.Color.FromHex(e.WeaponColor));
  }
}
//# sourceMappingURL=SurvivorsLevelDetailView.js.map