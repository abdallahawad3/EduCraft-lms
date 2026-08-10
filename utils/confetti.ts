import confetti from "canvas-confetti";

export function ConfettiEffect() {
  confetti({
    particleCount: 300,
    spread: 120,
    startVelocity: 40,
    colors: ["#f44336", "#2196f3", "#4CAF50", "#FFC107"],
  });
}
