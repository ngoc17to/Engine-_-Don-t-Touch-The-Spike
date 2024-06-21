export interface GameData {
    canvasEl: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    screenWidth: number
    screenHeight: number
    direction: "RIGHT" | "LEFT" 
}