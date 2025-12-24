"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotKeyItemFactory = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const AutoPilotRideShareBtnComponent_1 = require("../UIComponent/AutoPilot/AutoPilotRideShareBtnComponent");
const BackComponent_1 = require("../UIComponent/BackComponent");
const BagTagNavigationNextComponent_1 = require("../UIComponent/BagTagNavigationNextComponent");
const BattleViewCameraComponent_1 = require("../UIComponent/BattleViewCameraComponent");
const ClickBtnComponent_1 = require("../UIComponent/ClickBtnComponent");
const ClickBtnInScrollComponent_1 = require("../UIComponent/ClickBtnInScrollComponent");
const ClickBtnInsideComponent_1 = require("../UIComponent/ClickBtnInsideComponent");
const ClickBtnInsideReleaseComponent_1 = require("../UIComponent/ClickBtnInsideReleaseComponent");
const ClickBtnReleaseComponent_1 = require("../UIComponent/ClickBtnReleaseComponent");
const CloseBtnComponent_1 = require("../UIComponent/CloseBtnComponent");
const CommonConsumeNavigationNext_1 = require("../UIComponent/CommonConsumeNavigationNext");
const CommonFilterResetComponent_1 = require("../UIComponent/CommonFilterResetComponent");
const DraggableComponent_1 = require("../UIComponent/DraggableComponent");
const DraggableInsideComponent_1 = require("../UIComponent/DraggableInsideComponent");
const FollowItemComponent_1 = require("../UIComponent/FollowItemComponent");
const GamepadInteractComponent_1 = require("../UIComponent/GamepadInteractComponent");
const HonamiStoryCancelComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryCancelComponent");
const HonamiStoryCancelShowOnlyComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryCancelShowOnlyComponent");
const HonamiStoryCollectComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryCollectComponent");
const HonamiStoryDiscardComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryDiscardComponent");
const HonamiStoryLockComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryLockComponent");
const HonamiStoryMoveLeftComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryMoveLeftComponent");
const HonamiStoryMoveRightComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryMoveRightComponent");
const HonamiStoryPickUpDownComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryPickUpDownComponent");
const HonamiStoryQuickEquipOffComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryQuickEquipOffComponent");
const HonamiStoryQuickEquipOnComponent_1 = require("../UIComponent/HonamiStory/HonamiStoryQuickEquipOnComponent");
const HonamiStorySellComponent_1 = require("../UIComponent/HonamiStory/HonamiStorySellComponent");
const HonamiStroyLookComponent_1 = require("../UIComponent/HonamiStory/HonamiStroyLookComponent");
const InstanceDungeonWorldClickComponent_1 = require("../UIComponent/InstanceDungeonWorldClickComponent");
const InteractComponent_1 = require("../UIComponent/InteractComponent");
const InteractReleaseComponent_1 = require("../UIComponent/InteractReleaseComponent");
const InteractWheelComponent_1 = require("../UIComponent/InteractWheelComponent");
const KujiLongTimeToTriggerComponent_1 = require("../UIComponent/KujiLongTimeToTriggerComponent");
const LongPressComponent_1 = require("../UIComponent/LongPressComponent");
const LongPressInsideComponent_1 = require("../UIComponent/LongPressInsideComponent");
const LongTimeToTriggerComponent_1 = require("../UIComponent/LongTimeToTriggerComponent");
const MapDragComponent_1 = require("../UIComponent/MapDragComponent");
const MapInteractComponent_1 = require("../UIComponent/MapInteractComponent");
const MapRogueQuicklyMoveComponent_1 = require("../UIComponent/MapRogueQuicklyMoveComponent");
const MapTravelTaskNavigationNextComponent_1 = require("../UIComponent/MapTravelTaskNavigationNextComponent");
const MarkBookComponent_1 = require("../UIComponent/MarkBookComponent");
const MaskComponent_1 = require("../UIComponent/MaskComponent");
const MotorMusicSortCancelComponent_1 = require("../UIComponent/MotorMusicSortCancelComponent");
const NavigationGroupComponent_1 = require("../UIComponent/NavigationGroupComponent");
const OpenRouletteSetViewComponent_1 = require("../UIComponent/OpenRouletteSetViewComponent");
const PhantomArenaBattleCardCancelComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleCardCancelComponent");
const PhantomArenaBattleCardRecycleComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleCardRecycleComponent");
const PhantomArenaBattleCardSelectComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleCardSelectComponent");
const PhantomArenaBattleCardTipsComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleCardTipsComponent");
const PhantomArenaBattleLayoutHoistComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleLayoutHoistComponent");
const PhantomArenaBattleNavigationNextComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaBattleNavigationNextComponent");
const PhantomArenaCardInfoComponent_1 = require("../UIComponent/PhantomArena/PhantomArenaCardInfoComponent");
const PhotographSetVisibleComponent_1 = require("../UIComponent/PhotographSetVisibleComponent");
const PlotInteractComponent_1 = require("../UIComponent/PlotInteractComponent");
const RewardTakeComponent_1 = require("../UIComponent/RewardTakeComponent");
const RoleInteractComponent_1 = require("../UIComponent/RoleInteractComponent");
const RouletteNavigationComponent_1 = require("../UIComponent/RouletteNavigationComponent");
const ScrollBarComponent_1 = require("../UIComponent/ScrollBarComponent");
const ScrollBarInsideComponent_1 = require("../UIComponent/ScrollBarInsideComponent");
const ScrollSwitchComponent_1 = require("../UIComponent/ScrollSwitchComponent");
const SeekTraceInteractComponent_1 = require("../UIComponent/SeekTraceInteractComponent");
const ShipTowerAutoLeftTeamComponent_1 = require("../UIComponent/ShipTowerAutoLeftTeamComponent");
const ShipTowerSwitchRightTeamComponent_1 = require("../UIComponent/ShipTowerSwitchRightTeamComponent");
const ShowOnlyComponent_1 = require("../UIComponent/ShowOnlyComponent");
const SliderComponent_1 = require("../UIComponent/SliderComponent");
const SliderInsideComponent_1 = require("../UIComponent/SliderInsideComponent");
const TeachScrollMoveComponent_1 = require("../UIComponent/TeachScrollMoveComponent");
const TermExplanationComponent_1 = require("../UIComponent/TermExplanationComponent");
const TextInputComponent_1 = require("../UIComponent/TextInputComponent");
const TextInputInsideComponent_1 = require("../UIComponent/TextInputInsideComponent");
const WorldMapShowOnlyComponent_1 = require("../UIComponent/WorldMapShowOnlyComponent");
const MultipleHotKeyItem_1 = require("./MultipleHotKeyItem");
const SingleHotKeyItem_1 = require("./SingleHotKeyItem");
class HotKeyItemFactory {
  static async CreateHotKeyItem(o, e, n) {
    switch (e) {
      case "SingleHotKey":
        return HotKeyItemFactory.Bqe(o, SingleHotKeyItem_1.SingleHotKeyItem, n);
      case "MultipleHotKey":
        return HotKeyItemFactory.Bqe(o, MultipleHotKeyItem_1.MultipleHotKeyItem, n);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "导航快捷键的参数配置错误!", ["Mode", e], ["index", n]);
        }
        return;
    }
  }
  static async Bqe(o, e, n) {
    e = new e();
    await e.CreateThenShowByActorAsync(o, n);
    return e;
  }
  static async CreateHotKeyComponent(o, e, n) {
    var t = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(e);
    if (t) {
      var a = this.Aqo.get(t.Type);
      if (a) {
        (a = this.Pqo(a, e)).SetHotKeyFunctionType(t.Type);
        await a.CreateThenShowByActorAsync(o);
        a.SetHotKeyType(n);
        a.InitHotKeyLogicMode();
        return a;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "热键组件类型不存在!代码未进行注册", ["type", t.Type]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiNavigation", 10, "导航组中单个配置找不到", ["hotKeyMapId", e]);
    }
  }
  static Pqo(o, e) {
    return new o(e);
  }
}
(exports.HotKeyItemFactory = HotKeyItemFactory).Aqo = new Map([["MarkBookNext", MarkBookComponent_1.MarkBookNextComponent], ["MarkBookPrev", MarkBookComponent_1.MarkBookPrevComponent], ["NavigationNext", NavigationGroupComponent_1.NavigationGroupNextComponent], ["NavigationUpNext", NavigationGroupComponent_1.NavigationGroupUpNextComponent], ["NavigationDownNext", NavigationGroupComponent_1.NavigationGroupDownNextComponent], ["NavigationLeftNext", NavigationGroupComponent_1.NavigationGroupLeftNextComponent], ["NavigationPrev", NavigationGroupComponent_1.NavigationGroupPrevComponent], ["NavigationRightPrev", NavigationGroupComponent_1.NavigationGroupRightPrevComponent], ["NavigationRightPrevLink", NavigationGroupComponent_1.NavigationGroupRightPrevLinkComponent], ["NavigationInside", NavigationGroupComponent_1.NavigationGroupInsideComponent], ["Back", BackComponent_1.BackComponent], ["Interact", InteractComponent_1.InteractComponent], ["ClickButton", ClickBtnComponent_1.ClickBtnComponent], ["ClickButtonInScroll", ClickBtnInScrollComponent_1.ClickBtnInScrollComponent], ["ClickButtonInside", ClickBtnInsideComponent_1.ClickBtnInsideComponent], ["ScrollBar", ScrollBarComponent_1.ScrollBarComponent], ["ScrollBarInside", ScrollBarInsideComponent_1.ScrollBarInsideComponent], ["ScrollSwitch", ScrollSwitchComponent_1.ScrollSwitchComponent], ["HorizontalScrollBar", ScrollBarComponent_1.HorizontalScrollBarComponent], ["VerticalScrollBar", ScrollBarComponent_1.VerticalScrollBarComponent], ["InteractRelease", InteractReleaseComponent_1.InteractReleaseComponent], ["ClickButtonRelease", ClickBtnReleaseComponent_1.ClickBtnReleaseComponent], ["ClickButtonInsideRelease", ClickBtnInsideReleaseComponent_1.ClickBtnInsideReleaseComponent], ["LongPress", LongPressComponent_1.LongPressComponent], ["LongPressInside", LongPressInsideComponent_1.LongPressInsideComponent], ["InteractWheel", InteractWheelComponent_1.InteractWheelComponent], ["SliderIncrease", SliderComponent_1.SliderIncreaseComponent], ["SliderReduce", SliderComponent_1.SliderReduceComponent], ["SliderIncreaseInside", SliderInsideComponent_1.SliderIncreaseInsideComponent], ["SliderReduceInside", SliderInsideComponent_1.SliderReduceInsideComponent], ["SliderIncreaseReverse", SliderComponent_1.SliderIncreaseReverseComponent], ["SliderReduceReverse", SliderComponent_1.SliderReduceReverseComponent], ["LongTimeToTrigger", LongTimeToTriggerComponent_1.LongTimeToTriggerComponent], ["TextInput", TextInputComponent_1.TextInputComponent], ["TextInputInside", TextInputInsideComponent_1.TextInputInsideComponent], ["DraggablePrev", DraggableComponent_1.DraggablePrevComponent], ["DraggableNext", DraggableComponent_1.DraggableNextComponent], ["DraggablePrevInside", DraggableInsideComponent_1.DraggablePrevInsideComponent], ["DraggableNextInside", DraggableInsideComponent_1.DraggableNextInsideComponent], ["Mask", MaskComponent_1.MaskComponent], ["ShowOnly", ShowOnlyComponent_1.ShowOnlyComponent], ["WorldMapShowOnly", WorldMapShowOnlyComponent_1.WorldMapShowOnlyComponent], ["FollowItem", FollowItemComponent_1.FollowItemComponent], ["BagTagNavigationNext", BagTagNavigationNextComponent_1.BagTagNavigationNextComponent], ["CommonConsumeNavigationNext", CommonConsumeNavigationNext_1.CommonConsumeNavigationNext], ["BattleViewCamera", BattleViewCameraComponent_1.BattleViewCameraComponent], ["RouletteNavigation", RouletteNavigationComponent_1.RouletteNavigationComponent], ["SettingSliderIncreaseInside", SliderInsideComponent_1.SettingSliderIncreaseInsideComponent], ["SettingSliderReduceInside", SliderInsideComponent_1.SettingSliderReduceInsideComponent], ["SettingSliderIncreaseReverseInside", SliderInsideComponent_1.SettingSliderIncreaseReverseInsideComponent], ["SettingSliderReduceReverseInside", SliderInsideComponent_1.SettingSliderReduceReverseInsideComponent], ["RewardTake", RewardTakeComponent_1.RewardTakeComponent], ["CommonFilterReset", CommonFilterResetComponent_1.CommonFilterResetComponent], ["MapCheck", MapInteractComponent_1.MapCheckComponent], ["MapFocusPlayer", MapInteractComponent_1.MapFocusPlayerComponent], ["MapMoveForward", MapInteractComponent_1.MapMoveForwardComponent], ["MapMoveRight", MapInteractComponent_1.MapMoveRightComponent], ["MapZoom", MapInteractComponent_1.MapZoomComponent], ["RoleLookUp", RoleInteractComponent_1.RoleLookUpComponent], ["RoleTurn", RoleInteractComponent_1.RoleTurnComponent], ["RoleZoom", RoleInteractComponent_1.RoleZoomComponent], ["RoleReset", RoleInteractComponent_1.RoleResetComponent], ["GamepadMoveForward", GamepadInteractComponent_1.GamepadMoveForwardComponent], ["GamepadMoveRight", GamepadInteractComponent_1.GamepadMoveRightComponent], ["GamepadCheck", GamepadInteractComponent_1.GamepadCheckComponent], ["GamepadCheckDrag", GamepadInteractComponent_1.GamepadCheckDragComponent], ["GamepadWheel", GamepadInteractComponent_1.GamepadWheelComponent], ["GamepadClick", GamepadInteractComponent_1.GamepadClickComponent], ["PlotMoveForward", PlotInteractComponent_1.PlotMoveForwardComponent], ["PlotMoveRight", PlotInteractComponent_1.PlotMoveRightComponent], ["PlotZoom", PlotInteractComponent_1.PlotZoomComponent], ["PlotNextPage", PlotInteractComponent_1.PlotNextPageComponent], ["OpenRouletteSetView", OpenRouletteSetViewComponent_1.OpenRouletteSetViewComponent], ["PhotographSetVisible", PhotographSetVisibleComponent_1.PhotographSetVisibleComponent], ["MapTravelTaskNavigationNext", MapTravelTaskNavigationNextComponent_1.MapTravelTaskNavigationNextComponent], ["ShipTowerSwitchRightTeam", ShipTowerSwitchRightTeamComponent_1.ShipTowerSwitchRightTeamComponent], ["ShipTowerAutoLeftTeam", ShipTowerAutoLeftTeamComponent_1.ShipTowerAutoLeftTeamComponent], ["OpenTermExplanationView", TermExplanationComponent_1.TermExplanationComponent], ["MapRogueQuicklyMove", MapRogueQuicklyMoveComponent_1.MapRogueQuicklyMoveComponent], ["MapDragForward", MapDragComponent_1.MapDragForwardComponent], ["MapDragRight", MapDragComponent_1.MapDragRightComponent], ["DangoLevelUp", InstanceDungeonWorldClickComponent_1.InstanceDungeonWorldClickComponent], ["DangoShop", InstanceDungeonWorldClickComponent_1.InstanceDungeonWorldClickComponent], ["PhantomArenaBattleCardTips", PhantomArenaBattleCardTipsComponent_1.PhantomArenaBattleCardTipsComponent], ["PhantomArenaBattleCardCancel", PhantomArenaBattleCardCancelComponent_1.PhantomArenaBattleCardCancelComponent], ["PhantomArenaBattleCardSelect", PhantomArenaBattleCardSelectComponent_1.PhantomArenaBattleCardSelectComponent], ["PhantomArenaBattleLayoutHoist", PhantomArenaBattleLayoutHoistComponent_1.PhantomArenaBattleLayoutHoistComponent], ["PhantomArenaBattleCardRecycle", PhantomArenaBattleCardRecycleComponent_1.PhantomArenaBattleCardRecycleComponent], ["PhantomArenaCardInfo", PhantomArenaCardInfoComponent_1.PhantomArenaCardInfoComponent], ["PhantomArenaBattleNavigationNext", PhantomArenaBattleNavigationNextComponent_1.PhantomArenaBattleNavigationNextComponent], ["SeekTraceMoveUp", SeekTraceInteractComponent_1.SeekTraceMoveUpComponent], ["SeekTraceMoveDown", SeekTraceInteractComponent_1.SeekTraceMoveDownComponent], ["SeekTraceMoveLeft", SeekTraceInteractComponent_1.SeekTraceMoveLeftComponent], ["SeekTraceMoveRight", SeekTraceInteractComponent_1.SeekTraceMoveRightComponent], ["SeekTraceSelectItem", SeekTraceInteractComponent_1.SeekTraceSelectItemComponent], ["SeekTraceResetItem", SeekTraceInteractComponent_1.SeekTraceResetItemComponent], ["HonamiStoryMoveLeft", HonamiStoryMoveLeftComponent_1.HonamiStoryMoveLeftComponent], ["HonamiStoryMoveRight", HonamiStoryMoveRightComponent_1.HonamiStoryMoveRightComponent], ["HonamiStoryPickUpDown", HonamiStoryPickUpDownComponent_1.HonamiStoryPickUpDownComponent], ["HonamiStoryQuickEquip", HonamiStoryQuickEquipOnComponent_1.HonamiStoryQuickEquipOnComponent], ["HonamiStoryQuickEquipOff", HonamiStoryQuickEquipOffComponent_1.HonamiStoryQuickEquipOffComponent], ["HonamiStoryDiscard", HonamiStoryDiscardComponent_1.HonamiStoryDiscardComponent], ["HonamiStoryLock", HonamiStoryLockComponent_1.HonamiStoryLockComponent], ["HonamiStoryCancel", HonamiStoryCancelComponent_1.HonamiStoryCancelComponent], ["HonamiStoryLook", HonamiStroyLookComponent_1.HonamiStoryLookComponent], ["HonamiStoryCollect", HonamiStoryCollectComponent_1.HonamiStoryCollectComponent], ["HonamiStorySell", HonamiStorySellComponent_1.HonamiStorySellComponent], ["HonamiStoryCancelShowOnly", HonamiStoryCancelShowOnlyComponent_1.HonamiStoryCancelShowOnlyComponent], ["TeachScrollMove", TeachScrollMoveComponent_1.TeachScrollMoveComponent], ["CloseButton", CloseBtnComponent_1.CloseBtnComponent], ["KujiLongTimeToTrigger", KujiLongTimeToTriggerComponent_1.KujiLongTimeToTriggerComponent], ["AutoPilotRideShareBtn", AutoPilotRideShareBtnComponent_1.AutoPilotRideShareBtnComponent], ["MotorMusicSortDragCancel", MotorMusicSortCancelComponent_1.MotorMusicSortDragCancelComponent]]);
//# sourceMappingURL=HotKeyItemFactory.js.map