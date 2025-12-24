"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsLevelInfoItem = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SPRITE_STATE_EASY = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_SurvivorLvItemBlur.SP_SurvivorLvItemBlur";
const SPRITE_STATE_NORMAL = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_SurvivorLvItemPurple.SP_SurvivorLvItemPurple";
const SPRITE_STATE_CHALLENGE = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_SurvivorLvItemRed.SP_SurvivorLvItemRed";
const SPRITE_STATE_ICON_LOCK = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_IconSurvivorLvItemLock.SP_IconSurvivorLvItemLock";
const SPRITE_STATE_ICON_NORMAL = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_IconSurvivorLvItemLv.SP_IconSurvivorLvItemLv";
const SPRITE_STATE_ICON_ENDLESS = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Level1/SP_IconSurvivorLvItemBoss.SP_IconSurvivorLvItemBoss";
const INFO_FINISHED = "SurvivorsLevelSelection_CustomsClearanceTips";
const INFO_ENDLESS_OPEN = "SurvivorsLevelSelection_EndlessTips";
const INFO_WAVE = "SurvivorsLevelSelection_ProgressTips";
const INFO_LOCK_TIME = "SurvivorsLevelSelection_UnlockTimeTips";
const INFO_KILL_COUNT = "SurvivorsLevelSelection_KillNumberTips";
class SurvivorsLevelInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LevelInfo = undefined;
    this.LevelSequencePlayer = undefined;
    this.Bbm = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetItem(7).SetUIActive(false);
  }
  Refresh(e, i, t) {
    this.LevelInfo = e;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.LevelId);
    if (r) {
      if (e.IsEndlessMode) {
        this.RGd(r);
      } else {
        this.LGd(r);
      }
      e = t < 10 ? "0" + t : t.toString();
      this.GetText(6).SetText(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r.Name);
      this.wGd(r);
    }
  }
  RGd(e) {
    var i = this.LevelInfo.Info;
    this.Bbm = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelTimeUnlockState(this.LevelInfo.LevelId);
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelUnlockState(this.LevelInfo.LevelId, true);
    var r = i.vDd > 0;
    var s = this.GetSprite(1);
    var v = this.GetItem(3);
    var _ = this.GetItem(4);
    v.SetUIActive(t && r);
    _.SetUIActive(false);
    if (t) {
      let e = "";
      v = [];
      if (r) {
        e = INFO_KILL_COUNT;
        v.push(i.vDd.toString());
      } else {
        e = INFO_ENDLESS_OPEN;
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e, ...v);
    } else {
      this.wke();
    }
    this.SetSpriteByPath(t ? SPRITE_STATE_ICON_ENDLESS : SPRITE_STATE_ICON_LOCK, s, false);
  }
  LGd(e) {
    var i = this.LevelInfo.Info;
    this.Bbm = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelTimeUnlockState(this.LevelInfo.LevelId);
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelUnlockState(this.LevelInfo.LevelId, false);
    var r = i.CM_;
    var s = this.GetSprite(1);
    var v = this.GetItem(3);
    var _ = this.GetItem(4);
    v.SetUIActive(false);
    _.SetUIActive(t && r);
    if (t) {
      let e = "";
      v = [];
      if (r) {
        e = INFO_FINISHED;
      } else {
        _ = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetMaxWaveNumByLevelId(this.LevelInfo.LevelId);
        e = INFO_WAVE;
        v.push(i.AEs.toString());
        v.push(_.toString());
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e, ...v);
    } else {
      this.wke();
    }
    this.SetSpriteByPath(t ? SPRITE_STATE_ICON_NORMAL : SPRITE_STATE_ICON_LOCK, s, false);
  }
  wGd(e) {
    let i = SPRITE_STATE_EASY;
    switch (e.Diff) {
      case 0:
        i = SPRITE_STATE_EASY;
        break;
      case 1:
        i = SPRITE_STATE_NORMAL;
        break;
      case 2:
        i = SPRITE_STATE_CHALLENGE;
    }
    this.SetSpriteByPath(i, this.GetSprite(0), false);
  }
  wke(e = true) {
    var i = this.LevelInfo.LevelId;
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.GetLevelUnlockRemainTime(i);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), INFO_LOCK_TIME, i);
    } else if (e) {
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.LevelInfo.Info.XBd) ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i);
    }
  }
  SetSaveFile(e) {
    if (e.LevelId === this.LevelInfo.LevelId) {
      this.GetItem(7).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "SurvivorsExitPopup_Text", e.Batch, e.MaxBatch);
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  OnTick(e) {
    if (!!this.LevelInfo && !this.Bbm) {
      this.wke(false);
    }
  }
  PlaySequenceByName(e) {
    this.LevelSequencePlayer.PlayLevelSequenceByName(e, true);
  }
  GetKey(e, i) {
    return e.LevelId;
  }
}
exports.SurvivorsLevelInfoItem = SurvivorsLevelInfoItem;
//# sourceMappingURL=SurvivorsLevelInfoItem.js.map