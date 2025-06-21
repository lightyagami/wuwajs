"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueResEndingSubView = void 0;
const UE = require("ue"),
  RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem");
class RogueResEndingSubView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.ls1 = void 0, this._s1 = 0, this.AG1 = 0, this.cs1 = [], this.fk1 = new Map, this.us1 = new Map, this.$pt = void 0, this._5e = () => {
      this.CloseMe()
    }, this.q5c = () => {
      var i = this.cs1.indexOf(this._s1);
      0 !== i && (1 === i ? this.GetButton(1)?.RootUIComp?.SetUIActive(!1) : this.GetButton(1)?.RootUIComp?.SetUIActive(!0), this.GetButton(2)?.RootUIComp?.SetUIActive(!0), this._s1 = this.cs1[i - 1], this.RefreshEnding(), this.$pt?.IsPlayingSequence("SwitchRight") && this.$pt?.StopCurrentSequence(), this.$pt?.IsPlayingSequence("SwitchLeft") ? this.$pt?.ReplaySequenceByKey("SwitchLeft") : this.$pt?.PlayLevelSequenceByName("SwitchLeft"))
    }, this.QOe = () => {
      var i = this.cs1.indexOf(this._s1);
      i !== this.cs1.length - 1 && ((i === this.cs1.length - 2 ? (this.GetButton(2)?.RootUIComp?.SetUIActive(!1), this.GetButton(1)) : (this.GetButton(1)?.RootUIComp?.SetUIActive(!0), this.GetButton(2)))?.RootUIComp?.SetUIActive(!0), this._s1 = this.cs1[i + 1], this.RefreshEnding(), this.$pt?.IsPlayingSequence("SwitchLeft") && this.$pt?.StopCurrentSequence(), this.$pt?.IsPlayingSequence("SwitchRight") ? this.$pt?.ReplaySequenceByKey("SwitchRight") : this.$pt?.PlayLevelSequenceByName("SwitchRight"))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.q5c],
      [2, this.QOe]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetHelpBtnActive(!1), this.lqe.SetCloseCallBack(this._5e), this.ls1 = new RogueEndingCollectionItem_1.RogueEndingCollectionItem, await this.ls1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())
  }
  OnStart() {
    this._s1 = this.OpenParam;
    var i = RogueResEndById_1.configRogueResEndById.GetConfig(this._s1),
      i = (this.AG1 = i.SeasonId, ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(i.SeasonId));
    for (const t of i) ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t) && this.cs1.push(t);
    this.GetText(3)?.SetUIActive(!1), this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnBeforeShow() {
    var i = this.cs1.indexOf(this._s1);
    for (let i = 0; i < this.cs1.length; i++) {
      var t = this.cs1[i];
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t) && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(t) && this.fk1.set(t, i)
    }
    0 === i && this.GetButton(1)?.RootUIComp?.SetUIActive(!1), i === this.cs1.length - 1 && this.GetButton(2)?.RootUIComp?.SetUIActive(!1), this.RefreshEnding()
  }
  OnBeforeDestroy() {
    this.lqe = void 0, this.ls1 = void 0, this.$pt = void 0, this.us1.clear()
  }
  RefreshEnding() {
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(this._s1),
      t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(this.AG1),
      t = (this.us1.get(this._s1) || (t = {
        ConfigId: this._s1,
        Index: t.indexOf(this._s1) + 1,
        IsSubView: !0,
        IsUnlock: i
      }, this.us1.set(this._s1, t)), this.ls1?.Refresh(this.us1.get(this._s1)), RogueResEndById_1.configRogueResEndById.GetConfig(this._s1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Desc), i && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(this._s1) && ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(this._s1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResEndingSwitch, this._s1), this.BNe()
  }
  BNe() {
    var i = this._s1;
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(i) && this.fk1.has(i) && this.fk1.delete(i);
    let t = !1,
      e = !1;
    var s = this.cs1.indexOf(i);
    for (const h of this.fk1) h[1] < s ? t = !0 : h[1] > s && (e = !0);
    this.GetItem(6)?.SetUIActive(t), this.GetItem(7)?.SetUIActive(e)
  }
}
exports.RogueResEndingSubView = RogueResEndingSubView;
//# sourceMappingURL=RogueEndingCollectionSubView.js.map