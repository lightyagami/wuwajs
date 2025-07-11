"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashCollectDetailItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashCollectStageItem_1 = require("./CalabashCollectStageItem");
class CalabashCollectDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.spt = 0;
    this.Pe = undefined;
    this.apt = undefined;
    this.hpt = [];
    this.lpt = undefined;
    this._pt = undefined;
    this.upt = undefined;
    this.cpt = 0;
    this.OnLookOverBtnClick = undefined;
    this.OnMonsterSkinBtnClickCallBack = undefined;
    this.mpt = () => {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView("MonsterDetectView", ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.spt)?.MonsterProbeId);
    };
    this.dpt = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(163);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.Cpt = () => {
      var e;
      var t;
      if (this.upt && (this.cpt++, this.cpt >= this.upt.length && (this.cpt = 0), this.OnMonsterSkinBtnClickCallBack)) {
        e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.upt[this.cpt]).MonsterId;
        t = this.cpt === 0 ? !this.Pe.UnlockData : this.cpt > 0 && !ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(this.upt[this.cpt]);
        this.OnMonsterSkinBtnClickCallBack(e, t);
        this.GetButton(11).RootUIComp.SetUIActive(!t);
      }
    };
    this.gpt = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView, e);
    };
    this.fpt = () => {
      var e = new VisionFetterSuitItem_1.VisionFetterSuitItem();
      e.OnItemClick = this.gpt;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIHorizontalLayout], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.mpt], [7, this.dpt], [11, this.OnLookOverBtnClick], [15, this.Cpt]];
  }
  async OnBeforeStartAsync() {
    this._pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(12));
    this._pt.BindSequenceCloseEvent(e => {
      if (e === "Start") {
        this.GetItem(14)?.SetUIActive(false);
        this.GetItem(13)?.SetUIActive(false);
      }
    });
    var t = [];
    for (let e = 3; e <= 6; e++) {
      var i = new CalabashCollectStageItem_1.CalabashCollectStageItem();
      this.hpt.push(i);
      t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t);
    this.lpt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.fpt);
  }
  Update(e) {
    this.Pe = e;
    this.spt = this.Pe?.DevelopRewardData.MonsterId ?? 0;
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(this.spt);
    this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0]);
    this.Refresh();
  }
  UpdateSkinInfo(e) {
    this.spt = e;
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(this.spt);
    this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e[0]);
    if (this.cpt) {
      this.RefreshTitleBySkinId();
    } else {
      this.RefreshTitle();
    }
  }
  Refresh() {
    this.RefreshTitle();
    this.RefreshStage();
    this.RefreshSuit();
    this.RefreshDesc();
    this.RefreshInfoItem();
    this.RefreshSkinBtn();
  }
  RefreshTitle() {
    var e;
    var t;
    var i = this.Pe;
    if (i.UnlockData) {
      e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.spt).MonsterNumber;
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(this.spt)[0].Rarity).Desc;
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.SkillName);
      this.GetText(0)?.SetText(e + i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
    }
  }
  RefreshTitleBySkinId() {
    var e;
    var t;
    if (this.Pe.UnlockData) {
      e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.spt).MonsterNumber;
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.apt.MonsterName);
      this.GetText(0)?.SetText(e + t);
    }
  }
  RefreshStage() {
    var i = ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardInfoData(this.spt);
    if (i && i.length === this.hpt.length) {
      var e = i.length;
      let t = -1;
      for (let e = 0; e < this.hpt.length; e++) {
        var s = i[e];
        this.hpt[e].Refresh(s, false, e);
        if (s.IsUnlock) {
          t = e;
        }
      }
      this.GetTexture(2)?.SetFillAmount(t / (e - 1));
    }
  }
  RefreshSuit() {
    var e = [];
    for (const t of this.apt.FetterGroup) {
      e.push(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t));
    }
    this.lpt?.RefreshByData(e);
  }
  RefreshDesc() {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(this.apt.SkillId);
    if (StringUtils_1.StringUtils.IsEmpty(e.SimplyDescription)) {
      this.GetText(9).SetText("");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.SimplyDescription);
    }
  }
  RefreshInfoItem() {
    this.GetItem(12).SetUIActive(this.Pe.UnlockData);
    this.GetButton(11).RootUIComp.SetUIActive(this.Pe.UnlockData);
  }
  RefreshSkinBtn() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(this.Pe.DevelopRewardData.MonsterId);
    if (e) {
      this.GetButton(15).RootUIComp.SetUIActive(this.Pe.UnlockData && e.length > 1);
      this.upt = e;
      this.cpt = 0;
    } else {
      this.GetButton(15).RootUIComp.SetUIActive(false);
    }
  }
  RefreshDetailState() {
    var e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState();
    this.GetItem(14)?.SetUIActive(!e);
    this.GetItem(13)?.SetUIActive(!e);
  }
  PlayDetailShowSequence() {
    this._pt?.PlayLevelSequenceByName("Start", true);
  }
  PlayDetailHideSequence() {
    this.GetItem(14)?.SetUIActive(true);
    this.GetItem(13)?.SetUIActive(true);
    this._pt?.PlayLevelSequenceByName("Close", true);
  }
}
exports.CalabashCollectDetailItem = CalabashCollectDetailItem;
//# sourceMappingURL=CalabashCollectDetailItem.js.map