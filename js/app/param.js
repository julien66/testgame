/**
 * @file
 * Param module for this game.
 */
define(['three'], function(Three) {
  return param = {
    grid : {
      'width' : 1920.0,
      'step' : 32.0,
      'lineColor' : new Three.Vector4(1, 1, 1, 1),
      'squareColor' : new Three.Vector4(0, 0.8, 0, 1),
      'lineThickness' : 0.020,
    },
    cursor : {
      'updateThreshold' : 0.1,
      'squareColor' : new Three.Vector4(0, 0, 1, 1),
      'circleRadius' : 40.0,
    },
    flyers : {
      'speedCoef' : 800, // Higher is slower.
      'verticalSpeedCoef' : 40,
      'paraglider' : {
        'myShadowColor' : new Three.Vector4(1, 0, 0, 1),
        'shadowColor' : new Three.Vector4(0, 0, 0, 1),
        'shadowRadius' : 3.0,
        'tc' : - 1.2,
        'speed' : 40,
      }
    },
    turnpoints : {
      'height' : 30, // height of tp cylinder.
      'color' : 0xffff00, // tp color.
      'colorNext' : 0x0000ff, // tp color when next to tag.
      'colorTagged' : 0x000000, // tp color when tagged.
    },
    time : {
      'dayLength' : 60,
    },
    lifts : {
      'windLiftHeightCoef' : 3, // Wind Lift max height over the terrain.
      'windLiftStrengthCoef' : 8, // Km per hour for which 1 m/s lift is reached.
    },
  }
});
