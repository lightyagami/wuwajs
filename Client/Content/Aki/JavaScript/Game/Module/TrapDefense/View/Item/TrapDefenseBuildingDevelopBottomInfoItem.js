"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopBottomInfoItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const TrapDefenseBuildingDevelopBottomDragItem_1 = require("./TrapDefenseBuildingDevelopBottomDragItem");
class TrapDefenseBuildingDevelopBottomInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DragItem = undefined;
    this.SlotData = undefined;
    this.SPe = undefined;
    this.OnClickCb = undefined;
    this.CanExecuteChangeCb = undefined;
    this.Fgd = false;
    this.DragLogic = undefined;
    this.Lke = () => false;
    this.OnClickedItem = () => {
      if (this.OnClickCb) {
        this.OnClickCb(this.SlotData);
      }
    };
    this.OnItemOverlay = () => {
      this.SPe.StopPlayingSequence(false, true);
      this.SPe.PlayLevelSequenceByName("HighLight");
      this.Fgd = true;
    };
    this.OnItemUnOverlay = () => {
      this.Fgd = false;
      this.SPe.StopPlayingSequence(false, true);
      this.SPe.PlayLevelSequenceByName("Normal");
    };
    this.OnScrollToScrollViewEvent = () => {
      this.GetItem(1)?.SetUIActive(true);
      this.GetSprite(2).SetUIActive(false);
    };
    this.OnRemoveFromScrollViewEvent = () => {
      this.GetItem(1)?.SetUIActive(false);
      this.GetSprite(2).SetUIActive(true);
    };
    this.OnDragBegin = () => {
      this.GetSprite(2).SetUIActive(true);
      this.GetItem(4).SetUIActive(false);
      this.DragItem.OnStartDrag();
    };
    this.OnDragEnd = () => {
      var t = this.SlotData.GetSlotData();
      this.DragItem.OnEndDrag();
      this.GetSprite(2).SetUIActive(t === undefined);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.DragItem = new TrapDefenseBuildingDevelopBottomDragItem_1.TrapDefenseBuildingDevelopBottomDragItem();
    await this.DragItem.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetExtendToggle(0).RootUIComp);
    this.BindEvent();
  }
  OnBeforeDestroy() {
    this.UnbindEvent();
  }
  BindEvent() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke);
  }
  UnbindEvent() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(t) {
    var i = (this.SlotData = t).GetSlotData();
    this.DragItem.Refresh(i);
    this.DragItem.SetUiActive(true);
    this.GetSprite(2).SetUIActive(i === undefined);
    var t = t.GetSlotData() !== undefined && t.GetSlotData().GetLockInBattle();
    this.GetItem(4)?.SetUIActive(t);
    this.GetItem(1)?.SetUIActive(false);
    this.DragLogic?.Refresh(i);
  }
  SetSelected(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleStateForce(t);
  }
  GetDragComp() {
    return this.DragItem.GetDraggableComp();
  }
  ResetPosition() {
    this.GetItem(1)?.SetUIActive(false);
    var t = this.SlotData?.GetSlotData();
    var t = t !== undefined && t.GetLockInBattle();
    this.GetItem(4).SetUIActive(t);
    this.GetSprite(2).SetUIActive(this.SlotData.GetSlotData() === undefined);
    this.DragItem.OnEndDrag();
    if (this.Fgd) {
      this.Fgd = false;
      this.SPe.StopPlayingSequence(false, true);
      this.SPe.PlaySequencePurely("Normal");
    }
  }
  SetDragLogic(t) {
    this.DragLogic = t;
    this.DragLogic.Refresh(this.SlotData?.GetSlotData());
  }
}
exports.TrapDefenseBuildingDevelopBottomInfoItem = TrapDefenseBuildingDevelopBottomInfoItem;
//# sourceMappingURL=TrapDefenseBuildingDevelopBottomInfoItem.js.map