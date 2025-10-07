"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetAllocatorConfigMobileCreator = undefined;
const GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig");
class GameBudgetAllocatorConfigMobileCreator {
  CreateNormalEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 500, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 500, 100),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 1000, 500, 10),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 60, 2000, 100),
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 1000, 500, 10)
    };
  }
  CreateBossEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3000, 300),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3000, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 120, 1000, 200),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 10, 3000, 500),
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 60, 2000, 200),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 120, 1000, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 1, 1, 1),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, 3000, 500),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 10, 2000, 200),
      Cutscene_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 2, 5, 5000, 500)
    };
  }
  CreateCharacterEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 2000, 200),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 2000, 200),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 120, 1000, 100),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 60, 3000, 300),
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 120, 1000, 100),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 120, 500, 50),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 20, 2000, 300),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 20, 3500, 500),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 120, 1000, 100)
    };
  }
  CreateNormalNpcEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 500, 100),
      Normal_Render: undefined,
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 240, 500, 50),
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 240, 500, 50)
    };
  }
  CreateSimpleNpcEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 20, 500, 100),
      Normal_Render: undefined,
      Normal_NotRendered: undefined,
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateFightEffectConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1);
  }
  CreateEffectConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 180, 500, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 2000, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 200, 50),
      Normal_Fighting: undefined,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 300, 500, 50),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, 200, 20),
      Fighting_Fighting: undefined,
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 20, 4500, 500),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 120, 1000, 50)
    };
  }
  CreateEffectImportanceConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 100, 30000, 3000),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 100, 50000, 5000),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 1000, 100),
      Normal_Fighting: undefined,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 100, 5000, 1000),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, 500, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 100, 5000, 1000),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 100, 50000, 5000),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, 1000, 100)
    };
  }
  CreateStabilizeLowEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 10, 1, 1),
      Normal_Render: undefined,
      Normal_NotRendered: undefined,
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateAlwaysTickHotfixConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1),
      Normal_Render: undefined,
      Normal_NotRendered: undefined,
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateMoveSceneItemEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 10000, 5000),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 10000, 5000),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 60, 500, 10),
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreatePlayerAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1);
  }
  CreateNormalEntityAlwaysTickConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1),
      Normal_Render: undefined,
      Normal_NotRendered: undefined,
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1);
  }
  CreateCameraAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1);
  }
  CreateIdleExecConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 30, 1, 1);
  }
  CreateHUDTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 2000, 300);
  }
  CreateCharacterRenderConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3000, 500),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3000, 500),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 500, 100),
      Normal_Fighting: undefined,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 60, 3000, 300),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 300, 300, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 60, 10000, 500),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, 10000, 1000),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, 300, 100)
    };
  }
  CreateNpcRenderConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 30, 1000, 300),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 30, 1000, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 100, 100),
      Normal_Fighting: undefined,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 60, 1000, 100),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 300, 100, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 60, 1000, 100),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, 10000, 1000),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, 300, 100)
    };
  }
  CreateBattleHeadViewConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 2000, 300);
  }
  CreateCollisionPlantConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 300, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 300, 100),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 3, 1, 1),
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateDynamicPhysicsInteractionActorConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 500, 500),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 500, 500),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 30, 300, 100),
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
  CreateStaticPhysicsInteractionActorConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 300, 300),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 300, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 30, 300, 50),
      Normal_Fighting: undefined,
      Fighting_Rendered: undefined,
      Fighting_NotRendered: undefined,
      Fighting_Fighting: undefined,
      Cutscene_Rendered: undefined,
      Cutscene_NotRendered: undefined
    };
  }
}
exports.GameBudgetAllocatorConfigMobileCreator = GameBudgetAllocatorConfigMobileCreator;
//# sourceMappingURL=GameBudgetAllocatorConfigMobileCreator.js.map