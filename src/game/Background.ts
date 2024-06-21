import { GameData } from "../types/general"

class Background{
    private static background: Background
    private backgroundColor: string
    private gameData: GameData
    // private state: 'start' | 'play' | 'over'

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

            // if(this.state == "play"){
            //     context.fillStyle = this.backgroundColor
            //     context.font = '120px "Saira Semi Condensed", sans-serif'
            //     context.textAlign = 'center';
            //     context.textBaseline = 'middle';
            //     const renderScore = score < 10 ? `0${score}` : score.toString()

            //     context.fillText(renderScore, centerX, centerY);
            // }
            // else if(this.state == "start"){
            //     context.fillStyle = "gray"
            //     context.font = '500 40px "Saira Semi Condensed", sans-serif'
            //     context.fillText("DON'T TOUCH THE SPIKE", centerX, screenHeight/9 + 100)

            //     context.fillStyle = "#FF3464"
            //     context.font = '24px "Saira Semi Condensed", sans-serif'
            //     context.fillText("Click to jump", centerX, centerY - 50)
            // }
            // if(this.gameData.gameOver){
            //     const gameoverButton = new Image()
            //     gameoverButton.src = "../assets/images/Button.png"
            //     context.drawImage(gameoverButton, 0, 0, 240, 150)
            // }
        }
    }
}

export default Background