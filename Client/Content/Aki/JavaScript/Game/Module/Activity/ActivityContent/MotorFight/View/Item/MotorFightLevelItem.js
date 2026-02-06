"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightLevelItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const MotorFightLevelDetailView_1 = require("../MotorFightLevelDetailView");
const MOTOR_FIGHT_LOCK_LEVEL_TEXTURE_PATH = "/Game/Aki/UI/UIResources/UiActivity/Image/Activity31/MotorcycleBattle/Level/T_MotorcycleLevelLock.T_MotorcycleLevelLock";
class MotorFightLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.m_i = undefined;
    this.TDe = undefined;
    this.SPe = undefined;
    this.Fr = () => {
      if (!this.m_i.IsUnLock) {
        if (this.m_i.IsReachUnlockTime()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("MotorFightGame_LevelCondition_01");
          return;
        } else {
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorFightGame_LevelCondition_02");
          e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.m_i.UnlockTime, e);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
          return;
        }
      }
      var e = ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.GetMotorFightActivityData();
      if (e.HasLastSavedLevelData()) {
        UiManager_1.UiManager.OpenView("MotorFightArchiveTip", this.m_i.Id);
      } else {
        e = new MotorFightLevelDetailView_1.MotorFightLevelDetailViewModel(e, this.m_i);
        UiManager_1.UiManager.OpenView("MotorFightLevelDetailView", e);
        if (this.m_i.HasLevelRedDot) {
          this.m_i.ReadLevelRedDot();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.m_i.ActivityId);
        }
        this.GetItem(10)?.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UIArtText], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UITexture], [14, UE.UITexture], [13, UE.UITexture], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e) {
    var i = (this.m_i = e).IsUnLock ? e.Type : 3;
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightLevelType(i);
    this.SetTextureByPath(i.Hold, this.GetTexture(1));
    this.SetTextureByPath(i.Mask, this.GetTexture(2));
    this.SetTextureByPath(i.Light, this.GetTexture(3));
    this.SetTextureByPath(i.Bg, this.GetTexture(4));
    this.SetTextureByPath(i.Title, this.GetTexture(6));
    var i = e.IsUnLock ? e.LevelTexture : MOTOR_FIGHT_LOCK_LEVEL_TEXTURE_PATH;
    this.SetTextureByPath(i, this.GetTexture(5));
    var i = e.Type === 2;
    this.GetArtText(7)?.SetUIActive(!i);
    this.GetArtText(7)?.SetText(e.Number);
    this.GetSprite(8)?.SetUIActive(i);
    this.GetItem(9)?.SetUIActive(!e.IsUnLock);
    this.GetItem(10)?.SetUIActive(e.HasLevelRedDot);
    this.GetItem(11)?.SetUIActive(!i && e.IsFinished);
    this.GetTexture(12)?.SetUIActive(false);
    this.GetTexture(14)?.SetUIActive(false);
    this.GetTexture(13)?.SetUIActive(false);
    this.GetItem(16)?.SetUIActive(i && e.IsUnLock);
    this.lwr();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "MotorFightGame_LevelBestScore", e.BestScore);
    this.$qg();
    if (e.PreMotorFightLevelData) {
      i = e.Row - e.PreMotorFightLevelData.Row;
      e = this.vah(i);
      this.GetTexture(e)?.SetUIActive(true);
    }
    if (this.m_i && !this.m_i.IsUnLock) {
      this.kot();
    } else {
      this.xHe();
    }
  }
  $qg() {
    var e;
    if (!this.m_i.IsUnLock) {
      if (this.m_i.IsReachUnlockTime()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "MotorFightGame_LevelCondition_01");
      } else {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MotorFightGame_LevelCondition_02");
        e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.m_i.UnlockTime, e);
        this.GetText(15)?.SetText(e);
      }
    }
  }
  vah(e) {
    if (e === 0) {
      return 12;
    } else if (e === -1) {
      return 13;
    } else {
      return 14;
    }
  }
  lwr() {
    var e;
    if (this.m_i.HasLevelRedDot || this.m_i.IsFinished) {
      e = this.m_i.HasLevelRedDot ? "NewLevel" : "Complete";
      this.SPe?.PlayLevelSequenceByName(e);
    }
  }
  hmd() {
    if (this.m_i && this.m_i.IsUnLock) {
      this.Refresh(this.m_i);
    }
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.$qg();
      this.hmd();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
  GetNavigationItem() {
    return this.GetItem(18);
  }
}
exports.MotorFightLevelItem = MotorFightLevelItem;
//# sourceMappingURL=MotorFightLevelItem.js.map