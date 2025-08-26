import confetti from "canvas-confetti";

/**
 * Pop some confetti, just for fun.
 */
export function popConfetti() {
  const colors = ["#ff5a00", "#FFFFFF"]
  confetti({
    angle: 50,
    spread: 100,
    particleCount: 100,
    origin: { x: 0, y: 0.5 }, // Left side
    colors: colors,
    zIndex: 9999
  });
  confetti({
    angle: 140,
    spread: 100,
    particleCount: 100,
    origin: { x: 1, y: 0.5 }, // Right side
    colors: colors,
    zIndex: 9999
  });
}
