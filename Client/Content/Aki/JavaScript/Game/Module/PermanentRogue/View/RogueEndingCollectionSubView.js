"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResEndingSubView = undefined;
const UE = require("ue");
const RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem");
class RogueResEndingSubView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Ps1 = undefined;
    this.xs1 = 0;
    this.aF1 = 0;
    this.Ds1 = [];
    this.Wk1 = new Map();
    this.Us1 = new Map();
    this.$pt = undefined;
    this._5e = () => {
      this.CloseMe();
    };
    this.q5c = () => {
      var i = this.Ds1.indexOf(this.xs1);
      if (i !== 0) {
        if (i === 1) {
          this.GetButton(1)?.RootUIComp?.SetUIActive(false);
        } else {
          this.GetButton(1)?.RootUIComp?.SetUIActive(true);
        }
        this.GetButton(2)?.RootUIComp?.SetUIActive(true);
        this.xs1 = this.Ds1[i - 1];
        this.RefreshEnding();
        if (this.$pt?.IsPlayingSequence("SwitchRight")) {
          this.$pt?.StopCurrentSequence();
        }
        if (this.$pt?.IsPlayingSequence("SwitchLeft")) {
          this.$pt?.ReplaySequenceByKey("SwitchLeft");
        } else {
          this.$pt?.PlayLevelSequenceByName("SwitchLeft");
        }
      }
    };
    this.QOe = () => {
      var i = this.Ds1.indexOf(this.xs1);
      if (i !== this.Ds1.length - 1) {
        (i === this.Ds1.length - 2 ? (this.GetButton(2)?.RootUIComp?.SetUIActive(false), this.GetButton(1)) : (this.GetButton(1)?.RootUIComp?.SetUIActive(true), this.GetButton(2)))?.RootUIComp?.SetUIActive(true);
        this.xs1 = this.Ds1[i + 1];
        this.RefreshEnding();
        if (this.$pt?.IsPlayingSequence("SwitchLeft")) {
          this.$pt?.StopCurrentSequence();
        }
        if (this.$pt?.IsPlayingSequence("SwitchRight")) {
          this.$pt?.ReplaySequenceByKey("SwitchRight");
        } else {
          this.$pt?.PlayLevelSequenceByName("SwitchRight");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.q5c], [2, this.QOe]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this._5e);
    this.Ps1 = new RogueEndingCollectionItem_1.RogueEndingCollectionItem();
    await this.Ps1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.xs1 = this.OpenParam;
    var i = RogueResEndById_1.configRogueResEndById.GetConfig(this.xs1);
    this.aF1 = i.SeasonId;
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(i.SeasonId);
    for (const t of i) {
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t)) {
        this.Ds1.push(t);
      }
    }
    this.GetText(3)?.SetUIActive(false);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    var i = this.Ds1.indexOf(this.xs1);
    for (let i = 0; i < this.Ds1.length; i++) {
      var t = this.Ds1[i];
      if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t) && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(t)) {
        this.Wk1.set(t, i);
      }
    }
    if (i === 0) {
      this.GetButton(1)?.RootUIComp?.SetUIActive(false);
    }
    if (i === this.Ds1.length - 1) {
      this.GetButton(2)?.RootUIComp?.SetUIActive(false);
    }
    this.RefreshEnding();
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.Ps1 = undefined;
    this.$pt = undefined;
    this.Us1.clear();
  }
  RefreshEnding() {
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(this.xs1);
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(this.aF1);
    if (!this.Us1.get(this.xs1)) {
      t = {
        ConfigId: this.xs1,
        Index: t.indexOf(this.xs1) + 1,
        IsSubView: true,
        IsUnlock: i
      };
      this.Us1.set(this.xs1, t);
    }
    this.Ps1?.Refresh(this.Us1.get(this.xs1));
    var t = RogueResEndById_1.configRogueResEndById.GetConfig(this.xs1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Desc);
    if (i && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(this.xs1)) {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(this.xs1);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResEndingSwitch, this.xs1);
    this.BNe();
  }
  BNe() {
    var i = this.xs1;
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(i) && this.Wk1.has(i)) {
      this.Wk1.delete(i);
    }
    let t = false;
    let e = false;
    var s = this.Ds1.indexOf(i);
    for (const h of this.Wk1) {
      if (h[1] < s) {
        t = true;
      } else if (h[1] > s) {
        e = true;
      }
    }
    this.GetItem(6)?.SetUIActive(t);
    this.GetItem(7)?.SetUIActive(e);
  }
}
exports.RogueResEndingSubView = RogueResEndingSubView;
//# sourceMappingURL=RogueEndingCollectionSubView.js.map