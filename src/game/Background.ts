import { GameData } from "../types/general"

class Background{
    private static background: Background
    private backgroundColor: string
    private gameData: GameData

    constructor(gameData: GameData) {
        this.backgroundColor = '#EBEBEB'
        this.gameData = gameData
    }

    public static getInstance(gameData: GameData): Background {
        return this.background || (this.background = new Background(gameData))
    }
  
    public render(): void{
        const context = this.gameData.context
        if (context) {
            const screenHeight = this.gameData.screenHeight
            const screenWidth = this.gameData.screenWidth
            
            // Draw the background 
            context.fillStyle = this.backgroundColor;
            context.fillRect(0, 0, screenWidth, screenHeight);

            const background = new Image()
            background.src = "../assets/images/background.png"
            context.drawImage(background, 0, 0, screenWidth, screenHeight)

            // Draw the white circle in the center
            const centerX = screenWidth / 2;
            const centerY = screenHeight / 2;
            const circle = new Image()
            circle.src = "../assets/images/circle.png"
            context.drawImage(circle, centerX - screenWidth/4, centerY - screenWidth/4, screenWidth/2, screenWidth/2)

        }
    }
}

export default Background