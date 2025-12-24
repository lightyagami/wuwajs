"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRegisterCenter = undefined;
const BasePanelHandle_1 = require("./PanelHandle/BasePanelHandle");
const ExploreRewardPanelHandle_1 = require("./PanelHandle/ExploreRewardPanelHandle");
const FunctionViewPanelHandle_1 = require("./PanelHandle/FunctionViewPanelHandle");
const HonamiStoryPanelHandle_1 = require("./PanelHandle/HonamiStoryPanelHandle");
const InventoryViewPanelHandle_1 = require("./PanelHandle/InventoryViewPanelHandle");
const NavigationPanelHandleCreator_1 = require("./PanelHandle/NavigationPanelHandleCreator");
const PhantomArenaBattlePanelHandle_1 = require("./PanelHandle/PhantomArenaBattlePanelHandle");
const PhantomManageConfigPanelHandle_1 = require("./PanelHandle/PhantomManageConfigPanelHandle");
const RoleResonancePanelHandle_1 = require("./PanelHandle/RoleResonancePanelHandle");
const RoleSkillPanelHandle_1 = require("./PanelHandle/RoleSkillPanelHandle");
const RouletteViewPanelHandle_1 = require("./PanelHandle/RouletteViewPanelHandle");
const VisionAssemblePanelHandle_1 = require("./PanelHandle/VisionAssemblePanelHandle");
const VisionChooseMainPanelHandle_1 = require("./PanelHandle/VisionChooseMainPanelHandle");
const NavigationCalabashDetailExitButton_1 = require("./Selectable/Calabash/NavigationCalabashDetailExitButton");
const NavigationCantFocusInScrollOrLayoutByJumpGroupButton_1 = require("./Selectable/Common/NavigationCantFocusInScrollOrLayoutByJumpGroupButton");
const NavigationCommonRefreshNavigationButton_1 = require("./Selectable/Common/NavigationCommonRefreshNavigationButton");
const NavigationFunctionPageButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageButton");
const NavigationFunctionPageLeftButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageLeftButton");
const NavigationFunctionPageRightButton_1 = require("./Selectable/FunctionView/NavigationFunctionPageRightButton");
const NavigationHonamiStoryGridItem_1 = require("./Selectable/HonamiStory/NavigationHonamiStoryGridItem");
const NavigationInventoryDestroyEnterButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyEnterButton");
const NavigationInventoryDestroyExitButton_1 = require("./Selectable/InventoryView/NavigationInventoryDestroyExitButton");
const NavigationInventoryItemGridToggle_1 = require("./Selectable/InventoryView/NavigationInventoryItemGridToggle");
const NavigationButton_1 = require("./Selectable/NavigationButton");
const NavigationDragComponent_1 = require("./Selectable/NavigationDragComponent");
const NavigationScrollbar_1 = require("./Selectable/NavigationScrollbar");
const NavigationSelectable_1 = require("./Selectable/NavigationSelectable");
const NavigationSelectableCreator_1 = require("./Selectable/NavigationSelectableCreator");
const NavigationSlider_1 = require("./Selectable/NavigationSlider");
const NavigationToggle_1 = require("./Selectable/NavigationToggle");
const NavigationPhantomArenaCardToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaCardToggle");
const NavigationPhantomArenaEmptyButton_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaEmptyButton");
const NavigationPhantomArenaOpponentBattleToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaOpponentBattleToggle");
const NavigationPhantomArenaOpponentFunctionalToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaOpponentFunctionalToggle");
const NavigationPhantomArenaOwnBattleToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaOwnBattleToggle");
const NavigationPhantomArenaOwnFunctionalToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaOwnFunctionalToggle");
const NavigationPhantomArenaOwnHandToggle_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaOwnHandToggle");
const NavigationPhantomArenaVisionButton_1 = require("./Selectable/PhantomArena/NavigationPhantomArenaVisionButton");
const NavigationPhantomManageConfigGridBig_1 = require("./Selectable/PhantomManage/NavigationPhantomManageConfigGridBig");
const NavigationQuestTitleToggle_1 = require("./Selectable/Quest/NavigationQuestTitleToggle");
const NavigationRoguelikeGridToggle_1 = require("./Selectable/Roguelike/NavigationRoguelikeGridToggle");
const NavigationRoleResonanceExitButton_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceExitButton");
const NavigationRoleResonanceLockToggle_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceLockToggle");
const NavigationRoleResonanceToggle_1 = require("./Selectable/RoleRootView/Resonance/NavigationRoleResonanceToggle");
const NavigationRoleSkillPreviewExitButton_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillPreviewExitButton");
const NavigationRoleSkillPreviewToggle_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillPreviewToggle");
const NavigationRoleSkillTreeExitButton_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeExitButton");
const NavigationRoleSkillTreeToggle_1 = require("./Selectable/RoleRootView/Skill/NavigationRoleSkillTreeToggle");
const NavigationRouletteExitButton_1 = require("./Selectable/Roulette/NavigationRouletteExitButton");
const NavigationVisionAssembleCompareToggle_1 = require("./Selectable/Vision/NavigationVisionAssembleCompareToggle");
const NavigationVisionAssembleToggle_1 = require("./Selectable/Vision/NavigationVisionAssembleToggle");
const NavigationVisionReplaceSortTabToggle_1 = require("./Selectable/Vision/NavigationVisionReplaceSortTabToggle");
const NavigationVisionTabViewReplaceButton_1 = require("./Selectable/Vision/NavigationVisionTabViewReplaceButton");
const NavigationVisionTabViewToggle_1 = require("./Selectable/Vision/NavigationVisionTabViewToggle");
const NavigationVisionToggle_1 = require("./Selectable/Vision/NavigationVisionToggle");
const selectableCtorMap = {
  Button: NavigationButton_1.NavigationButton,
  Toggle: NavigationToggle_1.NavigationToggle,
  Scrollbar: NavigationScrollbar_1.NavigationScrollbar,
  Slider: NavigationSlider_1.NavigationSlider,
  DragComponent: NavigationDragComponent_1.NavigationDragComponent,
  Selectable: NavigationSelectable_1.NavigationSelectable,
  VisionReplaceViewToggle: NavigationVisionToggle_1.NavigationVisionToggle,
  VisionTabViewToggle: NavigationVisionTabViewToggle_1.NavigationVisionTabViewToggle,
  VisionTabViewReplaceButton: NavigationVisionTabViewReplaceButton_1.NavigationVisionTabViewReplaceButton,
  FunctionPageButton: NavigationFunctionPageButton_1.NavigationFunctionPageButton,
  FunctionPageLeftButton: NavigationFunctionPageLeftButton_1.NavigationFunctionPageLeftButton,
  FunctionPageRightButton: NavigationFunctionPageRightButton_1.NavigationFunctionPageRightButton,
  RoleSkillTreeToggle: NavigationRoleSkillTreeToggle_1.NavigationRoleSkillTreeToggle,
  RoleSkillTreeExitButton: NavigationRoleSkillTreeExitButton_1.NavigationRoleSkillTreeExitButton,
  RoleSkillPreviewToggle: NavigationRoleSkillPreviewToggle_1.NavigationRoleSkillPreviewToggle,
  RoleSkillPreviewExitButton: NavigationRoleSkillPreviewExitButton_1.NavigationRoleSkillPreviewExitButton,
  RoleResonanceToggle: NavigationRoleResonanceToggle_1.NavigationRoleResonanceToggle,
  RoleResonanceLockToggle: NavigationRoleResonanceLockToggle_1.NavigationRoleResonanceLockToggle,
  RoleResonanceExitButton: NavigationRoleResonanceExitButton_1.NavigationRoleResonanceExitButton,
  InventoryDestroyEnterButton: NavigationInventoryDestroyEnterButton_1.NavigationInventoryDestroyEnterButton,
  InventoryDestroyExitButton: NavigationInventoryDestroyExitButton_1.NavigationInventoryDestroyExitButton,
  InventoryItemGridToggle: NavigationInventoryItemGridToggle_1.NavigationInventoryItemGridToggle,
  RouletteExitButton: NavigationRouletteExitButton_1.NavigationRouletteExitButton,
  RoguelikeGridToggle: NavigationRoguelikeGridToggle_1.NavigationRoguelikeGridToggle,
  QuestTitleToggle: NavigationQuestTitleToggle_1.NavigationQuestTitleToggle,
  VisionReplaceSortTabToggle: NavigationVisionReplaceSortTabToggle_1.NavigationVisionReplaceSortTabToggle,
  CalabashDetailExitBtn: NavigationCalabashDetailExitButton_1.NavigationCalabashDetailExitButton,
  VisionAssembleToggle: NavigationVisionAssembleToggle_1.NavigationVisionAssembleToggle,
  VisionAssembleCompareToggle: NavigationVisionAssembleCompareToggle_1.NavigationVisionAssembleCompareToggle,
  CommonRefreshNavigationButton: NavigationCommonRefreshNavigationButton_1.NavigationCommonRefreshNavigationButton,
  PhantomArenaOwnHandToggle: NavigationPhantomArenaOwnHandToggle_1.NavigationPhantomArenaOwnHandToggle,
  PhantomArenaOwnBattleToggle: NavigationPhantomArenaOwnBattleToggle_1.NavigationPhantomArenaOwnBattleToggle,
  PhantomArenaOwnFunctionalToggle: NavigationPhantomArenaOwnFunctionalToggle_1.NavigationPhantomArenaOwnFunctionalToggle,
  PhantomArenaOpponentBattleToggle: NavigationPhantomArenaOpponentBattleToggle_1.NavigationPhantomArenaOpponentBattleToggle,
  PhantomArenaOpponentFunctionalToggle: NavigationPhantomArenaOpponentFunctionalToggle_1.NavigationPhantomArenaOpponentFunctionalToggle,
  PhantomArenaVisionButton: NavigationPhantomArenaVisionButton_1.NavigationPhantomArenaVisionButton,
  PhantomArenaEmptyButton: NavigationPhantomArenaEmptyButton_1.NavigationPhantomArenaEmptyButton,
  PhantomArenaCardToggle: NavigationPhantomArenaCardToggle_1.NavigationPhantomArenaCardToggle,
  PhantomManageConfigGridBig: NavigationPhantomManageConfigGridBig_1.NavigationPhantomManageConfigGridBig,
  HonamiStoryGridItem: NavigationHonamiStoryGridItem_1.NavigationHonamiStoryGridItem,
  CantFocusInScrollOrLayoutByJumpGroup: NavigationCantFocusInScrollOrLayoutByJumpGroupButton_1.NavigationCantFocusInScrollOrLayoutByJumpGroupButton
};
const panelHandleCtorMap = {
  Default: BasePanelHandle_1.BasePanelHandle,
  VisionChooseMain: VisionChooseMainPanelHandle_1.VisionChooseMainPanelHandle,
  MainMenu: FunctionViewPanelHandle_1.FunctionViewPanelHandle,
  RoleSkill: RoleSkillPanelHandle_1.RoleSkillPanelHandle,
  RoleResonance: RoleResonancePanelHandle_1.RoleResonancePanelHandle,
  Inventory: InventoryViewPanelHandle_1.InventoryViewPanelHandle,
  Roulette: RouletteViewPanelHandle_1.RouletteViewPanelHandle,
  ExploreReward: ExploreRewardPanelHandle_1.ExploreRewardPanelHandle,
  VisionAssemble: VisionAssemblePanelHandle_1.VisionAssemblePanelHandle,
  PhantomArenaBattle: PhantomArenaBattlePanelHandle_1.PhantomArenaBattlePanelHandle,
  PhantomManageConfig: PhantomManageConfigPanelHandle_1.PhantomManageConfigPanelHandle,
  HonamiStoryBackpack: HonamiStoryPanelHandle_1.HonamiStoryPanelHandle
};
class NavigationRegisterCenter {
  static Init() {
    this.Hwo();
    this.jwo();
  }
  static Hwo() {
    for (const a in selectableCtorMap) {
      var e = a;
      NavigationSelectableCreator_1.NavigationSelectableCreator.RegisterNavigationBehavior(e, selectableCtorMap[e]);
    }
  }
  static jwo() {
    for (const a in panelHandleCtorMap) {
      var e = a;
      NavigationPanelHandleCreator_1.NavigationPanelHandleCreator.RegisterSpecialPanelHandle(e, panelHandleCtorMap[e]);
    }
  }
}
exports.NavigationRegisterCenter = NavigationRegisterCenter;
//# sourceMappingURL=NavigationRegisterCenter.js.map